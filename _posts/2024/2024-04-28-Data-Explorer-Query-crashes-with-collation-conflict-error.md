---
layout:       post
title:        >
    Data Explorer Query crashes with collation conflict error
site:         Meta Stack Exchange
stack_url:    https://meta.stackexchange.com/q/399418
type:         Question
tags:         support status-completed data-explorer error-message jquery
created_date: 2024-04-28 17:12:16
edit_date:    2024-06-17 22:58:09
votes:        "7 "
favorites:    
views:        "252 "
accepted:     
uploaded:     2024-08-11 16:59:15
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2024/2024-04-28-Data-Explorer-Query-crashes-with-collation-conflict-error.md
toc:          false
navigation:   false
clipboard:    false
---

I have a [website](https://www.pippim.com/answers.html) built off my Q & A posted in Stack Exchange sites such as; Ask Ubuntu, Stack Overflow, SE Security, etc.

Data Explorer is used to scrape ALL Stack Exchange Q & A I've posted and download the query results for filtering by a python script and publishing to GitHub Pages. There are `310` Questions and `2,181` Answers, of which `54` and `1,135`, respectively, are worthy of publication.

Data Explorer has been working fine for a few years but today it crashed with error:

> Line 11: Cannot resolve collation conflict between  
"SQL_Latin1_General_CP1_CI_AS" and "SQL_Latin1_General_CP1_CS_AS"
in CASE operator occurring in GROUP BY statement column 4.

Here is the [data explorer query](https://data.stackexchange.com/stackoverflow/query/1529864/all-my-posts-on-the-se-network-with-markdown-and-html-content-plus-editors-and-s), last changed on December 12, 2021.

How do I debug this error?

---

# Problem fixed

A week after posting question the problem was [fixed](https://www.pippim.com/2024/04/28/Data-Explorer-Query-crashes-with-collation-conflict-error.html):

[![enter image description here][1]][1]


### Many thanks for the answers posted below!

  [1]: https://pippim.github.io/assets/img/posts/2024/195OOXx3.png
