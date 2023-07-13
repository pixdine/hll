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

//메인 키비주얼
function mainKeyVisual(){
	if($('.kv_swiper').find('.swiper-slide').length == 1){
		$('.kv_swiper').addClass('only');
	}
	if($('.kv_swiper').find('.swiper-slide').length > 1) {
		var mainSwiper = new Swiper('.kv_swiper', {
			effect : 'fade',
			autoplay: {
				delay: 3500,
				disableOnInteraction: false,
			},
			loop: true,
			speed: 1500,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			watchSlidesProgress: true,
			a11y: {
				prevSlideMessage: '이전 슬라이드',
				nextSlideMessage: '다음 슬라이드',
			},
			observer: true,
			observeParents: true,
			watchOverflow: true,
		});
	}
}

//모바일버전일 때 카테고리별 기사 모듈 작은 썸네일 슬라이드
function smThumbList(){
	var smThumbList = $('[data-slide="sm_thumb_slide"]');
	if(smThumbList.length <= 0) return;

	smThumbList.each(function(){
		var $this = $(this);

		if($this.find('.swiper-slide').length == 1){
			smThumbList.addClass('only');
		}

		if($this.find('.swiper-slide').length > 1) {
			var smThumbSlider = new Swiper($this, {
				slidesPerView : 'auto',
				spaceBetween: 20,
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
		}
	});
}

$(document).ready(function(){
	setCSS();
	checkDevice();
	familySite();
	mainKeyVisual();
	smThumbList();
});
