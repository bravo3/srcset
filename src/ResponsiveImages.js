/**
 * Responsive images srcset custom implementation
 */
var ResponsiveImages = (function($)
{
    /**
     * Check if a condition matches
     *
     * @param {string} spec
     * @param {int} width
     * @param {int} height
     * @returns {boolean}
     */
    var match = function(spec, width, height)
    {
        var spec_type = spec.substr(-1);
        var spec_value = spec.substr(0, spec.length - 1);

        if (spec_type == 'w') {
            return width <= spec_value;
        } else if (spec_type == 'h') {
            return height <= spec_value;
        }
    };

    /**
     * Update all images with data-srcset
     */
    this.update = function()
    {
        $('img[data-srcset]').each(function()
        {
            var srcset = $(this).attr('data-srcset').split(',');
            var src = null;

            var width = $(this).width();
            var height = $(this).height();

            $.each(srcset, function(index, spec)
            {
                var parts = spec.split(" ");
                var pass;

                if (parts.length == 1 || src == null) {
                    src = parts[0];
                } else {
                    pass = true;
                    for (var i = 1; i < parts.length; i++) {
                        pass = pass && match(parts[i], width, height);
                    }
                    if (pass) {
                        src = parts[0];
                    }
                }
            });

            $(this).attr('src', src);
        });
    };

    this.update();

    $(window).resize(function()
    {
        update();
    });

    return this;
})(jQuery);
