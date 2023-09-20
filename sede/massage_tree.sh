#!/bin/bash

# ~/website/sede/massage_tree.sh

# Process lines:
# │   ├── 2021 [31 entries exceeds filelimit, not opening dir]
# │   ├── 2022
# │   │   ├── 2022-01-05-Python-to-print-out-status-bar-and-percentage.md
# │   │   ├── 2022-    "       "       "       "
# │   │   └── 2022-03-20-Ubuntu-can_t-find-Wifi-Driver-on-Maestro-Laptop.md
# │   └── 2023

# Delete lines with: "─ 2022-"
# New summary line: "│   ├── 2022 [13 entries suppressed by massage_tree.sh]"

if [ ! -f "$1" ] ; then
    echo "File $1 doesn't exist"
    exit 1
fi

ndx=0
count=0
y2022=0
newArray=()
mapfile -t treeArray < "$1"
for value in "${treeArray[@]}"
do
    if [[ $value == *"─ 2022-"* ]]; then
        [[ $y2022 == 0 ]] && y2022=$((ndx - 1))  # First "2022-" found
        ((count++))  # How many "2022-" were found
    else
        newArray+=("$value")
    fi
    ((ndx++))
done

newArray[$y2022]="│   ├── 2022 [$count entries suppressed by massage_tree.sh]"
# 2023 needs to be done, but no posts. Total line 112 files needs 9 subtracted.
printf "%s\n" "${newArray[@]}" > "$1"
