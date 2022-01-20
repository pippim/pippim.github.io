---
layout:       post
title:        >
    Display grub menu and options without rebooting?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1019214
type:         Answer
tags:         command-line grub2
created_date: 2018-03-26 04:05:58
edit_date:    2018-05-08 00:32:11
votes:        "17 "
favorites:    
views:        "7,970 "
accepted:     
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-26-Display-grub-menu-and-options-without-rebooting^.md
toc:          true
navigation:   true
clipboard:    true
---

### Updated May 7, 2018

Developing the script: [Bash script to backup/clone Ubuntu to another partition]({% post_url /2018/2018-04-27-Bash-script-to-backup^clone-Ubuntu-to-another-partition %})e I discovered you get some ridiculously long menu options that causes the menu to malign:

``` 
4>8  Ubuntu, with Linux 4.14.30-041430-generic (recovery mode) (on /dev/nvme0n1p8)
```

This was fixed today by truncating lines longer than 68 characters.

### Updated April 5, 2018

This update introduces `grub-menu.sh` a much superior version to previous answer (still available below). The new grub menu features:

- Displays grub 2 menu entry numbers. ie `0`, `1`, `1>0`, `1>1` ... `2`, `3`
- Default short version without `(upstart)` and `(recover mode)` submenu options can be set.
- Parameter 1 can be passed as `short` or `long` to override default.
- column headings dynamically formatted based on `short` or `long` setting.


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Color Screen shot (short version)

[![grub-menu.sh][1]][1]


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# Text Screen shot (long version)

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


----------


``` 
                                                                                 
# `grub-menu.sh` bash script```




Previous versions `grub-display.sh` and `grub-display-lite.sh` required many tweaking options in the code. `grub-menu.sh` only has one option to tweak:

``` bash

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# Default for hide duplicate and triplicate options with (upstart) and (recovery mode)?
HideUpstartRecovery=false
```

Set the value to `true` or `false`.

The default format can be overridden when calling the script using:

``` bash
grub-menu.sh short
```

or:

``` bash
grub-menu.sh long
```

## The code:

{% include copyHeader.html %}
``` bash

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

# !/bin/bash

# NAME: grub-menu.sh
# PATH: $HOME/bin
# DESC: Written for AU Q&A: https://askubuntu.com/q/1019213/307523
# DATE: Apr 5, 2018. Modified: May 7, 2018.

# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    notify-send --urgency=critical "$0 cannot be run from GUI without TERM environment variable."
    exit 1
fi

AllMenusArr=()      # All menu options.

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

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

    Choice=$(whiptail \
        --title "Use arrow, page, home & end keys. Tab toggle option" \
        --backtitle "Grub Version: $ShortVersion" \
        --ok-button "Display Grub Boot" \
        --cancel-button "Exit" \
        --default-item "$DefaultItem" \
        --menu "$MenuText" 24 76 16 \
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

exit 0

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

## ```



# Previous versions (not recommended)

Below is the original answer where menu entry numbers followed the grub 1 format.

# `grub-display.sh` displays grub menu options and parameters

Without relying on third party applications you can use a bash script to display the `grub` menu and the boot parameters for any given option. The boot parameters are more than just the `cat /proc/cmdline` values. They also include the drivers loaded before Linux is booted.
## `grub-display.sh` bash script

Here is the full program listing you can copy and paste:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: grub-display.sh
# PATH: $HOME/bin
# DESC: Written for AU Q&A: https://askubuntu.com/q/1019213/307523
# DATE: Mar 24, 2018. Modified: Mar 26, 2018.

# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    notify-send --urgency=critical "$0 cannot be run from GUI without TERM environment variable."
    exit 1
fi

# Must have the dialog package. On Servers, not installed by default
command -v dialog >/dev/null 2>&1 || { echo >&2 "dialog package required but it is not installed.  Aborting."; exit 99; }

# Version without upstart and recovery options displayed
#awk -F\' '/menuentry / { print i++, $2}' /boot/grub/grub.cfg \
#        | grep -v upstart | grep -v recovery > ~/.grub-display-menu

# Version with upstart and recovery options displayed
awk -F\' '/menuentry / { print i++, $2}' /boot/grub/grub.cfg \
        > ~/.grub-display-menu

MenuArr=()

while read -r line; do 
    MenuNmbr=${line%% *}
    MenuName=${line#* }
    MenuArr+=($MenuNmbr "$MenuName")
done < ~/.grub-display-menu
rm ~/.grub-display-menu

LongVersion=$(grub-install --version)
ShortVersion=$(echo "${LongVersion:20}")
DefaultItem=0

while true ; do

    Choice=$(dialog \
        --title "Use arrow, page, home & end keys. Tab toggle option" \
        --backtitle "Grub Version: $ShortVersion" \
        --ok-label "Display Grub Boot" \
        --cancel-label "Exit" \
        --default-item "$DefaultItem" \
        --menu "Menu Number       ----------- Menu Name ----------" 24 76 16 \
        "${MenuArr[@]}" \
        >/dev/tty)

    clear
    if [[ $Choice == "" ]]; then break ; fi
    DefaultItem=$Choice

    for (( i=0; i < ${#MenuArr[@]}; i=i+2 )) ; do
        if [[ "${MenuArr[i]}" == $Choice ]] ; then
            i=$i+1
            MenuEntry="menuentry '"${MenuArr[i]}"'"
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

exit 0
```


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

## Note to Ubuntu Server users

This bash script was designed for Ubuntu Desktop. For Ubuntu Server and other Linux Distros that do not have `dialog` package installed by default, a different script called `grub-display-lite.sh` is included below. That version uses `whiptail` instead of `dialog`.

## Reducing the menu size by 66%

To shorten the grub menu option list displayed you can remove the `(upstart)` and `(recovery)` options. To do this uncomment these lines:

``` bash
# Version without upstart and recovery options displayed
awk -F\' '/menuentry / { print i++, $2}' /boot/grub/grub.cfg \
        | grep -v upstart | grep -v recovery > ~/.grub-display-menu
```

Then apply comments to these lines:

``` bash
# Version with upstart and recovery options displayed
#awk -F\' '/menuentry / { print i++, $2}' /boot/grub/grub.cfg \
#        > ~/.grub-display-menu
```


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr10" class ="hdr-btn">Skip</a></div>

## Screenshots

Here's what it looks like when invoked from the command line. Unfortunately I was not able to copy and paste the menu and had to use <kbd>Print Screen</kbd>:

[![grub-display.sh.png][2]][2]


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr9" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr11" class ="hdr-btn">Skip</a></div>

## Turn off mouse support for copy & paste

{% include copyHeader.html %}
``` bash
 Grub Version: 2.02~beta2-36ubuntu3.15
 ──────────────────────────────────────────────────────────────────────────────────────────
       ┌──────────Use arrow, page, home & end keys. Tab toggle option─────────────┐
       │ Menu Number  ----------- Menu Name ----------                            │  
       │ ┌──────────────────────────────────────────────────────────────────────┐ │  
       │ │    0   Ubuntu                                                        │ │  
       │ │    1   Ubuntu, with Linux 4.14.30-041430-generic                     │ │  
       │ │    2   Ubuntu, with Linux 4.14.30-041430-generic (upstart)           │ │  
       │ │    3   Ubuntu, with Linux 4.14.30-041430-generic (recovery mode)     │ │  
       │ │    4   Ubuntu, with Linux 4.14.27-041427-generic                     │ │  
       │ │    5   Ubuntu, with Linux 4.14.27-041427-generic (upstart)           │ │  
       │ │    6   Ubuntu, with Linux 4.14.27-041427-generic (recovery mode)     │ │  
       │ │    7   Ubuntu, with Linux 4.14.24-041424-generic                     │ │  
       │ │    8   Ubuntu, with Linux 4.14.24-041424-generic (upstart)           │ │  
       │ │    9   Ubuntu, with Linux 4.14.24-041424-generic (recovery mode)     │ │  
       │ │    10  Ubuntu, with Linux 4.14.23-041423-generic                     │ │  
       │ │    11  Ubuntu, with Linux 4.14.23-041423-generic (upstart)           │ │  
       │ │    12  Ubuntu, with Linux 4.14.23-041423-generic (recovery mode)     │ │  
       │ │    13  Ubuntu, with Linux 4.14.21-041421-generic                     │ │  
       │ │    14  Ubuntu, with Linux 4.14.21-041421-generic (upstart)           │ │  
       │ │    15  Ubuntu, with Linux 4.14.21-041421-generic (recovery mode)     │ │  
       │ └────↓(+)──────────────────────────────────────────────────────16%─────┘ │  
       │                                                                          │  
       ├──────────────────────────────────────────────────────────────────────────┤  
       │             <Display Grub Boot>       <      Exit       >                │  
       └──────────────────────────────────────────────────────────────────────────┘  
```

When the default mouse support is enabled, you can't copy the screen to the clipboard but must use <kbd>Print Screen</kbd> for a graphical screen snapshot. In order to support copy & paste you need disable mouse support by searching for these lines:

``` bash
    --default-item "$DefaultItem" \
    --no-mouse \
    --menu "Menu Number       ----------- Menu Name ----------" 24 76 16 \
```

The argument `--no-mouse` has been inserted below `--default-item`. This means you loose mouse support but gain better resolution and copy to clipboard ability by highlighting text and pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>.


<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr10" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr12" class ="hdr-btn">Skip</a></div>

## Display grub boot parameters

Use the navigation keys to highlight an option and press <kbd>Enter</kbd> to see the boot parameters for it:

{% include copyHeader.html %}
``` bash
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
```


<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr11" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr13" class ="hdr-btn">Skip</a></div>

## Grub menu entry #94

``` bash
menuentry 'Windows Boot Manager (on /dev/nvme0n1p2)' --class windows --class os $menuentry_id_option 'osprober-efi-D656-F2A8' {
savedefault
insmod part_gpt
insmod fat
if [ x$feature_platform_search_hint = xy ]; then
search --no-floppy --fs-uuid --set=root D656-F2A8
else
search --no-floppy --fs-uuid --set=root D656-F2A8
fi
chainloader /EFI/Microsoft/Boot/bootmgfw.efi
}
Press <Enter> to continue
```


<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr12" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr14" class ="hdr-btn">Skip</a></div>

## Grub menu entry #96

``` bash
menuentry 'System setup' $menuentry_id_option 'uefi-firmware' {
fwsetup
}
Press <Enter> to continue
```


----------



<a id="hdr14"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr13" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr15" class ="hdr-btn">Skip</a></div>

# `grub-display-lite.sh` for Ubuntu Server

Ubuntu Server and Lubuntu do not have `dialog` package installed by default like Ubuntu Desktop has. A different version has been written for these users based on the `whiptail` package which is included by default on most Linux Distributions.

The disadvantage of `whiptail` is less functions but they aren't used in this case. Another disadvantage appears to be less colors but that can make it easier to read for some people. There are advantages to `whiptail` over `dialog` such as copy to clipboard, mouse scroll wheel support and probably faster processing.

## `grub-display-lite.sh` bash script

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: grub-display-lite.sh
# PATH: $HOME/bin
# DESC: Written for AU Q&A: https://askubuntu.com/q/1019213/307523
# DATE: Mar 26, 2018.
# NOTE: "lite" version written for Ubuntu Server and Lubuntu which do
#       not have `dialog` installed by default. `whiptail` is used
#       instead. Nice consequences are better resolution, mouse scroll
#       wheel and copy to clipboard support.

# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    notify-send --urgency=critical "$0 cannot be run from GUI without TERM environment variable."
    exit 1
fi

# Version without upstart and recovery options displayed
awk -F\' '/menuentry / { print i++, $2}' /boot/grub/grub.cfg \
        | grep -v upstart | grep -v recovery > ~/.grub-display-menu

# Version with upstart and recovery options displayed
#awk -F\' '/menuentry / { print i++, $2}' /boot/grub/grub.cfg \
#        > ~/.grub-display-menu

MenuArr=()

while read -r line; do 
    MenuNmbr=${line%% *}
    MenuName=${line#* }
    MenuArr+=($MenuNmbr "$MenuName")
done < ~/.grub-display-menu
rm ~/.grub-display-menu

LongVersion=$(grub-install --version)
ShortVersion=$(echo "${LongVersion:20}")
DefaultItem=0

while true ; do

    Choice=$(whiptail \
        --title "Use arrow, page, home & end keys. Tab toggle option" \
        --backtitle "Grub Version: $ShortVersion" \
        --ok-button "Display Grub Boot" \
        --cancel-button "Exit" \
        --default-item "$DefaultItem" \
        --menu "Menu Number       ----------- Menu Name ----------" 24 76 16 \
        "${MenuArr[@]}" \
       >/dev/tty)

    clear
    if [[ $Choice == "" ]]; then break ; fi
    DefaultItem=$Choice

    for (( i=0; i < ${#MenuArr[@]}; i=i+2 )) ; do
        if [[ "${MenuArr[i]}" == $Choice ]] ; then
            i=$i+1
            MenuEntry="menuentry '"${MenuArr[i]}"'"
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

exit 0
```

The `grub-display-lite.sh` bash script is basically the same as `grub-display.sh` except there is no error message if `dialog` isn't installed. Also some `whiptail` arguments have different names.


<a id="hdr15"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr14" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr16" class ="hdr-btn">Skip</a></div>

## `grub-display-lite.sh` screenshots

The colour screen seems to be easier to read than `grub-display` which uses `dialog` package:

[![grub-display-lite.sh][3]][3]

Here is the text based image which needs no modifications to copy to clipboard:

{% include copyHeader.html %}
``` bash
Grub Version: 2.02~beta2-36ubuntu3.15


        ┌─────────┤ Use arrow, page, home & end keys. Tab toggle option ├──────────┐
        │ Menu Number       ----------- Menu Name ----------                       │ 
        │                                                                          │ 
        │              55 Ubuntu, with Linux 4.13.9-041309-generic   ↑             │ 
        │              58 Ubuntu, with Linux 4.10.0-42-generic       ▒             │ 
        │              61 Ubuntu, with Linux 4.10.0-40-generic       ▒             │ 
        │              64 Ubuntu, with Linux 4.10.0-38-generic       ▒             │ 
        │              67 Ubuntu, with Linux 4.10.0-37-generic       ▒             │ 
        │              70 Ubuntu, with Linux 4.10.0-28-generic       ▒             │ 
        │              73 Ubuntu, with Linux 4.9.77-040977-generic   ▒             │ 
        │              76 Ubuntu, with Linux 4.9.76-040976-generic   ▒             │ 
        │              79 Ubuntu, with Linux 4.4.0-104-generic       ▒             │ 
        │              82 Ubuntu, with Linux 4.4.0-103-generic       ▒             │ 
        │              85 Ubuntu, with Linux 4.4.0-101-generic       ▒             │ 
        │              88 Ubuntu, with Linux 4.4.0-98-generic        ▒             │ 
        │              91 Ubuntu, with Linux 3.16.53-031653-generic  ▒             │ 
        │              94 Windows Boot Manager (on /dev/nvme0n1p2)   ▮             │ 
        │              95 Windows Boot Manager (on /dev/sda1)        ▒             │ 
        │              96 System setup                               ↓             │ 
        │                                                                          │ 
        │                                                                          │ 
        │                   <Display Grub Boot>        <Exit>                      │ 
        │                                                                          │ 
        └──────────────────────────────────────────────────────────────────────────┘ 
                                                                                     
As mentioned above you can reduce the size of the grub menu displayed here by 66% when removing `(upstart)` and `(recovery)` menu options. Such is the case here but as a consequence the detail lines get narrower and the headings don't line up perfectly. You can tweak the column headings by changing this line:```


``` bash
    --menu "Menu Number       ----------- Menu Name ----------" 24 76 16 \
```

to something like this:

``` bash
    --menu "      Menu Number ----------- Menu Name ----------" 24 76 16 \
```


  [1]: https://i.stack.imgur.com/a95hd.png
  [2]: https://i.stack.imgur.com/FqPKg.png
  [3]: https://i.stack.imgur.com/13sHY.png


<a id="hdr16"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr15" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

