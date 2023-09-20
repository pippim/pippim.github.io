---
layout:       post
title:        >
    How to auto-mount from command line?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1156456
type:         Answer
tags:         command-line mount
created_date: 2019-07-06 20:27:02
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "42,748 "
accepted:     
uploaded:     2023-09-19 23:40:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-06-How-to-auto-mount-from-command-line_.md
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# Script to mount drive - `mount-menu.sh`

The `mount-menu.sh` script allows you to select unmounted drives/partitions for mounting. To call the script use: `sudo mount-menu.sh`. This screen appears tailored to your unique machine environment:

[![mount-menu 1.png][1]][1]

- Use arrow keys to select the partition and press <kbd>Enter</kbd>



The menu clears and leaves this information in your terminal:

``` bash
=====================================================================
Mount Device:  /dev/nvme0n1p10
Mount Name:    /mnt/mount-menu.FPRAW
File System:   ext4
ID:            Ubuntu
RELEASE:       18.04
CODENAME:      bionic
DESCRIPTION:   Ubuntu 18.04.1 LTS
 Size  Used Avail Use%
  27G  7.9G   18G  32%
```

Now you can use: `cd /mnt/mount-menu.FPRAW` to access your external drive's partition.

Then you can use `cd home/YOUR_NAME` being mindful not to put a `/` in front of `home`. Should you use `cd /home` it would take you to your boot drive and out of the external drive.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## `mount-menu.sh` script contents

To create the script open the terminal and type:

``` bash
sudo -H gedit /usr/local/bin/mount-menu.sh
```

Then copy the code below and paste it into `gedit`. Save the file and exit `gedit`.

Now mark the file as executable using:

``` bash
sudo chmod a+x /usr/local/bin/mount-menu.sh
```

Here's the script to copy:

``` bash
#!/bin/bash

# NAME: mount-menu.sh
# PATH: /usr/local/bin
# DESC: Select unmounted partition for mounting
# DATE: May 9, 2018. Modified May 11, 2018.

# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    notify-send --urgency=critical \ 
                "$0 cannot be run from GUI without TERM environment variable."
    exit 1
fi

# Must run as root
if [[ $(id -u) -ne 0 ]] ; then echo "Usage: sudo $0" ; exit 1 ; fi

#
# Create unqique temporary file names
#

tmpMenu=$(mktemp /tmp/mount-menu.XXXXX)     # Menu list
tmpInfo=$(mktemp /tmp/mount-menu.XXXXX)     # Mount Parition Info
tmpWork=$(mktemp /tmp/mount-menu.XXXXX)     # Work file
MountName=$(mktemp -d /mnt/mount-menu.XXXXX)  # Mount directory name

#
# Function Cleanup () Removes temporary files
#

CleanUp () {
    [[ -f $tmpMenu ]] && rm -f $tmpMenu     # If temporary files created
    [[ -f $tmpInfo ]] && rm -f $tmpInfo     #  at various program stages
    [[ -f $tmpWork ]] && rm -f $tmpWork     #  remove them before exiting.
}


#
# Mainline
#

lsblk -o NAME,FSTYPE,LABEL,SIZE,MOUNTPOINT > $tmpMenu

i=0
SPACES='                                                                     '
DoHeading=true
AllPartsArr=()      # All partitions.

# Build whiptail menu tags ($i) and text ($Line) into array

while read -r Line; do
    if [[ $DoHeading == true ]] ; then
        DoHeading=false                     # First line is the heading.
        MenuText="$Line"                    # Heading for whiptail.
        FSTYPE_col="${Line%%FSTYPE*}"           
        FSTYPE_col="${#FSTYPE_col}"         # FS Type, ie `ext4`, `ntfs`, etc.
        MOUNTPOINT_col="${Line%%MOUNTPOINT*}"
        MOUNTPOINT_col="${#MOUNTPOINT_col}" # Required to ensure not mounted.
        continue
    fi

    Line="$Line$SPACES"                     # Pad extra white space.
    Line=${Line:0:74}                       # Truncate to 74 chars for menu.

    AllPartsArr+=($i "$Line")               # Menu array entry = Tag# + Text.
    (( i++ ))

done < $tmpMenu                             # Read next "lsblk" line.

#
# Display whiptail menu in while loop until no errors, or escape,
# or valid partion selection .
#

DefaultItem=0

while true ; do

    # Call whiptail in loop to paint menu and get user selection
    Choice=$(whiptail \
        --title "Use arrow, page, home & end keys. Tab toggle option" \
        --backtitle "Mount Partition" \
        --ok-button "Select unmounted partition" \
        --cancel-button "Exit" \
        --notags \
        --default-item "$DefaultItem" \
        --menu "$MenuText" 24 80 16 \
        "${AllPartsArr[@]}" \
        2>&1 >/dev/tty)

    clear                                   # Clear screen.
    if [[ $Choice == "" ]]; then            # Escape or dialog "Exit".
        CleanUp
        exit 1;
     fi

    DefaultItem=$Choice                     # whiptail start option.
    ArrNdx=$(( $Choice * 2 + 1))            # Calculate array offset.
    Line="${AllPartsArr[$ArrNdx]}"          # Array entry into $Line.

    # Validation - Don't wipe out Windows or Ubuntu 16.04:
    # - Partition must be ext4 and cannot be mounted.

    if [[ "${Line:MOUNTPOINT_col:4}" != "    " ]] ; then
        echo "Partition is already mounted."
        read -p "Press <Enter> to continue"
        continue
    fi

    # Build "/dev/Xxxxx" FS name from "├─Xxxxx" menu line
    MountDev="${Line%% *}"
    MountDev=/dev/"${MountDev:2:999}"

    # Build File System Type
    MountType="${Line:FSTYPE_col:999}"
    MountType="${MountType%% *}"

    break                                   # Validated: Break menu loop.

done                                        # Loop while errors.

#
# Mount partition
#

echo ""
echo "====================================================================="
mount -t auto $MountDev $MountName


# Display partition information.
echo "Mount Device=$MountDev" > $tmpInfo
echo "Mount Name=$MountName" >> $tmpInfo
echo "File System=$MountType" >> $tmpInfo

# Build Mount information (the partition selected for cloning to)
LineCnt=$(ls $MountName | wc -l)
if (( LineCnt > 2 )) ; then 
    # More than /Lost+Found exist so it's not an empty partition.
    if [[ -f $MountName/etc/lsb-release ]] ; then
        cat $MountName/etc/lsb-release >> $tmpInfo
    else
        echo "No LSB-Release file on Partition." >> $tmpInfo
    fi
else
    echo "Partition appears empty" >> $tmpInfo
    echo "/Lost+Found normal in empty partition" >> $tmpInfo
    echo "First two files/directories below:" >> $tmpInfo
    ls $MountName | head -n2 >> $tmpInfo
fi

sed -i 's/DISTRIB_//g' $tmpInfo      # Remove DISTRIB_ prefix.
sed -i 's/=/:=/g' $tmpInfo           # Change "=" to ":="
sed -i 's/"//g' $tmpInfo             # Remove " around "Ubuntu 16.04...".

# Align columns from "Xxxx:=Yyyy" to "Xxxx:      Yyyy"
cat $tmpInfo | column -t -s '=' > $tmpWork
cat $tmpWork > $tmpInfo

# Mount device free bytes
df -h --output=size,used,avail,pcent "$MountDev" >> $tmpInfo

# Display partition information.
cat $tmpInfo

CleanUp                             # Remove temporary files

exit 0
```


----------


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## `umount-menu.sh` to Unmount Drives/Partitions

Repeat the file creation / execute bit marking process for the script `umount-menu.sh`. This script only unmounts drives / partitions that were mounted by `mount-menu.sh`. It has the same selection menu and completes with the message:

``` bash
=====================================================================

/dev/nvme0n1p10 mounted on /mnt/mount-menu.FPRAW unmounted.
```

To call the script use: `sudo umount-menu.sh`

### `umount-menu.sh` bash script:

``` bash
!/bin/bash

# NAME: umount-menu.sh
# PATH: /usr/local/bin
# DESC: Select mounted partition for unmounting
# DATE: May 10, 2018. Modified May 11, 2018.

# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    notify-send --urgency=critical \ 
                "$0 cannot be run from GUI without TERM environment variable."
    exit 1
fi

# Must run as root
if [[ $(id -u) -ne 0 ]] ; then echo "Usage: sudo $0" ; exit 1 ; fi

#
# Create unqique temporary file names
#

tmpMenu=$(mktemp /mnt/mount-menu.XXXXX)   # Menu list

#
# Function Cleanup () Removes temporary files
#

CleanUp () {
    [[ -f "$tmpMenu" ]] && rm -f "$tmpMenu" #  at various program stages
}


#
# Mainline
#

lsblk -o NAME,FSTYPE,LABEL,SIZE,MOUNTPOINT > "$tmpMenu"

i=0
SPACES='                                                                     '
DoHeading=true
AllPartsArr=()      # All partitions.

# Build whiptail menu tags ($i) and text ($Line) into array

while read -r Line; do
    if [[ $DoHeading == true ]] ; then
        DoHeading=false                     # First line is the heading.
        MenuText="$Line"                    # Heading for whiptail.
        MOUNTPOINT_col="${Line%%MOUNTPOINT*}"
        MOUNTPOINT_col="${#MOUNTPOINT_col}" # Required to ensure mounted.
        continue
    fi

    Line="$Line$SPACES"                     # Pad extra white space.
    Line=${Line:0:74}                       # Truncate to 74 chars for menu.

    AllPartsArr+=($i "$Line")               # Menu array entry = Tag# + Text.
    (( i++ ))

done < "$tmpMenu"                           # Read next "lsblk" line.

#
# Display whiptail menu in while loop until no errors, or escape,
# or valid partion selection .
#

DefaultItem=0

while true ; do

    # Call whiptail in loop to paint menu and get user selection
    Choice=$(whiptail \
        --title "Use arrow, page, home & end keys. Tab toggle option" \
        --backtitle "Mount Partition" \
        --ok-button "Select unmounted partition" \
        --cancel-button "Exit" \
        --notags \
        --default-item "$DefaultItem" \
        --menu "$MenuText" 24 80 16 \
        "${AllPartsArr[@]}" \
        2>&1 >/dev/tty)

    clear                                   # Clear screen.

    if [[ $Choice == "" ]]; then            # Escape or dialog "Exit".
        CleanUp
        exit 1;
     fi

    DefaultItem=$Choice                     # whiptail start option.
    ArrNdx=$(( $Choice * 2 + 1))            # Calculate array offset.
    Line="${AllPartsArr[$ArrNdx]}"          # Array entry into $Line.

    if [[ "${Line:MOUNTPOINT_col:15}" != "/mnt/mount-menu" ]] ; then
        echo "Only Partitions mounted by mount-menu.sh can be unounted."
        read -p "Press <Enter> to continue"
        continue
    fi

    # Build "/dev/Xxxxx" FS name from "├─Xxxxx" menu line
    MountDev="${Line%% *}"
    MountDev=/dev/"${MountDev:2:999}"

    # Build Mount Name
    MountName="${Line:MOUNTPOINT_col:999}"
    MountName="${MountName%% *}"

    break                                   # Validated: Break menu loop.

done                                        # Loop while errors.

#
# Unmount partition
#

echo ""
echo "====================================================================="
umount "$MountName" -l                      # Unmount the clone
rm  -d "$MountName"                         # Remove clone directory

echo $(tput bold)                           # Set to bold text
echo $MountDev mounted on $MountName unmounted.
echo $(tput sgr0)                           # Reset to normal text

CleanUp                                     # Remove temporary files

exit 0
```


  [1]: https://i.stack.imgur.com/VqpIG.png



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a></div>

