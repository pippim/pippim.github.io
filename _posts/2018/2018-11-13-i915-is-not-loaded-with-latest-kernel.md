---
layout:       post
title:        >
    i915 is not loaded with latest kernel
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1092585
type:         Answer
tags:         kernel i915
created_date: 2018-11-13 14:54:00
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "2,120 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-13-i915-is-not-loaded-with-latest-kernel.md
toc:          false
navigation:   false
clipboard:    false
---

It's not recommended to compile your own i915 but rather [grab the latest stack][1].

That said you need to:

# Preparing build environment

Use the following line or similar to prepare the build environment for all sources except for kernel:

``` 
./autogen.sh --prefix=$MY_DISTRO_PREFIX --libdir=$MY_DISTRO_LIBDIR
```

`$MY_DISTRO_PREFIX` and `$MY_DISTRO_LIBDIR` depends on your Linux distribution and whether your distro is 32 bits or 64 bits.

Check carefully what you should use on your distro. Here are some examples on Fedora 64 bits and on Ubuntu 64 bits:

Fedora 64 bits: 

``` 
export MY_DISTRO_PREFIX=/usr

export MY_DISTRO_LIBDIR=/usr/lib64
```

Ubuntu 64 bits:

``` 
export MY_DISTRO_PREFIX=/usr

export MY_DISTRO_LIBDIR=/usr/lib/x86_64-linux-gnu
```

For each package there is a list of dependencies that you must have already installed at your distro to get build components. Names of packages listed below are generic. You should check the real package name for your distribution. Also, the list doesn't include basic build packages such as gcc, autotools, automake and other common build tools.

# Building kernel

``` 
git clone git://anongit.freedesktop.org/drm-tip

make defconfig

make

sudo make modules_install

sudo make install
```

 
# Building libdrm

``` 
git clone git://anongit.freedesktop.org/mesa/drm

./autogen.sh --prefix=$MY_DISTRO_PREFIX --libdir=$MY_DISTRO_LIBDIR

make

sudo make install
```

 
# Building 2D driver Xf86-video-intel

Install Build dependencies: `libdrm-devel`

``` 
git clone git://anongit.freedesktop.org/xorg/driver/xf86-video-intel

./autogen.sh --prefix=$MY_DISTRO_PREFIX --libdir=$MY_DISTRO_LIBDIR

make

sudo make install
```

 
# Building 3D - Mesa

Install Build dependencies: `libdrm-devel`

``` 
git clone git://anongit.freedesktop.org/mesa/mesa

./autogen.sh --prefix=$MY_DISTRO_PREFIX --libdir=$MY_DISTRO_LIBDIR --with-dri-drivers="i915 i965" --with-dri-driverdir=$MY_DISTRO_PREFIX/lib/dri --enable-gles1--enable-gles2  --enable-shared-glapi  --with-gallium-drivers= --with-egl-platforms=x11,drm --enable-texture-float --enable-gbm --enable-glx-tls --enble-dri3

make

sudo make install
```

 
# Building Xserver

``` 
git clone git://git.freedesktop.org/git/xorg/xserver

./autogen.sh --prefix=$MY_DISTRO_PREFIX

make

sudo make install
```

 
# Building Libva

Install Build dependencies: mesa-devel, libpciaccess-devel, libdrm-devel, libXfixes-devel, libXext-devel.

``` 
git clone git://git.freedesktop.org/git/vaapi/libva

./autogen.sh --prefix=$MY_DISTRO_PREFIX 

make

sudo make install
```

 
# Building VAAPI Intel Driver

Install Build dependencies:   libXfiles-devel, libXexet-devel, libva-devel, libdrm-devel, libpciaccess-devel, mesa-libGL-devel.

``` 
git clone git://git.freedesktop.org/git/vaapi/intel-driver

./autogen.sh --prefix=$MY_DISTRO_PREFIX 

make

sudo make install
```

 
# Building Cairo

``` 
git clone git://git.freedesktop.org/git/cairo

./autogen.sh --prefix=$MY_DISTRO_PREFIX 

make

sudo make install
```

 
# Building Intel-gpu-tools

Install Build dependencies: libpciaccess-dev, libdrm-dev xutilx-dev libcairo2-dev swig2.0 libpython3.3-dev x11proto-dri2-dev, mesa-devel, xorg-xserver-devel, xorg-macros, glib2-devel.

``` 
git clone git://anongit.freedesktop.org/xorg/app/intel-gpu-tools

./autogen.sh --prefix=$MY_DISTRO_PREFIX --libdir=$MY_DISTRO_LIBDIR --disable-amdgpu

make

sudo make install
```


  [1]: https://01.org/linuxgraphics/documentation/build-guide-0















