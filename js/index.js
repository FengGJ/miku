$(function () {
    var canvas=$("canvas")[0];
    var cobj=canvas.getContext("2d");
    /*var w=$(window).width();
    var h=$(window).height();*/

    $("canvas").attr("height","701");
    $("canvas").attr("width","1366");

    var runs=document.querySelectorAll(".runs");
    var jump=document.querySelectorAll(".jump");
    var di=document.querySelector(".di");
    var di1=document.querySelector(".di1");
    var hinderImg=document.querySelectorAll(".hinderImg");
    var hua=document.querySelectorAll(".hua");
    var cong=document.querySelectorAll(".cong");
    var huaxing=document.querySelector(".huaxing");
    console.log(huaxing);
    var jumpa=document.querySelector(".jumpa");
    var pengzhuang=document.querySelector(".pengzhuang");
    var bg=document.querySelector(".bg");
    // console.log(hinderImg)
    // hinderImg.style.transform="rotateY(180deg)";


    var gameplay= new game(canvas,cobj,runs,jump,di,di1,hinderImg,hua,cong,huaxing,jumpa,pengzhuang,bg);
    var flag=true;

    $(".start button").one("click",()=>{
        $(".start input").css("opacity","0");
        $(".start button").css("opacity","0");
        var num=1;
        var name= $(".start input").val();
        $(".shuzi span").css({"opacity":1,"z-index": -1});
        var tt =setInterval(function () {


            num++;
            if(num>=4){
                console.log(num)
                $(".start").toggleClass("active");
                flag=false;
                clearInterval(tt);
                gameplay.play(name);
            }else{
                $(".shuzi span").text(num)

            }


        },1000)

        if(!flag){
            console.log(num)
            return false;
        }

        setTimeout(function () {

        },0)
    })

    var val=0;
    $(".vocie").click(function(){
        val=$(this).find("span").attr("class");
        $(this).find("span").attr("class",$(this).find("span").attr("data"));
        $(this).find("span").attr("data",val);
        if($(this).find("span").attr("class")=="iconfont icon-yinliang1"){
            gameplay.shengying(true);
        }else if($(this).find("span").attr("class")=="iconfont icon-yinliang"){
            gameplay.shengying(false);

        }

    })
    /*$(".again").click(function(){

        gameplay.again(canvas,cobj,runs,jump,di,di1,hinderImg,hua,cong,huaxing,jumpa,pengzhuang,bg);

    })*/
    $(".pause").click(function(){
        val=$(this).find("span").attr("class");
        $(this).find("span").attr("class",$(this).find("span").attr("data"));
        $(this).find("span").attr("data",val);
        if($(this).find("span").attr("class")=="iconfont icon-zanting"){
            gameplay.zt(true);
        }else if($(this).find("span").attr("class")=="iconfont icon-kaishi"){
            gameplay.zt(false);

        }

    })
    $(".over button").click(function () {
        location.reload();
    })
})