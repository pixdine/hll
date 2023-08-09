$(document).ready(function(){
	setCSS();

	if($('.kv_full').length){
		fullImage('.kv_full')
	}

	kv_swiper();
	cate_swiper();
	scrollAtcList();
	issueAtcList();
	setAtcList();
	headerSticky();
	allmenuOpen();
    initOnDevice();
    inputBind();

    $('[data-popup-toggle]').on('click', function(e) {
        var targetId = $(this).attr('data-popup-toggle')
        var targetElement = $('[data-popup="'+targetId+'"]')
        var isVisible = targetElement.is(':visible')
        $(this).toggleClass('on', !isVisible)
        if(isVisible) {
            popup.close(targetId, 'popup')
        }        else{
            popup.open(targetId, 'popup')
        }
    });

	/* follow pop */
	$('[data-popup-open]').on('click', function(e) {
		console.log(e)
		popup.open($(this).attr('data-popup-open'), 'popup')
	});

	$('[data-alert-open]').on('click', function(e) {
		console.log(e)
		popup.open($(this).attr('data-alert-open'), 'alert')
	});

	$('[data-layer-open]').on('click', function(e) {
		popup.open($(this).attr('data-layer-open'), 'layer')
	});

	$('[data-popup-close]').on('click', function(e) {
		console.log(e)
		popup.close($(this).attr('data-popup-close'), 'popup')
	});
	$('[data-alert-close]').on('click', function(e) {
		console.log(e)
		popup.close($(this).attr('data-alert-close'), 'alert')
	});
	$('[data-layer-close]').on('click', function(e) {
		console.log(e)
		popup.close($(this).attr('data-layer-close'), 'layer')
	});

	$('.btn_familysite').click(function(){
		familySite($(this));
	});
});


//iOS vh 대응
function setCSS(){
	var setVh = () => {
		document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
	}
	window.addEventListener('resize', setVh);
	setVh();
}

//디바이스 체크
$(window).on('resize', function(){
	if (window.innerWidth > 768) {
		//PC
		$('body').removeClass('is_mobile').addClass('is_pc');
	} else {
		//Mobile
		$('body').removeClass('is_pc').addClass('is_mobile');
	}
    initOnDevice()
}).resize();


//header sticky
var isCompute = false
function headerSticky () {
    var lastScroll = 0;
    var headerTop = $(".header").offset().top;
    var delta = 2;
    var header = $('.header');
    var container = $(".container");
    var bottomLogo = $(".header_bottom .logo a");

    (new IntersectionObserver(
        ([e]) => {
            bottomLogo.stop().fadeTo(300,e.intersectionRatio < 0.1 && !document.body.classList.contains('is_mobile'))
        },
        {threshold: [0.1, 1]}
    )).observe($('.header_top')[0])

    var headerTop = $('.header_top').offset().top;
    var headerHeight = $('.header').outerHeight();
    var headerTopHeight = $('.header_top').outerHeight();
    var headerBottomHeight = $('.header_bottom').outerHeight();

    $(window).on('scroll', function (e) {

        if (isCompute) {
            isCompute = false
            return
        }
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(lastScroll - scrollTop) <= delta) return;

        if (scrollTop > lastScroll && lastScroll > headerHeight + headerBottomHeight) {
            //down
            if (header.hasClass('view')) { //기사상세 헤더
                if (headerTop < scrollTop) {
                    header.addClass('active');
                }
            } else {
                // header.addClass('down');
                header.css('transform', `translate(0, ${-(headerTopHeight)}px)`)
                // header.css('top', -($('.header_top').outerHeight()));
            }
        } else {
            // up
            if (header.hasClass('view')) { //기사상세 헤더
                header.removeClass('active');
                /* 상세페이지 공유하기 레이어 관련 */
                if ($('.pop_share').hasClass('open')) {
                    $('.pop_share').removeClass('open');
                }
                /* //상세페이지 공유하기 레이어 관련 */
            } else {
                // header.removeClass('down')
                header.css('transform', ``)
                container.removeAttr('style')
            }
        }
        //
        // if (scrollTop > headerHeight) {
        //     document.documentElement.classList.add('non-oby')
        // } else {
        //     document.documentElement.classList.remove('non-oby')
        // }

        lastScroll = scrollTop;
	});
	$(window).on("resize", function () {
		headerTopHeight = $(".header_top").outerHeight();
	});
}

//전체메뉴
function allmenuOpen() {

    const $body = document.querySelector("body");
    let scrollPosition = 0, clientWidth = 0

    function open() {
        isCompute = true
        clientWidth = document.documentElement.clientWidth
        $('.allmenu_wrap').stop().fadeIn(100);
        $('body').addClass('lockbody');
        scrollPosition = window.pageYOffset;
        $body.style.overflow = "hidden";
        $body.style.position = "fixed";
        $body.style.top = `-${scrollPosition}px`;
        $body.style.width = "100%";
        $body.style.paddingRight = `${document.documentElement.clientWidth - clientWidth}px`
    }

    function close() {
        isCompute = true
        $('.allmenu_wrap').stop().fadeOut(100);
        $('body').removeClass('lockbody');
        $body.style.removeProperty("overflow");
        $body.style.removeProperty("position");
        $body.style.removeProperty("top");
        $body.style.removeProperty("width");
        $body.style.removeProperty("padding-right");
        window.scrollTo(0, scrollPosition);
    }

    $('.header .btn_menu').click(open);

    $('.btn_menu_close').click(close);

    $(".allmenu_list .depth1 > li").each(function () {
        $(this).toggleClass("has_menu", $(this).find('.depth2').length > 0)
    })

    $(".has_menu > a").click(function (e) {
        console.log(this);
		e.preventDefault();
        $(this).parent().toggleClass('open')
    })

    $(".allmenu_wrap .allmenu_dimmed").click(close)
}

function initOnDevice() {
    $(".has_menu").toggleClass('open', !document.body.classList.contains('is_mobile'))
}

function inputBind() {
    $("input.inp").on('keyup', function() {
        $(this).toggleClass('typed', !!this.value)
    })
    $("input.inp + .del").on('click', function() {
        $(this).prev('input').val('').removeClass('typed')
    })
}

//메인 풀이미지형
function fullImage(el){
	if(el.length <= 0) return;

	var oriWidth = $(el).find('.imgbox img')[0].naturalWidth;
	var oriHeight = $(el).find('.imgbox img')[0].naturalHeight;
	var ratio = oriHeight / oriWidth * 100;

	$(el).find('.imgbox').css({
		paddingTop: ratio+'%'
	});
}

//메인 슬라이드 배너
function kv_swiper(){
	var kv_Swipers = [];
	if($('.kv_swiper').find('.swiper-slide').length == 1){
		$('.kv_swiper').addClass('only');
	}

	var _loop;

	$('.kv_swiper').each(function(i) {
		if($(this).find('.swiper-slide').length == 1){
			_loop = false;
		} else {
			_loop = true;
		}

		$(this).attr('data-index',i)
		var slideitem = $('.kv_swiper .swiper-slide');

		kv_Swipers[i] = new Swiper('.kv_swiper[data-index="'+i+'"]', {
			effect : 'fade',
			fadeEffect: {
				crossFade: true
			},
			speed: 500,
			loop: _loop,
			autoplay: {
				delay: 7000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.kv_swiper[data-index="'+i+'"] .swiper-pagination',
				clickable: true,
			},
			navigation: {
				prevEl: '.kv_swiper[data-index="'+i+'"] .btn_prev',
				nextEl: '.kv_swiper[data-index="'+i+'"] .btn_next'
			},
			watchSlidesProgress: true,
			a11y: {
				prevSlideMessage: '이전 슬라이드',
				nextSlideMessage: '다음 슬라이드',
			},
			observer: true,
			observeParents: true,
			watchOverflow: true,
			on: {
				slideChange : function() {
					$('.is_pc .kv_swiper .swiper-slide').find('.imgbox img').css('transform', 'scale(1.0)').removeAttr('style');
				},
			},
		});
	});
}

// 카테고리별 썸네일 슬라이드
function cate_swiper(){
	var cateSwipers = [];

	$('[data-slide="sm_thumb_slide"]').each(function(i) {
		$(this).attr('data-index',i)

		if($('[data-slide="sm_thumb_slide"]').length <= 0) return;

		if($(this).find('.swiper-slide').length == 1){
			$(this).addClass('only');
		} else {
			cateSwipers[i] = new Swiper('[data-slide="sm_thumb_slide"][data-index="'+i+'"]', {
				slidesPerView : 'auto',
				spaceBetween: 20,
				loop: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				speed: 400,
				pagination: {
					el: '[data-slide="sm_thumb_slide"][data-index="'+i+'"] .swiper-pagination',
					clickable: true,
				},
				observer: true,
				observeParents: true,
				watchOverflow: true,
			});
		}
	});
}

//기획 기사, 큐레이션 모듈
function scrollAtcList(){
	var scrollAtcList = $('.scroll_atc_list');
	var ww = window.innerWidth;
	var mySwiper = undefined;
	if(scrollAtcList.length <= 0) return;

	function initSwiper() {
		//768px 보다 클 때 swiper 실행
		if(ww > 768 && mySwiper == undefined){
			scrollAtcList.each(function(){//각각을 스와이프 적용
				mySwiper = new Swiper(this, {
					slidesPerView: 3,
					spaceBetween: 24,
					loop: false,
					autoplay: false,
					speed: 1000,
					scrollbar: {
						el: ".swiper-scrollbar",
					},
					breakpoints: {
						1023: {
							slidesPerView: 3,
							spaceBetween: 24,
						},
						769: {
							slidesPerView: 2,
							spaceBetween: 20,
						}
					}
				});
			});
		} else if(ww <= 768 && mySwiper != undefined){
			scrollAtcList.each(function(){
				this.swiper.destroy(); //각각을 파괴함.
			});
			mySwiper = undefined;
		}
	}

	initSwiper();

	$(window).on('resize', function () {
		ww = window.innerWidth;
		initSwiper();
	});
}

//4단 모듈 (최신 소식)
function issueAtcList(){
	var issueAtcList = $('.issue_atc_list'),
		mySwiper = undefined;
	if(issueAtcList.length <= 0) return;

	function initSwiper() {
		ww = window.innerWidth;

		//768px 부터 swiper 실행
		if(ww < 769 && mySwiper == undefined){
			issueAtcList.each(function(){//각각을 스와이프 적용
				gaps = '-3%';
				mySwiper = new Swiper(this, {
					spaceBetween: gaps,
					slidesPerView: 1.15,
					centeredSlides: true,
					roundLengths: true,
					loop: true,
					autoplay: {
						delay: 4000,
						disableOnInteraction: false,
					},
					observer: true,
					observeParents: true,
					watchOverflow: true,
				});
			});
		} else if(ww > 769 && mySwiper != undefined){
			issueAtcList.each(function(){
				this.swiper.destroy(); //각각을 파괴함.
			});
			mySwiper = undefined;
		}
	}

	$(window).on('resize', function () {
		initSwiper();
	});
	initSwiper();
}

//full popup
const popup = {
    clientWidth: 0,
    open: function(_target, _type){
        this.clientWidth = document.documentElement.clientWidth
        switch (_type) {
            case 'popup':
                $('[data-popup="' + _target + '"]').fadeIn(100, function(){
                    $(this).addClass('open')
                });
                $('body').addClass('lockbody');
                // $('[data-popup]').click(function(){
                //     if($(this).hasClass('open')){
                //         $(this).removeClass('open');
                //         $('body').removeClass('lockbody');
                //     }
                // });

                $('.popup_inner').click(function(e){
                    e.stopPropagation();
                });

                break;
            case 'alert':
                $('[data-alert="' + _target + '"]').fadeIn(100);
                $('body').addClass('lockbody');
                $('[data-alert]').click(function(){
                    if($(this).hasClass('open')){
                        $(this).removeClass('open');
                        $('body').removeClass('lockbody');
                    }
                });

                $('.popup_alert_inner').click(function(e){
                    e.stopPropagation();
                });

                break;
            case 'layer':
                $('[data-layer="' + _target + '"]').fadeIn(100);

                $('[data-layer]').click(function(e){
                    e.stopPropagation();
                });

                break;
            default:
                console.log('pop open default !');
                break;
        }
        document.body.style.paddingRight = `${document.documentElement.clientWidth - this.clientWidth}px`
    },
    close: function(_target, _type){
        switch (_type) {
            case 'popup':
                $('[data-popup="' + _target + '"]').fadeOut(100, adjustPad);
                break;
            case 'alert':
                $('[data-alert="' + _target + '"]').fadeOut(100, adjustPad);
                break;
            case 'layer':
                $('[data-layer="' + _target + '"]').fadeOut(100, adjustPad);
                break;
            default:
                console.log('pop close default !');
                break;
        }
        function adjustPad() {
            $('body').removeClass('lockbody');
            document.body.style.removeProperty("padding-right");
        }
    }
}

//세트 모듈 (추천 인기 기사 모듈
function setAtcList(){
	var setAtcList = $('.set_atc_list'),
		mySwiper = undefined;
	if(setAtcList.length <= 0) return;

	function initSwiper() {
		ww = window.innerWidth;

		//768px 부터 swiper 실행
		if(ww < 769 && mySwiper == undefined){
			setAtcList.each(function(){//각각을 스와이프 적용
				mySwiper = new Swiper(this, {
					spaceBetween: 20,
					slidesPerView: 1,
					loop: true,
					autoplay: {
						delay: 3000,
						disableOnInteraction: false,
					},
					speed: 400,
					pagination: {
						el: ".swiper-pagination",
						clickable: true,
					},
					observer: true,
					observeParents: true,
					watchOverflow: true,
				});
			});
		} else if(ww > 769 && mySwiper != undefined){
			setAtcList.each(function(){
				this.swiper.destroy(); //각각을 파괴함.
			});
			mySwiper = undefined;
		}
	}

	$(window).on('resize', function () {
		initSwiper();
	});
	initSwiper();
}

//상세페이지 프로그래스바
function progress_bar() {
	const progress_wrap = document.createElement('div');
	progress_wrap.setAttribute('class','progress_bar');
	document.querySelector('.header').append(progress_wrap);

	var  bar = document.querySelector('.progress_bar')
	window.addEventListener('scroll', function(){
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop,
		height = document.documentElement.scrollHeight - window.innerHeight;
		bar.style.width = ((winScroll / height) * 100) + "%";
	});
}

//패밀리사이트
function familySite(_target){
	var el = _target.parent()
	if(el.hasClass('open')){
		//닫힘
		el.removeClass('open');
		el.find('.familysite').stop().slideUp(300);
	}else{
		//열림
		el.addClass('open');
		el.find('.familysite').stop().slideDown(300);
	}
}
