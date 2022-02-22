---
layout:       post
title:        >
    Unable to read files between two distros
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1034746
type:         Answer
tags:         dual-boot partitioning mount gparted
created_date: 2018-05-11 03:31:29
edit_date:    2018-05-12 02:22:49
votes:        "2 "
favorites:    
views:        "261 "
accepted:     
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-11-Unable-to-read-files-between-two-distros.md
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

## Doing it manually

Mount the 2nd Distro with these commands

``` 
sudo mkdir /mnt/MyOtherDistro
sudo mount -t auto -v /dev/sdb5 /mnt/MyOtherDistro
```

Now you will be able to use Nautilus or any other file manager to navigate to the directory `/mnt/MyOtherDistro` to view / copy / delete files, etc.

You can also change to a directory in the 2nd Distro:

``` 
cd /mnt/MyOtherDistro/home/Me/Documents
```

When you are done unmount the partition and delete the directory:

``` 
sudo umount -l /mnt/MyOtherDistro
sudo rm -d /mnt/MyOtherDistro
```


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## Doing it with a bash script

As luck would have it I was just working on two scripts tonight to mount and unmount partitions via a command line scroll box. 

### Mount a partition

To mount a partition run the bash script `sudo mount-menu.sh`:

[![mount-menu.sh][1]][1]

Highlight an unmounted partition and press <kbd>Enter</kbd>. It will be mounted and some basic information about the partition will be displayed:

``` 
=====================================================================
Mount Device:  /dev/nvme0n1p8
Mount Name:    /mnt/mount-menu.b9yZf
File System:   ext4
ID:            Ubuntu
RELEASE:       18.04
CODENAME:      bionic
DESCRIPTION:   Ubuntu 18.04 LTS
 Size  Used Avail Use%
  24G   17G  5.2G  77%
```

To create the script, copy the following to a file called `/usr/local/bin/mount-menu.sh`:



{% include copyHeader.html %}
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

### Unmount a partition

To unmount the partition setup by `mount-menu.sh` run the command `sudo umount-menu.sh`. The same screen shown above appears except the partition is already mounted and you select it to unmount it. First you need to create the script `/usr/local/bin/umount-menu.sh` and copy in the lines below:

{% include copyHeader.html %}
``` bash
#!/bin/bash

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

tmpMenu=$(mktemp /tmp/mount-menu.XXXXX)   # Menu list

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


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## Make them executable

After creating the files, both scripts must be marked executable:

``` bash
sudo chmod a+x /usr/local/bin/mount-menu.sh
sudo chmod a+x /usr/local/bin/umount-menu.sh
```


  [1]: https://i.stack.imgur.com/xMrxh.png



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a></div>

