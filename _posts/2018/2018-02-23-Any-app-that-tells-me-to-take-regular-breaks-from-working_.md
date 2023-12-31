---
layout:       post
title:        >
    Any app that tells me to take regular breaks from working?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1008885
type:         Answer
tags:         software-recommendation
created_date: 2018-02-23 00:48:45
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "6,987 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-23-Any-app-that-tells-me-to-take-regular-breaks-from-working_.md
toc:          false
navigation:   false
clipboard:    false
---

# Lock Screen Timer

Lock Screen Timer is a small bash script I wrote to solve this question in **Ask Ubuntu**: [Application that will lock screen after a set amount of time for Ubuntu][1]

To adapt for work rest periods the audible beep can be removed as it would be distracting:

``` 
#          ogg123 '/usr/share/sounds/ubuntu/stereo/phone-outgoing-calling.ogg' ;
```

Place a `#` on line to comment out the command.

The pop-up bubbles warning that screen will be locked can be changed from:

``` 
   case $MINUTES in 1|2|3|5|10|15|30|45|60|120|480|960|1920)
```

to:

``` 
   case $MINUTES in 1|2|5|15|30|60|120|180|240|300|360)
```

Another simple change would be to **not** to implement the spinning pizza in the systray as shown in the link's animated screen.

A more complicated change would be a set Monday to Friday schedule for rest times. For example auto-launching by `cron` and locking screen at 10am, 12pm and 2pm. The advantage of this change is user won't have to key in the number of minutes until the next break. The disadvantage is the user can't key in the number of minutes until the next break.



  [1]: {% post_url /2016/2016-10-14-Application-that-will-lock-screen-after-a-set-amount-of-time-for-Ubuntu %}
