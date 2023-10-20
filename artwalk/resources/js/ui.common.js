// 멀티헤더를 위한 글로벌 변수 초기화
var currentPage;

$(document).ready(function () {
    // 멀티헤더를 위한 현재페이지 표시
    if (currentPage == undefined) {
        currentPage = "sub";
    }
    console.log(currentPage);
    $(".header").addClass(currentPage);

    setCSS(); //Ios 100vh 대응
    allmenuOpen(); //전체메뉴실행
    headerSticky() // 헤더 스티키

    $(".tab_wrap").commonTab(); // 탭메뉴, 탭컨텐츠

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
    
    // 전시정보 스와이퍼
    $(".swiper_pc_3_mo_auto").exSwiper();

    // 통이미지 배너 1개짜리 스와이퍼(PC, MO 이미지 따로) 
    $(".one_ban_swiper").oneImgSwiper(); // 매개변수로 시간과 루프 조절 기본값 4000, true 예)$(".one_ban_swiper").oneImgSwiper(3000, true);

    //셀렉트박스
    $.fn.selectbox = function () {
        this.each(function (index, element) {
            var thisSelect = $(this);
            var defaultValue = $("[data-option] li.selected:last", element).text();
            $("[data-value]", element).text(defaultValue);

            $("[data-value]", element).click(function (event) {
                event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지
                if ($(this).hasClass("opened")) {
                    $(this).removeClass("opened");
                    $("[data-option]").stop().slideUp("fast");
                } else {
                    $("[data-value]").removeClass("opened");
                    $(this).addClass("opened");
                    $("[data-option]").stop().slideUp("fast");
                    $(this).siblings("[data-option]").stop().slideDown("fast");
                }
            });

            $("[data-option] li", element).click(function (event) {
                event.stopPropagation();
                var selectedText = $(this).text();
                console.log(selectedText);
                $(".select_option").removeClass("selected");
                $(this).closest("[data-selectbox]").find("[data-value]").text(selectedText);
                $(this).addClass("selected").closest("[data-option]").slideUp("fast");
                $("[data-value]").removeClass("opened");
            });
        });

        $(document).click(function () {
            $(".opened[data-value]").each(function (index, element) {
                $(this).trigger("click");
            });
        });
    };

    $("[data-selectbox]").selectbox();

    // 상세페이지 댓글 기능 MORE DROP
    if ($(".more_drop").length > 0) {
        $(".more_drop").moreDrop();
    }

    // 검색레이어 열기
    $(".btn_search").on("click", function () {
        if (!$(this).hasClass("on")) {
            $(this).addClass("on");
            $(".search_layer").fadeIn(200).addClass("open").children().append("<div class='sl_bg'></div>");
            $("body").addClass("lockbody");
            disableScroll();
        } else {
            $(this).removeClass("on");
            $(".search_layer").fadeOut(200).removeClass("open");
            $(".sl_bg").remove();
            $("body").removeClass("lockbody");
            enableScroll();
        }
    });
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

// 영역에 눌렸을 때 반응하는 스크립트
document.addEventListener("click", function (event) {
    // 검색레이어 딤영역
    const searchWrapBg = document.querySelector(".sl_bg");
    // 검색레이어 딤영역 클릭 타겟
    if (searchWrapBg == event.target) {
        searchWrapBg.remove();
        $(".search_layer").removeClass("open").fadeOut(200);
        $(".btn_search").removeClass("on");
        $("body").removeClass("lockbody").removeAttr("scrolly");
        enableScroll();
    }
});

//header sticky
function headerSticky() {
    var lastScroll = 0;
    var headerTop = $(".header").offset().top;
    var delta = 100; // ios bouce 오작동 방지를 위해 값에 여유를 두어야 합니다.
    var header = $(".header");
    var container = $(".container");
    var bottomLogo = $(".header_bottom .logo a");

    if (currentPage === "main") {
        new IntersectionObserver(
        ([e]) => {
            if (e.intersectionRatio < 0.1 && !$("body").hasClass("is_mobile")) {
            bottomLogo.stop().fadeIn(200);
            } else {
            bottomLogo.stop().fadeOut(200);
            }
        },
        { threshold: [0.1, 1] }
        ).observe($(".header_top")[0]);
    }

    var headerTop = $(".header_top").offset().top;
    var headerHeight = $(".header").outerHeight();
    var headerTopHeight = $(".header_top").outerHeight();
    var headerBottomHeight = $(".header_bottom").outerHeight();

    function scrollCallback(scrollTop) {
        // ios 15 이하 및 공통 처리
        var atTop = scrollTop <= 0;
        var atBottom = scrollTop >= window.scrollHeight - window.clientHeight;

        // body lock scroll 상태 계산 안함
        if (!$("body").hasClass("lockbody")) {
            if (atTop) lastScroll = 0;
            if (atBottom) lastScroll = window.scrollHeight - window.clientHeight;

            if (Math.abs(lastScroll - scrollTop) > delta) {
                if (scrollTop > lastScroll && lastScroll > headerHeight) {
                    //down
                    if (header.hasClass("view")) {
                        //기사상세 헤더
                        console.log("down > 11 ");
                        if (headerTop < scrollTop) {
                            header.addClass("active");
                        }
                    }
                } else {
                    // up
                    if (header.hasClass("view")) {
                        //기사상세 헤더
                        $(".popup_layer", header).fadeOut(100);
                        header.removeClass("active");
                        /* 상세페이지 공유하기 레이어 관련 */

                        /* //상세페이지 공유하기 레이어 관련 */
                } else {
                        container.removeAttr("style");
                    }
                }
                lastScroll = scrollTop;
            } else if (scrollTop < headerHeight + delta + $(".ad_google").height()) {
                header.css("transform", "translate(0, 0)");
            }
        }
    }

    // 스크롤 이벤트 내부에서 repaint redrww 개선위해 requestAnimationFrame 사용
    $(window).on("scroll", function () {
        var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
        scrollCallback(scrollTop);

        window.requestAnimationFrame(function () {
            scrollCallback(scrollTop);
        });
    });

    // resize 이벤트 내부에서 repaint redrww 개선위해 requestAnimationFrame 사용
    $(window).on("resize", function () {
        window.requestAnimationFrame(function () {
            headerTopHeight = $(".header_top").outerHeight();
        });
    });
}

//전체메뉴
function allmenuOpen() {
    function open() {
        $(".allmenu_wrap").stop().fadeIn(100);
        disableScroll();
    }

    function close() {
        $(".allmenu_wrap").stop().fadeOut(100);
        if (popup.stack.length === 0 && !$(".search_layer").hasClass("open")) {
            enableScroll();
        }
    }

    $(".header .btn_menu").click(open);

    $(".btn_menu_close").click(close);

    $(".allmenu_list .depth1 > li").each(function () {
        $(this).toggleClass("has_menu", $(this).find(".depth2").length > 0);
    });

    $(".has_menu > a").click(function (e) {
        var $depth1 = $(this).parent();
        var $btnTxt = $(this).find("em");

        console.log($(this));
        e.preventDefault();
        $depth1.toggleClass("open");

        if ($depth1.hasClass("open")) $btnTxt.text("닫기");
        else $btnTxt.text("열기");
    });

    $(".allmenu_wrap .allmenu_dimmed").click(close);
}

//full popup
const popup = {
    stack: [],
    clientWidth: 0,
    dimmed: document.createElement("div"),
    open: function (_target, _type, _hasDimmed = true) {
        this.clientWidth = document.documentElement.clientWidth;
        var targetEl = $(`[data-${_type}="${_target}"]`);
        document.ontouchmove = function (event) {
            event.preventDefault();
        };
        switch (_type) {
            case "popup":
                var popupCount = $(`.open[data-${_type}`).length || 0;
                if (popupCount > 0) targetEl.css("z-index", 200 + popupCount);
                    targetEl.fadeIn(100, function () {
                    $(this).addClass("open");
                });
                // disableScroll();

                $(".popup_inner", targetEl).click(function (e) {
                    e.stopPropagation();
                });

                $("html").css({
                    height: "100%",
                    overflow: "hidden",
                });

                break;
            case "alert":
                targetEl.fadeIn(100);
                disableScroll();
                $("[data-alert]", targetEl).click(function () {
                    if ($(this).hasClass("open")) {
                        $(this).removeClass("open");
                        enableScroll();
                    }
                });

                $(".popup_alert_inner", targetEl).click(function (e) {
                    e.stopPropagation();
                });

                break;
            case "layer":
                targetEl.fadeIn(100);

                $("[data-layer]", targetEl).click(function (e) {
                    e.stopPropagation();
                });

                break;
            default:
                console.log("pop open default !");
                break;
            }

        // console.log("_type %o _hasDimmed %o",_type,_hasDimmed);
        if (_type !== "layer") {
            if (!this.stack.length) {
                if (_hasDimmed) {
                    this.dimmed.classList.add("dimmed");
                    this.dimmed.style.display = "none";
                    document.body.appendChild(this.dimmed);
                    $(this.dimmed).fadeIn(100);
                }
            }
            this.stack.push(targetEl);
            this.dimmed.style.zIndex = window.getComputedStyle(targetEl[0]).getPropertyValue("z-index") - 1;
        }
    },
    close: function (_target, _type) {
        document.ontouchmove = null;

        var _this = this;
        var targetEl = $(`[data-${_type}="${_target}"]`);

        targetEl.fadeOut(100, adjustPad);

        $("html").css({
            height: "initial",
            overflow: "initial",
        });

        function adjustPad() {
            if (_type !== "layer") {
                console.log(" _this.stack %o", _this.stack);
                _this.stack.splice(_this.stack.indexOf(targetEl), 1);
                $(".search_layer .cont_inner .sl_bg").remove();
                if (!_this.stack.length) {
                    enableScroll();
                    $(_this.dimmed).fadeOut(100, $(_this.dimmed).remove);
                } else {
                    _this.dimmed.style.zIndex = window.getComputedStyle(_this.stack[_this.stack.length - 1][0]).getPropertyValue("z-index") - 1;
                }
            }
        }
    },
};

function initOnDevice() {
    $(".has_menu").toggleClass(
        "open",
        !document.body.classList.contains("is_mobile")
    );
}

function inputBind() {
    $("input.inp").on("input", function (e) {
        if (e.target.value && !this.classList.contains("typed")) {
            this.classList.add("typed");
        } else if (!e.target.value && this.classList.contains("typed")) {
            this.classList.remove("typed");
        }
    });
    $("input.inp + .del").on("click", function () {
        $(this).prev("input").val("").removeClass("typed").focus();
    });
}

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

// 통이미지 배너 1개짜리 스와이퍼 (PC, MO 이미지 따로)
(function($) {
    $.fn.oneImgSwiper = function (options) {
        // 기본 옵션값
        defaults = {
            delay: 4000,
            loop: true,
        }

        var settings = $.extend({}, defaults, options);

        var swiperBody = this;
        if(swiperBody.find('.swiper-slide').length > 1) {
            return this.each(function (i) {
                var swiper = new Swiper($(this), {
                    spaceBetween: 20,
                    pagination: {
                        el: ".one_ban_swiper .swiper-pagination",
                        type: "fraction",
                    },
                    autoplay: {
                        delay: settings.delay,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },
                    loop: settings.loop
                });
    
                $(this).hover(function () {
                    swiper.autoplay.stop();
                }, function () {
                    swiper.autoplay.start();
                });
            });
        }
    }
})(jQuery);

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

// 공통 스크롤 이벤트
let lastScrollTop = 0;

$(window).on("scroll", function () {
    let currentScrollTop = $(window).scrollTop();
    if (currentScrollTop <= 0) {
        $(".header_gnb .gnb_menu .on .sub_menu").slideDown(200);
    }

    if (currentScrollTop > lastScrollTop) {
        // 스크롤 다운
        onScrollDown();
    } else if (currentScrollTop < lastScrollTop) {
        // 스크롤 업
        onScrollUp();
    }

    // 현재 스크롤 위치를 lastScrollTop에 저장
    lastScrollTop = currentScrollTop;
});

// 스크롤 다운
function onScrollDown() {
    // console.log("스크롤 다운됨!");
    $("body").removeClass("scroll_up");
    $("body").addClass("scroll_down");
}

// 스크롤 업
function onScrollUp() {
    // console.log("스크롤 업됨!");
    $("body").addClass("scroll_up");
    $("body").removeClass("scroll_down");
    if ($("body").hasClass("is_mobile")) {
        if (currentPage == "main" || currentPage == "sub") {
        $(".header").css("transform", "translate(0, 0)");
        }
    }
}

// 상세페이지 댓글 더보기 MORE DROP
$.fn.moreDrop = function () {
    return this.each(function (i) {
        var moreDropBody = $(this);
        var toggleBtn = moreDropBody.find(".btn_ico");
        var layerBox = moreDropBody.find(".layer_box");
        toggleBtn.on("click", function () {
            if (moreDropBody.hasClass("on")) {
                moreDropBody.removeClass("on");
            } else {
                moreDropBody.addClass("on");
                $(this).focus();
            }
        });
        toggleBtn.on("blur", function () {
            setTimeout(function () {
                moreDropBody.removeClass("on");
            }, 100);
        });
    });
};

// 공통탭 컨텐츠
$.fn.commonTab = function () {
    return this.each(function (i) {
        tabBody = $(this);
        const tabMenu = tabBody.find(".tab_menu");
        const tabBtn = tabMenu.find("a");
        tabBtn.on("click", function (e) {
            e.preventDefault();
            const curIdx = $(this).parent().index();
            console.log(curIdx);
            $(this).parent().siblings().removeClass("on");
            $(this).parent().addClass("on");
            $(this).parents(".tab_wrap").find(".tab_cont").removeClass("active").eq(curIdx).addClass("active");
        });
    });
};

// 좋아요 버튼
(function($) {
    $.fn.btnScrap = function (options) {
        var settings = $.extend({
            // 기본 옵션값 필요한 경우에만 작성
        }, options)

        return this.each(function (i){
            var scrapBtn = $(this);
            scrapBtn.on("click", function () {
                if(!$(this).hasClass("on")){
                    $(this).addClass("on");
                    console.log(i+1 + "번째 좋아요 버튼")
                } else {
                    $(this).removeClass("on");
                    console.log(i+1 + "번째 좋아요 버튼 취소")
                }
            })
        });
    }
})(jQuery);

//iOS vh 대응
function setCSS() {
    var setVh = () => {
        document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight}px`
        );
    };
    window.addEventListener("resize", setVh);
    setVh();
}

//상세페이지 프로그래스바
function progress_bar() {
    console.log("load progress bar");
    const progress_wrap = document.createElement("div");
    progress_wrap.setAttribute("class", "progress_bar");
    document.querySelector(".header").append(progress_wrap);
    var body = document.body;
    var bar = document.querySelector(".progress_bar");

    window.addEventListener("scroll", function () {
        // setTimeout(function() {
        if (!body.classList.contains("lockbody")) {
            var winScroll = $(window).scrollTop();
            // height = document.documentElement.scrollHeight - this.innerHeight;
            //height = window.scrollHeight - document.documentElement.scrollHeight;
            height = document.documentElement.scrollHeight - $(window).height() - $(".footer").height();
            bar.style.width = (winScroll / height) * 100 + "%";
        }
        // }, 300);
    });
}

// 상세, 화보 슬라이드
function viewImgSlide() {
    var viewImgSlide = $('[data-slide="slider-type01"]');
    if (viewImgSlide.length < 1) return false;

    viewImgSlide.each(function () {
        var $this = $(this);
        var swiper = new Swiper(".viewSwiper", {
            scrollbar: {
                el: ".swiper-scrollbar",
                hide: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
}

// 전시정보 스와이퍼
(function($) {
    $.fn.exSwiper = function(options) {
        var settings = $.extend({
            // 기본 옵션값 필요한 경우에만 작성
        }, options)
    
        return this.each(function (i){
            var swiperBody = $(this);
            var swiperSlide = swiperBody.find(".swiper-slide");
            var btnNext = swiperBody.siblings(".button_next");
            var btnPrev = swiperBody.siblings(".button_prev");
            if(swiperSlide.length <= 3) {
                btnNext.hide();
                btnPrev.hide();
            }

            var exSwiper = new Swiper(swiperBody, {
                slidesPerView: "auto",
                spaceBetween: 12,
                navigation: {
                    nextEl: btnNext,
                    prevEl: btnPrev,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    }
                },  
            });    
        });
    }
})(jQuery);

            