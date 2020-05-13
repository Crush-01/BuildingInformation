function RedCategory(option) {
    var defaults = {
        elem: '',//外部容器
        butid: '',//新增按钮
        data: null,
        conditionNum: 6,//允许增加多少条
        ProvinceIDs: -1,
        searchVal: null
    };
    this.options = $.extend(defaults, option);
    this.elem = this.options.elem;
    this.butid = this.options.butid;
    this.data = this.options.data;
    this.conditionNum = this.options.conditionNum;
    this.searchVal = this.options.searchVal;
    this.ProvinceIDs = this.options.ProvinceIDs;
    this.condition = [];
    this.select = null;

    this.load();
    this.butClick();
    this.conditionEmpty();
};
///属地化
RedCategory.prototype.localization_Event = function () {
    var _this = this;
    var _val = jQuery.extend(true, {}, _this.condition);
    $(_this.elem).html('');
    $.each(_val, function (i, id) {
        var _info = _this.select.getObjectInfo(_this.select.transferObject(id.split('_')[0]));
        if (_info[0]['ProvinceIDs'].indexOf("|" + _this.ProvinceIDs + "|") == -1 && _info[0]['ProvinceIDs'] != "") {
            var _index = _this.condition.indexOf(id);
            $('[data-red] .nconditions-wrap').eq(_index).remove();
            _this.condition.splice(_index, 1);
            useingKey.Red.splice(_index, 1);
        }
    });
    _this.select.ProvinceIDs = _this.ProvinceIDs;
    _this.select.data_tag_row_Num = 0;
    _this.select.load();
    _this.butClick();
    _this.setCache();
    _this.isRadioShow();
};
///√
RedCategory.prototype.load = function () {
    var _this = this;
    _this.select = new Select({
        elem: this.elem,
        data: this.data,
        parentField: 'ParentID',
        valueField: 'CategoryID',
        textField: 'CategoryName',
        width: '150px',
        isLocalization: false,
        selectAll: { "IsMultiple": true },
        setMaxSize: null,
        ProvinceIDs: _this.ProvinceIDs,
        input: ['<div class="option-label">荣誉名称：</div>', '<input class="search-input-s w310 fl" type="text" name="name" id="txt_red_keyword" placeholder="关键词用空格键隔开，如：体育中心 鲁班奖" autocomplete="off" />']
    });
};
RedCategory.prototype.butClick = function () {
    var _this = this;
    $(_this.butid).unbind('click').click(function () {
        if (_this.isEntity() || _this.isRepeat() || _this.tips(this) || !$('#submitValidate').submitValidate())
            return false;
        _this.getCompanyIDs(this);
    });
};
///是否整行为空√
RedCategory.prototype.isEntity = function () {
    var _this = this;
    var flag = false;
    var _firstVal = $(_this.elem + ' [data-tap="column"]:first .selectpicker').selectpicker('val');
    var _keyword = $('#txt_red_keyword').val();
    var _time = $('#txt_search_red_time').val();
    if (_firstVal == '-1' && _keyword == "" && _time == "") {
        $.layer.notity("条件不可为空");
        flag = true;
    }
    return flag;
};
///条件是否选择完整√
RedCategory.prototype.isComplete = function () {
    var _this = this;
    var flag = false;
    var _firstVal = $(_this.elem + ' [data-tap="column"]:first .selectpicker').selectpicker('val');
    var _lastVal = $(_this.elem + ' [data-tap="column"]:last .selectpicker').selectpicker('val');
    if (_firstVal != '-1' && _lastVal == '-1') {
        $.layer.notity("请将资质条件选择完整");
        flag = true;
    }
    return flag;
};
///增加条件数目限制
RedCategory.prototype.tips = function (obj) {
    var _this = this;
    var flag = false;
    var _rowLength = $('[' + $(obj).attr('data-add') + '] .nconditions-wrap').length;
    if (_rowLength >= _this.conditionNum) {
        flag = true;
        $.layer.notity('最多可以增加' + _this.conditionNum + '个条件');
    }
    return flag;
};
///条件是否已选择
RedCategory.prototype.isRepeat = function () {
    var _this = this;
    var flag = false;
    var _val = _this.getValue();
    if ($.inArray(_val, _this.condition) > -1) {
        $.layer.notity("该条件已选择，请更换条件");
        flag = true;
    }
    return flag;
};
///生成条件text拼接html√
RedCategory.prototype.conditionHtml = function () {
    var _this = this;
    var _html = [];
    _html.push('<div class="nconditions-wrap clear-fix">');
    _html.push('    <div class="nconditions fl">');
    _html.push('        <span>');
    _html.push(_this.getText());
    _html.push('        </span>');
    _html.push('        <a href="javascript:;" data-delete="data-red">×</a>');
    _html.push('    </div>');
    _html.push('</div>');
    return _html.join('');
};
///获取value值√
RedCategory.prototype.getValue = function () {
    var _this = this;
    var _selectLen = $(_this.elem + ' [data-tap="column"]').length;
    var _val = _this.select.transferObject($(_this.elem + ' [data-tap="column"]:last .selectpicker').selectpicker('val'));
    if (_val.length == 0 && _selectLen >= 2)
        _val = _this.select.transferObject($(_this.elem + ' [data-tap="column"]:last').prev().find('.selectpicker').selectpicker('val'));
    var data = '';
    $.each(_val, function (index, item) {
        data += item + '_';
    });
    if (data.length == 0)
        data += '_';
    data = data + $('#txt_red_keyword').val() + '_' + $('#txt_search_red_time').val() + '_' + ($('#txt_red_num').val() == "" ? 1 : $('#txt_red_num').val());
    return data;
};
///获取text值√
RedCategory.prototype.getText = function () {
    var _this = this;
    var _select = $(_this.elem + ' [data-tap="column"]');
    var _text = [],_red=[];
    $.each(_select, function (index, item) {
        var _val = _this.select.transferObject($(item).find('.selectpicker').selectpicker('val'));
        var _valInfo = _this.select.getObjectInfo(_val);
        if (_valInfo.length == 1) {
            _text.push(_valInfo[0][_this.select.textField]);
        }
        else {
            $.each(_valInfo, function (i, info) {
                _red.push(info[_this.select.textField]);
            });
            if (_valInfo.length > 0) {
                _text.push(_red.join('、'));
            }
        }
    });
    var _strTxt = _text.join('-');
    _text = [];
    if (_strTxt!="")
        _text.push(_strTxt);
    if ($('#txt_red_keyword').val() != "")
        _text.push('荣誉名称：' + $('#txt_red_keyword').val());
    if ($('#txt_search_red_time').val() != "")
        _text.push('起止时间：' + $('#txt_search_red_time').val());
    _text.push('符合荣誉条件的数量≥' + ($('#txt_red_num').val() == "" ? 1 : $('#txt_red_num').val()));
    return _text.join('；');
};
///获取所有条件值的集合
RedCategory.prototype.getConditionArr = function () {
    var _this = this;
    var _result = [];
    var _object = {};
    if (!$.isEmptyObject(_this.condition)) {
        _object['CategoryID'] = _this.condition;
        _result.push(_object);
    }
    return _result;
};
///删除已添加条件√
RedCategory.prototype.conditionClose = function (obj) {
    var _this = this;
    $('[' + $(obj).attr('data-add') + ']').find('a:last').unbind('click').click(function () {
        var _index = $('[' + $(this).attr('data-delete') + ']').find('a').index(this);
        $(this).parents('.nconditions-wrap').remove();
        _this.condition.splice(_index, 1);
        useingKey.Red.splice(_index, 1);
        _this.setCache();
        _this.isRadioShow();
    });
};
///清空条件√
RedCategory.prototype.conditionEmpty = function () {
    var _this = this;
    $('[data-empty="data-red"]').click(function () {
        $(_this.elem).html('');
        $('[' + $(this).attr('data-empty') + ']').html('');
        $('#txt_search_red_time').val('');
        $('#txt_red_num').val('');
        _this.condition = [];
        useingKey.Red = [];
        _this.setCache();
        _this.select.data_tag_row_Num = 0;
        _this.select.load();
        _this.butClick();
        _this.isRadioShow();
    });
};

RedCategory.prototype.setCache = function () {
    var _this = this;
    var _result = _this.getErgodicCache();
    $('#scrollTop .newcolor-red').text(_result.size);
    var cids = '';
    _result.forEach(function (value, key, map) {
        cids += value + ',';
    });
    localStorage.setItem("companyCIDs", cids.substring(0, cids.length - 1));
};
///遍历所有可用的key(useingKey)√
RedCategory.prototype.getErgodicCache = function () {
    var _this = this;
    var _arr = new Set();
    var _result = {};
    $.each(Object.keys(useingKey), function (i, key) {
        var _cacheKey = useingKey[key];
        if (!$.isEmptyObject(_cacheKey))
            _result[key] = _this.getSingleSet(_cacheKey);
    });
    $.each(Object.keys(_result), function (index, key) {
        if (index == 0) {
            _arr = _result[key];
            return true;
        }
        _arr = _this.intersectionArr(_arr, _result[key]);
    });
    return _arr;
};
///遍历某项条件key获取cid缓存取交、并集。√
RedCategory.prototype.getSingleSet = function (cacheKey) {
    var _this = this;
    var _radio = 0;
    var _arr = new Set();
    $.each(cacheKey, function (j, key) {
        if (key.toLowerCase().indexOf('technique') > -1)
            _radio = $('[data-technique-radio] input[type="radio"]:checked').val();
        else if (key.toLowerCase().indexOf('people') > -1)
            _radio = $('[data-people-radio] input[type="radio"]:checked').val();
        else if (key.toLowerCase().indexOf('tender') > -1)
            _radio = $('[data-tender-radio] input[type="radio"]:checked').val();
        if (j == 0) {
            _arr = new Set($.data(myObject, key));
            return true;
        }
        if (_radio == 1) {
            _arr = _this.unionArr(_arr, new Set($.data(myObject, key)));
        } else {
            _arr = _this.intersectionArr(_arr, new Set($.data(myObject, key)));
        }

    });
    return _arr;
};
///获取数组交集√
RedCategory.prototype.intersectionArr = function (a, b) {
    return new Set([...a].filter(x => b.has(x)));
};
///获取数组并集√
RedCategory.prototype.unionArr = function (a, b) {
    return new Set(Array.from(new Set([...a, ...b])));
};
///设置值
RedCategory.prototype.setValue = function (data) {
    var _this = this;
    _this.select.data_tag_row_Num = 0;
    _this.select.searchValue = data;
    _this.select.setValue();
};
///单选按钮事件
RedCategory.prototype.radio = function () {
    var _this = this;
    $('[data-red-radio] input[type="radio"]').click(function () {
        _this.setCache();
    });
};
///单选显示隐藏
RedCategory.prototype.isRadioShow = function () {
    var _this = this;
    var _rowLength = $('[data-red] .nconditions-wrap').length;
    if (_rowLength >= 2)
        $('[data-red-radio]').show();
    else
        $('[data-red-radio]').hide();
}