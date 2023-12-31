---
layout:       post
title:        >
    What are the acceptable number of close votes to initiate per day?
site:         Ask Ubuntu Meta
stack_url:    https://meta.askubuntu.com/q/17132
type:         Question
tags:         discussion vote-to-close
created_date: 2017-07-20 00:04:12
edit_date:    2017-07-24 05:39:05
votes:        "5 "
favorites:    
views:        "202 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-20-What-are-the-acceptable-number-of-close-votes-to-initiate-per-day_.md
toc:          false
navigation:   false
clipboard:    false
---

I've started a VTC project based on [abandoned questions about EOL Ubuntu versions][1]. Tonight I VTC'd only one so far: [Boot failure after shutdown during upgrade from 11.10 to 12.04][2].

However over the last few nights I've probably VTC'd 20 or 30. I'm wondering what the etiquette is for how many per night to VTC using the same old same old "not reproducible" reason?

Because the VTC candidates are derived from SQL I could go nuts and VTC my max 50 flags per day. I haven't written a query to count how candidates there are but it could be many thousand.

So what would be an appropriate number to VTC each day without annoying you? 5, 10, 20?


----------

Here is the query:



``` sql
SELECT p.Title, p.Id, p.Score, p.ViewCount, p.CreationDate, p.ClosedDate, p.AnswerCount, u.DisplayName
FROM Posts p
JOIN Users u ON p.OwnerUserId = u.Id
WHERE p.PostTypeId = 1
AND p.AnswerCount = 0
and p.ClosedDate is null
order by p.CreationDate ASC
```

In total there are **43,981** unanswered questions.

  [1]: https://meta.askubuntu.com/questions/17094/can-we-merge-these-three-qas-about-abandoned-questions-on-main
  [2]: https://askubuntu.com/questions/127013/boot-failure-after-shutdown-during-upgrade-from-11-10-to-12-04
