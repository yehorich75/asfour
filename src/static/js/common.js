var heroTitleElem = document.getElementById("hero-title");

var heroTitleSourceBottom =
    heroTitleElem.getBoundingClientRect().bottom + window.pageYOffset;

window.onscroll = function() {
    if (
        heroTitleElem.classList.contains("fixed") &&
        window.pageYOffset < heroTitleSourceBottom
    ) {
        heroTitleElem.classList.remove("fixed");
    } else if (window.pageYOffset > heroTitleSourceBottom) {
        heroTitleElem.classList.add("fixed");
    }
};


$(document).ready(function() {
    $(".hero__slider").slick({
        asNavFor: ".hero__captions",
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        adaptiveHeight: true,
        fade: true,
        cssEase: "linear",
        arrows: true
    });

    $(".hero__captions").slick({
        asNavFor: ".hero__slider",
        infinite: false,
        speed: 200,
        fade: true,
        appendArrows: $(".pagination"),
        prevArrow: '<div class="pagination__button"><i class="material-icons">keyboard_arrow_left</i></div>',
        nextArrow: '<div class="pagination__button"><i class="material-icons">keyboard_arrow_right</i></div>'
    });
});

var scroll = new SmoothScroll('a[href*="#"]');
var options = { speed: 3000, easing: "easeOutCubic" };

// var loop = anime({
//     targets: '#arrow-down',
//     translateY: 20,
//     duration: 3000,
//     offset: 400,
//     loop: true
// });

// jQuery(document).ready(function($) {
//     $('.fixed .icon__menu').click(function(event) {
//         $('.fixed .nav').toggleClass('.fixed .nav__active');
//     });
// });

$(document).ready(function() {
    $('.mobile__menu--icon').on('touchstart click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $('.mobile__menu--icon').toggleClass('mobile__menu--icon--active')
        $('.nav').toggleClass('nav__active')
        $('.nav__link').toggleClass('fixed__nav-link')
    })
})

window.addEventListener('load', function() {
    var
        ac = new FastAverageColor({ defaultColor: [0, 0, 0, 0] }),
        items = document.querySelectorAll('.product__item--main');

    function getGradient(image, padding) {
        var value = 'linear-gradient(to bottom, ';

        var
            naturalHeight = image.naturalHeight,
            height = image.height,
            count = 10,
            naturalHeightPart = Math.floor(naturalHeight / count),
            heightPart = Math.floor(height / count),
            color,
            top,
            bottom,
            parts = [];

        for (var i = 0; i < count; i++) {
            color = ac.getColor(image, { left: 0, top: i * naturalHeightPart, height: naturalHeightPart });
            top = i ? (i * heightPart) + padding : 0;
            bottom = ((i + 1) * heightPart - 1) + padding;
            parts.push(color.rgb + ' ' + top + 'px, ' + color.rgb + ' ' + bottom + 'px');
        }

        value += parts.join(', ');

        value += ')';

        return {
            value: value,
            lastColor: color
        };
    }

    function updateStripes() {
        for (var i = 0; i < items.length; i++) {
            var
                item = items[i],
                image = item.querySelector('img'),
                padding = 30,
                gradient = getGradient(image, padding);

            item.style.background = gradient.value;
            item.style.color = gradient.lastColor.isDark ? 'white' : 'black';
        }
    }

    window.addEventListener('resize', updateStripes, false);

    updateStripes();
}, false);

(function() {

    // http://stackoverflow.com/a/11381730/989439
    function mobilecheck() {
        var check = false;
        (function(a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    var support = { animations: Modernizr.cssanimations },
        animEndEventNames = { 'WebkitAnimation': 'webkitAnimationEnd', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend' },
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        onEndAnimation = function(el, callback) {
            var onEndCallbackFn = function(ev) {
                if (support.animations) {
                    if (ev.target != this) return;
                    this.removeEventListener(animEndEventName, onEndCallbackFn);
                }
                if (callback && typeof callback === 'function') { callback.call(); }
            };
            if (support.animations) {
                el.addEventListener(animEndEventName, onEndCallbackFn);
            } else {
                onEndCallbackFn();
            }
        },
        eventtype = mobilecheck() ? 'touchstart' : 'click';

    [].slice.call(document.querySelectorAll('.cbutton')).forEach(function(el) {
        el.addEventListener(eventtype, function(ev) {
            classie.add(el, 'cbutton--click');
            onEndAnimation(classie.has(el, 'cbutton--complex') ? el.querySelector('.cbutton__helper') : el, function() {
                classie.remove(el, 'cbutton--click');
            });
        });
    });

})();