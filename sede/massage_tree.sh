#!/bin/bash

# ~/website/sede/massage_tree.sh

# Usage inside ~/website/sede/refresh.sh:
#   cd ~/website2
#   tree -L 3 --dirsfirst --filelimit 30 > /tmp/tree.work
#   ~/website/sede/massage_tree.sh /tmp/tree.work
#   tail -n +2 /tmp/tree.work > _includes/website_tree.txt
#   rm /tmp/tree.work

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
c2024=0
y2024=0
c2025=0
y2025=0
newArray=()
mapfile -t treeArray < "$1"
for value in "${treeArray[@]}" ; do
    if [[ $value == *"─ 2022-"* ]]; then
        [[ $y2022 == 0 ]] && y2022=$((ndx - 1))  # First "2022-" found
        ((c2022++))  # How many "2022-" were found
    elif [[ $value == *"─ 2023-"* ]]; then
        [[ $y2023 == 0 ]] && y2023=$((y2022 + 1))  # First "2023-" found
        # Do not use ((ndx - 1)) because it points into _sass directory
        ((c2023++))  # How many "2023-" were found
    elif [[ $value == *"─ 2024-"* ]]; then
        [[ $y2024 == 0 ]] && y2024=$((y2023 + 1))  # First "2024-" found
        # Do not use ((ndx - 1)) because it points into _sass directory
        ((c2024++))  # How many "2024-" were found
    elif [[ $value == *"─ 2025-"* ]]; then
        [[ $y2025 == 0 ]] && y2025=$((y2024 + 1))  # First "2025-" found
        # Do not use ((ndx - 1)) because it points into _sass directory
        ((c2025++))  # How many "2025-" were found
    else
        newArray+=("$value")
    fi
    ((ndx++))
done

newArray[$y2022]="│   ├── 2022 [$c2022 entries suppressed by massage_tree.sh]"
# Nov. 17/23 2023
newArray[$y2023]="│   ├── 2023 [$c2023 entries suppressed by massage_tree.sh]"
# Feb. 19/24 2024
newArray[$y2024]="│   ├── 2024 [$c2024 entries suppressed by massage_tree.sh]"
# Feb. 01/25 2025
newArray[$y2025]="│   └── 2025 [$c2025 entries suppressed by massage_tree.sh]"
printf "%s\n" "${newArray[@]}" > "$1"
