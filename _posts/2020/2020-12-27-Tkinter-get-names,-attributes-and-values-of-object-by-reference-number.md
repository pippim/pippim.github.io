---
layout:       post
title:        >
    Tkinter get names, attributes and values of object by reference number
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/65461996
type:         Answer
tags:         python tkinter
created_date: !!str "2020-12-27 00:30:37"
edit_date:    !!str "2020-12-27 00:42:54"
votes:        !!str "0"
favorites:    
views:        !!str "194"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

To address the issue of configuring. In this application there is a frame with 8 tkinter buttons that do not have names. Every few minutes the background color for artwork changes and it needs to be propagated down to all the buttons.

Here is the function to do that:

``` 
def config_all_buttons(level, **kwargs):
    ''' Configure all tk buttons within a frame (doesn't work for toplevel?).

        level = frame name, eg self.play_btn

        **kwargs = tkinter_button.configure(keywords and values). For example:
            fg="#000000", bg="#ffffff", padx=5
    '''
    for k, v in level.children.items():

        if isinstance(v, tk.Button):
            if v["image"] == "":
                # We can't configure image labels that have a value
                v.configure(**kwargs)

        config_all_buttons(v, **kwargs)
```

Here is how you call the function from your mainline or class:

``` 
        self.play_frm_bg = self.play_resized_art.getpixel((3,3))
        hex_background = img.rgb_to_hex(self.play_frm_bg)
        self.play_frm_fg = img.contrasting_rgb_color(self.play_frm_bg)
        hex_foreground = img.rgb_to_hex(self.play_frm_fg)
        self.play_frm.configure(bg=hex_background)
        toolkit.config_all_labels(self.play_frm, fg=hex_foreground, \
                                  bg=hex_background)
        toolkit.config_all_buttons(self.play_btn, fg=hex_foreground, \
                                  bg=hex_background)
```

Here's what it looks like when artwork has a "dark chocolate" colored background:

[![mserve confg_all_labels.gif][1]][1]

Here's what it looks like when artwork has a "dark orange" colored background:

[![mserve confg_all_labels2.gif][2]][2]

Here's what it looks like when artwork has a "yellow" colored background which forces the text to be black:

[![mserve config_all_labels3.gif][3]][3]




  [1]: https://i.stack.imgur.com/h4jCr.gif
  [2]: https://i.stack.imgur.com/BNMjK.gif
  [3]: https://i.stack.imgur.com/vepUm.gif
