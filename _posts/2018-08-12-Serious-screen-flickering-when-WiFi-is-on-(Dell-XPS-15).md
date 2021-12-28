---
layout:       post
title:        Serious screen flickering when WiFi is on (Dell XPS 15)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064747
type:         Answer
tags:         wireless graphics intel-graphics xps
created_date: 2018-08-12 19:14:06
edit_date:    2018-08-14 00:46:15
votes:        3
favorites:    
views:        2,471
accepted:     
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

# Solution is `i915.edp_vswing=2` kernel parameter

Although OP has solved the problem thanks to Arch Linux link in next section questions still remain about what it means.

From announcement: [Display Port Presentation December 2010][1]:

- Embedded DisplayPort (eDP) was developed to be used specifically 
in embedded display applications 
 - Notebook, Netbook, and Notepad PCs 
 - All-in-One PCs

- It is designed to replay LVDS technology

As many people here already know, `i915` is Intel's display driver for Linux that has been around for decades.

The `vswing` component I cannot fathom but, you can find the C code that controls it here: https://patchwork.kernel.org/patch/6349211/

The parameter settings (after `=` sign) can be:

- `0`=default, to do nothing
- `1`=not sure, haven't found answer yet
- `2`=control flicker, which OP used

I will set my kernel parameter to `1` and reboot after posting this answer. 

**This is a temporary setting for older kernels** according to what I read tonight. So you should occasionally remove the setting after new kernels are installed to see if it's still necessary.

Finally there is an interesting tidbit here: https://patchwork.kernel.org/patch/9303023/

``` 
>  	/*
> -	 * FIXME On Dell XPS 13 9350 the OpRegion panel type (0) gives us
> -	 * low vswing for eDP, whereas the VBT panel type (2) gives us normal
> -	 * vswing instead. Low vswing results in some display flickers, so
> -	 * let's simply ignore the OpRegion panel type on SKL for now.
> +	 * FIXME On Dell XPS 13 9350 and Dell XPS 13 L322X the
> +	 * OpRegion panel type (0) gives us low vswing for eDP,
> +	 * whereas the VBT panel type (2) gives us normal vswing
> +	 * instead. Low vswing results in some display flickers, so
> +	 * let's simply ignore the OpRegion panel type on SKL and
> +	 * IVYBRIDGE for now.
>  	 */
## 
```



### Original post that helped OP stumble on solution

Here is a great link for you: [Arch Linux Dell XPS 13 (9350)][2]:

> **Content adaptive brightness control**  
>   
> In the XPS 13 the display panels (both FHD and QHD+) come with  
> adaptive brightness embedded in the panel firmware, this "content  
> adaptive brightness control" (usually referred to as CABC or DBC) will  
> adjust the screen brightness depending on the content displayed on the  
> screen and will generally be found undesirable, especially for Linux  
> users who are likely to be switching between dark and light screen  
> content. Dell has issued a fix for this however it is only available  
> to run in Windows and for the QHD+ model of the laptop so this  
> precaution should be taken before installing Linux, the FHD model of  
> the XPS 13 (9350) cannot be fixed. This is not a problem with the  
> panel but rather a problem with the way the panels are configured for  
> the XPS 13, as the same panel exists in the Dell's Latitude 13 7000  
> series (e7370) FHD model but with CABC disabled. The fix is available  
> directly from Dell.  

Additionally check these posts from other Dell users:

- https://www.dell.com/community/Laptops-General/XPS-15-9530-screen-flicker/td-p/4360533/page/2
- [Disable Panel Self-Refresh (Windows instructions need to find Linux)][3]


  [1]: https://www.vesa.org/wp-content/uploads/2010/12/DisplayPort-DevCon-Presentation-eDP-Dec-2010-v3.pdf
  [2]: https://wiki.archlinux.org/index.php/Dell_XPS_13_(9350)#Content_adaptive_brightness_control
  [3]: https://www.dell.com/community/XPS/Mouse-cursor-lagging-and-stuttering-XPS-9370/td-p/5739882/page/5
