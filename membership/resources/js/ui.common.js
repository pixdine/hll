$(document).ready(function () {
  setCSS();
  cate_swiper();
  scrollContList();
  inputBind();
  scrapList();

  //키워드 태그
  $(".tag_wrap .btnbox .btn_ico").on("click", tagOpen);
  showTagBtn();

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

  //공통 툴팁
  $.fn.tooltip = function () {
    var tooltipEl = $("button.tooltip", this);

    tooltipEl.each(function (index, tooltip) {
      $(tooltip).attr("id", "tooltip-" + index);
      $(tooltip).on("click", function (e) {
        e.stopPropagation();

        tooltipEl
          .not("#" + this.id)
          .find(".tooltip_layer.is-visible")
          .removeClass("is-visible");

        if (e.target.closest(".tooltip_layer")) return;

        const layerEl = $(">.tooltip_layer", this);
        if (!$(this).prop("disabled")) {
          if (!layerEl.hasClass("is-visible")) {
            showTooltip(this);
          } else {
            hideTooltip(this);
          }
        }
      });
    });

    $(document).on("click", function (e) {
      $("button.tooltip > .tooltip_layer.is-visible")
        .parent()
        .each(function () {
          hideTooltip(this);
        });
    });

    $(window).on("resize", function (e) {
      var tooltip = $(".tooltip_layer.is-visible").closest("button.tooltip")[0];
      showTooltip(tooltip);
    });

    function showTooltip(el) {
      const layerEl = $(">.tooltip_layer", el);

      if (layerEl[0]) {
        layerEl.addClass("is-visible");

        console.log(
          "window %o left %o outerWidth %o",
          $(window).width(),
          layerEl.offset().left,
          layerEl.outerWidth()
        );
        if ($(window).width() < layerEl.offset().left + layerEl.outerWidth()) {
          layerEl.addClass("revert");
          if (layerEl.offset().left - 20 < 0) {
            $("p", layerEl).css(
              "transform",
              `translate(${-layerEl.offset().left + 20}px, 0)`
            );
          }
        } else {
          console.log("툴팁오픈");
          // layerEl.removeClass('revert')
        }
      }
    }

    function hideTooltip(el) {
      const layerEl = $(">.tooltip_layer", el);
      if (layerEl[0]) {
        layerEl.removeClass(["is-visible", "revert"]);
        $("p", layerEl).css("transform", "");
      }
    }
  };
  $(document).tooltip();

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
  $("[data-accordion]").accordion();

  $.fn.selectbox = function () {
    this.each(function (index, element) {
      var thisSelect = $(this);
      var defaultValue = $("[data-option] > li.selected:last", element).text();
      $("[data-value]", element).text(defaultValue);

      $("[data-value]", element).click(function (event) {
        event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지

        $(this).siblings("[data-option]").slideToggle("fast");
        if ($(this).hasClass("opened") == true) $(this).removeClass("opened");
        else $(this).addClass("opened");
      });

      $("[data-option] > li", element).click(function (event) {
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
});

function showLayer(target) {
  $(`#${target}`).show();
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

//디바이스 체크
$(window)
  .on("load resize", function () {
    if (window.innerWidth > 768) {
      //PC
      $("body").removeClass("is_mobile").addClass("is_pc");
      allmenuItemSizeInitPc();
    } else {
      //Mobile
      $("body").removeClass("is_pc").addClass("is_mobile");
      allmenuItemSizeInitMo();
    }
    initOnDevice();
  })
  .resize();

//전체메뉴 아이템사이즈 pc
function allmenuItemSizeInitPc() {
  var itemHeightArr = [];
  var itemleng = $(".gnb_menu > li").length;
  for (i = 0; i < itemleng; i++) {
    itemHeightArr[i] = $(".gnb_menu > li").eq(i).width();
    $(".allmenu_list > li").eq(i).width(itemHeightArr[i]);
  }
}

//전체메뉴 아이템사이즈 mo
function allmenuItemSizeInitMo() {
  $(".allmenu_list > li").removeAttr("style");
}

//전체메뉴 > 모바일
function allmenuOpenMo() {
  // pc 이벤트 제거
  $(".allmenu_wrap").off(".allmenuOpen");
  $(".gnb_menu > li > a").off(".allmenuOpen");

  function open() {
    $(".allmenu_wrap").stop().fadeIn(100);
    disableScroll();
    $(".header_top .btn_menu").addClass("on");
  }

  function close() {
    $(".allmenu_wrap").stop().fadeOut(100);

    if (popup.stack.length === 0) enableScroll();
    $(".header_top .btn_menu").removeClass("on");
  }

  $(".header_top .btn_menu")
    .off()
    .on("click.allmenuOpenMo", function () {
      if ($(this).hasClass("on")) close();
      else open();
    });

  $(".allmenu_list.depth1 > li").each(function () {
    $(this).toggleClass("has_menu", $(this).find(".depth2").length > 0);
  });

  $(".has_menu > a")
    .off()
    .on("click.allmenuOpenMo", function (e) {
      console.log(this);
      e.preventDefault();
      $(this).parent().toggleClass("open");
    });

  $(".allmenu_wrap .allmenu_dimmed").off().on("click.allmenuOpenMo", close);
}

function allmenuOpen() {
  // 모바일 상태 제거
  $(".allmenu_wrap").removeAttr("style");
  $(".header_top .btn_menu").removeClass("on");
  enableScroll(); // 800px 화면 사이즈 때문에 넣음 ui 는 모바일인데 전체 메뉴는 pc 스타일 이어서 생기는 버그

  // 모바일 이벤트 제거
  $(".header_top .btn_menu").off("click.allmenuOpenMo");
  $(".has_menu > a").off("click.allmenuOpenMo");
  $(".allmenu_wrap .allmenu_dimmed").off("click.allmenuOpenMo");

  var $menuAll = $(".allmenu_wrap");
  $gnbArea = $(".gnb_menu > li > a");

  var menuAllShow = {
    gnbHover: function () {
      $gnbArea
        .off()
        .on("mouseover.allmenuOpen", function () {
          var hasClassOn = $menuAll.is('[class*="isMenuShow"]');
          if (!hasClassOn) {
            $menuAll.removeClass("isMenuShow");
          }
          $menuAll.addClass("isMenuShow");
        })
        .on("mouseleave.allmenuOpen", function () {
          $menuAll.removeClass("isMenuShow");
        });
    },

    menuAllHover: function () {
      $menuAll
        .off()
        .on("mouseover.allmenuOpen", function () {
          var hasClassOn = $menuAll.is('[class*="isMenuShow"]');
          if (!hasClassOn) {
            $menuAll.removeClass("isMenuShow");
          }
          $menuAll.addClass("isMenuShow");
        })
        .on("mouseleave.allmenuOpen", function () {
          $menuAll.removeClass("isMenuShow");
        });
    },
  };

  menuAllShow.gnbHover();
  menuAllShow.menuAllHover();
}

function initOnDevice() {
  if (window.innerWidth < 899) {
    allmenuOpenMo();
  } else {
    allmenuOpen();
  }

  // if ($('body').hasClass('is_mobile'))  {

  // } else {

  // }
}

// 카테고리별 썸네일 슬라이드
function cate_swiper() {
  $('[data-slide="sm_thumb_slide"]').each(function (i, el) {
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

//키워드 태그영역 더보기
function tagOpen() {
  if ($(this).hasClass("on")) {
    //닫힘
    $(this).removeClass("on");
    $(this).closest(".tag_wrap").removeClass("on");
  } else {
    //열림
    $(this).addClass("on");
    $(this).closest(".tag_wrap").addClass("on");
  }
}

//키워드 태그영역 가로 스크롤 체크 후 더보기 버튼 노출여부
function showTagBtn() {
  var totalWidth = 84;
  $(".tag_list li").each(function () {
    var liWidth = parseInt($(this).css("width"));
    totalWidth += liWidth;
  });

  if (window.innerWidth > totalWidth || window.innerWidth > 768) {
    $(".tag_wrap .btnbox").hide();
  } else {
    $(".tag_wrap .btnbox").show();
  }
}

$(window).resize(function () {
  showTagBtn();
});

function scrollContList() {
  var scrollContList = $(".pointShop.pc");
  var ww = window.innerWidth;
  // var mySwiper = undefined;
  if (scrollContList.length <= 0) return;

  function initSwiper() {
    if (ww > 768) {
      scrollContList.each(function () {
        if (!this.swiper) {
          new Swiper(this, {
            slidesPerView: 5,
            spaceBetween: 24,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            breakpoints: {
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },

              1023: {
                slidesPerView: 4,
                spaceBetween: 24,
              },

              769: {
                slidesPerView: 3,
              },
            },
          });
        }
      });
    } else if (ww <= 768) {
      scrollContList.each(function () {
        if (this.swiper) this.swiper.destroy(); //각각을 파괴함.
      });
      cate_swiper();
    }
  }
  initSwiper();
  $(window).on("resize", function () {
    window.requestAnimationFrame(function () {
      ww = window.innerWidth;
      initSwiper();
    });
  });
}

//스크랩 > 모바일에서만 작동
function scrapList() {
  var scrapList = $(".myscrap_list");
  var ww = window.innerWidth;
  if (scrapList.length <= 0) return;

  function initSwiper() {
    //768px 보다 클 때 swiper 실행
    if (ww < 768) {
      scrapList.each(function () {
        if (!this.swiper) {
          //각각을 스와이프 적용
          new Swiper(this, {
            spaceBetween: 30,
            pagination: {
              el: ".swiper-pagination",
            },
          });
        }
      });
    } else if (ww > 768) {
      scrapList.each(function () {
        if (this.swiper) this.swiper.destroy(); //각각을 파괴함.
      });
    }
  }

  initSwiper();

  $(window).on("resize", function () {
    window.requestAnimationFrame(function () {
      ww = window.innerWidth;
      initSwiper();
    });
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
        targetEl.fadeIn(100, function () {
          $(this).addClass("open");
        });
        disableScroll();

        $(".popup_inner", targetEl).click(function (e) {
          e.stopPropagation();
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
      this.dimmed.style.zIndex =
        window.getComputedStyle(targetEl[0]).getPropertyValue("z-index") - 1;
    }
  },
  close: function (_target, _type) {
    var _this = this;
    var targetEl = $(`[data-${_type}="${_target}"]`);

    targetEl.fadeOut(100, adjustPad);

    function adjustPad() {
      if (_type !== "layer") {
        _this.stack.splice(_this.stack.indexOf(targetEl), 1);
        if (!_this.stack.length) {
          enableScroll();
          $(_this.dimmed).fadeOut(100, $(_this.dimmed).remove);
        } else {
          _this.dimmed.style.zIndex =
            window
              .getComputedStyle(_this.stack[_this.stack.length - 1][0])
              .getPropertyValue("z-index") - 1;
        }
      }
    }
  },
};

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
  }

  body.removeEventListener("touchmove", lockScrollHandle, { passive: false });
}

// 공통 스크롤 이벤트
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;
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
  //console.log("스크롤 다운됨!");
  $("body").removeClass("scroll_up");
  $("body").addClass("scroll_down");
  $(".header_gnb .sub_menu").slideUp(200);
}

// 스크롤 업
function onScrollUp() {
  //console.log("스크롤 업됨!");
  $("body").addClass("scroll_up");
  $("body").removeClass("scroll_down");
}
