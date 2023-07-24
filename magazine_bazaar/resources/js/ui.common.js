$(document).ready(function(){
	setCSS();

	if($('.kv_full').length){
		fullImage('.kv_full')
	}

	kv_swiper();
	cate_swiper();
	scrollAtcList();
	issueAtcList();

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
}).resize();

//header sticky : 구글배너가 있는 경우 배너 호출 후 다시 선언해줘야 헤더의 위치값을 다시 계산하여 헤더 스티키가 정상 작동 함
headerSticky();
function headerSticky (){
	var lastScroll = 0;
	var headerTop = $(".header").offset().top;

	$(window).on('scroll', function(){
		var scrollTop = $(this).scrollTop(),
		header_H = $('.header').outerHeight();

		if(scrollTop < 1){
			headerTop = $(".header").offset().top;
		}

		if(scrollTop > lastScroll) {
			//down
			if($('.header').hasClass('view')){ // detail header
				if(headerTop < scrollTop){
					$('.header').addClass('active');
				}
			} else {
				$('.header').css('top',-(header_H));
			}
		} else {
			// up
			if($('.header').hasClass('view')){ // detail header
				$('.header').removeClass('active');

				/* 상세페이지 공유하기 레이어 관련 */
				if($('.pop_share').hasClass('open')){
					$('.pop_share').removeClass('open');
				}
				/* //상세페이지 공유하기 레이어 관련 */
			} else {
				$('.header').css('top',0);
			}
		}
		lastScroll = scrollTop;
	});
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
	$('.kv_swiper').each(function(i) {
		$(this).attr('data-index',i)

		kv_Swipers[i] = new Swiper('.kv_swiper[data-index="'+i+'"]', {
			effect : 'fade',
			autoplay: {
				delay: 3500,
				disableOnInteraction: false,
			},
			loop: true,
			speed: 1500,
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
				activeIndexChange: function () {},
				slideChange : function() {},
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
    open: function(_target, _type){
        switch (_type) {
            case 'popup':
                $('[data-popup="' + _target + '"]').addClass('open');
                $('body').addClass('lockbody');

                $('[data-popup]').click(function(){
                    if($(this).hasClass('open')){
                        $(this).removeClass('open');
                        $('body').removeClass('lockbody');
                    }
                });

                $('.popup_inner').click(function(e){
                    e.stopPropagation();
                });
                
                break;
            case 'alert':
                $('[data-alert="' + _target + '"]').addClass('open');
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
                $('[data-layer="' + _target + '"]').addClass('open');

                $('[data-layer]').click(function(e){
                    e.stopPropagation();
                });

                break;
            default:
                console.log('pop open default !');
                break;
        }
    }, 
    close: function(_target, _type){
        switch (_type) {
            case 'popup':
                $('[data-popup="' + _target + '"]').removeClass('open');
                $('body').removeClass('lockbody');

                break;
            case 'alert':
                $('[data-alert="' + _target + '"]').removeClass('open');
                $('body').removeClass('lockbody');

                break;
            case 'layer':
                $('[data-layer="' + _target + '"]').removeClass('open');

                break;
            default:
                console.log('pop close default !');
                break;
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

	window.addEventListener('scroll', function(){
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop,
		height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		document.querySelector('.progress_bar').style.width = ((winScroll / height) * 100) + "%";
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