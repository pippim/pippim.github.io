---
layout:       post
title:        >
    Can you have too much swap?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1020960
type:         Answer
tags:         16.04 partitioning ram swap disk-usage
created_date: 2018-04-01 00:53:49
edit_date:    2018-04-08 17:20:46
votes:        "2 "
favorites:    
views:        "9,927 "
accepted:     
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-01-Can-you-have-too-much-swap_.md
toc:          false
navigation:   false
clipboard:    false
---

## How much SWAP does hibernation really need?

It's a misconception that you need RAM x 2 for SWAP size when you use hibernation. The swap size needs to be the size of **used RAM** not **Installed RAM**. Generally swap size needs to be 2/5th of installed RAM. To find out the bare-minimum amount of RAM needed for use:

``` 
$ cat /sys/power/image_size
3153907712
```

On this 8 GB RAM machine 3 GB minimum is needed to hibernate.

You can tweak the values in `image_size` for a smaller swap size with risk of failure. You can tweak it for a larger swap size and possibly speeding up the hibernation speed.

Reference: [https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate](https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate)


----------

## 16 MB RAM in 1995, different rules for 16 GB RAM in 2018

In the days when you had 16 MB Ram, x 2 for 32 MB swap on your 720 MB hard drive made sense. A little RAM and HDD history in this [1995 Washington Post article][1].  

23 years later some technical articles from that 1995 (although I didn't find any) might be found to mislead new users. I did however find a 2007 article recommending [SWAP = RAM x 2][2].

Back in 1995 32 MB Swap out of 760 MB HDD was 4% of HDD. Indeed the swap partition may have been used a lot in 1995. Today in 2018, 16 GB RAM x 2 for 32 GB SWAP on your 256 GB SSD doesn't make the same sense as it is taking 13% of SSD. Today my 8 GB SWAP partition isn't being used at all unless I force it to fill it up when testing OOM-Killer: [Google Chrome will take up my memory to the point where it causes my computer to freeze to a near halt. What can I do to prevent this?][3].


  [1]: https://www.washingtonpost.com/archive/business/technology/1995/04/26/packard-bell-multimedia-easy-does-it/c127c133-a439-4b38-94f8-115965dbba85/?utm_term=.e2fa6b8f2275
  [2]: https://www.linux.com/news/all-about-linux-swap-space
  [3]: {% post_url /2016/2016-08-28-Google-Chrome-will-take-up-my-memory-to-the-point-where-it-causes-my-computer-to-freeze-to-a-near-halt.-What-can-I-do-to-prevent-this_ %}
