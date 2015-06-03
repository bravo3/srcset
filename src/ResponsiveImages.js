/**
 * Responsive images srcset custom implementation
 */
var ResponsiveImages = (function($)
{
    var self = this;

    /**
     * Use this to set the upper limit of the pixel ratio calculations
     *
     * This can be useful to prevent high-res images being displayed on physically small devices with massive pixel
     * resolutions.
     *
     * @type {number}
     */
    this.max_pixel_ratio = 10.0;

    /**
     * Use this to set the lower limit of the pixel ratio calculations
     *
     * A low pixel ratio is usually caused by zooming out in the browser, thus requiring a smaller image to fill the
     * physical pixels on the devices screen.
     *
     * @type {number}
     */
    this.min_pixel_ratio = 0.1;

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
     * Get the browsers current pixel ratio
     *
     * @returns {number}
     */
    var getPixelRatio = function()
    {
        var pr = window.devicePixelRatio;

        if (pr === undefined) {
            pr = 1;
        } else if (pr < self.min_pixel_ratio) {
            pr = self.min_pixel_ratio;
        } else if (pr > self.max_pixel_ratio) {
            pr = self.max_pixel_ratio;
        }

        return pr;
    };

    /**
     * Update all images with data-srcset
     */
    this.update = function()
    {
        var pr = getPixelRatio();

        $('img[data-srcset]').each(function()
        {
            var srcset = $(this).attr('data-srcset').split(',');
            var src = null;

            var width = Math.ceil($(this).width() * pr);
            var height = Math.ceil($(this).height() * pr);

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
