Responsive Images Custom Srcset Implementation
==============================================

*This is not a srcset polyfill!*

What This Is
------------
Taking from the concept of the `img`'s `srcset` tag, this will create a custom implementation that will select the
best source image based on the *images dimensions*, not the browsers.

This has advantages over the traditional srcset implementation:

* You only need to define one srcset for images *anywhere* in your layout
* You don't need to work out how large the image will be in given location relative to the overall browser width
* Unified logic and support across all browsers

What This Doesn't Do
--------------------
* Create a `srcset` polyfill
* Take a 'sizes' argument

Requirements
------------
For this process to work, you must force at least one dimension of your image. A good example of this would be to set
the image width to a percentage and the height to auto. This will allow your image to dynamically fit into your layout
and use the most appropriate variation of the image.

To use the library, just include the Javascript file in your project.

Usage
-----
The syntax is similar to a normal srcset implementation, however you can only define conditions for height and width:

    <img src="" data-srcset="image-200.jpg 200w,image-100.jpg 100w,image-50.jpg 50w">
    
Thus the `data-srcset` attribute has the syntax "filename condition [condition],..". It's important to note two things:

1. Leave the `src` attribute empty
2. Order your `data-srcset` from largest to smallest

The image handler will look from left to right and test conditions, if the condition passes it will use the filename
for the `src` value. Putting your largest images at the end will pass when really we want to use a smaller image. If
all conditions fail, the first filename will be used.

A condition can be in the form 'xxxh' or 'xxxw' (eg '100w', '75h') representing a height and width requirement 
respectively. It only makes sense for the condition to match a forced dimension. If height is auto, setting a condition
of 100h will make no sense.

Controling Image Updates
------------------------
Only images with `data-srcset` will be updated. Updates occur when you first load the page and when the browser screen
is resized. 

If you load content via an AJAX request, you will want to call `ResponsiveImages.update()`, this will trigger a run of
the update process which will update your new content.

Restraints for the Device Pixel Ratio
-------------------------------------
The pixel ratio is the image dimension coefficient required to get the optimum image size for devices with a high
pixel density or a browser window that has been zoomed. 

For example, modern mobile devices fake their screen width but offer a pixel ratio (of 2.0 or 3.0, for example). This
allows you to offer a higher-res image to get the most out of their screen resolution. A desktop browser that is zoomed
out now requires less pixels to render the image, so you can now offer a lower-res image to complete the request 
without any loss of quality.

To control this you can set the `min|max_pixel_ratio` properties of the `ResponsiveImages` object. If you're trying to
optimise bandwidth, you might want to set the `max_pixel_ratio` to a low value (eg 1.0) to offer a practical image
size instead of transmitting desktop-quality images to physically small devices with very-high-res screens.
