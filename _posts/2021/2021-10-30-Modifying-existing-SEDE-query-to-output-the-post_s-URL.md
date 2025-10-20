---
layout:       post
title:        >
    Modifying existing SEDE query to output the post's URL
site:         Meta Stack Exchange
stack_url:    https://meta.stackexchange.com/q/371425
type:         Question
tags:         support hyperlinks data-explorer
created_date: 2021-10-30 22:33:16
edit_date:    2021-11-25 12:34:01
votes:        "3 "
favorites:    
views:        "199 "
accepted:     Accepted
uploaded:     2025-10-19 18:25:39
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-10-30-Modifying-existing-SEDE-query-to-output-the-post_s-URL.md
toc:          false
navigation:   false
clipboard:    false
---

There is this existing SE Data Explorer query: [All my posts on the SE Network](https://data.stackexchange.com/stackoverflow/query/1407382/all-my-posts-on-the-se-network-with-markdown-and-html-content-plus-editors-and-s)

The query is awesome and works great with one small flaw (IMO). It outputs a "Post ID" which is useless for me because I need a "Post Link" which can be clicked and will take you to the **Answer** you posted in Stack Exchange. It's important to note *link to question* is not needed unless it is your own question of course.

Has anyone else experienced this and modified the query?

I tried for awhile to revise the query myself but I just ended up breaking things. I can post the entire query code if necessary.
