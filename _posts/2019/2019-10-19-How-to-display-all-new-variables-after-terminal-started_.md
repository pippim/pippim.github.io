---
layout:       post
title:        >
    How to display all new variables after terminal started?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182025
type:         Answer
tags:         command-line bash environment-variables
created_date: 2019-10-19 01:45:34
edit_date:    2021-03-03 20:36:15
votes:        "2 "
favorites:    
views:        "1,138 "
accepted:     
uploaded:     2025-05-04 11:54:06
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-19-How-to-display-all-new-variables-after-terminal-started_.md
toc:          false
navigation:   false
clipboard:    false
---

`declare -p` will show you ALL the variables defined outside of environmental variables which will include what you are looking for but also 121 other variables you are not looking for.

The secret is to capture the default variables when `gnome-terminal` opens and subtract that from the list of current variables to display only the new variables.



## Using `listvar`

Instructions on creating the `listvar` function are below. To see how the `listvar` function works open a terminal and type:

``` bash
$ listvar

$ hey="Hey World :/"

$ listvar
declare -- hey="Hey World :/"

$ Word=Something

$ Number=25

$ Ubuntu=16.04

$ listvar
declare -- Number="25"
declare -- Ubuntu="16.04"
declare -- Word="Something"
declare -- hey="Hey World :/"
```

## Creating `listvar`

Add this to the end of your `~/.bashrc`:

``` bash
# Below must be at end of ~/.bashrc
# Display newly created variables
function listvar () {

    # Get current variable list
    mapfile -t CurrVars <<< "$(declare -p)"

    # Loop through each current variable
    for CurrVar in "${CurrVars[@]}" ; do

        # Skip over unwanted variables that are dynamic
        [[ "$CurrVar" == "declare -a BASH_"*    ]] && continue
        [[ "$CurrVar" == "declare -a FUNCNAME"* ]] && continue
        [[ "$CurrVar" == "declare -a PIPESTAT"* ]] && continue
        [[ "$CurrVar" == "declare -- _=\"\""*   ]] && continue
#        [[ "$CurrVar" == "declare -- sh="*      ]] && continue

        # Skip over variables used in our listvar function
        [[ "$CurrVar" == "declare -a SaveVar"*  ]] && continue
        [[ "$CurrVar" == "declare -- SaveVar"*  ]] && continue
        [[ "$CurrVar" == "declare -a CurrVar"*  ]] && continue
        [[ "$CurrVar" == "declare -- CurrVar"*  ]] && continue
        [[ "$CurrVar" == "declare -a OldVar"*   ]] && continue
        [[ "$CurrVar" == "declare -- OldVar"*   ]] && continue
        [[ "$CurrVar" == 'declare -- _="SaveV'* ]] && continue
        [[ "$CurrVar" == 'declare -- _="listv'* ]] && continue

        OldVar=false
        for SaveVar in "${SaveVars[@]}" ; do
            # Is current variable existing at time of save?
            [[ "$CurrVar" == "$SaveVar" ]]         && { OldVar=true ; break ; }
        done
        [[ $OldVar == false ]] && echo "$CurrVar"
    done

} # listvar


# Empty array to prevent doubling everytime ~/.bashrc is resourced
SaveVars=()
# Save variable list before user creates new ones in shell
mapfile -t SaveVars <<< "$(declare -p)"
```

Save your `~/.bashrc` file and open a new terminal session to use `listvar` function.
