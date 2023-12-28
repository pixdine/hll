$(document).ready(function () {
  // 메인 풀페이지
  var isFullpageInitialized = false;
  var fullpageApi;
  var introVideoPc = document.querySelector("#introVideoPc");
  var introVideoMo = document.querySelector("#introVideoMo");

  function initializeFullpage() {
    var wheelCount = 0;

    //fullpage
    $(".main_container").fullpage({
      fitToSection: false,
      autoScrolling: true,
      slidesToSections: true,
      showActiveTooltip: true,
      scrollingSpeed: 750,
      scrollBar: false,
      bigSectionsDestination: top,

      // ** 페이지를 불러온 후
      afterLoad: function (anchorLink, index, direction) {
        let width = this.width();
        // console.log("index", index, direction);

        if (index === 1) {
          // var introVod = document.querySelector(".intro_video");

          $(".section")
            .eq(index - 1)
            .addClass("after-load");
          if (!$(".section").eq(index).hasClass("after-load")) {
            AOS.init();
          }

          $(".intro_second").find("[data-aos]").removeClass("aos-animate");

          setTimeout(() => {
            $(".intro_first").addClass("active");
            // introVod.play();
            handleVideo(width);
            if (!$(".section").eq(index).hasClass("after-load")) {
              // console.log("START!!");
              $(".header").addClass("mode-white");
            }
          }, 1300);
          //   wheelCount = 0;
        } else {
          $(".section")
            .eq(index - 2)
            .find("[data-aos]")
            .removeClass("aos-animate");
          $(".section")
            .eq(index - 1)
            .find("[data-aos]")
            .addClass("aos-animate");
        }

        // if (index >= 3) {
        //   $(".header").addClass("scrolled");
        // } else {
        //   $(".header").removeClass("scrolled");
        // }
      },

      // ** 페이지를 떠날때
      onLeave: function (origin, destination, direction, index) {
        var prevIndex = destination - 1;
        // console.log("destination", destination, direction, origin);

        // AOS.refresh();
        if (origin == 1 && wheelCount < 1) {
          //   AOS.refresh();
          setTimeout(() => {
            $(".intro_first").addClass("hide");
            $(".intro_first").find("[data-aos]").removeClass("aos-animate");
          }, 750);
          // return false;
        } else {
          $(".intro_first").removeClass("hide");
        }

        $(".section").eq(origin).find("[data-aos]").removeClass("aos-animate");

        if (destination < 3) {
          $(".header").removeClass("scrolled");
          $(".header").addClass("mode-white");
        } else {
          $(".header").addClass("scrolled");
          $(".header").removeClass("mode-white");
        }

        const sectionLength = document.querySelectorAll(".section").length;
        if (destination == sectionLength - 1 && direction == "up") {
          // 마지막 섹션에서 페이지를 떠날 때 실행할 코드를 여기에 추가합니다.
          console.log("Leaving the last section");
          setTimeout(() => {
            $(".family_wrap").removeClass("open");
            $(".familysite").hide();
          }, 750);
        }
      },
      afterRender: function () {
        fullpageApi = this; // 이렇게 하면 fullpageApi 변수에 API 객체가 저장됩니다.
      },
      afterResize: function() {
        let width = this.width();
        handleVideo(width);
      }
    });

    isFullpageInitialized = true;

    document.addEventListener("wheel", function (event) {
      var bodyClass = document.body.className;
      var time = 750;
      if (bodyClass.includes("fp-viewing-0")) {
        if (event.deltaY < 0) {
          if (wheelCount > 0) {
            setTimeout(() => {
              wheelCount--;
            }, time);
          } else if (wheelCount <= 0) {
            $(".intro_first").removeClass("hide");
            $(".intro_first").find("[data-aos]").addClass("aos-animate");
            $(".intro_second").removeClass("active");
            $(".intro_second").find("[data-aos]").removeClass("aos-animate");
            wheelCount = 0;
          }
        } else if (event.deltaY > 0) {
          if (wheelCount < 2) {
            if (wheelCount < 1) {
              setTimeout(() => {
                wheelCount++;
              }, time);
            } else {
              wheelCount++;
            }
          }
        }

        // wheelCount가 2에 도달하면 다음 섹션으로 이동
        if (wheelCount >= 2) {
          wheelCount = 2; // wheelCount 초기화 (선택적)
        }
      }
    });
  }

  // Fullpage를 재실행하는 함수
  function reinitializeFullpage() {
    if (isFullpageInitialized) {
      // Fullpage 플러그인을 destroy합니다.
      $.fn.fullpage.destroy("all");
    }
    // Fullpage를 다시 초기화합니다.
    initializeFullpage();
  }

  // 디바이스에 따라 영상 실행 핸들러
  function handleVideo(width) {
    if(width <= 768) {
      console.log("mobile");
      introVideoMo.play();
      //  introVideoPc.pause();
      introVideoPc.currentTime = 0;
    } else {
      introVideoPc.play();
      // introVideoMo.pause();
      introVideoMo.currentTime = 0;
    }
  }

  // 최초 실행
  initializeFullpage();

  // 리사이징 이벤트 핸들러
  $(window).on("resize", function () {
    $(".header").removeClass("scrolled");
    $(".header").addClass("mode-white");
    $(".intro_first").removeClass("hide");
    $(".intro_first").find("[data-aos]").addClass("aos-animate");
    reinitializeFullpage();
  });
});

$(window).on("load", function () {
  // 로드 후 인트로 인터렉션
  $(".section").addClass("loaded");
});
