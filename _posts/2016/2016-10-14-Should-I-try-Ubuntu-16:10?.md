---
layout:       post
title:        >
    Should I try Ubuntu 16:10?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/836937
type:         Answer
tags:         16.04 16.10
created_date: 2016-10-14 10:31:50
edit_date:    
votes:        "1 "
favorites:    
views:        "258 "
accepted:     Accepted
uploaded:     2022-01-14 04:38:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-14-Should-I-try-Ubuntu-16:10?
toc:          false
navigation:   false
clipboard:    false
---

It's a fairly minor upgrade. Probably best to read a few reviews like this one: [ubuntu-16-10-new-features][1] and see if there is something you would benefit from. Note that some of the new features, such as a newer version of LibreOffice you can download yourself within Ubuntu 16.04. Personally the new version of Nautilus 3.20 looks appealing to me.

Missing from your question is "When should I upgrade?". I would wait a couple weeks to see if others on similar platforms encountered bugs upgrading and then monitor when fixes become available.

Also missing from your question is "What is the safest way to upgrade?". I would create a new partition, copy my existing 16.04 programs and data to it and perform the upgrade there. My existing 16.04 partition would be called my "Production Environment" and the new partition would be called my "Test Environment". I would dual boot between the two environments to compare differences and test new the version's stability.

I'm already using the new version of Kernel 4.8.1 that Ubuntu 16.10 will be supporting so a benefit using Ubuntu 16.10 is official support for the Kernel which technically isn't supported by Ubuntu 16.04 LTS I'm using now.

  [1]: http://www.omgubuntu.co.uk/2016/10/download-ubuntu-16-10-new-features
