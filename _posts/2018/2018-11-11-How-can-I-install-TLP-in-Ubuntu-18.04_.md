---
layout:       post
title:        >
    How can I install TLP in Ubuntu 18.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1091962
type:         Answer
tags:         apt package-management tlp
created_date: 2018-11-11 14:47:09
edit_date:    2018-12-29 06:11:21
votes:        "19 "
favorites:    
views:        "21,443 "
accepted:     Accepted
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-11-How-can-I-install-TLP-in-Ubuntu-18.04_.md
toc:          false
navigation:   false
clipboard:    false
---

You are reading old instructions off the internet. `tlp` is included in Ubuntu's universe repository so all you need to type is:

``` 
sudo apt install tlp
```

If you want to utilize the Radio Wizard also use:

``` 
sudo apt install tlp-rdw
```

Thinkpad users can install optional packages for battery threshold levels:

``` 
sudo apt-get install tp-smapi-dkms acpi-call-dkms
```

Source: [Welcome to TLP!][1]


  [1]: https://linrunner.de/en/tlp/docs/tlp-linux-advanced-power-management.html
