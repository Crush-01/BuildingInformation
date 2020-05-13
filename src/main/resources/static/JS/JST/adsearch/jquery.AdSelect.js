function Select(option) {
    var defaults = {
        elem: '',//外部容器
        but: '',//新增按钮
        data: null,
        rowNum: 4,
        width: 'auto',
        title:"",
        searchValue: null,
        parentField: 'ParentID',//显示名称对应的父级字段
        valueField: 'value',//显示名称对应值的字段
        textField: 'text',//显示名称的字段
        localization: 'ProvinceIDs',//属地化字段
        isLocalization: false,//是否启用属地化
        topLevel: -1,//顶级数据的父级id
        dataSearch: false,//是否显示搜索框
        isSearchCount: 10,//达到多少条显示搜索框
        dataSize: 7,//下拉框能够显示几条数据
        columns: 3,//初始显示几列下拉框
        selectAll: {},//数据集中指定字段、指定值，当前select显示全选eg：{"select":"1"}
        multipleBtn: true,//是否显示多选按钮
        setMaxSize: 4,//所有选中最高多少条
        groupSetMaxSize: 4,//组全选最高选择多少条
        showDeleteBut: 1,//多少条显示删除按钮
        input: [],//在删除按钮前增加控件eg：{ "type": "text", "placeholder": "测试", "value": "按钮" }
        callbackChange: null,//下拉框change回调事件
        callbackDelete: null//删除按钮回调事件
    };
    this.options = $.extend(defaults, option);
    this.elem = this.options.elem;
    this.data = this.options.data;
    this.parentField = this.options.parentField;
    this.valueField = this.options.valueField;
    this.textField = this.options.textField;
    this.localization = this.options.localization;
    this.isLocalization = this.options.isLocalization;
    this.topLevel = this.options.topLevel;
    this.dataSearch = this.options.dataSearch;
    this.columns = this.options.columns;
    this.searchValue = this.options.searchValue;
    this.butid = this.options.butid;
    this.rowNum = this.options.rowNum;
    this.width = this.options.width;
    this.title = this.options.title;
    this.isSearchCount = this.options.isSearchCount;
    this.dataSize = this.options.dataSize;
    this.input = this.options.input;
    this.selectAll = this.options.selectAll;
    this.multipleBtn = this.options.multipleBtn;
    this.setMaxSize = this.options.setMaxSize;
    this.groupMaxSize = this.options.groupMaxSize;
    this.showDeleteBut = this.options.showDeleteBut;
    this.callbackChange = this.options.callbackChange;
    this.callbackDelete = this.options.callbackDelete;
    this.data_tag_row_Num = 0;//data-tag="row"标签的个数
    this.ProvinceIDs = -1;

    if (this.searchValue == null || this.searchValue.length==0) {
        this.load();
    }
    else {
        this.setValue();
    }
    //this.mulitcard_function();
};
///属地化初始事件
Select.prototype.localization_Event = function () {
    var _this = this;
    var _val = _this.getValue();
    $(_this.elem).find('[data-tag="row"]').remove();
    $.each(_val, function (index, item) {
        $.each(item[_this.valueField], function (i, id) {
            var _info = _this.getParentsInfo(id);
            if (_info[0][_this.localization].indexOf("|" + _this.ProvinceIDs + "|") == -1 && _info[0][_this.localization] != "") {
                _val.splice(index, 1);
            }
        });
    });
    _this.searchValue = _val;
    _this.setValue();
};
///生成下拉框（select）html
Select.prototype.selectHtml = function (data) {
    var _this = this;
    var _data = data.data;
    var _selectVal = data.value;
    var _selectAll = false;
    if (_data != null) {
        for (var key in _this.selectAll) {
            if (_data[0][key] == _this.selectAll[key])
                _selectAll = true;
        }
    }
    var _html = [];
    _html.push('<div class="option-select-wrap" data-tap="column">');
    _html.push('<select class="selectpicker" ' + (_selectAll ? 'multiple data-actions-box="' + _this.multipleBtn+ '"' : "") + ' data-live-search="' + (_data == null ? _this.dataSearch : (_data.length > _this.isSearchCount ? true : _this.dataSearch)) + '" data-size="' + _this.dataSize + '" data-max-options="' + _this.setMaxSize + '" data-width="' + _this.width + '" ' + (_this.title == "" ? "" : "title=" + _this.title) + '>');
    if (!_selectAll)
        _html.push('<option value="-1" data-' + _this.parentField + '="-1">---请选择---</option>');
    if (_data != null) {
        var _parentId = null;
        var _index = 2, _i = 2;//_index表示第一个option在数组中索引，_i表示一个分组optgroup占用两个数组索引，用来计算optgroup插入位置。
        $.each(_data, function (index, item) {
            var _val = item[_this.valueField];
            if (_parentId != null && _parentId != item[_this.parentField]) {
                _html.splice(_index, 0, '<optgroup label="' + _this.getParentsInfo(_parentId)[0][_this.textField] + '" data-max-options="' + _this.groupMaxSize + '">');
                _html.push('</optgroup>');
                _index = index + 2 * _i;
                _i++;
            }
            _parentId = item[_this.parentField];
            _html.push('<option data-tokens="' + index + '" value="' + _val + '" data-' + _this.parentField + '="' + item[_this.parentField] + '" ' + ($.inArray(_val, _selectVal) > -1 ? 'selected="selected"' : '') + '>' + item[_this.textField] + '</option>');
        });
        if (_index != 2) {
            _html.splice(_index, 0, '<optgroup label="' + _this.getParentsInfo(_parentId)[0][_this.textField] + '" data-max-options="' + _this.groupMaxSize + '">');
            _html.push('</optgroup>');
        }
    }
    _html.push('</select>');
    _html.push('</div>');
    return _html.join('');
};
///初始事件
Select.prototype.load = function () {
    var _this = this;
    var _dateArr = [];
    var _data = $.grep(_this.data, function (json) {
        if (!_this.isLocalization)
            return json[_this.parentField] == _this.topLevel;
        else
            return json[_this.parentField] == _this.topLevel && (json[_this.localization] == "" || json[_this.localization].indexOf("|" + _this.ProvinceIDs + "|") > -1 || !_this.isLocalization);
    });
    _dateArr.push({ data: _data, value: -1 });
    for (var i = 0; i < _this.columns - 1; i++) {
        _dateArr.push({ data: null, value: -1 });
    }
    $(_this.elem).append(_this.html(_dateArr));
    $(_this.elem + ' [data-tap="column"] .selectpicker').selectpicker('refresh');
    //下拉框事件绑定
    _this.change(_this.elem + ' [data-tap="column"] .selectpicker');
};
///下拉框父级html添加
Select.prototype.html = function (data) {
    var _this = this;
    var _html = [];
    $.each(data, function (index, item) {
        _html.push(_this.selectHtml(item));
    });
    _html.push(_this.addInput());
    return _html.join('');
};
///下拉框选中事件
Select.prototype.change = function (elem) {
    var _this = this;
    $(elem).change(function (data) {
        $(this).parent().parent().nextAll('[data-tap="column"]').remove();
        var _val = _this.transferObject($(this).selectpicker('val'));
        if ($.isEmptyObject(_val))
            return false;
        var _data = [];
        $.each(_val, function (index, item) {
            var _childData = $.grep(_this.data, function (json) {
                return json[_this.parentField] == item && json[_this.parentField] != -1;
            });
            _data = $.merge(_data, _childData);
        });
        if (_data.length == 0) {
            if ($.isFunction(_this.callbackChange)) {
                _this.callbackChange(this, _val);
            }
            return false;
        }
        var _dateArr = {};
        _dateArr = { data: _data, value: -1 };
        $(this).parent().parent().after(_this.selectHtml(_dateArr));
        $(this).parent().parent().next().find('.selectpicker').selectpicker('refresh');

        //下拉框事件绑定
        _this.change($(this).parent().parent().next().find('.selectpicker'));
    });
};
///获取值
Select.prototype.getValue = function () {
    var _this = this;
    var _row = $(_this.elem).find('[data-tap="column"]');
    var _result = [];
    $.each(_row, function (index, item) {
        var _selectVal = _this.transferObject($(item).find('.selectpicker:last').selectpicker('val'));
        var _inputVal = _this.getInputVal($(item).find('input:not(.form-control)'));
        var _object = {};
        if (!$.isEmptyObject(_selectVal)) {
            _object[_this.valueField] = _selectVal;
            if (!$.isEmptyObject(_inputVal))
                _object["Values"] = _inputVal;
            _result.push(_object);
        }
    });
    return _result;
};
///获取每一行中input输入框的值
Select.prototype.getInputVal = function (obj) {
    var _this = this;
    var _value = [];
    $.each(obj, function (index, item) {
        var _val = $(item).val();
        _value.push(_val);
    });
    return _value;
};
///回传设置值
Select.prototype.setValue = function () {
    var _this = this;
    $.each(_this.searchValue, function (index, item) {
        var _arr = _this.getParents(item);
        if (_arr != null)
            $(_this.elem).append(_this.html(_arr));
        if (item['Values'] != undefined) {
            var _row = $(_this.elem + ' [data-tap="row"]');
            $.each(_row, function (index, row) {
                var _input = $(row).find('[type="text"]');
                $.each(_input, function (i, val) {
                    $(val).val(item.Values[i])
                });
            });
        }
    });
    $(_this.elem + ' .selectpicker').selectpicker('refresh');
    //下拉框事件绑定
    _this.change(_this.elem+' .selectpicker');
};
///获取所有父级及自身的数据
Select.prototype.getParents = function (data) {
    var _this = this;
    var _dataArr = [];
    _dataArr.data = [];
    _dataArr.value = [];
    var _value = data[_this.valueField];
    if (_value == undefined) {
        _this.load();
        return null;
    }
    var _parentId, _val;
    $.each(_value, function (index, item) {
        _val = item;
        var i = 0;
        while (_this.topLevel != _parentId) {
            var _arr = $.grep(_this.data, function (json) {
                return json[_this.valueField]==_val;
            });
            _parentId = _arr[0][_this.parentField];
            _arr = $.grep(_this.data, function (json) {
                if (!_this.isLocalization)
                    return json[_this.parentField] == _parentId;
                else
                    return json[_this.parentField] == _parentId && (json[_this.localization] == "" || json[_this.localization].indexOf("|" + _this.ProvinceIDs + "|") > -1 || !_this.isLocalization);
            });
            var _selectVal = [];
            _selectVal[0] = (isNaN(parseInt(_val)) ? _val : parseInt(_val));
            if ($.isEmptyObject(_dataArr[i])) {
                _dataArr[i] = { data: [], value: [] };
                _dataArr[i].data = _arr;
                _dataArr[i].value = _selectVal;
            }
            else {
                var object = $.extend([], _dataArr[i].data, _arr);
                _dataArr[i].value = _dataArr[i].value.concat(_selectVal);
                if (object.length == _dataArr[i].data.length && _dataArr[i].data.length == _arr.length && _dataArr[i].data.length == _arr.length)
                    return true;
                _dataArr[i].data = _dataArr[i].data.concat(_arr);
            }
            _val = [_parentId+''];
            i++;
        }
        _parentId = null;
    });
    return _dataArr.reverse();
};
//是否选择重复发光边框提示
Select.prototype.mulitcard_function = function () {
    $.fn.boxShadow = function () {
        $(this).queue(function (obj) {
            _boxShadow(this);
            obj();
        });
        return this;
    };
    function _boxShadow(obj) {
        var _objCss = $(obj).css('box-shadow');
        if (_objCss == "none")
            $(obj).css('box-shadow', '0 0 2px #ff0000');
        else
            $(obj).css('box-shadow', '');
    };
};
///添加input
Select.prototype.addInput = function () {
    var _this = this;
    if ($.isEmptyObject(_this.input))
        return;
    var _htlm = '';

    $.each(_this.input, function (index, item) {
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
///验证传入参数是否死是对象，是返回，不是转成对象返回
Select.prototype.transferObject = function (value) {
    var _valArr = [];
    if (value == null || value == -1)
        return _valArr;
    if (typeof (value) != "object") {
        _valArr.push(value);
    }
    else {
        _valArr = value;
    }
    return _valArr;
};
///获取指定Value的信息
Select.prototype.getObjectInfo = function (id) {
    var _this = this;
    var _info = $.grep(_this.data, function (json) {
        return $.inArray(json[_this.valueField] + '', id) > -1;
    });
    return _info;
};