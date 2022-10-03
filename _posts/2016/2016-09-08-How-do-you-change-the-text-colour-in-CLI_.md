---
layout:       post
title:        >
    How do you change the text colour in CLI?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/822359
type:         Answer
tags:         command-line
created_date: 2016-09-08 04:32:25
edit_date:    
votes:        "2 "
favorites:    
views:        "460 "
accepted:     
uploaded:     2022-10-02 19:25:00
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-08-How-do-you-change-the-text-colour-in-CLI_.md
toc:          false
navigation:   false
clipboard:    false
---

In the Terminal aka CLI (Command Line Interface) different colours are already used to represent file types, directories and message highlighting. I wouldn't want to override these colours.

However you can change the colour of the command prompt which makes it easier to distinguish between the commands you typed and the output from them.

Do do this type:

``` 
gedit ~/.bashrc
```

Then search for this block of text:

``` 
# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes
```

Remove the # in front of `force_color_prompt=yes` and save the file.

I've done this on my system and like the result.
