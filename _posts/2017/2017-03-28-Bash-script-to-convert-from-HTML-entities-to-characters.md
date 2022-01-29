---
layout:       post
title:        >
    Bash script to convert from HTML entities to characters
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/43058947
type:         Answer
tags:         html bash html-escape-characters
created_date: 2017-03-28 01:06:23
edit_date:    2021-12-07 02:21:43
votes:        "14 "
favorites:    
views:        "54,667 "
accepted:     
uploaded:     2022-01-29 14:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-28-Bash-script-to-convert-from-HTML-entities-to-characters.md
toc:          false
navigation:   false
clipboard:    false
---

This answer is based on: [Short way to escape HTML in Bash?][1] which works fine for grabbing answers (using `wget`) on Stack Exchange and converting HTML to regular ASCII characters:

``` 
sed 's/&nbsp;/ /g; s/&amp;/\&/g; s/&lt;/\</g; s/&gt;/\>/g; s/&quot;/\"/g; s/#&#39;/\'"'"'/g; s/&ldquo;/\"/g; s/&rdquo;/\"/g;'
```

**Edit 1:** April 7, 2017 - Added left double quote and right double quote conversion. This is part of bash script that web-scrapes SE answers and compares them to local code files here: [Ask Ubuntu -
 Code Version Control between local files and Ask Ubuntu answers][2]


----------

## Edit June 26, 2017

Using `sed` was taking ~3 seconds to convert HTML to ASCII on a 1K line file from Ask Ubuntu / Stack Exchange. As such I was forced to use Bash built-in search and replace for ~1 second response time.

Here's the function:

``` bash     
LineOut=""      # Make global
HTMLtoText () {
    LineOut=$1  # Parm 1= Input line
    # Replace external command: Line=$(sed 's/&amp;/\&/g; s/&lt;/\</g; 
    # s/&gt;/\>/g; s/&quot;/\"/g; s/&#39;/\'"'"'/g; s/&ldquo;/\"/g; 
    # s/&rdquo;/\"/g;' <<< "$Line") -- With faster builtin commands.
    LineOut="${LineOut//&nbsp;/ }"
    LineOut="${LineOut//&amp;/&}"
    LineOut="${LineOut//&lt;/<}"
    LineOut="${LineOut//&gt;/>}"
    LineOut="${LineOut//&quot;/'"'}"
    LineOut="${LineOut//&#39;/"'"}"
    LineOut="${LineOut//&ldquo;/'"'}" # TODO: ASCII/ISO for opening quote
    LineOut="${LineOut//&rdquo;/'"'}" # TODO: ASCII/ISO for closing quote
} # HTMLtoText ()
```

  [1]: https://stackoverflow.com/questions/12873682/short-way-to-escape-html-in-bash
  [2]: https://askubuntu.com/questions/900319/code-version-control-between-local-files-and-au-answers
