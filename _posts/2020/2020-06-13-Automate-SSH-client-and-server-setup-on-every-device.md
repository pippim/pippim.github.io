---
layout:       post
title:        >
    Automate SSH client and server setup on every device
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1250056
type:         Question
tags:         networking server ssh openssh sshd
created_date: 2020-06-13 21:44:39
edit_date:    2020-06-14 18:42:24
votes:        "1 "
favorites:    
views:        "783 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-13-Automate-SSH-client-and-server-setup-on-every-device.md
toc:          false
navigation:   false
clipboard:    false
---

I don't think my needs are all that unique. I have a home network wired and wireless with multiple devices running  Ubuntu 16.04.6 LTS. They will be upgraded to 20.04 soon though. My desire is to setup each device both as a Client **AND** Server to every other device. Currently I have:

- Dell Inspiron 17R SE 7720 laptop
- Dell Alienware 17R3 laptop
- Same user name on both machines

I'm looking for a script that will install and configure `ssh` or `openssh-client` AND `openssh-server` on both machines. This assumes `ssh` includes both client and server.

The script will:

1. Remove `ssh` if already installed. (This may not be necessary I guess...)
2. Install `ssh` and trigger `sshd` to run by `systemd`.
3. Name the machine in `/etc/hosts` or `/etc/resolve` or where ever network names are needed.
4. Setup the static IP's wherever static IP's are setup.
5. Create the keys whereever keys are setup.
6. Block out access to any device not on LAN.
7. Automatically prevent snooping or spoofing or whatever `sp`ing there is to prevent.
8. Set current machine up as valid client to all other machines (who are also servers) on the LAN. Probably involves copying SSH client keys.
9. Ask Ubuntu Q&A: [Automatically change Terminal colors on remote connection?](Automatically change Terminal colors on remote connection?)

Do everything else required per internet articles:

- [Ubuntu Linux install OpenSSH server][1]
- [How to Enable SSH on Ubuntu 18.04][2]
- [sshd][3]
- [OpenSSH Config File Examples][4]
- [How To Use SSH to Connect to a Remote Server in Ubuntu][5]

Calling the script should be straight forward with:

``` 
sudo ssh-setup HOST_NAME USER_NAME
```

Again the machine is setup as both a server and a client. Initially I'll just have two laptops. Later on I'll want to add my Linux Kernel based phones and TV's running Android. Initially all machines will just have the single user ID.

Is there a script already out there or do I have to write my own?


----------

### June 13, 2020 update

I've begun writing a script but it will take at least a week to complete.

  [1]: https://www.cyberciti.biz/faq/ubuntu-linux-install-openssh-server/
  [2]: https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-18-04/
  [3]: https://www.ssh.com/ssh/sshd/
  [4]: https://www.cyberciti.biz/faq/create-ssh-config-file-on-linux-unix/
  [5]: https://www.digitalocean.com/community/tutorials/how-to-use-ssh-to-connect-to-a-remote-server-in-ubuntu
