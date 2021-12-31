---
layout:       post
title:        Failing Installation of Ubuntu 18.04 w∕ Lenovo Thinkpad P73 cannot boot up saying: "[Firmware bug]: TPM interrupt not working"
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1196819
type:         Answer
tags:         18.04 system-installation lenovo thinkpad firmware
created_date: 2019-12-17 14:01:39
edit_date:    
votes:        1
favorites:    
views:        2,815
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

From this Q&A:

- https://askubuntu.com/questions/851975/a-tpm-error-7-occurred-attempting-to-read-a-pcr-value

A number of solutions are provided:

- Turn off TPM in your BIOS.
- Tell Ubuntu to ignore TPM:

``` 
`echo "blacklist tpm_tis" | sudo tee -a /etc/modprobe.d/tpm_tis.conf`

```


