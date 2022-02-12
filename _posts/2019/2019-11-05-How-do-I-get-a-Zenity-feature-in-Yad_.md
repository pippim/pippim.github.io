---
layout:       post
title:        >
    How do I get a Zenity feature in Yad?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1186286
type:         Answer
tags:         zenity yad
created_date: 2019-11-05 00:17:52
edit_date:    2019-11-05 00:22:56
votes:        "3 "
favorites:    
views:        "454 "
accepted:     Accepted
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-05-How-do-I-get-a-Zenity-feature-in-Yad_.md
toc:          false
navigation:   false
clipboard:    true
---

For learning `yad` I found this great reference: [YAD - Smokey01.com][1]



As mentioned in comments you want to use the option `--search-column=N`

Take the following code snippet as an example:

{% include copyHeader.html %}
``` bash
while true ; do
    local Selected INSTRUCTIONS
    INSTRUCTIONS="Click Icon to move and press Enter"
    Selected=$(yad --list --radiolist \
    --image="$ICON" --window-icon="$ICON" \
    --margins=10 --no-click  --search-column=4 \
    --title="$TITLE" "${GEOMETRY[@]}" \
    --text="<big><b>$TEXT</b></big> - $INSTRUCTIONS" \
    --column "Select" \
    --column "Order" \
    --column "Icon Type:HD" \
    --column "Icon name" \
    --column "Linkless name:HD" \
    --column "Modified date" \
    --column "Col Pos:NUM" \
    --column "Row Pos:NUM" \
    --button="_Alpha Sort:$ButnAlpha" \
    --button="_Linkless Sort:$ButnLinkless" \
    --button="_Oldest Date:$ButnOldest" \
    --button="_Newest Date:$ButnNewest" \
    --button="_Test:$ButnTest"  \
    --button="_Apply:$ButnApply" \
    --button="_Cancel:$ButnCancel" \
    "${IconsArr[@]}")

    Retn="$?"
```

Columns #3 and #5 are hidden but they are still counted. We want to search on Icon Name so it is column #4 as recorded here:

``` bash
    --margins=10 --no-click  --search-column=4 \
```

The short `.gif` clip below shows what happens when we type:

- <kbd>a</kbd>, <kbd>Backspace</kbd>, <kbd>b</kbd>, <kbd>Backspace</kbd>, <kbd>c</kbd>, <kbd>Backspace</kbd>, <kbd>e</kbd> (then gif loops)

[![search column.gif][2]][2]


  [1]: http://smokey01.com/yad/
  [2]: https://i.stack.imgur.com/pCVyz.gif
