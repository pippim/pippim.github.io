---
layout:       post
title:        >
    Adding new sudo insults
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1188898
type:         Answer
tags:         sudo
created_date: !!str "2019-11-15 01:01:04"
edit_date:    !!str ""
votes:        !!str "4"
favorites:    
views:        !!str "857"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    true
---

You can add new insults only by replacing existing insults of equal or greater length.

<!-- Language-all: lang-bash -->

From the second answer in your link are these phrases:

> ### ins_2001.h (2001 Space Odyssey insults):  
>   
>     /*  
>      * HAL insults (paraphrased) from 2001.  
>      */  
>   
>     "Just what do you think you're doing Dave?",  
>     "It can only be attributed to human error.",  

## Find the file

``` 
$ grepall "Just what do you think you're doing Dave?"
Binary file /usr/lib/sudo/sudoers.so matches

```

OK we now know the file name. That was the easy part.

## Backup the file

First make a backup (because we always remember to do that right?):

``` 
$ sudo cp -a /usr/lib/sudo/sudoers{.so,.so.bak}

$ ll /usr/lib/sudo/sudoers{.so,.so.bak}
-rw-r--r-- 1 root root 316768 Oct 11 06:01 /usr/lib/sudo/sudoers.so
-rw-r--r-- 1 root root 316768 Oct 11 06:01 /usr/lib/sudo/sudoers.so.bak

```

## Make the script

Then make our script called `sudoinsults`:

{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: sudoinsult
# PATH: $HOME/askubuntu/
# DESC: For: https://askubuntu.com/questions/1188779/adding-new-sudo-insults
# DATE: November 14, 2019.

# NOTE: Change sudo insults to personal favorites

# Build array of insults from disk
IFS=$'\n' Arr=( $(cat sudoinsult.txt) )

# Initialize variables
File="/usr/lib/sudo/sudoers.so"
upper=0
Spaces="                                                                     "
Spaces="$Spaces""                                                            "

[[ ${#Arr[@]} -gt 0 ]] && upper=$(( ${#Arr[@]} - 1 ))
[[ $upper -gt 0 ]] && for (( i=0; i<upper; i=i+2 )) ; do
    Search="${Arr[i]}"      # Move array indices to named variables
    Replace="${Arr[i+1]}"   #  for a simpler life.

    printf "Replacing: '%s'\n     With: '%s'\n" "$Search" "$Replace"
    if [[ "${#Search}" -lt "${#Replace}" ]] ; then
        echo "Replacement can't be longer than original"
        continue
    elif [[ "${#Search}" -lt 8 ]] ; then
        echo "Original insult cannot be less than 8 characters"
        continue
    elif [[ "${#Search}" -gt "${#Spaces}" ]] ; then
        echo "Original insult cannot be longer than ${#Spaces} characters"
        continue
    elif [[ "${#Replace}" -lt 1 ]] ; then
        echo "Replacement insult cannot be less than 1 character"
        continue
    elif ! grep "$Search" "$File" >/dev/null ; then
        echo "Search insult not found in $File"
        continue
    fi

    # Pad replacement with spaces as needed.
    ReplaceS="$Replace${Spaces:0:$((${#Search} - ${#Replace}))}"
    [[ "${#ReplaceS}" -ne "${#Search}" ]] && \
        { echo Internal error ReplaceS different length than Search; exit; }

# Looks wrong: https://unix.stackexchange.com/a/354493/200094
#y="${y:0:40}${forty:0:$((40 - ${#y}))}"
#echo "'${y}'"
    sed -i "s/$Search/$ReplaceS/" "$File"
    (( InsultCount++ ))
    
done

if [[ $upper -gt 0 ]] ; then
    echo "$InsultCount Insults replaced."
else
    echo "Insult file (sudoinsult.txt) does not exist or only has one line." >2
fi

```

## Create the datafile

Hopefully no need to explain how to create a text file (hint: `gedit`)

``` 
$ cat sudoinsult.txt

```

``` 
Just what do you think you're doing Dave?
Just what do you think you're doing Rick?
It can only be attributed to human error.
It can only be attributed to the beer.

```

## Run the script and check results

``` 
$ sudo ./sudoinsult

```

``` 
Replacing: 'Just what do you think you're doing Dave?'
     With: 'Just what do you think you're doing Rick?'
Replacing: 'It can only be attributed to human error.'
     With: 'It can only be attributed to the beer.'
2 Insults replaced.

```

``` 
$ ll /usr/lib/sudo/sudoers{.so,.so.bak}

-rw-r--r-- 1 root root 316768 Nov 14 17:43 /usr/lib/sudo/sudoers.so
-rw-r--r-- 1 root root 316768 Oct 11 06:01 /usr/lib/sudo/sudoers.so.bak

```

``` 
$ grep "Just what do you think you're doing Rick?" /usr/lib/sudo/sudoers.so

```

``` 
Binary file /usr/lib/sudo/sudoers.so matches

```

``` 
$ grep "It can only be attributed to the beer." /usr/lib/sudo/sudoers.so

```

``` 
Binary file /usr/lib/sudo/sudoers.so matches

```


