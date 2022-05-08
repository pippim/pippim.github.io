---
layout:       post
title:        >
    How to change `lsblk` sort order?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1392599
type:         Answer
tags:         partitioning text-processing sort
created_date: 2022-02-12 22:50:48
edit_date:    
votes:        "3 "
favorites:    
views:        "125 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-02-12-How-to-change-_lsblk_-sort-order_.md
toc:          false
navigation:   false
clipboard:    true
---

I ended up writing a generic sorting function to solve the problem.

## New `lsblk` sort order

{% include copyHeader.html %}
``` terminal
$ lsdrv | sblk

NAME         FSTYPE   LABEL            MOUNTPOINT                    SIZE MODEL
nvme0n1                                                              477G Samsung SSD 960 PRO 512GB               
├─nvme0n1p1  ntfs                                                    450M 
├─nvme0n1p2  vfat                      /boot/efi                      99M 
├─nvme0n1p3                                                           16M 
├─nvme0n1p4  ntfs     NVMe_Win10       /mnt/c                      363.2G 
├─nvme0n1p5  ntfs                                                    859M 
├─nvme0n1p6  ext4     New_Ubuntu_16.04 /                            45.1G 
├─nvme0n1p7  ext4     Old_Ubuntu_16.04 /mnt/old                     23.1G 
├─nvme0n1p8  ntfs     Shared_WSL+Linux /mnt/e                          9G 
├─nvme0n1p9  swap                      [SWAP]                        7.9G 
└─nvme0n1p10 ext4     Ubuntu_18.04     /mnt/clone                   27.2G 
mmcblk0                                                            119.1G 
└─mmcblk0p1  vfat     SANDISK128       /media/rick/SANDISK128      119.1G 
sr0                                                                 1024M DVD+/-RW DW316  
sda                                                                931.5G HGST HTS721010A9
├─sda1       vfat     ESP                                            500M 
├─sda2                                                               128M 
├─sda3       ntfs     HGST_Win10       /mnt/d                        919G 
├─sda4       ntfs     WINRETOOLS                                     450M 
└─sda5       ntfs     Image                                         11.4G 
```

## Bash script to sort `lsblk` output

It took a couple hours of googling different bash commands to make a solution. The bash script, initially called `sblk`, can be adapted for other purposes:

{% include copyHeader.html %}
``` bash
#!/bin/bash
# Ask Ubuntu: https://askubuntu.com/questions/1392560/how-to-change-lsblk-sort-order
oIFS="$IFS"                         # Save IFS
IFS='|'                             # Use "|" as array delimiter
declare -a partiions=()             # Partitions array for a given drive

add_part () {
    line="$1"                       # Confusing parameter $1 becomes obvious
    part=${line%% *}                # get partition name, then get number
    key=$(echo "$part" | grep -Eo '[0-9]+$')

    # If length of number is less than 2, prepend "0"
    if [[ "${#key}" < 2 ]]; then
        key="0$key"                 # Prepend "0" to single digit
    fi

    line="${line:2}"                # Strip out tree character
    partitions+=( "$key$line" )     # Old line "├─..." now array entry "99..."
}

sort_parts () {
    # Sort partitions array with sort key into new "sorted" array
    read -r -d '' -a sorted < <( 
        echo "${partitions[*]}" | tr "|" "\n" | sort | tr "\n" "|" )
    last_i=$(( ${#sorted[@]} - 1 )) # Last 0-based index in sorted array

    for ((i=0; i <= $last_i; i++)); do
        line="${sorted[i]}"         # Get array line at 0-based index
        line="${line:2}"            # Strip out sort key "99"
        if [[ $i -lt $last_i ]]; then
            echo "├─$line"          # Print a line that is not the last line
        else
            echo "└─$line"          # Print last line
        fi
    done
    partitions=()                   # Empty partitions array for the next drive
}

# Main Loop
while read line
do
    first="${line:0:2}"
    if [[ "$first" == "├─" || "$first" == "└─" ]]; then
        add_part "$line"            # Add special line to partitions array

        if [[ "$first" == "└─" ]]; then
            sort_parts              # Last partition. Sort and print array
        fi
    else
        echo "$line"                # Simply print a regular line
    fi

done < "${1:-/dev/stdin}"           # Read from file $1 or from standard input


IFS="$oIFS"                         # Restore old IFS
```
