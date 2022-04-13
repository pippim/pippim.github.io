---
layout:       post
title:        >
    Get names of devices on the network
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/530019
type:         Answer
tags:         networking wifi raspbian
created_date: 2019-07-13 21:07:07
edit_date:    
votes:        "8 "
favorites:    
views:        "97,675 "
accepted:     
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-13-Get-names-of-devices-on-the-network.md
toc:          false
navigation:   false
clipboard:    true
---

Three answers here refer to `nmap` but I found prefixing `sudo` (which none of the answers do) makes all the difference in the world:

{% include copyHeader.html %}
``` 
$ nmap -sP 192.168.1.0/24

Starting Nmap 7.01 ( https://nmap.org ) at 2019-07-13 14:55 MDT
Nmap scan report for 192.168.1.65
Host is up (0.00037s latency).
Nmap scan report for 192.168.1.66
Host is up (0.00035s latency).
Nmap scan report for 192.168.1.67
Host is up (0.00028s latency).
Nmap scan report for 192.168.1.68
Host is up (0.00025s latency).
Nmap scan report for 192.168.1.70
Host is up (0.017s latency).
Nmap scan report for 192.168.1.254
Host is up (0.00070s latency).
Nmap done: 256 IP addresses (6 hosts up) scanned in 6.86 seconds

$ sudo nmap -sP 192.168.1.0/24

Starting Nmap 7.01 ( https://nmap.org ) at 2019-07-13 14:56 MDT
Nmap scan report for 192.168.1.65
Host is up (0.00050s latency).
MAC Address: 99:99:99:99:99:A6 (Unknown)
Nmap scan report for 192.168.1.66
Host is up (0.00016s latency).
MAC Address: 99:99:99:99:99:D9 (Sony)
Nmap scan report for 192.168.1.70
Host is up (-0.087s latency).
MAC Address: 99:99:99:99:99:36 (Unknown)
Nmap scan report for 192.168.1.254
Host is up (0.0020s latency).
MAC Address: 99:99:99:99:99:00 (Actiontec Electronics)
Nmap scan report for 192.168.1.67
Host is up.
Nmap scan report for 192.168.1.68
Host is up.
Nmap done: 256 IP addresses (6 hosts up) scanned in 2.41 seconds
```

I stumbled upon this Q&A because I'm researching a project on how to display Human readable names rather than computer coded IP addresses and MAC addresses to devices.

In particular I want "Toshiba 43" 4K TV" to displayed rather than "(unknown)" for MAC `99:99:99:99:99:36` (not real address) above.

Later I want expand the project past the Local Area Network to the Internet where "**Stack Exchange**" will display instead of `999.999.9.99` or "**Ask Ubuntu**" will display instead of `999.999.9.99` when I'm looking at external IP addresses my machine is interacting with.
