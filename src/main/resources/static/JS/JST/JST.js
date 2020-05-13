var JST = {
    host:"cbi360.net"
};

JST.loadJS = function () {
    //如果没有解析到值返回null

    var js = [];
    var version = "1.0.0.880";
    js.push("jquery/jquery-1.11.0.min.js?v=" + version);
    // js.push("cbi360/cbi360.js?v=" + version);
    // js.push("cbi360/cbi360.utils.js?v=" + version);
    // js.push("cbi360/cbi360.validate.js?v=" + version);
    js.push("jquery/jquery-extend/jquery.fn.layer.js?v=" + version);
    js.push("jquery/jquery-extend/jquery.fn.validate.js?v=" + version);
    js.push("jquery/jquery-extend/jquery.fn.laydate.js?v=" + version);
    js.push("jquery/jquery-extend/jquery.fn.tab.js?v=" + version);
    js.push("plugins/layui/laydate/laydate.js?v=" + version);
    js.push("plugins/layui/laytpl/laytpl.js?v=" + version);
    js.push("plugins/layui/laypage/laypage.js?v=" + version);
    js.push("global/css/global.css?v=" + version);

    js.push("global/css/header.css?v=" + version);

    js.push("hhb/css/newhhb-companydetails.css?v=" + version);
    js.push("hhb/css/newpublic.css?v=" + version);
    js.push("hhb/css/newhhb.css?v=" + version);

    js.push("hhb/css/road/road.css?v=" + version);

    js.push("hhb/css/prompt.css?v=" + version);
    js.push("hhb/css/hhb.css?v=" + version);
    js.push("hhb/css/hhb-compdetails.css?v=" + version);
    js.push("hhb/css/hhb-search.css?v=" + version);
    js.push("hhb/css/hhb-evaluate.css?v=" + version);
    js.push("hhb/css/category.css?v=" + version);
    js.push("hhb/css/status.css?v=" + version);
    js.push("hhb/css/xinyong.css?v=" + version);
    js.push("hhb/css/hhb-combin.css?v=" + version);
    js.push("hhb/css/user-status.css?v=" + version);
        
    document.writeln("<link rel=\"stylesheet\" href=\"/JS/jquery-select/css/bootstrap.css?v=" + version + "\" />");
    document.writeln("<link rel=\"stylesheet\" href=\"/JS/jquery-select/css/bootstrap-select.css?v=" + version + "\" />");

    for (var i = 0; i < js.length; i++) {
        var value = js[i];
        if (value.indexOf('.css') > -1)
            document.writeln(" <link href=\"//static." + JST.host + "/" + value + "\" rel=\"stylesheet\" />");
        if (value.indexOf('.js') > -1)
            document.writeln("<script src=\"//static." + JST.host+"/global/js/" + value + "\"></script>");
    }
    // document.writeln("<script src=\"/JS/jquery-extend/jquery.fn.dropdown.js?v=" + version + "\"></script>");
    // document.writeln("<script src=\"/JS/jquery-extend/jquery.fn.layer.js?v=" + version + "\"></script>");
    // document.writeln("<script src=\"/JS/jquery-plugins/jquery-skip.js?v=" + version + "\"></script>");
    // document.writeln("<script src=\"/JS/jquery-extend/jquery.fn.prompt.js?v=" + version + "\"></script>");
    // document.writeln("<script src=\"/JS/JST/JST.utils.js?v=" + version + "\"></script>");
    // document.writeln("<script src=\"/JS/JST/JST.online.js?v=" + version + "\"></script>");
    // document.writeln("<script src=\"/JS/JST/JST.tips.js?v=" + version + "\"></script>");
    //下拉框引用
    document.writeln("<script src=\"/JS/jquery-select/js/bootstrap.js?v=" + version + "\"></script>");
    document.writeln("<script src=\"/JS/jquery-select/js/bootstrap-select.js?v=" + version + "\"></script>");
};
JST.loadJS();