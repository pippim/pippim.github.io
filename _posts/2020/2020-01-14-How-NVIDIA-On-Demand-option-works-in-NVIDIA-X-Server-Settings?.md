---
layout:       post
title:        >
    How NVIDIA On-Demand option works in NVIDIA X Server Settings?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1202902
type:         Answer
tags:         nvidia graphics hybrid-graphics nvidia-prime
created_date: 2020-01-14 12:35:15
edit_date:    2020-06-12 14:37:07
votes:        "14 "
favorites:    
views:        "35,518 "
accepted:     Accepted
uploaded:     2022-01-09 05:38:31
toc:          false
navigation:   false
clipboard:    false
---

From: [Part I. Installation and Configuration Instructions][1]

# Chapter 35. PRIME Render Offload

PRIME render offload is the ability to have an X screen rendered by one GPU, but choose certain applications within that X screen to be rendered on a different GPU. This is particularly useful in combination with dynamic power management to leave an NVIDIA GPU powered off, except when it is needed to render select performance-sensitive applications.

The GPU rendering the majority of the X screen is known as the "sink", and the GPU to which certain application rendering is "offloaded" is known as the "source". The render offload source produces content that is presented on the render offload sink. The NVIDIA driver can function as a PRIME render offload source, to offload rendering of GLX+OpenGL or Vulkan, presenting to an X screen driven by the xf86-video-modesetting X driver.

### X Server Requirements

NVIDIA's PRIME render offload support requires the following git commits in the X.Org X server:

-    7f962c70 - xsync: Add resource inside of SyncCreate, export SyncCreate

-    37a36a6b - GLX: Add a per-client vendor mapping

-    8b67ec7c - GLX: Use the sending client for looking up XID's

-    56c0a71f - GLX: Add a function to change a clients vendor list

-    b4231d69 - GLX: Set GlxServerExports::{major,minor}Version

As of this writing, these commits are only in the master branch of the X.Org X server, and not yet in any official X.Org X server release.


  [1]: https://download.nvidia.com/XFree86/Linux-x86_64/435.21/README/primerenderoffload.html
