let currentPage;

$(() => {
    // 멀티헤더를 위한 현재페이지 표시
    if (currentPage == undefined) {
        currentPage = "sub";
    }
    console.log(currentPage);
    $(".header").addClass(currentPage);

    $("header").length && headerSticky(); // 헤더 스티키

    setCSS();
    allmenuOpen();
    initOnDevice();
    inputBind();
    moveTop();

    
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

    $(".btn_familysite").on("click", function(){
        familySite($(this));
    });

    //셀렉트박스
    $.fn.selectbox = function () {
        this.each(function (index, element) {
            var thisSelect = $(this);
            var defaultValue = $("[data-option] li.selected:last", element).text();
            var selectBtn = thisSelect.find(".select_option");
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

            selectBtn.click(function (event) {
                event.stopPropagation();
                var selectedText = $(this).text();
                console.log(selectedText);
                selectBtn.siblings(".select_option").removeClass("selected");
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
});

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
                    // console.log(i+1 + "번째 좋아요 버튼")
                } else {
                    $(this).removeClass("on");
                    // console.log(i+1 + "번째 좋아요 버튼 취소")
                }
            })
        });
    }
})(jQuery);

//iOS vh 대응
function setCSS() {
    var setVh = () => {
        document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", setVh);
    setVh();
}

//header sticky
function headerSticky() {
    var lastScroll = 0;
    var header = $(".header");
    var container = $(".container");
    var containerTop = container.offset().top;
    // var delta = 100; // ios bouce 오작동 방지를 위해 값에 여유를 두어야 합니다.

    var headerHeight = header.outerHeight();
    var delta = headerHeight;

    function scrollCallback(scrollTop) {
        // ios 15 이하 및 공통 처리
        var atTop = scrollTop <= 0;
        var atBottom = scrollTop >= window.scrollHeight - window.clientHeight;

        // body lock scroll 상태 계산 안함
        if (!$("body").hasClass("lockbody")) {
            // if (atTop) lastScroll = 0;
            // if (atBottom) lastScroll = window.scrollHeight - window.clientHeight;
            /* 2023-12-13 : 개발에서 수정한 부분 반영 */
            // if (atTop) {
            //     header.removeAttr("style");
            // }
            /* //2023-12-13 : 개발에서 수정한 부분 반영 */

            if (scrollTop > containerTop - headerHeight) {
                if ($("body").hasClass("scroll_down")) {
                    //down
                    if (header.hasClass("view")) {
                        header.addClass("active");
                    }
                } else if ($("body").hasClass("scroll_up")) {
                    // up
                    if (header.hasClass("view")) {
                        header.removeClass("active");
                        $(".popup_layer", header).fadeOut(100);
                    }
                }
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
    $(".has_menu").toggleClass("open", !document.body.classList.contains("is_mobile"));
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

//full popup
const popup = {
    stack: [],
    clientWidth: 0,
    dimmed: document.createElement("div"),
    open: function (_target, _type, _hasDimmed = true) {
        this.clientWidth = document.documentElement.clientWidth;
        var targetEl = $(`[data-${_type}="${_target}"]`);
        switch (_type) {
            case "popup":
                var popupCount = $(`.open[data-${_type}`).length || 0;
                if (popupCount > 0) targetEl.css("z-index", 200 + popupCount);
                    targetEl.fadeIn(100, function () {
                    $(this).addClass("open");
                });
                disableScroll();

                $(".popup_inner", targetEl).click(function (e) {
                    e.stopPropagation();
                });

                // $("html").css({
                //     height: "100%",
                //     overflow: "hidden",
                // });

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

// body lock scroll ios 대응
function lockScrollHandle(event) {
    const e = event || window.event;

    // body lock 에서 제외시킬 요소 정의
    // 전체 메뉴
    if (e.target.closest(".allmenu_wrap")) {
        return;
    }

    // 팝업 공통
    if (e.target.classList.contains("popup_cont")) {
        return;
    }
    if (e.target.closest(".popup_cont")) {
        return;
    }
    

    // 멀티 터치는 터치 되게 한다
    if (e.touches.length > 1) return;

    // event 초기화 속성이 있음 초기화
    // if (e.preventDefault) e.preventDefault();
    e.preventDefault();

    // return false;
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
            }, 200);
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
}).resize();

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

    toggleBtnGoToTop(currentScrollTop);

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

function toggleBtnGoToTop(currentScrollTop){
    const $btnTop = $(".btn_top");
    let footPosTop = $("#footer").offset().top;
    let anchor = currentScrollTop + $(window).height();

    if(anchor > footPosTop) {
        $btnTop.removeClass("fixed");
    } else {
        $btnTop.addClass("fixed");
    }

    if(currentScrollTop > 200) {
        $btnTop.fadeIn();
    } else {
        $btnTop.fadeOut();
    }
}

function moveTop() {
    $(".btn_top").on("click", function(){
        $("html, body").animate({scrollTop: 0}, 400);
    });
}


// 텍스트 에어리어
(function($) {
    $.fn.textareaWithCount = function (options) {
        // 기본 옵션값
        defaults = {
            delay: 4000,
            maxlength: 0,
        }

        var settings = $.extend({}, defaults, options);
        return this.each(function (i) {
            var taBody = $(this);
            var textarea = taBody.find(".textarea");
            taBody.attr("maxlength", settings.maxlength);
            var currentCnt = taBody.find('.current');
            var totalCnt = taBody.find('.total');
            totalCnt.text("/"+settings.maxlength);
            taBody.on('input', function() {
                var maxlength = textarea.val().length;
                currentCnt.text(maxlength);
            });
            taBody.on('focusin', function(){
                $(".is_mobile .popup_bottom").hide();
                taBody.addClass('on');
            });
            taBody.on('focusout', function(){
                $(".popup_bottom").show();
                taBody.removeClass('on');
            });
        });
    }
})(jQuery);