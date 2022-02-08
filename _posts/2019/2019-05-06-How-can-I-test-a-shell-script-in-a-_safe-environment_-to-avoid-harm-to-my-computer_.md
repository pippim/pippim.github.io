---
layout:       post
title:        >
    How can I test a shell script in a "safe environment" to avoid harm to my computer?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1141067
type:         Answer
tags:         scripts testing safely
created_date: 2019-05-06 21:52:11
edit_date:    2020-06-12 14:37:07
votes:        "11 "
favorites:    
views:        "7,687 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-06-How-can-I-test-a-shell-script-in-a-_safe-environment_-to-avoid-harm-to-my-computer_.md
toc:          false
navigation:   false
clipboard:    true
---

## As the school you are attending has published the scripts, the best place to voice your concerns is with your instructors.

That said we can help you decipher the code on a line by line basis. It is probably impractical for anyone here to analyze **all** the code.

You actually have 40 bash scripts with a total 5,360 lines. I've combined them together and looked for bash/shell commands that could be abused. ***They all appear to be used normally***:

{% include copyHeader.html %}
``` 
$ cat /tmp/sshellcheck.mrg | grep " rm "

      rm -rf "$RETURNPATH"/tmp/*
      rm -f "$RETURNPATH"/.mynorminette
    rm -f $LOGFILENAME
    rm -f $LOGFILENAME
      rm -f .mymoulitest
        rm -f "${RETURNPATH}/tmp/${FILEN}"

$ cat /tmp/sshellcheck.mrg | grep -i kill

  function check_kill_by_name
          kill $PROCESSID0
  declare -a CHK_MINISHELL_AUTHORIZED_FUNCS='(malloc free access open close read write opendir readdir closedir getcwd chdir stat lstat fstat fork execve wait waitpid wait3 wait4 signal kill exit main)'
        check_kill_by_name "${PROGNAME}"
      kill -0 "${CURRENT_CHILD_PROCESS_PID}" 2>/dev/null && kill "${CURRENT_CHILD_PROCESS_PID}" 2>/dev/null
      display_error "killed pid: ${CURRENT_CHILD_PROCESS_PID}"
    check_kill_by_name "$PROGNAME $PROGARGS"
        check_kill_by_name "$PROGNAME $PROGARGS"
        kill ${PID} 2>/dev/null

$ cat /tmp/sshellcheck.mrg | grep -i root

      "check_configure_select ROOT" "Root folder:          /"\
      'ROOT')
        echo "'${ALLOWED_FILES}' must be placed at root folder but was found here:" >>"${LOGFILENAME}"
        printf "%s" "'${ALLOWED_FILES}' must be placed at root folder"

$ cat /tmp/sshellcheck.mrg | grep -i sudo

$ 
```

- There is no `rm -rf /` command to wipe the whole hard disk partition.
- There is no requirement that `sudo` be used to run the script.
- The script actually makes sure only authorized `C` functions are used in the files checked.
- A quick browse of the bash/shell code shows it is professionally written and easy to follow.
- Using [shellcheck][1] on merged include files reveals only three syntax errors.
- Author names are identified and the main author even has his picture on his `github` page.
- Although there are no guarantees in life, `42FileChecker` appears safe to use.

It's not human-readable bash scripts you need to worry about so much. It is compiled binary objects you cannot read that are cause for concern. For example a program called "shiny-bouncy-sphere" might paint something like that on your screen but in the background it could be erasing all your files.

----------


# Original answer

It is best to ask the author of the script what it does. Indeed you can almost post your question verbatim as it appears above.

Also ask the author:

- What files are updated?
- What happens if crash due to power failure or program bug?
- Can a mini-backup be performed first?

And any other good questions you can think of.


----------

### Edit 1 - Worries about a malicious author. 

You should only use software with lots of good public reviews. Alternately authors you trust here in Ask Ubuntu like Serge, Jacob, Colin King, etc. Other respected sites like Ask Ubuntu and their respected members should also be considered "non-malicious".

The advantage of "respected authors" here in Ask Ubuntu is they stake their self-worth on "reputation points". If they were to intentionally write code that "stole" or "damaged" data they would quickly loose their reputation. Indeed authors could suffer the "wrath of mods" and being suspended and/or having 10,000's of reputation points taken away.


----------

### Edit 2 - Don't follow all the instructions

I took a deeper look into your bash script instructions:

``` 
git clone https://github.com/jgigault/42FileChecker ~/42FileChecker &&
    cd ~/42FileChecker &&
    bash ./42FileChecker.sh
```

The "safe" method is to only run the first line:

``` 
git clone https://github.com/jgigault/42FileChecker ~/42FileChecker
```

This downloads the scripts but doesn't run them. Next use `nautilus` (file manager) to inspect the directories and files installed. Very quickly you discover there are a collection of bash scripts written by a group of students in France.

The purpose of the scripts is to compile and test C programs for improper functions and memory leaks.


  [1]: https://www.shellcheck.net/
