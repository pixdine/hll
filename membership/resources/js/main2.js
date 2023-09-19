// 부드러운 스크롤 효과


gsap.registerPlugin(ScrollTrigger)

const keyvisualVideo = document.querySelector('.key-visual__video')
const keyvisualContents = gsap.utils.toArray('.key-visual__content')

ScrollTrigger.create({
    trigger: ".key-visual",
    anticipatePin: 1,
    start: "top top",
    pin: true,
    end: keyvisualContents.length * (innerHeight / 1.5) + innerHeight,
});

let initialized = false

keyvisualContents.forEach((content, i) => {
    content.tl = gsap.timeline({
        scrollTrigger: {
            start: `+=${i * 100}%`,
            end: "+=100%",
            scrub: true,
            // onEnter: () => {
            //     content.tl.timeScale(1).play()
            // },
            // onLeaveBack: () => {
            //     content.tl.reverse()
            // }
        }
    })            
        .to(`.key-visual__content--0${i + 1} .key-visual__dimmed`, {opacity: 0.6, duration: 0.3}, -0.3)

    if (i != 0) {
        content.tl = gsap.timeline({
            scrollTrigger: {
                start: `+=${i * 100}%`,
                end: "+=100%",
                scrub: true,
                // onEnter: () => {
                //     content.tl.timeScale(1).play()
                // },
                // onLeaveBack: () => {
                //     content.tl.reverse()
                // }
                onEnter: () => content.classList.add("active"),
                onLeave: () => content.classList.remove("active"),
                onEnterBack: () => content.classList.add("active"),
                onLeaveBack: () => content.classList.remove("active")
            }
        })
            .from(`.key-visual__content--0${i + 1}`, i?{autoAlpha: 0}:{}, 0)
            // .from(`.key-visual__content--0${i + 1} .key-visual__title .motion-wrap.direction-down > *`, {
            //     yPercent: 100,
            //     duration: 2,
            //     ease: "power4.inOut"
            // }, 0)
            // .from(`.key-visual__content--0${i + 1} .key-visual__description span`, {
            //     yPercent: 100,
            //     duration: 2,
            //     ease: "power4.inOut"
            // }, 0)
            // .from(`.key-visual__content--0${i + 1} .key-visual__link`, {autoAlpha: 0, duration: 2, ease: "power4.inOut"}, 0)
    }
})

gsap.set(keyvisualContents[0], { autoAlpha: 1 }); // alpha xxx

const beginMotion = (e) => {
    if(keyvisualVideo.currentTime> 1.9 && !initialized) {
        //keyvisualContents[0].tl.timeScale(1).play()
        setTimeout(() => {
            $('.key-visual__content--01').addClass('active');
        }, 700);
        initialized = true
    }
}

const sceneCover = gsap.utils.toArray('.scene-cover')
sceneCover.forEach((scene) =>{
    ScrollTrigger.create({
        trigger: scene,
        start: 'top 0%',
        end: 'bottom 50%',
        pin: true,
        scrub: true,
        animation: gsap.from(scene.querySelectorAll('.motion-wrap.direction-up > *'), {
            yPercent: 100,
            duration: 2,
            ease: "power4.inOut",
            autoAlpha: 0
        }, 0)
        // onEnter: () => content.classList.add("active"),
        // onLeave: () => content.classList.remove("active"),
        // onEnterBack: () => content.classList.add("active"),
        // onLeaveBack: () => content.classList.remove("active")
    })
})

const mediaServices = gsap.utils.toArray('.media-service__content')

// ScrollTrigger.create({
//     trigger: ".media-service__container",
//     start: "top top",
//     anticipatePin: 1,
//     pin: true,
//     //pinSpacing: true,
//     markers: true,
//     end: `${mediaServices.length * innerHeight + innerHeight}px`
// })

const mm = gsap.matchMedia();

mediaServices.forEach((service, i) => {
    const text = service.querySelector(".media-service__text")
    const image1 = service.querySelector(".media-service__image--01")
    const image2 = service.querySelector(".media-service__image--02")
    const image3 = service.querySelector(".media-service__image--03")
    const image4 = service.querySelector(".media-service__image--04")
    const image5 = service.querySelector(".media-service__image--05")
    ScrollTrigger.create({
        trigger: service,
        start: 'top bottom',
        end: 'bottom top',
        //pin: true,
        //scrub: true,
        markers: true,
        onUpdate: (st) => {
            const distance = st.scroll()-st.start - (st.end - st.start)/2
                gsap.to(text, {translateY: distance, duration:0, ease: "none"} )
                gsap.to(image1, {translateY: distance, duration:0, ease: "none"} )
                gsap.to(image2, {translateY: distance, duration:0, ease: "none"} )
                gsap.to(image3, {translateY: distance, duration:0, ease: "none"} )
                gsap.to(image4, {translateY: distance, duration:0, ease: "none"} )
                gsap.to(image5, {translateY: distance, duration:0, ease: "none"} )
        }
    })
})
// mm.add("(max-width: 768px)", () => {
//     mediaServices.forEach((service, i) => {
//         const text = service.querySelector(".media-service__text")
//         const images = service.querySelector(".media-service__images")
//         ScrollTrigger.create({
//             trigger: service,
//             start: 'top bottom',
//             end: 'bottom top',
//             scrub: true,
//             // markers: true,
//             animation: gsap.to(images, {xPercent:-100})
//         })
//     })
// })

const themeServices = gsap.utils.toArray('.theme-service__content')

themeServices.forEach((service, i) => {
    service.tl = gsap.timeline({
        scrollTrigger: {
            trigger: service,
            start: `top top`,
            end: "+=150%",
            pin: true,
        }
    })
        .from(service.querySelectorAll(`.theme-service__title .motion-wrap.direction-up > *`), {
            yPercent: -100,
            duration: 2,
            ease: "power4.inOut"
        }, 0)
        .from(service.querySelectorAll(`.theme-service__title .motion-wrap.direction-down > *`), {
            yPercent: 100,
            duration: 2,
            ease: "power4.inOut"
        }, 0)
        .from(service.querySelector(`.theme-service__description span`), {
            yPercent: 100,
            duration: 2,
            ease: "power4.inOut"
        }, 0)
        .from(service.querySelector(`.theme-service__link`), {autoAlpha: 0, duration: 2, ease: "power4.inOut"}, 0)
})
