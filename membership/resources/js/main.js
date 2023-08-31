const keyvisualVideo = document.querySelector('.key-visual__video')

const kv = gsap.timeline({paused: true})
kv.from(".key-visual__content--01 .key-visual__dimmed", {opacity: 0, duration: 0.3})
kv.from(".key-visual__content--01 .key-visual__title .motion-wrap.direction-down > *", {yPercent: 100, duration: 2, ease: "power4.inOut"}, 0)
kv.from(".key-visual__content--01 .key-visual__title .motion-wrap.direction-up > *", {yPercent: -100, duration: 2, ease: "power4.inOut"}, 0)
kv.from(".key-visual__content--01 .key-visual__description span", {yPercent: 100, duration: 2, ease: "power4.inOut"}, 0)
kv.from(".key-visual__content--01 .key-visual__link", {autoAlpha: 0, duration: 2, ease: "power4.inOut"}, 0)

const beginMotion = (e) => {
    if(keyvisualVideo.currentTime> 1.9) {
        kv.play()
    }
}

