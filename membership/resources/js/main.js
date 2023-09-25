// 부드러운 스크롤 효과 niceScroll
$("html").niceScroll({
  scrollspeed: 20,
  mousescrollstep: 30,
});

gsap.registerPlugin(ScrollTrigger);

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

// 매체 마스크 이미지 영역
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const windowHeight = window.innerHeight;
  const ms = document.querySelector(".media-service");
  const msCont = document.querySelectorAll(".media-service__content");
  const textLayer = document.querySelectorAll(".media-service__text-wrap");
  const msImg2 = document.querySelectorAll(".ms-img2");
  const msImg3 = document.querySelectorAll(".ms-img3");
  const msImg5 = document.querySelectorAll(".ms-img5");
  let scrollTop = window.scrollY;
  let msOffsetY = ms.getBoundingClientRect().top;
  //console.log(scrollTop, msOffsetY);
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
});

const mediaServices = gsap.utils.toArray(".media-service__content");

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
