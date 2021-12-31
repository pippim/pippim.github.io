---
layout:       post
title:        Python Tkinter PIL generate random 200x200 image
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63107373
type:         Question
tags:         python tkinter python-imaging-library
created_date: 2020-07-27 01:05:13
edit_date:    2020-07-28 00:35:57
votes:        0
favorites:    
views:        634
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

In Python Tkinter [this code][1]:

``` 
# custom indicator images
im_open = Image.new('RGBA', (15, 15), '#00000000')
im_empty = Image.new('RGBA', (15, 15), '#00000000')
draw = ImageDraw.Draw(im_open)
draw.polygon([(0, 4), (14, 4), (7, 11)], fill='yellow', outline='black')
im_close= im_open.rotate(90)
```
Generates a triangle in a format I can use:

[![screenshot][3]][3]


----------


In Python tkinter [this code][2] draws on a canvas I can't use:

``` 
COLORS = ['snow', 'ghost white', 'white smoke', 'gainsboro', 'floral white', 'old lace' ...]

for x in range(0, 40):

    x1 = random.randint(0,400)
    y1 = random.randint(0,400)
    x2 = random.randint(0,400)
    y2 = random.randint(0,400)
    x3 = random.randint(0,400)
    y3 = random.randint(0,400)

    my_triangle = canvas.create_polygon(x1, y1, x2, y2, x3, y3,\
                  fill = (random.sample(COLORS, 1)[0]), 
                  outline = random.sample(COLORS, 1)[0])
```

However it creates desirable images:

[![Tk Window Output 1][4]][4]

----------

The first code set generates an image in memory like I need but uses a triangle which I don't want. The second code set generates a canvas memory map which I don't want but has random shapes which I do want.

To improve the random polygon shapes in the second code set, circles and rectangles can be thrown in. Also the second code set contains color names  but random R:G:B channels would be preferable.

To select random shapes and colors the current `YY:MM:DD` or `HH:MM:SS` could be used. This is to generate random Album Artwork for home made music player when nothing is encoded to song or as a placeholder before real artwork is obtained.

In case it matters, platform is Ubuntu 16.04.6 LTS, kernel 4.14.188, Python 2.7.12 plus Tkinter, PIL and Tkinter-Image (stuff).

  [1]: https://stackoverflow.com/a/61324709/6929343
  [2]: https://stackoverflow.com/questions/46864799/python-tkinter-random-generating-the-colors
  [3]: https://i.stack.imgur.com/0vzuv.png
  [4]: https://i.stack.imgur.com/5LcKE.png
