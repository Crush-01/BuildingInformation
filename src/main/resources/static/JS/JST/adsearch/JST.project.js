function Project(option) {
    var defaults = {
        elem: '',//外部容器
        platformData: null,
        typeData: null,
        categoryData: null,
        provinceIDs: -1,
        searchValue: []
    };
    this.options = $.extend(defaults, option);
    this.elem = this.options.elem;
    this.platformData = this.options.platformData;
    this.typeData = this.options.typeData;
    this.categoryData = this.options.categoryData;
    this.provinceIDs = this.options.provinceIDs;
    this.searchValue = this.options.searchValue;

    this.select = null;
    this.load();
};
Project.prototype.load = function () {
    var _this = this;
    var _value = [];
    if (_this.searchValue.length != 0)
        _value.push({ CategoryID: [_this.searchValue[0].PlatformID] });
    _this.select = new Select({
        elem: _this.elem,
        data: _this.platformData,
        parentField: 'ParentID',
        valueField: 'CategoryID',
        textField: 'CategoryName',
        width: '303px',
        title:'全国地方政府网站',
        isLocalization: false,
        columns: 1,
        searchValue: _value,
        ProvinceIDs: _this.provinceIDs,
        callbackChange: function (obj, value) { _this.change(obj, value) }
    });
    $(_this.elem).append(_this.typeHtml(['-1']));
    if (_this.searchValue.length != 0) {
        $(_this.elem + ' [data-tap="column"]:first .selectpicker:last').trigger('change');
        var _val = [_this.searchValue[0].TypeID, _this.searchValue[0].CategoryID];
        var _column = $(_this.elem + ' [data-tap="column"]:not(:first)');
        $.each(_column, function (index, item) {
            $(item).find('.selectpicker:first').selectpicker('val', _val[index]);
        });
    }
    $(_this.elem + ' [data-tap="column"]:first .selectpicker:last').selectpicker('val','100');
    $(_this.elem + ' [data-tap="column"]:first .selectpicker:last').trigger('change');
};
Project.prototype.getValue = function () {
    var _this = this;
    var _column = $(_this.elem + ' [data-tap="column"]');
    var d = {};
    d.PlatformID = -1;
    d.TypeID = -1;
    d.CategoryID = -1;
    $.each(_column, function (index, item) {
        var _val = $(item).find('.selectpicker:first').selectpicker('val');
        if (index == 0)
            d.PlatformID = _val;
        if (index == 1)
            d.TypeID = _val;
        if (index == 2)
            d.CategoryID = _val;
    });
    return d;
};
Project.prototype.getText = function () {
    var _this = this;
    var _val = _this.getValue();
    var d = {};
    var _platform = _this.getObjectInfo(_this.platformData, _val.PlatformID);
    var _ptInfo = _this.getObjectInfo(_this.typeData, _val.TypeID);
    var _category = _this.getObjectInfo(_this.categoryData, _val.CategoryID);
    d.PlatformName = _platform == undefined ? "" : _platform.CategoryName;
    d.TypeName = _ptInfo == undefined ? "" : _ptInfo.CategoryName;
    d.CategoryName = _category == undefined ? "" : _category.CategoryName;
    return d;
};
Project.prototype.change = function (obj, value) {
    var _this = this;
    var _html = [];    
    _html.push(_this.typeHtml(value));
    if (value == 101) {
        _html.push(_this.categoryHtml(value));
    }
    $(_this.elem).append(_html.join(''));
    $(_this.elem + ' .selectpicker').selectpicker('refresh');
};
Project.prototype.typeHtml = function (value) {
    var _this = this;
    var _html = [];
    var _typedata = $.grep(_this.typeData, function (json) {
        return $.inArray(json['ParentID'] + '', value) > -1;
    });
    _this.select.title = "业绩类型";
    _this.select.width = "150px";
    _html.push(_this.select.selectHtml({ data: _typedata, value: -1 }));
    return _html.join('');
};
Project.prototype.categoryHtml = function (value) {
    var _this = this;
    var _html = [];
    var _categorydata = $.grep(_this.categoryData, function (json) {
        return $.inArray(json['ParentID'] + '', value) > -1;
    });
    _this.select.title = "项目类型";
    _this.select.width = "150px";
    _html.push(_this.select.selectHtml({ data: _categorydata, value: -1 }));
    return _html.join('');
}
Project.prototype.setValue = function () {
};
Project.prototype.conditionEmpty = function () {
    var _this = this;
    $(_this.elem).html('');
    _this.select.title = "全国地方政府网站";
    _this.select.width = "303px";
    _this.select.data_tag_row_Num = 0;
    _this.select.load();
    $(_this.elem).append(_this.typeHtml(['-1']));
    $(_this.elem + ' .selectpicker').selectpicker('refresh');
};
Project.prototype.getObjectInfo = function (data, val) {
    var _data = $.grep(data, function (json) {
        return json['CategoryID'] == val;
    });
    return _data[0];
};
///清空条件√
Technique.prototype.conditionEmpty = function () {
    var _this = this;
    $('[data-empty="data-tender"]').click(function () {
        $("#tender_province").val(null).trigger("change");
        $('#txt_search_tender_minmoney').val('');
        $('#txt_search_time').val('');
        $('#txt_search_tender_projectname').val('');
        $('#txt_company_num').val('');
    });
};