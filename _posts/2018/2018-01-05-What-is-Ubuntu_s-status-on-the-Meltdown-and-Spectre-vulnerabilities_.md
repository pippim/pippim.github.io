---
layout:       post
title:        >
    What is Ubuntu's status on the Meltdown and Spectre vulnerabilities?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/992459
type:         Answer
tags:         security
created_date: 2018-01-05 01:44:43
edit_date:    2018-01-21 18:50:22
votes:        "2 "
favorites:    
views:        "28,648 "
accepted:     
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-05-What-is-Ubuntu_s-status-on-the-Meltdown-and-Spectre-vulnerabilities_.md
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# January 20, 2018 

Spectre protection ([Retpoline][1]) was released for Kernel 4.9.77 and 4.14.14 by the Linux Kernel team on January 15, 2018. The Ubuntu Kernel team only released kernel version 4.9.77 on January 17, 2018 and have not published kernel version 4.14.14. The reason is unclear why but 4.14.14 has been re-requested as answered in Ask Ubuntu: [Why was kernel 4.9.77 released but not kernel 4.14.14?][2] and didn't appear until today.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# January 17, 2018 Adding Spectre Support to Meltdown

I thought some would be interested in the changes in 4.14.14 (from 4.14.13) as documented in programmers' comments which I think are pretty detailed for kernel C programmers from my limited exposure. Here are the changes from 4.14.13 to 4.14.14 kernel focusing mainly on [Spectre][3] support:

{% include copyHeader.html %}
``` 
+What:  /sys/devices/system/cpu/vulnerabilities
+		/sys/devices/system/cpu/vulnerabilities/meltdown
+		/sys/devices/system/cpu/vulnerabilities/spectre_v1
+		/sys/devices/system/cpu/vulnerabilities/spectre_v2
+Date:		January 2018
+Contact:	Linux kernel mailing list <linux-kernel@vger.kernel.org>
+Description:	Information about CPU vulnerabilities
+
+		The files are named after the code names of CPU
+		vulnerabilities. The output of those files reflects the
+		state of the CPUs in the system. Possible output values:
+
+		"Not affected"	  CPU is not affected by the vulnerability
+		"Vulnerable"	  CPU is affected and no mitigation in effect
+		"Mitigation: $M"  CPU is affected and mitigation $M is in effect
diff --git a/Documentation/admin-guide/kernel-parameters.txt b/Documentation/admin-guide/kernel-parameters.txt
index 520fdec15bbb..8122b5f98ea1 100644
--- a/Documentation/admin-guide/kernel-parameters.txt
+++ b/Documentation/admin-guide/kernel-parameters.txt
@@ -2599,6 +2599,11 @@ 
 	nosmt		[KNL,S390] Disable symmetric multithreading (SMT).
 			Equivalent to smt=1.
 
+	nospectre_v2	[X86] Disable all mitigations for the Spectre variant 2
+			(indirect branch prediction) vulnerability. System may
+			allow data leaks with this option, which is equivalent
+			to spectre_v2=off.
+
 	noxsave		[BUGS=X86] Disables x86 extended register state save
 			and restore using xsave. The kernel will fallback to
 			enabling legacy floating-point and sse state.
@@ -2685,8 +2690,6 @@ 
 			steal time is computed, but won't influence scheduler
 			behaviour
 
-	nopti		[X86-64] Disable kernel page table isolation
-
 	nolapic		[X86-32,APIC] Do not enable or use the local APIC.
 
 	nolapic_timer	[X86-32,APIC] Do not use the local APIC timer.
@@ -3255,11 +3258,20 @@ 
 	pt.		[PARIDE]
 			See Documentation/blockdev/paride.txt.
 
-	pti=		[X86_64]
-			Control user/kernel address space isolation:
-			on - enable
-			off - disable
-			auto - default setting
+	pti=		[X86_64] Control Page Table Isolation of user and
+			kernel address spaces.  Disabling this feature
+			removes hardening, but improves performance of
+			system calls and interrupts.
+
+			on   - unconditionally enable
+			off  - unconditionally disable
+			auto - kernel detects whether your CPU model is
+			       vulnerable to issues that PTI mitigates
+
+			Not specifying this option is equivalent to pti=auto.
+
+	nopti		[X86_64]
+			Equivalent to pti=off
 
 	pty.legacy_count=
 			[KNL] Number of legacy pty's. Overwrites compiled-in
@@ -3901,6 +3913,29 @@ 
 	sonypi.*=	[HW] Sony Programmable I/O Control Device driver
 			See Documentation/laptops/sonypi.txt
 
+	spectre_v2=	[X86] Control mitigation of Spectre variant 2
+			(indirect branch speculation) vulnerability.
+
+			on   - unconditionally enable
+			off  - unconditionally disable
+			auto - kernel detects whether your CPU model is
+			       vulnerable
+
+			Selecting 'on' will, and 'auto' may, choose a
+			mitigation method at run time according to the
+			CPU, the available microcode, the setting of the
+			CONFIG_RETPOLINE configuration option, and the
+			compiler with which the kernel was built.
+
+			Specific mitigations can also be selected manually:
+
+			retpoline	  - replace indirect branches
+			retpoline,generic - google's original retpoline
+			retpoline,amd     - AMD-specific minimal thunk
+
+			Not specifying this option is equivalent to
+			spectre_v2=auto.
+
 	spia_io_base=	[HW,MTD]
 	spia_fio_base=
 	spia_pedr=
diff --git a/Documentation/x86/pti.txt b/Documentation/x86/pti.txt
new file mode 100644
index 000000000000..d11eff61fc9a
--- /dev/null
+++ b/Documentation/x86/pti.txt
@@ -0,0 +1,186 @@ 
+Overview
+========
+
+Page Table Isolation (pti, previously known as KAISER[1]) is a
+countermeasure against attacks on the shared user/kernel address
+space such as the "Meltdown" approach[2].
+
+To mitigate this class of attacks, we create an independent set of
+page tables for use only when running userspace applications.  When
+the kernel is entered via syscalls, interrupts or exceptions, the
+page tables are switched to the full "kernel" copy.  When the system
+switches back to user mode, the user copy is used again.
+
+The userspace page tables contain only a minimal amount of kernel
+data: only what is needed to enter/exit the kernel such as the
+entry/exit functions themselves and the interrupt descriptor table
+(IDT).  There are a few strictly unnecessary things that get mapped
+such as the first C function when entering an interrupt (see
+comments in pti.c).
+
+This approach helps to ensure that side-channel attacks leveraging
+the paging structures do not function when PTI is enabled.  It can be
+enabled by setting CONFIG_PAGE_TABLE_ISOLATION=y at compile time.
+Once enabled at compile-time, it can be disabled at boot with the
+'nopti' or 'pti=' kernel parameters (see kernel-parameters.txt).
+
+Page Table Management
+=====================
+
+When PTI is enabled, the kernel manages two sets of page tables.
+The first set is very similar to the single set which is present in
+kernels without PTI.  This includes a complete mapping of userspace
+that the kernel can use for things like copy_to_user().
+
+Although _complete_, the user portion of the kernel page tables is
+crippled by setting the NX bit in the top level.  This ensures
+that any missed kernel->user CR3 switch will immediately crash
+userspace upon executing its first instruction.
+
+The userspace page tables map only the kernel data needed to enter
+and exit the kernel.  This data is entirely contained in the 'struct
+cpu_entry_area' structure which is placed in the fixmap which gives
+each CPU's copy of the area a compile-time-fixed virtual address.
+
+For new userspace mappings, the kernel makes the entries in its
+page tables like normal.  The only difference is when the kernel
+makes entries in the top (PGD) level.  In addition to setting the
+entry in the main kernel PGD, a copy of the entry is made in the
+userspace page tables' PGD.
+
+This sharing at the PGD level also inherently shares all the lower
+layers of the page tables.  This leaves a single, shared set of
+userspace page tables to manage.  One PTE to lock, one set of
+accessed bits, dirty bits, etc...
+
+Overhead
+========
+
+Protection against side-channel attacks is important.  But,
+this protection comes at a cost:
+
+1. Increased Memory Use
+  a. Each process now needs an order-1 PGD instead of order-0.
+     (Consumes an additional 4k per process).
+  b. The 'cpu_entry_area' structure must be 2MB in size and 2MB
+     aligned so that it can be mapped by setting a single PMD
+     entry.  This consumes nearly 2MB of RAM once the kernel
+     is decompressed, but no space in the kernel image itself.
+
+2. Runtime Cost
+  a. CR3 manipulation to switch between the page table copies
+     must be done at interrupt, syscall, and exception entry
+     and exit (it can be skipped when the kernel is interrupted,
+     though.)  Moves to CR3 are on the order of a hundred
+     cycles, and are required at every entry and exit.
+  b. A "trampoline" must be used for SYSCALL entry.  This
+     trampoline depends on a smaller set of resources than the
+     non-PTI SYSCALL entry code, so requires mapping fewer
+     things into the userspace page tables.  The downside is
+     that stacks must be switched at entry time.
+  d. Global pages are disabled for all kernel structures not
+     mapped into both kernel and userspace page tables.  This
+     feature of the MMU allows different processes to share TLB
+     entries mapping the kernel.  Losing the feature means more
+     TLB misses after a context switch.  The actual loss of
+     performance is very small, however, never exceeding 1%.
+  d. Process Context IDentifiers (PCID) is a CPU feature that
+     allows us to skip flushing the entire TLB when switching page
+     tables by setting a special bit in CR3 when the page tables
+     are changed.  This makes switching the page tables (at context
+     switch, or kernel entry/exit) cheaper.  But, on systems with
+     PCID support, the context switch code must flush both the user
+     and kernel entries out of the TLB.  The user PCID TLB flush is
+     deferred until the exit to userspace, minimizing the cost.
+     See intel.com/sdm for the gory PCID/INVPCID details.
+  e. The userspace page tables must be populated for each new
+     process.  Even without PTI, the shared kernel mappings
+     are created by copying top-level (PGD) entries into each
+     new process.  But, with PTI, there are now *two* kernel
+     mappings: one in the kernel page tables that maps everything
+     and one for the entry/exit structures.  At fork(), we need to
+     copy both.
+  f. In addition to the fork()-time copying, there must also
+     be an update to the userspace PGD any time a set_pgd() is done
+     on a PGD used to map userspace.  This ensures that the kernel
+     and userspace copies always map the same userspace
+     memory.
+  g. On systems without PCID support, each CR3 write flushes
+     the entire TLB.  That means that each syscall, interrupt
+     or exception flushes the TLB.
+  h. INVPCID is a TLB-flushing instruction which allows flushing
+     of TLB entries for non-current PCIDs.  Some systems support
+     PCIDs, but do not support INVPCID.  On these systems, addresses
+     can only be flushed from the TLB for the current PCID.  When
+     flushing a kernel address, we need to flush all PCIDs, so a
+     single kernel address flush will require a TLB-flushing CR3
+     write upon the next use of every PCID.
+
+Possible Future Work
+====================
+1. We can be more careful about not actually writing to CR3
+   unless its value is actually changed.
+2. Allow PTI to be enabled/disabled at runtime in addition to the
+   boot-time switching.
+
+Testing
+========
+
+To test stability of PTI, the following test procedure is recommended,
+ideally doing all of these in parallel:
+
+1. Set CONFIG_DEBUG_ENTRY=y
+2. Run several copies of all of the tools/testing/selftests/x86/ tests
+   (excluding MPX and protection_keys) in a loop on multiple CPUs for
+   several minutes.  These tests frequently uncover corner cases in the
+   kernel entry code.  In general, old kernels might cause these tests
+   themselves to crash, but they should never crash the kernel.
+3. Run the 'perf' tool in a mode (top or record) that generates many
+   frequent performance monitoring non-maskable interrupts (see "NMI"
+   in /proc/interrupts).  This exercises the NMI entry/exit code which
+   is known to trigger bugs in code paths that did not expect to be
+   interrupted, including nested NMIs.  Using "-c" boosts the rate of
+   NMIs, and using two -c with separate counters encourages nested NMIs
+   and less deterministic behavior.
+
+	while true; do perf record -c 10000 -e instructions,cycles -a sleep 10; done
+
+4. Launch a KVM virtual machine.
+5. Run 32-bit binaries on systems supporting the SYSCALL instruction.
+   This has been a lightly-tested code path and needs extra scrutiny.
+
+Debugging
+=========
+
+Bugs in PTI cause a few different signatures of crashes
+that are worth noting here.
+
+ * Failures of the selftests/x86 code.  Usually a bug in one of the
+   more obscure corners of entry_64.S
+ * Crashes in early boot, especially around CPU bringup.  Bugs
+   in the trampoline code or mappings cause these.
+ * Crashes at the first interrupt.  Caused by bugs in entry_64.S,
+   like screwing up a page table switch.  Also caused by
+   incorrectly mapping the IRQ handler entry code.
+ * Crashes at the first NMI.  The NMI code is separate from main
+   interrupt handlers and can have bugs that do not affect
+   normal interrupts.  Also caused by incorrectly mapping NMI
+   code.  NMIs that interrupt the entry code must be very
+   careful and can be the cause of crashes that show up when
+   running perf.
+ * Kernel crashes at the first exit to userspace.  entry_64.S
+   bugs, or failing to map some of the exit code.
+ * Crashes at first interrupt that interrupts userspace. The paths
+   in entry_64.S that return to userspace are sometimes separate
+   from the ones that return to the kernel.
+ * Double faults: overflowing the kernel stack because of page
+   faults upon page faults.  Caused by touching non-pti-mapped
+   data in the entry code, or forgetting to switch to kernel
+   CR3 before calling into C functions which are not pti-mapped.
+ * Userspace segfaults early in boot, sometimes manifesting
+   as mount(8) failing to mount the rootfs.  These have
+   tended to be TLB invalidation issues.  Usually invalidating
+   the wrong PCID, or otherwise missing an invalidation.
```

If you have any questions about the programmers' documentation post a comment below and I'll try my best to answer.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# January 16, 2018 update Spectre in 4.14.14 and 4.9.77

If you are already running Kernel versions 4.14.13 or 4.9.76 like I am it's a no-brainer to install `4.14.14` and `4.9.77` when they come out in a couple of days to mitigate the Spectre security hole. The name of this fix is [Retpoline][1] which doesn't have the severe performance hit previously speculated:

> Greg Kroah-Hartman has sent out the latest patches for the Linux 4.9  
> and 4.14 point releases, which now include the Retpoline support.  
>   
> This X86_FEATURE_RETPOLINE is enabled for all AMD/Intel CPUs. For full  
> support you also need to be building the kernel with a newer GCC  
> compiler containing -mindirect-branch=thunk-extern support. The GCC  
> changes landed in GCC 8.0 yesterday and is in the process of  
> potentially being back-ported to GCC 7.3.  
>   
> Those wanting to disable the Retpoline support can boot the patched  
> kernels with *noretpoline*.  


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

# January 12, 2018 update

Initial protection from ***Spectre*** is here and will be improved in weeks and months to come.

### Linux Kernels 4.14.13, 4.9.76 LTS, and 4.4.111 LTS
 
From this [Softpedia article][4]:

> Linux kernels 4.14.13, 4.9.76 LTS, and 4.4.111 LTS are now available  
> for download from kernel.org, and they include more fixes against the  
> Spectre security vulnerability, as well as some regressions from the  
> Linux 4.14.12, 4.9.75 LTS, and 4.4.110 LTS kernels released last week,  
> as some reported minor issues.  
>   
> These issues appear to be fixed now, so it's safe to update your  
> Linux-based operating systems to the new kernel versions released  
> today, which include more x86 updates, some PA-RISC, s390, and PowerPC  
> (PPC) fixes, various improvements to drivers (Intel i915, crypto,  
> IOMMU, MTD), and the usual mm and core kernel changes.  

Many users had problems with Ubuntu LTS updates on January 4, 2018 and January 10, 2018. I've been using `4.14.13` for a couple of days without any problems however **YMMV**. Skip to the bottom for instructions on installing Kernel 14.14.13.

----------


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

# January 7, 2018 update

*Greg Kroah-Hartman* wrote a [status update][5] on the Meltdown and Spectre Linux Kernel security holes yesterday. Some may call him the second most powerful man in the Linux world right next to Linus. The article addresses stable kernels (discussed below) and LTS kernels which the majority of Ubuntu uses.

# Not recommended for average Ubuntu User

This method involves manually installing the latest mainline (stable) kernel and is not recommended for the average Ubuntu user. The reason being after you manually install a stable kernel it stays there until you manually install a newer (or older) one. Average Ubuntu users are on the LTS branch which will install a new kernel automatically.

As others have mentioned, it is simpler to wait for the Ubuntu Kernel Team to push out updates through the regular process.

This answer is for advanced Ubuntu users who want the "Meltdown" security whole fixed right away and are willing to do extra manual work.

# Linux Kernels 4.14.11, 4.9.74, 4.4.109, 3.16.52, and 3.2.97 Patch Meltdown Flaw

From [this article][6]:

**Users are urged to update their systems immediately**

Jan 4, 2018 01:42 GMT  ·  By Marius Nestor

Linux kernel maintainers Greg Kroah-Hartman and Ben Hutchings have released new versions of the Linux 4.14, 4.9, 4.4, 3.16, 3.18, and 3.12 LTS (Long Term Support) kernel series that apparently patch one of the two critical security flaws affecting most modern processors.

The Linux 4.14.11, 4.9.74, 4.4.109, 3.16.52, 3.18.91, and 3.2.97 kernels are now available to download from the kernel.org website, and users are urged to update their GNU/Linux distributions to these new versions if they run any of those kernel series immediately. Why update? Because they apparently patch a critical vulnerability called Meltdown.

As reported earlier, Meltdown and Spectre are two exploits that affect nearly all devices powered by modern processors (CPUs) released in the past 25 years. Yes, that means almost all mobile phones and personal computers. Meltdown can be exploited by an unprivileged attacker to maliciously obtain sensitive information stored in kernel memory.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

## Patch for Spectre vulnerability still in the works

While Meltdown is a serious vulnerability which can expose your secret data, including passwords and encryption keys, Spectre is even worse, and it's not easy to fix. Security researchers say it will haunt us for quite some time. Spectre is known to exploit the speculative execution technique used by modern CPUs to optimize performance.

Until the Spectre bug is patched too, it is strongly recommended that you at least update your GNU/Linux distributions to any of the newly released Linux kernel versions. So search the software repositories of your favorite distro for the new kernel update and install it as soon as possible. Don't wait until it's too late, do it now!

----------

I had been using Kernel 4.14.10 for a week so downloading and booting Ubuntu Mainline Kernel version [4.14.11][7] wasn't too much of a concern for me.

Ubuntu 16.04 users might be more comfortable with 4.4.109 or 4.9.74 kernel versions which were released at the same time as 4.14.11.

If your regular updates do not install the Kernel version you desire you can do it manually following this Ask Ubuntu answer: [How do I update kernel to the latest mainline version?][8]


----------


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

# 4.14.12 - What a difference a day makes

Less than 24 hours after my initial answer a patch was released to fix 4.14.11 kernel version that they may have rushed out. Upgrading to [4.14.12][9] is recommended for all 4.14.11 users. [Greg-KH says][10]:

> I'm announcing the release of the 4.14.12 kernel.  
>   
> All users of the 4.14 kernel series must upgrade.  
>   
> There are a few minor issues still known with this release that people  
> have run into.  Hopefully they will be resolved this weekend, as the  
> patches have not landed in Linus's tree.  
>   
> For now, as always, please test your in environment.  

Looking at this update not very many lines of source code were changed. 

----------


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr10" class ="hdr-btn">Skip</a></div>

# Kernel 4.14.13 Installation

More Meltdown revisions and beginning of Spectre features were introduced in Linux Kernels 4.14.13, 4.9.76 and 4.4.111.

There are reasons why you want to install the latest mainline kernel:

- A bug in the last Ubuntu LTS kernel update
- You have new hardware not supported in the current Ubuntu LTS kernel update stream
- You want a security upgrade or new feature only available in the latest mainline kernel version.

As of January 15, 2018 the latest stable mainline kernel is `4.14.13`. If you choose to manually install it you should know:

- Older LTS kernels will not [get updated][11] until they are greater than  the main menu first option titled **Ubuntu**.
- Manually installed kernels are not removed with the usual `sudo apt auto-remove` command. You need to follow this: [How do I remove old kernel versions to clean up the boot menu?][12]
- Monitor developments in the older kernels for when you want to get back on the regular LTS kernel update method. Then delete the manually installed mainline kernel as described in the previous bullet point link.
- After manually removing the newest mainline kernel run `sudo update-grub` and then Ubuntu's latest LTS kernel will be the first option called **Ubuntu** on Grub's main menu.

Now that the warning are out of the way, to install the latest mainline kernel (**4.14.13**) follow this link: [How to update kernel to the latest mainline version without any Distro-upgrade?][13]

[![Mainline Kernel 4.14.13.png][14]][14]


  [1]: https://www.phoronix.com/scan.php?page=news_item&px=Linux-4.9-4.14-Retpoline
  [2]: https://askubuntu.com/questions/997861/why-was-kernel-4-9-77-released-but-not-kernel-4-14-14/997988#997988
  [3]: https://patchwork.kernel.org/patch/10168883/
  [4]: http://news.softpedia.com/news/linux-kernels-4-14-13-4-9-76-and-4-4-111-bring-more-security-fixes-update-now-519321.shtml
  [5]: http://www.kroah.com/log/blog/2018/01/06/meltdown-status/
  [6]: http://news.softpedia.com/news/linux-kernels-4-14-11-4-9-74-4-4-109-3-16-52-and-3-2-97-patch-meltdown-flaw-519215.shtml
  [7]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.14.11/
  [8]: {% post_url /2017/2017-02-04-How-do-I-update-kernel-to-the-latest-mainline-version_ %}
  [9]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.14.12/
  [10]: https://lkml.org/lkml/2018/1/5/337
  [11]: https://askubuntu.com/questions/763360/does-manual-kernel-update-affect-the-next-regular-automatic-update
  [12]: https://askubuntu.com/questions/2793/how-do-i-remove-old-kernel-versions-to-clean-up-the-boot-menu
  [13]: {% post_url /2017/2017-02-20-How-to-update-kernel-to-the-latest-mainline-version-without-any-Distro-upgrade_ %}
  [14]: https://i.stack.imgur.com/VOt2M.png


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr9" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

