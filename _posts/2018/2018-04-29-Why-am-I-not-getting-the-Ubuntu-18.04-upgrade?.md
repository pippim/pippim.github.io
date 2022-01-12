---
layout:       post
title:        >
    Why am I not getting the Ubuntu 18.04 upgrade?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029863
type:         Answer
tags:         upgrade 18.04 grub
created_date: 2018-04-29 20:51:34
edit_date:    2018-05-03 22:59:55
votes:        "24 "
favorites:    
views:        "52,887 "
accepted:     
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

A thorough guide for upgrading is presented [here][1]. Other answers already mention you need to use:

``` 
do-release-upgrade -d     # Use this until 18.04.1 comes out
do-release-upgrade        # Use this after 18.04.1 comes out

```

Additionally though you need to check the file:

``` 
~$ cat /etc/update-manager/release-upgrades
# Default behavior for the release upgrader.

[DEFAULT]
# Default prompting behavior, valid options:
#
#  never  - Never check for a new release.
#  normal - Check to see if a new release is available.  If more than one new
#           release is found, the release upgrader will attempt to upgrade to
#           the release that immediately succeeds the currently-running
#           release.
#  lts    - Check to see if a new LTS release is available.  The upgrader
#           will attempt to upgrade to the first LTS release available after
#           the currently-running one.  Note that this option should not be
#           used if the currently-running release is not itself an LTS
#           release, since in that case the upgrader won't be able to
#           determine if a newer release is available.
Prompt=never

```

If the last line says "never" change it to "normal" for Ubuntu 17.10 users. For Ubuntu 16.04 LTS users, change it to "LTS". Otherwise you will get the upgrade...um "never":

``` 
rick@alien:~$ do-release-upgrade
Checking for a new Ubuntu release
No new release found.
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ do-release-upgrade -d
Checking for a new Ubuntu release
Upgrades to the development release are only 
available from the latest supported release.
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ do-release-upgrade -c
Checking for a new Ubuntu release
No new release found.

```

These commands were issued with `Prompt=never` under Ubuntu 16.04 where it is available for upgrading yesterday (April 28, 2018). Changing the prompt to `lts` solved the problem.

----------

You should either backup your data first or **clone your data** and run the upgrade in a test environment. Here is one script I wrote for such a purpose (but you can also do it manually with Live USB): [Bash script to clone Ubuntu to new partition for testing 18.04 LTS upgrade][2]

I made some notes during the upgrade process and here is what you can look forward to:

``` 
Step 1: confirmation to proceed: Press [ENTER]
Step 2: packages will be removed: Y
Step 3: replace '/etc/systemd/longind.conf': Y
Step 4: Configuration file '/etc/sane.d/dll.conf', default N, take Y
Step 5: Configuration file '/etc/NetworkManager/conf.d/default-wifi-powersave-on.conf' Take default N
Step 6: Configuration file '/etc/pulse/default.pa' default N, take Y
Step 7: Configuration file '/etc/grub.d/30_os-prober'' default N, take N
Step 8: Full screen grub menu config appears. Take option: keep the local version currently installed
Step 9: Configuration file '/etc/cron.d/anacron', default N, take Y to see what
Error Message multiple times: /sbin/ldconfig.real: Warning: ignoring configuration file that cannot be opened: /etc/ld.so.conf.d/x86_64-linux-gnu_EGL.conf: No such file or directory
Step 10: Non-standard: Configuration file '/etc/vnstat.conf' (display differences 1.13 vs 1.18) take Y
Step 11: 220 packages are going to be removed. (can take hours) enter Y
Step 12: To finish the upgrade, a restart is required. Take Y

```

Note your steps will vary depending on software installed.

All the more reason for cloning is you can test what happens when you accept default of `N` or you use `Y` to get the most current configuration which may or many not be better.

Because your original Ubuntu version is left intact you can run the `diff` command against the new 18.04 configuration files if you chose to install them.

  [1]: https://help.ubuntu.com/community/Upgrades
  [2]: {% post_url /2018/2018-04-27-Bash-script-to-backup∕clone-Ubuntu-to-another-partition %}
