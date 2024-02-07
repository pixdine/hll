const swiperEssay = new Swiper(".swiper-essay .swiper", {
    slidesPerView: 2,
    spaceBetween: 11,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    pagination: {
      el: ".swiper-essay .swiper-pagination",
      type: "progressbar",
    },
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 24,
        }
    }
});