function Multicard(option) {
    var defaults = {
        elem: '',//外部容器
        butid: '',//新增按钮
        data: null,
        selectAll: {},
        conditionNum: 6,//允许增加多少条
        ProvinceIDs: -1,
        searchVal: null
    };
    this.options = $.extend(defaults, option);
    this.elem = this.options.elem;
    this.butid = this.options.butid;
    this.data = this.options.data;
    this.selectAll = this.options.selectAll;
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
Multicard.prototype.localization_Event = function () {
    var _this = this;
    var _val = jQuery.extend(true, {}, _this.condition);
    $(_this.elem).html('');
    $.each(_val, function (i, id) {
        var _info = _this.select.getObjectInfo(_this.select.transferObject(id.split('_')[0]));
        if (_info[0]['ProvinceIDs'].indexOf("|" + _this.ProvinceIDs + "|") == -1 && _info[0]['ProvinceIDs'] != "") {
            var _index = _this.condition.indexOf(id);
            $('[data-multicard] .nconditions-wrap').eq(_index).remove();
            _this.condition.splice(_index, 1);
            useingKey.People.splice(_index, 1);
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
Multicard.prototype.load = function () {
    var _this = this;
    _this.select = new Select({
        elem: _this.elem,
        data: _this.data,
        parentField: 'ParentID',
        valueField: 'CategoryID',
        textField: 'CategoryName',
        width: '150px',
        isLocalization: true,
        selectAll: _this.selectAll,
        ProvinceIDs: _this.ProvinceIDs,
        input: [
            { "type": "text", "class": "search-input-s fl w180", "id": "txt_people_multicard_num", "placeholder": "同时拥有多本证书的人数≥", "autocomplete": "off", "data-rule": "请输入正确的人数:int[0~999999999];" },
            { "type": "button", "name": "button", "id": "btn_search_people_multicard_add", "data-add": "data-multicard", "value": "加入筛选", "class": "search-btn-s fl bluebgc-btn" }
        ],
    });
};
Multicard.prototype.butClick = function () {
    var _this = this;
    $(_this.butid).unbind('click').click(function () {
        if (_this.isEntity() || _this.isRepeat() || _this.tips(this) || !$(_this.elem).submitValidate())
            return false;
        $('[' + $(this).attr('data-add') + ']').append(_this.conditionHtml('add'));
        _this.condition.push(_this.getValue());
        _this.conditionClose(this);
    });
};
///是否整行为空√
Multicard.prototype.isEntity = function () {
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
Multicard.prototype.isComplete = function () {
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
Multicard.prototype.tips = function (obj) {
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
Multicard.prototype.isRepeat = function () {
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
Multicard.prototype.conditionHtml = function () {
    var _this = this;
    var _html = [];
    _html.push('<div class="nconditions-wrap clear-fix">');
    _html.push('    <div class="nconditions fl">');
    _html.push('        <span>');
    _html.push(_this.getText());
    _html.push('        </span>');
    _html.push('        <a href="javascript:;" data-delete="data-multicard">×</a>');
    _html.push('    </div>');
    _html.push('</div>');
    return _html.join('');
};
///获取value值√
Multicard.prototype.getValue = function () {
    var _this = this;
    var _selectLen = $(_this.elem + ' [data-tap="column"]').length;
    var _val = $(_this.elem + ' [data-tap="column"]:last .selectpicker').selectpicker('val');
    if (_val == '-1' && _selectLen >= 2)
        _val = $(_this.elem + ' [data-tap="column"]:last').prev().find('.selectpicker').selectpicker('val');
    var data = _val+'';
    return data;
};
///获取text值√
Multicard.prototype.getText = function () {
    var _this = this;
    var _select = $(_this.elem + ' [data-tap="column"]');
    var _text = [];
    $.each(_select, function (index, item) {
        var _val = _this.select.transferObject($(item).find('.selectpicker').selectpicker('val'));
        var _valInfo = _this.select.getObjectInfo(_val);
        if (_valInfo.length > 0) {
            var _valInfoText = "";
            $.each(_valInfo, function (i, data) {
                _valInfoText += data[_this.select.textField] + '，';
            });
            _text.push(_valInfoText.substr(0, _valInfoText.length - 1));
        }
    });
    return _text.join('-');
};
///获取所有条件值的集合
Multicard.prototype.getConditionArr = function () {
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
Multicard.prototype.conditionClose = function (obj) {
    var _this = this;
    $('[' + $(obj).attr('data-add') + ']').find('a:last').unbind('click').click(function () {
        var _index = $('[' + $(this).attr('data-delete') + ']').find('a').index(this);
        $(this).parents('.nconditions-wrap').remove();
        _this.condition.splice(_index, 1);
        useingKey.People.splice(_index, 1);
        _this.setCache();
        _this.isRadioShow();
    });
};
///清空条件√
Multicard.prototype.conditionEmpty = function () {
    var _this = this;
    $(_this.elem).html('');
    $('[data-multicard]').html('');
    _this.condition = [];
    _this.select.data_tag_row_Num = 0;
    _this.select.load();
    _this.butClick();
};
///ajax请求后端获取cids√
Multicard.prototype.getCompanyIDs = function (html) {
    var _this = this;
    var _current = '';
    var _peopleNum = $('#txt_people_multicard_num').val();
    var data = {};
    data.CategoryIDs = [];
    $.each(_this.condition, function (index, item) {
        data.CategoryIDs.push(item);
        _current += item + '_';
    });
    data.PeopleNum = (_peopleNum == "" ? 1 : _peopleNum);
    _current += data.PeopleNum;
    var _key = 'people' + _current;
    if (!$.isEmptyObject($.data(myObject, _key))) {
        $('[data-people]').append(html);
        people.conditionClose($('#btn_search_people_add'));
        people.condition.push(_current);
        people.isRadioShow();
        useingKey.People.push(_key);
        _this.setCache();
        return false;
    }
    cbi360.postJSON("/CompanyAdSearch/GetCompanyIDsByPeopleMore/", data, function (res) {
        $('[data-people]').append(html);
        people.conditionClose($('#btn_search_people_add'));
        people.condition.push(_current);
        people.isRadioShow();
        useingKey.People.push(_key);
        $.data(myObject, _key, res.Result);
        _this.setCache();
    });
};
///设置cids缓存及数量附加√
Multicard.prototype.setCache = function () {
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
Multicard.prototype.getErgodicCache = function () {
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
Multicard.prototype.getSingleSet = function (cacheKey) {
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
Multicard.prototype.intersectionArr = function (a, b) {
    return new Set([...a].filter(x => b.has(x)));
};
///获取数组并集√
Multicard.prototype.unionArr = function (a, b) {
    return new Set(Array.from(new Set([...a, ...b])));
};
///设置值
Multicard.prototype.setValue = function (data) {
    var _this = this;
    _this.select.data_tag_row_Num = 0;
    _this.select.searchValue = data;
    _this.select.setValue();
};
///单选按钮事件
Multicard.prototype.radio = function () {
    var _this = this;
    $('[data-people-radio] input[type="radio"]').click(function () {
        _this.setCache();
    });
};
///单选显示隐藏
Multicard.prototype.isRadioShow = function () {
    var _this = this;
    var _rowLength = $('[data-people] .nconditions-wrap').length;
    if (_rowLength >= 2)
        $('[data-people-radio]').show();
    else
        $('[data-people-radio]').hide();
}