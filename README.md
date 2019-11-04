# HTML-Gulp-Boilerplate-featured-Critical-CSS

Requirement to use this boilerplate
- Node v10.15.3
- Git
- Gulp



Output information
- install package with "npm install" command
- run task with "npm start" command
- output file will be outside root with "assets" folder



To run task:

1) Task watch (Development)
- npm start


2) Task build (Production)
- npm run build


3) Grid uses on html class
- .row > .column {media query classes; eg, large-6 small-12}
structure:
<pre>
  &lt;div class="row"&gt;
    &lt;div class="column small-12 large-6"&gt; ... &lt;/div&gt;
    &lt;div class="column small-12 large-6"&gt; ... &lt;/div&gt;
  &lt;/div&gt;
</pre>

4) Breakpoint uses on scss
- @include breakpoint(large) { ... }
- @include breakpoint(large down) { ... }




#Customize Media Query 
 It works on both html class and scss breakpoint 
 
 <pre>
 $__breakpoints: (
        small:0,
        medium:640px,
        tablet: 768px,
        large:1024px,
        xlarge:1200px
)
 </pre>
