(function ($) {
    $.extend({
        layer: {
            success: function (msg, opt) {
                if (msg.length == 0) return false; 
                opt = opt || null;
                var defaults = {
                    icon: 1,
                    title: "提示",
                    time: 0,
                    shade: 0.1,
                    isreload: false, //是否刷新当前页面
                    callback: null, //确定后回调函数
                    closecallback: null //销毁时回调
                };
                var opts = $.extend(defaults, opt);
                var callback = opts.callback;
                var isreload = opts.isreload;
                var closecallback = opts.closecallback;
                if ($.isFunction(callback)) {
                    opts.yes = function (index) {
                        layer.close(index);
                        callback();
                    }
                }
                if (isreload) {
                    layer.alert(msg, opts, function (index) {
                        window.location.reload();
                    });
                    return false;
                }
                if ($.isFunction(closecallback)) {
                    opts.end = function () {
                        closecallback();
                    }
                }
                layer.alert(msg, opts);
                return false;
            },
            error: function (msg, title) {
                title = title || "提示";
                var c = { icon: 2, title: title, shade: 0.1 };
                layer.alert(msg, c);
            },
            //警告
            warn: function (msg, title) {
                title = title || "提示";
                var c = { icon: 0, title: title, shade: 0.1 };
                layer.alert(msg, c);
            },
            alert: function (msg, title) {
                title = title || "提示";
                var c = { icon: 0, title: title, shade: 0.1 };
                layer.alert(msg, c);
            },
            confirm: function (msg, callback) {

                var d = {};
                d.title = "提醒";
                d.btn = ['确定', '取消'];
                layer.confirm(msg, d, function () {
                    if ($.isFunction(callback)) {
                        callback();
                    }
                });
            },
            notity: function(msg) {
                layer.msg(msg,
                    {
                        time: 4000, //2秒关闭（如果不配置，默认是3秒） 
                        anim: 6
                    });
            },
            msg: function(msg) {
                layer.msg(msg,
                    {
                        time: 4000, //2秒关闭（如果不配置，默认是3秒） 
                        anim: 6
                    });
            },
            tips: function (tipsText, Widget, position, tipsColor) {
                var defaults = {
                    tipsText: "",
                    Widget: null,
                    position: 4,
                    tipsColor: "#3595CC"
                };
                var opt = {};
                if (tipsText != undefined) {
                    opt.tipsText = tipsText;
                }
                if (Widget != undefined) {
                    opt.Widget = Widget;
                }
                if (position != undefined) {
                    opt.position = position;
                }
                if (tipsColor != undefined) {
                    opt.tipsColor = tipsColor;
                }
                var opts = $.extend(defaults, opt);
                layer.tips(opts.tipsText, opts.Widget, {
                    tips: [opts.position, opts.tipsColor],
                    time: 2000
                });
            }
        }
    });
})(jQuery);