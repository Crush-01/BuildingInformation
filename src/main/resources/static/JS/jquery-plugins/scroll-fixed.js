(function($){
    
    jQuery.fn.scrBot = function(id){
    //获取要定位元素距离浏览器顶部的距离
    　　var eletop = $(id).offset().top;
    　　//滚动条事件
        $(window).resize(function() {
            $(id).css({"position":"static"});
        });
    　　$(window).scroll(function(){
    　　　　//获取滚动条的滑动距离
    　　　　var scrdistance = $(this).scrollTop();
    　　　　if(scrdistance<eletop){
        　　　　$(id).css({"position":"fixed","bottom":0,"width":"1200"});
    　　　　}
            //div出现在可视区域内时 取消固定定位 
            if(eletop >= $(window).scrollTop() && eletop < ($(window).scrollTop() + $(window).height())){
                $(id).css({"position":"static"});
        　　}else{
                return false;
            }
        });
    },
    jQuery.fn.scrTop = function(){
        //获取要定位元素距离浏览器顶部的距离
        var navH = $("#newriskWrap").offset().top;
        //滚动条事件
        $(window).scroll(function(){
        　　//获取滚动条的滑动距离
        　　var scroH = $(this).scrollTop();
        　　//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
        　　if(scroH>=navH){
        　　　　$("#newrisk").css({"position":"fixed","top":0,"width":1158,"box-shadow":"0px 15px 10px -15px #ccc"});
        　　}else if(scroH<navH){
        　　　　$("#newrisk").css({"position":"static","box-shadow":"0px 0px 0px 0px #fff"});
        　　}
        });
    }

})(jQuery)