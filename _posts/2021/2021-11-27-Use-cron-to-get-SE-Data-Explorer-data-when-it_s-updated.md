---
layout:       post
title:        >
    Use cron to get SE Data Explorer data when it's updated
site:         Meta Stack Exchange
stack_url:    https://meta.stackexchange.com/q/372300
type:         Question
tags:         support data-explorer data-dump
created_date: 2021-11-27 00:52:32
edit_date:    2021-11-27 11:11:12
votes:        "5 "
favorites:    
views:        "123 "
accepted:     
uploaded:     2025-11-23 17:42:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-11-27-Use-cron-to-get-SE-Data-Explorer-data-when-it_s-updated.md
toc:          false
navigation:   false
clipboard:    false
---

According to [this answer from 2012][1], the SE Data Explorer data is updated every Sunday at 3am. If true, is it possible to schedule a cron job to run every Monday and execute [this query][2]? 

When the query finishes it would need to download the results in CSV format somewhere.

More specifically - is there a simple way I can run a query against SEDE directly from the terminal? 

----------

### Concerns

I imagine it's a little complicated getting cron authenticated by Stack Exchange Data Explorer. I've never run cron with my own User ID. It always runs as `sudo` either every 15 minutes to execute `updatedb` or via scripts in `/etc/cron.daily`, `/etc/cron.weekly` and `/etc/cron.monthly`. SE always wants authentication when I run a DE query as a "normal" user. I have never used cron for signing into a site, running a query, waiting for results, clicking a "download" button, and logging out. It sounds horribly complicated giving cron an X11 session, a GUI Desktop and a browser.

[1]: [this answer from 2012](this answer from 2012)
[2]: [this query](this query)
