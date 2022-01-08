---
layout:       post
title:        >
    Prevent `dd` from destroying SSD or HDD
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/867747
type:         Answer
tags:         hard-drive ssd dd undelete
created_date: 2017-01-04 03:17:07
edit_date:    2017-06-25 19:26:08
votes:        "3 "
favorites:    
views:        "2,580 "
accepted:     Accepted
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    true
---

### Create `dd` wrapper script

Open the terminal using <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>. Then call `gedit` with:

``` 
gksu gedit /usr/local/bin/dd

```

and copy and paste these commands:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# Who called this script?
PARENT_COMMAND="$(ps -o comm= $PPID)"   
if [[ $(id -u) != 0 ]]; then # Only non-root processes enter password (ie "sudo dd ..." is ok)
    echo dd must be called with sudo powers
    exit 1
fi

# log dd usage for audit trails
# log-file '"$PARENT_COMMAND"" - ""$@"' "/var/log/dd-usage"

# Display hints & arguments. Get any key to proceed or <Ctrl>+C to abort
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║                      dd - Data Duplicator                      ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo
echo " Parameter 1 hint: if=/dev/zero"
echo " Parameter 2 hint: of=/dev/sdY where Y cannot be a, b or c"
echo " Parms >2 hints:   bs=512 is default block size"
echo " Parms >2 hints:   count=100 will process 100 blocks"
echo
echo " Use /bin/dd --help for more info (don't use dd --help)"
echo
# Display drive letterss, names and sizes without partitions for guide
lsblk -ido KNAME,TYPE,SIZE,MODEL
echo
echo " Current parameters: "”$@”
echo
echo "      Press <Enter> to continue or <Ctrl>+C to abort."

read ANYKEY

if [[ "$2" != of=* ]]; then
    echo -e "\a" # PC speaker beep or pleasant bell with PulseAudio hooks
    echo "ERROR! Parameter 2 must start with 'of=' (output file=)"
    exit 2
fi
  
if [[ "$2" =~ "sda" ]]; then
    echo -e "\a" # PC speaker beep or pleasant bell with PulseAudio hooks
    echo "ERROR! Output file (of=) cannot be /dev/sda"
    exit 2
fi
  
if [[ "$2" =~ "sdb" ]]; then
    echo -e "\a" # PC speaker beep or pleasant bell with PulseAudio hooks
    echo "ERROR! Output file (of=) cannot be /dev/sdb"
    exit 2
fi

if [[ "$2" =~ "sdc" ]]; then
    echo -e "\a" # PC speaker beep or pleasant bell with PulseAudio hooks
    echo "ERROR! Output file (of=) cannot be /dev/sdc"
    exit 2
fi  

# Call REAL dd command with parameters passed to this wrapper sript
/bin/dd "$@"
    
exit 0

```

Save the file and exit `gedit`.

Lastly mark the new `dd` as executable with:

``` bash
sudo chmod +x /usr/local/bin/dd

```

### What it looks like

Below is how it appears on your terminal screen when you've called the new `dd` script without using the protected drives.

{% include copyHeader.html %}
``` bash
$ sudo dd if=/dev/zero of=/dev/sdd bs=512 count=100
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║                       dd - Data Duplicator                     ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

 Parameter 1 hint: if=/dev/zero
 Parameter 2 hint: of=/dev/sdY where Y cannot be a, b or c
 Parms >2 hints:   bs=512 is default block size
 Parms >2 hints:   count=100 will process 100 blocks

 Use /bin/dd --help for more info (don't use dd --help)

KNAME TYPE   SIZE MODEL
sda   disk 223.6G KINGSTON SHSS37A
sdb   disk 465.8G ST9500423AS     
sdc   disk 119.2G KingFast        
sdd   disk  29.8G USB Flash Drive 
sr0   rom   1024M DVD+-RW GT80N   

 Current parameters: 'if=/dev/zero of=/dev/sdd bs=512 count=100'

      Press <Enter> to continue or <Ctrl>+C to abort.

100+0 records in
100+0 records out
51200 bytes (51 kB, 50 KiB) copied, 0.00339331 s, 15.1 MB/s

```

### Notes

Because the wrapper script is located in `/usr/local/bin` it is called before the regular command stored in `/bin`.

The second parameter must begin with `of=` and can not contain `sda`, `sdb` or `sdc`, add more drives to protect or subtract drives depending on your installation.

Line draw characters may not work on older platforms or different character sets. Use "+---+" for top and bottom lines and "|" for middle lines or remove them altogether.

`log-file` is a script for logging commands to audit files. You can replace it with your own command and un-comment the line by removing the leading `#`.
