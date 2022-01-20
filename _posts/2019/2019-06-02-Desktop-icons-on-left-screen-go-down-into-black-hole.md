---
layout:       post
title:        >
    Desktop icons on left screen go down into black hole
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1147993
type:         Answer
tags:         bash multiple-monitors desktop-environments window-manager desktop-icons iconic
created_date: 2019-06-02 03:01:03
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "416 "
accepted:     Accepted
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-02-Desktop-icons-on-left-screen-go-down-into-black-hole.md
toc:          false
navigation:   false
clipboard:    false
---

# iconic

The problem was solved by creating the [iconic bash script][1] to place icons by monitor dimensions rather than virtual screen dimensions.

## iconic Main Menu

The main menu allows you to save and load desktop icon settings. The main menu leads you to additional windows to sort icons and manage monitors. Also you can apply new settings.

### iconic Main Menu screenshot

[![iconic main menu.png][2]][2]


----------


## iconic Sort Icons

You can sort icons alphabetically, or alphabetically by removing "Link to" from sort order. You can sort by date in ascending or descending order. After sorting you can reposition an individual icon to a higher or lower position.

### iconic Sort Icons screenshot

[![iconic sort icons.png][3]][3]


----------


## iconic Monitors Notebook

The notebook provides multiple tabs for accessing Monitors General settings and a tab for each individual monitor. Up to three monitors are currently supported.

The General settings tab allows you to set the monitor where desktop icons are placed. Additionally global definition of reserved space on left, top, right and bottom of monitors where icons should not go. Use this to reserve space for window manager launchers and application indicator bars.

### iconic Monitors Notebook General Tab screenshot

[![iconic monitors general.png][4]][4]

On this notebook tab you can also specify the number of seconds a test will last. Press the <kbd>Test</kbd> button to place icons on the Desktop after you change reserved screen space.

### iconic Monitors Notebook Monitor 3 tab

[![iconic monitors monitor 3.png][5]][5]

Assign a user friendly name to each monitor. Set the number of rows and columnss to utilize for icon placement on each monitor.

Use the <kbd>Test</kbd> button to view what icon placement after number or columns or rows are changed.


----------

## Test button example

When you click the **Test** button all windows minimize and Icons are displayed exactly as they would appear on the Desktop if the current settings were implemented. After a number of seconds the Icons and Windows are restored as they were before the test.

[![iconic 9 optimized.gif][6]][6]


  [1]: https://github.com/WinEunuuchs2Unix/iconic
  [2]: https://i.stack.imgur.com/PgERo.png
  [3]: https://i.stack.imgur.com/ptGvC.png
  [4]: https://i.stack.imgur.com/ItW6C.png
  [5]: https://i.stack.imgur.com/nADAj.png
  [6]: https://i.stack.imgur.com/bZk4z.gif
