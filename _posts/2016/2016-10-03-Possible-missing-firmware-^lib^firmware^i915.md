---
layout:       post
title:        >
    Possible missing firmware /lib/firmware/i915
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/832528
type:         Answer
tags:         16.04 drivers kernel intel i915
created_date: 2016-10-03 10:57:43
edit_date:    2020-06-12 14:37:07
votes:        "150 "
favorites:    
views:        "170,761 "
accepted:     
uploaded:     2022-01-29 11:32:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-03-Possible-missing-firmware-^lib^firmware^i915.md
toc:          true
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# May 20, 2019 Update

To answer your question you don't need to update drivers for a processor you aren't running but it is nice to see the warnings disappear when you do.

Today I received these warning:

``` 
update-initramfs: Generating /boot/initrd.img-5.0.1-050001-generic
W: Possible missing firmware /lib/firmware/i915/skl_dmc_ver1_27.bin for module i915
W: Possible missing firmware /lib/firmware/i915/kbl_dmc_ver1_04.bin for module i915
W: Possible missing firmware /lib/firmware/i915/cnl_dmc_ver1_07.bin for module i915
W: Possible missing firmware /lib/firmware/i915/icl_dmc_ver1_07.bin for module i915
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_39.bin for module i915
W: Possible missing firmware /lib/firmware/i915/bxt_guc_ver9_29.bin for module i915
W: Possible missing firmware /lib/firmware/i915/skl_guc_ver9_33.bin for module i915
```

I downloaded the blobs (described in next section) and then used:

``` 
$ sudo cp ~/Downloads/*.bin /lib/firmware/i915/

$ sudo update-initramfs -u
update-initramfs: Generating /boot/initrd.img-5.0.1-050001-generic
```

Now my **Sky Lake** (`skl`) drivers are up to date and I can try out latest kernel parameters recommended on the internet. Warning messages for future processors **Kaby Lake** (`kbl`), **Cannon Lake** (`cnl`) and **Ice Lake** (`icl`) are gone making life less stressful.


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# May 26, 2018 Update

### Minor revision August 6, 2018.

## New download screen of "blobs"

Recently Intel has created a new [download page][1] and new web page layout:

[![Intel i915 firmware blobs][2]][2]

The download files are now called firmware **blobs** which is new-speak for firmware **drivers**. It stands for **B**inary **L**arge **OB**ject (BLOB).

Drivers are sorted by processor:

- `bxt` Broxton, Canceled in 2016, successor to Cherry Trail processors
- `kbl` Kabylake, 7th generation, eg i7-7700
- `skl` Skylake, 6th generation, eg i7-6700

Then drivers are organized by subgroup (full explanation [here][3]):

- **GUC** - GuC is designed to perform graphics workload scheduling on the various graphics parallel engines.
- **DMC** - DMC provides additional graphics low-power idle states.
- **HUC** - HuC is designed to offload some of the media functions from the CPU to GPU.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## Match error message to driver needed

Compare the error message you are receiving by `update-initramfs` or `update-grub` to find the missing driver. In your example the message was "`/lib/firmware/i915/kbl_guc_ver9_14.bin`" so you are missing the Kabylake GuC called: `kbl_guc_ver9_14.bin` in the web page shown above. You don't want the newer one: `kbl_guc_ver9_39.bin`

## Download driver needed

There is no more installation script as in past versions. Simply highlight the missing driver (blob) and click on it. This screen appears:

[![Intel i915 drivers download.png][4]][4]

Initially you only see the "hex dump" but after clicking the link titled **plain** a download window appears as illustrated above.

Click "Save File"


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Install driver with simple `sudo cp` (copy command)



After downloading, installation is a simple `sudo cp` (copy command) and there are no complicated `tar` commands, or `./script_name` installation steps.

### Quick Install

``` bash
cd ~/Downloads
sudo cp kbl_guc_ver9_14.bin /lib/firmware/i915
sudo cp bxt_guc_ver8_7.bin /lib/firmware/i915
```

**IMPORTANT:** Replace `kbl_guc_ver9_14.bin` and `bxt_guc_ver8_7.bin` above with the missing driver names you downloaded.

**VOILA!** New driver is installed. Much simpler than previous installation methods for missing Intel i915 drivers!

### TL;DR Exploratory Installation

I already had the driver installed. This lengthy installation method gives you an idea of before and after effects of copying the **BLOB**:

``` bash
$ sudo updatedb
$ llocate kbl_guc_ver9_14.bin
ACCESS      OWNER  GROUP  SIZE    MODIFIED    NAME (updatdb last ran: 2018-05-26 12:07:57)
-rw-rw-r--  rick   rick   142656  2018-05-26  /home/rick/Downloads/kbl_guc_ver9_14.bin
-rw-rw-r--  rick   rick   142656  2017-02-24  /home/rick/Downloads/kbl_guc_ver9_14/kbl_guc_ver9_14.bin
-rw-r--r--  root   root   142656  2017-10-26  /lib/firmware/i915/kbl_guc_ver9_14.bin
$ diff /home/rick/Downloads/kbl_guc_ver9_14/kbl_guc_ver9_14.bin /lib/firmware/i915/kbl_guc_ver9_14.bin
# Blank line appears here signifying no differences from previous version
$ sudo cp /home/rick/Downloads/kbl_guc_ver9_14/kbl_guc_ver9_14.bin /lib/firmware/i915
$ llocate kbl_guc_ver9_14.bin
ACCESS      OWNER  GROUP  SIZE    MODIFIED    NAME (updatdb last ran: 2018-05-26 12:07:57)
-rw-rw-r--  rick   rick   142656  2018-05-26  /home/rick/Downloads/kbl_guc_ver9_14.bin
-rw-rw-r--  rick   rick   142656  2017-02-24  /home/rick/Downloads/kbl_guc_ver9_14/kbl_guc_ver9_14.bin
-rw-r--r--  root   root   142656  2018-05-26  /lib/firmware/i915/kbl_guc_ver9_14.bin
```

Use the **locate** command below in place of [llocate][5].

----------



<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

# February 14, 2017 - Intel has released drivers

As per this bug report today ([W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915][6]) Intel has released the required **Kabylake** and **Broxton** drivers on their ([here][3]) web page:

[![Intel Graphics for Linux Drivers][7]][7]

Download the missing drivers for **Kabylake** ([GuC - Ver 9.14][8]) and ([DMC - Ver 1.01][9]) and **Broxton** ([GuC - Ver 8.7][10]). These are in `.tar.gz` and `.tar.bz2` format.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

## Install drivers in "tar" format

Although you can run the `install.sh` scripts these instructions are the easiest.

### Change to the download directory and verify files are there:

``` bash
:~$ cd Downloads

:~/Downloads$ ll *tar*
-rw-rw-r-- 1 rick rick 69329 Feb 14 21:05 bxtgucver87.tar.gz
-rw-rw-r-- 1 rick rick  4338 Feb 14 21:06 kbldmcver101.tar.bz2
-rw-rw-r-- 1 rick rick 70402 Feb 14 21:06 kblgucver914.tar.gz
```

### Extract the compressed tar files:

``` bash
:~/Downloads$ tar -zxvf bxtgucver87.tar.gz
firmware/bxt/guc/bxt_guc_ver8_7/
firmware/bxt/guc/bxt_guc_ver8_7/install.sh
firmware/bxt/guc/bxt_guc_ver8_7/ReleaseNotes.txt
firmware/bxt/guc/bxt_guc_ver8_7/bxt_guc_ver8_7.bin

:~/Downloads$ tar -xjvf kbldmcver101.tar.bz2
kbl_dmc_ver1_01/
kbl_dmc_ver1_01/kbl_dmc_ver1_01.bin
kbl_dmc_ver1_01/install.sh
kbl_dmc_ver1_01/ReleaseNotes.txt

:~/Downloads$ tar -zxvf kblgucver914.tar.gz
firmware/kbl/guc/kbl_guc_ver9_14/
firmware/kbl/guc/kbl_guc_ver9_14/install.sh
firmware/kbl/guc/kbl_guc_ver9_14/kbl_guc_ver9_14.bin
firmware/kbl/guc/kbl_guc_ver9_14/ReleaseNotes.txt
```

### Copy the files and update initramfs

``` bash
:~/Downloads$ sudo cp -t /lib/firmware/i915/ firmware/bxt/guc/bxt_guc_ver8_7/bxt_guc_ver8_7.bin kbl_dmc_ver1_01/kbl_dmc_ver1_01.bin firmware/kbl/guc/kbl_guc_ver9_14/kbl_guc_ver9_14.bin
:~/Downloads$ sudo update-initramfs -u
update-initramfs: Generating /boot/initrd.img-4.9.9-040909-generic
```

Notice the error (warning) messages are gone!

### Remove work files

``` bash
:~/Downloads$ rm -r firmware kbl_dmc_ver1_01 *.tar.*
```


----------



<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

# Historical (Original) Post for reference

I've had two warning messages on missing i915 drivers for Kernel's 4.6.3, 4.7.1, 4.7.2, 4.7.3 and 4.7.5. I've ignored them and things have been fine with my HD4000 Intel Integrated Graphics. I wish the same thing could be said about Nvidia and Nouvaeu.

As one answer in your link stated you can go to Intel's website to get most up-to-date Linux Graphics drivers at: [intel-linux-graphics-firmwares][11]. However when I read that site a few weeks ago I was concerned with all the possible things that can go wrong under different scenarios so I opted out.

Did you install 4.8 release candidate 6 from September 24th? That's the most current in Ubuntu I believe. You don't have to answer but I'm curious why you went with 4.8 instead of 4.7.5, ie what the differences are you need to fix things.

## Edit - October 19, 2016

Now using kernel version 4.8.1 (real version and not release candidate) for over a week and things are working nicely. This is under Ubuntu 16.04 though. Ubuntu 16.10 was released October 13th and it is using Kernel version 4.8.0 I believe.

It's not my plan to keep updating this answer but I wanted to lay to rest the inference that 4.8 release candidates might have problems. The real version does not.


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr10" class ="hdr-btn">Skip</a></div>

## Edit - February 2, 2017

Now running Kernel version 4.9.5 mainline version which at this time Ubuntu 16.04 has updated it's kernel to 4.4.0-59. Intel changed it's link for ***Intel Graphics for Linux*** drivers and I updated the new link above.

Questions still remain about the warning messages generated by `sudo update-initramfs -u` when Kernel version > 4.8 (Ubuntu 16.10 and Ubuntu 17.04):

``` bash
W: Possible missing firmware /lib/firmware/i915/kbl_dmc_ver1_01.bin for module i915
W: Possible missing firmware /lib/firmware/i915/kbl_guc_ver9_14.bin for module i915
W: Possible missing firmware /lib/firmware/i915/bxt_guc_ver8_7.bin for module i915
```

As stated in the bug report ([bugs.launchpad.net - linux firmware bug][6]) the drivers simply do not exist and will not until a future chip called "kaby lake" is released.


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr9" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr11" class ="hdr-btn">Skip</a></div>

## Make the warning messages go away

To make the warning message go away I did the following:

``` bash
$ sudo cp assembly/hello /lib/firmware/i915/kbl_dmc_ver1_01.bin
$ sudo cp assembly/hello /lib/firmware/i915/kbl_guc_ver9_14.bin
$ sudo cp assembly/hello /lib/firmware/i915/bxt_guc_ver8_7.bin
$ sudo update-initramfs -u
update-initramfs: Generating /boot/initrd.img-4.9.5-040905-generic
```

Voila! No more warning messages.

The program "hello" is a 504 byte assembler program that says "Hello World!". You can copy any small executable to the firmware binaries given in the error messages. When Intel eventually releases them the software updater will replace them with the real versions.


<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr10" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr12" class ="hdr-btn">Skip</a></div>

## How to navigate Intel Graphics for Linux website

It was asked via comments how to navigate within the the new Intel website ([01.org - Linux Graphics Downloads][11]) which presents this screen:

[![Intel Graphics for Linux 1][12]][12]

Type `Ubuntu 16.04` into the search field and click the `Filter` button.

For Ubuntu 16.10 select the first result. In our case Ubuntu 16.04 select the second result `INTEL GRAPHICS UPDATE TOOL FOR LINUX* OS V2.0.2` and this screen appears:

[![Intel Graphics for Linux 2][13]][13]

In my case I selected Ubuntu 16.04 64-bit which downloaded the file `intel-graphics-update-tool_2.0.2_amd64.deb` to my `~/Downloads` directory.

The next step is to open the terminal and use:

``` bash
cd Downloads
sudo dpkg -i intel*.deb
```

**NOTE:** Intel uses the *ancients* ttf font and your installation will fail if it's not on your system. At this point you need to use:

``` bash
sudo apt -f install
sudo apt update
sudo apt upgrade
```

Now you can run the `Intel Graphics for Linux Updater` tool as this screen shows:

[![Intel Graphics for Linux 3][14]][14]

### Add Intel signatures for Ubuntu

During `apt-get update` you can see warning / error messages like this:

``` bash
W: GPG error: https://download.01.org/gfx/ubuntu/16.04/main xenial InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 56A3DEF863961D39
E: The repository 'https://download.01.org/gfx/ubuntu/16.04/main xenial InRelease' is not signed.
N: Updating from such a repository can't be done securely, and is therefore disabled by default.
N: See apt-secure(8) manpage for repository creation and user configuration details.
```

You'll need to add Intel's signatures using:

``` bash
wget --no-check-certificate https://download.01.org/gfx/RPM-GPG-KEY-ilg-4 -O - | \
sudo apt-key add -
```

Then update in Ubuntu:

``` bash
sudo apt update
sudo apt upgrade
```


  [1]: https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/i915
  [2]: https://i.stack.imgur.com/PzEm6.png
  [3]: https://01.org/linuxgraphics/downloads/firmware
  [4]: https://i.stack.imgur.com/BFYtB.png
  [5]: {% post_url /2018/2018-05-23-How-to-make-locate-output-look-like-`ll`-or-`ls--la`-but-nicer^ %}
  [6]: https://bugs.launchpad.net/ubuntu/+source/linux-firmware/+bug/1611124
  [7]: https://i.stack.imgur.com/9lQBJ.png
  [8]: https://01.org/linuxgraphics/downloads/kabylake-guc-9.14
  [9]: https://01.org/linuxgraphics/downloads/kabylake-dmc-1.01
  [10]: https://01.org/linuxgraphics/downloads/broxton-guc-8.7
  [11]: https://01.org/linuxgraphics/downloads
  [12]: https://i.stack.imgur.com/B3uVd.png
  [13]: https://i.stack.imgur.com/Gufe8.png
  [14]: https://i.stack.imgur.com/jXgRV.png



<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr11" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

