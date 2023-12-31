---
layout:       post
title:        >
    Tkinter, how to adjust treeview indentation size and indicator arrow image
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/64741135
type:         Answer
tags:         python tkinter
created_date: 2020-11-08 17:35:28
edit_date:    
votes:        "1 "
favorites:    
views:        "1,573 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-11-08-Tkinter_-how-to-adjust-treeview-indentation-size-and-indicator-arrow-image.md
toc:          false
navigation:   false
clipboard:    false
---

I took the [accepted answer](https://stackoverflow.com/a/61324709/6929343) and tweaked the code. It is a bit shorter and more robust by calculating polygon coordinates automatically using the treeview row height as a parameter.

``` 
    ''' Create images for open, close and empty '''
    width = row_height-7

    im_open, im_close, im_empty = triangle_raw_images(width, 
                                                'black', 'LightGrey')
    img_open = ImageTk.PhotoImage(im_open)
    img_close = ImageTk.PhotoImage(im_close)
    img_empty = ImageTk.PhotoImage(im_empty)

    # custom indicator
    style.element_create('Treeitem.myindicator', 'image', img_close,
                    ('user1', '!user2', img_open), ('user2', img_empty), 
                    sticky='w', width=width)

    # replace Treeitem.indicator by custom one
    style.layout('Treeview.Item',
    [('Treeitem.padding',
      {'sticky': 'nswe',
       'children': [
            ('Treeitem.myindicator', {'side': 'left', 'sticky': ''}),
            ('Treeitem.image', {'side': 'left', 'sticky': ''}),
            ('Treeitem.focus', {'side': 'left', 'sticky': '','children':
                                    [('Treeitem.text', 
                                      {'side': 'left','sticky': ''})]
                               })
                  ]
       })])
```

Changes above from Accepted Answer:

- `row_height` is same variable passed to treeview which is needed for HiDPI screens when larger font size is used.
- variable names are used instead of pointers to variables making some lines shorter. For example `ImageTk.PhotoImage(im_open)` is used instead of `ImageTk.PhotoImage(im_open, name='img_open', master=root)`
- Line wrapping to adhere to PEP standard 79 character line length
- Indent closing brackets to hopefully make code more readable.

The heart of the change is a new function:

``` 
def triangle_raw_images(hgt, outc, fillc):

    from PIL import Image, ImageTk, ImageDraw       # Pillow image processing

    # For comments in code assume passed hgt = 21
    wid = hgt                                       # square image
    hgt_off = 4                                     # top & bottom whitespace
    wxy = ( 0, hgt_off, )                           # west point x=0, y=4
    exy = ( wid-1, hgt_off, )                       # east point x=20, y=4
    sxy = ( int((hgt-1)/2), hgt-hgt_off, )          # south point x=10, y=17
    retn_images = []                                # list of three images

    # custom indicator images
    im_open = Image.new('RGBA', (wid, hgt), (0, 0, 0, 0))
    im_empty = Image.new('RGBA', (wid, hgt), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im_open)
    draw.polygon([ wxy, exy, sxy ], outline=outc, fill=fillc)
    im_close= im_open.rotate(90)

    return im_open, im_close, im_empty
```

Here is the end result:

[![mserve open close triangles.png][1]][1]


  [1]: https://i.stack.imgur.com/TGQps.png
