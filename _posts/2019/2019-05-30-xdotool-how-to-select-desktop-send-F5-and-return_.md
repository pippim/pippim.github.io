---
layout:       post
title:        >
    xdotool how to select desktop send F5 and return?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1147294
type:         Question
tags:         command-line bash gnome-shell window-manager xdotool
created_date: 2019-05-30 02:56:14
edit_date:    2019-05-31 01:04:55
votes:        "5 "
favorites:    1
views:        "2,154 "
accepted:     Accepted
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-30-xdotool-how-to-select-desktop-send-F5-and-return_.md
toc:          false
navigation:   false
clipboard:    true
---

It sounds simple; `xdotool` selects desktop, simulates <kbd>F5</kbd> key press and returns focus to calling window / program. 

After googling though it doesn't sound simple anymore.

I need to do this from bash / gnome-shell.

Any ideas?


----------

This project is related to this Q&A where the icons drop off the left screen into a black whole because of different sized monitors:

- [Desktop icons just dropped down left screen into never-never land](Desktop icons just dropped down left screen into never-never land)

Thanks to [Podesta's help][1] I created this code:

{% include copyHeader.html %}
``` 
TestIcons () {

    [[ $TestSeconds == "" ]] || [[ $TestSeconds == 0 ]] && TestSeconds=5

    local i Position File
    for (( i=0; i<${#IconsArr[@]}; i=i+ICON_FLD_CNT )) ; do
        File="$ICONS_DIR"/"${IconsArr[((i+ICON_NAME_NDX))]}"
        Position="${IconsArr[((i+ICON_COL_NDX))]},${IconsArr[((i+ICON_ROW_NDX))]}"
        gvfs-set-attribute -t string "$File" \
                'metadata::nautilus-icon-position' "$Position"
    done

    wmctrl -k on        # Show desktop
    xdotool key F5      # Refresh desktop (show icon new positions)
    sleep $TestSeconds  # Pause for view
    wmctrl -k off       # Restore windows

    for (( i=0; i<${#OldIconsArr[@]}; i=i+ICON_FLD_CNT )) ; do
        File="$ICONS_DIR"/"${OldIconsArr[((i+ICON_NAME_NDX))]}"
        Position="${OldIconsArr[((i+ICON_COL_NDX))]},${OldIconsArr[((i+ICON_ROW_NDX))]}"
        gvfs-set-attribute -t string "$File" \
                'metadata::nautilus-icon-position' "$Position"

    done

    wmctrl -k on        # Show desktop
    xdotool key F5      # Refresh desktop (show icon new positions)
    wmctrl -k off       # Restore windows

} # TestIcons
```

This is what the screen looks like:

[![iconic 2 optimized.gif][2]][2]


  [1]: https://askubuntu.com/a/1147403/307523
  [2]: https://i.stack.imgur.com/YcaVq.gif
