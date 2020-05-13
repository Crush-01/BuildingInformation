function Credit(option) {
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
    this.radio();
};
///属地化
Credit.prototype.localization_Event = function () {
    var _this = this;
    var _val = jQuery.extend(true, {}, _this.condition);
    $(_this.elem).html('');
    $.each(_val, function (i, id) {
        var _info = _this.select.getObjectInfo(_this.select.transferObject(id.split('_')[0]));
        if (_info[0]['ProvinceIDs'].indexOf("|" + _this.ProvinceIDs + "|") == -1 && _info[0]['ProvinceIDs'] != "") {
            var _index = _this.condition.indexOf(id);
            $('[data-credit] .nconditions-wrap').eq(_index).remove();
            _this.condition.splice(_index, 1);
            useingKey.Credit.splice(_index, 1);
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
Credit.prototype.load = function () {
    var _this = this;
    _this.select = new Select({
        elem: this.elem,
        data: this.data,
        parentField: 'ParentID',
        valueField: 'CategoryID',
        textField: 'CategoryName',
        width: '150px',
        isLocalization: false,
        ProvinceIDs: _this.ProvinceIDs,
        input: [{ "type": "button", "name": "button", "id": "btn_add_credit", "value": "加入筛选", "data-add": "data-credit", "class": "search-btn-s fl bluebgc-btn" }],
        callbackChange: function (obj,val) { _this.change(obj,val) }
    });
};
Credit.prototype.butClick = function () {
    var _this = this;
    $(_this.butid).unbind('click').click(function () {
        if (_this.isEntity() || _this.isComplete() || _this.isRepeat() || _this.tips(this) || !$(_this.elem).submitValidate())
            return false;
        _this.getCompanyIDs(this);
    });
};
///是否整行为空√
Credit.prototype.isEntity = function () {
    var _this = this;
    var flag = false;
    var _firstVal = $(_this.elem + ' [data-tap="column"]:first .selectpicker').selectpicker('val');
    if (_firstVal == '-1') {
        $.layer.notity("条件不可为空");
        flag = true;
    }
    return flag;
};
///条件是否选择完整√
Credit.prototype.isComplete = function () {
    var _this = this;
    var flag = false;
    var _firstVal = $(_this.elem + ' [data-tap="column"]:first .selectpicker').selectpicker('val');
    var _lastVal = $(_this.elem + ' [data-tap="column"]:not("[data-year],[data-num]"):last .selectpicker').selectpicker('val');
    if (_lastVal == '-1') {
        _lastVal = $(_this.elem + ' [data-tap="column"]:not("[data-year],[data-num]"):last').prev().find('.selectpicker').selectpicker('val');
    }
    var _lastInfo = _this.select.getObjectInfo(_this.select.transferObject(_lastVal));
    if (_lastInfo[0]['Mark']!=-1) {
        var _year = "", _num = "";
        if (_lastInfo[0]['HasYear'] != 2)
            _year = $(_this.elem + ' [data-tap="column"]:last .selectpicker').selectpicker('val');
        if (_lastInfo[0]['Mark'] == 2 || _lastInfo[0]['Mark'] == 3)
            _num = $(_this.elem + ' [data-num]').val() == "" ? "-1" : $(_this.elem + ' [data-num]').val();
        if (_year == "-1" || _num == "-1" || _num == undefined && (_lastInfo[0]['Mark'] == 2 || _lastInfo[0]['Mark'] == 3))
            _lastVal = '-1';
        if (_year == "-1" && _lastInfo[0]['Mark'] == 1)
            _lastVal = '-1';
    }

    if (_firstVal != '-1' && _lastVal == '-1') {
        $.layer.notity("请将信用评价选择完整");
        flag = true;
    }
    return flag;
};
///增加条件数目限制
Credit.prototype.tips = function (obj) {
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
Credit.prototype.isRepeat = function () {
    var _this = this;
    var flag = false;
    var _lastVal = _this.getValue();
    if ($.inArray(_lastVal, _this.condition) > -1) {
        $.layer.notity("该条件已选择，请更换条件");
        flag = true;
    }
    return flag;
};
///生成条件text拼接html√
Credit.prototype.conditionHtml = function () {
    var _this = this;
    var _html = [];
    _html.push('<div class="nconditions-wrap clear-fix">');
    _html.push('    <div class="nconditions fl">');
    _html.push('        <span>');
    _html.push(_this.getText());
    _html.push('        </span>');
    _html.push('        <a href="javascript:;" data-delete="data-credit">×</a>');
    _html.push('    </div>');
    _html.push('</div>');
    return _html.join('');
};
///获取value值√
Credit.prototype.getValue = function () {
    var _this = this;
    var data = $(_this.elem + ' .selectpicker:not([data-tap="year"]):last').selectpicker('val');
    if (data == '-1')
        data = $(_this.elem + ' [data-tap="column"]:not("[data-year],[data-num]"):last').prev().find('.selectpicker').selectpicker('val');
    var _valInfo = _this.select.getObjectInfo(_this.select.transferObject(data));
    if (_valInfo[0]['Mark'] == 2) {
        data += '_' + ($('#txt_credit_score').val() == "" ? 0 : $('#txt_credit_score').val());
    } else if (_valInfo[0]['Mark'] == 3) {
        data += '_' + ($('#txt_credit_rank').val() == "" ? 0 : $('#txt_credit_rank').val());
    }
    if (_valInfo[0]['HasYear'] == 1 || _valInfo[0]['HasYear'] == 2) {
        data += '_' + $(_this.elem + ' .selectpicker:last').selectpicker('val');
    }
    return data;
};
///获取text值√
Credit.prototype.getText = function () {
    var _this = this;
    var _select = $(_this.elem + ' .selectpicker:not([data-tap="year"])');
    var _text = [];
    var _valArr = [];
    $.each(_select, function (index, item) {
        if ($(item).selectpicker('val') == '-1')
            return true;
        var _val = _this.select.transferObject($(item).selectpicker('val'));
        var _valInfo = _this.select.getObjectInfo(_val);
        if (_valInfo.length > 0)
            _text.push(_valInfo[0][_this.select.textField]);
        if (_select.length - 1 == index)
            _valArr = _this.select.getObjectInfo(_val);
    });
    if (_valArr.length > 0) {
        if (_valArr[0]['Mark'] == 2) {
            var _score = $('#txt_credit_score').val();
            _text.push(_score == "" ? "" : '信用得分大于等于' + _score + '分');
        } else if (_valArr[0]['Mark'] == 3) {
            var _rank = $('#txt_credit_rank').val();
            _text.push(_rank == "" ? "" : '排名前' + _rank + '名');
        }
        if (_valArr[0]['HasYear'] == 1 || _valArr[0]['HasYear'] == 2) {
            var _year = $(_this.elem + ' [data-tap="year"]');
            if (_year.selectpicker('val') != "-1")
                _text.push(_year.selectpicker('val') + "年度");
        }
    }
    return _text.join('-');
};
///获取所有条件值的集合
Credit.prototype.getConditionArr = function () {
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
Credit.prototype.conditionClose = function (obj) {
    var _this = this;
    $('[' + $(obj).attr('data-add') + ']').find('a:last').unbind('click').click(function () {
        var _index = $('[' + $(this).attr('data-delete') + ']').find('a').index(this);
        $(this).parents('.nconditions-wrap').remove();
        _this.condition.splice(_index, 1);
        useingKey.Credit.splice(_index, 1);
        _this.setCache();
        _this.isRadioShow();
    });
};
///清空条件√
Credit.prototype.conditionEmpty = function () {
    var _this = this;
    $('[data-empty="data-credit"]').click(function () {
        $(_this.elem).html('');
        $('[' + $(this).attr('data-empty') + ']').html('');
        _this.condition = [];
        useingKey.Credit = [];
        _this.setCache();
        _this.select.data_tag_row_Num = 0;
        _this.select.load();
        _this.butClick();
        _this.isRadioShow();
    });
};
// ///ajax请求后端获取cids√
// Credit.prototype.getCompanyIDs = function (obj) {
//     var _this = this;
//     var _val = _this.getValue();
//     var _key = 'credit' + _val;
//     if (!$.isEmptyObject($.data(myObject, _key))) {
//         $('[' + $(obj).attr('data-add') + ']').append(_this.conditionHtml());
//         _this.condition.push(_val);
//         _this.conditionClose(obj);
//         useingKey.Credit.push(_key);
//         _this.setCache();
//         return false;
//     }
//     var data = {};
//     var _arr = _val.split('_');
//     data.CategoryID = _arr[0];
//     var _valInfo = _this.select.getObjectInfo(_this.select.transferObject(data.CategoryID));
//     if (_arr.length == 2) {
//         if (_valInfo[0]['Mark'] == 2)
//             data.Score = _arr[1];
//         if (_valInfo[0]['Mark'] == 3)
//             data.Rank = _arr[1];
//         if (_valInfo[0]['HasYear'] == 1 || _valInfo[0]['HasYear'] == 2)
//             data.Year = _arr[1];
//     } else if (_arr.length == 3) {
//         if (_valInfo[0]['Mark'] == 2)
//             data.Score = _arr[1];
//         if (_valInfo[0]['Mark'] == 3)
//             data.Rank = _arr[1];
//         data.Year = _arr[2];
//     }
//
//     cbi360.postJSON("/companyadsearch/getcompanyidsbycredit/", data, function (res) {
//         $('[' + $(obj).attr('data-add') + ']').append(_this.conditionHtml());
//         _this.condition.push(_val);
//         _this.conditionClose(obj);
//         useingKey.Credit.push(_key);
//         $.data(myObject, _key, res.Result);
//         _this.setCache();
//     });
// };
///设置cids缓存及数量附加√
Credit.prototype.setCache = function () {
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
Credit.prototype.getErgodicCache = function () {
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
Credit.prototype.getSingleSet = function (cacheKey) {
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
        if (_radio == 1) 
            _arr = _this.unionArr(_arr, new Set($.data(myObject, key)));
        else 
            _arr = _this.intersectionArr(_arr, new Set($.data(myObject, key)));

    });
    return _arr;
};
///获取数组交集√
Credit.prototype.intersectionArr = function (a, b) {
    return new Set([...a].filter(x => b.has(x)));
};
///获取数组并集√
Credit.prototype.unionArr = function (a, b) {
    return new Set(Array.from(new Set([...a, ...b])));
};
///设置值
Credit.prototype.setValue = function (data) {
    var _this = this;
    _this.select.data_tag_row_Num = 0;
    _this.select.searchValue = data;
    _this.select.setValue();
};
///单选按钮事件
Credit.prototype.radio = function () {
    var _this = this;
    $('[data-credit-radio] input[type="radio"]').click(function () {
        _this.setCache();
    });
};
///单选显示隐藏
Credit.prototype.isRadioShow = function () {
    var _this = this;
    var _rowLength = $('[data-credit] .nconditions-wrap').length;
    if (_rowLength >= 2)
        $('[data-credit-radio]').show();
    else
        $('[data-credit-radio]').hide();
};
///下拉回调事件
Credit.prototype.change = function (obj,val) {
    var _this = this;
    var _html = '';
    $(obj).parents('[data-tap="column"]').nextAll('[type="text"]').remove();
    var _valInfo = _this.select.getObjectInfo(val);
    if ((_valInfo[0]['HasYear'] == 1 || _valInfo[0]['HasYear'] == 2) && (_valInfo[0]['Mark'] == 1 || _valInfo[0]['Mark'] == 2 || _valInfo[0]['Mark'] == 3)) {
        $(obj).parents('[data-tap="column"]').after(_this.getYearHtml());
        $(_this.elem).find('.selectpicker').selectpicker('refresh');
    }
    if (_valInfo[0]['Mark'] == 2 || _valInfo[0]['Mark'] == 3) {
        var _placeholder = '信用得分大于等于', _id = 'txt_credit_score';
        if (_valInfo[0]['Mark'] == 3) {
            _placeholder = '排名前几名';
            _id = 'txt_credit_rank';
        }
        _html = _this.addInput([{ "type": "text", "class": "search-input-s fl w140","placeholder": "" + _placeholder + "","data-num":"" ,"id": "" + _id + "", "data-tap":"column" ,"data-rule": "请输入1~999的数字:float[1~999]", "data-tag": "txt_num" }]);
        $(obj).parents('[data-tap="column"]').after(_html);
    }    
};
///获取年份Select的html
Credit.prototype.getYearHtml = function () {
    var _this = this;
    var _data = _this.getCreditYears();
    var _html = [];
    _html.push('<div class="option-select-wrap" data-tap="column" data-year>');
    _html.push('<select class="selectpicker" data-size="8" data-tap="year" data-width="150px">');
    _html.push('<option value="-1">---请选择---</option>');
    if (_data != null && _data.length > 0) {
        $.each(_data, function (index, item) {
            _html.push('<option value="' + item.value + '">' + item.text + '</option>');
        });
    }
    _html.push('</select>');
    _html.push('</div>');
    return _html.join('');
};
///获取年份
Credit.prototype.getCreditYears = function () {
    var year = new Date().getFullYear();
    var data = [];
    for (var i = year; i > 2009; i--) {
        var obj = {};
        obj.text = i + "年度";
        obj.value = i;
        data.push(obj);
    }
    return data;
};
///添加input
Credit.prototype.addInput = function (input) {
    if ($.isEmptyObject(input))
        return;
    var _htlm = '';

    $.each(input, function (index, item) {
        if (typeof (item) != 'object') {
            _htlm += item;
            return true;
        }
        _htlm += '<input';
        $.each(Object.keys(item), function (i, key) {
            _htlm += ' ' + key + '="' + item[key] + '"';
        });
        _htlm += '/>';
    });
    return _htlm;
};