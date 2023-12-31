---
layout:       post
title:        >
    Cannot resize list of images on canvas
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59340051
type:         Question
tags:         python image python-imaging-library tkinter-canvas
created_date: 2019-12-14 23:30:28
edit_date:    2019-12-15 01:19:16
votes:        "0 "
favorites:    
views:        "474 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-14-Cannot-resize-list-of-images-on-canvas.md
toc:          false
navigation:   false
clipboard:    false
---

I have a rectangle and two images on my canvas. When I resize by dragging window corner down and right this happens:

[![alpha1.png][1]][1]

- The blue rectangle resizes properly.
- The red and green images only have their borders resized properly.
- The red and green images stay the same size no matter how I try to regenerate them with `ImageTk.PhotoImage()`.

Here is my python code:

``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
    from Tkinter import *
except ImportError:
    from tkinter import *
    
from PIL import Image, ImageTk

root = Tk()

images = []     # to hold the newly created image
fills = []      # associated list of fill attributes

# a subclass of Canvas for dealing with resizing of windows
class ResizingCanvas(Canvas):
    def __init__(self,parent,**kwargs):
        Canvas.__init__(self,parent,**kwargs)

        self.bind("<Configure>", self.on_resize)
        self.height = self.winfo_reqheight()
        self.width = self.winfo_reqwidth()

    def on_resize(self,event):
        # determine the ratio of old width/height to new width/height
        wscale = float(event.width)/self.width
        hscale = float(event.height)/self.height
        # Save new values as old values
        self.width = event.width
        self.height = event.height
        # resize images
        for idx, image in enumerate(images):
            fill=fills[idx]
            dimensions = "image size: %dx%d" % (image.width(), image.height())
            events = "event size: %dx%d" % (event.width, event.height)
            neww=int(image.width()*wscale)
            newh=int(image.height()*hscale)
            image = Image.new('RGBA', (neww, newh), fill)
            image = ImageTk.PhotoImage(image)
#            images[idx] = image
        # resize the canvas 
        self.config(width=self.width, height=self.height)
        # rescale all objects with the "all" tag
        self.scale("all",0,0,wscale,hscale)

def create_rectangle(x1, y1, x2, y2, **kwargs):
    if 'alpha' in kwargs:
        alpha = int(kwargs.pop('alpha') * 255)
        fill = kwargs.pop('fill')
        fill = root.winfo_rgb(fill) + (alpha,)
        fills.append(fill)
#        print (fill)
        image = Image.new('RGBA', (x2-x1, y2-y1), fill)
        images.append(ImageTk.PhotoImage(image))
        mycanvas.create_image(x1, y1, image=images[-1], anchor='nw')
    mycanvas.create_rectangle(x1, y1, x2, y2, **kwargs)

root.title('alpha1.py')

myframe = Frame(root)
myframe.pack(fill=BOTH, expand=YES)
WinWid=1490; WinHgt=860
mycanvas = ResizingCanvas(myframe,width=WinWid, height=WinHgt, \
                          highlightthickness=0)
mycanvas.pack(fill=BOTH, expand=YES)

create_rectangle(100, 100, 600, 600, fill='blue')
create_rectangle(300, 300, 950, 700, fill='green', alpha=.5)
create_rectangle(200, 500, 850, 820, fill='#800000', alpha=.6)
mycanvas.addtag_all("all")

root.mainloop()
```

Notice the line:

``` 
#            images[idx] = image
```

If I remove the comment `#` then the red and green images aren't painted whatsoever. Only the image borders appear. I think this is the key because `image` should be equal to `images[idx]` prior to resizing.

If you can answer keep in mind the next step in the project will be to grab an image (or rectangle) and move it on the resizable canvas.

  [1]: https://i.stack.imgur.com/MvUOB.png
