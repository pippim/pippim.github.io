---
layout:       post
title:        >
    How do I fix very slow scrolling USB wheel mouse (after waking from suspend) which started after upgrade to 19.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138030
type:         Answer
tags:         usb suspend 19.04 mouse-scroll
created_date: 2019-04-25 11:24:27
edit_date:    2020-06-12 14:37:07
votes:        "7 "
favorites:    
views:        "6,448 "
accepted:     Accepted
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-25-How-do-I-fix-very-slow-scrolling-USB-wheel-mouse-^after-waking-from-suspend^-which-started-after-upgrade-to-19.04^.md
toc:          false
navigation:   false
clipboard:    true
---

# ResetMsMice

A special program has been released to reset Microsoft Mice when dual booting Windows and Linux experiences insanely fast scrolling. It has just been confirmed to work for Ubuntu 19.04 suspend/resume problem of insanely slow scrolling.

Go to this site: [https://sourceforge.net/projects/resetmsmice/](https://sourceforge.net/projects/resetmsmice/)

Click the link for: `resetmsmice_1.1.3_amd64.deb`

It is instantly downloaded to your `~/Downloads` folder.

To install it use:

``` 
sudo dpkg -i ~/Downloads/resetmsmice_1.1.3_amd64.deb
rm -f ~/Downloads/resetmsmice_1.1.3_amd64.deb
```

The program automatically runs during boot but you can also call it from the terminal at any time with:

``` 
resetmsmice
```

To automatically call it after resuming you need to create a script with `gedit`.

<!-- Language-all: lang-bash -->
Use `sudo -H gedit /lib/systemd/system-sleep/resetmsmice`

Copy these lines into the editor:

``` 
#!/bin/bash
case $1/$2 in
  pre/*)
    echo "$0: Going to $2..."
        ;;
  post/*)
    echo "$0: Waking up from $2..."
    resetmsmice
        ;;
esac
```

The `echo` statements help you locate your program in system logs, eg `grep resetmsmice` Save the file and exit the editor. Then use:

``` 
sudo chmod a+x /lib/systemd/system-sleep/resetmsmice
```


----------

# Original Answer

You can power off the USB mouse during suspend and power it on during resume. This will simulate a reboot.

<!-- Language-all: lang-bash -->
Use `sudo -H gedit /lib/systemd/system-sleep/custom-xhci_hcd`

Copy these lines into the editor:

{% include copyHeader.html %}
``` 
#!/bin/bash

# Original script was using /bin/sh but shellcheck reporting warnings.

# NAME: custom-xhci_hcd
# PATH: /lib/systemd/system-sleep
# CALL: Called from SystemD automatically
# DESC: Suspend broken for USB3.0 as of Oct 25/2018 various kernels all at once

# DATE: Oct 28 2018.

# NOTE: From comment #61 at: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/522998

TMPLIST=/tmp/xhci-dev-list

# Original script was: case "${1}" in hibernate|suspend)

case $1/$2 in
  pre/*)
    echo "$0: Going to $2..."
    echo -n '' > $TMPLIST
          for i in `ls /sys/bus/pci/drivers/xhci_hcd/ | egrep '[0-9a-z]+\:[0-9a-z]+\:.*$'`; do
              # Unbind xhci_hcd for first device XXXX:XX:XX.X:
               echo -n "$i" | tee /sys/bus/pci/drivers/xhci_hcd/unbind
           echo "$i" >> $TMPLIST
          done
        ;;
  post/*)
    echo "$0: Waking up from $2..."
    for i in `cat $TMPLIST`; do
              # Bind xhci_hcd for first device XXXX:XX:XX.X:
              echo -n "$i" | tee /sys/bus/pci/drivers/xhci_hcd/bind
    done
    rm $TMPLIST
        ;;
esac
```

Save the file and exit the editor. Then use:

``` 
sudo chmod a+x /lib/systemd/system-sleep/custom-xhci_hcd
```


----------

Ubuntu 19.04 upgrade delivers the new Linux 5.0 kernel with new drivers. After future upgrades are done, deactivate the script to see if the problem has been fixed in new kernels.
