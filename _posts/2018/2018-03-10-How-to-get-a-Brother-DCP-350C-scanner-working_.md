---
layout:       post
title:        >
    How to get a Brother DCP-350C scanner working?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1013560
type:         Answer
tags:         drivers scanner brother sane simplescan
created_date: 2018-03-10 01:49:45
edit_date:    2018-03-13 23:03:51
votes:        "10 "
favorites:    
views:        "5,382 "
accepted:     
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-10-How-to-get-a-Brother-DCP-350C-scanner-working_.md
toc:          true
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Short Answer

The drivers you found are old versions:

``` 
$ dpkg  -l  |  grep  Brother
ii  brother-cups-wrapper-common                1.0.0-10-0ubuntu6                                        amd64        Common files for Brother cups wrapper packages
ii  brother-udev-rule-type1                    1.0.0-1                                                  all          Brother udev rule type 1
ii  brscan-skey                                0.2.4-1                                                  amd64        Brother Linux scanner S-KEY tool
ii  brscan2                                    0.2.5-1                                                  amd64        Brother Scanner Driver
ii  printer-driver-brlaser                     3-5~ubuntu1                                              amd64        printer driver for (some) Brother laser printers
ii  printer-driver-ptouch                      1.4-1                                                    amd64        printer driver Brother P-touch label printers
```

The newest versions are:

``` 
$ dpkg -l | grep -i brother
ii  brother-udev-rule-type1                    1.0.2                                        all          Brother udev rule type 1
ii  brscan-skey                                0.2.4-1                                      amd64        Brother Linux scanner S-KEY tool
ii  brscan4                                    0.4.4-3                                      amd64        Brother Scanner Driver
ii  cupswrapperdcp7065dn:i386                  2.0.4-2                                      i386         Brother DCP7065DN CUPS wrapper driver
ii  dcp7065dnlpr:i386                          2.1.0-1                                      i386         Brother DCP-7065DN LPR driver
ii  printer-driver-brlaser                     3-5~ubuntu1                                  amd64        printer driver for (some) Brother laser printers
ii  printer-driver-ptouch                      1.4-1                                        amd64        printer driver Brother P-touch label printers
```

- `udev` rule upgraded from `1.0.0-1` to `1.0.2`
- `brscan2` version `0.2.5-1` upgraded to `brscan4` version `0.4.4-3`

Also you have a generic `cups-wrapper` where as mine is model specific.

----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# TL:DR; Very, very LONG ANSWER

Much of the long answer is trial and error. You need only follow **Step 1**, **Step 2**, the first part of **Step 3** (stop at selecting *scanner only*). Then skip down to **Step 6** and **Step 7**.

----------


# Background

I have a Brother DCP-7065DN which is a nice monochrome double sided laser printer. I've had it for three years but have never used the scanner feature primarily because "whose got paper to scan in an electronic world?". Due to your question I thought it was time to get the scanner function working.

# Comparing DCP-7065DN to DCP-350C

According to this post in [Ubuntu Forums][1] the same Brother Driver tool works for both your **DCP-350C** and my **DCP-7065DN** printer. 


----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# Current installation tools

Your question contains no less than 15 links and I noticed the site of your first [link][2] is out-dated:

[![Brother Scanner Old][3]][3]

The **Ubuntu Forums** Q&A I linked above contains a more current installation tool [link][4]:

[![Brother Scanner New][5]][5]

### Notice the Release Date is Christmas 2017, only a few months old.

Rather than repeating your steps I'll start a fresh install (of the scanner only) using the **Ubuntu Forums** link above.


----------



<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Installation Step 1 - Select Printer

Start by selecting the right product. In the printer icon for `MFC-J410W`, click the link **Not your product?** and a selection page appears:

[![Brother Scanner Model Select][6]][6]

Your printer can be found in the first icon which has a sub-menu for "DCP 3 Series" which leads to your specific model:

[![Brother Scanner Model DCP-350C][7]][7]

My printer is the fourth icon in the panel, which being 3 icons wide is immediately below yours. I'll select that and it has a sub-menu for "DCP 7 Series" which after clicking presents:

[![Brother Scanner Model DCP-7065DN][8]][8]

I'll click on **DCP-7065DN**. You would have already selected **DCP-350C** on the previous screen shot.


----------



<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Installation Step 2 - Select Operating System (OS)

After selecting the printer model you are asked for your OS. It defaults to Linux and ".rpm". The default is ".rpm" which stands for **Red Hat** or **Arch Linux** or something like that. Change the distro to ".deb" which stands **Debian** which is really **Ubuntu**.

[![Brother Scanner Select OS.png][9]][9]

Click the `Search` button.


----------



<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

# Installation Step 3 - Download Software

Now that the preliminaries are finished and the Command Line aficionados and GUI haters in Ubuntu-Verse have put my name on their dart boards we get to select the software to download:

[![Brother Scanner Software Select.png][10]][10]

The model icon in the top-left corner should be **DCP-350C** for you but it is **DCP-7065DN** for me.

The first section is for printer drivers but we don't need that as both our printers print fine. The last section is for source code but we don't need that. If we did we probably wouldn't be on this website. The middle section contains the **scanner drivers**:

[![Brother Scanner Select Arch.png][11]][11]

Here we need to select the architecture: **32-bit** or **64-bit**.

I've read a 32-bit driver won't work on my 64-bit arch so I'm only going to download #3 & #4 for now. I may come back and grab #1 if I need the driver?


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

## Installation Step 3-A)

### Download `Scan-key-tool 64bit (deb package)`

After selecting #3 scanner option we see your model number on line #2 and my model number on the last line (of the screen shot)...:

[![Brother Scanner scan-tool-key-64bit.png][12]][12]

...So assuming all works well for me it should all work well for you!

You need to agree to the EULA (End User License Agreement) and then download the `.deb` file.

The file downloaded is:

- brscan-skey-0.2.4-1.amd64.deb, size 50.9 KB, date 03/12/2014

The follow-up instructions on the web page says:

###    brscanX should be installed first


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

## Installation Step 3-B)

### Download `Scanner driver 32bit (deb package)`

So we have to go back a screen and download #1 (**
Scanner driver 32bit (deb package)**). The file downloaded is:

- brscan4-0.4.4-4.i386.deb, size 63.9 KB, date 09/22/2017

### Notice the date is only a 6 months old!

## Installation Step 3-C)

### Download `Scanner Setting file (deb package)`

At the same time #1 is downloaded, we'll download #4 (**Scanner Setting file (deb package)**). The file downloaded is:

- brother-udev-rule-type1-1.0.2-0.all.deb, size 1.6 KB, date 11/25/2016

### Notice this the version number is different than yours!

----------


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

# Installation Step 4 - `sudo dpkg -i ...`

To summarize the packages downloaded:

 - 1. brscan4-4.4-4.i386.deb
 - 3. brscan-skey-0.2.4-1.amd64.deb
 - 4. brother-udev-rule-type1-1.0.2.0.all.deb

We will first install #1, then #4, `reboot` and finally install #3:

``` 
───────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ sudo dpkg -i brscan4-0.4.4-4.i386.deb
Selecting previously unselected package brscan4:i386.
(Reading database ... 1147453 files and directories currently installed.)
Preparing to unpack brscan4-0.4.4-4.i386.deb ...
Unpacking brscan4:i386 (0.4.4-4) ...
Setting up brscan4:i386 (0.4.4-4) ...
This software is based in part on the work of the Independent JPEG Group.
───────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ sudo dpkg -i brother-udev-rule-type1-1.0.2-0.all.deb
Selecting previously unselected package brother-udev-rule-type1.
(Reading database ... 1147495 files and directories currently installed.)
Preparing to unpack brother-udev-rule-type1-1.0.2-0.all.deb ...
Unpacking brother-udev-rule-type1 (1.0.2) ...
Setting up brother-udev-rule-type1 (1.0.2) ...
ls: cannot access '/etc/udev/rules.d/*.rules': No such file or directory
───────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ 
```

### Ohh No! Error on the last line.

No idea why `ls` was generating an error because the directory is there and three rules exist. We can see one of them has just been set up:

``` 
$ ll /etc/udev/rules.d/*brother*.rules
-rw-r--r-- 1 root root 1004 Mar 10 16:59 /etc/udev/rules.d/60-brother-libsane-type1.rules
```

Oh well... let's proceed anyway. Looking at the new Brother `udev` rule all it does after a whole bunch of code is set:

``` 
ENV{libsane_matched}="yes"
```

Now it's time to post this answer as is and `reboot`.

After rebooting let's install the last file:

``` 
$ sudo dpkg -i brscan-skey-0.2.4-1.amd64.deb
Selecting previously unselected package brscan-skey.
(Reading database ... 1147499 files and directories currently installed.)
Preparing to unpack brscan-skey-0.2.4-1.amd64.deb ...
Unpacking brscan-skey (0.2.4-1) ...
Setting up brscan-skey (0.2.4-1) ...
```

*Interesting* that there is more than a million files on my system. Those 25 kernels add up over time.


----------


<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

# Installation Step 5 - Testing

I cheated a bit and found this: [Brother DCP-7065DN, Ubuntu 14.04 64bit: Can print to network printer but cannot use the scan function][13] which recommended these steps:

``` 
───────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ brscan-skey
───────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ brscan-skey -l

 DCP-7065DN        : brother4:bus4;dev7  : USB                  Active

───────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$
```

So far, so good. The answer (no long sure if it's sure valid) says you need to put `brscan-skey` into your **Startup Applications** and you need `gimp` installed. Comment below if you need help doing this.

Apparently `xsane` is needed for scanning:

``` 
$ sudo apt install xsane
Reading package lists... Done
Building dependency tree       
   (...BLAH, BLAH, BLAH...)
Setting up xsane-common (0.999-3ubuntu1) ...
Setting up xsane (0.999-3ubuntu1) ...
```


<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

## `xsane` = extremely insane

After installing type `xsane` in the terminal and get:

[![xsane as user.png][14]][14]

After closing the error message, `xsane` tries to scan for devices and eventually replies there are none. Oh Joy, Oh Bliss. The Brother website says scanning is designed to be done as root so we'll type `sudo xsane` and now we see:

[![xsane as sudo.png][15]][15]

Sounds scary but regular user couldn't find a scanner so let's see if `sudo` does. Select `Continue at your own risk` button. After window greys out for a few momments the same response as regular user appears: `No devices available`.


<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr14">Skip</a></div>

## Software method doesn't work, try hardware method

Using the scan key on the Brother MFC generates this message:

[![scan button on brother.png][16]][16]

Well at least there is communication between scanner and computer because `gimp` started up automatically.

I never rebooted after installing `brscan-skey` so do it now out of hope / desperation.


----------


<a id="hdr14"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr13">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr15">Skip</a></div>

# Step 6 - Go back and download CUPS Wrapper

Rebooting didn't work so I'll go back and install the CUPS Wrapper tool dated `12/25/2017` which has not been installed on my system. You have an older version of on your system:

[![Brother CUPS wrapper download.png][17]][17]

There are five download packages. When downloading the first one (CUPSwrapper) this dialog box appears:

[![Brother CUPS wrapper download open_save.png][18]][18]

- Change option from `Open` to `Save`!
- Click `OK`

Open terminal, change to `~/Downloads` and verify file exists:

``` 
rick@alien:~/Downloads$ ll *.gz*
-rw-rw-r-- 1 rick rick    24666 Mar 11 08:24 linux-brprinter-installer-2.2.0-1.gz
```

After downloading these instructions appear on the website. Abbreviated format follows:

``` 
rick@alien:~/Downloads$ gunzip linux-brprinter-installer-2.2.0-1.gz
rick@alien:~/Downloads$ sudo su
root@alien:/home/rick/Downloads# 

root@alien:/home/rick/Downloads# bash linux-brprinter-installer-2.2.0-1 DCP-7065DN # Change DCP-7065DN to DCP-350C
You are going to install following packages.
   dcp7065dnlpr-2.1.0-1.i386.deb
   cupswrapperDCP7065DN-2.0.4-2.i386.deb
   brscan4-0.4.4-3.amd64.deb
   brscan-skey-0.2.4-1.amd64.deb
OK? [y/N] ->
```

Uh-Oh... It's selecting `brscan4-0.4.4-3.amd64.deb` but earlier I had installed `brscan4-0.4.4-4.i386.deb` which was a newer version but the wrong architecture. This could explain the errors I had!

Select `y` to proceed. Big license agreement pops up. Select `y` to proceed. Another license agreement pops up. Select `y` to proceed. The script runs `apt install` on it's own.

A prompt appears:

``` 
Will you specify the Device URI? [Y/n] ->
```

For yours and mine **USB Printer** we select `n`.

Next it prompts for a test print. To kill another tree select `y`. Yeah the test print works and I now have a printed page I can scan later!

A third big license agreement now appears so, select `y` to proceed.

It's all finished so `reboot`.

----------


<a id="hdr15"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr14">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr16">Skip</a></div>

# Step 7 - Test simple-scan

After `reboot` check the installation in terminal and perform simple scan:

``` 
───────────────────────────────────────────────────────────────────────────────
rick@alien:~$ brscan-skey
───────────────────────────────────────────────────────────────────────────────
rick@alien:~$ brscan-skey -l

 DCP-7065DN        : brother4:bus4;dev7  : USB                  Active

───────────────────────────────────────────────────────────────────────────────
rick@alien:~$ dpkg -l | grep -i brother
ii  brother-udev-rule-type1                    1.0.2                                        all          Brother udev rule type 1
ii  brscan-skey                                0.2.4-1                                      amd64        Brother Linux scanner S-KEY tool
ii  brscan4                                    0.4.4-3                                      amd64        Brother Scanner Driver
ii  cupswrapperdcp7065dn:i386                  2.0.4-2                                      i386         Brother DCP7065DN CUPS wrapper driver
ii  dcp7065dnlpr:i386                          2.1.0-1                                      i386         Brother DCP-7065DN LPR driver
ii  printer-driver-brlaser                     3-5~ubuntu1                                  amd64        printer driver for (some) Brother laser printers
ii  printer-driver-ptouch                      1.4-1                                        amd64        printer driver Brother P-touch label printers
───────────────────────────────────────────────────────────────────────────────
rick@alien:~$ simple-scan
```

After all the hard work we are rewarded with a scan:

[![Brother simple scan sans sudo][19]][19]


  [1]: https://ubuntuforums.org/showthread.php?t=2246878
  [2]: http://support.brother.com/g/s/id/linux/en/download_scn.html
  [3]: https://i.stack.imgur.com/Th21E.png
  [4]: http://support.brother.com/g/b/downloadend.aspx?c=us&lang=en&prod=mfcj410w_us&os=128&dlid=dlf006893_000&flang=4&type3=625
  [5]: https://i.stack.imgur.com/G0IMA.png
  [6]: https://i.stack.imgur.com/CaC4f.png
  [7]: https://i.stack.imgur.com/JmRcW.png
  [8]: https://i.stack.imgur.com/dFVvH.png
  [9]: https://i.stack.imgur.com/UsMAE.png
  [10]: https://i.stack.imgur.com/s7Cdo.png
  [11]: https://i.stack.imgur.com/XDFBp.png
  [12]: https://i.stack.imgur.com/nCZQv.png
  [13]: https://askubuntu.com/questions/486699/brother-dcp-7065dn-ubuntu-14-04-64bit-can-print-to-network-printer-but-cannot
  [14]: https://i.stack.imgur.com/M4NW7.png
  [15]: https://i.stack.imgur.com/LMMD5.png
  [16]: https://i.stack.imgur.com/1Hctg.png
  [17]: https://i.stack.imgur.com/C7jh6.png
  [18]: https://i.stack.imgur.com/8W6a6.png
  [19]: https://i.stack.imgur.com/azNPP.gif


<a id="hdr16"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr15">ToS</a>  <a href="#hdr2">ToC</a></div>

