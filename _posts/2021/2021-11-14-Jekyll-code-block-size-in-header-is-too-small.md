---
layout:       post
title:        >
    Jekyll code block size in header is too small
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/69967570
type:         Answer
tags:         css jekyll github-pages rouge
created_date: 2021-11-14 22:08:25
edit_date:    2021-11-14 22:40:13
votes:        "0 "
favorites:    
views:        "41 "
accepted:     Accepted
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

# Change `0.9rem` to `92%`

As shown below I've fixed the problem:

[![enter image description here][1]][1]

---

## Steps taken

I made the fix by first copying the entire file `https://github.com/pages-themes/cayman/blob/master/_sass/jekyll-theme-cayman.scss` to my repo's `_sass/` subdirectory.

Then I changed `font-size: 0.9rem` line below to `font-size: 92%;`:

``` css
  code {
    padding: 2px 4px;
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 92%;  // Change 0.9rem to 92% for proper size in headings
    color: $code-text-color;
    background-color: $code-bg-color;
    border-radius: 0.3rem;
  }
```

## Drawbacks

I don't like the fact if the Cayman Theme repo makes changes to this file I will not gain them as 398 lines of this file are now permanently in my own repo.

That said, I can live with this solution for now. If I improve it I will come back and update this answer.


  [1]: https://i.stack.imgur.com/fH6te.png
