---
layout:       post
title:        >
    Lenovo G50-80 laptop: cooling fans are working for almost all the time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/822321
type:         Answer
tags:         drivers fan acpi fancontrol lm-sensors conky grub
created_date: 2016-09-07 23:35:22
edit_date:    2016-09-09 23:52:18
votes:        "0 "
favorites:    
views:        "1,578 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-07-Lenovo-G50-80-laptop_-cooling-fans-are-working-for-almost-all-the-time.md
toc:          false
navigation:   false
clipboard:    false
---

When it comes to `sensors` most of the "extras" it reports are for desktop systems.

For my two laptops all I have seen so far are in `cat /sys/class/thermal/thermal_zone*/temp`:

``` 
27800
29800
71000
```

For thermal zones 0, 1 & 2 which `sensors` also reports. In this case Thermal Zone 0 is incorrect which `Conky` also reports. It's a glitch in my system I haven't figured out yet but the last one `Thermal Zone 2` is accurate.

As far as your fan running at full speed your kernel boot parameters are:

``` 
BOOT_IMAGE=/boot/vmlinuz-4.4.0-36-generic.efi.signed root=UUID=b606c0de-3f11-439e-bdd2-c17579566c57 ro quiet splash acpi_enforce_resources=lax vt.handoff=7
```

The parameters of note are:

 - `ro` - read only
   
 -  `quiet` - don't display system messages overtop of splash screen.
   
 -  `splash` - display a splash screen with plymouth (Ubuntu logo with
   moving dots usually)
   
 -  `acpi_enforce_resources=lax` - Run fan at full speed (as best I can
   figure)
   
 -  `vt.handoff=7` - keep messages flowing from boot to terminal screen
   (which are controlled not to appear anyway with `quiet` and `splash` options
   earlier).


The first step is to remove the `acpi_enforce_resources=lax` kernel parameter.

In the terminal type:

``` 
gksu gedit /etc/default/grub
```

Search for this line:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_enforce_resources=lax vt.handoff=7"
```

Erase the `acpi_enforce_resources=lax` and save the file. We don't have to write down what we are erasing because AskUbuntu is our giant notepad.

Back at the terminal prompt type:

``` 
sudo update-grub
```

Now reboot your laptop and report back on progress.

**Edit 1:**

Removing the `=lax` variable didn't change the fan setting. Now the next step is to tell your Lenovo that ACPI is supported. Some laptops look for Windows and if it doesn't see it doesn't implement ACPI services (such as fan control). We'll tell your laptop Windows is running and turn over control to Linux. On the same Kernel Command line add the option `acpi_osi=Linux` before the `vt.handoff=7`

Now your line looks like this:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_osi=linux vt.handoff=7"
```

Once again update grub and reboot.

Report back on progress.

**Edit 2:**

After much searching I came across someone who has ten Lenovo G50-80 laptops and one of them had the same problem: [Cooling-fan-stays-on][1]. Tech support first advised to upgrade the BIOS to the current version (now it is # B0CN99WW dated August 25, 2016). The user had updated the BIOS and problem persists so he returned it for a new one.

**BIOS** (Basic Input Output System) contains the **ACPI** (Advanced Configuration and Power Interface) discussed above.

If your fan works properly in Windows then checking compatibility with Linux is the next step. You can google the question but no answers come up. You can check: [Ubuntu certification Lenovo][2] but as of today The G50-80 model doesn't appear on the list.

With any luck another Lenovo G50-80 user will be able to offer advice.


  [1]: https://forums.lenovo.com/t5/Lenovo-B-and-G-Series-Notebooks/Cooling-fan-stays-on/td-p/2078053
  [2]: http://www.ubuntu.com/certification/make/Lenovo/?&page=1
