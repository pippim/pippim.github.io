---
layout:       post
title:        >
    How can I know if my GPU card driver supports Vulkan?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/846565
type:         Answer
tags:         opengl mesa vulkan
created_date: 2016-11-07 10:03:42
edit_date:    2016-11-07 10:37:51
votes:        "2 "
favorites:    
views:        "44,139 "
accepted:     Accepted
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-07-How-can-I-know-if-my-GPU-card-driver-supports-Vulkan_.md
toc:          false
navigation:   false
clipboard:    false
---

According to Intel: ([Intel open source graphics drivers and vulkan graphics api][1]) support for `Vulkan` is **seamlessly** built into Linux PC distributions.

Whether or not Vulkan or OpenGL support is built into a given game is up to that game's developer not to your hardware/firmware or software drivers.

As comment below points out the above "seamless" integration is for 6th generation CPUs. For IvyBridge (HD4000) and newer Vulkan support it is built into Mesa 13 Intel-Vulkan driver that can be downloaded here: ([archlinux.org vulkan-intel][2]) and is discussed in detail here: ([Mesa 13][3]). Note Mesa driver 13 was released November 1, 2016 and is a great improvement over version 12.


  [1]: https://software.intel.com/en-us/blogs/2016/06/23/intel-open-source-graphics-drivers-and-vulkan-graphics-api
  [2]: https://www.archlinux.org/packages/?name=vulkan-intel
  [3]: http://www.phoronix.com/scan.php?page=article&item=mesa-13&num=1
