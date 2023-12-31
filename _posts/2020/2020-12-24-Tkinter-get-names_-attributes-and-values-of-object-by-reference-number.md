---
layout:       post
title:        >
    Tkinter get names, attributes and values of object by reference number
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/65442540
type:         Question
tags:         python tkinter
created_date: 2020-12-24 19:25:35
edit_date:    
votes:        "0 "
favorites:    
views:        "497 "
accepted:     Accepted
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-12-24-Tkinter-get-names_-attributes-and-values-of-object-by-reference-number.md
toc:          false
navigation:   false
clipboard:    false
---

Using the code in this answer: [Get list of Toplevels on Tkinter](https://stackoverflow.com/questions/60978666/get-list-of-toplevels-on-tkinter):

``` python
'''
List all objects in play next song
https://stackoverflow.com/questions/60978666/get-list-of-toplevels-on-tkinter
'''
LAST_TIME=0.0
THING_COUNT=0

def toplevels(ventana):
    global LAST_TIME, THING_COUNT
    now = time.time()
    if not int(now) == int(LAST_TIME):
        if THING_COUNT > 0:
            print('Number of things:', THING_COUNT)
            THING_COUNT = 0
        print('\n============= toplevels() called at:', t(now),'=============')
        LAST_TIME = now
    for k, v in ventana.children.items():
        if isinstance(v, tk.Toplevel):
            print('Toplevel:', k, v)
        else:
            print('   other:', k, v)
        toplevels(v)
        THING_COUNT += 1
```

I call it like this:

``` 
    toplevels(root)
```

The output is this:

``` none
Number of things: 42

============= toplevels() called at: Dec 24 2020 12:03:27 =============
Toplevel: 140109521792176 .140109521792176
   other: 140109520829184 .140109521792176.140109520829184
   other: 140109520830264 .140109521792176.140109520829184.140109520830264
   other: 140109520859360 .140109521792176.140109520829184.140109520859360
   other: 140109520829472 .140109521792176.140109520829184.140109520829472
   other: 140109521432304 .140109521792176.140109521432304
   other: 140109520827600 .140109521792176.140109521432304.140109520827600
   other: 140109520828032 .140109521792176.140109521432304.140109520827600.140109520828032
   other: 140109520827888 .140109521792176.140109521432304.140109520827600.140109520827888
   other: 140109520828896 .140109521792176.140109521432304.140109520827600.140109520828896
   other: 140109520828176 .140109521792176.140109521432304.140109520827600.140109520828176
   other: 140109520828608 .140109521792176.140109521432304.140109520827600.140109520828608
   other: 140109520828392 .140109521792176.140109521432304.140109520827600.140109520828392
   other: 140109520767024 .140109521792176.140109521432304.140109520767024
   other: 140109520827384 .140109521792176.140109521432304.140109520767024.140109520827384
   other: 140109520767096 .140109521792176.140109521432304.140109520767024.140109520767096
   other: 140109520827096 .140109521792176.140109521432304.140109520767024.140109520827096
Toplevel: 140109520827168 .140109520827168
   other: 140109521621360 .140109520827168.140109521621360
   other: 140109521623016 .140109520827168.140109521621360.140109521623016
   other: 140109521621576 .140109520827168.140109521621360.140109521621576
   other: 140109521623160 .140109520827168.140109521621360.140109521623160
   other: 140109521623376 .140109520827168.140109521621360.140109521623376
   other: 140109521622152 .140109520827168.140109521621360.140109521622152
   other: 140109521622728 .140109520827168.140109521621360.140109521622728
   other: 140109521623232 .140109520827168.140109521621360.140109521623232
   other: 140109521621936 .140109520827168.140109521621360.140109521621936
   other: 140109521622800 .140109520827168.140109521621360.140109521622800
   other: 140109521622944 .140109520827168.140109521621360.140109521622944
   other: 140109521623448 .140109520827168.140109521621360.140109521623448
   other: 140109521623520 .140109520827168.140109521623520
   other: 140109521624888 .140109520827168.140109521623520.140109521624888
   other: 140109521624024 .140109520827168.140109521623520.140109521624024
   other: 140109521623664 .140109520827168.140109521623520.140109521623664
   other: 140109396840528 .140109520827168.140109521623520.140109396840528
   other: 140109521624456 .140109520827168.140109521623520.140109521624456
   other: 140109521624240 .140109520827168.140109521623520.140109521624240
   other: 140109521624672 .140109520827168.140109521623520.140109521624672
   other: 140109396840744 .140109520827168.140109521623520.140109396840744
   other: 140109396840960 .140109520827168.140109396840960
   other: 140109396841176 .140109520827168.140109396840960.140109396841176
   other: 140109396841392 .140109520827168.140109396840960.140109396841392
```

It's correctly showing two toplevels. First is a music library treeview. Second is currently playing song with four frames:

- Image of album artwork
- Details of currently playing song (artist, album, track, etc.)
- Buttons (close, pause/play, shuffle, next, previous, etc.)
- Treeview of chronology (recently played, currently playing, up next)

How can I convert the machine language references:

``` 
other: 140109521624240 .140109520827168.140109521623520.140109521624240
```

Into human readable format such as:

- This is a window x wide, y high, mounted at x,y of Desktop, name="self.play_top"
- This is a frame at nsew, with groovy relief,name="playfrm"
- This is a label with default font, size 12 points, containing "this text", text variable="self.current_song_name"
- This is a button, text="✘ Close", padx=2, pady=2, foreground="#0000000", background="#ffffff", internal name="blah blah"

I need to create a function that will present the information in human readable format and allow changes to colors, font sizes (hDPI monitors), themes, etc. These changes are then applied with another function that uses `.configure()` methods. I also plan to use a dictionary and store in pickle configuration file for reapplication later.
