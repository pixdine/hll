$(window).on("load resize", function () {
    // 플로팅메뉴 실행
    $(".floating-menu").floatingMenu();

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

// PC 오프닝 스크롤 트리거
ScrollTrigger.create({
    trigger: ".key-visual",
    anticipatePin: 1,
    start: "top top",
    pin: true,
    end: keyvisualContents.length * (innerHeight / 1.5) + innerHeight,
});
  
// 오프닝 두번째 화면에서 이미지값 가져오기
var scrollImgW = 0;
scrollImgW =
$(".km-section02 .slide-img img").eq(0).width() +
$(".km-section02 .slide-img img").eq(1).width() +
$(".km-section02 .slide-img img").eq(2).width() +
$(".km-section02 .slide-img img").eq(3).width() + 60;
scrollImgW = parseInt(scrollImgW);

console.log(scrollImgW, winInWidth, scrollImgW - winInWidth);

// GSAP 모바일
mm.add("(max-width: 767px)", () => {
    const kmSection = gsap.utils.toArray(".km-section");
    const kmTxtWrap = gsap.utils.toArray(".km-txt-wrap");
    window.onload = function () {
        setTimeout(() => {
            const km01TxtWrap = (document.querySelector(".km-section01 .km-txt-wrap").style.zIndex = 0);
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
        }, 1000);
    }

    ScrollTrigger.create({
        trigger: ".slide-img",
        start: "top 50%",
        end: "bottom 0%",
        scrub: true,
        animation: gsap.fromTo(".slide-img",
            { x: 0 },
            { x: -(scrollImgW - winInWidth) }
        ),
    });
});

// GSAP 피시
mm.add("(min-width: 768px)", () => {});
let initialized = false;
  
// 오프닝 섹션별 모션 처리
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
gsap.set(keyvisualContents[0], { autoAlpha: 1 });
  
// 오프닝 영상
const beginMotion = (e) => {
    if (keyvisualVideo.currentTime > 1 && !initialized) {
        keyvisualContents[0].tl.timeScale(1).play();
        initialized = true;
    }
};

// 텍스트 노출 영역 컨테이너
const sceneCover = gsap.utils.toArray(".scene-cover");
sceneCover.forEach((scene) => {
    ScrollTrigger.create({
        trigger: scene,
        start: "top 0%",
        end: "bottom 0%",
    });
});

// 텍스트 노출 영역 움직이는 요소
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

// 매체 변수 초기화
const mediaService = document.querySelector(".media-service");

// 매체 모션을 위한 스크롤 이벤트
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

    // 모바일 사이즈가 아닐 경우에만 움직이게
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
        });
        }
    }
});
  
// 매체 모션 작업을 반응형을 위한 이벤트
$(window).on("load resize", function () {
    const winInWidth = window.innerWidth;

    // 넓이보다 이미지 요소가 좁으면 가운데 정렬
    console.log(scrollImgW, winInWidth);
    if(scrollImgW < winInWidth) {
        $('.slide-img').addClass("hidden");
    } else {
        $('.slide-img').removeClass("hidden");
    }

    // 기존 PC에서 이동 되었던 마진값 초기화
    $(".is_mobile .media-service__text-wrap, .is_mobile .ms-img2, .is_mobile ms-img3, .is_mobile ms-img5")
        .css("margin-top", "0px");
    $(".is_pc .media-service").removeClass("active");

    var imgW = 0;
    imgW = ($(".media-service .ms-img1").width() + $(".media-service .ms-img2").width() + $(".media-service .ms-img3").width() + 24);
    imgW = parseInt(imgW);

    mm.add("(max-width: 767px)", () => {
        // 모바일에서 Y스크롤 이동만큼 X로 이동
        const msImgWrap = document.querySelectorAll(".is_mobile .media-service .ms-img-wrap");
        let msImgCont = [];
        msImgWrap.forEach((msImgCont, i) => {
            msImgCont[i] = msImgCont;
            ScrollTrigger.create({
                trigger: msImgCont[i],
                start: "top 50%",
                end: "bottom 0%",
                scrub: true,
                //markers: true,
                animation: gsap.fromTo(msImgCont[i], 
                    { 
                        x: 0 
                    },
                    { 
                        x: -(imgW - winInWidth)
                    }
                ),
            });
        });
    });
   
    // 매체 서비스 모바일에서 PC 버전으로 돌아갈 때 버그로 인해 style값 초기화
    if (winInWidth > 768) {
        setTimeout(() => {
            $(".ms-img-wrap").removeAttr("style");
        }, 10);
    }
});
  
// 하단 마지막 부분
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
    .from(service.querySelectorAll(`.theme-service__title .motion-wrap.direction-up > *`),
    {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
    }, 0)
    .from(service.querySelectorAll(`.theme-service__title .motion-wrap.direction-down > *`),
    {
        yPercent: 100,
        duration: 1,
        ease: "power4.inOut",
    }, 0)
    .from(service.querySelector(`.theme-service__description span`),
    {
        yPercent: 100,
        duration: 1,
        ease: "power4.inOut",
    }, 0)
    .from(service.querySelector(`.theme-service__link`),
    {
        autoAlpha: 0,
        duration: 1,
        ease: "power4.inOut",
    }, 0);
});
  
// 플로팅메뉴 프로토타입
$.fn.floatingMenu = function () {
    var fmBody = this;
    var fmSection = fmBody.find(".fm-section");
    var fmBtn = fmBody.find(".btn-f");
    fmBtn.on("click", function () {
        var chkCondition = $(this).hasClass("active");
        if (!chkCondition) {
            $(this).addClass("active").attr("title", "플로팅메뉴 닫기").children().text("닫기");
            fmSection.stop().slideDown(200);
        } else {
            $(this).removeClass("active").attr("title", "플로팅메뉴 열기").children().text("열기");
            fmSection.stop().slideUp(200);
        }
    });
};
  
// 헤더 배경색을 위한 섹션별 정의
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
  