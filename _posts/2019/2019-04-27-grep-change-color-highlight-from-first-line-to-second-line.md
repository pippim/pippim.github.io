---
layout:       post
title:        >
    grep change color highlight from first line to second line
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138690
type:         Answer
tags:         grep
created_date: 2019-04-27 17:19:23
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,080 "
accepted:     
uploaded:     2024-09-01 12:09:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-27-grep-change-color-highlight-from-first-line-to-second-line.md
toc:          false
navigation:   false
clipboard:    false
---

# `grep` on EOL (End of Line character)

Running `grep` a second time to highlight a different word causes all other lines without the word to disappear. The secret is to `grep` on different word  **OR** the EOL character (`\$` or simply `$`). The full explanation is here: 

- [How to highlight a word in the output of “cat”?][1]

The new command becomes:

-  `xrandr --current | grep -e " connected" -A1 | grep -E '\*|$'`:

And it returns this:

[![grep refresh rate.png][2]][2]

- `$` represents searching for EOL (End of Line) character which is on every line. This means every line from the first `grep` reappears on the second `grep`. The EOL character is not visible so you don't see `⏎` highlighted at the end of every line.
- Because the second `grep` is searching for `*` (which is a control character), it needs to be prepended with `\`. Normally you would simply use `word|$` to search and not `\word|$`. The asterisk (or splat) `*` character is an exception. See [Escaping Meta-Characters][3].


----------

# Bonus Answer 1

## Enhance output by highlighting Hz values

Using the answer from: [Matching decimal number in grep][4]. You can highlight the actual frequency rate in addition to the `*`.

This command:

``` 
xrandr --current | grep -e " connected" -A1 | grep -E '[0-9]+\.[0-9]+\*|$'
```

Gives you this:

[![grep all digits.png][5]][5]


----------

# Bonus Answer 2

## Enhance output with different highlight colors

The default red highlight color may not stand out well on your monitor. I know it is kind of washed out in my `gnome-terminal`. From this [colored grep][6] blog you can create these aliases:

``` 
alias    grey-grep="GREP_COLOR='1;30' grep --color=always"
alias     red-grep="GREP_COLOR='1;31' grep --color=always"
alias   green-grep="GREP_COLOR='1;32' grep --color=always"
alias  yellow-grep="GREP_COLOR='1;33' grep --color=always"
alias    blue-grep="GREP_COLOR='1;34' grep --color=always"
alias magenta-grep="GREP_COLOR='1;35' grep --color=always"
alias    cyan-grep="GREP_COLOR='1;36' grep --color=always"
alias   white-grep="GREP_COLOR='1;37' grep --color=always"
```

For permanent availability (persistent across reboots) add them to your `~/.bashrc` file.

These commands:

``` 
xrandr --current | grep -e " connected" -A1 | green-grep -E '[0-9]+\.[0-9]+\*|$'
xrandr --current | grep -e " connected" -A1 | yellow-grep -E '[0-9]+\.[0-9]+\*|$'
xrandr --current | grep -e " connected" -A1 | cyan-grep -E '[0-9]+\.[0-9]+\*|$'
```

Gives you this:

[![grep colored.png][7]][7]

- After trying all the colors I'm leading towards yellow as my favorite.

  [1]: https://unix.stackexchange.com/questions/106565/how-to-highlight-a-word-in-the-output-of-cat
  [2]: https://pippim.github.io/assets/img/posts/2019/Pf2z1.png
  [3]: https://www.digitalocean.com/community/tutorials/using-grep-regular-expressions-to-search-for-text-patterns-in-linux#escaping-meta
  [4]: https://stackoverflow.com/questions/41446222/matching-decimal-number-in-grep
  [5]: https://pippim.github.io/assets/img/posts/2019/XKUaj.png
  [6]: https://www.jefftk.com/p/colored-grep
  [7]: https://pippim.github.io/assets/img/posts/2019/NtcPY.png
