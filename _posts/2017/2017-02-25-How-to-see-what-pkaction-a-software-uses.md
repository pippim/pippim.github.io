---
layout:       post
title:        >
    How to see what pkaction a software uses
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/887227
type:         Answer
tags:         permissions password gksu policykit visudo
created_date: 2017-02-25 17:21:57
edit_date:    2017-04-13 12:23:38
votes:        "2 "
favorites:    
views:        "700 "
accepted:     
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-25-How-to-see-what-pkaction-a-software-uses.md
toc:          false
navigation:   false
clipboard:    false
---

Ask Ubuntu has this answer ([How to configure pkexec to not ask for password?][1]) that is closer to what you need than the link you found earlier.

As a quick example to finding the application, I'll illustrate using my own script. I wanted to replace `gksu` which is being deprecated with `pkexec` so I wrote a wrapper script called **gsu**.

I invoke **gsu** from the command line with:

[![gsu pkexec][2]][2]

Notice the **Details** drop down arrow. Click it and this is revealed:

[![gsu pkexec details][3]][3]

In my example the **pkla** is controlled by ***org.gnome.gedit***. I'll use that in the next example, which you would replace with your own:

[![gsu pexec authorities][4]][4]

If you want to run without password prompt you would set the following:

``` 
  <allow_any>yes</allow_any>
  <allow_inactive>yes</allow_inactive>
  <allow_active>yes</allow_active>
```

On a personal note I don't like repeatedly entering the password myself but will not change `gedit` to never ask for password when changing root files using `pkexec`. However I would like it to not repeatedly ask for password when running it many times in given session. You can do this with `sudo` and you can extend the period from 10 minutes to 120 minutes as I have done on my system. I would like similar functionality for policy kits.
  [1]: https://askubuntu.com/questions/383747/how-to-configure-pkexec-to-not-ask-for-password
  [2]: https://i.stack.imgur.com/vMGDh.png
  [3]: https://i.stack.imgur.com/Tn78X.png
  [4]: https://i.stack.imgur.com/c1EWB.png
