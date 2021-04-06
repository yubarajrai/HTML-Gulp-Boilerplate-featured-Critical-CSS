(function () {
    
});

/**
 * Menu scripting
 */
function hasChildMenu() {
    let jsHasChildMenuList = jQuery('.js-navigation li ul');
    if (jsHasChildMenuList.length > 0) {
        jsHasChildMenuList.closest("li").addClass("has-child-menu js-element-position");
    }
}

hasChildMenu();

jQuery(document).ready(function (e) {
    /**
     * Nav Toggle
     */
     function removeItemEnabled(e) {
        var toggleNavEnabled = jQuery('.js-nav-toggle.enabled'),
            jsNavigationItem = jQuery('.js-navigation .has-child-menu');
        
            toggleNavEnabled.on('click', function (e) {
                jsNavigationItem.removeClass('enabled');
            });
    }

    var toggleNav = jQuery('.js-nav-toggle'),
        bodyNavOverlay = jQuery("body"),
        navActiveClass = 'nav__visible';

    toggleNav.on('click', function (e) {
        e.preventDefault();
        bodyNavOverlay.toggleClass("nav__background-overlay");
        jQuery(this).toggleClass('enabled').parents("header").toggleClass(navActiveClass);

        removeItemEnabled();
    });

    /**
     * Nav child dropdown
     *
     * Menu has Child
     * @type {jQuery|HTMLElement}
     */
    let jsHasChildMenu = jQuery('.has-child-menu');

    if (jsHasChildMenu.length > 0) {
        jsHasChildMenu.prepend("<span class='dropdown'></span>");
    }

    // dropdown clicker
    let jsHasChildMenuDropdown = jQuery('.has-child-menu > .dropdown'),
        jsHasChildMenuAnchorHash = jQuery('.has-child-menu > a[href="#"]'),
        jsBothHasDropdownClicker = jQuery('.has-child-menu > a[href="#"], .has-child-menu > .dropdown');

    if (jsHasChildMenuAnchorHash.length > 0) {
        jsBothHasDropdownClicker.on('click', function (e) {
            e.preventDefault();
            jQuery(this).closest(".has-child-menu").toggleClass('enabled').siblings().removeClass('enabled').closest('ul').toggleClass('child-access').closest('li.enabled').toggleClass('parent-item');
        });
    } else {
        jsHasChildMenuDropdown.on('click', function (e) {
            e.preventDefault();
            jQuery(this).closest(".has-child-menu").toggleClass('enabled').siblings().removeClass('enabled').closest('ul').toggleClass('child-access').closest('li.enabled').toggleClass('parent-item');
        });
    }


    /**
     * Search toggle
     */
    jQuery(".js-search-toggle").on("click", function (e) {
        e.preventDefault();
        jQuery(".js-search-form").toggleClass("search-on");
        jQuery(".js-search-form input").focus();
        jQuery("header").removeClass("nav__visible");
        jQuery("body").removeClass("nav__background-overlay");
    });

    jQuery(".js-close-search-form").on("click", function (e) {
        jQuery(".js-search-form").removeClass("search-on");
    });

    /**
     * Input focus label
     * */
    var jsInput = jQuery("input, select, textarea");

    jsInput.on('click focus', function () {
        jQuery(this).parents('li, p').addClass('edit');
    });

    jsInput.each(function () {
        var $select = jQuery(this);
        if ($select.val()) {
            $select.closest('li, p').addClass('edit');
        }
    });    
});

jQuery(window).on('resize scroll orientationchange', function () {
    hasChildMenu();
});