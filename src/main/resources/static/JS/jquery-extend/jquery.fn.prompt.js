
(function ($) {
    // 提示信息  新增四川地区特有资质和人员条件
    $.fn.extend({
        prompt: function (address) {
            var cookie = new cbi360.cookie("jst_top_tips_20200110");
            var html = "";
            html += '<div class="clear-fix prompt-main slidedown">';
            html += '<div class="clear-fix prompt-news">';

            html += '<div class="prompt-txt">&nbsp;&nbsp;';
            html += '<span class="new-prompt-red">产品动态：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            html += '<span class="new-prompt-red new-prompt-position">【信用评价】新增6省来源，快来看看有没有你的省！ <i class="prompt-circle"></i></span>';
            html += '<a href="https://help.cbi360.net/1015/65.html" target="_blank" class="new-prompt-blue">&nbsp;&nbsp;点击查看>></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            html += '<span class="new-prompt-red new-prompt-position">【员工名片】上线了 <i class="prompt-circle"></i></span>';
            html += '<a href="https://help.cbi360.net/1015/64.html" target="_blank" class="new-prompt-blue">&nbsp;&nbsp;&nbsp;&nbsp;点击查看></a>';
            html += '</div>';

            html += '<a href="javascript:;" class="prompt-close" title="关闭提醒">关闭提醒</a>';
            html += '</div>';
            html += '</div>';

            if (!cookie.isExisted())
                $(document.body).prepend(html);

            $(".slidedown").slideDown();
            $(".prompt-close").click(function () {
                $(".slidedown").toggle(300);
                cookie.setValue("true");
                cookie.setExpires(12, "h");
                cookie.save();
            });
        }
    });
})(jQuery);