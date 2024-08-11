---
layout:       post
title:        >
    How to get SE sstatic images for my website
site:         Meta Stack Exchange
stack_url:    https://meta.stackexchange.com/q/401950
type:         Question
tags:         discussion data-explorer images data-dump imgur-image-hosting
created_date: 2024-08-05 19:37:15
edit_date:    
votes:        "8 "
favorites:    
views:        "179 "
accepted:     Accepted
uploaded:     2024-08-11 16:59:15
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2024/2024-08-05-How-to-get-SE-sstatic-images-for-my-website.md
toc:          false
navigation:   false
clipboard:    false
---

I've written about 2,500 questions and answers in Stack Exchange sites. About half of them I scrape into my [website](https://www.pippim.com/answers.html) on GitHub Pages for customized presentation and searching.

A short time ago all the images disappeared because of SE's switch from `imgur` server to `sstatic` server. I've read on other posts that my website likely wouldn't be put on the "allow list".

I will have to programmatically change links. For example, consider this `grep` output:

> 2024/2024-04-28-Data-Explorer-Query-crashes-with-collation-conflict-error.md:47:  [1]: [https://i.sstatic.net/195OOXx3.png](https://i.sstatic.net/195OOXx3.png)g  

The Github Pages markdown would change to:

``` 
[1]: https://www.pippim.com/assets/img/_posts/2024/195OOXx3.png
```

Changing the Kramdown (markdown) is the easy part. The hard part is downloading all the images. Consider the number of images:

``` shell
$ grep sstatic _posts/*/* | wc -l
480
```

480 manual downloads is too tedious. The website is refreshed weekly (after SE's Sunday data dump) with a simple bash command and any new images would also need to be manually downloaded.

The only method I can think of is passing a list of `sstatic` URLs to a python script which uses selenium to open Chromium to open Google Search to open the link to use image save as and then close the image tab.

From then on, only image URLs for new posts since the last refresh need to be downloaded with the python script. Selenium is OK but it uses a lot of CPU resources and programming is awkward.

***Is there an easier way to download a list of images from `sstatic.net`?***
