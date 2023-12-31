$(document).ready(function () {
    setCSS(); //Ios 100vh 대응
    inputBind();//input

    $(".btn_familysite").click(function () {
        familySite($(this));
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
    $("[data-popsheet-open]").on("click", function (e) {
        popup.open($(this).attr("data-popsheet-open"), "popsheet");
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
    $("[data-popsheet-close]").on("click", function (e) {
        popup.close($(this).attr("data-popsheet-close"), "popsheet");
    });   

    // 비즈니스 스와이퍼
    $(".slide_magazine").bsnSwiper();
    

    // AD Info 스와이퍼
    $(".slide_adinfo").adBsnSwiper();
    
    
    // 현재 상태를 추적하기 위한 변수
    var currentDevice = '';

    if (window.innerWidth > 768){
        currentDevice = 'PC';
        $("body").addClass("is_pc");
        $(".header .gnb").removeAttr("style");
    } else {
        currentDevice = 'Mobile';
        $("body").addClass("is_mobile")
        $(".header .gnb_item.has_sm").addClass("open");
    }
    // 디바이스 체크 함수
    function checkDevice() {
        console.log('checkDevice', currentDevice);
        if (window.innerWidth > 768 && currentDevice !== 'PC') {
            //PC
            $("body").removeClass("is_mobile").addClass("is_pc");
            $(".header .gnb_item.has_sm").removeClass("open");
            $(".header .gnb").removeAttr("style");
            if($("html").hasClass("gnb_open")){
                $("html").css("overflow", "initial").removeClass("gnb_open");
            }
            currentDevice = 'PC'; // 현재 상태 업데이트
        } else if (window.innerWidth <= 768 && currentDevice !== 'Mobile') {
            //Mobile
            $("body").removeClass("is_pc").addClass("is_mobile");
            $(".header .gnb_item.has_sm").addClass("open");
            currentDevice = 'Mobile'; // 현재 상태 업데이트
        }
    }  

    $(".header").allMenu();
    
    //디바이스 체크
    $(window).on("load resize", function(){
        checkDevice();
    });    
});

// 전체메뉴 네비게이션
$.fn.allMenu = function(){
    const $this = this;
    const $Gnb = $this.find(".gnb");
    const $btnClose = $this.find(".btn-close-am");
    const $btnOpen = $this.find(".btn-open-am");
    const $gnbLink = $this.find(".has_sm .gnb_link");
    $btnOpen.on("click",function(){
        $Gnb.show();
        $(".header .gnb_item.has_sm").addClass("open");
        $("html").css("overflow", "hidden").addClass("gnb_open");
    });
    $btnClose.on("click",function(){
        $Gnb.hide();
        $("html").css("overflow", "initial").removeClass("gnb_open");
    });
    $gnbLink.on("click",function(e){
        if($("body").hasClass("is_mobile")){
            e.preventDefault();
            $(this).parent().toggleClass("open");
        }
    });
}

//full popup
const popup = {
    stack: [],
    clientWidth: 0,
    dimmed: document.createElement("div"),
    open: function (_target, _type, _hasDimmed = true) {
        this.clientWidth = document.documentElement.clientWidth;
        var targetEl = $(`[data-${_type}="${_target}"]`);
        // document.ontouchmove = function (event) {
        //     event.preventDefault();
        // };
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
            case "popsheet":
                targetEl.addClass("top");

                $("[data-popsheet-open]", targetEl).click(function (e) {
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

        if (_type == 'popsheet'){
            targetEl.removeClass("top");
            adjustPad();
        } else {
            targetEl.fadeOut(100, adjustPad);
        }
    },
};

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

//패밀리사이트
function familySite(_target) {
    var el = _target.parent();
    var speed = 300;
    var chkMainContainer = $("#container").hasClass("main_container");
    if (el.hasClass("open")) {
        //닫힘
        el.removeClass("open");
        el.find(".familysite").stop().slideUp(speed);
    } else {
        //열림
        el.addClass("open");
        el.find(".familysite").stop().slideDown(speed);
        // $('html, body').animate({ scrollTop: $(document).height() }, speed);
        if(!chkMainContainer) {
            $('html, body').animate({ scrollTop: $(document).height() }, speed);
        } else {
            $('.foot-inner').animate({ scrollTop: 9999 }, speed);
        }
    }
}

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
}

// 아코디언리스트
$.fn.accordion = function () {
    this.each(function (index, element) {
        $("[data-accordion-header]", element).click(function (e) {
        e.preventDefault();
        const contentEl = $(
            `[data-accordion-content="${this.dataset.accordionHeader}"]`,
            element
        );
        const expanded = $(this).hasClass("is-expanded");
        $(this).toggleClass("is-expanded", !expanded);
        contentEl.css("max-height", expanded ? 0 : contentEl[0]?.scrollHeight);
        });
    });
};

// 비즈니스 스와이퍼
(function($) {
    $.fn.bsnSwiper = function(options) {
        var settings = $.extend({
            // 기본 옵션값 필요한 경우에만 작성
        }, options)
    
        return this.each(function (i){
            var swiperBody = $(this);
            var swiperContainer = $(this).find(".swiper");
            var swiperSlide = swiperBody.find(".swiper-slide");
            var btnNext = swiperBody.find(".button_next");
            var btnPrev = swiperBody.find(".button_prev");
            if(swiperSlide.length <= 3) {
                btnNext.hide();
                btnPrev.hide();
            }

            var exSwiper = new Swiper(swiperContainer, {
                slidesPerView:2,
                spaceBetween: 12,
                navigation: {
                    nextEl: btnNext,
                    prevEl: btnPrev,
                },
                breakpoints: {
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    }
                },  
            });
        });
    }
})(jQuery);

// AD Info 스와이퍼
(function($) {
    $.fn.adBsnSwiper = function(options) {
        var settings = $.extend({
            // 기본 옵션값 필요한 경우에만 작성
        }, options)
    
        return this.each(function (i){
            var swiperBody = $(this);
            var swiperContainer = $(this).find(".swiper");
            var swiperSlide = swiperBody.find(".swiper-slide");
            var btnNext = swiperBody.find(".button_next");
            var btnPrev = swiperBody.find(".button_prev");

            var exSwiper = new Swiper(swiperContainer, {
                slidesPerView:1,
                spaceBetween: 20,
                navigation: {
                    nextEl: btnNext,
                    prevEl: btnPrev,
                },
                breakpoints: {
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    }
                },  
            });
        });
    }
})(jQuery);



// 이미지 스와이퍼
(function($) {
    $.fn.imgSwiper = function(options) {
        var settings = $.extend({
            // 기본 옵션값 필요한 경우에만 작성
        }, options);

        // 스와이퍼 인스턴스 초기화
        var imgSwiper;

        // 스와이퍼 생성 함수
        function createSwiper(swiperBody) {
            var swiperSlides = swiperBody.find(".swiper-slide");
            var totalSlidesWidth = 0;

            // 모든 swiperSlide의 넓이를 더함
            swiperSlides.each(function() {
                totalSlidesWidth += $(this).outerWidth(true);
            });

            // window의 넓이를 구함
            var windowWidth = $(window).width();

            // swiperSlides의 총 넓이가 window의 넓이보다 큰 경우에만 Swiper 인스턴스 생성
            if(totalSlidesWidth > windowWidth){
                swiperBody.addClass('oversize');
                var imgSwiper = new Swiper(swiperBody, {
                    slidesPerView: 'auto',
                });
                swiperBody.data('imgSwiper', imgSwiper);
            }
        }

        // 스와이퍼 파괴 함수
        function destroySwiper(swiperBody) {
            var imgSwiper = swiperBody.data('imgSwiper');
            if(imgSwiper) {
                imgSwiper.destroy();
                swiperBody.removeData('imgSwiper');
                swiperBody.removeClass('oversize');
            }
        }

        return this.each(function() {
            var swiperBody = $(this);

            // resize 이벤트 핸들러
            $(window).on('resize', function() {
                destroySwiper(swiperBody);
                createSwiper(swiperBody);
            });

            createSwiper(swiperBody);
        });
    }
})(jQuery);

// 비지니스 자동 스크롤
(function($) {
    if($('#bMarquee').length > 0){
        if(window.innerWidth > 768) {
            // pc
            var lastWindowWidth; // 이전 가로 크기 저장 (초기값은 undefined)
            var lastWindowHeight; // 이전 세로 크기 저장 (초기값은 undefined)

            $.fn.handleMarquee = function(setSpeed, gap) {
                const marquee = this;
                let speed = setSpeed;
                let progress = 0;
                let mouseEntered = false;
    
                const container = marquee.find('.m_list');
                const contentItems = marquee.find('.m_list > *');
                let totalWidth = 0; // 총 너비를 저장할 변수
                // const itemLength = marquee.find('.m_list_item').length;
                // const elWidth = content.outerWidth();
    
                // 각 컨텐츠 항목의 너비를 계산하여 총 너비를 구함
                contentItems.each(function() {
                    totalWidth += $(this).outerWidth(true); // true를 전달하여 마진 포함
                });
    
                document.querySelector('.m_list').addEventListener('mouseenter', function() {
                    mouseEntered = true;
                });
                document.querySelector('.m_list').addEventListener('mouseleave', function() {
                    mouseEntered = false;
                    window.cancelAnimationFrame(loop);
                });
    
                function loop() {
                    if (!mouseEntered) {
                        progress -= speed;
                    }
                    if (progress <= -totalWidth) {
                        progress = 0;
                    }
                    container.css('transform', 'translateX(' + progress + 'px)');
                    scrollAni = window.requestAnimationFrame(loop);
                }
    
                function init() {
                    if (!marquee.hasClass("has_clone")) {
                        // 첫 번째 클론 생성
                        const firstClone = marquee.find('.m_list_item').clone().addClass("clone");
                        container.append(firstClone);
    
                        // 두 번째 클론 생성
                        const secondClone = marquee.find('.m_list_item').clone().addClass("clone");
                        container.append(secondClone);
                        
                        marquee.addClass("has_clone");
                    }
                    loop();
                }
    
                init();
    
                return marquee;
            };
    
            // 마키를 업데이트하는 함수
            function updateMarquee() {
                var windowWidth = $(window).width();
                var windowHeight = $(window).height();
    
                // 가로 크기에만 변경이 있을 때 실행
                if ((typeof lastWindowWidth === 'undefined' || lastWindowWidth !== windowWidth) && (typeof lastWindowWidth === 'undefined' || lastWindowHeight === windowHeight)) {
                    if($('#bMarquee').hasClass('logo_area')){
                        $('#bMarquee').handleMarquee(1);
                    } else {
                        $('#bMarquee').handleMarquee(windowWidth <= 768 ? 1 : 2);
                    }
                }
    
                lastWindowWidth = windowWidth; // 현재 가로 크기 업데이트
                lastWindowHeight = windowHeight; // 현재 세로 크기 업데이트
            }
        } else {
            // mo
            $('#bMarquee').marquee({
                speed: 50,
                gap: 0,
                // duration: 15000,
                delayBeforeStart: 0,
                direction: 'left',
                duplicated: true,
                pauseOnHover: true,
                startVisible: true
            });
        }

        // 로드 및 리사이징 이벤트 핸들러
        $(window).on('load resize', updateMarquee);
    }
})(jQuery);