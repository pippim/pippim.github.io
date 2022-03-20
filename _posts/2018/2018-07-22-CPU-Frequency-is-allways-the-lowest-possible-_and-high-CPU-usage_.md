---
layout:       post
title:        >
    CPU Frequency is allways the lowest possible (and high CPU usage)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1058409
type:         Answer
tags:         16.04 performance cpu
created_date: 2018-07-22 15:46:43
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "2,321 "
accepted:     Accepted
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-22-CPU-Frequency-is-allways-the-lowest-possible-_and-high-CPU-usage_.md
toc:          false
navigation:   false
clipboard:    false
---

## Dead battery

A battery below 5% charge is a critical issue and all sorts of exceptions will be implemented by the software. This might include limiting speed until battery goes above 10-30% charge. Which in your case would never happen. You could probably pick up a used / refurbished battery fairly cheaply on eBay or Amazon.

----------

## Set to Performance governor in `cpufrequtils`

From this **[Ask Ubuntu answer][1]**, follow these steps:

Edit the following file (if it doesn't exist, create it):

``` 
sudo nano /etc/default/cpufrequtils
```

And add the following line to it:

``` 
GOVERNOR="performance"
```

Save and exit.

For changes to immediately take effect without rebooting, run:

``` 
sudo /etc/init.d/cpufrequtils restart
```

Then you can run `cpufreq-info` to see informations about your cpu frequency, governor and more:

``` 
$ cpufreq-info
current policy: frequency should be within 800 MHz and 3.90 GHz.
          The governor "performance" may decide which speed to use
          within this range.
```


----------

From another answer [Setting to High Performance][2]: you can see CPU frequency differences between **Powersave** and **Performance** governors:

## Performance Mode

In **performance** mode you will then notice CPU% utilization drops by about 5% but also notice speed will increase from about 1000 MHz to 3000 MHz and temperatures will spike by ~10 degree, depending on your processor:

[![CPU Performance mode.gif][3]][3]


----------

## Powersave mode

[![CPU powersave.gif][4]][4]

Switching back to **powersave** mode CPU% utilization has spiked by 5%, but CPU frequency has dropped by 1500 MHz and temperature has decreased by about 10 degrees. Overall **powersave** mode is the best for most configurations.


  [1]: https://askubuntu.com/a/936488/307523
  [2]: {% post_url /2018/2018-06-19-Setting-to-High-Performance %}
  [3]: https://i.stack.imgur.com/imYi5.gif
  [4]: https://i.stack.imgur.com/q5cuK.gif
