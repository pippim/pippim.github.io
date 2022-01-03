---
layout:       post
title:        >
    Zenity progress: no window
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1181759
type:         Answer
tags:         zenity yad
created_date: 2019-10-18 01:41:26
edit_date:    2019-10-20 13:39:42
votes:        "2 "
favorites:    
views:        "322 "
accepted:     
uploaded:     2022-01-02 20:50:10
toc:          false
navigation:   false
clipboard:    false
---

You aren't checking if the starting directory was aborted only the destination directory. Also you can shorten `if` - `then` - `fi` like this:

<!-- Language-all: lang-bash -->

``` 
d1="$(zenity  --file-selection --title="Bulk Move    Choose starting directory"  --directory)"
[[ "$?" != 0 ]] && exit
d2="$(zenity  --file-selection --title="Bulk Move    Choose destination directory"  --directory)"
[[ "$?" != 0 ]] && exit

```

This gives double the amount of abort checking with 1 less line of code.

To test the progress bar on any system use this:

``` 
$ for i in ./* ; do echo $i ; sleep .1 ;  done | zenity --pulsate --title "Processing " --text "${filename} " --pulsate --auto-close --auto-kill

```

``` 
--pulsate is not supported for this dialogue

```

Ah there is an error message! `--progress` is missing to tell `zenity` a progress bar is desired. So the working script would be:

``` 
d1="$(zenity  --file-selection --title="Bulk Move    Choose starting directory" \
    --directory)"
[[ "$?" != 0 ]] && exit

```

``` 
d2="$(zenity  --file-selection --title="Bulk Move    Choose destination     directory" \
    --directory)"
[[ "$?" != 0 ]] && exit

for i in "$d1"/* ; do

    ## filter out the actual file name
    filename=$(basename -- "$i")
    ## the meaty bit
    ffmpeg -i "$i" -c:v libx265 -preset medium -x265-params crf=28 \
        -c:a aac -strict experimental -b:a 128k "$d2"/"${filename%.*}.mkv"

done | zenity --progress --pulsate --title "Processing " \
              --text "ffmpeg - convert files" \
              --pulsate --auto-close --auto-kill

```


----------


Passing `${filename}` to `--text` option will not update display with each file name processed. If you want this you will need to switch to `yad` (Yet Another Dialog) which is a super-charged version of `zenity`:

[![yad-progress-bar.gif][1]][1]

Although the source code appears in the `.gif` you can copy and paste in your own script from this Q&A:

- [How do I create a fake process bar?]({% post_url /2018/2018-04-23-How-do-I-create-a-fake-process-bar? %})


  [1]: https://i.stack.imgur.com/w4HlS.gif
