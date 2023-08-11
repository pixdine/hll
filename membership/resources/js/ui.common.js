$(document).ready(function () {
  setCSS();

 // allmenuOpen();
 // allmenuOpenMo();
  //initOnDevice();

  cate_swiper();
  scrollContList();
  //allmenuOpen();
  scrapList();

  //키워드 태그
  $(".tag_wrap .btnbox .btn_ico").on("click", tagOpen);
  showTagBtn();
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

//디바이스 체크
$(window)
  .on("resize", function () {
    if (window.innerWidth > 768) {
      //PC
      $("body").removeClass("is_mobile").addClass("is_pc");
    } else {
      //Mobile
      $("body").removeClass("is_pc").addClass("is_mobile");
    }
    initOnDevice();
  }).resize();


//전체메뉴 > 모바일 
function allmenuOpenMo() {
  const $body = document.querySelector("body");
  let scrollPosition = 0,
    clientWidth = 0;

  function open() {
    isCompute = true;
    clientWidth = document.documentElement.clientWidth;
    $(".allmenu_wrap").stop().fadeIn(100);
    $('body').addClass('lockbody');
   scrollPosition = window.pageYOffset;
    $body.style.overflow = "hidden";
    $body.style.position = "fixed";
    $body.style.top = `-${scrollPosition}px`;
  $(".header_top .btn_menu").addClass("on");
  }

  function close() {
    isCompute = true;
    console.log('close');
    $(".allmenu_wrap").stop().fadeOut(100);
    $("body").removeClass("lockbody");
    $body.style.removeProperty("overflow");
    $body.style.removeProperty("position");
    $body.style.removeProperty("top");
    window.scrollTo(0, scrollPosition);
    $(".header_top .btn_menu").removeClass("on");
  }

  $(".header_top .btn_menu").on('click', function () {
    if ($(this).hasClass('on')) close();
    else open();
  });

  $(".allmenu_list.depth1 > li").each(function () {
    $(this).toggleClass("has_menu", $(this).find(".depth2").length > 0);
  });

  $(".has_menu > a > span").click(function (e) {
    console.log(this);
    e.preventDefault();
    $(this).parent().parent().toggleClass("open");
  });

  $(".allmenu_wrap .allmenu_dimmed").click(close);
}

function allmenuOpen() {
  var $menuAll = $(".allmenu_wrap");
  $gnbArea = $(".header_gnb");

  var menuAllShow = {
    gnbHover: function () {
      $gnbArea
        .on("mouseover", function () {
          var hasClassOn = $menuAll.is('[class*="isMenuShow"]');
          if (!hasClassOn) {
            $menuAll.removeClass("isMenuShow");
          }
          $menuAll.addClass("isMenuShow");
        })
        .on("mouseleave", function () {
          $menuAll.removeClass("isMenuShow");
        });
    },

    menuAllHover: function () {
      $menuAll
        .on("mouseover", function () {
          var hasClassOn = $menuAll.is('[class*="isMenuShow"]');
          if (!hasClassOn) {
            $menuAll.removeClass("isMenuShow");
          }
          $menuAll.addClass("isMenuShow");
        })
        .on("mouseleave", function () {
          $menuAll.removeClass("isMenuShow");
        });
    },
  };

  menuAllShow.gnbHover();
  menuAllShow.menuAllHover();
}

function initOnDevice() {
  if ($('body').hasClass('is_mobile'))  allmenuOpenMo();
  else allmenuOpen(); 
}

// 카테고리별 썸네일 슬라이드
function cate_swiper() {
  var cateSwipers = [];

  $('[data-slide="sm_thumb_slide"]').each(function (i) {
    $(this).attr("data-index", i);

    if ($('[data-slide="sm_thumb_slide"]').length <= 0) return;

    if ($(this).find(".swiper-slide").length == 1) {
      $(this).addClass("only");
    } else {
      cateSwipers[i] = new Swiper(
        '[data-slide="sm_thumb_slide"][data-index="' + i + '"]',
        {
          slidesPerView: "auto",
          spaceBetween:20,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          speed: 400,
          pagination: {
            el:
              '[data-slide="sm_thumb_slide"][data-index="' +
              i +
              '"] .swiper-pagination',
            clickable: true,
          },
          observer: true,
          observeParents: true,
          watchOverflow: true,
        }
      );
    }
  });
}

//키워드 태그영역 더보기
function tagOpen(){
  if($(this).hasClass('on')){
    //닫힘
    $(this).removeClass('on');
    $('.tag_wrap').removeClass('on');
  }else{
    //열림
    $(this).addClass('on');
    $('.tag_wrap').addClass('on');
  }
}

//키워드 태그영역 가로 스크롤 체크 후 더보기 버튼 노출여부
function showTagBtn(){
  var totalWidth = 84;
  $('.tag_list li').each(function() {
    var liWidth = parseInt($(this).css('width'));
    totalWidth += liWidth;
  });

  if( window.innerWidth > totalWidth || window.innerWidth > 768 ){
    $('.tag_wrap .btnbox').hide();
  } else {
    $('.tag_wrap .btnbox').show();
  }
}


$(window).resize(function(){
  showTagBtn();
});

function scrollContList(){
  var scrollContList = $(".pointShop.pc");
  var ww = window.innerWidth;
  var mySwiper = undefined;
  if (scrollContList.length <= 0) return;
  
  function initSwiper(){
    if (ww > 768 && mySwiper == undefined) {
      scrollContList.each(function () {
        var mySwiper = new Swiper(".pointShop.pc", {
          slidesPerView: 5,
          spaceBetween:24,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1280: {
            slidesPerView:5,
            spaceBetween:24,
            },
            
            1023: {
            slidesPerView:4,
            spaceBetween:24,
            },
            
            769: {
            slidesPerView:3,
            },
          },
        });
      });
    } else if (ww <= 768 && mySwiper != undefined) {
      scrollContList.each(function () {

        this.swiper.destroy(); //각각을 파괴함.
      });
      mySwiper = undefined;
      cate_swiper(); 
    }
  }
  initSwiper();
  $(window).on("resize", function () {
    ww = window.innerWidth;
    initSwiper();
  });	
}

//스크랩 > 모바일에서만 작동
function scrapList(){

  console.log("scrap");
  
  var scrapList = $(".myscrap_list");
  var ww = window.innerWidth;
  var mySwiper = undefined;
  if (scrapList.length <= 0) return;

  function initSwiper() {
    //768px 보다 클 때 swiper 실행
    if (ww < 768 && mySwiper == undefined) {
      scrapList.each(function () {
        //각각을 스와이프 적용
        mySwiper = new Swiper(this, {
          spaceBetween: 30,
          pagination: {
            el: ".swiper-pagination",
          },
        });
      });
    } else if (ww > 768 && mySwiper != undefined) {
      scrapList.each(function () {
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


