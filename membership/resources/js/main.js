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

ScrollTrigger.create({
  trigger: ".key-visual",
  anticipatePin: 1,
  start: "top top",
  pin: true,
  end: keyvisualContents.length * (innerHeight / 1.5) + innerHeight,
});

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
    // animation: gsap.from(scene.querySelectorAll('.motion-wrap.direction-up > *'), {
    //     yPercent: 100,
    //     duration: 2,
    //     ease: "power4.inOut"
    // }, 0),
    onEnter: () => $(".header").addClass("dark"),
    onLeave: () => $(".header").removeClass("dark"),
    onEnterBack: () => $(".header").addClass("dark"),
    onLeaveBack: () => $(".header").removeClass("dark"),
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
      start: "-200 90%",
      end: "+200 10%",
      toggleActions: "play reverse play reverse",
    },
  });
});

const mediaService = document.querySelector(".media-service");
// ScrollTrigger.create({
//     trigger: mediaService,
//     start: "top top",
//     end: '+=400%',
//     pin: true,
//     pinSpacing: false
// });
// 화면이 모바일 사이즈가 아닐 때만 GSAP 애니메이션 적용

// 매체 마스크 이미지 영역
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

  if (!isTabletSize()) {
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
        if (msContY[0] < 0 && msOffsetY + windowHeight > 0) {
          header.classList.add("dark");
        } else if (msContY[1] < 0 && msContY[1] + windowHeight > 0) {
          header.classList.remove("dark");
        }
      });
    }
  }
});

$(window).on("load resize", function () {
  $(
    ".is_mobile .media-service__text-wrap, .is_mobile .ms-img2, .is_mobile ms-img3, .is_mobile ms-img5"
  ).css("margin-top", "0px");
});

const mediaServices = gsap.utils.toArray(".media-service__content");

function isMobileSize() {
  return window.innerWidth <= 768; // 768px를 모바일 기준으로 설정
}

function isTabletSize() {
  return window.innerWidth <= 1023; // 768px를 모바일 기준으로 설정
}

// mediaServices.forEach((service, i) => {
//   const text = service.querySelector(".media-service__text");
//   const image1 = service.querySelector(".media-service__image--01");
//   const image2 = service.querySelector(".media-service__image--02");
//   const image3 = service.querySelector(".media-service__image--03");
//   const image4 = service.querySelector(".media-service__image--04");
//   const image5 = service.querySelector(".media-service__image--05");
//   ScrollTrigger.create({
//     trigger: service,
//     start: "top top",
//     end: "bottom top",
//     // pin: true,
//     // pinSpacing: false,
//     scrub: true,
//     markers: true,
//     onUpdate: (st) => {
//       //const distance = st.scroll() - st.start - (st.end - st.start) / 2;
//       const distance = st.scroll() - st.start;

//       //gsap.to(text, { translateY: distance, duration: 0, ease: "none" });
//       // gsap.to(image1, {translateY: distance, duration:0, ease: "none"} )
//       // gsap.to(image2, {translateY: distance, duration:0, ease: "none"} )
//       // gsap.to(image3, {translateY: distance, duration:0, ease: "none"} )
//       // gsap.to(image4, {translateY: distance, duration:0, ease: "none"} )
//       // gsap.to(image5, {translateY: distance, duration:0, ease: "none"} )
//       //gsap.from(text, {yPercent: -100} )
//       //gsap.to(image1, {translateY: distance} )
//       //gsap.to(image2, {translateY: distance} )
//       // gsap.to(image3, {translateY: distance} )
//       // gsap.to(image4, {translateY: distance} )
//       // gsap.to(image5, {translateY: distance} )
//       //   if (i == 3) {
//       //     gsap.to(service, { autoAlpha: 0 });
//       //   } else {
//       //     gsap.to(service, { autoAlpha: 1 });
//       //   }
//     },
//     // onEnter: () => {
//     //     if (i == 1) $('.header').addClass('dark')
//     // },
//     // onEnter: () => {
//     //     if (i == 1) $('.header').addClass('dark')
//     // }
//   });
// });
// // mm.add("(max-width: 768px)", () => {
// //     mediaServices.forEach((service, i) => {
// //         const text = service.querySelector(".media-service__text")
// //         const images = service.querySelector(".media-service__images")
// //         ScrollTrigger.create({
// //             trigger: service,
// //             start: 'top bottom',
// //             end: 'bottom top',
// //             scrub: true,
// //             // markers: true,
// //             animation: gsap.to(images, {xPercent:-100})
// //         })
// //     })
// // })

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

// gsap 반응형
let mm = gsap.matchMedia();

mm.add("(max-width: 767px)", () => {
  let imgW =
    $(".ms-img1").width() + $(".ms-img2").width() + $(".ms-img3").width() + 24;

  msImgWrap = document.querySelectorAll(".is_mobile .ms-img-wrap");
  let content = [];
  msImgWrap.forEach((content, i) => {
    content[i] = content;
    ScrollTrigger.create({
      trigger: content[i],
      start: "top 90%",
      end: "bottom 0%",
      scrub: true,
      animation: gsap.to(content[i], { x: -(imgW - winInWidth) }),
    });
  });
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
