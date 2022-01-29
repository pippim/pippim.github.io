---
layout:       post
title:        >
    How to list GRUB's "menuentries" in command-line?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1022706
type:         Answer
tags:         command-line grub2
created_date: 2018-04-07 00:14:42
edit_date:    2019-07-27 19:16:36
votes:        "16 "
favorites:    
views:        "86,629 "
accepted:     
uploaded:     2022-01-29 14:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-07-How-to-list-GRUB_s-_menuentries_-in-command-line_.md
toc:          true
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Color Screen shot (short version)

Use mouse scroll wheel, <kbd>Home</kbd>, <kbd>End</kbd>, <kbd>PgUp</kbd>, <kbd>PgDn</kbd>, <kbd>↑</kbd> and <kbd>↓</kbd> keys to navigate the menu.

[![grub-menu.sh][2]][2]


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# Text Screen shot (long version)

The bash script uses `whiptail` instead of `dialog` to display the menu. One advantage is you can copy the terminal image to the clipboard as 
**text** and paste it into this website as text. Other advantages include:

- Mouse scroll wheel support
- Faster performance
- `dialog` is not installed by default in Ubuntu Server or Lubuntu. `whiptail` is included by default.

Here's a text screen shot:

{% include copyHeader.html %}
``` 
Grub Version: 2.02~beta2-36ubuntu3.15


        ┌─────────┤ Use arrow, page, home & end keys. Tab toggle option ├──────────┐
        │ Menu No. --------------- Menu Name ---------------                       │ 
        │                                                                          │ 
        │     0    Ubuntu                                                     ↑    │ 
        │     1    Advanced options for Ubuntu                                ▮    │ 
        │     1>0  Ubuntu, with Linux 4.14.31-041431-generic                  ▒    │ 
        │     1>1  Ubuntu, with Linux 4.14.31-041431-generic (upstart)        ▒    │ 
        │     1>2  Ubuntu, with Linux 4.14.31-041431-generic (recovery mode)  ▒    │ 
        │     1>3  Ubuntu, with Linux 4.14.30-041430-generic                  ▒    │ 
        │     1>4  Ubuntu, with Linux 4.14.30-041430-generic (upstart)        ▒    │ 
        │     1>5  Ubuntu, with Linux 4.14.30-041430-generic (recovery mode)  ▒    │ 
        │     1>6  Ubuntu, with Linux 4.14.27-041427-generic                  ▒    │ 
        │     1>7  Ubuntu, with Linux 4.14.27-041427-generic (upstart)        ▒    │ 
        │     1>8  Ubuntu, with Linux 4.14.27-041427-generic (recovery mode)  ▒    │ 
        │     1>9  Ubuntu, with Linux 4.14.24-041424-generic                  ▒    │ 
        │     1>10 Ubuntu, with Linux 4.14.24-041424-generic (upstart)        ▒    │ 
        │     1>11 Ubuntu, with Linux 4.14.24-041424-generic (recovery mode)  ▒    │ 
        │     1>12 Ubuntu, with Linux 4.14.23-041423-generic                  ▒    │ 
        │     1>13 Ubuntu, with Linux 4.14.23-041423-generic (upstart)        ↓    │ 
        │                                                                          │ 
        │                                                                          │ 
        │                   <Display Grub Boot>        <Exit>                      │ 
        │                                                                          │ 
        └──────────────────────────────────────────────────────────────────────────┘ 
```


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Highlight entry and press Enter

Use the navigation keys to highlight an option and press <kbd>Enter</kbd> to see the pre-kernel drivers loaded by `grub` and the boot parameters passed by `grub` to the kernel when booting it:

{% include copyHeader.html %}
``` 
menuentry 'Ubuntu, with Linux 4.14.27-041427-generic' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-4.14.27-041427-generic-advanced-f3f8e7bc-b337-4194-88b8-3a513f6be55b' {
recordfail
savedefault
load_video
gfxmode $linux_gfx_mode
insmod gzio
if [ x$grub_platform = xxen ]; then insmod xzio; insmod lzopio; fi
insmod part_gpt
insmod ext2
if [ x$feature_platform_search_hint = xy ]; then
search --no-floppy --fs-uuid --set=root f3f8e7bc-b337-4194-88b8-3a513f6be55b
else
search --no-floppy --fs-uuid --set=root f3f8e7bc-b337-4194-88b8-3a513f6be55b
fi
echo 'Loading Linux 4.14.27-041427-generic ...'
linux /boot/vmlinuz-4.14.27-041427-generic root=UUID=f3f8e7bc-b337-4194-88b8-3a513f6be55b ro quiet splash loglevel=0 vga=current udev.log-priority=3 fastboot kaslr acpiphp.disable=1 crashkernel=384M-2G:128M,2G-:256M $vt_handoff
echo 'Loading initial ramdisk ...'
initrd /boot/initrd.img-4.14.27-041427-generic
}
Press <Enter> to continue
## ```


``` 
                                                                                 

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

# `grub-menu.sh` bash script```




`grub-menu.sh` only has one option to tweak:

``` bash
# Default for hide duplicate and triplicate options with (upstart) and (recovery mode)?
HideUpstartRecovery=false
```

Set the value to `true` (hide the extra entries) or `false` (list all entries).

The default format can be overridden when calling the script using:

``` bash
grub-menu.sh short
```

or:

``` bash
grub-menu.sh long
```


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## The code:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: grub-menu.sh
# PATH: $HOME/bin
# DESC: Written for AU Q&A: https://askubuntu.com/q/1019213/307523
# DATE: Apr 5, 2018. Modified: July 27, 2019
# UPDT: Scroll bar was outside of dialog box. Move windo border line.

# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    notify-send --urgency=critical "$0 cannot be run from GUI without TERM environment variable."
    exit 1
fi

# Send output to secondary terminal such that previous history isn't cleared on exit
tput smcup

AllMenusArr=()      # All menu options.
# Default for hide duplicate and triplicate options with (upstart) and (recovery mode)?
HideUpstartRecovery=false
if [[ $1 == short ]] ; then
    HideUpstartRecovery=true    # override default with first passed parameter "short"
elif [[ $1 == long ]] ; then
    HideUpstartRecovery=false   # override default with first passed parameter "long"
fi
SkippedMenuEntry=false  # Don't change this value, automatically maintained
InSubMenu=false     # Within a line beginning with `submenu`?
InMenuEntry=false   # Within a line beginning with `menuentry` and ending in `{`?
NextMenuEntryNo=0   # Next grub internal menu entry number to assign
# Major / Minor internal grub submenu numbers, ie `1>0`, `1>1`, `1>2`, etc.
ThisSubMenuMajorNo=0
NextSubMenuMinorNo=0
CurrTag=""          # Current grub internal menu number, zero based
CurrText=""         # Current grub menu option text, ie "Ubuntu", "Windows...", etc.
SubMenuList=""      # Only supports 10 submenus! Numbered 0 to 9. Future use.

while read -r line; do
    # Example: "           }"
    BlackLine="${line//[[:blank:]]/}" # Remove all whitespace
    if [[ $BlackLine == "}" ]] ; then
        # Add menu option in buffer
        if [[ $SkippedMenuEntry == true ]] ; then
            NextSubMenuMinorNo=$(( $NextSubMenuMinorNo + 1 ))
            SkippedMenuEntry=false
            continue
        fi
        if [[ $InMenuEntry == true ]] ; then
            InMenuEntry=false
            if [[ $InSubMenu == true ]] ; then
                NextSubMenuMinorNo=$(( $NextSubMenuMinorNo + 1 ))
            else
                NextMenuEntryNo=$(( $NextMenuEntryNo + 1 ))
            fi
        elif [[ $InSubMenu == true ]] ; then
            InSubMenu=false
            NextMenuEntryNo=$(( $NextMenuEntryNo + 1 ))
        else
            continue # Future error message?
        fi
        # Set maximum CurrText size to 68 characters.
        CurrText="${CurrText:0:67}"
        AllMenusArr+=($CurrTag "$CurrText")
    fi
    
    # Example: "menuentry 'Ubuntu' --class ubuntu --class gnu-linux --class gnu" ...
    #          "submenu 'Advanced options for Ubuntu' $menuentry_id_option" ...
    if [[ $line == submenu* ]] ; then
        # line starts with `submenu`
        InSubMenu=true
        ThisSubMenuMajorNo=$NextMenuEntryNo
        NextSubMenuMinorNo=0
        SubMenuList=$SubMenuList$ThisSubMenuMajorNo
        CurrTag=$NextMenuEntryNo
        CurrText="${line#*\'}"
        CurrText="${CurrText%%\'*}"
        AllMenusArr+=($CurrTag "$CurrText") # ie "1 Advanced options for Ubuntu"
        
    elif [[ $line == menuentry* ]] && [[ $line == *"{"* ]] ; then
        # line starts with `menuentry` and ends with `{`
        if [[ $HideUpstartRecovery == true ]] ; then
            if [[ $line == *"(upstart)"* ]] || [[ $line == *"(recovery mode)"* ]] ; then
                SkippedMenuEntry=true
                continue
            fi
        fi
        InMenuEntry=true
        if [[ $InSubMenu == true ]] ; then
            : # In a submenu, increment minor instead of major which is "sticky" now.
            CurrTag=$ThisSubMenuMajorNo">"$NextSubMenuMinorNo
        else
            CurrTag=$NextMenuEntryNo
        fi
        CurrText="${line#*\'}"
        CurrText="${CurrText%%\'*}"
        
    else
        continue    # Other stuff - Ignore it.
    fi
    
done < /boot/grub/grub.cfg

LongVersion=$(grub-install --version)
ShortVersion=$(echo "${LongVersion:20}")
DefaultItem=0

if [[ $HideUpstartRecovery == true ]] ; then
    MenuText="Menu No.     ----------- Menu Name -----------"
else
    MenuText="Menu No. --------------- Menu Name ---------------"
fi

while true ; do

    Choice=$(whiptail --clear \
        --title "Use arrow, page, home & end keys. Tab toggle option" \
        --backtitle "Grub Version: $ShortVersion" \
        --ok-button "Display Grub Boot" \
        --cancel-button "Exit" \
        --default-item "$DefaultItem" \
        --menu "$MenuText" 24 80 16 \
        "${AllMenusArr[@]}" \
        2>&1 >/dev/tty)
        
    clear
    if [[ $Choice == "" ]]; then break ; fi
    DefaultItem=$Choice

    for (( i=0; i < ${#AllMenusArr[@]}; i=i+2 )) ; do
        if [[ "${AllMenusArr[i]}" == $Choice ]] ; then
            i=$i+1
            MenuEntry="menuentry '"${AllMenusArr[i]}"'"
            break
        fi
    done

    TheGameIsAfoot=false
    while read -r line ; do
        if [[ $line = *"$MenuEntry"* ]]; then TheGameIsAfoot=true ; fi
        if [[ $TheGameIsAfoot == true ]]; then
            echo $line
            if [[ $line = *"}"* ]]; then break ; fi
        fi
    done < /boot/grub/grub.cfg

    read -p "Press <Enter> to continue"

done

# Restore output to primary terminal
tput rmcup

exit 0
## ```






  [1]: {% post_url /2018/2018-03-26-Display-grub-menu-and-options-without-rebooting_ %}
  [2]: https://i.stack.imgur.com/a95hd.png


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

