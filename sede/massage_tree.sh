#!/bin/bash

# massage_tree.sh

# Process lines:
#│   ├── 2021 [31 entries exceeds filelimit, not opening dir]
#│   └── 2022
#│       ├── 2022-01-05-Python-to-print-out-status-bar-and-percentage.md
#│       ├── 2022-02-12-How-to-change-_lsblk_-sort-order_.md
#│       ├── 2022-02-18-Convert-Stack-Exchange-posts-to-your-own-website.md
#│       ├── 2022-02-18-Unable-to-lock-screen-with-Cron-or-Settings.md
#│       ├── 2022-02-23-Frequent-switches-between-Ethernet-and-Wifi.md
#│       ├── 2022-02-24-stdin_-invalid-argument.md
#│       ├── 2022-03-13-Temporarily-disable-distracting-software.md
#│       ├── 2022-03-14-How-to-adjust-Trackpad-_Tap-Sensitivity_-without-adjusting-mouse-speed.md
#│       └── 2022-03-20-Ubuntu-can_t-find-Wifi-Driver-on-Maestro-Laptop.md

# Make "│   └── 2022 [9 entries suppressed by massage_tree.sh]"
# Delete lines with "│       ├── 2022-"

if [ ! -f "$1" ] ; then
    echo "File $1 doesn't exist"
    exit 1
fi

mapfile -t treeArray < "$1"
newArray=()
year2022=0
ndx=0
count=0
for value in "${treeArray[@]}"
do
    if [[ $value == *"2022-"* ]]; then
        [[ $year2022 == 0 ]] && year2022=$ndx
        ((count++))
    else
        newArray+=("$value")
    fi
    ((ndx++))
done
echo "Year 2022 index: $year2022"  # 44 printed.
# Line below isn't updating array?
NewArray[$year2022]="│   └── 2022 [$count entries suppressed by massage_tree.sh]"
treeArray=("${newArray[@]}")
unset newArray
printf "%s\n" "${treeArray[@]}" > "$1"
