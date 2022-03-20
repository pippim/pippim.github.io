---
layout:       post
title:        >
    Can I skip over releases when upgrading?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1161354
type:         Answer
tags:         upgrade
created_date: 2019-07-26 22:59:51
edit_date:    2019-08-04 00:32:39
votes:        "5 "
favorites:    
views:        "116,641 "
accepted:     
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-26-Can-I-skip-over-releases-when-upgrading_.md
toc:          false
navigation:   false
clipboard:    false
---

Almost universally the answers here say **NO you can't** but in reality you can if you do it right. This article describes how:

- [Upgrade Ubuntu 18.04 to Ubuntu 19.04 Directly From Command](https://www.linuxbabe.com/ubuntu/upgrade-ubuntu-18-04-to-ubuntu-19-04-directly-from-command-line)

The full article from the link is included below but check the link for new comments from users. I would point out that you can successfully upgrade directly from **16.04** to **19.04** but I had a few hiccups:

- [Unmet dependancy unity-control-center](Unmet dependancy unity-control-center)


----------
Full article below:

# Upgrade Ubuntu 18.04 to Ubuntu 19.04 Directly From Command Line

You have been informed that you must upgrade to Ubuntu 18.10 first in order to upgrade from 18.04 to 19.04. This is due to the fact that Ubuntu 18.10 is still being supported by Canonical and hasn’t reached end-of-life yet. After Ubuntu 18.10 reaches end-of-life in July 2019, Ubuntu 18.04 users can upgrade to 19.04 directly, following the standard upgrade procedure. If you don’t want to wait 3 months and don’t like upgrading twice, you can follow the instructions below to upgrade to 19.04 directly.

Note:  Before doing the upgrade, you can use the systemback program to create a bootable ISO image from your current OS. If the upgrade fails, you can easily restore your OS with the bootable ISO. Everything on your OS including software and files will be intact.  If you are using a laptop, please connect your power source.

### Upgrade Ubuntu 18.04 to Ubuntu 19.04 directly from the terminal

The method I’m going to show you is how the Ubuntu distribution upgrade manager works under the hood. The only difference is that we are going to change to upgrade path that Canonical gives us.

First, run the following command to upgrade existing software. (Please note that if a new kernel is installed while running the following command, you need to reboot system in order to continue the upgrade process.)

``` 
sudo apt update && sudo apt dist-upgrade
```

Then make sure you have update-manager-core package installed.

``` 
sudo apt install update-manager-core
```

Next, edit a configuration file using nano or your preferred command line text editor.

``` 
sudo nano /etc/update-manager/release-upgrades
```

At the bottom of this file, change the value of Prompt from lts to normal.

``` 
Prompt=normal
```

[![upgrade to ubuntu 19.04 from command line][1]][1]

To save a file in Nano text editor, press Ctrl+O, then press Enter to confirm. To exit, press Ctrl+X.

After that, we need to run the following command to change all instances of bionic to disco in the source list file (`/etc/apt/sources.list`). Bionic is the code name for Ubuntu 18.04, whereas disco is the code name for Ubuntu 19.04.

``` 
sudo sed -i 's/bionic/disco/g' /etc/apt/sources.list
```

Then we need to disable third-party repositories (PPAs) with the command below.

``` 
sudo sed -i 's/^/#/' /etc/apt/sources.list.d/*.list
```

After you disable third-party repositories, run the following commands to update software sources and upgrade software to the latest version available in the Ubuntu 19.04 repository. This step is called minimal upgrade.

``` 
sudo apt update  
sudo apt upgrade  
```

If the apt-listchanges shows up during the upgrade, you can press the <kbd>Q</kbd> key to return to the main screen.

``` 
apt-listchanges  
```

[![enter image description here][2]][2]

Once minimal upgrade is finished, run the following command to begin full upgrade.

``` 
sudo apt dist-upgrade
```

If you see this error:

``` 
Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
```

Then run the following command to fix the error.

``` 
sudo apt update
```

And rerun:

``` 
sudo apt dist-upgrade
```

Now you can remove obsolete/unneeded software packages from your Ubuntu system.

``` 
sudo apt autoremove  
sudo apt clean  
```

Finally, reboot the system.

``` 
sudo reboot  
```

Once restarting, you can open up a terminal window and check your Ubuntu version.

``` 
lsb_release  -a
```

You should see the following text.

``` 
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 19.04
Release:        19.04
Codename:       disco
```

### How to re-enable third-party repositories

Third-party repositories are defined in the .list files under `/etc/apt/sources.list.d/` directory. First, re-enable third-party repositories with the following command, which will remove the # character in lines that begin with deb.

``` 
sudo sed -i '/deb/s/^#//g' /etc/apt/sources.list.d/*.list
```

Then change all instances of bionic to disco.

``` 
sudo sed -i 's/bionic/disco/g' /etc/apt/sources.list.d/*.list
```

Update package repository index.

``` 
sudo apt update
```

Some third-party repositories don’t have an entry for Ubuntu 19.04, so you will likely to see errors like:

``` 
E: The repository 'http://linux.dropbox.com/ubuntu disco Release' does not have a Release file.
N: Updating from such a repository can't be done securely, and is therefore disabled by default.
N: See apt-secure(8) manpage for repository creation and user configuration details.
```

You will need to edit these repository files one by one and change disco back to bionic. For example, I edit the Dropbox repository file.

``` 
sudo nano /etc/apt/sources.list.d/dropbox.list
```

Change disco back to bionic. Save and close the file.


  [1]: https://i.stack.imgur.com/PnCid.png
  [2]: https://i.stack.imgur.com/9Lzou.png
