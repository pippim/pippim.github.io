---
layout:       post
title:        >
    Python to print out status bar and percentage
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/70586588
type:         Answer
tags:         python
created_date: 2022-01-05 00:33:35
edit_date:    
votes:        "3 "
favorites:    
views:        "232,305 "
accepted:     
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-01-05-Python-to-print-out-status-bar-and-percentage.md
toc:          false
navigation:   false
clipboard:    true
---

[![stack-to-blog progress display.gif][1]][1]

None of the answers posted completely addressed my needs. So I wrote my own as shown above. The features I needed:

- Pass only the step number and total number of steps and it does the difficult job of calculating percentage complete.
- Using only 60 character spaces, divide them into 240 "ticks" to give better granular display from .25 % to 100%.
- Support for prepending a title.
- Optional percentage complete at end of line.
- Variable length progress bar that defaults to 60 characters or 240 "ticks".

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

    fill = "▒"                      # Fill up to bar_width
    utf_8s = ["▉", "▎", "▌", "▊"]   # UTF-8 left blocks: 7/8, 1/4, 1/2, 3/4
    perc = 100 * float(step) / float(total_steps)
    max_ticks = bar_width * 4
    num_ticks = int(round(perc / 100 * max_ticks))
    full_ticks = num_ticks / 4      # Number of full blocks
    part_ticks = num_ticks % 4      # Size of partial block (array index)

    disp = bar = ""                 # Blank out variables
    bar += utf_8s[0] * full_ticks   # Add full blocks into Progress Bar

    # If part_ticks is zero, then no partial block, else append part char
    if part_ticks > 0:
        bar += utf_8s[part_ticks]

    # Pad Progress Bar with fill character
    bar += fill * int((max_ticks/4 - float(num_ticks)/4.0))

    if len(title) > 0:
        disp = title + ": "         # Optional title to progress display

    disp += bar                     # Progress bar to progress display
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

- The `[ .... ]` bracket placeholders are not necessary because there is the fill characters that serve the same purpose. This saves two extra characters to make the progress bar wider.
- The `bar_width` keyword parameter can be used depending on screen width. The default of `60` seems a good fit for most purposes.
- The `print_perc=True` keyword parameter default can be overridden by passing `print_perc=False` when calling the function. This would allow a longer progress bar.
- The `title=""` keyword parameter defaults to no title. Should you desire one use `title="My Title"` and `: ` will automatically be added to it.
- When your program finishes remember to call `sys.stdout.write("\r")` followed by `sys.stdout.flush()` to clear the progress display line.

## Summary

This answer is a bit longer than the others but it's important to note it's a full solution, not part of a solution that you need to add more code to.

Another point is this solution has no dependencies and nothing extra to install. The UTF-8 character set is supported by Python and `gnome-terminal` was no extra setup required. If you are using Python 2.7 you might require `# -*- coding: utf-8 -*-` after the shebang. IE as the second line of your program.

The function could be converted to a class with separate `init`, `update`, `pause` (for printing debug stuff to the screen), `resume` and `close` methods.

This function was converted from a bash script. The bash script would display Sony TV volume with `libnotify-bin` (pop-up bubble message) whenever TV volume was changed. If you are interested in the bash version, please post a comment below.


  [1]: https://i.stack.imgur.com/RKRgx.gif
