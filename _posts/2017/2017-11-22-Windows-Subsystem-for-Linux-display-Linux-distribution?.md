---
layout:       post
title:        >
    Windows Subsystem for Linux display Linux distribution?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/978978
type:         Answer
tags:         command-line windows-subsystem-for-linux ascii
created_date: 2017-11-22 03:00:29
edit_date:    2018-04-01 17:18:58
votes:        "7 "
favorites:    
views:        "3,817 "
accepted:     Accepted
uploaded:     2022-01-09 15:58:35
toc:          false
navigation:   false
clipboard:    true
---

## WinScreeny

I took one of the three [Github WinScreeny][1] bash scripts and modified it  to look like this:

[![WSL bash startup.png][2]][2]

Here is the modified code:

{% include copyHeader.html %}
``` 
#!/bin/bash
#
# Windows Screenfetch (Without the Screenshot functionality)
# Hacked together by Nijikokun <nijikokun@gmail.com> 
# License: AOL <aol.nexua.org>

# Downloaded from: https://github.com/nijikokun/WinScreeny
# Modified from Windows to Windows Subsystem for Linux (Ubuntu initially)

version='0.4'

# Displayment
display=( Host Cpu OS Arch Shell Motherboard HDD Memory Uptime Resolution DE WM WMTheme Font )

# Color Loop
bld=$'\e[1m'
rst=$'\e[0m'
inv=$'\e[7m'
und=$'\e[4m'
f=3 b=4
for j in f b; do
  for i in {0..7}; do
    printf -v $j$i %b "\e[${!j}${i}m"
  done
done

# Debugging
debug=

Debug () {
	echo -e "\e[1;31m:: \e[0m$1"
}

# Flag Check
while getopts "vVh" flags; do
	case $flags in
		h)
			echo -e "${und}Usage${rst}:"
			echo -e "  screeny [Optional Flags]"
			echo ""
			echo "WinScreeny - A CLI Bash Script to show System Information for Windows!"
			echo ""
			echo -e "${und}Options${rst}:"
			echo -e "    ${bld}-v${rst}                 Verbose / Debug Output"
			echo -e "    ${bld}-V${rst}                 Display script version"
			echo -e "    ${bld}-h${rst}                 Display this file"
			exit;;
		V)
			echo -e "${und}WinScreeny${rst} - Version ${version}"
			echo -e "Copyright (C) Nijiko Yonskai (nijikokun@gmail.com)"
			echo ""
			echo -e "This is free software, under the AOL license: http://aol.nexua.org"
			echo -e "Source can be downloaded from: https://github.com/Nijikokun/WinScreeny"
			exit;;
		v) debug=1 continue;;
	esac
done

# Prevent Unix Output
unameOutput=`uname`GARBAGE
if [[ "$unameOutput" == 'Linux' ]] || [[ "$unameOutput" == 'Darwin' ]] ; then
    echo 'This script is for Windows, silly!'
    exit 0
fi

# Begin Detection
detectHost () {
	user=$(echo "$USER")
	host=$(hostname)
	[[ "$debug" -eq "1" ]] && Debug "Finding hostname, and user.... Found as: '$user@$host'"
}

detectCpu () {
	cpu=$(awk -F':' '/model name/{ print $2 }' /proc/cpuinfo | head -n 1 | tr -s " " | sed 's/^ //')
	[[ "$debug" -eq "1" ]] && Debug "Finding cpu.... Found as: '$cpu'"
}

detectOS () {
	os=`uname -r`
}

detectArch () {
	arch=`lsb_release -a 2>&1 | awk '{ print $2 " " $3 " " $4}' | head -3 | tail -1`
	[[ "$debug" -eq "1" ]] && Debug "Finding Architecture.... Found as: '$arch'"
}

detectHDD () {
	size=`df -H |  awk '{ print $2}' | head -2 | tail -1 | tr -d '\r '`
	free=`df -H |  awk '{ print $4 }' | head -2 | tail -1 | tr -d '\r '`

}

detectResolution () {
	width=`/mnt/c/Windows/System32/wbem/WMIC.exe desktopmonitor get screenwidth | grep -vE '[a-z]+' | tr -d '\r\n '`
	height=`/mnt/c/Windows/System32/wbem/WMIC.exe desktopmonitor get screenheight | grep -vE '[a-z]+' | tr -d '\r\n '`
}

detectUptime () {
	uptime=`awk -F. '{print $1}' /proc/uptime`
	secs=$((${uptime}%60))
	mins=$((${uptime}/60%60))
	hours=$((${uptime}/3600%24))
	days=$((${uptime}/86400))
	uptime="${mins}m"

	if [ "${hours}" -ne "0" ]; then
	  uptime="${hours}h ${uptime}"
	fi

	if [ "${days}" -ne "0" ]; then
	  uptime="${days}d ${uptime}"
	fi

	[[ "$debug" -eq "1" ]] && Debug "Finding Uptime.... Found as: '$uptime${rst}'"
}

detectMemory () {
	total_mem=$(awk '/MemTotal/ { print $2 }' /proc/meminfo)
	totalmem=$((${total_mem}/1024))
	free_mem=$(awk '/MemFree/ { print $2 }' /proc/meminfo)
	used_mem=$((${total_mem} - ${free_mem}))
	usedmem=$((${used_mem}/1024))
	mem="${usedmem}MB / ${totalmem}MB"

	[[ "$debug" -eq "1" ]] && Debug "Finding Memory.... Found as: '$mem${rst}'"
}

detectShell () {
	myshell=`bash --version | head -1`
	[[ "$debug" -eq "1" ]] && Debug "Finding Shell.... Found as: '$myshell'"
}

detectMotherboard () {
    board=`/mnt/c/Windows/System32/wbem/WMIC.exe baseboard get product | tail -2 | tr -d '\r '`
}

detectDE () {
	winver=`/mnt/c/Windows/System32/wbem/WMIC.exe os get version | grep -o '^[0-9]'`
	if [ "$winver" == "7" ]; then
		de='Aero'
	elif [ "$winver" == "6" ]; then
		de='Aero'
	else
		de=$winver
	fi
	[[ "$debug" -eq "1" ]] && Debug "Finding Desktop Environment.... Found as: '$de'"
}

detectWM () {
	vcxsrv=`/mnt/c/Windows/System32/tasklist.exe | grep -o 'vcxsrv' | tr -d '\r \n'`
	wind=`/mnt/c/Windows/System32/tasklist.exe | grep -o 'Windawesome' | tr -d '\r \n'`
	if [ "$vcxsrv" = "vcxsrv" ]; then
		wm="VcXsrv"
	elif [ "$wind" = "Windawesome" ]; then
		wm="Windawesome"
	else
		wm="DWM"
	fi
	[[ "$debug" -eq "1" ]] && Debug "Finding Window Manager.... Found as: '$wm'"
}

detectWMTheme () {
	themeFile="$(/mnt/c/Windows/System32/reg.exe query 'HKCU\Software\Microsoft\Windows\CurrentVersion\Themes' /v 'CurrentTheme' | grep -o '[A-Z]:\\.*')"
#	theme=$(echo $themeFile | awk -F"\\" '{print $NF}' | grep -o '[0-9A-z. ]*$' | grep -o '^[0-9A-z ]*')
	theme=$themeFile
	[[ "$debug" -eq "1" ]] && Debug "Finding Window Theme.... Found as: '$theme'"
}

detectFont () {
#	font=$(cat $HOME/.minttyrc | grep '^Font=.*' | grep -o '[0-9A-Za-z ]*$')
	font="Consolas"
	[[ "$debug" -eq "1" ]] && Debug "Finding Font.... Found as: '$font'"
#	if [ -z $font ]; then
#		font="Lucida Console"
#	fi
}

# Loops :>
for i in "${display[@]}"; do
	[[ "${display[*]}" =~ "$i" ]] && detect${i}
done

# Output

cat << EOF

$f1         ,.=:^!^!t3Z3z.,                
$f1        :tt:::tt333EE3                  ${f6}${user}${f7}@${f6}${host}
$f1        Et:::ztt33EEE  $f2@Ee.,      ..,   
$f1       ;tt:::tt333EE7 $f2;EEEEEEttttt33#   ${f6}OS: ${f7}${os} ${arch}
$f1      :Et:::zt333EEQ.$f2 SEEEEEttttt33QL   ${f6}CPU: ${f7}${cpu}
$f1      it::::tt333EEF $f2@EEEEEEttttt33F    ${f6}HDD free / size: ${f7}$free / $size
$f1     ;3=*^\`\`\`'*4EEV $f2:EEEEEEttttt33@.    ${f6}Memory used / size: ${f7}${mem}
$f4     ,.=::::it=., $f1\` $f2@EEEEEEtttz33QF     ${f6}Uptime: ${f7}$uptime
$f4    ;::::::::zt33)   $f2'4EEEtttji3P*      ${f6}Resolution: ${f7}$width x $height
$f4   :t::::::::tt33.$f3:Z3z..  $f2\`\` $f3,..g.      ${f6}Motherboard: ${f7}$board
$f4   i::::::::zt33F$f3 AEEEtttt::::ztF       ${f6}Shell: ${f7}$myshell
$f4  ;:::::::::t33V $f3;EEEttttt::::t3        ${f6}DE: ${f7}$de
$f4  E::::::::zt33L $f3@EEEtttt::::z3F        ${f6}WM: ${f7}$wm
$f4 {3=*^\`\`\`'*4E3) $f3;EEEtttt:::::tZ\`        ${f6}WM Theme: ${f7}$theme
$f4             \` $f3:EEEEtttt::::z7          ${f6}Font: ${f7}$font
$f3                 $f3'VEzjt:;;z>*\`        $rst

EOF

```

I won't spend a lot of time dissecting it but you will notice it's a hybrid of some Linux kernel stuff and some Windows kernel stuff.

For example this Linux kernel line displays your CPU information:

	cpu=$(awk -F':' '/model name/{ print $2 }' /proc/cpuinfo | head -n 1 | tr -s " " | sed 's/^ //')

On the other hand this Windows kernel line displays your motherboard model:

``` 
board=`/mnt/c/Windows/System32/wbem/WMIC.exe baseboard get product | tail -2 | tr -d '\r '`

```


----------

## Weather, Calendar and Time

Some people like the top part of the Ubuntu Bash on Windows 10 (WSL) terminal splash screen. If you would like the Weather, Calendar and current Time to display you can find the instructions here: [How can I get this terminal splash screen?][3]


  [1]: https://github.com/nijikokun/WinScreeny
  [2]: https://i.stack.imgur.com/Ki66O.png
  [3]: {% post_url /2018/2018-03-30-Terminal-splash-screen-with-Weather,-Calendar,-Time-&-Sysinfo? %}
