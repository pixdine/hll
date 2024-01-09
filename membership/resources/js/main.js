$(() => {
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

        // 오프닝 텍스트 모션 사라지고 보이게
        setTimeout(()=>{
            fmBody.addClass('active');
        }, 2500)
    };

    $('.floating-menu').floatingMenu();

    function init() {
        AOS.init({
            once: true
        });  // AOS initiation
        $('.aos-init').removeClass('aos-animate'); // remove ALL classes which triggers animation in document
    }
    init();

    // fullpage
    // let isFullpageInitialized = false;
    let visualVod = $('.visual-video').get(0);
    let visualVodPc = $('#visualVideoPc').get(0);
    let visualVodMo = $('#visualVideoMo').get(0);
    let sectionIndex = 0;
    const $section = $('.section');
    const sectionLength = $section.length;

    function initVideo(width) {
        $section.eq(0).find('[data-aos]').removeClass("aos-animate");
        // visualVod.play();
        handleVideo(width);
        setTimeout(()=>{
            $section.eq(0).addClass('start');
            $section.eq(0).find('[data-aos]').addClass("aos-animate");
        }, 2200);
    }
    
    function initializeFullpage() {
        $('#fullpage').fullpage({
            anchors: ['MAIN', 'JOIN-POINT', 'JOIN-SAVE', 'BO1', 'ELLE', 'COSMOPOLITAN', 'BAZAAR', 'ESQUIRE', 'BO2', 'ELLEVOICE', 'CLOSEUP', 'ARTWALK', 'EEE', 'FOOT'],
            // sectionsColor: ['#fff', '#111', '', ''],
            scrollingSpeed: 900,
            easingcss3: 'cubic-bezier(0.4, 0.12, 0.21, 1)',
            lockAnchors: true,
            recordHistory: false,
            verticalCentered: false,
            bigSectionsDestination: top,
            normalScrollElements: '.m-img',
            // disableMutationObserver: false,

            // ** 페이지를 불러온 후
            afterLoad: function(anchorLink, index) {
                const realIndex = index - 1;
                const prevIndex = realIndex - 1;
                let width = this.width();

                sectionIndex = realIndex;

                // 스크롤 다운 시, head mode check
                if($section.eq(realIndex).hasClass('head-mode-dark')) {
                    $('.header').addClass('dark');
                } else {
                    $('.header').removeClass('dark');
                }

                // visualVod.load();

                // footer 바로 위 section을 제외한 sections에서 aos-animate remove
                if(index !== sectionLength) {
                    $section.find('[data-aos]').removeClass("aos-animate");
                }

                if(realIndex === 0) {
                    // video 로드가 완룐 된 후에 재생시키기
                    // visualVod.load();

                    if(width <= 768) {
                        visualVodMo.load();

                        $('#visualVideoMo').on('loadeddata', function() {
                            // console.log('로드완료');
                            
                            initVideo(width);
                            setInterval(function(){
                                if($('#visualVideoMo').prop('ended')) {
                                    // console.log('영상 종료');
                                    initVideo(width);
                                }
                            }, 200);
                        });
                    } else {
                        visualVodPc.load();

                        $('#visualVideoPc').on('loadeddata', function() {
                            // console.log('로드완료');
                            
                            initVideo(width);
                            setInterval(function(){
                                if($('#visualVideoPc').prop('ended')) {
                                    // console.log('영상 종료');
                                    initVideo(width);
                                }
                            }, 200);
                        });
                    }
                    
                } else {
                    $section.eq(realIndex).find('[data-aos]').addClass("aos-animate");

                    // 동영상 정지 시키고, 처음으로 돌리기
                    if(width <= 768) {
                        visualVodMo.pause();
                        visualVodMo.currentTime = 0;
                    } else {
                        visualVodPc.pause();
                        visualVodPc.currentTime = 0;
                    }
                    // visualVod.pause();
                    // visualVod.currentTime = 0;;
                }
            },

            // ** 페이지를 떠날때
            onLeave: (index, nextIndex, direction) => {
                // console.log("index", index, nextIndex, direction);

                // 스크롤 업할때, head mode check
                if(direction === 'up') {
                    if($section.eq(nextIndex-1).hasClass('head-mode-dark')) {
                        $('.header').addClass('dark');
                    } else {
                        $('.header').removeClass('dark');
                    }
                }
            },

            afterResize: function() {
                let width = this.width();
                handleVideo(width);
            }
        });

    }

    // 디바이스에 따라 영상 분기처리
    function handleVideo(width) {
        if(width <= 768) {
            // console.log("mobile");
            visualVodMo.play();
            visualVodPc.currentTime = 0;
        } else {
            visualVodPc.play();
            visualVodMo.currentTime = 0;
        }
    }

    // 최초 실행
    initializeFullpage();

    // mobile media images swiper
    var magazine = new Swiper('.join-point .m-img .swiper-container', {
        slidesPerView: "auto",
        spaceBetween: 12,
        freeMode: true,
        loop: true,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
    });

    var mediaOptions = {
        slidesPerView: "auto",
        spaceBetween: 11,
        freeMode: true,
    };

    var mediaElle = new Swiper('.media.m1 .m-img .swiper-container', mediaOptions);
    var mediaCosmopolitan = new Swiper('.media.m2 .m-img .swiper-container', mediaOptions);
    var mediaBazaar = new Swiper('.media.m3 .m-img .swiper-container', mediaOptions);
    var mediaEsquire = new Swiper('.media.m4 .m-img .swiper-container', mediaOptions);
});