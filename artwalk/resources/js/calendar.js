
(function($) {
    $.fn.customFlatpickr = function(options) {
         // 현재 날짜를 가져옵니다.
         var currentDate = new Date();

        // min date, max date 설정
        var minDateSet = new Date();
        minDateSet.setMonth(currentDate.getMonth() - 11);
        var maxDateSet = new Date();
        //maxDateSet.setMonth(currentDate.getMonth() + 10);
        maxDateSet.setMonth(currentDate.getMonth() + 4); // 현재 월에 5를 더하여 5개월 후의 월을 설정합니다.
        maxDateSet.setDate(0);

        // 기본 옵션을 설정합니다. 사용자가 제공하는 옵션으로 덮어쓸 수 있습니다.
        var settings = $.extend({
            // 여기에 기본 설정을 넣습니다. 예:
            locale: 'ko',
            mode: 'range',
            showMonths: 2,
            dateFormat: "y.m.d",
            allowInput :false,
            disableMobile: "true",
            static: true,
            minDate: 'today',
            maxDate: maxDateSet,
            // onReady 이벤트 후크를 사용하여 달력이 준비된 직후 실행할 함수를 정의합니다.
            onReady: function(selectedDates, dateStr, instance) {
                // 여기에 달력이 로드된 후 실행할 코드를 추가합니다.
                // 현재 날짜를 가져옵니다.
                var now = new Date();

                // 현재 날짜로부터 1주일 후의 날짜를 계산합니다.
                var oneWeekFromNow = new Date();
                oneWeekFromNow.setDate(now.getDate() + 7); // 오늘로부터 7일 후

                // 달력에 시작 날짜와 종료 날짜를 설정합니다.
                //instance.setDate([now, oneWeekFromNow]);

                // 초기 선택된 날짜를 저장합니다.
                //instance._initialDates = [now, oneWeekFromNow];

                // 'y.m.d' 형식으로 날짜를 포맷합니다 (년도를 두 자리로 표시).
                var formattedStartDate = instance.formatDate(now, "y.m.d"); // '23.10.20' 형태
                var formattedEndDate = instance.formatDate(oneWeekFromNow, "y.m.d"); // '23.10.27' 형태

                // 입력 필드에 날짜 범위를 설정합니다.
                instance.input.value = formattedStartDate + ' ~ ' + formattedEndDate;

                inputYear();
                $(".flatpickr-wrapper").append("<div class='flatpickr-dim'></div>");
                $(".flatpickr-wrapper .flatpickr-calendar").prepend("<div class='flatpickr-title'>기간 설정</div>");
                $(".flatpickr-wrapper .flatpickr-calendar").append("<button class='flatpickr-close js-close-dtpkr'><img src='../../resources/images/ic_close_20.png'></button>");

                // 달력을 시작 날짜로 이동합니다.
                instance.jumpToDate(now);

                console.log('onReady', formattedStartDate, formattedEndDate);
            },
            onOpen: function(selectedDates, dateStr, instance) {
                if($("body").hasClass("is_mobile")){
                    $("html").css("overflow", "hidden");
                }
                $("html").addClass("dp-open");
            },
            onChange: function(selectedDates, dateStr, instance) {
               
                // 선택된 날짜 범위를 가져옵니다.
                if (selectedDates.length == 2) {
                    // 시작 날짜와 종료 날짜를 얻습니다.
                    let startDate = flatpickr.formatDate(selectedDates[0], "y.m.d"); // '23.10.12' 형식
                    let endDate = flatpickr.formatDate(selectedDates[1], "y.m.d");

                    // 새 형식으로 날짜 문자열을 만듭니다.
                    let newFormat = startDate + " ~ " + endDate;

                    // 이 문자열을 인풋 필드에 설정합니다.
                    instance.input.value = newFormat;
                }
                console.log("change");
                moMonth();                        
            },
            onMonthChange: function(selectedDates, dateStr, instance) {
                // 월이 바뀌었을 때 로직을 수행합니다.
                inputYear();
            },
            onClose: function(selectedDates, dateStr, instance) {
                $("html").css("overflow", "initial").removeClass("dp-open");
                // 선택된 날짜가 하나만 있으면 초기 선택된 날짜로 되돌립니다.
                if (selectedDates.length === 1) {
                    instance.setDate(instance._initialDates);
                }
            },
        }, options);

        // 년도 input에서 받아와서 다른 요소에 입력
        function inputYear(){
            const numInput = $(".numInput.cur-year");
            var year = [];
            setTimeout(() => {
                numInput.each(function (i){
                    year[i] = $(this).val();
                    $(".flatpickr-wrapper .new-year").eq(i).text(year[i]+"년");
                })
            }, 10);
        }

        function moMonth(){
            // 현재 flatpickr 인스턴스의 모든 '년도와 월' 섹션을 가져옵니다.
            // 이는 flatpickr의 내부 구조에 따라 DOM 셀렉터를 수정해야 할 수 있습니다.
            const monthSelectors = $(".flatpickr-month");
            const dayContainer = $(".dayContainer"); // 실제 컨테이너의 클래스 이름으로 교체해야 합니다.

            // 기존의 정보를 클리어합니다. 
            // '년도와 월' 정보를 dayContainer에 추가합니다.
            let year = [];
            let month = [];
            if(dayContainer.find(".mo-month").length == 0) {
                monthSelectors.each(function (i) {
                    year[i] = $(this).find('.numInput.cur-year').val(); // 현재 년도 추출
                    month[i] = $(this).find('.cur-month').text(); // 현재 월 추출

                    // 년도와 월 정보를 포함하는 요소를 생성합니다.
                    const dateInfo = $("<div class='mo-month'>").text(year[i] + "년 " + month[i]);

                    // dayContainer에 추가합니다.
                    dayContainer.eq(i).append(dateInfo);
                });
            }                    
        }

        // 이제 각 요소에 대해 flatpickr를 초기화합니다.
        return this.each(function() {
            var $this = $(this); // 현재 요소에 대한 jQuery 객체

            // flatpickr 인스턴스화
            var instance = flatpickr($this[0], settings);

            // 필요한 추가 로직이 있다면 여기에 작성하십시오.
            // 예: 이벤트 리스너 연결, 추가 메서드 등

            // 이전 isMobile 상태를 저장하기 위한 변수
            var wasMobile;

            // 화면 크기에 따라 조건을 설정합니다.
            function adjustCalendarView() {
                // 현재 화면 너비를 확인합니다.
                const width = window.innerWidth;

                // 모바일 화면 너비 조건을 설정합니다.
                const isMobile = width <= 768;

                // flatpickr 인스턴스 설정을 변경합니다.
                if (wasMobile !== isMobile) {
                    if (isMobile) {
                        console.log("mobile");
                        instance.set("showMonths", 5);
                        instance.setDate(instance._initialDates);
                        moMonth();
                        if($("html").hasClass("dp-open")){
                            $("html").css("overflow", "hidden");
                        }
                    } else {
                        instance.set("showMonths", 2);
                        instance.setDate(instance._initialDates);
                        if($("html").hasClass("dp-open")){
                            $("html").css("overflow", "initial");
                        }
                    }
                    
                    // 이전 상태 업데이트
                    wasMobile = isMobile;
                    inputYear();
                }
            }

            // 화면 크기가 변경될 때 함수를 호출합니다.
            window.addEventListener('resize', function(){
                adjustCalendarView();
            });

            // 페이지 로드 시 초기 설정을 위해 함수를 호출합니다.
            adjustCalendarView();

            $(document).on("click", ".js-close-dtpkr", function() {
                instance.close(); // flatpickr 인스턴스를 닫습니다.
            });
        });
    };
}(jQuery));