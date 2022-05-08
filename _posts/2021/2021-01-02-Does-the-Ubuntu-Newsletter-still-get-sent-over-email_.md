---
layout:       post
title:        >
    Does the Ubuntu Newsletter still get sent over email?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1304590
type:         Answer
tags:         canonical community
created_date: 2021-01-02 20:06:52
edit_date:    2021-01-24 15:29:09
votes:        "5 "
favorites:    
views:        "789 "
accepted:     
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-01-02-Does-the-Ubuntu-Newsletter-still-get-sent-over-email_.md
toc:          false
navigation:   false
clipboard:    false
---

You can read the newsletter by copying and pasting the address into your browser:

- [https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/Issue663](https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/Issue663)

For previous issues just decrement the number:

- [https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/Issue662](https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/Issue662)

Next week you would increment the number:

- [https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/Issue664](https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/Issue664)


----------

## Use `cron` to email yourself the newsletter link

**NOTE:** This was updated January 24, 2021. If you copied the script before that please revise it.

You could make a `cron` job that incremented the Issue Number and emailed you a link every week. It does take a few steps to setup `cron` for emailing though:

- [How do I set Cron to send emails?]({% post_url /2018/2018-04-04-How-do-I-set-Cron-to-send-emails_ %})

I made a sample bash script for `cron` to send a message each week with the Ubuntu Newsletter link. Create the script with `sudo` powers in `/etc/cron.weekly/ubuntu-newsletter`

``` bash
#!/bin/sh
# 
# Note: Some bash commands (#!/bin/bash) won't work in shell (#!/bin/sh)
#       Shell scripts are preferred over bash scripts for cron jobs.

# Each week /etc/cron.weekly/ubuntu-newletter will email new issue number
                
NextIssue=`cat /etc/cron.weekly/ubuntu-newsletter-issue`

[ -z ${NextIssue+x} ] && NextIssue=666    # First Time!

NextIssue=$(( NextIssue + 1 ))
echo "$NextIssue" > /etc/cron.weekly/ubuntu-newsletter-issue

echo "Weekly Ubuntu Newsletter is available for reading online:"
echo ""
echo https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/Issue"$NextIssue"
```

Then do a quick setup and test:

``` 
$ sudo chmod +x /etc/cron.weekly/ubuntu-newsletter

$ sudo /etc/cron.weekly/ubuntu-newsletter
cat: /etc/cron.weekly/ubuntu-newsletter-issue: No such file or directory
Weekly Ubuntu Newsletter is available for reading online:

https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/Issue666

$ ll /etc/cron.weekly/ubuntu*
-rwxr-xr-x 1 root root 444 Jan  2 13:56 /etc/cron.weekly/ubuntu-newsletter*
-rw-r--r-- 1 root root   4 Jan  2 13:57 /etc/cron.weekly/ubuntu-newsletter-issue
```
**NOTE:** After testing script for the first time use:

``` 
sudo chmod a+w /etc/cron.weekly/ubuntu-newsletter-issue
```

I had to use this on my system because the script doesn't give you write permissions to manually change the last Newsletter Issue number if and when you need to.

Each week `cron` will email you with the shell script's echo output:

## *Weekly Ubuntu Newsletter is available for reading online:*

**https://wiki.ubuntu.com/UbuntuWeeklyNewsletter/Issue666**

**NOTE:** On my system `cron` weekly runs every Saturday. You can manually change the last issue with:

``` 
sudo echo 666 > /etc/cron.weekly/ubuntu-newsletter-issue
```

In this case, the next time `cron` weekly runs, it will email you issue number 667.
