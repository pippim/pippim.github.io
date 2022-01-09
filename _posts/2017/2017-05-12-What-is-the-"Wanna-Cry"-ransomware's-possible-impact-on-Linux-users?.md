---
layout:       post
title:        >
    What is the "Wanna Cry" ransomware's possible impact on Linux users?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/914623
type:         Question
tags:         windows wine malware
created_date: 2017-05-12 23:57:00
edit_date:    2017-05-16 00:03:39
votes:        "64 "
favorites:    11
views:        "48,963 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

It's just come to light that there's a $300 ransom you have to pay because ransomware targeting Microsoft Windows has encrypted your data. What steps do Linux users need to protect from this if for example they are using wine?

This ransomware is widely reported to be based on a tool developed by the NSA to hack into computers. The NSA tool was used by a hacker group called the ***Shadow Brokers***. The code can be found in [Github][1].

Microsoft released a patch (**MS17-010**) against this vulnerability on March 14, 2017. The mass infection is reported to have begun spreading on April 14th. This is discussed [here][2].

As I haven't booted Windows 8.1 in 6 to 8 weeks, can I apply this patch from Ubuntu without booting Windows first? (After research it may be possible ClamAV could report the vulnerability from the Linux side looking into Windows partition but it's unlikely it could apply the patch. The best method would be to reboot into Windows and apply patch MS17-010.)

Individuals and small companies who subscribe to Microsoft Automatic Updates are uninfected. Larger organizations who delay apply patches as they are tested against organization intranets are more likely to be infected.

On May 13, 2017, Microsoft took the extraordinary step of releasing a patch for Windows XP which has been unsupported for 3 years.

No word if wine is doing anything about a security update. It was reported in a comment below that Linux can be infected too when users run [wine][3].

An ["accidental hero"][4] registered a domain name that acted as a kill-switch to the ransomware. I presume the non-existent domain was used by the hackers on their private intranet so they didn't infect themselves.  Next time they will be smarter so don't rely on this current kill-switch. Installing the Microsoft patch, which prevents exploiting a vulnerability in the SMBv1 protocol, is the best method.

On May 14, 2017 Red Hat Linux said they are not affected by "Wanna Cry" ransomware. This might mislead Ubuntu users along with Red Hat, CentOS, ArchLinux and Fedora users. Red Hat supports wine which answers below confirm can be effected. In essence Ubuntu and other Linux distro users googling this issue might be mislead by the Red Hat Linux Support answer [here][5].

May 15, 2017 Update. Over the last 48 hours Microsoft released patches called **KB4012598** for [Windows 8, XP, Vista, Server 2008 and Server 2003][6] to protect against "Wanna Cry" ransomware. These Windows versions are no longer on automatic updates. Although I applied security update MS17-010 on my Windows 8.1 platform yesterday, my old Vista Laptop still needs patch KB4012598 downloaded and manually applied.

------

> **Moderator note:** This question is not off topic - it asks about whether or not any Linux users need to do any steps for protecting against the risk.  
>   
> It is perfectly on topic here, because it's relevant to Linux (which Ubuntu is), and it's also relevant for Ubuntu users running Wine or similar compatibility layers, or even VMs on their Ubuntu Linux machines.  


  [1]: https://github.com/RiskSense-Ops/MS17-010
  [2]: https://www.renditioninfosec.com/2017/05/call-to-microsoft-to-release-information-about-ms17-010/
  [3]: https://twitter.com/hackerfantastic/status/863359375787925505
  [4]: https://www.theguardian.com/technology/2017/may/13/accidental-hero-finds-kill-switch-to-stop-spread-of-ransomware-cyber-attack
  [5]: https://access.redhat.com/solutions/3031551
  [6]: http://www.catalog.update.microsoft.com/Search.aspx?q=KB4012598
