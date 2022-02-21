---
layout:       post
title:        >
    Dist-upgrade seems to have created an issue
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064512
type:         Answer
tags:         16.04 apt upgrade updates
created_date: 2018-08-11 20:27:01
edit_date:    2020-06-12 14:37:07
votes:        "12 "
favorites:    
views:        "5,983 "
accepted:     
uploaded:     2022-02-21 09:31:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-11-Dist-upgrade-seems-to-have-created-an-issue.md
toc:          false
navigation:   false
clipboard:    false
---

I had the same problem after running `sudo do-release-upgrade -d` on a Ubuntu 16.04 cloned partition. The intent was to test for bugs in upgrade to `18.04.1` but the system stalled with message:

``` 
To continue please press [ENTER]
Inhibiting until Ctrl+C is pressed...
```

So I pressed <kbd>Ctrl</kbd>+<kbd>C</kbd> and it returned to command prompt.

Next I ran:

``` 
$ sudo apt update
Hit:1 http://security.ubuntu.com/ubuntu bionic-security InRelease
Hit:2 http://ca.archive.ubuntu.com/ubuntu bionic InRelease
Hit:3 http://ca.archive.ubuntu.com/ubuntu bionic-updates InRelease
Hit:4 http://ca.archive.ubuntu.com/ubuntu bionic-backports InRelease
                             
(appstreamcli:15814): GLib-CRITICAL **: g_strchug: assertion 'string != NULL' failed

(appstreamcli:15814): GLib-CRITICAL **: g_strchomp: assertion 'string != NULL' failed

(appstreamcli:15814): GLib-CRITICAL **: g_strchug: assertion 'string != NULL' failed

(appstreamcli:15814): GLib-CRITICAL **: g_strchomp: assertion 'string != NULL' failed
AppStream cache update completed, but some metadata was ignored due to errors.
Reading package lists... Done
Building dependency tree       
Reading state information... Done
1675 packages can be upgraded. Run 'apt list --upgradable' to see them.
```

Based on comments above plus this answer: [Hit Ctrl+c during do-release-upgrade. Did I break it?][1] I used:

``` 
sudo sed -i -e 's/bionic/xenial/g' /etc/apt/sources.list
```

Now `sudo apt update` completes normally. 

## Problems with upgrade

Now when I run `do-release-upgrade -d` and pay close attention I notice these lines in the middle:

``` 
Get:57 http://ca.archive.ubuntu.com/ubuntu bionic-backports/universe DEP-11 64x64 Icons [1,789 B]
Fetched 44.8 MB in 6s (4,884 kB/s)                                                         

(appstreamcli:30117): GLib-CRITICAL **: g_strchug: assertion 'string != NULL' failed

(appstreamcli:30117): GLib-CRITICAL **: g_strchomp: assertion 'string != NULL' failed

(appstreamcli:30117): GLib-CRITICAL **: g_strchug: assertion 'string != NULL' failed

(appstreamcli:30117): GLib-CRITICAL **: g_strchomp: assertion 'string != NULL' failed
AppStream cache update completed, but some metadata was ignored due to errors.

Checking package manager
Reading package lists... Done    
```

I abort the upgrade by answering <kbd>N</kbd> to prompt.

A quick search leads to this Question & Answer: [E: Problem executing scripts APT Update::Post-Invoke-Success error during apt-get update](E: Problem executing scripts APT Update::Post-Invoke-Success error during apt-get update)

I can verify the same situation using:

``` 
$ sudo apt update
Hit:1 http://security.ubuntu.com/ubuntu xenial-security InRelease
Hit:2 http://ca.archive.ubuntu.com/ubuntu xenial InRelease                                 
Hit:3 http://ca.archive.ubuntu.com/ubuntu xenial-updates InRelease
Hit:4 http://ca.archive.ubuntu.com/ubuntu xenial-backports InRelease
AppStream cache update completed, but some metadata was ignored due to errors.
Reading package lists... Done
Building dependency tree       
Reading state information... Done
All packages are up to date.
```

The recommended solution in the link is to use:

``` 
sudo apt-get purge libappstream3
```

Running this the meta error is now gone:

``` 
$ sudo apt update
Hit:1 http://security.ubuntu.com/ubuntu xenial-security InRelease
Hit:2 http://ca.archive.ubuntu.com/ubuntu xenial InRelease
Hit:3 http://ca.archive.ubuntu.com/ubuntu xenial-updates InRelease
Hit:4 http://ca.archive.ubuntu.com/ubuntu xenial-backports InRelease
Reading package lists... Done
Building dependency tree       
Reading state information... Done
All packages are up to date.
```

Next step will be to run `sudo do-release-upgrade -d` a third time and cross my fingers.

## Misleading message during upgrade

Another user had similar problem: [Ubuntu upgrade from 16.04 to 18.04 is taking too long](Ubuntu upgrade from 16.04 to 18.04 is taking too long)

Turns out the two line message comes out at the same time:

``` 
To continue please press [ENTER]
Inhibiting until Ctrl+C is pressed...
```

You think the upgrade is inhibited until you press <kbd>Ctrl</kbd>+<kbd>C</kbd> but what it really means is the upgrade doesn't start until you press <kbd>Enter</Kbd>.

*sigh*

  [1]: https://askubuntu.com/questions/146308/hit-ctrlc-during-do-release-upgrade-did-i-break-it


