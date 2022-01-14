---
layout:       post
title:        >
    Run Bash scripts in folder all at the same time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1156436
type:         Answer
tags:         bash scripts
created_date: 2019-07-06 17:17:00
edit_date:    2019-07-07 17:52:17
votes:        "9 "
favorites:    
views:        "4,113 "
accepted:     
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-06-Run-Bash-scripts-in-folder-all-at-the-same-time.md
toc:          false
navigation:   false
clipboard:    false
---

<!-- Language-all: lang-bash -->

To run all scripts at the same time (in parallel) use:

``` 
script_1.sh &
script_2.sh &
script_3.sh &
script_4.sh &
script_5.sh &

```

To run the one after the other (sequentially) use:

``` 
script_1.sh &&
script_2.sh &&
script_3.sh &&
script_4.sh &&
script_5.sh

```


----------

## Enhancement for comments

If you have 200 scripts you want to run at the same time (which might bog down the machine BTW) use this script:

``` 
#!/bin/bash
for Script in my_folder/*.sh ; do
    echo bash "$Script" &
done

```

Set the script attributes to executable with the command:

``` 
chmod a+x /path/to/script.sh

```

The first time you run the script it will only echo the names of the 200 scripts it will be executing. When you are happy the right names are being selected edit the script and change this line:

``` 
    echo bash "$Script" &
to:
```


``` 
    bash "$Script" &

```


----------

There are three ways you can call a bash script from another as answered here:

- [How to call shell script from another shell script?][1]

> 1.    Make the other script executable, add the `#!/bin/bash` line at the top, and the path where the file is to the `$PATH` environment  
> variable. Then you can call it as a normal command;  
>   
> 2.    Or call it with the source command (alias is .) like this: `source /path/to/script`;  
>   
> 3.    Or use the bash command to execute it: `/bin/bash /path/to/script`;  

In OP's case one or more of the 200 scripts did not contain the shebang `#!/bin/bash` first line in the file. As such option 3. had to be used.


----------

## 200 Scripts running at the same time

A comment has been raised about whether they are "running at the same time". On a typical 8 CPU system 25 scripts will be sharing one CPU at the same time but only one one script will execute at a time until it's time slice (measured in milliseconds) runs out. Then the next job will receive its fair share of milliseconds, then the next job, etc., etc. 

In loose terms we can say 200 jobs are running "concurrently" but not "simultaneously" across 8 CPUs which equates to 25 jobs per CPU:

[![thread states.png][2]][2]

Above image and comments below from [Linux kernel scheduler][3]

[![time slice.png][4]][4]


  [1]: https://stackoverflow.com/questions/8352851/how-to-call-shell-script-from-another-shell-script
  [2]: https://i.stack.imgur.com/O6wUu.png
  [3]: https://helix979.github.io/jkoo/post/os-scheduler/
  [4]: https://i.stack.imgur.com/BKbj0.png
