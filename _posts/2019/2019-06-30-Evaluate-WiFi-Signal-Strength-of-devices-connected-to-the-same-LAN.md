---
layout:       post
title:        >
    Evaluate WiFi Signal Strength of devices connected to the same LAN
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155029
type:         Answer
tags:         networking
created_date: 2019-06-30 15:08:16
edit_date:    2019-06-30 16:11:54
votes:        "1 "
favorites:    
views:        "1,266 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-30-Evaluate-WiFi-Signal-Strength-of-devices-connected-to-the-same-LAN.md
toc:          false
navigation:   false
clipboard:    false
---

# Install `nmap`

From [How to Find What Devices are Connected to Network in Linux](https://itsfoss.com/how-to-find-what-devices-are-connected-to-network-in-ubuntu/) use:

``` 
sudo apt install nmap
```

Then use `ifconfig` to get the IP range for your WiFi (or Ethernet).

Use address found and pass it to `nmap` network scan:

``` 
$ sudo nmap -sn 192.168.1.0/24

Starting Nmap 7.01 ( https://nmap.org ) at 2019-06-30 09:37 MDT
Nmap scan report for 192.168.1.65
Host is up (0.00032s latency).
MAC Address: 10:4F:A8:1D:37:A6 (Unknown)
Nmap scan report for 192.168.1.66
Host is up (0.00012s latency).
MAC Address: AC:9B:0A:DF:3F:D9 (Sony)
Nmap scan report for 192.168.1.254
Host is up (0.00076s latency).
MAC Address: 70:F1:96:42:5F:00 (Actiontec Electronics)
Nmap scan report for 192.168.1.67
Host is up.
Nmap scan report for 192.168.1.68
Host is up.
Nmap done: 256 IP addresses (5 hosts up) scanned in 2.39 seconds
```

# Connect to your router via browser

You can sign on to your router through a browser by typing `192.168.1.254` into the address bar (in my case). Then a webpage is presented where you see all the connected devices. This might be preferable to above method of installing `nmap` and using the command line.

[![router connected devices.png][1]][1]

As for actual signal strength, that depends on your router, as this Q&A discusses:

- [Does a router store information about the signal strength received by mobile devices that are connected to it?](https://www.quora.com/Does-a-router-store-information-about-the-signal-strength-received-by-mobile-devices-that-are-connected-to-it)

It appears though the average router does not track signal strength of devices attached to it. You could however have each device record it's signal strength periodically to a file. Then enable file sharing and view that file from other devices. 

----------

Other interesting signal strength tips

From [8 Linux Commands: To Find Out Wireless Network Speed, Signal Strength And Other Information](https://www.cyberciti.biz/tips/linux-find-out-wireless-network-speed-signal-strength.html):

## How do I find out wifi link quality on Linux?

You can get overall quality of the link. This may be based on the level of contention or interference, the bit or frame error rate, how good the received signal is, some timing synchronization, or other hardware metric.

``` 
# iwconfig wlan0 | grep -i --color quality
```

Sample outputs:

``` 
Link Quality=41/70  Signal level=-69 dBm
```

41/70 is is an aggregate value, and depends totally on the driver and hardware. Or use the following command to lists available Wi-Fi access points known to NetworkManager including its speed, security, signal, and more:

``` 
$ nmcli dev wifi
```

Sample outputs:

``` 
*  SSID                              MODE   CHAN  RATE       SIGNAL  BARS  SECURITY 
*  nixcraft                          Infra  149   54 Mbit/s  42      ▂▄__  WPA2     
   tfarcxin                          Infra  7     54 Mbit/s  37      ▂▄__  WPA2
```


  [1]: https://i.stack.imgur.com/1yU02.png
