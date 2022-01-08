---
layout:       post
title:        >
    Is it possible to patch without spiking the CPU?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1164186
type:         Answer
tags:         16.04 upgrade swap cpu-load unattended-upgrades
created_date: 2019-08-07 23:18:13
edit_date:    2019-08-08 00:05:07
votes:        "3 "
favorites:    
views:        "317 "
accepted:     
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    true
---

I think this [answer][1] contains everything you are looking for:

> OK, I managed myself to do the same you did, but with some changes:  

1) I installed the same utilities: 

``` 
sudo apt-get install cgroup-bin cgroup-lite cgroup-tools cgroupfs-mount libcgroup1

```

2) I edited conf files like this:

`sudo -H gedit /etc/init/cgroup-lite.conf`

``` 
description "mount available cgroup filesystems"
author "Serge Hallyn <serge.hallyn@canonical.com>"

start on mounted MOUNTPOINT=/sys/fs/cgroup

pre-start script
	test -x /bin/cgroups-mount || { stop; exit 0; }
```

	test -d /sys/fs/cgroup || { stop; exit 0; }
	/bin/cgroups-mount
	cgconfigparser -l /etc/cgconfig.conf
``` 
end script

post-stop script
	if [ -x /bin/cgroups-umount ]
```

	then
		/bin/cgroups-umount
	fi
``` 
end script

```

`sudo -H gedit /etc/cgconfig.conf`

{% include copyHeader.html %}
``` 

# Since systemd is working well, this section may not be necessary.
# Uncomment if you need it
#
# mount {
# cpuacct = /cgroup/cpuacct;
# memory = /cgroup/memory;
# devices = /cgroup/devices;
# freezer = /cgroup/freezer;
# net_cls = /cgroup/net_cls;
# blkio = /cgroup/blkio;
# cpuset = /cgroup/cpuset;
# cpu = /cgroup/cpu;
# }

group limitcpu{
  cpu {
    cpu.shares = 400;
  }
}

group limitmem{
  memory {
    memory.limit_in_bytes = 512m;
  }
}

group limitio{
  blkio {
    blkio.throttle.read_bps_device = "252:0         2097152";
  }
}

group browsers {
    cpu {
#       Set the relative share of CPU resources equal to 25%
    cpu.shares = "256";
}
memory {
#       Allocate at most 512M of memory to tasks
        memory.limit_in_bytes = "512m";
#       Apply a soft limit of 512 MB to tasks
        memory.soft_limit_in_bytes = "384m";
    }
}

group media-players {
    cpu {
#       Set the relative share of CPU resources equal to 25%
        cpu.shares = "256";
    }
    memory {
#       Allocate at most 256M of memory to tasks
        memory.limit_in_bytes = "256m";
#       Apply a soft limit of 196 MB to tasks
        memory.soft_limit_in_bytes = "128m";
    }
}

cgconfigparser -l /etc/cgconfig.conf

```

`sudo -H gedit /etc/cgrules.conf`

``` 
user:process                                         subsystems   group
[user]:/usr/lib/chromium-browser/chromium-browser   cpu,memory      browsers
[user]:/usr/bin/clementine	            		  cpu,memory	 media-players

```

**Note: This section needs to be updated with `/usr/bin/apt`**

That is an example, use your username instead of [user]. You can add the applications you need to limit and define whether you want them to be CPU-, memory- or both limited.

I edited the `GRUB_CMDLINE_LINUX_DEFAULT` line in `/etc/default/grub`:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="cgroup_enable=memory swapaccount=1"

```

Updating it: 
``` 

sudo update-grub

```

3) And finally rebooting to apply changes.

> And that is how I've got this working. Before this I was having  
> frequent OOMs with multitasking - with chromium-browser, clementine,  
> sublime-text and other applications using a lot of resources -, now  
> they are running smoothly and I can multitask better.  


----------


Additional `cgroups` resources:

- `cgroups` was developed by Google in 2006: [Wikipedia][2]
- [Everything You Need to Know about Linux Containers, Part I: Linux Control Groups and Process Isolation][3]


  [1]: https://askubuntu.com/a/899273/307523
  [2]: https://en.wikipedia.org/wiki/Cgroups
  [3]: https://www.linuxjournal.com/content/everything-you-need-know-about-linux-containers-part-i-linux-control-groups-and-process
