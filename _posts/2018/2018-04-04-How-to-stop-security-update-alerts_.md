---
layout:       post
title:        >
    How to stop security update alerts?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1022079
type:         Answer
tags:         updates
created_date: 2018-04-04 23:28:06
edit_date:    
votes:        "0 "
favorites:    
views:        "116 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-04-How-to-stop-security-update-alerts_.md
toc:          false
navigation:   false
clipboard:    false
---

I was going to post a question on this myself.

[![update never.png][1]][1]

 I had set up all updates to never and every day it kept nagging me to update 500 MB of "stuff". I used the most current kernels from Ubuntu Mainline so got all my REPTOLINE spectre fix and KOPTI meltdown fix sooner than everyone else: [What is Ubuntu&#39;s status on the Meltdown and Spectre vulnerabilities?][2]

Finally one day I accidentally updated everything, or it updated it anyway and now the messages to update no longer appear.

So if you set it to never **after** it's sent you the message once it will still nag you.

I've noticed comments tell you never to say never. However I was concerned with a raft of bugs that started appearing when Ubuntu team rushed out meltdown and spectre fixes.

Ironically there is no real virus and memory leaks only occur at 2KB per second when Speculative Execution Branching gets past 26 branches without a hit, or something like that. So on a 8 GB RAM machine would take a very, very long time to scrape all the memory. Not to mention some "brainiac" still has to piece it altogether.


  [1]: https://i.stack.imgur.com/VGCjI.png
  [2]: {% post_url /2018/2018-01-05-What-is-Ubuntu_s-status-on-the-Meltdown-and-Spectre-vulnerabilities_ %}
