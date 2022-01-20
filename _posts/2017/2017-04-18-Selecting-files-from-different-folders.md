---
layout:       post
title:        >
    Selecting files from different folders
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/906042
type:         Answer
tags:         nautilus filemanager yad
created_date: 2017-04-18 02:03:38
edit_date:    
votes:        "2 "
favorites:    
views:        "750 "
accepted:     
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-04-18-Selecting-files-from-different-folders.md
toc:          true
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# bafman Begins

This is a work in progress answer divided into two posts.

bafman (**B**orn **A**gain **F**ile **Man**ager) was developed this past long weekend (April 14-17, 2017). It is still a work in progress but it will satisfy requirement to select files across many sub-directories.

This is ideal in situations where you want to copy files in a project without doing a full system backup. There are other applications such as tagging every system configuration file you've modified across dozens of different directories.

I'm posting this WIP in hopes of generating interest and gathering suggestions for additional features as I finish bash coding. Yes it's all written in bash (to the shock of many perhaps) and relies on YAD (Yet Another Dialog) for all the GUI.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Initial data creation

When you invoke bafman for the first time this screen appears after a few moments:

[![bafman 1][1]][1]

This is the main screen. You can click on any column heading to sort in ascending then descending order. You can grab the column divider and move it to adjust column width.
  
The list of directories is cut down from > 20,000 (the bafman limit) using this command:

``` 
tree --noreport -danifI "src*|dev|lib|media|mnt|proc|root|run|sys|tmp|tmpfs|var|usr" / > "$bafmanTemp"
```

If you are a programmer you might want to see all the "src*" directories and would remove this from the code.

Notice the file counts and sizes are all zero in our display. That is remedied in the next section.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## `Update Dirs` button - generate file statistics for all directories

When you click on the `Update Dirs` button you are greeted with this initial warning:

[![bafman 2][2]][2]

10,000 directories is an extraordinary situation if for example you add the `/usr` directory and `/var` directory to bafman list. In our example we have 2,365 directories and it takes about 5 minutes to scan all files in them.

While scanning all files in all directories this progress screen appears:

[![bafman 3][3]][3]

When all is said and done the main screen is updated like this:

[![bafman 4][4]][4]

Once again it's important to note you can click on "File Sizes" column to sort on ascending order (smallest on top) and click again for descending order (directories with largest file sizes on top).

**Search on directory name** is possible by simply typing the directory you want to advance to. For example type `/etc/default` and the screen scrolls to that directory.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## `Hide Dir` button - remove directory from bafman list

I noticed I have a directory called `/cdrom2` which I forgot I created during testing the "fake" directory `/cdrom` (which you MUST KEEP). So let's remove `/cdrom2` from the bafman list by clicking the `Hide Dir` button:

[![bafman 5][5]][5]

The directory `/cdrom2` has already been removed from the drive so the **Modified** and **Owner** fields display as *Deleted*. These and other fields on this screen are described under the **Edit comments** section.

For the time-being select the `OK` button to hide the sub-directory and then this screen then appears:

[![bafman 6][6]][6]

It is possible to hide a directory and keep all the sub-directories under it on the bafman list. Then those individual sub-directories can be hidden or kept individually.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

## `Edit comments` button - enter comments for any directory.

When working with Linux / Ubuntu directories you have to remember lots of details about them so you can enter some important comments here.

From the main screen type `/etc/default` and the screen scrolls to that directory. Double click on it or hit the <kbd>Space Bar</kbd> to the select the directory and then click the `Edit comments` button:

[![bafman 7][7]][7]

Appropriate comments have been entered. Note that if you `Hide` the directory in the future the comments will be lost. The other fields on the screen are auto-generated every time you click the `Enter comments` button and will be saved on the main screen.

Even if you don't enter a comment coming to this screen and having directory counts generated counts as one transaction. (More on transaction counts later).


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr8" class ="hdr-btn">Skip</a></div>

## `Add Dir` button - Add directory to bafman list

You can add any directory to the bafman list and it will prompt to automatically add sub-directories as well. In this example we'll add the directory `/lib` which contains hundreds of sub-directories.

When you click the `Add Dir` button this screen appears with your home directory selected as default:

[![bafman 8][8]][8]

As you probably suspected already my real name isn't *WinEunuchs2Unix* as this screenshot reveals. 

- Click the directory drop down arrow
- Select `Other...` from the list
- Start typing `/lib/systemd/`
- Click `Open`

After selecting the directory to add, the screen reappears and we've typed in an appropriate comment:

[![bafman 9][9]][9]

Click `OK` to add the directory and then you are prompted to add sub-directories under it:

[![bafman 10][10]][10]

For our example, click `Yes`.

> **Note:** If you attempt to add the entire `/lib` directory and all sub-directories you might get an error message "Unknown button return  
> code" and if you call bafman from the terminal the following error  
> message appears:  
>   
>     line 575: /usr/bin/yad: Argument list too long  
>   
> If you are running bafman from desktop shortcut you'll see this error  
> in `/var/log/syslog`. *Remember* bash has limits on how large arrays  
> can be when passing to GUI Yad.  

After adding the new directory and sub-directories under it the main screen reappears. Start typing `/lib/systemd` and the screen scrolls down to this section:

[![bafman 11][11]][11]

Here's an important note: When adding a new directory it is appended to the bottom of bafman's list. Simply click the Directory Name column heading to resort the list alphabetically.

All the statistics of file counts and file sizes are zero. If it were only a single directory we could simply click `Edit comments` button and those stats are generated for us. But it is easier to click `Update Dirs` button and go grab a coffee.

When you enter a comment while adding a new directory that comment is inherited by all the sub-directories under it (should you choose to add them at the same time).


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr7" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr9" class ="hdr-btn">Skip</a></div>

## `Tag files` button - Select the files which will be used by Run command

This is the heart of bafman and unfortunately incomplete at this time. Tagging files within the directory has been setup but designs need to be formulated for tagging files within sub-directories under the select directory. Hopefully community input helps in the design.

Let's get started by navigating to the directory `/home/rick/.local/share/nautilus/scripts`, selecting it with double-click and then clicking the `Tag files` button:

[![bafman 12][12]][12]

If you're like me you've invested a lot of time writing your scripts (or documents) so tagging them for subsequent copying is a good idea. This is a short list and we want everything so let's click the `Tag All` button:

[![bafman 13][13]][13]

The default is regular files only. This is where I need input as to what to do when directories are selected...

Very quickly to wrap things up click the `Untag All` button:

[![bafman 14][14]][14]

The defaults are to untag ALL file types.

Thanks for staying awake and looking forward to your input. The next answer will post the WIP bash code.

  [1]: https://i.stack.imgur.com/fiNVj.png
  [2]: https://i.stack.imgur.com/2Iw4p.png
  [3]: https://i.stack.imgur.com/WWJH9.png
  [4]: https://i.stack.imgur.com/ST4yO.png
  [5]: https://i.stack.imgur.com/umWzn.png
  [6]: https://i.stack.imgur.com/XDLL6.png
  [7]: https://i.stack.imgur.com/ZSomD.png
  [8]: https://i.stack.imgur.com/qPFLF.png
  [9]: https://i.stack.imgur.com/Tk8pf.png
  [10]: https://i.stack.imgur.com/QZxy6.png
  [11]: https://i.stack.imgur.com/9JPvB.png
  [12]: https://i.stack.imgur.com/Atvwd.png
  [13]: https://i.stack.imgur.com/sm2Wp.png
  [14]: https://i.stack.imgur.com/jVNK9.png


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr8" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

