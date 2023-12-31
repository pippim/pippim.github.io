---
layout:       post
title:        >
    lsblk output not sorted
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/690424
type:         Answer
tags:         arch-linux lsblk
created_date: 2022-02-12 23:26:40
edit_date:    
votes:        "0 "
favorites:    
views:        "1,632 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-02-12-lsblk-output-not-sorted.md
toc:          false
navigation:   false
clipboard:    false
---

I wrote an [answer](https://askubuntu.com/a/1392599/307523) in **Ask Ubuntu** to deal with this issue.

## Unsorted output

``` terminal
$ lsblk | egrep -v ^loop
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
nvme0n1      259:0    0   477G  0 disk 
├─nvme0n1p9  259:9    0   7.9G  0 part [SWAP]
├─nvme0n1p7  259:7    0  23.1G  0 part /mnt/old
├─nvme0n1p5  259:5    0   859M  0 part 
├─nvme0n1p3  259:3    0    16M  0 part 
├─nvme0n1p1  259:1    0   450M  0 part 
├─nvme0n1p8  259:8    0     9G  0 part /mnt/e
├─nvme0n1p10 259:10   0  27.2G  0 part /mnt/clone
├─nvme0n1p6  259:6    0  45.1G  0 part /
├─nvme0n1p4  259:4    0 363.2G  0 part /mnt/c
└─nvme0n1p2  259:2    0    99M  0 part /boot/efi
mmcblk0      179:0    0 119.1G  0 disk 
└─mmcblk0p1  179:1    0 119.1G  0 part /media/rick/SANDISK128
sr0           11:0    1  1024M  0 rom  
sda            8:0    0 931.5G  0 disk 
├─sda4         8:4    0   450M  0 part 
├─sda2         8:2    0   128M  0 part 
├─sda5         8:5    0  11.4G  0 part 
├─sda3         8:3    0   919G  0 part /mnt/d
└─sda1         8:1    0   500M  0 part 
```

## Sorted output

``` terminal
$ lsblk | egrep -v ^loop | sblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
nvme0n1      259:0    0   477G  0 disk 
├─nvme0n1p1  259:1    0   450M  0 part 
├─nvme0n1p2  259:2    0    99M  0 part /boot/efi
├─nvme0n1p3  259:3    0    16M  0 part 
├─nvme0n1p4  259:4    0 363.2G  0 part /mnt/c
├─nvme0n1p5  259:5    0   859M  0 part 
├─nvme0n1p6  259:6    0  45.1G  0 part /
├─nvme0n1p7  259:7    0  23.1G  0 part /mnt/old
├─nvme0n1p8  259:8    0     9G  0 part /mnt/e
├─nvme0n1p9  259:9    0   7.9G  0 part [SWAP]
└─nvme0n1p10 259:10   0  27.2G  0 part /mnt/clone
mmcblk0      179:0    0 119.1G  0 disk 
└─mmcblk0p1  179:1    0 119.1G  0 part /media/rick/SANDISK128
sr0           11:0    1  1024M  0 rom  
sda            8:0    0 931.5G  0 disk 
├─sda1         8:1    0   500M  0 part 
├─sda2         8:2    0   128M  0 part 
├─sda3         8:3    0   919G  0 part /mnt/d
├─sda4         8:4    0   450M  0 part 
└─sda5         8:5    0  11.4G  0 part 
```

## Bash script

Here is the bash script to sort `lsblk` output.

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

Remember to put the script into your path and make it executable with:

``` 
chmod a+x /path/to/script
```
