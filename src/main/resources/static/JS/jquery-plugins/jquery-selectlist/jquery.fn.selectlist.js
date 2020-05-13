/*!
 * select v0.0.1
 * by Liuyuchao
 * Copyright 2015.2
 * Date: Tue Feb 25 2015
 */

; (function ($, window, document) {

    var pluginName = 'selectlist',
        defaults = {
            enable: true,
            zIndex: null,

            maxWidth: 500,
            minWidth:185,

            width: 187,
            height: 35,
            border: null,
            borderRadius: null,
            showMaxHeight: null,
            optionHeight: 34,
            triangleSize: 6,
            triangleColor: '#333',
            topPosition: false,
            speed: 0,
            onChange: function () { }
        };

    function SelectList(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    SelectList.prototype = {

        init: function () {
            var that = this,
                element = this.element;

            that.replaceProtoypeSelect(element);
            that.setSelectEvent(element);
            that.setSelectStyle(element);
        },


        getSelectID: function (element) {
            var $this = $(element),
                selectID = $this.attr('id');

            if (typeof (selectID) !== 'undefined') {
                return selectID;
            } else {
                selectID = '';
                return selectID;
            }
        },


        getSelectName: function (element) {
            var that = this,
                $this = $(element),
                selectName = $this.attr('name');

            if (typeof (selectName) !== 'undefined') {
                return selectName;
            } else {
                return that.getSelectID($this);
            }
        },


        getSelectClassName: function (element) {
            var $this = $(element),
                tempClassNameArray = [],
                classNameArray = [],
                className = $this.attr('class');

            if (typeof (className) !== 'undefined') {
                classNameArray = className.split(' ');
                classNameArray.sort();
                tempClassNameArray = [classNameArray[0]];
                for (var i = 1; i < classNameArray.length; i++) {
                    if (classNameArray[i] !== tempClassNameArray[tempClassNameArray.length - 1]) {
                        tempClassNameArray.push(classNameArray[i]);
                    }
                }
                return tempClassNameArray.join(' ');
            } else {
                className = '';
                return className;
            }
        },


        getSelectedIndex: function (element) {
            var $this = $(element),
                selectedIndex = $this.get(0).selectedIndex || 0;

            return selectedIndex;
        },


        getOptionCount: function (element) {
            var $this = $(element);

            return $this.children().length;
        },


        getOptionText: function (element) {
            var that = this,
                $this = $(element),
                $option = $this.children(),
                optionText = [],
                selectLength = that.getOptionCount($this);

            for (var i = 0; i < selectLength; i++) {
                optionText[i] = $.trim($option.eq(i).text());
            }
            return optionText;
        },


        getSelectedOptionText: function (element) {
            var that = this,
                $this = $(element),
                selectedIndex = that.getSelectedIndex($this),
                optionText = that.getOptionText($this);

            return optionText[selectedIndex];

        },


        getSelectedOptionValue: function (element) {
            var that = this,
                $this = $(element),
                selectedIndex = that.getSelectedIndex($this),
                optionValue = that.getOptionValue($this);

            return optionValue[selectedIndex];
        },

        getSelectedOptionAttr: function (element) {
            var that = this,
                $this = $(element),
                $option = $this.children(),
                optionAttr = [];

            var selectedIndex = that.getSelectedIndex($this);

            var attributes = $option.eq(selectedIndex)[0].attributes;
            for (var i in attributes) {
                if (!isNaN(parseInt(i)) && attributes[i].name.indexOf("data-") >= 0) {

                    optionAttr.push(attributes[i].name + "='" + attributes[i].nodeValue + "'");
                }
            }
            return optionAttr;
        },

        /// 扩展方法 获取 Option下的所有自定义属性（格式如data-），并用于渲染
        getOptionAttr: function (element) {
            var that = this,
                $this = $(element),
                $option = $this.children(),
                optionAttr = [],
                selectLength = that.getOptionCount($this);

            for (var i = 0; i < selectLength; i++) {
                var attributes = $option.eq(i)[0].attributes;
                var attrArr = [];
                for (var j in attributes) {
                    if (!isNaN(parseInt(j)) && attributes[j].name.indexOf("data-") >= 0) {

                        attrArr.push(attributes[j].name + "='" + attributes[j].nodeValue + "'");
                    }
                }
                optionAttr[i] = attrArr;
            }
            return optionAttr;
        },


        getOptionValue: function (element) {
            var that = this,
                $this = $(element),
                $option = $this.children(),
                optionValue = [],
                selectLength = that.getOptionCount($this);

            for (var i = 0; i < selectLength; i++) {
                optionValue[i] = $option.eq(i).val();
            }
            return optionValue;
        },


        renderSelect: function (element) {
            var that = this,
                $this = $(element),
                selectID = that.getSelectID($this),
                selectName = that.getSelectName($this),
                selectClassName = that.getSelectClassName($this),
                selectOptionText = that.getOptionText($this),
                selectedOptionText = that.getSelectedOptionText($this),
                selectOptionValue = that.getOptionValue($this),
                selectedIndex = that.getSelectedIndex($this),
                selectedValue = that.getSelectedOptionValue($this),
                selectLength = that.getOptionCount($this),
                selectOptionAttr = that.getOptionAttr($this),
                selectedOptionAttr = that.getSelectedOptionAttr($this);
            selectHTML = '<div id="' + selectID + '" class="select-wrapper ' + selectClassName + '"><input type="hidden" name="' + selectName + '" value="' + selectedValue + '"  ' + selectedOptionAttr.join(" ") + '  /><i class="icon select-down"></i><input type="button" class="select-button" value="' + selectedOptionText + '" /><div class="select-list"><ul>',
                selectListHTML = '';


            for (var i = 0; i < selectLength; i++) {

                if (selectOptionAttr[i].length < 1)
                    continue;

                var cboHTML = "<li" + " " + selectOptionAttr[i].join(" ");

                if (i == selectedIndex) {
                    cboHTML += (" " + "class='selected'");
                }
                cboHTML += ">";
                cboHTML += selectOptionText[i] + "</li>";
                selectListHTML = selectListHTML + cboHTML;


                //以下是原生的
                //if (i !== selectedIndex) {
                //    selectListHTML = selectListHTML + '<li data-value="' + selectOptionValue[i] + '">' + selectOptionText[i] + '</li>';
                //} else {
                //    selectListHTML = selectListHTML + '<li data-value="' + selectOptionValue[i] + '" class="selected">' + selectOptionText[i] + '</li>';
                //}
            }
            selectHTML = selectHTML + selectListHTML + '</ul></div></div>';

            return selectHTML;
        },


        replaceProtoypeSelect: function (element) {
            var that = this,
                $this = $(element),
                selectHTML = that.renderSelect($this);

            $this.replaceWith(selectHTML);
        },


        setSelectDisabled: function (element) {
            var that = this,
                $this = $(element),
                selectID = '#' + that.getSelectID($this);

            $(selectID).children('i').addClass('disabled').end()
                .children('.select-button').attr('disabled', 'disabled');
        },


        setSelectEnabled: function (element) {
            var that = this,
                $this = $(element),
                selectID = '#' + that.getSelectID($this);

            $(selectID).children('i').removeClass('disabled').end()
                .children('.select-button').removeAttr('disabled');
        },


        setSelectStyle: function (element) {
            var that = this,
                $this = $(element),
                selectID = '#' + that.getSelectID($this),
                selectLength = that.getOptionCount($this);

            $(selectID).css({
                'z-index': that.setStyleProperty(that.settings.zIndex),
                width: that.setStyleProperty(that.settings.width) - 2 + 'px',
                height: that.setStyleProperty(that.settings.height) + 'px'
            });


            $(selectID).children('.select-down').css({
                top: that.setStyleProperty((that.settings.height - that.settings.triangleSize) / 2) + 'px',
                'border-width': that.setStyleProperty(that.settings.triangleSize) + 'px',
                'border-color': that.setStyleProperty(that.settings.triangleColor) + ' transparent transparent transparent'
            });


            $(selectID).children('.select-button').css({
                width: function () {
                    if (!that.settings.width) {
                        return;
                    } else {
                        return that.settings.width - 2 + 'px';
                    }
                },
                height: that.setStyleProperty(that.settings.height) + 'px',
                border: that.setStyleProperty(that.settings.border),
                'border-radius': that.setStyleProperty(that.settings.borderRadius) + 'px'
            });


            $(selectID).children('.select-list').css({
                //width: function () {
                //    if (!that.settings.width) {
                //        return;
                //    } else {
                //        return that.settings.width - 2 + 'px';
                //    }
                //},
                'top': function (index, value) {
                    if (!that.settings.height) {
                        return;
                    } else {
                        if (!that.settings.topPosition) {
                            return that.settings.height + 1 + 'px';
                        } else {
                            if (!that.settings.optionHeight) {

                            } else {
                                return -that.settings.optionHeight * selectLength - 3 + 'px';
                            }
                        }
                    }
                },
                'max-height': that.setStyleProperty(that.settings.showMaxHeight) + 'px'
            });
            $(selectID + ' div').css({
                'max-width': that.setStyleProperty(that.settings.maxWidth) + 'px',
                'min-width': that.setStyleProperty(that.settings.minWidth) + 'px',                
                'max-height': '240px',                
                'overflow-x': 'hidden',
                'overflow-y': 'auto'
                //'max-height': that.setStyleProperty(that.settings.showMaxHeight) + 'px',
               // 'width': 'auto'
            });

            $(selectID + ' ul').css({              
               
               // 'min-width': that.setStyleProperty(that.settings.minWidth) + 'px',
                //'max-width': that.setStyleProperty(that.settings.maxWidth) + 'px',
                'width': '100%',
                'display': 'block'
            });


            $(selectID + ' li').css({
                height: that.setStyleProperty(that.settings.optionHeight) + 'px',
                'line-height': that.setStyleProperty(that.settings.optionHeight) + 'px',
                'right': '-17px'
            });
        },


        setStyleProperty: function (styleProperty) {
            if (!styleProperty) {
                return;
            } else {
                return styleProperty;
            }
        },


        setSelectEvent: function (element) {
            var that = this,
                $this = $(element),
                showSpeed = that.settings.speed,
                border = that.settings.border,
                selectID = '#' + that.getSelectID($this),
                selectName = that.getSelectName($this),
                selectedIndex = that.getSelectedIndex($this),
                selectLength = that.getOptionCount($this),
                selectBtn = $(selectID + ' input[type="button"]'),
                selectItem = $(selectID + ' li');

            
            if (that.settings.enable) {
                $(selectID)
                    .click(function (event) {
                        event.stopPropagation();
                        $(this).children('.select-list').slideToggle(showSpeed);

                        if (that.settings.border) {
                            $(this).css({ border: border });
                        } else {
                            $(this).addClass('focus');
                        }

                        $(this).find('li').each(function () {
                            if ($(this).text() === selectBtn.val()) {
                                $(this).addClass('selected').siblings().removeClass('selected');
                            }
                        })

                    })
                    .on('focusin', 'input[type="button"]', function () {
                        $('.select-wrapper').children('.select-list').slideUp(showSpeed);
                        if ($('.select-wrapper').hasClass('focus')) {
                            $('.select-wrapper').removeClass('focus');
                        }
                    })
                    .on('keyup', 'input[type="button"]', function (event) {

                        var $selectedItem = $(this).siblings('.select-list').children().children('li.selected');

                        switch (event.keyCode) {
                            //Enter
                            case 13:
                                $(this)
                                    .val($selectedItem.text())
                                    .prev().prev().val($selectedItem.attr('data-value'));
                                if ($.isFunction(that.settings.onChange)) {
                                    that.settings.onChange.call(that);
                                }
                                break;
                            //Esc
                            case 27:
                                $(this).siblings('.select-list').slideUp(showSpeed);
                                break;
                            //Up
                            case 38:
                                event.preventDefault();
                                if (selectedIndex !== 0) {
                                    $selectedItem.removeClass('selected').prev().addClass('selected');
                                    selectedIndex = selectedIndex - 1;
                                } else {
                                    $selectItem.last().addClass('selected').siblings().removeClass('selected');
                                    selectedIndex = selectLength - 1;
                                }
                                $selectedItem = $(this).siblings('.select-list').children().children('li.selected');
                                $(this)
                                    .val($selectedItem.text())
                                    .prev().prev().val($selectedItem.attr('data-value'));
                                break;
                            //Down
                            case 40:
                                event.preventDefault();
                                if (selectedIndex < selectLength - 1) {
                                    $selectedItem.removeClass('selected').next().addClass('selected');
                                    selectedIndex = selectedIndex + 1;
                                } else {
                                    $selectItem.first().addClass('selected').siblings().removeClass('selected');
                                    selectedIndex = 0;
                                }
                                $selectedItem = $(this).siblings('.select-list').children().children('li.selected');
                                $(this)
                                    .val($selectedItem.text())
                                    .prev().prev().val($selectedItem.attr('data-value'));
                                break;
                        }

                    })
                    .children('i').removeClass('disabled').end()
                    .children('.select-button').removeAttr('disabled');


                selectItem.on('click', function (event) {
                    event.stopPropagation();
                    $(this)
                        .addClass('selected').siblings().removeClass('selected')
                        .parent().parent().slideUp(showSpeed)
                        .prev().val($(this).text())
                        .siblings('input[type="hidden"]').val($(this).attr('data-value'));

                    if ($('.select-wrapper').hasClass('focus')) {
                        $('.select-wrapper').removeClass('focus');
                    }

                    if ($.isFunction(that.settings.onChange)) {
                        var attributes = $(this)[0].attributes;
                        var jsonData = {};
                        for (var j in attributes) {
                            if (!isNaN(parseInt(j)) && attributes[j].name.indexOf("data-") >= 0) {
                                jsonData[attributes[j].name.replace('data-', '')] = $(this).attr(attributes[j].name);
                                $(this).parent().parent().siblings('input[type="hidden"]').attr(attributes[j].name, $(this).attr(attributes[j].name));
                            }
                        }

                        that.settings.onChange.call(that, jsonData);
                    }

                    return false;
                }).hover(function () {
                    $(this).addClass('selected').siblings().removeClass('selected');
                }).mouseenter(function (event) {
                    var target = event.target,
                        realWidth = target.offsetWidth,
                        wrapperWidth = target.scrollWidth,
                        text = $(target).text();
                    if (realWidth < wrapperWidth) {
                        $(target).attr("title", text);
                    }
                })

                $(document).on('click', function () {
                    $(this).find('.select-list').slideUp(showSpeed);
                    if ($('.select-wrapper').hasClass('focus')) {
                        $('.select-wrapper').removeClass('focus');
                    }
                });

            } else {
                $(selectID)
                    .children('i').addClass('disabled').end()
                    .children('.select-button').attr('disabled', 'disabled');
                return;
            }
        }

    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new SelectList(this, options));
                if (!options.topPosition) {
                    options.zIndex--;
                } else {
                    options.zIndex++;
                };
            }
        });
        return this;
    };

    ///扩展方法，获取选中下拉框属性值，
    //element 元素
    //参数格式如下{id:"data-id",name:"data-name"}   参数说明:id,name供调用者使用，其值data-id，data-name对应选中html元素属性值
    $.fn[pluginName].getValue = function (element, obj) {
        if (obj == undefined || obj == null)
            return null;

        var data = {};
        var $selected = $("#" + $(element).attr("id")).children('input[type="hidden"]');
        jQuery.each(obj, function (i, val) {
            data[i] = $selected.attr(val);

        });
        return data;
    };

})(jQuery, window, document);