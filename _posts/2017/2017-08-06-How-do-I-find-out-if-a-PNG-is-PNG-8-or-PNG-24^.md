---
layout:       post
title:        >
    How do I find out if a PNG is PNG-8 or PNG-24?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/943627
type:         Answer
tags:         command-line image-processing png
created_date: 2017-08-06 17:52:52
edit_date:    2017-08-09 02:53:27
votes:        "28 "
favorites:    
views:        "14,531 "
accepted:     Accepted
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-06-How-do-I-find-out-if-a-PNG-is-PNG-8-or-PNG-24^.md
toc:          false
navigation:   false
clipboard:    true
---

The `file` command use in other answers is sometimes inconsistent. For example:

``` 
───────────────────────────────────────────────────────────────────────────────
rick@dell:~/Pictures$ file "256 colors.jpg"
256 colors.jpg: JPEG image data, JFIF standard 1.01, resolution (DPI), density 96x96, segment length 16, baseline, precision 8, 800x800, frames 3
───────────────────────────────────────────────────────────────────────────────
rick@dell:~/Pictures$ file "vnStat.png"
vnStat.png: PNG image data, 410 x 121, 8-bit/color RGB, non-interlaced
```

The first instance is likely a camera picture and the second instance I took using a screen capture.

The `identify` command, which my answer is based on, appears to work correctly in all instances. For example testing on the first instance above:

``` 
rick@dell:~/Pictures$ identify "256 colors.jpg"
256 colors.jpg JPEG 800x800 800x800+0+0 8-bit sRGB 45KB 0.000u 0:00.000
## ```



I have [ImageMagick][1] installed which allows me to use:

{% include copyHeader.html %}
``` 
$ identify -verbose vnStat.png
Image: vnStat.png
  Format: PNG (Portable Network Graphics)
  Mime type: image/png
  Class: DirectClass
  Geometry: 410x121+0+0
  Units: Undefined
  Type: TrueColor
  Endianess: Undefined
  Colorspace: sRGB
  Depth: 8-bit
  Channel depth:
    red: 8-bit
    green: 8-bit
    blue: 8-bit
  Channel statistics:
    Pixels: 49610
    Red:
      min: 0 (0)
      max: 255 (1)
      mean: 12.0814 (0.0473779)
      standard deviation: 46.7032 (0.18315)
      kurtosis: 18.8998
      skewness: 4.49862
    Green:
      min: 0 (0)
      max: 255 (1)
      mean: 21.1804 (0.0830606)
      standard deviation: 57.5336 (0.225622)
      kurtosis: 6.68226
      skewness: 2.82613
    Blue:
      min: 0 (0)
      max: 255 (1)
      mean: 14.2606 (0.0559237)
      standard deviation: 50.2969 (0.197243)
      kurtosis: 13.5573
      skewness: 3.85914
  Image statistics:
    Overall:
      min: 0 (0)
      max: 255 (1)
      mean: 15.8408 (0.0621207)
      standard deviation: 51.7078 (0.202776)
      kurtosis: 11.8528
      skewness: 3.62638
  Rendering intent: Perceptual
  Gamma: 0.454545
  Chromaticity:
    red primary: (0.64,0.33)
    green primary: (0.3,0.6)
    blue primary: (0.15,0.06)
    white point: (0.3127,0.329)
  Background color: white
  Border color: srgb(223,223,223)
  Matte color: grey74
  Transparent color: black
  Interlace: None
  Intensity: Undefined
  Compose: Over
  Page geometry: 410x121+0+0
  Dispose: Undefined
  Iterations: 0
  Compression: Zip
  Orientation: Undefined
  Properties:
    date:create: 2017-01-24T20:04:50-07:00
    date:modify: 2017-01-24T20:04:50-07:00
    png:IHDR.bit-depth-orig: 8
    png:IHDR.bit_depth: 8
    png:IHDR.color-type-orig: 2
    png:IHDR.color_type: 2 (Truecolor)
    png:IHDR.interlace_method: 0 (Not interlaced)
    png:IHDR.width,height: 410, 121
    png:sRGB: intent=0 (Perceptual Intent)
    png:text: 1 tEXt/zTXt/iTXt chunks were found
    signature: e9f31b79da6ce46cdea5da21ae8648496faa181b0621098aa2dbbdff4a9a4502
    Software: gnome-screenshot
  Artifacts:
    filename: vnStat.png
    verbose: true
  Tainted: False
  Filesize: 14.7KB
  Number pixels: 49.6K
  Pixels per second: 0B
  User time: 0.000u
  Elapsed time: 0:01.000
  Version: ImageMagick 6.8.9-9 Q16 x86_64 2017-07-31 http://www.imagemagick.org
```


----------

For a summary report omit all parameters:

``` 
$ identify vnStat.png
vnStat.png PNG 410x121 410x121+0+0 8-bit sRGB 14.7KB 0.000u 0:00.000
```


----------

Replace `vnStat.png` with your own `.png` file name and preface it with the path if necessary.

----------

To understand PNG-24 vs PNG-32 this answer from [SuperUser][2] summarizes it:

If your image is 24 bit you will see:

``` 
Channel depth:
  red: 8-bit
  green: 8-bit
  blue: 8-bit
```

If your PNG image is 32 bit you will see:

``` 
Channel depth:
  red: 8-bit
  green: 8-bit
  blue: 8-bit
  alpha: 8-bit
```

However this answer is not complete because 8-bit color also shows 8 bits for Red, Green and Blue, only a color palette is used to limit the number of selections (like in good old Windows 2.0).


----------

Examine these three pictures from [Wikipedia Depth Article][3]:

[![8_bit.png][4]][4]

File Name: `8_bit.png`

Using:

``` 
identify -verbose  8_bit.png | grep colors
    png:PLTE.number_colors: 249
```

We see there are 249 colors used. The maximum possible with 8 bits is 256 colors.


----------


[![4 bit][5]][5]

File Name: `4_bit.png`

Using:

``` 
identify -verbose  4_bit.png | grep colors
    png:PLTE.number_colors: 16
```

We see there are 16 colors used which is the maximum color combinations possible with 4 bits.


----------


[![2_bit.png][6]][6]

File Name: `2_bit.png`

Using:

``` 
$ identify -verbose  2_bit.png | grep colors
    png:PLTE.number_colors: 4
```

We see there are 4 colors used which is the maximum color combinations possible with 2 bits.


  [1]: http://www.imagemagick.org/script/index.php
  [2]: https://superuser.com/questions/148661/how-can-i-find-out-if-a-png-file-is-24-bit-color-or-32-bit-color-on-mac-os-x/148680#148680
  [3]: https://en.wikipedia.org/wiki/Color_depth
  [4]: https://i.stack.imgur.com/zlMvz.png
  [5]: https://i.stack.imgur.com/i1RcR.png
  [6]: https://i.stack.imgur.com/s0P8g.png


