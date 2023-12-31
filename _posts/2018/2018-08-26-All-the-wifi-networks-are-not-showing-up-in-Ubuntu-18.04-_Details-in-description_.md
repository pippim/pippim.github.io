---
layout:       post
title:        >
    All the wifi networks are not showing up in Ubuntu 18.04 (Details in description)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069132
type:         Answer
tags:         networking dual-boot 18.04
created_date: 2018-08-26 16:00:28
edit_date:    
votes:        "0 "
favorites:    
views:        "916 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-26-All-the-wifi-networks-are-not-showing-up-in-Ubuntu-18.04-_Details-in-description_.md
toc:          false
navigation:   false
clipboard:    false
---

My WiFi shows 73 APs (Access Points) but only two belong to my router (one for 2.4 GHz the other for 5.0 GHz). The rest are my neighbours in close proximity. The stronger the WiFi card in your PC or Laptop, the more APs you will see. For my **Ubuntu 16.04** I need to select the option: `More Networks` to see the entire list.


----------


For your **Ubuntu 18.04** follow these instructions: [Connect to a wireless network][1] I've summarized the steps below but click on this link to get a more thorough set of instructions.

If you have a wireless-enabled computer, you can connect to a wireless network that is within range to get access to the internet, view shared files on the network, and so on.

1.    Open the system menu from the right side of the top bar.

2.    Select `Wi-Fi Not Connected.` The Wi-Fi section of the menu will expand.

3.    Click `Select Network`.

4.    Click the name of the network you want, then click Connect.

``` 
If the name of the network is not in the list, try clicking More to see if the network is further down the list. If you still do not see the network, you may be out of range, or the network might be hidden.
```

5.    If the network is protected by a password (encryption key), enter the password when prompted and click Connect.

``` 
If you do not know the key, it may be written on the underside of the wireless router or base station, or in its instruction manual, or you may have to ask the person who administers the wireless network.
```

6.    The network icon will change appearance as the computer attempts to connect to the network.

7.    If the connection is successful, the icon will change to a dot with several curved bars above it (). More bars indicate a stronger connection to the network. Fewer bars mean the connection is weaker and might not be very reliable.


  [1]: https://help.ubuntu.com/stable/ubuntu-help/net-wireless-connect.html.en
