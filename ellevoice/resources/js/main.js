const swiperNewsletter = new Swiper(".swiper-newsletter_preview .swiper", {
    slidesPerView: 1.5,
    // spaceBetween: 60,
    centeredSlides: true,
    loop: true,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    breakpoints: {
        768: {
            slidesPerView: 3,
            navigation: {
                nextEl: ".swiper-newsletter_preview .swiper-button-next",
                prevEl: ".swiper-newsletter_preview .swiper-button-prev",
            },
        }
    }
});

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

const swiperWriters = new Swiper(".writer_list_wrap .swiper", {
    slidesPerView: 2.976,
    spaceBetween: 12,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesOffsetBefore: 20,
    slidesOffsetAfter: 20,
    breakpoints: {
        550: {
            slidesPerView: 3.8,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 50,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 75,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
        },
        1280: {
            slidesPerView: 5,
            spaceBetween: 75,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
        }
    }
});