// 멀티헤더를 위한 글로벌 변수 초기화
var currentPage;

$(document).ready(function () {
    setCSS();

    // 멀티헤더를 위한 현재페이지 표시
    if (currentPage == undefined) {
        currentPage = "sub";
    }
    console.log(currentPage);
    $(".header").addClass(currentPage);

    if ($(".kv_full").length) {
        fullImage(".kv_full");
    }

    kv_swiper();
    cate_swiper();
    scrollAtcList();
    issueAtcList();
    setAtcList();
    $("header").length && headerSticky();
    allmenuOpen();
    initOnDevice();
    inputBind();
    articleSlidePc();
    articleSlideMo();
    colslideAtcList();
    top3AtcList();
    tagAtcList();
    evenAtcList();
    shoppingList();

    // 지도 상세 설명 더보기 토글
    $(".comment_box").commentToggle();

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
            $(this)
            .closest("[data-selectbox]")
            .find("[data-value]")
            .text(selectedText);
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
        $(".search_layer")
            .fadeIn(200)
            .addClass("open")
            .children()
            .append("<div class='sl_bg'></div>");
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
                if (scrollTop > lastScroll && lastScroll > headerHeight + headerBottomHeight) {
                //down
                if (header.hasClass("view")) {
                    //기사상세 헤더
                    console.log("down > 11 ");
                    if (headerTop < scrollTop) {
                        header.addClass("active");
                    }
                } else {
                    // header.addClass('down');
                    if ($("body").hasClass("is_pc")) {
                        if (header.hasClass("main")) {
                            header.css("transform", `translate(0, ${-headerTopHeight}px)`);
                            // header.css('top', -($('.header_top').outerHeight()));
                        }
                    } else {
                        if (header.hasClass("main") || header.hasClass("sub")) {
                            //header.css('transform', `translate(0, ${-(headerTopHeight)}px)`)
                            header.css("transform", `translate(0, ${-headerTopHeight}px)`);
                            // header.css('top', -($('.header_top').outerHeight()));
                        }
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
                        // header.removeClass('down')
                        //header.css('transform', ``)
                        container.removeAttr("style");
                    }
                }
                lastScroll = scrollTop;
            } else if (scrollTop < headerHeight + delta + $(".ad_google").height()) {
                header.css("transform", "translate(0, 0)");
            }
        }

        // ios 16 이상 bouncing 오류 대응
        // if (scrollTop > headerHeight) {
        //     document.documentElement.classList.add('non-oby')
        // } else {
        //     document.documentElement.classList.remove('non-oby')
        // }
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

    $(".has_menu > a > span").click(function (e) {
        var $depth1 = $(this).parent().parent();
        var $btnTxt = $(this).find("em");

        console.log($(this));
        e.preventDefault();
        $depth1.toggleClass("open");

        if ($depth1.hasClass("open")) $btnTxt.text("닫기");
        else $btnTxt.text("열기");
    });

    $(".allmenu_wrap .allmenu_dimmed").click(close);
}

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

//메인 풀이미지형
function fullImage(el) {
    if (el.length <= 0) return;

    var oriWidth = $(el).find(".imgbox img")[0].naturalWidth;
    var oriHeight = $(el).find(".imgbox img")[0].naturalHeight;
    var ratio = (oriHeight / oriWidth) * 100;

    $(el)
        .find(".imgbox")
        .css({
        paddingTop: ratio + "%",
        });
}

//메인 슬라이드 배너
function kv_swiper() {
    var kv_Swipers = [];
    if ($(".kv_swiper").find(".swiper-slide").length == 1) {
        $(".kv_swiper").addClass("only");
    }

    var _loop;

    $(".kv_swiper").each(function (i) {
        if ($(this).find(".swiper-slide").length == 1) {
        _loop = false;
        } else {
        _loop = true;
        }

        $(this).attr("data-index", i);
        var slideitem = $(".kv_swiper .swiper-slide");

        kv_Swipers[i] = new Swiper('.kv_swiper[data-index="' + i + '"]', {
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        speed: 500,
        loop: _loop,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.kv_swiper[data-index="' + i + '"] .swiper-pagination',
            clickable: true,
        },
        navigation: {
            prevEl: '.kv_swiper[data-index="' + i + '"] .btn_prev',
            nextEl: '.kv_swiper[data-index="' + i + '"] .btn_next',
        },
        watchSlidesProgress: true,
        a11y: {
            prevSlideMessage: "이전 슬라이드",
            nextSlideMessage: "다음 슬라이드",
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        on: {
            slideChange: function () {
            $(".is_pc .kv_swiper .swiper-slide")
                .find(".imgbox img")
                .css("transform", "scale(1.0)")
                .removeAttr("style");
            },
        },
        });
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

//기획 기사, 큐레이션 모듈
function scrollAtcList() {
    var scrollAtcList = $(".scroll_atc_list");
    var ww = window.innerWidth;
    var mySwiper = undefined;
    if (scrollAtcList.length <= 0) return;

    function initSwiper() {
        scrollAtcList.each(function () {
        //각각을 스와이프 적용
        mySwiper = new Swiper(this, {
            slidesPerView: 1.14, //초기값 설정 모바일값 먼저
            spaceBetween: 12,
            loop: false,
            autoplay: false,
            speed: 1000,
            breakpoints: {
            769: {
                //브라우저가 768보다 클 때
                slidesPerView: 2,
                spaceBetween: 20,
                scrollbar: {
                el: ".swiper-scrollbar",
                },
            },
            1024: {
                //브라우저가 1024보다 클 때
                slidesPerView: 3,
                spaceBetween: 24,
                scrollbar: {
                el: ".swiper-scrollbar",
                },
            },
            },
        });
        });
  }

  initSwiper();

    $(window).on("resize", function () {
        ww = window.innerWidth;
        initSwiper();
    });
}

//금주의 인기기사(TOP3)
function top3AtcList() {
    var top3AtcList = $(".top3_atc_list");
    var ww = window.innerWidth;
    var mySwiper = undefined;
    if (top3AtcList.length <= 0) return;

    function initSwiper() {
        //768px 보다 적을 때 swiper 실행
        if (ww <= 768 && mySwiper == undefined) {
            top3AtcList.each(function () {
                //각각을 스와이프 적용
                mySwiper = new Swiper(this, {
                slidesPerView: 1.14,
                spaceBetween: 12,
                loop: false,
                autoplay: false,
                speed: 1000,
                observer: true,
                observeParents: true,
                watchOverflow: true,
                });
            });
        } else if (ww > 768 && mySwiper != undefined) {
            top3AtcList.each(function () {
                this.swiper.destroy(); //각각을 파괴함.
            });
            mySwiper = undefined;
        }
    }

    initSwiper();

    $(window).on("resize", function () {
        ww = window.innerWidth;
        initSwiper();
    });
}

// 상세 중간에 들어가는 기사 등
function articleSlidePc() {
    var swiper = $(".article_slide_pc .article_slide");
    if (swiper.length <= 0) return;
    function initSwiper() {
        swiper.each(function (i) {
            //각각을 스와이프 적용
            var slideBody = $(this).parents(".article_slide_pc");
            mySwiper = new Swiper(this, {
                slidesPerView: 4,
                spaceBetween: 24,
                loop: true,
                autoplay: false,
                speed: 500,
                pagination: {
                el: slideBody.find(".article_slide_pagination"),
                type: "progressbar",
                },
                navigation: {
                nextEl: slideBody.find(".article_slide_next"),
                prevEl: slideBody.find(".article_slide_prev"),
                },
            });
        });
    }
    initSwiper();
}

// 상세 중간에 들어가는 기사 등
function articleSlideMo() {
    var swiper = $(".article_slide_mo .article_slide");
    if (swiper.length <= 0) return;
    function initSwiper() {
        var mySwiperArr = [];
        var slideBody = [];
        swiper.each(function (i) {
            //각각을 스와이프 적용
            slideBody[i] = $(this).parents(".article_slide_mo");
            mySwiperArr[i] = new Swiper(this, {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                autoplay: false,
                speed: 500,
                pagination: {
                el: slideBody[i].find(".pagination"),
                },
            });
        });
    }
    initSwiper();
}

//MOST LIKED ARTICLES
function colslideAtcList() {
    var colslideAtcList = $(".colslide_atc_list");
    var ww = window.innerWidth;
    var mySwiper = undefined;
    if (colslideAtcList.length <= 0) return;

    function initSwiper() {
        var mySwiperArr = [];
        var slideBody = [];
        //768px 보다 적을 때 swiper 실행
        if (ww <= 768 && mySwiper == undefined) {
            colslideAtcList.each(function (i) {
                //각각을 스와이프 적용
                slideBody[i] = $(this);
                var slideItem = slideBody[i].find(".swiper-slide");
                if (slideItem.length > 1) {
                    mySwiper = new Swiper(this, {
                        slidesPerView: 1,
                        spaceBetween: 24,
                        loop: true,
                        autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                        },
                        speed: 500,
                        pagination: {
                        el: slideBody[i].find(".swiper-pagination"),
                        },
                    });
                }
            });
        } else if (ww > 768 && mySwiper != undefined) {
            colslideAtcList.each(function () {
            this.swiper.destroy(); //각각을 파괴함.
        });
            mySwiper = undefined;
        }
    }

    initSwiper();

    $(window).on("resize", function () {
        ww = window.innerWidth;
        initSwiper();
    });
}

//4단 모듈 (최신 소식)
function issueAtcList() {
    var issueAtcList = $(".issue_atc_list"),
        mySwiper = undefined;
    if (issueAtcList.length <= 0) return;

    function initSwiper() {
        ww = window.innerWidth;

        //768px 부터 swiper 실행
        if (ww <= 768 && mySwiper == undefined) {
            issueAtcList.each(function () {
                //각각을 스와이프 적용
                gaps = "-3%";
                mySwiper = new Swiper(this, {
                    spaceBetween: gaps,
                    slidesPerView: 1.15,
                    centeredSlides: true,
                    roundLengths: true,
                    loop: true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    },
                    observer: true,
                    observeParents: true,
                    watchOverflow: true,
                });
            });
        } else if (ww > 768 && mySwiper != undefined) {
            issueAtcList.each(function () {
                this.swiper.destroy(); //각각을 파괴함.
            });
            mySwiper = undefined;
        }
    }

    $(window).on("resize", function () {
        initSwiper();
    });
    initSwiper();
}

//이 기사엔 이런 키워드 리스트
function tagAtcList() {
    var tagAtcList = $(".tag_atc_list"),
    mySwiper = undefined;
    if (tagAtcList.length <= 0) return;

    function initSwiper() {
        ww = window.innerWidth;

        //768px 부터 swiper 실행
        if (ww <= 768 && mySwiper == undefined) {
            tagAtcList.each(function () {
                //각각을 스와이프 적용
                mySwiper = new Swiper(this, {
                    slidesPerView: 1.5,
                    spaceBetween: 12,
                    loop: false,
                    autoplay: false,
                    speed: 1000,
                    observer: true,
                    observeParents: true,
                    watchOverflow: true,
                });
            });
        } else if (ww > 768 && mySwiper != undefined) {
            tagAtcList.each(function () {
                this.swiper.destroy(); //각각을 파괴함.
            });
            mySwiper = undefined;
        }
    }

    $(window).on("resize", function () {
        initSwiper();
    });
    initSwiper();
}

//서브메인 짝수 리스트 모듈
function evenAtcList() {
    var evenAtcList = $(".even_atc_list"),
        mySwiper = undefined;
    if (evenAtcList.length <= 0) return;

    function initSwiper() {
        ww = window.innerWidth;

        //768px 부터 swiper 실행
        if (ww <= 768 && mySwiper == undefined) {
            evenAtcList.each(function () {
                //각각을 스와이프 적용
                mySwiper = new Swiper(this, {
                    slidesPerView: 1.14,
                    spaceBetween: 12,
                    loop: false,
                    autoplay: false,
                    speed: 1000,
                    observer: true,
                    observeParents: true,
                    watchOverflow: true,
                });
            });
        } else if (ww > 768 && mySwiper != undefined) {
        evenAtcList.each(function () {
            this.swiper.destroy(); //각각을 파괴함.
        });
        mySwiper = undefined;
        }
    }

    $(window).on("resize", function () {
        initSwiper();
    });
    initSwiper();
}

//상품모듈
function shoppingList(){
	var shoppingList = $('.shopping_list'),
		mySwiper = undefined;
	if(shoppingList.length <= 0) return;

	function initSwiper() {
		ww = window.innerWidth;

		//768px 부터 swiper 실행
		if(ww <= 768 && mySwiper == undefined){
			shoppingList.each(function(){//각각을 스와이프 적용
				mySwiper = new Swiper(this, {//초기값 설정 모바일값 먼저
					slidesPerView: 1.14,
					spaceBetween: 12,
					loop: false,
					autoplay: false,
					speed: 1000,
					observer: true,
					observeParents: true,
					watchOverflow: true,
					breakpoints: {
						640: {//브라우저가 640보다 클 때
							slidesPerView: 2,
						},
					}
				});
			});
		} else if(ww > 768 && mySwiper != undefined){
			shoppingList.each(function(){
				this.swiper.destroy(); //각각을 파괴함.
			});
			mySwiper = undefined;
		}
	}

	$(window).on('resize', function () {
		initSwiper();
	});
	initSwiper();
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

//세트 모듈 (추천 인기 기사 모듈
function setAtcList() {
    var setAtcList = $(".set_atc_list"),
    mySwiper = undefined;
    if (setAtcList.length <= 0) return;

    function initSwiper() {
        ww = window.innerWidth;

        //768px 부터 swiper 실행
        if (ww <= 768 && mySwiper == undefined) {
            setAtcList.each(function () {
                //각각을 스와이프 적용
                mySwiper = new Swiper(this, {
                    spaceBetween: 20,
                    slidesPerView: 1,
                    loop: true,
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
            });
        } else if (ww > 768 && mySwiper != undefined) {
            setAtcList.each(function () {
                this.swiper.destroy(); //각각을 파괴함.
            });
            mySwiper = undefined;
        }
    }

    $(window).on("resize", function () {
        initSwiper();
    });
    initSwiper();
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

//패밀리사이트
function familySite(_target) {
    var el = _target.parent();
    if (el.hasClass("open")) {
        //닫힘
        el.removeClass("open");
        el.find(".familysite").stop().slideUp(300);
    } else {
        //열림
        el.addClass("open");
        el.find(".familysite").stop().slideDown(300);
    }
}

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

// 상세페이지 댓글 접기
$.fn.commentToggle = function () {
    this.off();

    return this.each(function (i) {
        var cBox = $(this);
        var cBoxBtnWrap = cBox.find(".btn_box");
        var cBoxToggle = cBox.find(".btn_txt.has_toggle");
        var cBoxToggleTxt = cBox.find(".btn_txt.has_toggle .txt");
        var commentTxt = cBox.find(".comment_txt");
        var commentTxtChild = cBox.find(".comment_txt .txt");
        var lineHeight = commentTxtChild.css("line-height").split("px")[0];

        // 3줄이 넘어가면 더보기 버튼이 보여야 합니다.
        if (commentTxtChild.height() > lineHeight * 3) {
            cBoxBtnWrap.css("display", "flex");
            commentTxt.addClass("hide");
            cBoxToggle.removeClass("on");
            cBoxToggleTxt.text("더보기");
        }

        //리사이징시 재호출되어 중복을 방지하기 위한 이벤트 리스너 제거
        cBoxToggle.off("click");

        cBoxToggle.on("click", function () {
            if ($(this).hasClass("on")) {
                $(this).removeClass("on").children().text("더보기");
                commentTxt.addClass("hide");
            } else {
                $(this).addClass("on").children().text("접기");
                commentTxt.removeClass("hide");
            }
        });
    });
    };

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

//디바이스 체크
$(window).on("load resize", function () {
    if (window.innerWidth > 768) {
        //PC
        $("body").removeClass("is_mobile").addClass("is_pc");
    } else {
        //Mobile
        $("body").removeClass("is_pc").addClass("is_mobile");
    }
    initOnDevice();

    // 상세페이지 댓글 접기
    $(".comment_box").commentToggle();
});

// 티커 리사이즈시 이미지값 다시 가져오기
$.fn.tickerResizeWidth = function () {
    var tickerBody = [];
    return this.each(function (i) {
        tickerBody[i] = $(this).find(".carouselTicker__list");
        var itemWidth = 0;
        var item = tickerBody[i].find(".carouselTicker__item");
        for (j = 0; j < item.length; j++) {
            itemWidth += item.eq(j).outerWidth();
        }
        tickerBody[i].width(itemWidth + 1);
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

// 자유형식탭 (숨겨야 하는 요소, 보여야 하는 요소 클래스명으로 입력, 내가찍은 탭버튼)
// function freeTab (hideEl, showEl, clicked) {
//   const clickedBtn = $(clicked);
//   const hideElement = hideEl;
//   const showElement = showEl;
//   $(hideEl).hide();
//   $(showEl).show();
//   clickedBtn.parents('.tab_menu').find('li').removeClass('on');
//   clickedBtn.parent().addClass('on');
// }

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

// 화보 딤 슬라이드 열기
function openPhotoViewer() {
    $(".photoViewer").addClass("active");
    $("body").addClass("lockbody");
    document.ontouchmove = function (event) {
        event.preventDefault();
    };
}

// 화보 딤 슬라이드
$.fn.photoViewerSwiper = function () {
    var photoViewerArr = [];
    var pvSwiper = [];
    return this.each(function (i) {
        photoViewerArr[i] = $(this);
        pvSwiper[i] = photoViewerArr[i].find(".pvSwiper");
        var next = photoViewerArr[i].find(".pv_next");
        var prev = photoViewerArr[i].find(".pv_prev");
        var close = photoViewerArr[i].find(".pv_close");
        pvSwiper[i] = new Swiper(pvSwiper[i], {
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
        });
        close.on("click", function () {
            console.log("close");
            photoViewerArr[i].removeClass("active");
            $("body").removeClass("lockbody");
            enableScroll();
        });

        if (pvSwiper[i].slides.length <= 1) {
            pvSwiper[i].navigation.nextEl.style.display = "none";
            pvSwiper[i].navigation.prevEl.style.display = "none";
        }
    });
    document.ontouchmove = null;
};

// 배너 슬라이드 페이지네이션
$.fn.banSlide = function () {
    var banArray = [];
    return this.each(function (i) {
        banArray[i] = $(this);
        var pagination = banArray[i].find(".swiper-pagination");
        var slideItem = banArray[i].find(".swiper-slide");
        if (slideItem.length > 1) {
            var banSlide = new Swiper(banArray[i], {
                pagination: {
                el: pagination,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                loop: true,
            });
        }
    });
};

// 이벤트 리스트 슬라이드 페이지네이션
$.fn.promoBanSlide = function () {
    var banArray = [];
    return this.each(function (i) {
        banArray[i] = $(this);
        var pagination = banArray[i].find(".swiper-pagination");
        var slideItem = banArray[i].find(".swiper-slide");
        var next = banArray[i].find(".btn_next");
        var prev = banArray[i].find(".btn_prev");
        if (slideItem.length > 1) {
            var banSlide = new Swiper(banArray[i], {
                pagination: {
                    el: pagination,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                loop: true,
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
            });
        }
    });
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
