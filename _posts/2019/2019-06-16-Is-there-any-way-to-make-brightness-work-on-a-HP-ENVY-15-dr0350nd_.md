---
layout:       post
title:        >
    Is there any way to make brightness work on a HP ENVY 15-dr0350nd?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1151552
type:         Answer
tags:         nvidia brightness monitor settings gpu
created_date: 2019-06-16 18:15:41
edit_date:    2019-06-16 20:55:26
votes:        "2 "
favorites:    
views:        "501 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-16-Is-there-any-way-to-make-brightness-work-on-a-HP-ENVY-15-dr0350nd_.md
toc:          false
navigation:   false
clipboard:    false
---

## Update June 16, 2019 2:44pm MST

It was revealed it's a "WLED" screen not an "OLED" screen we are interested in. Hope can be found in this [Linux Kernel Proposed Update][1] message:

> # qcom: spmi-wled: Support for QCOM wled driver  
>   
> **From:**       Kiran Gunda <kgunda-AT-codeaurora.org>  

> **To:**         bjorn.andersson-AT-linaro.org, linux-arm-msm-AT-vger.kernel.org  

> **Subject:**    [PATCH V1 0/4] qcom: spmi-wled: Support for QCOM wled driver  

> **Date:**       Thu, 16 Nov 2017 17:48:33 +0530  

> **Message-ID:** <1510834717-21765-1-git-send-email-kgunda@codeaurora.org>  

> **Cc:**         linux-kernel-AT-vger.kernel.org, linux-arm-msm-owner-AT-vger.kernel.org, Kiran Gunda<kgunda-AT-codeaurora.org>  

> **Archive-link:** 	 	Article  
>   
> WLED driver provides the interface to the display driver to adjust the  
> brightness of the display backlight. This driver exposes two APIs to  
> set and get the brightness of the display backlight through the  
> backlight framework. This driver has the support to handle the OVP  
> (over voltage protection) and the SC (short circuit protection)  
> interrupts. It also has the auto calibration algorithm support to  
> configure the right strings if the user specified string configuration  
> is in-correct.  
>   
>     Kiran Gunda (4):  
>       qcom: spmi-wled: Add support for qcom wled driver  
>       qcom: spmi-wled: Add support for short circuit handling  
>       qcom: spmi-wled: Add support for OVP interrupt handling  
>       qcom: spmi-wled: Add auto-calibration logic support  
>     
>      .../bindings/leds/backlight/qcom-spmi-wled.txt     | 118 +++  
>      drivers/video/backlight/Kconfig                    |   9 +  
>      drivers/video/backlight/Makefile                   |   1 +  
>      drivers/video/backlight/qcom-spmi-wled.c           | 999 +++++++++++++++++++++  
>      4 files changed, 1127 insertions(+)  
>      create mode 100644 Documentation/devicetree/bindings/leds/backlight/qcom-spmi-wled.txt  
>      create mode 100644 drivers/video/backlight/qcom-spmi-wled.c  
>   
> --  The Qualcomm Innovation Center, Inc. is a member of the Code Aurora Forum, a Linux Foundation Collaborative Project  




----------

## Original Answer

Although not an answer hoped for this [Arch Linux article][2] states:

> It may be helpful to know that OLED displays by their nature do not  
> have backlight.  

The only solution therefor is to use something like this:

``` 
$ xrandr --output eDP1 --brightness .5
```

- where `.5` is 50% brightness, `.63` would be 63% brightness, etc.


  [1]: https://lwn.net/Articles/739332/
  [2]: https://wiki.archlinux.org/index.php/HP_Spectre_x360_13-4231ng
