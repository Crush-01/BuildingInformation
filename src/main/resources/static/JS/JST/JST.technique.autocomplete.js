function TechniqueAuto(option) {
    var defaults = {
        containerId: "zizhi-list-search", //容器id值
        inputId: "search-input-hh",//输入框id
        maxRowNumber: 4,//允许添加资质类别查询的最大数量 以行为单位
        techniques: null, //资质类别数据(包含部分资质数据)
        techniquesAutoAll: null,//资质联想数据
        techniquesAll: null,//资质类别数据(包含所有的资质数据)
        logicalField: [],//特殊逻辑判断字段
        provinceId: -1,
        renderLength: [1, 50],
        cpLock: false,
        currentSelection: -1,//当前选择项 用于联想框上下移动
        callback: null,
        scrollTop: 0,
        object: null//下拉联想单击调用的对象
    };
    this.options = $.extend(defaults, option);
    this.containerId = this.options.containerId;
    this.inputId = this.options.inputId;
    this.maxRowNumber = this.options.maxRowNumber;
    this.provinceId = this.options.provinceId;
    this.techniquesAutoAll = this.options.techniquesAutoAll;
    this.techniquesAll = this.options.techniquesAll;
    this.renderLength = this.options.renderLength;
    this.currentSelection = this.options.currentSelection;
    this.scrollTop = this.options.scrollTop;
    this.logicalField = this.options.logicalField;
    this.object = this.options.object;
    this.rowIndex = 100;
    this.selectIndex = 100;//下拉框索引号
    var _this = this;
    this.isAuto = false;//资质联想使用埋点
    this.isEdge = navigator.userAgent.toLowerCase().indexOf("edge") > -1;
    if (_this.provinceId == -1) {
        this.techniques = $.grep(this.techniquesAutoAll, function (json) {
            return json.ProvinceIDs == "";
        });
    } else {
        this.techniques = $.grep(this.techniquesAutoAll, function (json) {
            return json.ProvinceIDs == "" || json.ProvinceIDs.indexOf("|" + _this.provinceId + "|") > -1;
        });
    }
    if (this.techniques.length < 1) {
        this.hidden();
        return;
    }
    this.bind_event();
}
//属地化资质显示
TechniqueAuto.prototype.loadTechniqueHTML = function (provinceId) {
    var _this = this;
    this.provinceId = provinceId;
    var techniqueArray = $.grep(_this.techniquesAutoAll, function (json) {
        return json.ProvinceIDs == "" || json.ProvinceIDs.indexOf("|" + provinceId + "|") > -1;
    });
    if (techniqueArray.length < 1) {
        _this.hidden();
        return;
    }
    var object = $.extend([], _this.techniques, techniqueArray);
    if (object.length == _this.techniques.length && object.length == techniqueArray.length && techniqueArray.length == _this.techniques.length) {
        return false;
    }
    _this.techniques = techniqueArray;
}
//加载下拉列表
TechniqueAuto.prototype.loadHTML = function (keyword) {
    var _this = this;
    var _data = $.grep(this.techniques, function (json, index) {
        return json.CategoryName.indexOf(keyword) > -1;
    });
    _this.remove();
    _this.currentSelection = -1;
    _this.scrollTop = 0;

    if ($("#div_condition_technique").children("[data_techniquer_row]").length < _this.maxRowNumber) {
        $('#' + this.containerId).append(_this.drop_down_html(_data, keyword));
    }
    _this.bind_drop_down();
    $("#search-result-hh ul li").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });
}
//下拉列表
TechniqueAuto.prototype.drop_down_html = function (data, keyword) {
    var _html = [];
    var _this = this;
    _html.push('<div class="relsearch-cont-w min-wth-480 max-hgt-112" id="search-result-hh">');
    _html.push('    <ul>')
    var _replace = new RegExp(keyword, "g");
    if (data.length > 0) {
        $.each(data, function (index, item) {
            _html.push('        <li data-categoryid="' + item.CategoryID + '" data-parentid="' + item.ParentID + '">' + item.CategoryName.replace(_replace, '<em>' + keyword + '</em>') + '</li>');
        });
    } else {
        _html.push('        <div href="javascript:;" class="search-noresult">&nbsp;&nbsp;暂未匹配到<em>“' + keyword + '”</em>资质，请尝试精简关键词</div>');
    }
    _html.push('    </ul>')
    _html.push('</div>');

    return _html.join('');
}
//输入框输入事件绑定
TechniqueAuto.prototype.bind_event = function () {
    var _this = this;
    $('#' + this.inputId).keyup(function (e) {
        if (e.which != 38 && e.which != 40 && e.which != 13) {
            var _keyword = $.trim($(this).val());
            if (_keyword.length >= _this.renderLength[0]) {
                _this.loadHTML(_keyword);
            }
            if (_keyword.length < 1)
                _this.remove();
        }
    });
    $('#' + this.inputId).focus(function () {
        var _keyword = $.trim($(this).val());
        if (_keyword.length >= _this.renderLength[0]) {
            _this.loadHTML(_keyword);
        }
    });
    $('#' + this.inputId).blur(function () {
        setTimeout(function () {
            _this.remove();
        }, 500);
    });
    $('#' + this.inputId).keydown(function (e) {

        switch (e.which) {
            case 38: // Up arrow
                e.preventDefault();
                if (_this.currentSelection > -1) {
                    _this.currentSelection--;
                    if (_this.currentSelection == -1)
                        $("#search-result-hh ul li").css({ "background-color": "" });
                    _this.setMove();
                    _this.scroll("up");
                }
                break;
            case 40: // Down arrow
                e.preventDefault();
                if (_this.currentSelection < _this.getLength() && _this.currentSelection >= -1) {
                    if (_this.currentSelection != (_this.getLength() - 1)) {
                        _this.currentSelection++;
                        _this.setMove();
                        _this.scroll("down");
                    }
                }

                break;
            case 13: // Enter
                if (_this.currentSelection > -1) {
                    $("#search-result-hh ul li").eq(_this.currentSelection).click();
                    _this.remove();
                }
                break;
        }
    });
}
//联想下拉选项单击事件
TechniqueAuto.prototype.bind_drop_down = function () {
    var _this = this;
    $('#search-result-hh ul li').click(function () {
        var _setValue = [{ "CategoryID": [$(this).attr('data-categoryid')] }];

        _this.object.searchValue = _setValue;
        _this.object.setValue();

        return false;
    });
}
TechniqueAuto.prototype.show = function () {
    $('#' + this.containerId + " #search-result-hh").show();
}
TechniqueAuto.prototype.hide = function () {
    $('#' + this.containerId + " #search-result-hh").hide();
}
TechniqueAuto.prototype.remove = function () {
    this.currentSelection = -1;
    this.scrollTop = 0;
    $('#' + this.containerId + " #search-result-hh").remove();
}
///设置滚动条位置  direction操作方向，up：上下滚动，down 向下滚动
TechniqueAuto.prototype.scroll = function (direction) {
    var _div = $("#search-result-hh ul");

    if (direction == "down") {
        var _a = $('#search-result-hh ul li').eq(this.currentSelection);
        if (this.currentSelection >= 3) {
            _div.scrollTop(this.scrollTop + 35);
            this.scrollTop += 35;
        }

    }
    else if (direction == "up") {
        var _a = $('#search-result-hh ul li').eq(this.currentSelection);
        if (this.currentSelection <= (this.getLength() - 2) && this.currentSelection >= 2) {
            _div.scrollTop(this.scrollTop - 35);
            this.scrollTop -= 35;
        }
    }
};
//获取联想框加载数据数量
TechniqueAuto.prototype.getLength = function () {
    return $('#search-result-hh ul li').length;
};
///设置 up ,down 事件移动后的样式和值
TechniqueAuto.prototype.setMove = function () {
    var _this = this;
    if (_this.currentSelection >= 0 && _this.currentSelection < _this.getLength()) {
        var _a = $("#search-result-hh ul li").css({ "background-color": "" });
        _a.eq(_this.currentSelection).css({ "background-color": "#f9f9f9" });
    }
};
//获取单个下拉框HTML   selected参数表示默认选中项
TechniqueAuto.prototype.getSelect = function (data, selected) {
    var techniqueId = "select-technique-num-" + this.selectIndex;
    var html = "<div class=\"search-select-wrap\" data-mark='technique'>";
    html += "<select id=\"" + techniqueId + "\">";
    html += "       <option data-categoryid=\"-1\" data-parentid='-1' data-compareid='-1' value='-1'>---请选择---</option>";
    if (data != null && data.length > 0) {
        $.each(data, function (i, item) {
            var isSelected = false;
            if (selected != undefined && selected != null) {
                if (item.CategoryID == selected.CategoryID && item.CompareID == selected.CompareID)
                    isSelected = true;
            }
            html += "<option  value=\"" + item.CategoryID + "\" data-categoryid=\"" + item.CategoryID + "\" data-parentid=\"" + item.ParentID + "\" data-compareid=\""
                + item.CompareID + "\" " + (isSelected ? "selected='selected'" : "") + "> " + item.CategoryName + "</option > ";
        });
    }
    html += "</select>";
    html += "</div>";
    this.selectIndex++;
    return html;
}
//获取每一行资质下拉框的html
TechniqueAuto.prototype.getRowHtml = function (select) {
    var condition_row = "condition_techniquer_row" + this.rowIndex;
    var html = "<div class=\"condition-cont\" data_techniquer_row='" + condition_row + "'>";
    html += "<div class=\"search-select-box\">";

    for (var i = 0; i < select.length; i++) {
        html += select[i];
    }

    if ($("#div_condition_technique").children("[data_techniquer_row]").length >= 1) {
        html += "<div class=\"search-select-wrap\" data-button=\"btn-delete-technique\">";
        html += "<a href=\"javascript:;\" class=\"delete-condition\"  date-parent='" + condition_row + "'>删除</a>";
        html += "</div>";
    }

    html += "</div>";
    html += "</div>";

    this.rowIndex++;
    return html;
}
//下拉框渲染
TechniqueAuto.prototype.rendering = function () {
    var _this = this;

    $('select').selectlist({
        onChange: function (data) {
            _this.onchange(this, data);

        }
    });

    if ($("#div_condition_technique").children("[data_techniquer_row]").length >= _this.maxRowNumber) {
        $("#btn_add_technique").hide();
    }
}
//下拉框change事件
TechniqueAuto.prototype.onchange = function (obj, data) {
    var _this = this;
    $("#" + $(obj.element).attr("id")).parent().nextAll(".search-select-wrap").not("[data-button='btn-delete-technique']").remove();
    var _categoryid = $("#" + $(obj.element).attr("id")).parent().parent().find("[data-mark=\"technique\"]:last").find("input[type='hidden']").attr("data-categoryid");
    if (data.categoryid == -1) {
        return false;
    }
    var childrenArr = $.grep(this.techniquesAll, function (json) {
        return json.ParentID == data.categoryid;
    });
    if (childrenArr && childrenArr.length > 0) {
        $("#" + $(obj.element).attr("id")).parent().after(this.getSelect(childrenArr));
        this.rendering();
    } else {
        if (this.isExits(data.categoryid, data.compareid, data.parentid)) {
            $.layer.notity("当前条件已选择，请更换选择条件");
            $("#" + $(obj.element).attr("id")).find("li:eq(0)").click();
            return false;
        }
    }
    if (_categoryid != -1)
        $('#' + _this.inputId).val("");
}
///设置资质查询 and Or 的显示，以及初始化值
TechniqueAuto.prototype.set_and_or = function () {
    if ($('#div_condition_technique [data_techniquer_row]').length > 1) {
        $('#div_search_andor').parent().show();
        if (this.andOr == 1) {
            $('#div_search_andor').addClass('virtual-checkbox').attr('data-val', 1);
        }
        return;
    }
    $('#div_search_andor').attr('data-val', 0);
    $('#div_search_andor').parent().hide();
}
//判断是否重复选择  
TechniqueAuto.prototype.isExits = function (categoryid, compareid, parentid) {
    var techRow = $("#div_condition_technique [data_techniquer_row]");
    var _count = [];//存储选择的父元素categoryid
    $.each(techRow, function (index, item) {
        var parent = $(item).find("[data-mark= 'technique']").eq(-2).find("input[type ='hidden']");
        if ($(parent).length > 0) {
            if ($(parent).attr("data-categoryid") != undefined && $(parent).attr("data-categoryid") == parentid)
                _count++;
        }
    });
    return categoryid == -1 ? _count > 0 : _count > 1;
};
//获取选择的所有最后一个资质
TechniqueAuto.prototype.getValue = function () {
    var _techniquelast = $("#div_condition_technique [data_techniquer_row]:last").find("[data-mark='technique']:last");
    var _categoryid = _techniquelast.find("input[type='hidden']").attr("data-categoryid");
    var _parentid = _techniquelast.find("input[type='hidden']").attr("data-parentid");

    var categories = [];

    if (_categoryid && _categoryid > -1) {
        categories.push({ CategoryID: _categoryid, ParentID: _parentid });
    }
    return categories;
}
//控制器回传后，加载默认类别数据  
TechniqueAuto.prototype.setValue = function (data) {
    var select = []
    for (var i = 0; i < data.length; i++) {
        var value = {};
        var parentId = data[i].ParentID;
        var parentArray = [];

        var _category = $.grep(this.techniquesAll, function (json) {
            return json.ParentID == data[i].CategoryID;
        });
        var _data = {};
        _data.CategoryID = -1;
        _data.CompareID = 0;
        _data.ParentID = -1;
        _data.Brothers = _category;
        parentArray.push(_data);

        while (parentId != -1) {
            var parent = this.BuildData(parentId);
            parentArray.push(parent);
            parentId = parent.ParentID;
        };

        value.Technique = this.BuildData(data[i].CategoryID, data[i].CompareID);
        value.Fathers = parentArray;
        select.push(value);
    }

    for (var i = 0; i < select.length; i++) {

        var comboboxArray = [];
        for (j = select[i].Fathers.length - 1; j >= 0; j--) {
            if (j == 0) {
                comboboxArray.push(this.getSelect(select[i].Technique.Brothers, select[i].Technique));
            }
            comboboxArray.push(this.getSelect(select[i].Fathers[j].Brothers, select[i].Fathers[j]));
        }
        if (this.getValue().length == 0) {
            $("#div_condition_technique [data_techniquer_row]:last").remove();
        }
        $("#div_condition_technique").append(this.getRowHtml(comboboxArray));
    }
    this.rendering();
    this.set_and_or();

};
//获取父级信息
TechniqueAuto.prototype.BuildData = function (categoryID, compareID) {
    var _this = this;
    var data = {};
    var category = [];
    if (compareID == undefined) {
        category = $.grep(this.techniquesAll, function (json) {
            return json.CategoryID == categoryID;
        });
    }
    else {
        category = $.grep(this.techniquesAll, function (json) {
            return json.CategoryID == categoryID && json.CompareID == compareID;
        });
    }
    data.CategoryID = category[0].CategoryID;
    data.CompareID = category[0].CompareID;
    data.ParentID = category[0].ParentID;
    data.Brothers = $.grep(this.techniquesAll, function (json) {
        return json.ParentID == data.ParentID && (json.ProvinceIDs == "" || json.ProvinceIDs.indexOf("|" + _this.provinceId + "|") > -1);
    });
    return data;
}