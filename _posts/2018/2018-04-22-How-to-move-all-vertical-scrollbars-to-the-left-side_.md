---
layout:       post
title:        >
    How to move all vertical scrollbars to the left side?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1027062
type:         Answer
tags:         gnome touchscreen gimp
created_date: 2018-04-22 00:09:09
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "1,752 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-22-How-to-move-all-vertical-scrollbars-to-the-left-side_.md
toc:          false
navigation:   false
clipboard:    false
---

There are references on moving the vertical scroll bar to the left in **Gnome Terminal** and **LibreOffice** but I haven't found the exact methods yet. If you use **Firefox** extensively, moving the scroll bar to the left will help enormously:

You need to change your settings in `about:config`. Here's what to do:

 1.   Enter `about:config` into the address bar (if it gives a warning about your warranty, click the button to say you'll be careful)
 2.   Enter `layout.scrollbar.side` into the search box at the top of the page
 3.   Double-click the result and replace the current value with a `3` when the prompt comes up
 4.   Click `OK` and then restart Firefox.

### [Source][1]


----------

So far no luck finding left-handed details for **MyPaint** or **Gimp**. However there is a left-handed mouse Q&A that might be helpful: [How to set left-handed mouse pointer?][2]

## Left hand scrollbar in general

There is a discussion in Stack Exchange [User Experience][3] that will interest you. It addresses moving scrollbar to left side not just for RTL (Right To Left) languages (Arabic and Hebrew), nor just for left handed users, but for LTR users that like to hover mouse pointer to left side whilst reading paragraphs. For all these cases a scrollbar on the left side makes sense.

Perhaps between this Q&A and posting an answer on the above link, you can persuade GTK (GIMP & GNOME) developers to resurrect the left side scrollbar.


  [1]: https://support.mozilla.org/en-US/questions/995089
  [2]: https://askubuntu.com/questions/300009/how-to-set-left-handed-mouse-pointer
  [3]: https://ux.stackexchange.com/questions/1176/scrollbar-on-the-left?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
