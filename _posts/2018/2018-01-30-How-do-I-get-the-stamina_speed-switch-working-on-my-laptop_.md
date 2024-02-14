---
layout:       post
title:        >
    How do I get the stamina/speed switch working on my laptop?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1001316
type:         Answer
tags:         battery vaio sony
created_date: 2018-01-30 11:20:39
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "2,445 "
accepted:     
uploaded:     2024-02-14 06:19:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-30-How-do-I-get-the-stamina_speed-switch-working-on-my-laptop_.md
toc:          false
navigation:   false
clipboard:    false
---

# Sony's Stamina / Speed Modes

Sony is renaming something already known to most as nVidia Optimus Technology. From [Sony's documentation][1]:


  1.  **Stamina Mode** uses the Intel Graphics Media Accelerator for lower power consumption. It disables some hardware devices on your computer to conserve battery power.
  2.  **Speed Mode** uses the NVIDIA Video Controller for improved and faster performance.


Within Linux nVidia uses `prime-select intel` or `prime-select nvidia` to switch modes.

  [1]: https://sony-paa-pa-en-web--paa.custhelp.com/app/answers/detail/a_id/12698/~/what-is-the-difference-between-stamina-and-speed-mode%3F
