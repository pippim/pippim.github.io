---
layout:       post
title:        >
    Is it possible to get text from a website in terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1100605
type:         Answer
tags:         bash scripts
created_date: 2018-12-13 11:58:31
edit_date:    2018-12-14 00:05:24
votes:        "0 "
favorites:    
views:        "6,251 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-13-Is-it-possible-to-get-text-from-a-website-in-terminal.md
toc:          false
navigation:   false
clipboard:    false
---

The [websync][1] bash script uses `wget` to retrieve answers here in **Ask Ubuntu**. It searches HTML tags to find Question Upvotes and Answer Upvotes. It converts special HTML symbols such as `&amp` to `&` and `&lt` to `<`, etc.

Here are a few snippets from the code you may find helpful:



``` bash
LineOut=""
HTMLtoText () {
    LineOut=$1  # Parm 1= Input line
    LineOut="${LineOut//&amp;/&}"
    LineOut="${LineOut//&lt;/<}"
    LineOut="${LineOut//&gt;/>}"
    LineOut="${LineOut//&quot;/'"'}"
    LineOut="${LineOut//&#39;/"'"}"
    LineOut="${LineOut//&ldquo;/'"'}"
    LineOut="${LineOut//&rdquo;/'"'}"
} # HTMLtoText ()

Ampersand=$'\046'

(... SNIP LINES ...)

while IFS= read -r Line; do

(... SNIP LINES ...)

# Convert HTML codes to normal characters
HTMLtoText $Line
Line="$LineOut"

(... SNIP LINES ...)

done < "/tmp/$AnswerID"

(... SNIP LINES ...)

wget -O- "${RecArr[$ColWebAddr]}" > "/tmp/$AnswerID"
if [[ "$?" -ne 0 ]]               # check return code for errors
  then
    # Sometimes a second attempt is required. Not sure why.
    wget -O- "${RecArr[$ColWebAddr]}" > "/tmp/$AnswerID"
fi
if [[ "$?" == 0 ]]               # check return code for errors
  then
      echo "$BarNo:100" > "$PercentFile"
      echo "$BarNo:#Download completed." > "$PercentFile"
  else
      echo "$BarNo:100" > "$PercentFile"
      echo "$BarNo:#Download error." > "$PercentFile"
      echo "ERROR: $AnswerID" >> ~/websync.log
      return 1
fi
```

  [1]: {% post_url /2017/2017-04-05-Code-version-control-between-local-files-and-AU-answers %}

