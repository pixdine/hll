$(document).ready(function(){
	setCSS();
	checkDevice();
	headerView();
	familySite();
	setAtcList();
	scrollAtcList();
	
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
function checkDevice(){
	$(window).on('resize', function(){
		if (window.innerWidth > 768) {
			//PC
			$('body').removeClass('is_mobile').addClass('is_pc');
		} else {
			//Mobile
			$('body').removeClass('is_pc').addClass('is_mobile');
		}
	}).resize();
}

/* 상세 헤더 */
function headerView(){
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var headerTop = $(".header.view").offset().top;

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();
		if(Math.abs(lastScrollTop - st) <= delta) return;
		if (st > lastScrollTop && st > headerTop){
			// Scroll Down
			$('.header.view').addClass('active');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.header.view').removeClass('active');
			}
		}
		lastScrollTop = st;
	}
}

//패밀리사이트
function familySite(){
	var el = $('.family_wrap');
	if(el.length <= 0) return;

	el.find('.btn_familysite').on('click', function(){
		if(el.hasClass('open')){
			//닫힘
			el.removeClass('open');
			el.find('.familysite').stop().slideUp(300);
		}else{
			//열림
			el.addClass('open');
			el.find('.familysite').stop().slideDown(300);
		}
	});
}

/* 세트 모듈 (추천 인기 기사 모듈) */
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
