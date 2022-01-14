---
layout:       post
title:        >
    Code version control between local files and AU answers
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/900609
type:         Answer
tags:         bash gui yad
created_date: 2017-04-05 23:40:24
edit_date:    2018-06-11 23:25:22
votes:        "4 "
favorites:    
views:        "403 "
accepted:     
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-04-05-Code-version-control-between-local-files-and-AU-answers.md
toc:          false
navigation:   false
clipboard:    true
---

## `websync` script



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: websync

# Must have the yad package.
command -v yad >/dev/null 2>&1 || { echo >&2 \ 
  "yad package required but it is not installed.  Aborting."; \
  exit 99; }

RenumberListArr () {

IFS='|'
  
ListArrCnt=${#ListArr[@]}

i=1 # First array element (0) is "false", followed by record number element (1)
j=1 # All Record numbers count starting at 1

while [ $i -lt $ListArrCnt ] ; do
    ListArr[$i]=$j
    j=$(($j + 1))
    i=$(($i + $RecArrCnt))
done

} # RenumberListArr ()

ColSelect=0
ColRecNo=1
ColFileDate=2
ColFileName=3
ColStatus=4Address
ColAnsDate=5
ColA_Votes=5
ColWebAddr=6
ColQ_Votes=7
ColTitle=8

NewFileDate=0
NewFileName=1
NewStatus=2
NewAnsDate=3
NewA_Votes=3
NewWebAddr=4
NewQ_Votes=5
NewTitle=6

LineOut=""
HTMLtoText () {
    LineOut=$1  # Parm 1= Input line
    LineOut="${LineOut//&amp;/&}"
    LineOut="${LineOut//&lt;/<}"
    LineOut="${LineOut//&gt;/>}"
    LineOut="${LineOut//&quot;/'"'}"
    LineOut="${LineOut//&#39;/"'"}"
    LineOut="${LineOut//&ldquo;/'"'}"
    LineOut="${LineOut//&rdquo;/'"'}"
} # HTMLtoText ()


Ampersand=$'\046'
Equals="================================================================================="
Dashes="---------------------------------------------------------------------------------"
AnswerID=""
PercentFile="/tmp/websync-percent" # Temp file used for progress bar percentage

UpdateEntry () {

# PARM: 1=ONE display msgs, else file name for messages.

if [[ $1 == "ONE" ]] ; then
    bDisplayMsgs=true
    MsgFileName=""  # In case a single update follows all update
else
    bDisplayMsgs=false
    MsgFileName="$1"
fi

local BarNo="2"

# $RecArr[@] must be populated

# Searches in order they are found in an answer
SearchTitle=true
FoundTitle=false
SearchQ_Vote=true
FoundQ_Vote=false
SearchA_Vote=true
FoundA_Vote=false
FoundLine1=false
FoundLine2=false
FoundLine3=false
EndOfFile=false
AnswerWritten=false

AnswerID=$(echo ${RecArr[$ColWebAddr]} | rev | cut -d# -f1 | rev)

# Get file modified date in human readable format using STAT
RecArr[$ColFileDate]=$(stat "${RecArr[$ColFileName]}" | \
        grep "Modify:"| cut -f2 -d" ")

HoldIFS="$IFS"
IFS=$'\n'       # make newlines the only separator

AnswerSize=$(stat -c%s "/tmp/$AnswerID")

# If answer size less < 1000 then wget failed.
if [[ $AnswerSize -lt 1000 ]] ; then
    yad --error --center \
    --text="wget failed to download answer from Stack Exchange."
    RecArr[$ColA_Status]="Answer < 1K"
    IFS="$HoldIFS"
    return 1
fi

FirstThreeLines=()

FirstThreeLines=( $(head -n10 ${RecArr[$ColFileName]}) )

AnswerLines=0
AllLinesSize=0
LastPercent=0
fPrintNextLine=false # Use this for tracing HTML and displaying Line

echo $BarNo:0 > "$PercentFile" # Just in case last time temp file wasn't removed

fEOFskip=false

while IFS= read -r Line; do

AnswerLines=$(( ++AnswerLines ))
AllLinesSize=$(( $AllLinesSize+${#Line} ))

if [[ $Line == *"$Ampersand""lt;/code$Ampersand""gt;"* ]] ; then
    # Answer contains </code> in text section, it's a fake End of Code tag.
    fEOFskip=true
else
    fEOFskip=false
fi

# Convert HTML codes to normal characters

HTMLtoText $Line
Line="$LineOut"

Percent=$(( $AllLinesSize * 100 / $AnswerSize ))
if [[ "$Percent" -ne "$LastPercent" ]] ; then
    LastPercent=$Percent
    # Send percentage via working file to spawned process with yad progress bar
    echo $BarNo:$Percent > "$PercentFile"
fi

if [ $fPrintNextLine = true ] ; then
    echo "Line at start: $Line"
fi

# Parse Line: </script>	<dev id="question-header">

if [ $SearchTitle = true ] ; then
    if [[ $Line == *"<div id=\"question-header\">"* ]] ; then SearchTitle=false ; fi
    continue
fi

if [ $SearchTitle = false ] && [ $FoundTitle = false ] ; then
    if [[ $Line == *"<h1 itemprop=\"name\""* ]] ; then
        FoundTitle=true
        Title=$(cut -d ">" -f 3 <<< "$Line")
        Title=$(cut -d "<" -f 1 <<< "$Title")
        HTMLtoText $Title
        RecArr[$ColTitle]="$LineOut"
    fi
    continue
fi
                
if [ $SearchQ_Vote = true ] ; then
    if [[ $Line == *"<div class=\"question\""* ]] ; then SearchQ_Vote=false ; fi
    continue
fi

if [ $SearchQ_Vote = false ] && [ $FoundQ_Vote = false ] ; then
    if [[ $Line == *"<span itemprop=\"upvoteCount\""* ]] ; then
        FoundQ_Vote=true
        QuestionVotes=$(cut -d ">" -f 2 <<< "$Line")
        QuestionVotes=$(cut -d "<" -f 1 <<< "$QuestionVotes")
        RecArr[$ColQ_Votes]=$QuestionVotes
    fi
    continue
fi

# Parse lines: <a name="894470"></a>
# <div id="answer-894470" class="answer" data-answerid="894470"  itemscope
#  itemtype="http://schema.org/Answer">

if [ $SearchA_Vote = true ] ; then
    if [[ $Line == *"<div id=\"answer-$AnswerID\""* ]]; then SearchA_Vote=false ; fi
    continue
fi

if [ $SearchA_Vote = false ] && [ $FoundA_Vote = false ] ; then
    if [[ $Line == *"span itemprop=\"upvoteCount\""* ]] ; then
        FoundA_Vote=true
        # We don't have array entries setup yet so store in working variable
        AnswerVotes=$(cut -d ">" -f 2 <<< "$Line")
        AnswerVotes=$(cut -d "<" -f 1 <<< "$AnswerVotes")
        RecArr[$ColA_Votes]=$AnswerVotes
    fi
    continue
fi

if [ $FoundLine1 = false ] ; then
    if [[ $Line == *"${FirstThreeLines[0]}"* ]] ; then # May have <code> prefix
        FoundLine1=true
        # Create file with first line taken from "clean" bash array
        echo "${FirstThreeLines[0]}" > /tmp/websync-webfile
    fi
    continue
fi

if [ $FoundLine1 = true ] && [ $FoundLine2 = false ]; then
    # Empty lines aren't in our array so skip test if in web file
    if [[ $Line == "" ]] ; then 
        echo "$Line" >> /tmp/websync-webfile # Append empty line
        continue
    fi
    if [[ $Line == "${FirstThreeLines[1]}" ]] ; then # Line 2 match exactly?
        FoundLine2=true
        echo "$Line" >> /tmp/websync-webfile # Append second line
    else
        # Line 2 doesn't match so force search to restart at line 1
        FoundLine1=false
    fi
    continue
fi

if [ $FoundLine2 = true ] && [ $FoundLine3 = false ]; then
    # Empty lines aren't in our array so skip test if in web file
    if [[ $Line == "" ]] ; then 
        echo "$Line" >> /tmp/websync-webfile # Append empty line
        continue
    fi
    if [[ $Line == "${FirstThreeLines[2]}" ]] ; then # Line 3 match exactly?
        FoundLine3=true
        echo "${FirstThreeLines[2]}" >> /tmp/websync-webfile # Append third line
    else
        # Line 3 doesn't match so force search to restart at line 1
        FoundLine1=false
        FoundLine2=false
    fi
    continue
fi

# We are only here when first three code lines have matched up in Stack Exchange.
if [ $EndOfFile = false ] ; then
    if [[ $Line == *"</code>"* ]] && [[ $fEOFskip == false ]] ; then
        EndOfFile=true
    else
        echo "$Line" >> /tmp/websync-webfile
    fi
fi

if [ $fPrintNextLine = true ] ; then
    echo "Line at end: $Line"
    fPrintNextLine=false
elif [[ $Line == *"---- ENTER SEARCH STRING HERE ----"* ]] ; then
    fPrintNextLine=true
fi

done < "/tmp/$AnswerID"

echo $BarNo:100 > "$PercentFile" # force spawned yad progress bar to close

if [[ ! -f "${RecArr[$ColFileName]}" ]] ; then   # File exists?
    yad --error --center --text "${RecArr[$ColFileName]} does not exist."
    RecArr[$ColStatus]="Bad File"
elif [[ ! -s "${RecArr[$ColFileName]}" ]] ; then  # File not empty?
    yad --error --center --text "${RecArr[$ColFileName]} is empty."
    RecArr[$ColStatus]="Empty File"
fi

if [ $FoundLine1 = true ] && [ $FoundLine2 = true ] && [ $FoundLine3 = true ]; then
    FileDiff="/tmp/websync-diff-"$(date +%s)
    if [[ "$MsgFileName" != "" ]] ; then
        echo $Equals >> $MsgFileName
    fi
    diff --unified=2 -w -b -B -I --suppress-blank-empty \
        --ignore-tab-expansion --suppress-common-lines --ignore-all-space \
        ${RecArr[$ColFileName]} /tmp/websync-webfile > $FileDiff

    # If file doesn't exist, errors in diff parameters
    # If file size =0 there were no differences
    if [[ -f $FileDiff ]] ; then
        if [[ -s $FileDiff ]] ; then
            if [[ $bDisplayMsgs == true ]] ; then
                # File not empty.
                gedit $FileDiff
            else
                cat $FileDiff >> $MsgFileName
            fi
            RecArr[$ColStatus]="Different"
        else
            if [[ $bDisplayMsgs == true ]] ; then
                yad --info --center --text \
                    "Code in ${RecArr[$ColFileName]} matches on Stack Exchange."
            else
                echo "Code in ${RecArr[$ColFileName]} matches on Stack Exchange." \
                     >> $MsgFileName
                echo $Dashes >> $MsgFileName
            fi
            RecArr[$ColStatus]="Matches"
        fi
    else
        yad --error --center --text "websync - Error in `diff` parameters."
        RecArr[$ColStatus]="Diff Parameter Error"
    fi
else
    if [[ $bDisplayMsgs == true ]] ; then
        yad --error --center --text \
        "First three lines of ${RecArr[$ColFileName]} not found on Stack Exchange."
    else
        echo $Equals >> $MsgFileName
        echo "First three lines of ${RecArr[$ColFileName]} not found on Stack Exchange." \
             >> $MsgFileName
        echo $Dashes >> $MsgFileName
    fi
    RecArr[$ColStatus]="3 lines not found"
fi

IFS="$HoldIFS"

# Remove Work files
rm "/tmp/$AnswerID"
rm /tmp/websync-webfile
rm "$PercentFile"
rm "$FileDiff"

return 0

} # UpdateEntry ()


UpdateOne () {

# $RecArr[@] must be populated

# $1= ONE or $MsgFileName
# $2= Bar 1
# Download stack exchange answer 
AnswerID=$(echo ${RecArr[$ColWebAddr]} | rev | cut -d# -f1 | rev) # Answer# for file name

local BarNo="1"
echo "$BarNo:10"    > "$PercentFile" # Zero percent complete
echo "$BarNo:#Downloading with wget." > "$PercentFile"

wget -O- "${RecArr[$ColWebAddr]}" > "/tmp/$AnswerID"
if [[ "$?" -ne 0 ]]               # check return code for errors
  then
    # Sometimes a second attempt is required. Not sure why.
    wget -O- "${RecArr[$ColWebAddr]}" > "/tmp/$AnswerID"
fi
if [[ "$?" == 0 ]]               # check return code for errors
  then
      echo "$BarNo:100" > "$PercentFile"
      echo "$BarNo:#Download completed." > "$PercentFile"
  else
      echo "$BarNo:100" > "$PercentFile"
      echo "$BarNo:#Download error." > "$PercentFile"
      echo "ERROR: $AnswerID" >> ~/websync.log
      return 1
fi

UpdateEntry $1
ret=$?
if [[ $ret != 0 ]] ; then
    # We weren't able to anayze SE answer -- too small
    return 1
fi

((TransCount++))            # Update count of changes

# Update array entry
let i=1
while [[ $i -lt $ListArrCnt ]] ; do
    if [[ ${ListArr[i]} == ${RecArr[1]} ]] ; then
	    # We have matching record number
	    ListArr[++i]="${RecArr[$ColFileDate]}"
	    ListArr[++i]="${RecArr[$ColFileName]}" # File name should never change
	    ListArr[++i]="${RecArr[$ColStatus]}"
	    ListArr[++i]="${RecArr[$ColA_Votes]}"
	    ListArr[++i]="${RecArr[$ColWebAddr]}"
	    ListArr[++i]="${RecArr[$ColQ_Votes]}"
	    ListArr[++i]="${RecArr[$ColTitle]}"
	    let i=$(($ListArrCnt + 1)) # force exit from while loop
    else
        let i=$(($i + $RecArrCnt)) # Check next entry
    fi
done

return 0

} # UpdateOne ()


RecSelected=true # Overrides are below
UpdateAllOrOne () {

TITLE="websync"                             # dialog title
TEXT="<b>Update Entry</b> ${RecArr[$ColFileName]}"     # dialog text
ICON="emblem-downloads"                     # window icon (appears in launcher)
IMAGE="browser-download"                    # window image (appears in dialog)

# Process a single entry
if [[ $RecSelected == true ]] ; then

    echo "2:0" > "$PercentFile" # Just in case last time temp file wasn't removed

    # Repurpose yad progress bar as wget information message.
    CurrentEntry="${RecArr[$ColFileName]}"
    ( spawn-progress-multi $PercentFile \
        '--multi-progress --center --auto-close --skip-taskbar --title "websync" --text "Update Entry $CurrentEntry" --window-icon $ICON --image $IMAGE --fixed --width=600 --height=200 --watch-bar2 --bar=Downloading:NORM --bar=Analyzing:NORM' \
         2 & )

    UpdateOne ONE

    echo "2:100" > "$PercentFile" # Force progress display to shut down

    return $?
fi

MsgFileName="/tmp/websync-diff-"$(date +%s)
echo "--- /Prefix for files on local drive" > $MsgFileName
echo "+++ /Prefix for code in Stack Exchange answers" >> $MsgFileName

echo "3:0" > "$PercentFile" # Just in case last time temp file wasn't removed

# Repurpose yad progress bar as wget information message.
CurrentEntry="${RecArr[$ColFileName]}"
( spawn-progress-multi $PercentFile \
    "--multi-progress --center --auto-close --skip-taskbar --title "websync" --text `"`Update All Entries `"` --window-icon $ICON --image $IMAGE --fixed --width=1000 --height=200 --watch-bar3 --bar=Downloading:NORM --bar=Analyzing:NORM --bar=`"`Entry progress`"`:NORM" \
         3 & )

# Process all Entries
local let k=0
RecArr[0]=false
EndLoop=$(( ListArrCnt - 1 ))
while [ $k -lt $EndLoop ] ; do
    let i=k
    RecArr[$ColRecNo]="${ListArr[++i]}"
    RecArr[$ColFileDate]="${ListArr[++i]}"
    RecArr[$ColFileName]="${ListArr[++i]}"
    RecArr[$ColStatus]="${ListArr[++i]}"
    RecArr[$ColA_Votes]="${ListArr[++i]}"
    RecArr[$ColWebAddr]="${ListArr[++i]}"
    RecArr[$ColQ_Votes]="${ListArr[++i]}"
    RecArr[$ColTitle]="${ListArr[++i]}"

    echo "2:0" > "$PercentFile"
    echo "3:"$(( $k*100/$ListArrCnt )) > "$PercentFile"
    echo "3:#""${RecArr[$ColFileName]}" > "$PercentFile"

    UpdateOne "$MsgFileName"
    [[ "$?" != "0" ]] && return "$?" ; # clicked close on progress dialog or wget error
    
    let k=$(($k + $RecArrCnt)) # next entry
    if [ $k -ge $EndLoop ] ; then
        echo "3:100" > "$PercentFile"
    fi
done

# If file doesn't exist, errors in diff parameters
# If file size =0 there were no differences
if [[ -f $MsgFileName ]] && [[ -s $MsgFileName ]] ; then
    gedit $MsgFileName
fi

return 0

} # UpdateAllOrOne ()


ExternalSortArray () {

# Called on Save
cp --preserve ~/.websync ~/.websync~ #Make backup copy

IFS="|" read -ra ListArr < ~/.websync
ListArrCnt=${#ListArr[@]}
# echo "ListArrCnt: $ListArrCnt"

# Can't sort empty file or array with 1 entry
[[ $ListArrCnt -lt $(( $RecArrCnt + 1 )) ]] && return 0;

# Create Keys Index
echo " "
echo "1. Create Keys-Index Pairs File"
> ~/.websyncSort    # Empty existing file.

time for (( i=0; i<$ListArrCnt; i=i+$RecArrCnt )) ; do
    # Sort key = Question Title + Local File Name
    CurrKey="${ListArr[$(( $i + $ColTitle))]}${ListArr[$(( $i + $ColFileName))]//[^[:alnum:]\/]/}"
    echo "$CurrKey|$i" >> ~/.websyncSort
done

# Call external sort program
echo " "
echo "2. Sort Keys-Index Pairs File"
time sort -k1 -t"|" ~/.websyncSort -o ~/.websyncSort
# cat ~/.websyncSort

# Strip out keys
echo " "
echo "3. Strip out keys leaving Sorted Indices"
time cut -f2 -d '|' ~/.websyncSort > ~/.websyncNdx
# cat ~/.websyncNdx

echo " "
echo "4. Rewrite List Array by Sorted Index"
> ~/.websync    # Empty existing ListArr[] file.
RecNo=1         # Sequential record number

Second=""
time while read -r line; do 
    j=$(( $line + $RecArrCnt ))
    FldNdx=0
    for (( i=$line; i<j; i++ )); do
        LastChar="${ListArr[i]}"
        if [[ $FldNdx == $ColRecNo ]] ; then
            echo -n "$Second""$RecNo"    >> ~/.websync
            RecNo=$(( $RecNo + 1 ))
        else
            echo -n "$Second""$LastChar" >> ~/.websync
        fi
        Second="|"
        FldNdx=$(( $FldNdx + 1 ))

        # Update progress display
    done
done < ~/.websyncNdx

echo " "
printf "* * *  ExternalSortArray -- "
echo " Total elements: $ListArrCnt  * * *"

} ### ExternalSortArray ()

OldIFS="$IFS"
IFS="|"
ListArr=()

IFS="|" read -ra ListArr < ~/.websync

# Define variables for easy reading and fewer code line changes when expanding
RecArrCnt=9
ListArrCnt=${#ListArr[@]}

if [[ $ListArrCnt -lt $RecArrCnt ]] ; then
    # Handle empty file: Create dummy entries.
    ListArr+=("false" "1" "Update" "/boot/grub/grub.cfg" "Different" "Update")
    ListArr+=("http://askubuntu.com/questions/142293/different-grub-files-to-edit/142295#142295")
    ListArr+=("Update" "Dummy question.")
    ListArr+=("false" "2" "Update" "$HOME/.bashrc" "Different" "Update")
    ListArr+=("http://askubuntu.com/questions/820684/how-do-i-fix-the-terminal/820709#820709")
    ListArr+=("Update" "Dummy question.")
    ListArrCnt=${#ListArr[@]}
fi

TransCount=0 # Number of Inserts, Edits and Deletes

ButnView=10
ButnInsert=20
ButnEdit=30
ButnDelete=40
ButnUpdate=50
ButnCancel=60
ButnSave=80

while true ; do

if [[ $TransCount -eq 0 ]] ; then
    VariableCloseText="_Close"
else
    VariableCloseText="_Cancel ALL"
fi

# adjust width & height below for your screen 1600x800 default for 1920x1080 HD
# screen and adjust font="14" below if blue title text is too small or too large.

Record=(`yad --list --separator="|" --skip-taskbar \
    --title="websync - Compare code to answer posted on Stack Exchange." \
    --text="Click column heading to sort.\
    Select an entry before clicking: View / Insert / Edit / Delete / Update" \
    --width=1600 --height=800 --center --radiolist --grid-lines=both --no-markup \
    --button="_View":$ButnView     --button="_Insert before":$ButnInsert \
    --button="_Edit":$ButnEdit     --button="_Delete":$ButnDelete \
    --button="_Update":$ButnUpdate --button="$VariableCloseText":$ButnCancel \
    --button="_Save":$ButnSave \
    --search-column=3        --column "Select"       --column "Record Number":HD \
    --column "File Date":HD  --column "File Name":FL --column "Status" \
    --column "A+"            --column "Stack Exchange":HD \
    --column "Q+"            --column "Question Title" \
    "${ListArr[@]}"`)
Action=$?

RecSelected=false
RecArr=()
i=0

for Field in "${Record[@]}" ; do
    RecSelected=true
    RecArr[i++]=$Field
done

# Error checking
if [[ $Action == $ButnView ]] || [[ $Action == $ButnInsert ]] || [[ $Action == $ButnEdit ]] \
|| [[ $Action == $ButnDelete ]] ; then
    if [[ $RecSelected == false ]] ; then
	yad --error --text 'You must select a record before clicking: View / Insert / Edit / Delete.' --center
   	continue
    fi
fi

# Insert before || or Edit ?
if [ $Action == $ButnInsert ] || [ $Action == $ButnEdit ] ; then

    # After changing file name or Stack Exchange Address these must be updated.
    RecArr[$ColFileDate]="Update"
    RecArr[$ColStatus]="Update"
    RecArr[$ColA_Votes]="Update"
    RecArr[$ColQ_Votes]="Update"
    RecArr[$ColTitle]="Update"
    # --text="Set fields and click OK to update" 
    # Note a space after \ generates invalid command error from yad
    NewRecArr=(`yad --form --width=900 --height=400 --center --skip-taskbar \
        --title="Select a file name and link it to Stack Exchange" \
        --text="Click OK to save. Click Cancel or press Escape to discard changes." \
        --field="File date":RO  --field="File name":FL  --field="Status":RO \
        --field="Answer +":RO   --field="Stack Exchange Address":TXT \
        --field="Question +":RO --field="Question Title":RO \
        ${RecArr[$ColFileDate]} ${RecArr[$ColFileName]} ${RecArr[$ColStatus]} \
        ${RecArr[$ColA_Votes]}  ${RecArr[$ColWebAddr]} \
        ${RecArr[$ColQ_Votes]}  ${RecArr[$ColTitle]}`)
    ret=$?

    # Cancel =252, OK = 0
    # OK & Insert operation?
    if [[ $ret == 0 ]] && [[ $Action == $ButnInsert ]]; then
        # Create new list entry and renumber
	    ((TransCount++)) # Update number of changes
    	let i=1		 # Base 0 array, record number is second field

	    while [ $i -lt $ListArrCnt ] ; do
	        if [ ${ListArr[$i]} -eq ${RecArr[$ColRecNo]} ]; then
		        # We have matching record number to insert before
  	            NewArr+=( false )               # Selected
  	            NewArr+=( "${RecArr[$ColRecNo]}" ) # Will be renumbered
  	            NewArr+=( "${NewRecArr[$NewFileDate]}" )
  	            NewArr+=( "${NewRecArr[$NewFileName]}" )
           	    NewArr+=( "${NewRecArr[$NewStatus]}" )
  	            NewArr+=( "${NewRecArr[$NewA_Votes]}" )
  	            NewArr+=( "${NewRecArr[$NewWebAddr]}" )
  	            NewArr+=( "${NewRecArr[$NewQ_Votes]}" )
  	            NewArr+=( "${NewRecArr[$NewTitle]}" )
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
    elif [[ $ret == 0 ]] && [[ $Action == $ButnEdit ]]; then
        # Update array entry
	    ((TransCount++))
    	let i=1
	    while [ $i -lt $ListArrCnt ] ; do
	        if [ ${ListArr[$i]} -eq ${RecArr[1]} ]; then
			    # We have matching record number
			    ListArr[++i]="${NewRecArr[$NewFileDate]}"
			    ListArr[++i]="${NewRecArr[$NewFileName]}"
			    ListArr[++i]="${NewRecArr[$NewStatus]}"
			    ListArr[++i]="${NewRecArr[$NewA_Votes]}"
			    ListArr[++i]="${NewRecArr[$NewWebAddr]}"
			    ListArr[++i]="${NewRecArr[$NewQ_Votes]}"
			    ListArr[++i]="${NewRecArr[$NewTitle]}"
			    let i=$(($ListArrCnt + 1)) # force exit from while loop
	        else
		        let i=$(($i + $RecArrCnt)) # Check next entry
	        fi
	    done
    else
        : # noop for readibility: Cancel or Escape pressed in Insert / Edit window
    fi

# View or Delete record?
elif [[ $Action == $ButnView ]] || [[ $Action == $ButnDelete ]] ; then

    # Note if there is a space after "\", the next line generates
    # "invalid command" error message from yad.
    if [[ $Action == $ButnDelete ]] ; then
        YadTitle="Do you really want to delete this entry?"
        YadText="Click OK to confirm delete."
    else
        YadTitle="websync - Single entry view mode"
        YadText="Click any button or press Escape after viewing entry."
    fi

    yad --width=900 --height=600 --form --center --skip-taskbar \
        --title="$YadTitle"      --text="$YadText" \
        --field="File date":RO   --field="File name":TXT --field="Status":RO \
        --field="Answer +":RO    --field="Stack Exchange Address":TXT \
        --field="Question +":RO  --field="Question Title":TXT \
        ${RecArr[$ColFileDate]} ${RecArr[$ColFileName]} ${RecArr[$ColStatus]} \
        ${RecArr[$ColA_Votes]}  ${RecArr[$ColWebAddr]}  ${RecArr[$ColQ_Votes]} \
        ${RecArr[$ColTitle]}
    ret=$?
 
    if [[ $Action == $ButnView ]] ; then
        continue
    fi
 
    # Cancel =252, OK = 0
    if [[ $ret == 0 ]] && [[ $Action == $ButnDelete ]] ; then
        # Delete record from list array and renumber
	    ((TransCount++))
    	let i=1
	    while [ $i -lt $ListArrCnt ] ; do
	        if [ ${ListArr[$i]} -eq ${RecArr[$ColRecNo]} ]; then
		        # We have matching record number to delete
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
        : # cancel delete operation.
    fi

# Run update process?
elif [[ $Action == $ButnUpdate ]] ; then
    time UpdateAllOrOne
    ret=$?
   
# Cancel all changes or "252"= X the window or Escape?
elif [[ $Action == $ButnCancel ]] || [[ $Action == 252 ]] ; then
    if [[ $TransCount -gt 0 ]] ; then
        (`yad --image "dialog-question" --title "websync - Exit confirmation." \
        --text="You have made $TransCount change(s). Do you really want to exit?" \
        --button=_Stay:1 --button=_Exit:2 --center`)

        if [[ $? -eq 2 ]] ; then
            exit
	    fi
    else
	    exit
    fi

# Save changes?
elif [[ $Action == $ButnSave ]] ; then
    # Save
    echo "${ListArr[*]}" > ~/.websync # Using * instead of @ preserves |
    ExternalSortArray
    exit
else
    yad --error --center --text "websync - Unknown button return code: $Action"
    exit
fi

done

IFS="$OldIFS"

exit

```

## `spawn-progress-multi` script

***If you don't put `spawn-progress-multi` file in your path websync will not be able to run it***

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: spawn-progress-multi

Percent=0

MYNAME=$0
/usr/bin/logger $MYNAME "multi-progress FIFO named pipe: $1"
val="$2"
/usr/bin/logger $MYNAME "multi-progress yad parameters: $2"
/usr/bin/logger $MYNAME "multi-progress bar number to watch: $3"
  
while true ; do # loop until 100 %

    # Percent=$(cat "$1")
    [[ -f "$1" ]] && read -r Percent < "$1"
    echo "$Percent"
    if [[ $Percent == *"$3:100"* ]] ; then break ; fi ;

done | yad $2

exit 0

```
