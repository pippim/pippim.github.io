---
layout:       post
title:        >
    Is it possible to show ip address on top bar near the time?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1025026
type:         Answer
tags:         17.10
created_date: !!str "2018-04-14 17:44:41"
edit_date:    !!str ""
votes:        !!str "3"
favorites:    
views:        !!str "3,184"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

## Screenshot

[![indicator sysmonitor screenshot.png][1]][1]

## Discover your current DCHP IP address

This answer should work for most Ubuntu distributions. The first step is discovering your current IP address. According to this [Linux & Unix answer][2] it isn't stored on disk in the same location across distributions. For a portable solution you need to use:

``` 
default_interface=$(route -n | awk '$1 == "0.0.0.0" {print $8; exit}')
ip_address=$(ifconfig "$default_interface" | awk 'sub(/.* inet addr:/, "") {print $1}')
echo $ip_address
192.168.1.66

```

## Install Sysmonitor Indicator

You now need an Application Indicator that to let's you pick and choose the information to display in the Systray / Application Notification Area. I use [Sysmonitor Indicator][3]. To summarize the installation instructions in the link:

``` 
sudo add-apt-repository ppa:fossfreedom/indicator-sysmonitor
sudo apt-get update
sudo apt-get install indicator-sysmonitor

```

You need to configure the name of the bash script that is called and the update interval in the `Advanced` tab of the `Preferences` panel:

[![indicator sysmonitor custom.png][4]][4]

Highlight the `Custom` option and click the `Edit` button:

[![indicator sysmonitor custom edit.png][5]][5]

Here's a complaint I have to the developer the input field for the command is abnormally small. You can't see the whole command you are typing all at once and need arrow keys to scroll through it. Anyway assign the bash script filename. I used:

``` 
~/bin/indicator-sysmonitor-display

```

I already have a main bash script so I created an abbreviated version for this answer.

## Create the script

Using the code from the first section create the file `~/bin/indicator-sysmonitor-display` containing:

``` 
#!/bin/bash

default_interface=$(route -n | awk '$1 == "0.0.0.0" {print $8; exit}')
systray=$(ifconfig "$default_interface" | awk 'sub(/.* inet addr:/, "") {print $1}')

echo "$systray" # sysmon-indidicator will put echo string into systray for us.

exit 0

```


  [1]: https://i.stack.imgur.com/vjFpA.png
  [2]: https://unix.stackexchange.com/a/178256/200094
  [3]: http://www.webupd8.org/2014/05/ubuntu-appindicator-that-displays-bash.html
  [4]: https://i.stack.imgur.com/fKUaB.png
  [5]: https://i.stack.imgur.com/h22bZ.png
