function Area(option) {
    var defaults = {
        elem: '',//外部容器
        butid: '',//新增按钮
        provinceData: null,
        cityData: null,
        areaData: null,
        beiAnData: null,
        dataSearch: false,
        isSearchCount: 8,
        rowNum: 1,
        columns: null,//初始下拉框数
        dataSize: 7,
        width: '150px',
        select: null
    };
    this.options = $.extend(defaults, option);
    this.elem = this.options.elem;
    this.butid = this.options.butid;
    this.provinceData = this.options.provinceData;
    this.cityData = this.options.cityData;
    this.areaData = this.options.areaData;
    this.beiAnData = this.options.beiAnData;
    this.dataSearch = this.options.dataSearch;
    this.isSearchCount = this.options.isSearchCount;
    this.rowNum = this.options.rowNum;
    this.columns = this.options.columns;
    this.dataSize = this.options.dataSize;
    this.width = this.options.width;
    this.select = this.options.select;
    this.condition = [];

    this.load();
    this.butClick();
    this.empty();
};

Area.prototype.load = function () {
    var _this = this;
    var _dataArr = [];
    _dataArr.push({ data: _this.provinceData, value: -1, title: "企业所在省" });
    if (_this.columns == null) {
        _dataArr.push({ data: null, value: -1, title: "备案地" });
    }
    else {
        for (var i = 0; i < _this.columns - 1; i++) {
            _dateArr.push({ data: null, value: -1, title: '' });
        }
    }
    $(_this.elem + ' input[type="button"]').prev().before(_this.html(_dataArr, "province"));
    $(_this.elem + ' .selectpicker').selectpicker('refresh');
    _this.change(_this.elem + ' .selectpicker:first');
};
Area.prototype.html = function (data, flag) {
    var _this = this;
    var _html = [];
    if (flag == 'province') {
        $.each(data, function (index, item) {
            _html.push(_this.provinceSelectHtml(item));
        });
    } else if (flag == 'city') {
        $.each(data, function (index, item) {
            _html.push(_this.citySelectHtml(item));
        });
    } else if (flag == 'beiAn') {
        $.each(data, function (index, item) {
            _html.push(_this.beiAnSelectHtml(item));
        });
    }
    return _html.join('');
};
///获取省下拉框
Area.prototype.provinceSelectHtml = function (data) {
    var _this = this;
    var _data = data.data;
    var _value = data.value;
    var _title = data.title;
    var _html = [];
    _html.push('<div class="option-select-wrap">');
    _html.push('<select id="province"  class="selectpicker" title="' + _title + '" data-flag="province" data-live-search="' + (_data == null ? _this.dataSearch : (_data.length > _this.isSearchCount ? true : _this.dataSearch)) + '" data-size="' + _this.dataSize + '" data-width="' + _this.width + '">');
    _html.push('<option value="-1" data-id="-1">不限</option>');
    if (_data != null) {
        $.each(_data, function (index, item) {
            var _val = item['ProvinceID'];
            _html.push('<option value="' + _val + '" ' + (_val == _value ? 'selected="selected"' : '') + '>' + item['ShortName'] + '</option>');
        });
    }
    _html.push('</select>');
    _html.push('</div>');
    return _html.join('');
};
//市
Area.prototype.citySelectHtml = function (data) {
    var _this = this;
    var _data = data.data;
    var _value = data.value;
    var _title = data.title;
    var _html = [];
    _html.push('<div class="option-select-wrap">');
    _html.push('<select id="city" class="selectpicker" title="' + _title + '" data-flag="city" data-live-search="' + (_data == null ? _this.dataSearch : (_data.length > _this.isSearchCount ? true : _this.dataSearch)) + '" data-size="' + _this.dataSize + '" data-width="' + _this.width + '">');
    _html.push('<option value="-1" data-id="-1">不限</option>');
    if (_data != null) {
        $.each(_data, function (index, item) {
            var _val = item['CityID'];
            _html.push('<option value="' + _val + '" ' + (_val == _value ? 'selected="selected"' : '') + '>' + item['ShortName'] + '</option>');
        });
    }
    _html.push('</select>');
    _html.push('</div>');
    return _html.join('');
};
///获取区/县下拉框
Area.prototype.areaSelectHtml = function (data) {
    var _this = this;
    var _data = data.data;
    var _value = data.value;
    var _title = data.title;
    var _html = [];
    _html.push('<div class="option-select-wrap">');
    _html.push('<select id="area"  class="selectpicker" title="' + _title + '" data-flag="area" data-live-search="' + (_data == null ? _this.dataSearch : (_data.length > _this.isSearchCount ? true : _this.dataSearch)) + '" data-size="' + _this.dataSize + '" data-width="' + _this.width + '">');
    _html.push('<option value="-1" data-id="-1">不限</option>');
    if (_data != null) {
        $.each(_data, function (index, item) {
            var _val = item['AreaID'];
            _html.push('<option value="' + _val + '" ' + (_val == _value ? 'selected="selected"' : '') + '>' + item['ShortName'] + '</option>');
        });
    }
    _html.push('</select>');
    _html.push('</div>');
    return _html.join('');
};
Area.prototype.beiAnSelectHtml = function (data) {
    var _this = this;
    var _data = data.data;
    var _value = data.value;
    var _title = data.title;
    var _html = [];
    _html.push('<div class="option-select-wrap">');
    _html.push('<select id="beian" class="selectpicker" title="' + _title + '" data-flag="beian" data-live-search="' + (_data == null ? _this.dataSearch : (_data.length > _this.isSearchCount ? true : _this.dataSearch)) + '" data-size="' + _this.dataSize + '" data-width="' + _this.width + '">');
    if (_data != null) {
        $.each(_data, function (index, item) {
            var _val = item['CompareID'];
            _html.push('<option value="' + _val + '" ' + (_val == _value ? 'selected="selected"' : '') + '>' + item['CategoryName'] + '</option>');
        });
    }
    _html.push('</select>');
    _html.push('</div>');
    return _html.join('');
};
Area.prototype.change = function (elem) {
    var _this = this;
    $(elem).change(function () {
        var _flag = $(this).attr('data-flag');
        var _thisValue = parseInt($(this).selectpicker('val'));
        var _thisParents = $(this).parents('.option-select-wrap');
        var _provinceVal = parseInt($(_this.elem + ' .selectpicker:first').selectpicker('val'));
        _thisParents.nextAll('.option-select-wrap').remove();
        var _beianVal = $('[data-flag="beian"]').selectpicker('val');
        var _dataArr = {};
        var _html = '';
        if (_flag == "province") {
            if (_beianVal != '1') {
                var _beianData = $.grep(_this.beiAnData, function (json) {
                    return json.ProvinceID == _thisValue;
                });
                if (_thisValue != '-1') {
                    _dataArr.data = _beianData;
                    _dataArr.value = 0;
                    _dataArr.title = "备案地";
                    _html += _this.beiAnSelectHtml(_dataArr);
                }

                technique.ProvinceIDs = _thisValue;
                technique.localization_Event();
                techniqueAuto.loadTechniqueHTML(_thisValue);
                people.ProvinceIDs = _thisValue;
                people.localization_Event();
                mulitcard.ProvinceIDs = _thisValue;
                mulitcard.localization_Event();
            }
            var _cityData = $.grep(_this.cityData, function (json) {
                return json.ProvinceID == _thisValue;
            });
            if (_cityData.length > 0) {
                _dataArr = {};
                _dataArr.data = _cityData;
                _dataArr.value = -1;
                _dataArr.title = "企业所在市";
                _html += _this.citySelectHtml(_dataArr);
            }

        } else if (_flag == "city") {
            var _areaData = $.grep(_this.areaData, function (json) {
                return json.CityID == _thisValue;
            });
            if (_areaData.length > 0) {
                _dataArr = {};
                _dataArr.data = _areaData;
                _dataArr.value = -1;
                _dataArr.title = "企业所在区/县";
                _html += _this.areaSelectHtml(_dataArr);
            }
        } else if (_flag == "beian") {
            if (_thisValue == '0') {
                var _cityData = $.grep(_this.cityData, function (json) {
                    return json.ProvinceID == _provinceVal;
                });
                if (_cityData.length > 0) {
                    _dataArr.data = _cityData;
                    _dataArr.value = -1;
                    _dataArr.title = "企业所在市";
                    _html += _this.citySelectHtml(_dataArr);
                }
            } else if (_thisValue == '1') {
                var _provinceData = $.grep(_this.provinceData, function (json) {
                    return json.ProvinceID != _provinceVal;
                });
                _dataArr.data = _provinceData;
                _dataArr.value = -1;
                _dataArr.title = "企业所在省";
                _html += _this.provinceSelectHtml(_dataArr);
                _dataArr = {};
                _dataArr.data = null;
                _dataArr.value = -1;
                _dataArr.title = "企业所在市";
                _html += _this.provinceSelectHtml(_dataArr);
                _dataArr.title = "企业所在区/县";
                _html += _this.provinceSelectHtml(_dataArr);
            } else if (_thisValue == '2') {
            }
        }
        _thisParents.after(_html);
        var _row = $('[data-region]').find('.nconditions-wrap');
        if (_row.length > 0) {
            _row.remove();
            useingKey.Region = [];
            var _result = _this.getErgodicCache();
            $('#scrollTop .newcolor-red').text(_result.size);
            var cids = '';
            _result.forEach(function (value, key, map) {
                cids += value + ',';
            });
            localStorage.setItem("companyCIDs", cids.substring(0, cids.length - 1));
        }
        $(_this.elem + ' .selectpicker').selectpicker('refresh');
        _this.change(_thisParents.nextAll('.option-select-wrap').find('.selectpicker'));
        _this.setCache();
    });
};
Area.prototype.getErgodicCache = function () {
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
Area.prototype.getCompanyIDs = function (url, data, key) {
    var _this = this;
    var _arr = $.data(myObject, key);
    if (!$.isEmptyObject(_arr)) {
        _this.addHtml(data, key);
        _this.setCache();
        return false;
    }
    cbi360.postJSON(url, data, function (res) {
        _this.addHtml(data, key);
        jQuery.data(myObject, key, res.Result);
        _this.setCache();       
    });
};
Area.prototype.getSingleSet = function (cacheKey) {
    var _this = this;
    var _radio = 0;
    var _arr = new Set();
    $.each(cacheKey, function (j, key) {
        var _beiAnVal = $('[data-flag="beian"]').selectpicker('val');
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
        if (_radio == 1 || key.indexOf('regionbeian') > -1) {
            _arr = _this.unionArr(_arr, new Set($.data(myObject, key)));
        } else {
            _arr = _this.intersectionArr(_arr, new Set($.data(myObject, key)));
        }

    });
    return _arr;
};
Area.prototype.intersectionArr = function (a, b) {
    return new Set([...a].filter(x => b.has(x)));
};
Area.prototype.unionArr = function (a, b) {
    return new Set(Array.from(new Set([...a, ...b])));
};
Area.prototype.butClick = function () {
    var _this = this;
    $(_this.butid).click(function () {
        if (_this.isComplete() || !$(_this.elem).submitValidate())
            return false;
        if ($('[data-region] .nconditions-wrap').length >= _this.rowNum) {
            $.layer.notity('最多可以增加' + _this.rowNum + '个条件');
            return false;
        }
        var d = _this.getValue();
        var _key = $.md5(JSON.stringify(d));
        _this.getCompanyIDs("/companyadsearch/areasearch/", d, _key);
    });
};
Area.prototype.getValue = function () {
    var _this = this;
    var _beianVal = $('[data-flag="beian"]').selectpicker('val');
    var _regCapital = $('#reg_capital').val();
    var _row = $(_this.elem + ' .option-select-wrap');
    var _val = '';
    $.each(_row, function (index, item) {
        _val += $(item).find('.selectpicker').selectpicker('val') + "_";
    });
    var _arr = _val.substring(0, _val.length - 1).split('_');
    var d = {};
    d.CRegFund = _regCapital == "" ? 0 : _regCapital;
    var beiAn = {};
    d.ProvinceID = -1;
    d.CityID = -1;
    d.AreaID = -1;
    beiAn.CompareID = -1;
    beiAn.ProvinceID = -1;
    d.BeiAnSearch = beiAn;
    if (_beianVal == '0') {
        if (_arr.length == 2 || _arr.length == 3) {
            d.ProvinceID = _arr[0];
            d.CityID = -1;
            d.AreaID = -1;
            beiAn.CompareID = _arr[1];
            beiAn.ProvinceID = _arr[0];
            d.BeiAnSearch = beiAn;
        } else if (_arr.length == 4) {
            d.ProvinceID = _arr[0];
            d.CityID = _arr[2];
            d.AreaID = _arr[3];
            beiAn.CompareID = _arr[1];
            d.BeiAnSearch = beiAn;
        }
    } else if (_beianVal == '1') {
        if (_arr.length == 5) {
            d.ProvinceID = _arr[2];
            d.CityID = _arr[3];
            d.AreaID = _arr[4];
            beiAn.CompareID = _arr[1];
            beiAn.ProvinceID = _arr[0];
            d.BeiAnSearch = beiAn;
        } else if (_arr.length == 3 || _arr.length == 4) {
            d.ProvinceID = _arr[2];
            d.CityID = -1;
            d.AreaID = -1;
            beiAn.CompareID = _arr[1];
            beiAn.ProvinceID = _arr[0];
            d.BeiAnSearch = beiAn;
        }
    } else if (_beianVal == '2') {
        d.ProvinceID = _arr[0];
        d.CityID = -1;
        d.AreaID = -1;
        beiAn.CompareID = _arr[1];
        beiAn.ProvinceID = _arr[0];
        d.BeiAnSearch = beiAn;
    }
    
    return d;
};
Area.prototype.conditionClose = function () {
    var _this = this;
    $('[data-region]').find('.nconditions-wrap a:last').click(function () {
        var _index = $('[data-region]').find('.nconditions-wrap a').index(this);
        _this.condition.splice(_index, 1);
        $(this).parents('.nconditions-wrap').remove();
        useingKey['Region'].splice(_index, 1);
        var _result = _this.getErgodicCache();
        $('#scrollTop .newcolor-red').text(_result.size);
        var cids = '';
        _result.forEach(function (value, key, map) {
            cids += value + ',';
        });
        localStorage.setItem("companyCIDs", cids.substring(0, cids.length - 1));
    });
};
Area.prototype.empty = function () {
    var _this = this;
    $('[data-area="data-region"]').click(function () {
        $(_this.elem + ' .option-select-wrap').remove();
        $('[' + $(this).attr('data-area') + ']').html('');
        $('#reg_capital').val('');
        _this.condition = [];
        useingKey['Region'] = [];
        _this.load();
        var _result = _this.getErgodicCache();
        $('#scrollTop .newcolor-red').text(_result.size);
        var cids = '';
        _result.forEach(function (value, key, map) {
            cids += value + ',';
        });
        localStorage.setItem("companyCIDs", cids.substring(0, cids.length - 1));
    });
};
Area.prototype.isComplete = function () {
    var _this = this;
    var _firstVal = $(_this.elem + ' .option-select-wrap:first').find('.selectpicker').selectpicker('val');
    if ((_firstVal == '-1' || _firstVal == "")) {
        $.layer.notity('请选择地区');
        return true;
    }
    return false;
};
Area.prototype.addHtml = function (data, key) {
    var _this = this;
    var _regCapital = $('#reg_capital').val();
    var _text = '<div class="nconditions-wrap clear-fix">';
    _text += '<div class="nconditions fl">';
    _text += '<span>';
    var _row = $(_this.elem + ' .option-select-wrap');
    var _areaText = "";
    $.each(_row, function (index, item) {
        if ($(item).find('.selectpicker').selectpicker('val') != '-1' && $(item).find('.selectpicker').selectpicker('val') != "")
            _areaText += $(item).find('.selectpicker option:selected').text() + '-';
    });
    if (_areaText!="")
        _text += _areaText.substring(0, _areaText.length - 1) +'；' ;
    _text += '注册资金：' + (_regCapital == "" ? '不限' :'≥'+ _regCapital + '万') + '</span>';
    _text += '<a href="javascript:;">×</a>';
    _text += '</div></div>';
    $('[data-region]').append(_text);
    _this.conditionClose();
    _this.condition.push(data);
    useingKey.Region = [];
    useingKey.Region.push(key);
};
Area.prototype.setCache = function () {
    var _this = this;
    var _result = _this.getErgodicCache();
    $('#scrollTop .newcolor-red').text(_result.size);
    var cids = '';
    _result.forEach(function (value, key, map) {
        cids += value + ',';
    });
    localStorage.setItem("companyCIDs", cids.substring(0, cids.length - 1));
};