---
layout:       post
title:        >
    execute script on low UPS power
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1157949
type:         Answer
tags:         power-management hibernate ups nut
created_date: 2019-07-13 01:02:51
edit_date:    
votes:        "2 "
favorites:    
views:        "1,150 "
accepted:     Accepted
uploaded:     2025-04-28 15:55:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-13-execute-script-on-low-UPS-power.md
toc:          false
navigation:   false
clipboard:    false
---

Ubuntu automatically keeps track of all batteries status:

[![Ubuntu Batteries Statuses][1]][1]

The same information displayed in the GUI screen above can also be accessed from your terminal / shell / bash script (they are all sort of the same thing in many ways).



To get the same information from CLI use:

``` bash
$ upower -i $(upower -e | grep -i UPS)
  native-path:          /sys/devices/pci0000:00/0000:00:14.0/usb1/1-1/1-1.2/1-1.2:1.0/usbmisc/hiddev2
  vendor:               CPS
  model:                CP550HGa
  serial:               BFBB104#BI1.g
  power supply:         yes
  updated:              Fri 12 Jul 2019 06:35:56 PM MDT (12 seconds ago)
  has history:          yes
  has statistics:       yes
  ups
    present:             yes
    state:               fully-charged
    warning-level:       none
    time to empty:       25.5 minutes
    percentage:          100%
    icon-name:          'battery-full-charged-symbolic'
```

Then to narrow it down to percentage use:

``` bash
$ upower -i $(upower -e | grep -i UPS) | grep -i percentage
    percentage:          100%
```

Then to extract the second column use:

``` bash
$ upower -i $(upower -e | grep -i UPS) | grep -i percentage | cut -d':' -f2
          100%
```

Then to extract only digits and eliminate leading spaces and trailing % use:

``` bash
$ upower -i $(upower -e | grep -i UPS) | grep -i percentage | sed 's/[^0-9]*//g'
100
```

Now assign what you want to a variable and display it:

``` bash
$ PERCENT=$(upower -i $(upower -e | grep -i UPS) | grep -i percentage | sed 's/[^0-9]*//g')
$ echo $PERCENT
100
```

Next step is to write a script something like this

``` bash
#!/bin/bash

while true; do
    PERCENT=$(upower -i $(upower -e | grep -i UPS) | grep -i percentage \
        | sed 's/[^0-9]*//g')
    if [[ "$PERCENT" -lt 50 ]] ; then
        # email my cell phone
        mail -s "Electricity grid has shut down, run home" someone@example.com
        # text my cell phone
        curl -X POST https://textbelt.com/text --data-urlencode \
            phone="999-333-4567" --data-urlencode \
            message="Electricity grid has shot down, run home" -d key=textbelt
    fi
    sleep 300 # Sleep for 5 minutes to reduce resource usage
done
```

- emailing cell phone: [Use mail command](https://www.binarytides.com/linux-mail-command-examples/)
- texting cell phone: [How can I send mobile text message from terminal?]({% post_url /2018/2018-12-23-How-can-I-send-mobile-text-message-from-terminal_ %})

This is a script I would use, in your case adapt it to hibernate (I have a laptop so I never hibernate). My UPS is for window fan, not laptop which has it's own battery and is suspended when I'm at work. Technology can be used differently by different people.

  [1]: https://pippim.github.io/assets/img/posts/2019/z8aMp.png





