---
layout:       post
title:        >
    Python to print out status bar and percentage
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/70586588
type:         Answer
tags:         python
created_date: 2022-01-05 00:33:35
edit_date:    2022-01-30 19:39:30
votes:        "3 "
favorites:    
views:        "236,647 "
accepted:     
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-01-05-Python-to-print-out-status-bar-and-percentage.md
toc:          false
navigation:   true
clipboard:    true
---

[![enter image description here][1]][1]

None of the answers posted completely addressed my needs. So I wrote my own as shown above. The features I needed:

- Pass only the step number and total number of steps and it does the difficult job of calculating percentage complete.
- Using 60 characters, divide them into 480 "ticks" to yield 0.21 % per tick. Without ticks, each character would only be 1.67 %.
- Support for prepending a title.
- Optional percentage complete at end of line.
- Variable length progress bar that defaults to 60 characters or 480 "ticks".
- Set progress bar color, the default is green.


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

## How to Call the Progress Display

Calling the progress display is pretty straight forward. For the above sample `.gif` the function was called using:

``` python
percent_complete(step, total_steps, title="Convert Markdown")
```

The `total_steps` was about 2,500 for `len(rows)` in Stack Exchange Data Dump in CSV format. The `step` was the current row number as each Stack Exchange Markdown Q&A was converted to Kramdown (for GitHub Pages).


## Python Code

The code is straight forward, but a bit longer than the other answers:

{% include copyHeader.html %}
``` python
def percent_complete(step, total_steps, bar_width=60, title="", print_perc=True):
    import sys

    # UTF-8 left blocks: 1, 1/8, 1/4, 3/8, 1/2, 5/8, 3/4, 7/8
    utf_8s = ["█", "▏", "▎", "▍", "▌", "▋", "▊", "█"]
    perc = 100 * float(step) / float(total_steps)
    max_ticks = bar_width * 8
    num_ticks = int(round(perc / 100 * max_ticks))
    full_ticks = num_ticks / 8      # Number of full blocks
    part_ticks = num_ticks % 8      # Size of partial block (array index)
    
    disp = bar = ""                 # Blank out variables
    bar += utf_8s[0] * full_ticks   # Add full blocks into Progress Bar
    
    # If part_ticks is zero, then no partial block, else append part char
    if part_ticks > 0:
        bar += utf_8s[part_ticks]
    
    # Pad Progress Bar with fill character
    bar += "▒" * int((max_ticks/8 - float(num_ticks)/8.0))
    
    if len(title) > 0:
        disp = title + ": "         # Optional title to progress display
    
    # Print progress bar in green: https://stackoverflow.com/a/21786287/6929343
    disp += "\x1b[0;32m"            # Color Green
    disp += bar                     # Progress bar to progress display
    disp += "\x1b[0m"               # Color Reset
    if print_perc:
        # If requested, append percentage complete to progress display
        if perc > 100.0:
            perc = 100.0            # Fix "100.04 %" rounding error
        disp += " {:6.2f}".format(perc) + " %"
    
    # Output to terminal repetitively over the same line using '\r'.
    sys.stdout.write("\r" + disp)
    sys.stdout.flush()
```

### Python Code Notes

A few points:

- The `[ .... ]` bracket placeholders requirement in the question are not necessary because there is the fill characters that serve the same purpose. This saves two extra characters to make the progress bar wider.
- The `bar_width` keyword parameter can be used depending on screen width. The default of `60` seems a good fit for most purposes.
- The `print_perc=True` keyword parameter default can be overridden by passing `print_perc=False` when calling the function. This would allow a longer progress bar.
- The `title=""` keyword parameter defaults to no title. Should you desire one use `title="My Title"` and `: ` will automatically be added to it.
- When your program finishes remember to call `sys.stdout.write("\r")` followed by `sys.stdout.flush()` to clear the progress display line.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## Summary

This answer is a bit longer than the others but it's important to note it's a full solution, not part of a solution that you need to add more code to.

Another point is this solution has no dependencies and nothing extra to install. The UTF-8 character set is supported by Python and `gnome-terminal` was no extra setup required. If you are using Python 2.7 you might require `# -*- coding: utf-8 -*-` after the shebang. IE as the second line of your program.

The function could be converted to a class with separate `init`, `update`, `pause` (for printing debug stuff to the screen), `resume` and `close` methods.

This function was converted from a bash script:

- [How to add a progress bar to a shell script?]({% post_url /2021/2021-01-01-How-to-add-a-progress-bar-to-a-shell-script_ %})

The bash script would display Sony TV volume with `libnotify-bin` (pop-up bubble message) whenever TV volume was changed. If you are interested in a bash progress bar, please visit the Stack Overflow link.



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## Edit January 30, 2022

- Change from 4 ticks to 8 ticks per character.
- Remove breaks between full blocks.
- Add color support.

  [1]: https://i.stack.imgur.com/rUVeM.gif


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a></div>

