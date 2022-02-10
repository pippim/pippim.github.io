---
layout:       post
title:        >
    JPGICC: What does the option described as "Precalculates transform" do?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1049106
type:         Answer
tags:         color-management photo-management
created_date: 2018-06-23 16:00:02
edit_date:    2020-10-03 13:23:54
votes:        "2 "
favorites:    
views:        "150 "
accepted:     
uploaded:     2022-02-10 04:26:37
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-23-JPGICC:-What-does-the-option-described-as-_Precalculates-transform_-do_.md
toc:          false
navigation:   false
clipboard:    false
---

I must admit I'm not a person that cares much about color accuracy. If colors are different enough between text and background, and I can read the screen, I'm happy.

## 7 year old email chain about precalculations

The differences between no precalculations, normal, low-res and high-res is not just speed but can lead to [flaws in the shadows][1]:

> I had Cinepaint set in the color management options to use "don't  
> Precalculate" rather than one of the other Cinepaint options (Low  
> Resolution, High Resolution, CMM default). I wish I had realized that  
> particular setting might make a difference, because it would have  
> saved a lot of time and tedious testing.  
>   
> I don't know of any image editing program besides Cinepaint that  
> offers the user the choice to use Low Res, High Res, CMM default, or  
> "Don't Precalculate". I would guess that most or all use something  
> like "CMM default", because I just checked, and Cinepaint, when set to  
> use "CMM default" and "use black point compensation" produces the same  
> halving of the shadow values as all the other image editors.  
>   
> At any rate, at this point every image editor that I tested, other  
> than Cinepaint and the latest Krita 2.6 alpha, produces visibly  
> damaged shadow areas if there is a linear gamma profile involved in an  
> ICC profile conversion.  


----------

## littleCMS's Author's take on precalculations

In his [.pdf tutorial][2] the author states if there are only a few colors to transform then precalculations can be turned off all together:

>**Optimization**  
>  
>Little CMS tries to optimize profile chains whatever possible. There are some built-in optimization  
schemes, and you can add new schemas by using a plug-in. This generally improvesthe performance
of the transform, but may introduce a small delay of 1-2 seconds when creating the transform. If
you are going to transform just few colors, you don't need this precalculations. Then, the flag
cmsFLAGS_NOOPTIMIZE in cmsCreateTransform() can be used to inhibit the optimization process.
See the API reference for a more detailed discussion of the flags.



  [1]: https://sourceforge.net/p/lcms/mailman/message/29597867/
  [2]: https://www.littlecms.com/LittleCMS2.11%20tutorial.pdf
