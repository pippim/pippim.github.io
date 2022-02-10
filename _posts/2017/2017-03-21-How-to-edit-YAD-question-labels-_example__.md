---
layout:       post
title:        >
    How to edit YAD question labels (example)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/895471
type:         Answer
tags:         scripts zenity yad
created_date: 2017-03-21 23:11:34
edit_date:    2017-04-13 12:23:38
votes:        "2 "
favorites:    
views:        "2,499 "
accepted:     
uploaded:     2022-02-10 05:58:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-21-How-to-edit-YAD-question-labels-_example__.md
toc:          false
navigation:   false
clipboard:    true
---

I happened to write this a few days ago for a question of my own ([Bash template to use zenity (or yad) to insert / edit / delete records in a file or database][1]) and thought it was worth sharing:

[![websync 1][2]][2]

Notice the six buttons on the screen and how they are handled in the code below (sorry still a work in progress). An important note is when using custom buttons to always trap default return codes like 252 for Escape and Windows close (clicking X).

{% include copyHeader.html %}
``` 
while true ; do

Record=(`yad \
	--title "websync - Compare local scripts to those published on internet." --list \
        --text '<span foreground="blue" font="14">Toggle select next to file then click action button</span>' \
        --width=900 --height=600 --center --radiolist -separator="$IFS" --no-click \
        --button="Insert before":1 --button=Edit:2 --button=Delete:3 --button=Run:4 \
        --button="Cancel ALL":5 --button=Save:6 --search-column=3 \
        --column "Select" --column "Record number" --hide-column=2 --column "File Name" \
        --column "Status" --column " Website Address" \
        "${choices[@]}"`)
Action=$?

RecSelected=false
RecArr=()
i=0

# With radio list only one choice is possible
for Field in "${Record[@]}" ; do
    RecSelected=true
    RecArr[i]=$Field
# echo "RecArr $i ${RecArr[$i]}"
    ((i++))
done

echo "button: $Action"# 
# Note: When X closes window or Escape pressed 252 is returned.

# Insert before || or Edit ?
if [[ $Action == 1 ]] || [[ $Action == 2 ]] ; then
    RecArr[3]="New"
    # --text="Set fields and click OK to update" 
    # Note if there is a space at end of line, next line generates invalid command error from yad
    yad --width=600 --height=400 --title="Link file to Website Address" \
        --form --center \
        --field="Record Number":RO --field="File name":FL --field="Status":RO \
        --field="Website Address":TXT \
        ${RecArr[1]} ${RecArr[2]} ${RecArr[3]} ${RecArr[4]}
    ret=$?

    # Cancel =252, OK = 0
    if [[ $ret == 0 ]] ; then
        # Update array and renumber
        : # noop
    else
        continue # cancel changes.
    fi

elif [[ $Action == 3 ]] ; then
    : # Delete
elif [[ $Action == 4 ]] ; then
    : # Run
elif [[ $Action == 5 ]] || [[ $Action == 252 ]] ; then
    # Cancel ALL || or X the window or Escape
    exit
elif [[ $Action == 6 ]] ; then
    # Save
    exit
else
    zenity --error --text "~/bin/websync - Unknown button return code: $Action"
fi

done # End of while loop
```


  [1]: {% post_url /2017/2017-03-25-Bash-template-to-use-zenity-_or-yad_-to-insert-_-edit-_-delete-records-in-a-file-or-database %}
  [2]: https://i.stack.imgur.com/vAWT6.png
