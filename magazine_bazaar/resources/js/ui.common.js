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
	$("header").length && headerSticky();
	allmenuOpen();
    initOnDevice();
    inputBind();

    $('[data-popup-toggle]').on('click', function(e) {
        var targetId = $(this).attr('data-popup-toggle')
        var targetElement = $('[data-popup="' + targetId + '"]')
        var isVisible = targetElement.is(':visible')
        var gap = window.innerWidth - document.documentElement.clientWidth

		if(targetId === 'popup_search') {
			$("[data-popup-toggle='popup_search']").toggleClass('on', !isVisible)
		} else {
			$(this).toggleClass('on', !isVisible)
		}
		
        if (isVisible) {
            popup.close(targetId, 'popup')
        } else {
            popup.open(targetId, 'popup', false)
        }
    });

	/* popup open */
	$('[data-popup-open]').on('click', function(e) {
		popup.open($(this).attr('data-popup-open'), 'popup')
	});
	$('[data-alert-open]').on('click', function(e) {
		popup.open($(this).attr('data-alert-open'), 'alert')
	});
	$('[data-layer-open]').on('click', function(e) {
		popup.open($(this).attr('data-layer-open'), 'layer')
	});

	$('[data-popup-close]').on('click', function(e) {
		popup.close($(this).attr('data-popup-close'), 'popup')
	});
	$('[data-alert-close]').on('click', function(e) {
		popup.close($(this).attr('data-alert-close'), 'alert')
	});
	$('[data-layer-close]').on('click', function(e) {
		popup.close($(this).attr('data-layer-close'), 'layer')
	});

	$('.btn_familysite').click(function(){
		familySite($(this));
	});



	$.fn.selectbox = function () {
		this.each(function(index, element) {
			var defaultValue = $("[data-option] > li.selected:last",element).text();
			$("[data-value]", element).text(defaultValue);

			$("[data-value]", element).click(function(event) {
				event.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 방지

				$(this).siblings("[data-option]").slideToggle("fast");
				if ($(this).hasClass("opened") == true )  $(this).removeClass("opened");
				else $(this).addClass("opened");
			});

			$("[data-option] > li", element).click(function(event) {
				event.stopPropagation();
				var selectedText = $(this).text();

				console.log(selectedText)
				$(this).closest("[data-selectbox]").find("[data-value]").text(selectedText);
				$(this).closest("[data-option]").slideUp("fast");
				$("[data-value]").removeClass("opened");
			});
		})


		$(document).click(function() {
			$(".opened[data-value]").each(function(index,element) {
				$(this).trigger('click');
			});
		});
	}
	$("[data-selectbox]").selectbox();
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
function headerSticky () {
    var lastScroll = 0;
    var headerTop = $(".header").offset().top;
    var delta = 100; // ios bouce 오작동 방지를 위해 값에 여유를 두어야 합니다.
    var header = $('.header');
    var container = $(".container");
    var bottomLogo = $(".header_bottom .logo a");

    (new IntersectionObserver(
        ([e]) => {
            if(e.intersectionRatio < 0.1 && !document.body.classList.contains('is_mobile')) {
                bottomLogo.stop().fadeIn(200)
            }else{
                bottomLogo.stop().fadeOut(200)
            }

        },
        {threshold: [0.1, 1]}
    )).observe($('.header_top')[0])

    var headerTop = $('.header_top').offset().top;
    var headerHeight = $('.header').outerHeight();
    var headerTopHeight = $('.header_top').outerHeight();
    var headerBottomHeight = $('.header_bottom').outerHeight();

	function scrollCallback(scrollTop) {
		// ios 15 이하 및 공통 처리
		var atTop = scrollTop <= 0
		var atBottom = scrollTop >= document.body.scrollHeight - document.body.clientHeight

		// body lock scroll 상태 계산 안함
		if(!$('body').hasClass('lockbody')) {
			if(atTop) lastScroll =  0;
			if(atBottom) lastScroll = document.body.scrollHeight - document.body.clientHeight;

			if (Math.abs(lastScroll - scrollTop) > delta) 
			{
				if (scrollTop > lastScroll && lastScroll > headerHeight + headerBottomHeight) {
					//down
					if (header.hasClass('view')) { //기사상세 헤더
						console.log("down > 11 ");
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
						$('.popup_layer', header).fadeOut(100)
						header.removeClass('active');
						/* 상세페이지 공유하기 레이어 관련 */
		
						/* //상세페이지 공유하기 레이어 관련 */
					} else {
						// header.removeClass('down')
						header.css('transform', ``)
						container.removeAttr('style')
					}
				}
				lastScroll = scrollTop;
			}
		} 
		
		// ios 16 이상 bouncing 오류 대응
		// if (scrollTop > headerHeight) {
		//     document.documentElement.classList.add('non-oby')
		// } else {
		//     document.documentElement.classList.remove('non-oby')
		// }
	};
	

	// 스크롤 이벤트 내부에서 repaint redrww 개선위해 requestAnimationFrame 사용
	$(document.body).on("scroll", function () {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		window.requestAnimationFrame(function() {
		  scrollCallback(scrollTop);
		});
	});

	// resize 이벤트 내부에서 repaint redrww 개선위해 requestAnimationFrame 사용
	$(window).on("resize", function () {
		window.requestAnimationFrame(function() {
			headerTopHeight = $(".header_top").outerHeight();
		});
	});
}

//전체메뉴
function allmenuOpen() {

    function open() {
		$(".allmenu_wrap").stop().fadeIn(100);
		disableScroll();
    }

    function close() {
		$(".allmenu_wrap").stop().fadeOut(100);
		if(popup.stack.length === 0) enableScroll();
    }

    $('.header .btn_menu').click(open);

    $('.btn_menu_close').click(close);

	$(".allmenu_list .depth1 > li").each(function () {
        $(this).toggleClass("has_menu", $(this).find('.depth2').length > 0)
    })

    $(".has_menu > a > span").click(function (e) {

		var $depth1 = $(this).parent().parent();
		var $btnTxt = $(this).find('em');

		console.log($(this));
		e.preventDefault();
		$depth1.toggleClass("open");

		if($depth1.hasClass("open")) $btnTxt.text('닫기');
		else $btnTxt.text("열기");
    })

    $(".allmenu_wrap .allmenu_dimmed").click(close)
}

function initOnDevice() {
	$(".has_menu").toggleClass('open', !document.body.classList.contains('is_mobile'))
}

function inputBind() {
    $("input.inp").on("input", function(e) {
        if (e.target.value && !this.classList.contains("typed")) {
            this.classList.add("typed")
        } else if (!e.target.value && this.classList.contains("typed")) {
            this.classList.remove("typed")
        }
    })
    $("input.inp + .del").on('click', function() {
        $(this).prev('input').val('').removeClass('typed').focus()
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
				delay: 5000,
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
	$('[data-slide="sm_thumb_slide"]').each(function(i) {

		if($('[data-slide="sm_thumb_slide"]').length <= 0) return;

		if($(this).find('.swiper-slide').length == 1){
			$(this).addClass('only');
		} else {
			if(!this.swiper) {
				new Swiper(this,
					{
					slidesPerView: "auto",
					spaceBetween:20,
					loop: true,
					autoplay:false,
					autoplay: {
					  delay: 3000,
					  disableOnInteraction: false,
					},
					speed: 400,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					observer: true,
					observeParents: true,
					watchOverflow: true,
					}
				);
			}
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
    stack: [],
    clientWidth: 0,
    dimmed: document.createElement('div'),
    open: function (_target, _type, _hasDimmed = true) {
        this.clientWidth = document.documentElement.clientWidth
        var targetEl = $(`[data-${_type}="${_target}"]`);
        switch (_type) {
            case 'popup':
				var popupCount = $(`.open[data-${_type}`).length || 0;
				if(popupCount > 0) targetEl.css('z-index', 200 + popupCount);
                targetEl.fadeIn(100, function () {
                    $(this).addClass('open')
                });
				disableScroll();

                $('.popup_inner', targetEl).click(function (e) {
                    e.stopPropagation();
                });

                break;
            case 'alert':
                targetEl.fadeIn(100);
				disableScroll();
                $('[data-alert]', targetEl).click(function () {
                    if ($(this).hasClass('open')) {
                        $(this).removeClass('open');
						enableScroll();
                    }
                });

                $('.popup_alert_inner', targetEl).click(function (e) {
                    e.stopPropagation();
                });

                break;
            case 'layer':
                targetEl.fadeIn(100);

                $('[data-layer]', targetEl).click(function (e) {
                    e.stopPropagation();
                });

                break;
            default:
                console.log('pop open default !');
                break;
        }

		// console.log("_type %o _hasDimmed %o",_type,_hasDimmed);
        if (_type !== 'layer') {
            if (!this.stack.length) {
                if (_hasDimmed) {
                    this.dimmed.classList.add('dimmed')
                    this.dimmed.style.display = "none"
                    document.body.appendChild(this.dimmed)  
                    $(this.dimmed).fadeIn(100)
                }
            }
            this.stack.push(targetEl);
            this.dimmed.style.zIndex = window.getComputedStyle(targetEl[0]).getPropertyValue("z-index") - 1
        }
    },
    close: function (_target, _type) {


        var _this = this;
        var targetEl = $(`[data-${_type}="${_target}"]`);

        targetEl.fadeOut(100, adjustPad);

        function adjustPad() {
            if (_type !== 'layer') {
				console.log(" _this.stack %o", _this.stack);
                _this.stack.splice(_this.stack.indexOf(targetEl), 1);
                if (!_this.stack.length) {
					enableScroll();
                    $(_this.dimmed).fadeOut(100, $(_this.dimmed).remove)
                } else {
                    _this.dimmed.style.zIndex = window.getComputedStyle(_this.stack[_this.stack.length - 1][0]).getPropertyValue("z-index") - 1
                }
            }
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
	console.log("progress bar");
	const progress_wrap = document.createElement('div');
	progress_wrap.setAttribute('class','progress_bar');
	document.querySelector('.header').append(progress_wrap);
    var body = document.body;
	var  bar = document.querySelector('.progress_bar')
	window.addEventListener('scroll', function(){
		setTimeout(function() {
			if(!body.classList.contains('lockbody')) {

				console.log("progress bar");
				var winScroll = document.body.scrollTop || document.documentElement.scrollTop,
				height = document.documentElement.scrollHeight - window.innerHeight;
				bar.style.width = ((winScroll / height) * 100) + "%";
			}
		}, 300);
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


// body lock scroll ios 대응
function lockScrollHandle (event) {
	const e = event || window.event;

	// body lock 에서 제외시킬 요소 정의
	// 전체 메뉴
	if(e.target.closest(".allmenu_wrap")) {
		return true;
	}

	// 팝업 공통
	if(e.target.classList.contains("popup_cont")) {
		return true;
	}

	// 멀티 터치는 터치 되게 한다
	if (e.touches.length > 1) return true;

	// event 초기화 속성이 있음 초기화
	if (e.preventDefault) e.preventDefault();

	return false;
}


// 스크롤 잠금
function disableScroll() {
	const body = document.querySelector('body');
	const pageY = document.body.scrollTop || document.documentElement.scrollTop;

	if(!body.hasAttribute('scrollY')) {
		body.setAttribute('scrollY', String(pageY));
		$(body).addClass('lockbody');
	}

	body.addEventListener('touchmove', lockScrollHandle, { passive: false });

}

// 스크롤 잠금 해제
function enableScroll() {
	const body = document.querySelector('body');

	if(body.hasAttribute('scrollY')) {
		$(body).removeClass('lockbody');
		body.scrollTop =  Number(body.getAttribute('scrollY'));
    }

	body.removeEventListener('touchmove', lockScrollHandle, { passive: false });

};

