---
layout:       post
title:        >
    Which option ("internet site", "internet with smarthost", "satellite system") should I choose in postfix configuration?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1333380
type:         Answer
tags:         configuration email postfix
created_date: 2021-04-23 11:04:31
edit_date:    
votes:        "0 "
favorites:    
views:        "9,361 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-04-23-Which-option-__internet-site__-_internet-with-smarthost__-_satellite-system__-should-I-choose-in-postfix-configuration_.md
toc:          false
navigation:   false
clipboard:    false
---

## The Issue

*"My primary interest is to have a way for non-interactive programs running on my desktop (mostly daemons and cron jobs) to send notifications to my mobile phone (either to my current email address or to the SMS client on my mobile phone)."*

## The Alternative

In my answer for [How do I set Cron to send emails? [duplicate]](https://askubuntu.com/a/1021764/307523) I used `ssmtp`. In the same thread you will find a solution using `postfix` which may interest you though.

As far as getting cell phone text messages I have another answer:

- [How can I send mobile text message from terminal?]({% post_url /2018/2018-12-23-How-can-I-send-mobile-text-message-from-terminal_ %})

If you are keen on pursuing a postfix only solution here is a good tutorial:

- [How to Install and Configure Postfix on Ubuntu 18.04 | 16.04](https://websiteforstudents.com/how-to-install-and-configure-postfix-on-ubuntu-18-04-16-04/)
