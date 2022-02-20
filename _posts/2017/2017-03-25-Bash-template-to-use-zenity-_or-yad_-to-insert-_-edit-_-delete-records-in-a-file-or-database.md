---
layout:       post
title:        >
    Bash template to use zenity (or yad) to insert / edit / delete records in a file or database
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/896783
type:         Answer
tags:         command-line bash scripts zenity yad
created_date: 2017-03-25 15:23:15
edit_date:    
votes:        "2 "
favorites:    
views:        "3,187 "
accepted:     Accepted
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-25-Bash-template-to-use-zenity-_or-yad_-to-insert-_-edit-_-delete-records-in-a-file-or-database.md
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# YAD (Yet Another Dialog) is the best method

YAD is a fork of Zenity and provides advanced controls over buttons, lists and GTK interfaces. For example when entering a file name in this answer YAD easily provides us the regular GUI system interface:

[![websync file input][1]][1]


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## Sample main dialog window

The main window hides the record number column which you can reveal for debugging purposes:

[![websync main][2]][2]


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Sample Insert / Edit window

The same window is used for inserting records before an existing record or editing an existing record:

[![websync edit][3]][3]

Notice the "File name" field. When you enter it the file selection dialog box in the first section appears.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## The bash code

Here is the bash code to make the sample YAD insert/edit/delete records template. Note extra coding is still needed to read in the file and add processing logic for the "Run" command. Additional coding is probably required to support file names with embedded spaces but that hasn't been tested yet.



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: websync
# PATH: $HOME/bin
# DESC: Provide list of files and corresponding website addresses.

# DATE: Mar 25, 2017.

# NOTE: Uses yad which is fork of zenity which is GUI fork of dialog.

# TODO: Add local file date modified. Add Answer last revision date.
#       Add question title.
#    	Add file word count, or size, or ignore as irrelevant?
#	Add answer word count if file word count is displayed.
#       Add answer up votes.
#	Scan directory to add all files. ("Populate" button)
#	Initialize $ListArr[@] < /home/$USER/bin/.websync
#	Use "|" as ListArr delimeter or (double quotes?) for file names with spaces

# Must have the yad package.
command -v yad >/dev/null 2>&1 || { echo >&2 "yad package required but it is not installed.  Aborting."; exit 99; }

# Must have the zenity package.
command -v zenity >/dev/null 2>&1 || { echo >&2 "yad package required but it is not installed.  Aborting."; exit 99; }

RenumberListArr () {
# This is called after inserting or deleting records.
# Record numbers may not be sequential because user can sort on any column
# Record nubmers must be unique as they are used to find the correct record in ListArr array.
# Matching on "file name" or any other field is impossible because there may be duplicate names.

# Define variables for easy reading and fewer code line changes when expanding
RecArrCnt=5
ListArrCnt=${#ListArr[@]}

i=1 # First element (0) is "false", followed by record number element (1)
j=1 # Record numbers start at 1

while [ $i -lt $ListArrCnt ] ; do
    ListArr[$i]=$j
    j=$(($j + 1))
    i=$(($i + $RecArrCnt))
# echo "Renumber i: $i j: $j"
done

}

OLDIFS="$IFS"
IFS="|"
ListArr=()

# TODO: Replace this section with IFS=' ' read -ra CfgArr < /home/$USER/bin/.websync

ListArr=("${ListArr[@]}" false "1" "/usr/local/bin/display-auto-brightness" "Different")
Modified=$(stat "/usr/local/bin/display-auto-brightness" | grep "Modify:"| cut -f2 -d" ")
echo "Modified: $Modified" # File modified date is a future list array new field
ListArr=("${ListArr[@]}" "http://askubuntu.com/questions/894460/automatically-adjust-display-brightness-based-on-sunrise-and-sunset/894470#894470")
ListArr=("${ListArr[@]}" false "2" "/usr/local/bin/sun-hours" "Matches")
ListArr=("${ListArr[@]}" "http://askubuntu.com/questions/894460/automatically-adjust-display-brightness-based-on-sunrise-and-sunset/894470#894470")
ListArr=("${ListArr[@]}" false "3" "/etc/cron.daily/sun-hours" "Matches")
ListArr=("${ListArr[@]}" "http://askubuntu.com/questions/894460/automatically-adjust-display-brightness-based-on-sunrise-and-sunset/894470#894470")
ListArr=("${ListArr[@]}" false "4" "/home/rick/.conkyrc" "Matches")
ListArr=("${ListArr[@]}" "http://askubuntu.com/questions/894460/automatically-adjust-display-brightness-based-on-sunrise-and-sunset/894470#894470")
ListArr=("${ListArr[@]}" false "5" "/usr/local/bin/auto-brightness-config" "Matches")
ListArr=("${ListArr[@]}" "http://askubuntu.com/questions/894460/automatically-adjust-display-brightness-based-on-sunrise-and-sunset/894470#894470")
ListArr=("${ListArr[@]}" false "6" "/etc/cron.d/display-auto-brightness" "Matches")
ListArr=("${ListArr[@]}" "http://askubuntu.com/questions/894460/automatically-adjust-display-brightness-based-on-sunrise-and-sunset/894470#894470")
ListArr=("${ListArr[@]}" false "7" "/home/rick/bin/indicator-sysmonitor-display" "Different")
ListArr=("${ListArr[@]}" "http://askubuntu.com/questions/882419/can-bash-display-in-systray-as-application-indicator/882420#882420")

TransCount=0 # Number of Inserts, Edits and Deletes

# Read Only Status column: Recalc, Different, Matches, Bad File, No Address, Bad Address
# Debugging: --hide-column=2 hides Read Only record number column for normal operation

while true ; do

# adjust width & height below for your screen 900x600 default for 1920x1080 HD screen
# also adjust font="14" below if blue title text is too small or too large
Record=(`yad \
	--title "websync - Compare local scripts to those published on internet." --list \
        --text '<span foreground="blue" font="14"> \
        Click column heading to sort.\
        Select record before clicking: Insert / Edit / Delete</span>' \
        --width=1200 --height=600 --center --radiolist -separator="$IFS" \
        --button="Insert before":10 --button="Edit":20 --button="Delete":30 --button="Run":40 \
        --button="Cancel ALL":50 --button="Save":60 --search-column=3 \
        --column "Select" --column "Record number" --hide-column=2 --column "File Name" \
        --column "Status" --column " Website Address" \
        "${ListArr[@]}"`)
Action=$?

RecSelected=false
RecArr=()
i=0

# Button values 1 and 3 don't work for returning selected record for some reason???
# Button values 11, 13 and 15 don't work either. 12, 14 and 16 work. 
# Therefore use Button values (10, 20, 30...) for readability.
for Field in "${Record[@]}" ; do
    RecSelected=true
    RecArr[i++]=$Field
done

# Define variables for easy reading and fewer code line changes when expanding
RecArrCnt=5
ListArrCnt=${#ListArr[@]}

# Error checking
if [[ $Action == 10 ]] || [[ $Action == 20 ]] || [[ $Action == 30 ]] ; then
    if [[ $RecSelected == false ]] ; then
	zenity --error --text 'You must select a record before clicking: Insert / Edit / Delete.'
   	continue
    fi
fi

# Insert before || or Edit ?
if [[ $Action == 10 ]] || [[ $Action == 20 ]] ; then

    RecArr[3]="Recalc"
    # --text="Set fields and click OK to update" 
    # Note if there is a space at end of line, next line generates invalid command error from yad
    NewRecArr=(`yad --width=900 --height=300 --title="Link file to Website Address" \
        --form --center \
        --field="File name":FL --field="Status":RO \
        --field="Website Address":TXT \
        ${RecArr[2]} ${RecArr[3]} ${RecArr[4]}`)
    ret=$?

    # Cancel =252, OK = 0
    # OK & Insert operation?
    if [[ $ret == 0 ]] && [[ $Action == 10 ]]; then
        # Create new list entry and renumber
	((TransCount++)) # Update number of changes
    	let i=1		 # Base 0 array, record number is second field

	while [ $i -lt $ListArrCnt ] ; do
	    if [ ${ListArr[$i]} -eq ${RecArr[1]} ]; then
		# We have matching record number to insert before
  	        NewArr+=( false )
  	        NewArr+=( "${ListArr[$i]}" )
  	        NewArr+=( "${NewRecArr[0]}" )
  	        NewArr+=( "${NewRecArr[1]}" )
  	        NewArr+=( "${NewRecArr[2]}" )
	    fi
	    let j=$(( $i-1 ))
	    let k=$(( $j+$RecArrCnt ))
	    while [ $j -lt $k ] ; do
  	        NewArr+=( "${ListArr[$j]}" )
		j=$(($j + 1))
	    done
 	    let i=$(($i + $RecArrCnt)) # Next list array entry to copy
	done
	ListArr=("${NewArr[@]}")
	unset NewArr
	RenumberListArr

    # OK & Edit operation?
    elif [[ $ret == 0 ]] && [[ $Action == 20 ]]; then
        # Update array entry
	((TransCount++))
    	let i=1
	while [ $i -lt $ListArrCnt ] ; do
	    if [ ${ListArr[$i]} -eq ${RecArr[1]} ]; then
		# We have matching record number
		ListArr[++i]="${NewRecArr[0]}"
		ListArr[++i]="New"
		ListArr[++i]="${NewRecArr[2]}"
		let i=$(($ListArrCnt + 1)) # force exit from while loop
	    else
		let i=$(($i + $RecArrCnt)) # Check next entry
	    fi
	done
    fi

# Delete record?
elif [[ $Action == 30 ]] ; then
    # --text="click OK to confirm delete" 
    # Note if there is a space at end of a script line, the next line generates 
    # "invalid command error from yad
    yad --width=900 --height=300 --title="Do you really want to delete this record?" \
        --text '<span foreground="blue" font="14">Click OK to confirm delete.</span>' \
        --form --center \
        --field="File name":RO --field="Status":RO \
        --field="Website Address":RO \
        ${RecArr[2]} ${RecArr[3]} ${RecArr[4]}
    ret=$?

    # Cancel =252, OK = 0
    if [[ $ret == 0 ]] ; then
        # Delete record from list array and renumber
	((TransCount++))
    	let i=1
	while [ $i -lt $ListArrCnt ] ; do
	    if [ ${ListArr[$i]} -eq ${RecArr[1]} ]; then
		# We have matching record number
		j=$(($i - 1))
		k=$(($j + $RecArrCnt))
		while [ $j -lt $k ] ; do
		    unset 'ListArr[$j]'
		    j=$(($j + 1))
		done
		for i in "${!ListArr[@]}"; do
      		    NewArr+=( "${ListArr[$i]}" )
		done
		ListArr=("${NewArr[@]}")
		unset NewArr
		let i=$(($ListArrCnt + 1)) # force exit from while loop
	    else
		let i=$(($i + $RecArrCnt)) # Check next entry
	    fi
	done
	RenumberListArr
    else
        continue # cancel changes.
    fi

# Run update process?
elif [[ $Action == 40 ]] ; then
    continue # TODO: Run

# Cancel all changes?
elif [[ $Action == 50 ]] || [[ $Action == 252 ]] ; then
    # Cancel ALL || or X the window or Escape
    if [[ $TransCount -gt 0 ]] ; then
	zenity --question --text "You have made $TransCount change(s). Do you really want to cancel?"
	rc=$? 
	if [[ $rc -eq 0 ]] ; then
	    exit
	fi
    else
	exit
    fi

# Save changes?
elif [[ $Action == 60 ]] ; then
    # Save
    echo ${ListArr[@]} > ~/bin/.websync
    exit
else
    zenity --error --text "~/bin/websync - Unknown button return code: $Action"
    exit
fi

done # End of while loop

IFS="$OLDIFS"

exit
```


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Summary

Hopefully this saves others lots of time getting their own record management system going using `bash` and `yad`. Of course more bullet proof and probably faster methods can be done using Python or C but that probably comes at the expense of more lines of code and higher learning curve.

At the end of the day this project is targeted at those that want to learn more about bash and what can be accomplished in a bash-only environment.

Perhaps AskUbuntu is the wrong forum for posting this and Stack Overflow or Unix & Linux forums might be better Stack Exchange candidates. I look forward to comments on that as I'm really not sure the best place.

Of course I always look forward to general comments and constructive criticisms as well :)

  [1]: https://i.stack.imgur.com/NjuE6.png
  [2]: https://i.stack.imgur.com/COzPz.png
  [3]: https://i.stack.imgur.com/Cmyuj.png


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a></div>

