---
layout:       post
title:        >
    Why is running Wine with sudo dangerous?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/947935
type:         Answer
tags:         permissions wine sudo root
created_date: 2017-08-20 00:27:41
edit_date:    
votes:        "3 "
favorites:    
views:        "5,514 "
accepted:     
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-20-Why-is-running-Wine-with-sudo-dangerous_.md
toc:          false
navigation:   false
clipboard:    false
---

You could become victim to [Wanna Cry Ransomware][1] when running as `sudo`. This was confirmed in two separate answers.

You could become victim to the [Petya Ransomware][2] when running as root as per the accepted answer.

To summarize as a Linux user you too can fall victim to the most famous $300 bitcoin in payment Ransomwares of 2017 only if you run `wine`  with `sudo` and get infected.


  [1]: https://askubuntu.com/questions/914623/what-is-the-wanna-cry-ransomwares-possible-impact-on-linux-users
  [2]: https://askubuntu.com/questions/930083/how-can-the-petya-ransomware-virus-affect-linux-users
