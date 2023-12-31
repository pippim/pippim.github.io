---
layout:       post
title:        >
    Teamviewer on Jetson nano: CheckCPU: unknown architecture aarch64
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182254
type:         Answer
tags:         18.04 nvidia teamviewer
created_date: 2019-10-19 22:20:10
edit_date:    
votes:        "1 "
favorites:    
views:        "3,438 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-19-Teamviewer-on-Jetson-nano_-CheckCPU_-unknown-architecture-aarch64.md
toc:          false
navigation:   false
clipboard:    false
---

FTR I found this first and then saw the comment saying you check it out:

- [unknown architecture 'aarch64'][1] 

> I was able to solve this by adding aarch64 to the checks performed by  
> the start script. Navigate to where teamviewer is installed (for me  
> this was /opt/teamviewer). Navigate further to tv_bin/script. Open  
> tvw_main and find the section where it checks the architecture  
> (CheckCPU function). Where you see ( armv71 ), add aarch64, so the  
> line now reads ( armv71 | aarch64 ). Then try running it again (run  
> "teamviewer" from the terminal).  


The solution didn't work for two other users though..

  [1]: https://community.teamviewer.com/t5/Linux/unknown-architecture-aarch64/td-p/55938
