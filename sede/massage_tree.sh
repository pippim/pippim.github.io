#!/bin/bash

# ~/website/sede/massage_tree.sh

# Process lines:
# │   ├── 2021 [31 entries exceeds filelimit, not opening dir]
# │   ├── 2022
# │   │   ├── 2022-01-05-Python-to-print-out-status-bar-and-percentage.md
# │   │   ├── 2022-    "       "       "       "
# │   │   └── 2022-03-20-Ubuntu-can_t-find-Wifi-Driver-on-Maestro-Laptop.md
# │   └── 2023
# │       ├── 2023-11-05-Ubuntu-fan-noise-while-watching-videos.md
# │       └── 2023-11-07-Are-login-passwords-saved-on-the-machine-or... .md


# Delete lines with: "─ 2022-"
# New summary line: "│   ├── 2022 [13 entries suppressed by massage_tree.sh]"
# Delete lines with: "─ 2023-"
# New summary line: "│   ├── 2023 [2 entries suppressed by massage_tree.sh]"

if [ ! -f "$1" ] ; then
    echo "File $1 doesn't exist"
    exit 1
fi

ndx=0
c2022=0
y2022=0
c2023=0
y2023=0
newArray=()
mapfile -t treeArray < "$1"
for value in "${treeArray[@]}"
do
    if [[ $value == *"─ 2022-"* ]]; then
        [[ $y2022 == 0 ]] && y2022=$((ndx - 1))  # First "2022-" found
        ((c2022++))  # How many "2022-" were found
    elif [[ $value == *"─ 2023-"* ]]; then
        [[ $y2023 == 0 ]] && y2023=$((ndx - 1))  # First "2023-" found
        ((c2023++))  # How many "2023-" were found
    else
        newArray+=("$value")
    fi
    ((ndx++))
done

newArray[$y2022]="│   ├── 2022 [$c2022 entries suppressed by massage_tree.sh]"
# Nov. 17/23 2023
newArray[$y2023]="│   ├── 2023 [$c2023 entries suppressed by massage_tree.sh]"
printf "%s\n" "${newArray[@]}" > "$1"
