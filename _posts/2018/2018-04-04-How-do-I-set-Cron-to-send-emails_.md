---
layout:       post
title:        >
    How do I set Cron to send emails?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021764
type:         Answer
tags:         command-line cron email rm
created_date: 2018-04-04 01:50:29
edit_date:    2018-08-05 17:11:21
votes:        "6 "
favorites:    
views:        "29,616 "
accepted:     
uploaded:     2022-09-15 05:40:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-04-How-do-I-set-Cron-to-send-emails_.md
toc:          false
navigation:   false
clipboard:    false
---

I used a pretty simple method to get `cron` to send emails: [Backup Linux configuration, scripts and documents to Gmail][1].

## Simplest way to automate sending email

From [Send email alerts using ssmtp][2] we find the simplest way of sending email automated from terminal or script. The installation steps are straight forward:

``` 
sudo apt install ssmtp
sudo nano /etc/ssmtp/ssmtp.conf
# Change "MyEmailAddress" and "MyPassword" to your own.
```

There  is one step not mentioned; Google will send you an email confirming you want to allow a "less secure" application to send mail with your account:

[![gmail turns on less secure apps for email][3]][3]

There is an annoyance of getting too much mail. For example every time you mistype your `sudo` password you will get an email: [Stop emailing me bad sudo password attempts][4]


  [1]: {% post_url /2017/2017-06-06-Backup-Linux-configuration_-scripts-and-documents-to-Gmail %}
  [2]: https://help.ubuntu.com/community/EmailAlerts
  [3]: https://i.stack.imgur.com/gl693.png
  [4]: https://askubuntu.com/questions/986696/stop-emailing-me-bad-sudo-password-attempts
