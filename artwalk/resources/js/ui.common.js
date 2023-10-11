$(document).ready(function () {
    $("[data-popup-toggle]").on("click", function (e) {
        var targetId = $(this).attr("data-popup-toggle");
        var targetElement = $('[data-popup="' + targetId + '"]');
        var isVisible = targetElement.is(":visible");
        var gap = window.innerWidth - document.documentElement.clientWidth;

        if (targetId === "popup_search") {
            $("[data-popup-toggle='popup_search']").toggleClass("on", !isVisible);
            $(".search_layer .cont_inner").append('<div class="sl_bg"></div>');
        } else {
            $(this).toggleClass("on", !isVisible);
        }

        if (isVisible) {
            popup.close(targetId, "popup");
        } else {
            popup.open(targetId, "popup", false);
        }
    });

    /* popup open */
    $("[data-popup-open]").on("click", function (e) {
        popup.open($(this).attr("data-popup-open"), "popup");
    });
    $("[data-alert-open]").on("click", function (e) {
        popup.open($(this).attr("data-alert-open"), "alert");
    });
    $("[data-layer-open]").on("click", function (e) {
        popup.open($(this).attr("data-layer-open"), "layer");
    });

    $("[data-popup-close]").on("click", function (e) {
        popup.close($(this).attr("data-popup-close"), "popup");
    });
    $("[data-alert-close]").on("click", function (e) {
        popup.close($(this).attr("data-alert-close"), "alert");
    });
    $("[data-layer-close]").on("click", function (e) {
        popup.close($(this).attr("data-layer-close"), "layer");
    });

    $(".btn_familysite").click(function () {
        familySite($(this));
    });

    // 통이미지 배너 1개짜리 스와이퍼
    $(".one-ban-swiper").oneImgSwiper();
});

//디바이스 체크
$(window).on("load resize", function () {
    if (window.innerWidth > 768) {
        //PC
        $("body").removeClass("is_mobile").addClass("is_pc");
    } else {
        //Mobile
        $("body").removeClass("is_pc").addClass("is_mobile");
    }
});

// 카테고리별 썸네일 슬라이드
function cate_swiper() {
    $('[data-slide="sm_thumb_slide"]').each(function (i) {
        if ($('[data-slide="sm_thumb_slide"]').length <= 0) return;

        if ($(this).find(".swiper-slide").length == 1) {
            $(this).addClass("only");
        } else {
            if (!this.swiper) {
                new Swiper(this, {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    loop: true,
                    autoplay: false,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    speed: 400,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    observer: true,
                    observeParents: true,
                    watchOverflow: true,
                });
            }
        }
    });
}

// 통이미지 배너 1개짜리 스와이퍼
(function($) {
    $.fn.oneImgSwiper = function (options) {
        // 기본 옵션값
        defaults = {
            delay: 4000,
            loop: true,
        }

        var settings = $.extend({}, defaults, options);

        return this.each(function () {
            var swiper = new Swiper($(this), {
                spaceBetween: 20,
                pagination: {
                    el: ".one-ban-swiper .swiper-pagination",
                    type: "fraction",
                },
                autoplay: {
                    delay: settings.delay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                loop: settings.loop
            });
        });
    }
})(jQuery);

$(".one-ban-swiper").hover(function () {
    swiper.autoplay.stop();
}, function () {
    swiper.autoplay.start();
});

// body lock scroll ios 대응
function lockScrollHandle(event) {
    const e = event || window.event;

    // body lock 에서 제외시킬 요소 정의
    // 전체 메뉴
    if (e.target.closest(".allmenu_wrap")) {
        return true;
    }

    // 팝업 공통
    if (e.target.classList.contains("popup_cont")) {
        return true;
    }

    // 멀티 터치는 터치 되게 한다
    if (e.touches.length > 1) return true;

    // event 초기화 속성이 있음 초기화
    if (e.preventDefault) e.preventDefault();

    return false;
}

// 스크롤 잠금
function disableScroll() {
    const body = document.querySelector("body");
    const pageY = document.body.scrollTop || document.documentElement.scrollTop;

    if (!body.hasAttribute("scrollY")) {
        body.setAttribute("scrollY", String(pageY));
        $(body).addClass("lockbody");
    }

    body.addEventListener("touchmove", lockScrollHandle, { passive: false });
}

// 스크롤 잠금 해제
function enableScroll() {
    const body = document.querySelector("body");

    if (body.hasAttribute("scrollY")) {
        $(body).removeClass("lockbody");
        body.scrollTop = Number(body.getAttribute("scrollY"));
        body.removeAttribute("scrollY");
    }

    body.removeEventListener("touchmove", lockScrollHandle, { passive: true });
}

//패밀리사이트
function familySite(_target) {
    console.log("family");
    var el = _target.parent();
    var speed = 300;
    if (el.hasClass("open")) {
        //닫힘
        el.removeClass("open");
        el.find(".familysite").stop().slideUp(speed);
    } else {
        //열림
        el.addClass("open");
        el.find(".familysite").stop().slideDown(speed);
        $('html, body').animate({ scrollTop: $(document).height() }, speed);
    }
}

// 영역에 눌렸을 때 반응하는 스크립트
document.addEventListener("click", function (event) {
    // 검색레이어 딤영역 클릭 타겟
    if (event == event.target) {
        
    }
});
