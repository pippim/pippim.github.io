---
layout:       post
title:        >
    Get network usage from specific date on terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1030399
type:         Answer
tags:         networking network-monitoring vnstat
created_date: 2018-05-01 04:15:41
edit_date:    2018-05-02 00:50:51
votes:        "1 "
favorites:    
views:        "2,728 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-01-Get-network-usage-from-specific-date-on-terminal.md
toc:          false
navigation:   false
clipboard:    false
---

Copy the code below into a file. I'm using `~/bin/vnstat-hist.sh`. After saving the file mark it as executable using:



``` bash
chmod a+x ~/bin/vnstat.sh
```

To run the script call it with the parameter for number of days. For example for today use `vnstat-hist.sh 1`. For last five days (including today) use:

``` bash
$ vnstat-hist.sh 5
vnstat -d 5 day summary
     2018-04-27     6.21 GiB |    1.83 GiB |    8.04 GiB |  780.45 kbit/s
     2018-04-28     5.97 GiB |    1.05 GiB |    7.02 GiB |  681.20 kbit/s
     2018-04-29     8.27 GiB |    1.47 GiB |    9.74 GiB |  945.40 kbit/s
     2018-04-30     4.09 GiB |    1.35 GiB |    5.44 GiB |  527.97 kbit/s
     2018-05-01     1.36 GiB |    1.13 GiB |    2.49 GiB |  315.40 kbit/s
Total:32.73
```

## `vnstat-hist.sh` Bash script

Note this program can be shorter but hopefully the design is easier to follow for novices.

``` bash
#!/bin/bash

# NAME: vnstat-hist.sh
# PATH: $HOME/bin
# DESC: Written for AU Q&A: https://askubuntu.com/questions/1030345/get-network-usage-from-specific-date-on-terminal/1030399?noredirect=1#comment1675801_1030399
#       Get total vnStat bytes from x days ago to today.
#       Parameter 1 = number of days: 1= today, 2= yesterday + today, etc.

# DATE: May 1, 2018.

re='^[0-9]+$'
if ! [[ $1 =~ $re ]] ; then
   echo "Error: Parameter 1 must be number of days" >&2; exit 1
fi

# Get body of vnstat -d into file, ie strip headings and total lines
# First get count of all lines, then delete 2 total lines & 5 heading lines

vnstat -d > /tmp/vnstat-hist.txt
NumLines=$(cat /tmp/vnstat-hist.txt | wc -l)
NumLines=$(( NumLines - 2))
cat /tmp/vnstat-hist.txt | head -n $NumLines > /tmp/vnstat-hist2.txt
NumLines=$(( NumLines - 5))
cat /tmp/vnstat-hist2.txt | tail -n $NumLines > /tmp/vnstat-hist.txt

MaxDays=$(cat /tmp/vnstat-hist.txt | wc -l)

DayCount="$1"
(( $DayCount > $MaxDays )) && DayCount=$MaxDays
cat /tmp/vnstat-hist.txt | tail -n $DayCount  > /tmp/vnstat-hist2.txt
echo "vnstat -d $DayCount day summary"
awk '{sum+=$8;} END { print "Total:" sum }1' /tmp/vnstat-hist2.txt

# Clean up temp files
rm -f /tmp/vnstat-hist.txt
rm -f /tmp/vnstat-hist2.txt

exit 0
```

