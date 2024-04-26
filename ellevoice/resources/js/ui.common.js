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

$(window).on("load", function () {
    $(".comment_box").commentToggle();
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
    let lastScroll = 0;
    const $header = $(".header");
    const $container = $(".container");
    const containerTop = $container.offset().top;
    const headerHeight = $header.outerHeight();
    const wHeight = $(window).outerHeight();
    const docHeight = $(document).outerHeight();

    function scrollCallback(scrollTop) {
        let atBottom = scrollTop + wHeight;

        // body lock scroll 상태 계산 안함
        if ($("body").hasClass("lockbody") === false) {
            const delta = Math.abs(lastScroll - scrollTop);// ios bouce 오작동 방지를 위해 값에 여유를 두어야 합니다.

            // 새로고침 했을 때, 실행
            if (lastScroll === 0) {
                lastScroll = scrollTop;
                return;
            };
            // ios 스크롤 모두 내려갔을 때, 헤더 바뀌는 이슈 방지
            if(atBottom >= docHeight) {
                //is bottom
                lastScroll = scrollTop;
                return;
            };
            if (scrollTop > containerTop - headerHeight && delta > 0) {
                if (scrollTop > lastScroll) {
                    //down
                    // console.log("down");
                    if ($header.hasClass("view")) {
                        $header.addClass("active");
                    }
                } else {
                    // up
                    // console.log("up");
                    if ($header.hasClass("view")) {
                        $header.removeClass("active");
                        $(".popup_layer", $header).fadeOut(100);
                    }
                }

                lastScroll = scrollTop;
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
    $(window).on("scroll", function (e) {
        let scrollTop = $(this).scrollTop();
        scrollCallback(scrollTop);

        window.requestAnimationFrame(function () {
            scrollCallback(scrollTop);
        });
    });
}

// 카테고리 펼치기/닫기
(function($) {
    $.fn.toggleBtnCate = function (options) {
        var settings = $.extend({
            // 기본 옵션값 필요한 경우에만 작성
        }, options)

        return this.each(function (i){
            var $cateWrap = $(this);
            var $btn = $cateWrap.find(".btnbox .fold");
            
            $btn.on("click", function () {
                $(".cate_inner").css("transform", "translate3d(0px, 0px, 0px)");
                if(!$(this).hasClass("on")){
                    //열림
                    $(this).addClass("on");
                    $cateWrap.addClass("on");
                } else {
                    //닫힘
                    $(this).removeClass("on");
                    $cateWrap.removeClass("on");
                }
            })
        });
    }
})(jQuery);

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
let cachedWidth = $(window).width();
$(window).on("load resize", function () {
    let newWidth = $(window).width();
    if (window.innerWidth > 768) {
        //PC
        $("body").removeClass("is_mobile").addClass("is_pc");
    } else {
        //Mobile
        $("body").removeClass("is_pc").addClass("is_mobile");
    }
    initOnDevice();

    if(newWidth !== cachedWidth) {
        // 상세페이지 댓글 접기
        $(".comment_box").commentToggle();
    }
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

// 이미지 첨부
(function($) {
    $.fn.attachPicture = function (options) {
        // 기본 옵션값
        defaults = {
            defaultMaxFiles: 10,
            defaultMaxSizeMB: 10,
            defaultCurrentFiles: 0
        }

        var settings = $.extend({}, defaults, options);
        return this.each(function (i) {
            if (!$(this).hasClass("attached")) {
                var apBody = $(this);
                var currentCnt = apBody.find(".attach_cnt .current");
                var totalCnt = apBody.find('.attach_cnt .total');
                var maxFiles = settings.defaultMaxFiles;
                var maxSizeMB = settings.defaultMaxSizeMB;
                var currentFiles = settings.defaultCurrentFiles;
                var totalSizeMB = 0;
                var attachPic = apBody.find(".attach_pic");
                var inpFile = apBody.find("#image-upload");
                var btnAttach = apBody.find(".btn_attach");
                totalCnt.text(settings.maxFiles);
    
                // 파일 선택 창을 열기 위한 버튼 핸들러
                btnAttach.click(function () {
                    if(btnAttach.val() != null && btnAttach.val() != '') {
                        maxFiles = btnAttach.val();
                    }else {
                        maxFiles = settings.defaultMaxFiles;
                    }
                    if (currentFiles < maxFiles) {
                        inpFile.click();
                    } else {
                        alert("첨부파일은 " + maxFiles + "개 까지 등록 가능합니다.");
                    }
                });
    
                // 파일이 선택되면 실행
                inpFile.change(function () {
                    var files = $(this)[0].files;
                    var newSizeMB = Array.from(files).reduce((total, file) => total + file.size, 0) / 1024 / 1024; // Size in MB of the new files

                    // 2024-02-28 : 파일 확장자 제한 추가
                    var allowedExtensions = ['jpeg', 'jpg', 'gif', 'png'];
                    var isAllowedFile = true;
                    Array.from(files).forEach((file,index) => {
                        var extension = file.name.split('.').pop().toLowerCase();
                        if (allowedExtensions.indexOf(extension) === -1) {
                            isAllowedFile = false;
                            return false;
                        }
                    });

                    // 파일의 수가 최대 허용 수를 초과하거나 파일 크기가 최대 허용 크기를 초과하는 경우 검사
                    if (!isAllowedFile) {
                        alert('지원하는 않는 확장자입니다.(허용 확장자: ' + allowedExtensions.join(', ') + ')');
                    } else if (files.length + currentFiles > maxFiles) {
                        // 파일 수 제한 초과 경고
                        alert("최대 " + maxFiles + "개의 파일만 업로드할 수 있습니다.");
                    } else if (totalSizeMB + newSizeMB > maxSizeMB) {
                        // 파일 크기 제한 초과 경고
                        alert("이미지 등록 용량을 초과했습니다. 다시 확인해 주세요!");
                    } else {
                        currentFiles += files.length;
                        totalSizeMB += newSizeMB;
                        // updateCounter();
                        // 선택된 각 파일에 대한 처리
                        Array.from(files).forEach(file => {
                            fileArr.push(file);
                            var fileSizeMB = file.size / 1024 / 1024; // Size in MB of the current file
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                // 첨부 이미지 및 삭제 버튼을 포함한 컨테이너 생성
                                var imgContainer = $('<div class="attach_img"></div>');
                                var img = $('<div class="att_img"><img src="' + e.target.result + '"></div>');
                                var btnDel = $('<button class="btn_del" title="첨부 이미지 삭제"><span class="blind">첨부 이미지 삭제</span></button>');
    
                                // 데이터에 파일 크기 저장
                                imgContainer.data('size', fileSizeMB);
    
                                btnDel.click(function () {
                                    // 파일 크기 줄이기
                                    totalSizeMB -= imgContainer.data('size');
                                    //fileArr 에서 제거
                                    let delIndex = $(".attach_img .btn_del").index(this);
                                    fileArr.splice(delIndex,1);
    
                                    // 이미지 컨테이너 제거
                                    imgContainer.remove();
                                    currentFiles--;
                                    updateCounter();
                                    console.log(totalSizeMB);
                                });
    
                                imgContainer.append(img).append(btnDel);
                                attachPic.append(imgContainer);
                            };
                            //팝업 취소 후 다시 누를시 이전 데이터가 먹고 들어가서 fileArr length로 수정
                            currentFiles = fileArr.length;
                            reader.readAsDataURL(file);
                            console.log(totalSizeMB);
                        });
                        updateCounter();
                        // 파일 처리가 완료된 후 input 필드 초기화
                        $(this).val(null);  // 현재 input의 값을 null로 설정하여 초기화
                    } 
                });                    
    
                // 현재 파일 수 업데이트
                function updateCounter() {
                    //수정일경우
                    let existFiles = Number($(".modify_popup .attach_pic_comp").find(".modifyFiles").val());
                    if(Object.is(existFiles, NaN)) {
                        existFiles = 0;
                    }
                    currentCnt.text(currentFiles + existFiles);
                    totalCnt.text(settings.defaultMaxFiles);
    
                    // 이미지개수에 따른 버튼 활성화 조절
                    updateUploadButtonState();
                }
    
                // 버튼의 활성화 또는 비활성화 상태를 설정합니다.
                function updateUploadButtonState() {
                    let existFiles = Number($(".modify_popup .attach_pic_comp").find(".modifyFiles").val());
                    if(Object.is(existFiles, NaN)) {
                        existFiles = 0;
                    }
                    if ((existFiles + currentFiles) >= maxFiles) {
                        btnAttach.prop('disabled', true); // 파일이 maxFiles 이상이면 버튼을 비활성화합니다.
                    } else {
                        btnAttach.prop('disabled', false); // 그렇지 않으면 버튼을 활성화합니다.
                    }
                }
    
                updateCounter();  // 초기 카운터 설정
            }
        });
    }
})(jQuery);


// 작가 swiper
function swiperWriter() { 
    const $swiperNewEssay = $('.swiper_new_essay .swiper');
    if ($swiperNewEssay.length === 0) return;

    $swiperNewEssay.each(function () {
        if (!this.swiper) {
            const $btnNext = $(this).find(".swiper-button-next");
            const $btnPrev = $(this).find(".swiper-button-prev");
            new Swiper(this, {
                observer: true,
                observeParents: true,
                slidesPerView: 2.65,
                spaceBetween: 12,
                navigation: {
                    nextEl: $btnNext,
                    prevEl: $btnPrev,
                },
                breakpoints: {
                    600: {
                        slidesPerView: 3.5,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                        // slidesPerView: 4.5,
                    },
                    1140: {
                        slidesPerView: 4,
                        spaceBetween: 75,
                    },
                    1370: {
                        slidesPerView: 5,
                        spaceBetween: 75,
                    }
                }
            });
        }
        
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

// 뉴스레터 구독자 리뷰 swiper
function swiperNewsletterReview() { 
    const $swiperNewsletterReview = $('.swiper_newsletter_review');
    if ($swiperNewsletterReview.length === 0) return;

    $swiperNewsletterReview.each(function () {
        if (!this.swiper) {
            const $btnNext = $(this).find(".swiper-button-next");
            const $btnPrev = $(this).find(".swiper-button-prev");
            new Swiper(this, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.7,
                spaceBetween: 12,
                centeredSlides: true,
                loop: true,
                navigation: {
                    nextEl: $btnNext,
                    prevEl: $btnPrev,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    }
                }
            });
        }
        
    });
}

/*Accordion*/
class Accordion {
    static #defaultOptions = {
        btn: ".accordion_btn",
        panel: ".accordion_panel",
        item: ".accordion_item",
        multiple: false
    };
    
    #options;
    #$wrap;
    #$item;
    #$panel;
    #isOpen;
    
    constructor(selector, _options = null) {
      this.#init(selector, _options);
    }
  
    #init(selector, _options) {
        this.#options = $.extend({}, Accordion.#defaultOptions, _options);
        this.#$wrap = $(selector);

        this.#initEvent();
    }
    #initEvent() {
        const self = this;
        this.#$wrap.find(this.#options.btn).each(function () {
            $(this).on("click", function () {
                self.#$item = $(this).closest(self.#options.item);
                self.#$panel = self.#$item.find(self.#options.panel);
                self.#isOpen = self.#$panel.is(":visible");

                if (self.#options.multiple === true) {
                    if (self.#isOpen) {
                        self.hide();
                    } else {
                        self.show();
                    }
                } else {
                    if (self.#isOpen) {
                        self.hide();
                    } else {
                        self.#$wrap.find(self.#options.item).removeClass("active");
                        self.#$wrap.find(self.#options.panel).slideUp();
                        self.show();
                    }
                }

            });
        });
    }

    show() {
        // console.log("show");
        this.#$item.addClass("active");
        this.#$panel.slideDown();
    }
    hide() {
        // console.log("hide");
        this.#$item.removeClass("active");
        this.#$panel.slideUp();
    }
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