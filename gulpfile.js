'use strict';
let gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const server = require('gulp-server-livereload');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let fs = require('fs');
let criticalCss = require('gulp-penthouse');
let gcmq = require('gulp-group-css-media-queries');
const gulpLoadPlugins = require('gulp-load-plugins');
const {
    Fiber,
    autoprefixer,
    sass,
    concat,
    sourcemaps,
    plumber,
    sassGlob,
    rename,
    connect
} = gulpLoadPlugins();
sass.compiler = require('node-sass');

let paths = {
    tempDest: '../assets/',
    styles: {
        src: ['./scss/**/*.scss'],
        watch: ['./scss/**']
    },
    script: {
        src: ['./js/*.js'],
        watch: ['./js/**']
    },
    html: {
        src: ['./*.html'],
        watch: ['./**']
    },
    images: {
        src: ['./images/**'],
        watch: ['./images/**'],
        dest: ['../assets/images']
    },
    uploads: {
        src: ['./uploads/**'],
        watch: ['./uploads/**'],
        dest: ['../assets/uploads']
    },
    fonts: {
        src: ['./fonts/**'],
        watch: ['./fonts/**'],
        dest: ['../assets/fonts']
    }
};

if (!fs.existsSync(paths.tempDest)) {
    fs.mkdirSync(paths.tempDest);
}

gulp.task('sass', function () {
    return gulp.src(paths.styles.src)
        .pipe(plumber())
        .pipe(sassGlob({
            ignorePaths: [
                '**/_f1.scss',
                'import/**'
            ]
        }))
        .pipe(sass({fiber: Fiber}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.tempDest))
        .pipe(connect.reload());

});

gulp.task('critical-css', function () {
    return gulp.src('../assets/app.min.css')
        .pipe(criticalCss({
            out: '/app.critical.css',
            url: paths.tempDest + '/index.html',
            width: 1300,
            height: 900,
            strict: true,
            userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.tempDest));
});


gulp.task('gcmp', function () {
    return gulp.src('../assets/app.min.css')
        .pipe(gcmq())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.tempDest));
});

gulp.task('copy:html', function () {
    return gulp.src(paths.html.src)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(paths.tempDest))
        .pipe(connect.reload());
});

gulp.task('copy:images', function () {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
        .pipe(connect.reload());
});

gulp.task('copy:uploads', function () {
    return gulp.src(paths.uploads.src)
        .pipe(gulp.dest(paths.uploads.dest))
        .pipe(connect.reload());
});

gulp.task('copy:script', function () {
    return gulp.src(paths.script.src)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.tempDest))
        .pipe(connect.reload());
});

gulp.task('copy:fonts', function () {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(connect.reload());
});

gulp.task('webserver', function () {
    return gulp.src('../assets')
        .pipe(server({
            livereload: true,
            open: true
        }));
});

gulp.task('watch', function () {
    gulp.watch(paths.styles.watch, gulp.series('sass'));
    gulp.watch(paths.html.watch, gulp.series('copy:html'));
    gulp.watch(paths.images.watch, gulp.series('copy:images'));
    gulp.watch(paths.uploads.watch, gulp.series('copy:uploads'));
    gulp.watch(paths.script.watch, gulp.series('copy:script'));
    gulp.watch(paths.fonts.watch, gulp.series('copy:fonts'));
});

/**
 * Study gulp series and parallel task handler
 * https://fettblog.eu/gulp-4-parallel-and-series/
 */
gulp.task('serve', gulp.parallel(
    'sass',
    'copy:html',
    'copy:images',
    'copy:uploads',
    'copy:script',
    'copy:fonts',
    'watch',
    'webserver'
    )
);

gulp.task('build', gulp.parallel(
    'sass',
    'copy:html',
    'copy:images',
    'copy:uploads',
    'copy:script',
    'copy:fonts'
    ),
    setTimeout(gulp.parallel('gcmp'), 1000),
    setTimeout(gulp.parallel('critical-css'), 2000)
);