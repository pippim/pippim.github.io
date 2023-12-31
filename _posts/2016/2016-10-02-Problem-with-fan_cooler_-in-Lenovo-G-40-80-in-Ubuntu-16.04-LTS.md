---
layout:       post
title:        >
    Problem with fan(cooler) in Lenovo G 40-80 in Ubuntu 16.04 LTS
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/832250
type:         Answer
tags:         14.04 drivers lenovo overheating fan
created_date: 2016-10-02 14:53:23
edit_date:    
votes:        "1 "
favorites:    
views:        "936 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-02-Problem-with-fan_cooler_-in-Lenovo-G-40-80-in-Ubuntu-16.04-LTS.md
toc:          false
navigation:   false
clipboard:    false
---

Your fan is running slow and you are concerned but, you do not have a problem here.

Your temperature was revealed by typing:

``` 
cat /sys/class/thermal/thermal_zone*/temp
```

And the result returned was 41 degrees Celsius. **This is a very good result!**

By comparison my machine the fan runs on medium and the temperature is 65 degrees Celsius. All though the keyboard is "warm" it is not "hot" so I consider mine to be "good".

Your fan is automatically controlled by the ACPI. In order to make your fan run faster, you'd have to make the CPU hotter and the best way to do that is run some 3D games with high frame rates.

The recommendation to upgrade to 16.04 may make your machine run hotter (and therefore the fan run faster) as it for me with my--Intel 3rd generation Ivy Bridge i7 3630QM CPU.
