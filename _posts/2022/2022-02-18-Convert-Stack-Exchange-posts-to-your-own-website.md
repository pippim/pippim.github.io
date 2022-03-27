---
layout:       post
title:        >
    Convert Stack Exchange posts to your own website
site:         Stack Apps
stack_url:    https://stackapps.com/q/9329
type:         Question
tags:         app
created_date: 2022-02-18 02:52:22
edit_date:    
votes:        "3 "
favorites:    
views:        "63 "
accepted:     
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-02-18-Convert-Stack-Exchange-posts-to-your-own-website.md
toc:          false
navigation:   false
clipboard:    false
---

<!-- thumbnail: [https://example.com/some-image.pn](https://example.com/some-image.pn)g -->
<!-- version: 1.0 -->
<!-- tag: a-tag-on-the-post -->
<!-- excerpt: Up to 200 characters of excerpt -->

## Screenshot - Website Home Page

When you visit the Pippim Website, which you can **quickly** rebrand as your own, the [Home Page](https://pippim.github.io/index.html#) on GitHub Pages looks like this:

[![Pippim Introduction.png][1]][1]


## Screenshot - Convert Stack Exchange to GitHub Pages

Parsing thousands of your posts on Stack Exchange, picking over a thousand of the best, and publishing them on your own GitHub Pages website, is as quick as this:

[![stack-to-blog progress display.gif][2]][2]

## About

After seven years of posting answers in Stack Exchange it got to the point I couldn't remember all the ones I had posted. So I created a website with all my good SE posts and excluding most of the questions which often are quite naive. The website gets hosted for free on GitHub Pages. The website is free from the distractions of Stack Exchange ads and promotional links.

The SE search engine uses an "AND" algorithm making it difficult to recall my own posts. So the Pippim site search engine uses an "OR" algorithm yielding better results.

The conversion program selectively inserts Table of Contents and Section Navigation Bars on larger posts and provides "Copy Code Block to System Clipboard" function when there are many lines requiring a scroll bar.

You can take the Pippim website, change a few lines and then instantly have your own website, with your own name, own catch phrase and all of your own Stack Exchange Posts.

### License

MIT license.

### Download

Create a free website repository on [GitHub Pages](https://docs.github.com/en/pages/quickstart).

Clone the [Pippim website](https://github.com/pippim/pippim.github.io).

Change Jekyll Front Matter in `/_config.yml` to your own brand:

``` yaml
theme: jekyll-theme-cayman
# The title: appears frequently on my pages. It's your company / personal name
title: Pippim
description: Free Open-Source Software for the World. Free of Ads Too!
# Link to content on the repo
code_url: https://github.com/pippim/pippim.github.io/blob/main
```

Pull a copy of your new website to your local drive `~/website2`.

Create a copy of `~/website2` (using `cp` command not `git pull` or `git clone`!) to a new directory `~/website`:

Run the Stack Exchange Data Explorer query: [All my posts on the SE network (with Markdown and HTML content plus editors and status)](https://data.stackexchange.com/stackoverflow/query/1529864/all-my-posts-on-the-se-network-with-markdown-and-html-content-plus-editors-and-s)

Change to the directory `~/website/sede` and run the script `rerefresh.sh`.

More elaborate instructions with screenshots are documented on the [Pippim Website](https://pippim.github.io/stack.html#)

### Platform

The website runs on any modern Browser except Internet Explorer. 

The python programs to convert Stack Exchange to GitHub Pages will not run on an Android or Apple Smart Phone. Only Linux, Windows and Mac. You can change your website with a Smart Phone though.

## Contact

You can drop a comment below this post. You can also:

- 📧 Send an Email to Pippim at pippim.com@gmail.com

- Open a [new issue](https://github.com/pippim/pippim.github.io/issues) on the Pippim website.


## Code

The languages are Git, Jekyll, Liquid, Ruby, Kramdown, Rouge, SE Markdown, Stack Exchange Data Explore (SQL-like), Python, Sass, HTML, CSS, SCSS, Javascript and Bash.

All the source code is on the [Pippim Website](https://github.com/pippim/pippim.github.io)

No one is needed to contribute to the code at this time. But if you have any suggestions please leave one below. You can also [open an issue](https://github.com/pippim/pippim.github.io/issues) on the GitHub Pages repo.


## Summary

There is much more to explore on the [Pippim Website](https://pippim.github.io/index.html). Be sure to check out the "Answers" page and see the how a thousand Stack Exchange Posts are neatly organized and instantly accessed.

Keep in mind this is brand new technology (including the site search engine) and not as elegantly documented as it can be.

  [1]: https://i.stack.imgur.com/HFx4r.png
  [2]: https://i.stack.imgur.com/2FmfX.gif
