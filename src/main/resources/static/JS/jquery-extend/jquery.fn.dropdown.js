(function ($) {
    $.fn.dropdown = function (options) {
        var defaults = {
            lable: "dropdown_lable",
            options: "dropdown_lable_options"
        };
        var opts = $.extend(defaults, options);
        var _$this = $(this);
        $.each(_$this, function (index, item) {

            var _$lable = $(item).children("[data-dropdown-lable='" + opts.lable + "']");
            var _$options = $(item).children("[data-dropdown-options='" + opts.options + "']");


            _$lable.on("click", function () {
                _$options.show();
            }).on("mouseout", function () {
                _$options.hide();
            });

            _$options.on("mouseover", function () {
                $(this).show();
            }).on("mouseout", function () {
                $(this).hide();
            });

        });
    }
})(jQuery);
