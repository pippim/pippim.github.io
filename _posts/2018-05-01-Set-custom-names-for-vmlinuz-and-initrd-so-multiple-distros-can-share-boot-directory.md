---
layout:       post
title:        Set custom names for vmlinuz and initrd so multiple distros can share boot directory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1030361
type:         Answer
tags:         kernel configuration rename
created_date: 2018-05-01 00:24:37
edit_date:    2020-06-12 14:37:07
votes:        2
favorites:    
views:        1,162
accepted:     
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    true
---

You can't change the names for Ubuntu kernels because so many programs refers back to the original names. Take for example my current kernel `4.14.34`:

``` 
$ locate 4.14.34 | wc -l
70192
$ ll /boot/*4.14.34*
-rw-r--r-- 1 root root  1496011 Apr 12 05:53 /boot/abi-4.14.34-041434-generic
-rw-r--r-- 1 root root   213406 Apr 12 05:53 /boot/config-4.14.34-041434-generic
-rw-r--r-- 1 root root 58514444 Apr 28 13:36 /boot/initrd.img-4.14.34-041434-generic
-rw-r--r-- 1 root root        0 Apr 12 05:53 /boot/retpoline-4.14.34-041434-generic
-rw------- 1 root root  3952348 Apr 12 05:53 /boot/System.map-4.14.34-041434-generic
-rw------- 1 root root  8607504 Apr 30 03:52 /boot/vmlinuz-4.14.34-041434-generic

```

There are 70,192 files link to kernel version `4.14.34` but only five of them reside in `/boot` where you wish to do your renaming.

As mentioned in comments there is little danger of ArchLinux using the same kernel name as Ubuntu because they have their own unique numbering system: [How do I map Linux Kernels to Ubuntu Kernels?][1]

**NOTE:** At the time this was run I had two Ubuntu 16.04 partitions mounted so the `4.14.34` file count is 35,096 for a single 16.04 installation. Also note headers are included which I believe are optional but which I always install "just in case".

### Large listing

Below is the beginning of the `locate` listing. If `vmlinuz` were to be renamed the module files would likely not be locatable:

{% include copyHeader.html %}
``` 
$ locate 4.14.34 | head -n1000
/boot/System.map-4.14.34-041434-generic
/boot/abi-4.14.34-041434-generic
/boot/config-4.14.34-041434-generic
/boot/initrd.img-4.14.34-041434-generic
/boot/retpoline-4.14.34-041434-generic
/lib/modprobe.d/blacklist_linux_4.14.34-041434-generic.conf
/lib/modules/4.14.34-041434-generic
/lib/modules/4.14.34-041434-generic/build
/lib/modules/4.14.34-041434-generic/initrd
/lib/modules/4.14.34-041434-generic/kernel
/lib/modules/4.14.34-041434-generic/modules.alias
/lib/modules/4.14.34-041434-generic/modules.alias.bin
/lib/modules/4.14.34-041434-generic/modules.builtin
/lib/modules/4.14.34-041434-generic/modules.builtin.bin
/lib/modules/4.14.34-041434-generic/modules.dep
/lib/modules/4.14.34-041434-generic/modules.dep.bin
/lib/modules/4.14.34-041434-generic/modules.devname
/lib/modules/4.14.34-041434-generic/modules.order
/lib/modules/4.14.34-041434-generic/modules.softdep
/lib/modules/4.14.34-041434-generic/modules.symbols
/lib/modules/4.14.34-041434-generic/modules.symbols.bin
/lib/modules/4.14.34-041434-generic/vdso
/lib/modules/4.14.34-041434-generic/kernel/arch
/lib/modules/4.14.34-041434-generic/kernel/block
/lib/modules/4.14.34-041434-generic/kernel/crypto
/lib/modules/4.14.34-041434-generic/kernel/drivers
/lib/modules/4.14.34-041434-generic/kernel/fs
/lib/modules/4.14.34-041434-generic/kernel/kernel
/lib/modules/4.14.34-041434-generic/kernel/lib
/lib/modules/4.14.34-041434-generic/kernel/mm
/lib/modules/4.14.34-041434-generic/kernel/net
/lib/modules/4.14.34-041434-generic/kernel/sound
/lib/modules/4.14.34-041434-generic/kernel/virt
/lib/modules/4.14.34-041434-generic/kernel/arch/x86
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/events
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kernel
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kvm
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/oprofile
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/platform
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/aes-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/aesni-intel.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/blowfish-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/camellia-aesni-avx-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/camellia-aesni-avx2.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/camellia-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/cast5-avx-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/cast6-avx-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/chacha20-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/crc32-pclmul.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/crct10dif-pclmul.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/des3_ede-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/ghash-clmulni-intel.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/glue_helper.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/poly1305-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/salsa20-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/serpent-avx-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/serpent-avx2.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/serpent-sse2-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/sha1-mb
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/sha1-ssse3.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/sha256-mb
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/sha256-ssse3.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/sha512-mb
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/sha512-ssse3.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/twofish-avx-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/twofish-x86_64-3way.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/twofish-x86_64.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/sha1-mb/sha1-mb.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/sha256-mb/sha256-mb.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/crypto/sha512-mb/sha512-mb.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/events/intel
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/events/intel/intel-cstate.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/events/intel/intel-rapl-perf.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kernel/cpu
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kernel/cpuid.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kernel/msr.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kernel/cpu/mcheck
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kernel/cpu/mcheck/mce-inject.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kvm/kvm-amd.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kvm/kvm-intel.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/kvm/kvm.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/oprofile/oprofile.ko
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/platform/atom
/lib/modules/4.14.34-041434-generic/kernel/arch/x86/platform/atom/punit_atom_debug.ko
/lib/modules/4.14.34-041434-generic/kernel/block/bfq.ko
/lib/modules/4.14.34-041434-generic/kernel/block/kyber-iosched.ko
/lib/modules/4.14.34-041434-generic/kernel/block/mq-deadline.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/842.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/ablk_helper.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/aes_ti.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/af_alg.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/algif_aead.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/algif_hash.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/algif_rng.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/algif_skcipher.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/ansi_cprng.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/anubis.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/arc4.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/asymmetric_keys
/lib/modules/4.14.34-041434-generic/kernel/crypto/async_tx
/lib/modules/4.14.34-041434-generic/kernel/crypto/authenc.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/authencesn.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/blowfish_common.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/blowfish_generic.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/camellia_generic.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/cast5_generic.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/cast6_generic.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/cast_common.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/ccm.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/chacha20_generic.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/chacha20poly1305.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/cmac.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/crc32_generic.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/cryptd.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/crypto_engine.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/crypto_simd.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/crypto_user.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/deflate.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/des_generic.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/ecdh_generic.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/echainiv.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/fcrypt.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/keywrap.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/khazad.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/lrw.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/lz4.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/lz4hc.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/mcryptd.ko
/lib/modules/4.14.34-041434-generic/kernel/crypto/md4.ko

```

  [1]: https://askubuntu.com/questions/1010811/how-do-i-map-linux-kernels-to-ubuntu-kernels
