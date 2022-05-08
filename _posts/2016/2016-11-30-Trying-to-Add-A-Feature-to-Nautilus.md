---
layout:       post
title:        >
    Trying to Add A Feature to Nautilus
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/855163
type:         Answer
tags:         nautilus
created_date: 2016-11-30 00:03:39
edit_date:    
votes:        "2 "
favorites:    
views:        "117 "
accepted:     
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-30-Trying-to-Add-A-Feature-to-Nautilus.md
toc:          false
navigation:   false
clipboard:    false
---

You don't need the source code so don't worry about downloading foo and patching it.

See Nautilus instructions for creating your own script here ([Help Ubuntu - Nautilus Scripts How to][1]). Basically you:

 - Navigate to the directory `~/.local/share/nautilus/scripts/`
 - Place your script (written in Bash, Perl or Python) there.
 - Mark the script as executable using Nautilus or from terminal with `chmod +x script_name`
 - Nautilus makes environmental variables available to your script: NAUTILUS_SCRIPT_SELECTED_FILE_PATHS, NAUTILUS_SCRIPT_SELECTED_URIS, NAUTILUS_SCRIPT_CURRENT_URI, and NAUTILUS_SCRIPT_WINDOW_GEOMETRY

There are sample scripts located at ([Help Ubuntu - Nautilus Sample Scripts][2]) for e-mailing files, mounting an ISO file, setting files to read only, editing file with gedit ROOT priviledges, opening terminal at current location, etc.

Look through the scripts and take one as a template for encrypting files using right-click.

  [1]: https://help.ubuntu.com/community/NautilusScriptsHowto
  [2]: https://help.ubuntu.com/community/NautilusScriptsHowto/SampleScripts
