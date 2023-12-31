---
layout:       post
title:        >
    gnome-terminal error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1185366
type:         Answer
tags:         command-line gnome-terminal
created_date: 2019-10-31 23:08:14
edit_date:    
votes:        "1 "
favorites:    
views:        "989 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-31-gnome-terminal-error.md
toc:          false
navigation:   false
clipboard:    false
---

Your `gnome-terminal` program (Python Script) is corrupted. Here's some quick checks:



``` python
$ wc /usr/bin/gnome-terminal

 107  213 3368 /usr/bin/gnome-terminal

$ tail /usr/bin/gnome-terminal

    GnomeTerminal(sys.argv[:], mainloop)

    try:
        mainloop.run()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
```

- Word count program (`wc`) tells us it is 107 lines, 213 words and 3368 characters.
- Tail program (`tail`) shows what the last 10 lines look like.

In your case an accident/bug caused part of `gnome-terminal` to be overwritten with garbage. Although we could spend time trying to figure out what caused the problem, it is easiest just reinstalling. Assuming there are no custom modifications done to `gnome-terminal` then:

- Open console login with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F3</kbd>.
- Log into the console with your User ID and Password.
- Type `sudo apt update && sudo apt install --reinstall gnome-terminal`.
- For Ubuntu 16.04 return to your GUI desktop with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F7</kbd>.
- For Ubuntu 18.04+ return to your GUI desktop with <kbd>Alt</kbd>+<kbd>F2</kbd>.
