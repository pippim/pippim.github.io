---
layout:       post
title:        >
    Got error during installation of Oracle VM VirtualBox Extension Pack
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1065249
type:         Answer
tags:         permissions virtualbox virtualization root oracle
created_date: 2018-08-14 11:01:17
edit_date:    
votes:        "3 "
favorites:    
views:        "5,468 "
accepted:     Accepted
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-14-Got-error-during-installation-of-Oracle-VM-VirtualBox-Extension-Pack.md
toc:          false
navigation:   false
clipboard:    false
---

Virtualbox Extension Pack needs to be installed using root powers according to these bug reports:

- [Extpack "Error creating textual authentication agent"][1]
- [ExtPack installation failure][2]
- [Extpack installation fails][3]

Stack Exchange has the latest [installation instructions][4]

``` 
LatestVirtualBoxVersion=$(wget -qO - http://download.virtualbox.org/virtualbox/LATEST.TXT) && wget "http://download.virtualbox.org/virtualbox/${LatestVirtualBoxVersion}/Oracle_VM_VirtualBox_Extension_Pack-${LatestVirtualBoxVersion}.vbox-extpack"
https://www.virtualbox.org/download/hashes/${LatestVirtualBoxVersion}/SHA256SUMS
sudo VBoxManage extpack install --replace Oracle_VM_VirtualBox_Extension_Pack-${LatestVirtualBoxVersion}.vbox-extpack
VBoxManage list extpacks
```


  [1]: https://forums.virtualbox.org/viewtopic.php?f=7&t=44367
  [2]: https://www.virtualbox.org/ticket/17034
  [3]: https://forums.virtualbox.org/viewtopic.php?f=7&t=84195
  [4]: https://unix.stackexchange.com/questions/289685/how-to-install-virtualbox-extension-pack-to-virtualbox-latest-version-on-linux
