---
layout:       post
title:        >
    Jekyll code block size in header is too small
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/69959426
type:         Question
tags:         css jekyll github-pages rouge multi-timer
created_date: 2021-11-14 00:43:56
edit_date:    
votes:        "1 "
favorites:    
views:        "377 "
accepted:     Accepted
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-11-14-Jekyll-code-block-size-in-header-is-too-small.md
toc:          false
navigation:   false
clipboard:    false
---

The code block font size is too small on [my website](https://pippim.github.io/2018/05/23/A-timer-to-set-up-different-alarms-simultaneosly.html#) when it appears in Heading 1 lines.

When typing a code block in a header in Stack Exchange we seem to have no problem. For example, when I type the following on this website:

``` 
# `multi-timer` bash script

The `multi-timer` bash script works in Ubuntu versions 14.04, 16.04 and 18.04. It also works in Windows 10 with Ubuntu 16.04 Desktop installed.
```

The markdown renders properly in HTML as:

# `multi-timer` bash script

The `multi-timer` bash script works in Ubuntu versions 14.04, 16.04 and 18.04. It also works in Windows 10 with Ubuntu 16.04 Desktop installed.

---

Using Jekyll (Cayman Theme) however the font is always a little bit smaller than the normal sized font:

[![jekyll code block size in header.png][1]][1]

---

I think the problem is buried somewhere in this [Sass / SCSS code](https://github.com/pages-themes/cayman/blob/master/_sass/jekyll-theme-cayman.scss) on the Jekyll Cayman Theme website:

``` css
  code {
    padding: 2px 4px;
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 0.9rem;
    color: $code-text-color;
    background-color: $code-bg-color;
    border-radius: 0.3rem;
  }
```

Specifically the: `font-size: 0.9rem;` line I believe to be the problem.

***How do I change the code block so it uses H1 font size on an H1 line, H2 font size on an H2 line, etc.?***

If it helps I'm just using Github Pages natively and this is [the repo](https://github.com/pippim/pippim.github.io).


  [1]: https://i.stack.imgur.com/uO1bH.png
