$(window).on("load resize", function () {
    if (!$("body").hasClass("is_mobile")) {
      // 부드러운 스크롤 효과 niceScroll
      $("html").niceScroll({
        scrollspeed: 20,
        mousescrollstep: 30,
        horizrailenabled: false,
      });
    } else {
      $("html").getNiceScroll().remove();
    }
  });
  
  gsap.registerPlugin(ScrollTrigger);
  
  const winInWidth = window.innerWidth;
  
  const keyvisualVideo = document.querySelector(".key-visual__video");
  const keyvisualContents = gsap.utils.toArray(".key-visual__content");
  
  // gsap 반응형
  let mm = gsap.matchMedia();
  
  ScrollTrigger.create({
    trigger: ".key-visual",
    anticipatePin: 1,
    start: "top top",
    pin: true,
    end: keyvisualContents.length * (innerHeight / 1.5) + innerHeight,
  });
  
  var scrollImgW = 0;
  scrollImgW =
    $(".km-section02 .slide-img img").eq(0).width() +
    $(".km-section02 .slide-img img").eq(1).width() +
    $(".km-section02 .slide-img img").eq(2).width() +
    $(".km-section02 .slide-img img").eq(3).width() +
    60;
  scrollImgW = parseInt(scrollImgW);
  
  mm.add("(max-width: 767px)", () => {
      const kmSection = gsap.utils.toArray(".km-section");
      const kmTxtWrap = gsap.utils.toArray(".km-txt-wrap");
      window.onload = function () {
          setTimeout(() => {
              const km01TxtWrap = (document.querySelector(
              ".km-section01 .km-txt-wrap"
              ).style.zIndex = 0);
              gsap.utils.toArray(".km-txt-wrap .km-txt1").forEach((item) => {
                  gsap.from(item, {
                      autoAlpha: 0,
                      yPercent: 100,
                      duration: 1.5,
                      ease: "power4.inOut",
                      scrollTrigger: {
                      trigger: item,
                      start: "-100 90%",
                      end: "+200 10%",
                      toggleActions: "play reverse play reverse",
                      },
                  });
              });
              gsap.utils.toArray(".km-txt-wrap .km-txt2").forEach((item) => {
                  gsap.from(item, {
                      autoAlpha: 0,
                      yPercent: 100,
                      duration: 1.5,
                      ease: "power4.inOut",
                      scrollTrigger: {
                      trigger: item,
                      start: "-100 90%",
                      end: "+200 10%",
                      toggleActions: "play reverse play reverse",
                      },
                  });
              });
              gsap.utils.toArray(".km-txt-wrap .km-txt3").forEach((item) => {
                  gsap.from(item, {
                      autoAlpha: 0,
                      yPercent: 100,
                      duration: 1.5,
                      ease: "power4.inOut",
                      scrollTrigger: {
                      trigger: item,
                      start: "-100 90%",
                      end: "+200 10%",
                      toggleActions: "play reverse play reverse",
                      },
                  });
              });
              gsap.utils.toArray(".km-txt-wrap .km-link").forEach((item) => {
                  gsap.from(item, {
                      autoAlpha: 0,
                      duration: 1.5,
                      ease: "power4.inOut",
                      scrollTrigger: {
                      trigger: item,
                      start: "-100 90%",
                      end: "+200 10%",
                      toggleActions: "play reverse play reverse",
                      },
                  });
              });
          }, 1200);
      }
  
    ScrollTrigger.create({
      trigger: ".slide-img",
      start: "top 50%",
      end: "bottom 0%",
      scrub: true,
      animation: gsap.fromTo(
        ".slide-img",
        { x: 0 },
        { x: -(scrollImgW - winInWidth) }
      ),
    });
  });
  
  mm.add("(min-width: 768px)", () => {});
  
  let initialized = false;
  
  keyvisualContents.forEach((content, i) => {
    if (i == 0) {
      content.tl = gsap
        .timeline({
          scrollTrigger: {
            start: `+=${i * 100}%`,
            end: "+=100%",
          },
        })
        .to(
          `.key-visual__content--0${i + 1} .key-visual__dimmed`,
          { opacity: 0.6, duration: 0.3 },
          -0.3
        )
        .from(`.key-visual__content--0${i + 1}`, i ? { autoAlpha: 0 } : {}, 0)
        .from(
          `.key-visual__content--0${
            i + 1
          } .key-visual__title .motion-wrap.direction-down > *`,
          {
            yPercent: 100,
            duration: 2,
            ease: "power4.inOut",
          },
          0
        )
        .from(
          `.key-visual__content--0${i + 1} .key-visual__description span`,
          {
            yPercent: 100,
            duration: 2,
            ease: "power4.inOut",
          },
          0
        )
        .from(
          `.key-visual__content--0${i + 1} .key-visual__link`,
          { autoAlpha: 0, duration: 2, ease: "power4.inOut" },
          0
        );
    } else {
      let scrollImg = content.querySelectorAll(".scroll-el img");
      let imgW = 12;
      scrollImg.forEach((item, i) => {
        imgW += item.clientWidth + 12;
      });
  
      content.tl = gsap
        .timeline({
          scrollTrigger: {
            start: `+=${i * 100}%`,
            end: "+=100%",
            onEnter: () => {
              content.tl.timeScale(1).play();
            },
            onLeaveBack: () => {
              content.tl.reverse();
            },
          },
        })
        .to(
          `.key-visual__content--0${i + 1} .key-visual__dimmed`,
          { opacity: 0.6, duration: 0.3 },
          -0.3
        )
        .from(`.key-visual__content--0${i + 1}`, i ? { autoAlpha: 0 } : {}, 0)
        .from(
          `.key-visual__content--0${
            i + 1
          } .key-visual__title .motion-wrap.direction-down > *`,
          {
            yPercent: 100,
            duration: 2,
            ease: "power4.inOut",
          },
          0
        )
        .from(
          `.key-visual__content--0${i + 1} .key-visual__description span`,
          {
            yPercent: 100,
            duration: 2,
            ease: "power4.inOut",
          },
          0
        )
        .from(
          `.key-visual__content--0${i + 1} .key-visual__link`,
          { autoAlpha: 0, duration: 2, ease: "power4.inOut" },
          0
        )
        .fromTo(
          ".scroll-el",
          {
            x: +winInWidth,
          },
          {
            x: -(imgW - winInWidth),
          }
        );
    }
  });
  
  gsap.set(keyvisualContents[0], { autoAlpha: 1 }); // alpha xxx
  
  const beginMotion = (e) => {
    if (keyvisualVideo.currentTime > 1.9 && !initialized) {
      keyvisualContents[0].tl.timeScale(1).play();
      // setTimeout(() => {
      //   $(".key-visual__content--01").addClass("active");
      // }, 700);
      initialized = true;
    }
  };
  
  const sceneCover = gsap.utils.toArray(".scene-cover");
  sceneCover.forEach((scene) => {
    ScrollTrigger.create({
      trigger: scene,
      start: "top 0%",
      end: "bottom 0%",
    });
  });
  
  gsap.utils.toArray(".scene-cover__container .direction-up").forEach((item) => {
    gsap.from(item, {
      autoAlpha: 0,
      yPercent: 100,
      duration: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: item,
        start: "-200 100%",
        end: "200 10%",
        toggleActions: "play reverse play reverse",
      },
    });
  });
  
  const mediaService = document.querySelector(".media-service");
  
  window.addEventListener("scroll", () => {
    function isMobileSize() {
      return window.innerWidth <= 767; // 768px를 모바일 기준으로 설정
    }
    const header = document.querySelector(".header");
    const windowHeight = window.innerHeight;
    const ms = document.querySelector(".media-service");
    const msCont = document.querySelectorAll(".media-service__content");
    const textLayer = document.querySelectorAll(".media-service__text-wrap");
    const msImg2 = document.querySelectorAll(".ms-img2");
    const msImg3 = document.querySelectorAll(".ms-img3");
    const msImg5 = document.querySelectorAll(".ms-img5");
  
    if (!isMobileSize()) {
      let scrollTop = window.scrollY;
      let msOffsetY = ms.getBoundingClientRect().top;
      // 처음 이미지가 올라오는 부분
      if (msOffsetY - windowHeight / 2 < 0) {
        ms.classList.add("active");
      }
  
      let msContArr = [];
  
      // 스크롤이 시작 될 때 각 영역 위치 변경
      if (msOffsetY < 0) {
        textLayer.forEach((item) => {
          item.style.marginTop = -msOffsetY + "px";
        });
        msImg2.forEach((item) => {
          item.style.marginTop = -(msOffsetY * 1.8) + "px";
        });
        msImg3.forEach((item) => {
          item.style.marginBottom = msOffsetY / 2 + "px";
        });
        msImg5.forEach((item) => {
          item.style.marginBottom = msOffsetY / 2 + "px";
        });
        msCont.forEach((item, i) => {
          let msContY = [];
          msContArr[i] = item;
          msContY[i] = msContArr[i].getBoundingClientRect().top;
          // if (msContY[0] < 0 && msOffsetY + windowHeight > 0) {
          //   header.classList.add("dark");
          // } else if (msContY[1] < 0 && msContY[1] + windowHeight > 0) {
          //   header.classList.remove("dark");
          // }
        });
      }
    }
  });
  
  $(window).on("load resize", function () {
    const winInWidth = window.innerWidth;
  
    $(
      ".is_mobile .media-service__text-wrap, .is_mobile .ms-img2, .is_mobile ms-img3, .is_mobile ms-img5"
    ).css("margin-top", "0px");
  
    $(".is_pc .media-service").removeClass("active");
  
    var imgW = 0;
    imgW =
      $(".ms-img1").width() + $(".ms-img2").width() + $(".ms-img3").width() + 24;
    imgW = parseInt(imgW);
  
    mm.add("(max-width: 767px)", () => {
      msImgWrap = document.querySelectorAll(".is_mobile .ms-img-wrap");
      let content = [];
      msImgWrap.forEach((content, i) => {
        content[i] = content;
        ScrollTrigger.create({
          trigger: content[i],
          start: "top 50%",
          end: "bottom 0%",
          scrub: true,
          animation: gsap.fromTo(
            content[i],
            { x: 0 },
            { x: -(imgW - winInWidth) }
          ),
        });
      });
    });
  
    // 미디어 서비스 
    if (winInWidth > 768) {
      setTimeout(() => {
          $(".ms-img-wrap").removeAttr("style");
      }, 10);
    }
  });
  
  const mediaServices = gsap.utils.toArray(".media-service__content");
  
  const themeServices = gsap.utils.toArray(".theme-service__content");
  
  themeServices.forEach((service, i) => {
    service.tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: service,
          start: `top 100%`,
          // end: "bottom bototm",
          end: "+=150%",
          // pin: true,
          toggleActions: "play reverse play reverse",
        },
      })
      .from(service.querySelector(`.theme-service__image`), {
        autoAlpha: 0,
        duration: 1,
        ease: "power4.inOut",
      })
      .from(
        service.querySelectorAll(
          `.theme-service__title .motion-wrap.direction-up > *`
        ),
        {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.5,
        },
        0
      )
      .from(
        service.querySelectorAll(
          `.theme-service__title .motion-wrap.direction-down > *`
        ),
        {
          yPercent: 100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.5,
        },
        0
      )
      .from(
        service.querySelector(`.theme-service__description span`),
        {
          yPercent: 100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.5,
        },
        0
      )
      .from(
        service.querySelector(`.theme-service__link`),
        {
          autoAlpha: 0,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.5,
        },
        0
      );
  });
  
  // 플로팅메뉴
  $.fn.floatingMenu = function () {
    var fmBody = this;
    var fmSection = fmBody.find(".fm-section");
    var fmBtn = fmBody.find(".btn-f");
    fmBtn.on("click", function () {
      var chkCondition = $(this).hasClass("active");
      if (!chkCondition) {
        $(this)
          .addClass("active")
          .attr("title", "플로팅메뉴 닫기")
          .children()
          .text("닫기");
        fmSection.stop().slideDown(200);
      } else {
        $(this)
          .removeClass("active")
          .attr("title", "플로팅메뉴 열기")
          .children()
          .text("열기");
        fmSection.stop().slideUp(200);
      }
    });
  };
  
  $(document).ready(function () {
    // 플로팅메뉴
    $(".floating-menu").floatingMenu();
  });
  
  // 헤더 색상을 위한 섹션별 정의
  const mainSectionArray = document.querySelectorAll(".header-chg-bg");
  mainSectionArray.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 0%",
      end: "bottom 0%",
      onEnter: () => $(".header").addClass("bg-white"),
      onLeave: () => $(".header").removeClass("bg-white"),
      onEnterBack: () => $(".header").addClass("bg-white"),
      onLeaveBack: () => $(".header").removeClass("bg-white"),
    });
  });
  