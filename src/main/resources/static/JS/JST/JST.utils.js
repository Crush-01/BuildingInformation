(function($,JST) {
    var utils = {};
    utils.JoinURL = function (json) {
        var URL = "";
        for (var key in json) {
            var value = json[key];
            if (value != undefined)
                value = value + '';
            if (value != undefined && value != "" && value != -1) {
                URL += "&" + key + "=" + encodeURIComponent($.trim(value));
            }
        }
        if (URL != "")
            URL = URL.substring(1);

        return URL == "" ? "" : "?" + URL;
    };
    utils.JoinURL = function (json, notFilterKey) {
        var URL = "";
        for (var key in json) {
            var value = json[key];
            if (value != undefined)
                value = value + '';
            if (value != undefined && value != "" && value != -1) {
                URL += "&" + key + "=" + encodeURIComponent($.trim(value));
            }
            if (value == -1 && key == notFilterKey) {
                URL += "&" + key + "=" + encodeURIComponent($.trim(value));
            }
        }
        if (URL != "")
            URL = URL.substring(1);

        return URL == "" ? "" : "?" + URL;
    };
    JST.utils = utils;
})(jQuery,JST)