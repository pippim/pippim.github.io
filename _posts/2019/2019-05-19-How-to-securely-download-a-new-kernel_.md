---
layout:       post
title:        >
    How to securely download a new kernel?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1144551
type:         Answer
tags:         kernel updates grub
created_date: 2019-05-19 17:10:07
edit_date:    
votes:        "6 "
favorites:    
views:        "787 "
accepted:     Accepted
uploaded:     2022-02-10 05:58:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-19-How-to-securely-download-a-new-kernel_.md
toc:          false
navigation:   false
clipboard:    false
---

# Introduction

The key point in the question is how to do it securely. I've divided this answer into four sections:

- How to find the newest mainline stable Ubuntu kernels
- How to download the kernel and checksum files
- How to verify checksums
- How to install new kernel


----------


# How to find the newest mainline stable Ubuntu kernels

Go to [https://kernel.ubuntu.com/~kernel-ppa/mainline](https://kernel.ubuntu.com/~kernel-ppa/mainline)e and click on date modified two times. The first time sorts by date in ascending order, the second time sorts descending. Your newest kernels will be on top:

[![mainline kernel 1.png][1]][1]

I'm interested in `4.14.120` which is an LTS (Long Term Support) kernel for five years. I'll click on it and move to the next section:


----------


# How to download the kernel and checksum files

[![mainline kernel 2.png][2]][2]

I've selected the generic packages for downloading:

``` 
linux-headers-4.14.120-0414120_4.14.120-0414120.201905161610_all.deb
linux-headers-4.14.120-0414120-generic_4.14.120-0414120.201905161610_amd64.deb
linux-image-unsigned-4.14.120-0414120-generic_4.14.120-0414120.201905161610_amd64.deb
linux-modules-4.14.120-0414120-generic_4.14.120-0414120.201905161610_amd64.deb
```

Scroll down further and you will find the `CHECKSUM` files that guarantees what was published is what you actually received:

``` 
CHECKSUMS       2019-05-16 21:34    9.0K	 
CHECKSUMS.gpg   2019-05-16 21:34    473 	
```

Click both checksums to download them and move onto the next section.

----------

# How to verify checksums

After downloading checksum links follow [these instructions][3]:

> ###Verifying the mainline build binaries  
>   
> In order to allow verification that the published builds are the  
> builds made by the mainline build system, the individual files are  
> checksummed and the results of that published as CHECKSUMS in the same  
> directory. This file is in turn signed by the mainline builder using  
> the GPG key below which can be obtained from the Ubuntu Keyserver:  
>   
> pub   2048R/17C622B0 2008-05-01  
>       Key fingerprint = 60AA 7B6F 3043 4AE6 8E56  9963 E50C 6A09 17C6 22B0 uid                  Kernel PPA <kernel-ppa@canonical.com>  
>   
> The verification can be done by running the following commands:  
>   
>     Import the above public key to your keyring (if you haven't already done that):  
>   
>     $ gpg --keyserver hkps://pgp.mit.edu --recv-key "60AA7B6F30434AE68E569963E50C6A0917C622B0"  
>   
>     Download the CHECKSUMS and CHECKSUMS.gpg files from the build directory and verify if the CHECKSUMS is signed with the above key:  
>   
>     $ gpg --verify CHECKSUMS.gpg CHECKSUMS  
>     gpg: Signature made .... using RSA key ID 17C622B0  
>     gpg: Good signature from "Kernel PPA <kernel-ppa@canonical.com>"  
>     gpg: WARNING: This key is not certified with a trusted signature!  
>     gpg:          There is no indication that the signature belongs to the owner.  
>   
>     Verify the checksums of downloaded deb files:  
>   
>     $ shasum -c CHECKSUMS 2>&1 | grep 'OK$'  
>   
>     You should get a line ending with "OK" for each of downloaded deb file and each type of checksums that are given in the CHECKSUMS file.  

I've edited the `CHECKSUMS` file and removed irrelevant kernels (ARM, S390, low-latency, Power PC and 32-Bit) to leave only the checksums for files downloaded above:

``` 
# Checksums for v4.14.120, check with the command below:
#     shasum -c CHECKSUMS
#
# Checksums-Sha1:
b26b07d9ae2dcf25648dab3fe2374f6a2df219d1  COMMIT
44d09220f11394adb7067a79ce1693ed8e6e149e  linux-headers-4.14.120-0414120_4.14.120-0414120.201905161610_all.deb
4cea2a7041ddf2655426f9fc4a57c39d0b6e02b8  linux-headers-4.14.120-0414120-generic_4.14.120-0414120.201905161610_amd64.deb
24ae91d3d812ef2fec4527f5d2acd5d089c27cb1  linux-image-unsigned-4.14.120-0414120-generic_4.14.120-0414120.201905161610_amd64.deb
194fbaae734d33ba26ec1bb631f59b1c01740a3d  linux-modules-4.14.120-0414120-generic_4.14.120-0414120.201905161610_amd64.deb

#
# Checksums-Sha256:
c253adc68879d07caffca5037ca997d7d2c7b74e87073093566c33e7a6a517e8  COMMIT
bf32ef3ee0b410f9264f1b6dd2349c5753ba73d02b5977d49010120ac6f1e7aa  linux-headers-4.14.120-0414120_4.14.120-0414120.201905161610_all.deb
4f769f431f99cadb4c564d0da4c6231a2c593307c10c520f81b74834a6149b28  linux-headers-4.14.120-0414120-generic_4.14.120-0414120.201905161610_amd64.deb
b18a6163ec0a42a598795cb181dcde86d0c59e9b9b117a1b9e5d7186e967b59a  linux-image-unsigned-4.14.120-0414120-generic_4.14.120-0414120.201905161610_amd64.deb
8aa8790171b9e948f2d5b0ce8c54a81d2b2bfb9d33ead499d865f841497fcabc  linux-modules-4.14.120-0414120-generic_4.14.120-0414120.201905161610_amd64.deb
```


**Note:** For some reason the `CHECKSUMS` file opened up instead of downloading. I had to copy and paste text to manually created file `CHECKSUMS`.

----------


# How to install new kernel

Assuming checksum verification passed change to your downloads directory and install:

``` 
cd ~/Downloads        # Go to our downloads directory
sudo dpkg -i *.deb    # Install all four kernel .deb files downloaded
rm -f *.deb           # Clean up so we don't accidentally install next time around
reboot                # reboot to grub and select new kernel on Advanced Options
```

Note don't key in `#` comments those are for explanation purposes and machine ignores them.

  [1]: https://i.stack.imgur.com/pKVjxl.png
  [2]: https://i.stack.imgur.com/VoCKhl.png
  [3]: https://wiki.ubuntu.com/Kernel/MainlineBuilds#Verifying_the_mainline_build_binaries
