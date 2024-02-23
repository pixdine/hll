$(() => {
    $(".chk_in").choose();
});

(function($){
    $.CHOOSE_DEFALUT_OPTION = {
        active : "checked"
    }
    $.fn.choose = function(_option) {
        const option = $.extend({}, $.CHOOSE_DEFALUT_OPTION, _option);

        this.each((i, item) => {
            let $this = this;
            const $btn = $(item).find("input");
          
            $btn.on("change", (e) => {
                const $item = $(e.currentTarget);
        
                checkActive($item);
            });
    
            function checkActive(item) {
                if(item.is(":checked") === true) {
                    item.closest($this).addClass(option.active);
                } else {
                    item.closest($this).removeClass(option.active);
                }
            }
        });
    }
})(jQuery);

const swiperNewsletter = new Swiper(".swiper_newsletter_preview .swiper", {
    slidesPerView: 1.5,
    // spaceBetween: 21,
    centeredSlides: true,
    loop: true,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    breakpoints: {
        768: {
            slidesPerView: 3,
            navigation: {
                nextEl: ".swiper_newsletter_preview .swiper-button-next",
                prevEl: ".swiper_newsletter_preview .swiper-button-prev",
            },
        }
    }
});

const swiperEssay = new Swiper(".swiper_essay .swiper", {
    slidesPerView: 2,
    spaceBetween: 11,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    pagination: {
      el: ".swiper_essay .swiper-pagination",
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