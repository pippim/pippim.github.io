---
layout:       post
title:        >
    source command error from /usr/share/bash-completion/bash-completion when I open a terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1047427
type:         Answer
tags:         command-line bash
created_date: 2018-06-17 19:32:44
edit_date:    
votes:        "4 "
favorites:    
views:        "3,664 "
accepted:     
uploaded:     2022-01-29 14:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-17-source-command-error-from-_usr_share_bash-completion_bash-completion-when-I-open-a-terminal.md
toc:          false
navigation:   false
clipboard:    true
---

To see if any of your aliases are conflicting with a bash built-in or a system command use this script:



``` bash
#!/bin/bash -i

# NAME: alias-check
# PATH: /mnt/e/bin
# DESC: Verify alias doesn't conflict with bash built-in
# DATE: June 17, 2018.

# Get aliases
alias > /tmp/alias.lst
sed -i 's/=.*//; s/alias //g' /tmp/alias.lst
#cat /tmp/alias.lst
while read -r line 
do 
   command type -a ${line}
done< /tmp/alias.lst
```

## Testing bad aliases



Edit `~/.bashrc` and insert these "bad" aliases:

``` text
alias fi=find
alias test='ls test'
```

Now run the script `alias-check`:

{% include copyHeader.html %}
``` text
bash: /home/rick/.bashrc: line 171: syntax error: unexpected end of file
alert is aliased to `notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e 's/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//')"'
cdd is aliased to `cd /home/rick/SERVER/#/Dump'
cdh is aliased to `cd /home/rick'
cdm is aliased to `cd /media/rick/ST9_Win7/Users/Person/Music/iTunes/iTunes Media/Music'
egrep is aliased to `egrep --color=auto'
egrep is /bin/egrep
fgrep is aliased to `fgrep --color=auto'
fgrep is /bin/fgrep
fi is aliased to `find'
fi is a shell keyword
grep is aliased to `grep --color=auto'
grep is /bin/grep
l is aliased to `ls -CF'
la is aliased to `ls -A'
ll is aliased to `ls -alF'
ls is aliased to `ls --color=auto'
ls is /bin/ls
lsdrv is aliased to `lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL'
redalert is aliased to `notify-send --urgency=critical -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e 's/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//')"'
sudo is aliased to `sudo '
sudo is /usr/bin/sudo
test is aliased to `ls test'
test is a shell builtin
test is /usr/bin/test
zenity is aliased to `zenity 2>/dev/null'
zenity is /mnt/e/usr/local/bin/zenity
zenity is /usr/local/bin/zenity
zenity is /usr/bin/zenity
```


Notice the lines:



- fi is a <strong>shell keyword</strong>
- test is a <strong>shell builtin</strong>

Look for these types of errors in your aliases.

After testing don't forget to remove the aliases `fi` and `test` and save `~/.bashrc` again.

You can't run the test by simply issuing alias at the command line because the first line of the script `#!/bin/bash -i` loads a new shell using `~/.bashrc`.
