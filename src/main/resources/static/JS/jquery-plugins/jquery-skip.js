function skippage(_skipnum) {
    var _limitnum = 50;
    var _tipsnum = 1000;
    var _tips = "升级VIP后页码数到" + _tipsnum;
    //体验会员
    if (cbi360.user.IsVip() == 2) {
        _limitnum = 50;
    }
    //会员
    else if (cbi360.user.IsVip() == 1) {
        _limitnum = 1000
        _tips = "页数不能超过" + _tipsnum;
    }
    if (_skipnum > 0 && _skipnum <= _limitnum) {
        return true;
    }
    if (typeof (layer) != 'undefined')
        layer.alert(_tips);
    else
        alert(_tips);
    return false;
};
