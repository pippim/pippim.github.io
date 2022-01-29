---
layout:       post
title:        >
    Avoid showing cancel button on dialog
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1181487
type:         Answer
tags:         command-line button zenity yad
created_date: 2019-10-16 23:19:07
edit_date:    2020-06-12 14:37:07
votes:        "7 "
favorites:    
views:        "4,087 "
accepted:     
uploaded:     2022-01-29 11:32:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-16-Avoid-showing-cancel-button-on-dialog.md
toc:          false
navigation:   false
clipboard:    false
---

# Relabel Zenity Cancel button

You can relabel the button but you can't remove it:

``` 
$ zenity --list --cancel-label="Go Back" --column="Column 1"
```

Will give you:

[![zenity cancel relabel.png][1]][1]


----------


# YAD (Yet Another Dialog)

Both `yad` and `zenity` allow you to use GUI dialog boxes from a bash script or the shell command line. Yad surpasses Zenity in every department though:

``` 
sudo apt install yad
```

Works in all distros.


----------


## Yad Progress bars

[![yad progress bars.png][2]][2]

You can define multiple progress bars in yad where zenity only offers 1. You can also include scrolling text.


----------


## Yad buttons

[![yad buttons.png][3]][3]

You can assign any text you want to any button. Also notice you can include a Window icon too.


----------


## Yad text entry

[![yad text entry.png][4]][4]

Yad displays text for you to change. Zenity cannot display existing text you can only enter new text.


----------


## Yad support

The author of Yad and many more contributors answer your questions in [google groups](https://groups.google.com/forum/#!forum/yad-common). I've posted four or five questions about advanced functionality and usually get an answer within 24 hours. Not to mention enhancements are provided through the same channel.


  [1]: https://i.stack.imgur.com/b1nrC.png
  [2]: https://i.stack.imgur.com/Sd0z4.png
  [3]: https://i.stack.imgur.com/fmrH9.png
  [4]: https://i.stack.imgur.com/BUD7W.png
