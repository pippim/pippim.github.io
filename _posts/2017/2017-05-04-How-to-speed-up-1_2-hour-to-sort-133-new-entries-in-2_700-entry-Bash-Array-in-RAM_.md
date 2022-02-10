---
layout:       post
title:        >
    How to speed up 1/2 hour to sort 133 new entries in 2,700 entry Bash Array in RAM?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/43772024
type:         Answer
tags:         arrays bash performance yad
created_date: 2017-05-04 00:36:14
edit_date:    2020-06-20 09:12:55
votes:        "2 "
favorites:    
views:        "48 "
accepted:     
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-05-04-How-to-speed-up-1_2-hour-to-sort-133-new-entries-in-2_700-entry-Bash-Array-in-RAM_.md
toc:          false
navigation:   false
clipboard:    true
---

# Cut time from 1/2 hour in RAM to 9 seconds with disk

Bash arrays can be notoriously slow in many instances. You need to call the external sort program. Here is a code snippet:





{% include copyHeader.html %}
``` bash
#-------------------------------------------------------------------------------
ExternalSortDirsArr () {

cp ~/.bafmanDirs ~/.bafmanDirs~ #Make backup copy
IFS="|" read -ra DirsArr < ~/.bafmanDirs
DirsArrCnt=${#DirsArr[@]}

DirPercent=0
DirLastPercent=0
DirCount=0
DirTotal=$(( $DirsArrCnt / $OneDirArrCnt ))
DirTotal=$(( $DirTotal + $DirTotal )) # Two passes

# Named FIFO pipes used between us and spawn-progress-log to avoid
# race conditions (flashing screen and keyboard lag) over 1/2 hour
YadNamedPipe="/tmp/bafman-yad-"$(date +%s) #seconds since EPOCH
mkfifo "$YadNamedPipe"
spawn-progress-log "$YadNamedPipe" \
    "bafman - Born Again File Manager" \
    "Four pass directory name external sort." &

# Create Keys Index
echo " "
echo "Create Keys-Index Pairs File"
> ~/.bafmanSort # Empty existing file.

time for (( i=0; i<$DirsArrCnt; i=i+$OneDirArrCnt )) ; do
    CurrKey=$(echo "${DirsArr[$(( $i + 1 ))]}" | tr -dc '[:alnum:]/')
    echo "$CurrKey|$i" >> ~/.bafmanSort

    # Update progress display
    DirPercent=$(( $DirCount * 100 / $DirTotal ))
    DirCount=$(( $DirCount + 1 ))
    if [[ "$DirPercent" -ne "$DirLastPercent" ]] ; then
        echo "#$CurrKey" > "$YadNamedPipe" & # Update YAD log window
        DirLastPercent=$DirPercent
        echo "$DirPercent" > "$YadNamedPipe" &         # Update YAD progress bar
    fi
done

# Call external sort program
echo " "
echo "Sort Keys-Index Pairs File"
time sort -k1 -t"|" ~/.bafmanSort -o ~/.bafmanSort

# Strip out keys
echo " "
echo "Strip out keys leaving Sorted Indices"
time cut -f2 -d '|' ~/.bafmanSort > ~/.bafmanNdx

echo " "
echo "Rewrite DirsArr by Sorted Index"
> ~/.bafmanDirs # Empty existing file.
> ~/.bafmanLog # Empty existing file.
Second=""
time while read -r line; do 
    j=$(( $line + $OneDirArrCnt ))
    for (( i=$line; i<j; i++ )); do
        echo -n "$Second""${DirsArr[i]}" >> ~/.bafmanDirs
        Second="|"

        # Update progress display
        DirPercent=$(( $DirCount * 100 / $DirTotal ))
        DirCount=$(( $DirCount + 1 ))
        if [[ "$DirPercent" -ne "$DirLastPercent" ]] ; then
#            echo "#$CurrKey" > "$YadNamedPipe" & # Update YAD log window
            DirLastPercent=$DirPercent
            echo "$DirPercent" > "$YadNamedPipe" &         # Update YAD progress bar
        fi
    done
done < ~/.bafmanNdx


echo " "
printf "* * * * * * * * *  ExternalSortDirsArr -- "
echo " Total DirsArr elements: $DirsArrCnt  Added: $DirsArrAddElementCount  * * * * * * * * *"

echo "100" > $YadNamedPipe &    # Signal close
rm -f $YadNamedPipe             # Remove FIFO named pipe for IPC

} ### ExternalSortDirsArr ()
```

Here are the benchmark time displays. Notice how 1/2 hour has dropped to 9 seconds:

{% include copyHeader.html %}
``` bash
Create Keys-Index Pairs File

real    0m3.899s
user    0m0.400s
sys 0m0.424s
 
Sort Keys-Index Pairs File

real    0m0.013s
user    0m0.012s
sys 0m0.000s
 
Strip out keys leaving Sorted Indices

real    0m0.001s
user    0m0.004s
sys 0m0.000s
 
Rewrite DirsArr by Sorted Index

real    0m1.407s
user    0m1.268s
sys 0m0.464s
 
* * * * * * * * *  ExternalSortDirsArr --  Total DirsArr elements: 24710  Added: 134  * * * * * * * * *
Gtk-Message: GtkDialog mapped without a transient parent. This is discouraged.

real    0m9.667s
user    0m1.828s
sys 0m0.952s
```
