---
layout:       post
title:        >
    A SEDE query that worked for years is now timing out for the last ten attempts
site:         Meta Stack Exchange
stack_url:    https://meta.stackexchange.com/q/403611
type:         Question
tags:         support bug data-explorer
created_date: 2024-10-13 23:03:19
edit_date:    2024-12-22 18:43:16
votes:        "10 "
favorites:    
views:        "307 "
accepted:     Accepted
uploaded:     2025-01-01 04:48:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2024/2024-10-13-A-SEDE-query-that-worked-for-years-is-now-timing-out-for-the-last-ten-attempts.md
toc:          false
navigation:   false
clipboard:    false
---

The SEDE query [All my posts on the SE network (with Markdown and HTML content plus editors and status)](https://data.stackexchange.com/stackoverflow/query/1529864) has been working for years, however over the last week, and the last ten attempts, this error appears:

> Line 0: Execution Timeout Expired. The timeout period elapsed prior to completion of the operation or the server is not responding.  

I'm using the same account as always, *4775729*. (My own)

## Proposed duplicate

Another question from 2017 was proposed to be a duplicate:

- ["Execution Timeout Expired" for some popular queries on data.stackexchange.com](https://meta.stackexchange.com/questions/304621/execution-timeout-expired-for-some-popular-queries-on-data-stackexchange-com)

That question however doesn't refer to a specific query. The query in this question can actually be looked at and a solution proposed. For example, someone might propose adding a line (or two) of code that uses an index.

## Problem solved December 22, 2024

Stack Exchange Data Explorer may have been modified. In any case, after failing for many months, the query now works again. Proof is this question is now visible on my website:

[![Proof website working][1]][1]


  [1]: https://pippim.github.io/assets/img/posts/2024/8UpebzTK.png
