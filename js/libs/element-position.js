/**
 * Detecting position of element in viewport
 * @param el
 * @returns {{x: number, y: number}}
 */
function getPosition(el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            let yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
jQuery(".js-navigation a").on("mouseenter", function () {
    updatePosition();
});
window.addEventListener("resize", updatePosition, false);
window.addEventListener("orientationchange", updatePosition, false);

function updatePosition() {
    let windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); //width of the window

    let hasChildMenuPosition = document.querySelectorAll(".js-element-position");
    hasChildMenuPosition.forEach(hcmp => {
        let position = getPosition(hcmp);

        if (position.x > (windowWidth / 2)) {
            hcmp.classList.add("right-of-viewport");
            hcmp.classList.remove("left-of-viewport");
        } else {
            hcmp.classList.add("left-of-viewport");
            hcmp.classList.remove("right-of-viewport");
        }
    });
}

document.addEventListener('DOMContentLoaded', function(event) {
    updatePosition();
});

// end getPosition script