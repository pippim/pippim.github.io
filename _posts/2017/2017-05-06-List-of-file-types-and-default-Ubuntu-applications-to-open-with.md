---
layout:       post
title:        >
    List of file types and default Ubuntu applications to open with
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/912370
type:         Question
tags:         bash files default-programs mime-type yad
created_date: !!str "2017-05-06 01:28:22"
edit_date:    !!str "2017-05-07 00:26:33"
votes:        !!str "1"
favorites:    
views:        !!str "1,137"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    true
---

I'm writing a humble file manager and am seeking a list of different file types and what default applications Ubuntu uses to open them with.

So far I've only figured out "text" open with `gedit`, "image" open with `eog` (eye-of-gnome) and "audio" open with `ogg123`. I'm not sure if `ogg123` is a default application though.

I'd appreciate a little help expanding the list in the code below:



{% include copyHeader.html %}
``` bash
function OpenFileWithMagic () {

local FileType
FileType=$(file -i "$DfName/$2" | grep -oP '(?<=: ).*?(?=/)')
logger "bafman - OpenFileWithMagic - FileType: $FileType DfName: - $DfName parm 1: $1 2: $2 3: $3 4: $4"

case $FileType in

text)
    # TODO: expand list of file types and associated applications to open them with
    if [[ $4 == root ]]; then
        gsu gedit $DfName/$2
    else
        gedit $DfName/$2
    fi ;;
image)
    eog $DfName/$2 ;;
audio)
    ogg123 $DfName/$2 ;;
esac

} ### OpenFileWithMagic ()
export -f OpenFileWithMagic

```

**Notes:** `export` is only required because file is opened when double-clicking from `yad` dialog box. I also need help figuring out "magic" numbers and how one might interpret them. Perhaps an educating link?


----------


**Edit** This is not a duplicate of https://askubuntu.com/questions/15354/how-to-open-file-with-default-application-from-command-line because:

 - That question is how to open a file from the **command line**. This question is how do it from a **bash script** within a `case` structure.
 - The answer there would result in `rhythembox` being used for sound files which is not wanted. `ogg123` is more suited for playing sounds without a new window being opened and closing with python error messages.
 - The answer there would use `xdg-open /bin/mv` resulting in:

``` bash
    gvfs-open: /bin/mv: error opening location: No application is registered as handling this file
 - With the above bash script the `file -i /bin/mv` command results in:
```


``` bash
    /bin/mv: application/x-executable; charset=binary

```


After filtering out processing for all desired file types within the bash script then the left overs could be passed to `xdg-open` which is used in the duplicate candidate.


----------

**Reply to comments** As pointed out by [DK Bose][1] major file types can be found in `/usr/share/mime/types`. Here there are additional types to be considered such as `Video` (a suitable default Ubuntu video player needs to be sourced), `Application` (rather than running it, info about the application needs to be displayed) and `Message` (I have no clue how to display this). Additional mime types needing further research are `inode`, `model`, `multipart` and `x-content`. 

[rinzwind][2] pointed out `ogg123` is not a default sound file player in Ubuntu. A suitable installed-by-default  Ubuntu application to play sound files is `canberra-gtk-play` as answered October 5, 2016 by [wjzndrea][3] in this Q&A: [Can line draw characters (or colors) be added to a Bash file list menu?][4].


  [1]: https://askubuntu.com/users/248158/dk-bose
  [2]: https://askubuntu.com/users/15811/rinzwind
  [3]: https://askubuntu.com/users/301745/wjandrea
  [4]: https://askubuntu.com/questions/832766/can-line-draw-characters-or-colors-be-added-to-a-bash-file-list-menu
