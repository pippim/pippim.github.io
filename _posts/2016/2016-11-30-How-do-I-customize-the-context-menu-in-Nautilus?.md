---
layout:       post
title:        >
    How do I customize the context menu in Nautilus?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/855198
type:         Answer
tags:         nautilus
created_date: 2016-11-30 02:12:06
edit_date:    2021-06-11 11:07:00
votes:        "5 "
favorites:    
views:        "46,494 "
accepted:     
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    false
---

**November 29, 2016 era** Ubuntu 14.04, 16.04 and 16.10 plus earlier versions.

See Nautilus instructions for creating your own script here ([Help Ubuntu - Nautilus Scripts How to][1]). Basically you:

 - Navigate to the directory `~/.local/share/nautilus/scripts/`
 - Place your script (written in Bash, Perl or Python) there.
 - Mark the script as executable using Nautilus or from terminal with `chmod +x script_name`
 - Nautilus makes environmental variables available to your script: `NAUTILUS_SCRIPT_SELECTED_FILE_PATHS`, `NAUTILUS_SCRIPT_SELECTED_URIS`, `NAUTILUS_SCRIPT_CURRENT_URI`, and `NAUTILUS_SCRIPT_WINDOW_GEOMETRY`

There are sample scripts located at ([Help Ubuntu - Nautilus Sample Scripts][2]) for e-mailing files, mounting an ISO file, setting files to read only, editing file with gedit ROOT priviledges, opening terminal at current location, etc.

Look through the scripts and take one as a template for encrypting files, uploading to the cloud, compressing to backup or whatever you need to do.

  [1]: https://help.ubuntu.com/community/NautilusScriptsHowto
  [2]: https://help.ubuntu.com/community/NautilusScriptsHowto/SampleScripts
