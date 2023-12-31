---
layout:       post
title:        >
    Change the voltage of the CPU for each frequency
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1009721
type:         Answer
tags:         power-management cpu
created_date: 2018-02-25 19:53:36
edit_date:    2018-02-25 20:14:18
votes:        "1 "
favorites:    
views:        "2,008 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-25-Change-the-voltage-of-the-CPU-for-each-frequency.md
toc:          false
navigation:   false
clipboard:    false
---

This is your classic XY problem where you ask how to change CPU voltage differently than how Intel does it when the frequency changes. In reality the question to ask is how to save battery life for more operational time.

[This article][1] addresses your issue in 8 simple steps:

1. Set Ubuntu’s Built-In Power Settings
 -   Open ‘System Settings’
 -   Select the ‘Power’ icon
 -   Adjust settings to suit your needs
2. Turn off Bluetooth. Simple click the Bluetooth icon and:
 -   Switch slider to ‘off’ (more recent versions of Ubuntu)
 -   Click ‘turn off Bluetooth’ (older versions of Ubuntu)
3. Turn off Wi-Fi
 -   Click on the ‘Wi-Fi’ icon
 -   Select the ‘Enable Wireless’ entry
4. Lower Screen Brightness
 -   Open System Settings
 -   Select Brightness & Lock
 -   Adjust the Brightness slider
5. Unplug USB Drives, SD Cards, Discs, etc
 -   Open a new File Manager window
 -   Click the eject button on attached USB drives/SD cards
6. Quit Apps You’re Not Using
7. Avoid Adobe Flash (Where Possible)
 -   Try to use a browser that configures Flash content to show ‘On Demand’. Firefox will prompt you to ‘enable’ Flash elements.
 -   Google Chrome has a hidden ‘Plugin Power Saver’ option in chrome:flags that you can try.
8. Install TLP. Options include:

 -   Kernel laptop mode and dirty buffer timeouts
 -   Processor frequency scaling including “turbo boost” / “turbo core”
 -   Power aware process scheduler for multi-core/hyper-threading
 -   Hard disk power management level and spin down timeout
 -   Runtime power management for PCI(e) bus devices
 -   Wi-fi power saving mode
 -   Powering off disc drive
 -   Audio power saving mode


Read the article for more details on each step.

  [1]: https://www.omgubuntu.co.uk/2016/04/improve-battery-life-linux
