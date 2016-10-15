

$(function(){

    var $main = $('#main');
    var $phone = $('#phone');
    var $phoneBtn = $('#phoneBtn');
    var $phoneBtnTouch = $phoneBtn.find('.phoneBtnTouch');
    var $phoneKey = $('#phoneKey');
    var $phoneHeadText = $('#phoneHead').find('.phoneHeadText');
    var $phoneKeyTouch = $phoneKey.find('.phoneKeyTouch');
    var $message = $('#message');
    var $messageList = $('#messageList');
    var $messageText = $('#messageText');
    var $cube = $('#cube');
    var $cubeBox = $('#cubeBox');
    var $cubeShare = $('#cubeShare');
    var $cubeShareMark = $('#cubeShareMark');

    var $details = $('#details');
    var $detailsList = $('#detailsList');
    var $detailsBtn = $('#detailsBtn');
    var $detailsReturn = $('#detailsReturn');

    var desH = document.documentElement.clientHeight;

    var oBell = $('#bell').get(0);
    var oSay = $('#say').get(0);
    var oMusic = $('#music').get(0);

    function init(){
        showLoading();
    }

    function showLoading(){
        var arr = ['phoneBg.jpg','cubeBg.jpg','cubeImg1.png','cubeImg2.png','cubeImg3.png','cubeImg4.png','cubeImg5.png','cubeImg6.png','phoneBtn.png','phoneKey.png','messageHead1.png','messageHead2.png','messageText.png','phoneHeadName.png','addressInfo.png','bgImg1.jpg','bgImg2.jpg','bgImg3.jpg','keyboard.png','pic_10.png','pic_12.png','pic_14.png','pic_16.png','pic_18.png','pic_20.png'];
        var iNow = 0;
        $.each(arr,function(i,imgSrc){
            var objImg = new Image();
            objImg.src = 'img/'+imgSrc;
            objImg.onload = function(){
                iNow++;
                $('.loadingProgressBar').css('width',(iNow/arr.length*100) + '%');

            }
            objImg.onerror = function(){
                $('#loading').animate({opacity:0},function(){
                   $(this).remove();
                    phone.init();
                });
            };
        });
        $('.loadingProgressBar').on('transitionEnd webkitTransitionEnd',function(){
            if(iNow == arr.length){
                window.setTimeout(function(){
                    $('#loading').animate({opacity:0},function(){
                        $(this).remove();
                    phone.init();
                });
                },2000)

            }
        });
    }

    var phone = (function(){

        function init(){
            oBell.play();
            bind();
        }

        function bind(){
            $phoneBtnTouch.on('touchstart',function(){
                oBell.pause();
                $phoneBtn.css('opacity',0);
                $phoneKey.css('transform','translate(0,0)');
                say();
            });
            $phoneKeyTouch.on('touchstart',function(){
                closePhone();
            });
        }

        function say(){
            $phoneHeadText.html('00:00');
            oSay.play();
            var timer = setInterval(function(){

                $phoneHeadText.html(change(oSay.currentTime));

                if(oSay.currentTime == oSay.duration){
                    clearInterval(timer);
                    closePhone();
                }

            },1000);
        }

        function closePhone(){
            oSay.pause();
            $phone.css('transform','translate(0,'+(desH)+'px)');
            $phone.on('transitionEnd webkitTransitionEnd',function(){
                $(this).remove();
                message.init();
            });
        }

        function change(num){
            num = parseInt(num);
            var iM = toZero(Math.floor(num%3600/60));
            var iS = toZero(Math.floor(num%60));
            return iM + ':' + iS;
        }
        function toZero(num){
            if(num<10){
                return '0' + num;
            }
            else{
                return '' + num;
            }
        }

        return {
            init : init
        }

    })();



    var message = (function(){

        var $li = $messageList.find('li');
        var iNow = 0;
        var iT = 0;
        var text1 = document.querySelector(".text1");
        var btnSend =  document.querySelector(".btnSend");
        var keyboard = document.querySelector(".keyboard");

        function init(){
            oMusic.play();
            move();
        }
        function move(){
            var timer = setInterval(function(){
                if(!/btnMsg/.test($li[iNow].className)){
                    $li.eq(iNow).css('opacity',1).css('transform','translate(0,0)');
                }else{
                    clearInterval(timer);
                    fnKeyBoard($li[iNow]);
                }

                if(iNow == $li.length-1){
                    clearInterval(timer);
                    setTimeout(function(){
                        closeMessage();
                    },3000);
                }
                else{
                    if(iNow >= 3){
                        iT -= $li.eq(iNow).outerHeight() + 10;
                        $messageList.css('transform','translate(0,'+(iT)+'px)');
                    }
                    iNow++;
                }



            },1500);

        }
        function fnKeyBoard(ele){
            keyboard.style.webkitTransform = "translate(0,0)";
            keyboard.addEventListener("webkitTransitionEnd",function(){
                this.style.webkitTransition = "";

            },false);
            window.setTimeout(function(){
                btnSend.className+=" btnSendCur";
                fnSendMsg(ele);
            },500)


        }


        function fnSendMsg(ele){
            console.log(2);
            //var info = ele.innerHTML.replace(/<div class="arrow"><\/div><img src="img\/messageHead1.png">/,"");
            var info = "都学了啊,可我还是找不到工作?";
            info = info.split("");
            var strNum = 0;
            strTimer = window.setInterval(function(){
                text1.style.display ="block";
                text1.innerHTML+=info[strNum];
                strNum++;
                if(strNum == info.length){
                    clearInterval(strTimer);
                    btnSend.className+=" btnSendCur";
                    btnSend.addEventListener("touchstart",function(){
                        text1.style.display = "none";
                        text1.innerHTML = "";
                        ele.style.opacity = 1;
                        ele.style.webkitTransform = "translate(0,0)";
                        btnSend.className = "btnSend";
                        btnSend.removeEventListener("touchstart",arguments.callee,false);
                        window.setTimeout(function(){
                            keyboard.style.webkitTransform="translate(0,4.19rem)";
                            move();

                        },1000)
                    },false)

                }
            },100)

        }

        function closeMessage(){
            $message.css('transform','translate(0,'+(desH)+'px)');
            $message.on('transitionEnd webkitTransitionEnd',function(){     var that =this;

                    $(that).remove();
                    fnCube();


            });
        }

        return {
            init : init
        };
    })();
    function fnCube() {
        var $cube = $("#cube");
        $cube.show();
        var $cubeBox = $('#cubeBox');

        var $details = $('#details');
        var $detailsList = $('#detailsList');
        var $detailsReturn = $('#detailsReturn');

        var cube = (function () {
            var $li = $cubeBox.find('li');
            var downX = 0;
            var downY = 0;
            var startX = -45;
            var startY = 45;
            var step = 1 / 2;
            var x = 0;
            var y = 0;
            var bBtn = true;

            function init() {
                window.setTimeout(function(){
                    $cubeBox.css('transform', 'scale(0.6) rotateX(' + startX + 'deg) rotateY(' + startY + 'deg)');
                    $cubeBox.on('transitionEnd webkitTransitionEnd', function () {
                        $cubeBox.css('transition', '');
                    });
                },1000)

                bind();
            }

            function bind() {

                $(document).on('touchstart', function (ev) {

                    var touch = ev.originalEvent.changedTouches[0];
                    downX = touch.pageX;
                    downY = touch.pageY;
                    bBtn = true;
                    $(document).on('touchmove.move', function (ev) {
                        ev.preventDefault();
                        bBtn = false;
                        //var touch = ev.originalEvent.changedTouches[0];
                        var moveTouch = ev.originalEvent.changedTouches[0];

                        x = (downY - moveTouch.pageY) * step;
                        y = (moveTouch.pageX - downX) * step;

                        if (startX + x > 70) {
                            x = -startX + 70;
                        }
                        else if (startX + x < -70) {
                            x = -startX - 70;
                        }

                        $cubeBox.css('transform', 'scale(0.6) rotateX(' + (startX + x) + 'deg) rotateY(' + (startY + y) + 'deg)');
                        $cubeBox.css('-webkit-transform', 'scale(0.6) rotateX(' + (startX + x) + 'deg) rotateY(' + (startY + y) + 'deg)');

                    });
                    $(document).on('touchend.move', function () {
                        $(document).off('.move');
                    });
                });

                $(document).on('touchend', function (e) {
                    if (bBtn) {  //点击
                        if(e.target.tagName.toLowerCase() =="li"){
                            $cube.hide();
                            //$details.show();
                            details.init($(e.target).index());

                        }

                    }
                    else {  //拖拽
                        startX += x;
                        startY += y;
                    }
                });
            }

            return {
                init: init
            };
        })();


        var details = (function (index) {

            function init(index) {

                var slides = document.querySelectorAll("#detailsList   .swiper-slide");
                bind(index);

                $detailsReturn.on('touchstart', function () {
                    [].forEach.call(slides, function (item,index) {
                        item.firstElementChild.id = "";
                        slides[index].style.zIndex = 0;
                        if(index==0){
                            fnNav().fnClose();
                        }

                    });
                    $cube.show();
                    $details.hide();

                });
            }

            function bind(index) {
                $details.show();


                if(index==0){
                    fnNav().fnOpen();
                }
                var mySwiper = new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    initialSlide: index,
                    //effect: "slide",
                    effect:"coverflow",
                    onTransitionEnd: function (swiper) {

                        var curIn = swiper.activeIndex;

                        var slides = swiper.slides;
                        [].forEach.call(slides, function (item, index) {

                            item.firstElementChild.id = "";
                            if(index==0){
                                fnNav().fnClose();
                            }

                            if (index == curIn) {
                                item.firstElementChild.id = "n" + curIn;
                                if(index ==0){
                                    fnNav().fnOpen();
                                }
                            }

                        })
                    },
                    onSlideChangeStart: function (swiper) {

                    }

                });


            }

            return {
                init: init
            };

        })();




        cube.init();
    }

    function fnNav(){
        if ( $.fn.makisu.enabled ) {
            var $maki = $( '.maki' );

            // Create Makisus

        }
            function fnOpen(){
                $maki.makisu({
                    selector: 'dd',
                    overlap: 0.6,
                    speed: 0.85
                });
                $( '.list' ).makisu( 'open' );
            }
            function fnClose(){
                $maki.makisu({
                    selector: 'dd',
                    overlap: 0.6,
                    speed: 0
                });
                $( '.list' ).makisu( 'close' );
            }


        return {
            fnOpen:fnOpen,
            fnClose:fnClose
        }
    }



   init();

});