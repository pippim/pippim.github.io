---
layout:       post
title:        CheckboxTreeview() - scale size of checkboxes, change colors
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/64582469
type:         Answer
tags:         python tkinter checkbox treeview
created_date: 2020-10-28 22:54:04
edit_date:    
votes:        1
favorites:    
views:        186
accepted:     Accepted
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    true
---

[CheckboxTreeview()][1] uses stock `.png` images at 19x14 pixel size that can appear tiny. I created a function to make scalable checkboxes depending on font size:

[![new checkboxes][2]][2]

*Note I removed background selection highlighting in old program which was used before discovering CheckboxTreeview()*

The code is pretty straight forward and comments are included for ease of use:

{% include copyHeader.html %}
``` 
def make_checkboxes(hgt, outc, fillc, chkc):

    ''' Create CheckboxTreeview(); 'unchecked', 'checked' and 'tristate'
        Parms: height, outline color, fill color, checkmark color

        Returns list of three PhotoImages for parent. How to use 4K screen:

            MON_FONTSIZE = 12
            row_height=int(MON_FONTSIZE*2.2)
            style.configure("Treeview", font=(None, MON_FONTSIZE), \
                            rowheight=row_height)

            self.checkboxes = make_checkboxes(row_height-6, 'black', \
                                              'white', 'deepskyblue')
            self.cd_tree.tag_configure("unchecked", image=self.checkboxes[0])
            self.cd_tree.tag_configure("tristate", image=self.checkboxes[1])
            self.cd_tree.tag_configure("checked", image=self.checkboxes[2])

    '''
    from PIL import Image, ImageTk, ImageDraw       # Pillow image processing

    if hgt % 2 == 1: hgt = hgt + 1                  # even number box height
    if hgt < 14: hgt = 14                           # minimum box height
    wid = hgt                                       # square: width = heidht
    wid_pad = int(wid * 10 / 20)                    # lead + trailing padding
    xo = int(wid_pad / 5)                           # x-offset after lead pad
    retn_images = []                                # list of three images

    image = Image.new("RGBA", (wid + wid_pad, hgt), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)                    # Create drawable image

    draw.rectangle([(xo, 0), (xo + wid, hgt-1)], fill=fillc, outline=outc)
    retn_images.append(ImageTk.PhotoImage(image))   # Unchecked
    draw.rectangle([(xo+3, 7), (xo + wid-3, hgt-8)], fill=chkc)
    retn_images.append(ImageTk.PhotoImage(image))   # Tristate
    draw.rectangle([(xo+3, 3), (xo + hgt-3, hgt-4)], fill=chkc)
    retn_images.append(ImageTk.PhotoImage(image))   # Checked

    return retn_images
```


  [1]: https://ttkwidgets.readthedocs.io/en/latest/ttkwidgets/ttkwidgets/ttkwidgets.CheckboxTreeview.html
  [2]: https://i.stack.imgur.com/ltOzV.png
