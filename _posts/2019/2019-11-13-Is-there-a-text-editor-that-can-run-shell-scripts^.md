---
layout:       post
title:        >
    Is there a text editor that can run shell scripts?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1188435
type:         Answer
tags:         scripts text-editor
created_date: 2019-11-13 12:46:32
edit_date:    2020-06-12 14:37:07
votes:        "17 "
favorites:    
views:        "8,935 "
accepted:     Accepted
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-13-Is-there-a-text-editor-that-can-run-shell-scripts^.md
toc:          false
navigation:   false
clipboard:    false
---

From:

- [How to debug c programs by gedit?](How to debug c programs by gedit?)

# Gedit Plug-ins

## Use `gedit` external terminal plug-in

You can use `gedit` with terminal plugin. The steps are fairly straight-forward:

1. Enable "Universe" repository
2. Install `gedit-plugins`
3. Activate "Embedded Terminal"
4. Use <kbd>Ctrl</kbd>+<kbd>F9</kbd> to open terminal
5. Other `gedit` plug-ins

## Step 1. Enable "Universe" repository

The first step is to ensure `Universe` repository is activated from `Settings`->`Software & Updates`->`Ubuntu Software` and ensure the third option is checked:

[![gedit plugins repository.png][1]][1]

## Step 2. Install `gedit-plugins`

Install `gedit-plugs` with the command:

``` 
sudo apt install gedit-plugins

```

## Step 3. Activate "Embedded Terminal"

Open `gedit` (don't use `sudo`) and select `Edit`->`Preferences`->`Plugins` and check off `Embedded Terminal`:

[![gedit embedded terminal.png][2]][2]

## Step 4. Use <kbd>Ctrl</kbd>+<kbd>F9</kbd> to open terminal

In the GIF below we use <kbd>Ctrl</kbd>+<kbd>F9</kbd> to get a tiny window with the command prompt. Use the mouse to drag the dividing line up.

[![gedit terminal plugin.gif][4]][4]

## Step 5. Other `gedit` plug-ins

As mentioned in Step 4., you can grab the separator bar to make the terminal window bigger. Here's what it looks like in a normal picture ((not a GIF).

There are three other plug-ins I currently use in the `gedit` coding window:

- plug-in to display 80 character cut-off with different background color
- plug-in to display entire document in thumbnail you can drag to quickly go to code section
- Highlight matching brackets

[![gedit teriminal line wrap.png][5]][5]

For further reading please see:

- [Code completion for gedit]({% post_url /2018/2018-10-17-Code-completion-for-gedit %})
- [Useful Gedit plugins for programmers - HowtoForge][6]
- [gedit: Add Python / C++ Autocomplete Support - nixCraft][7]
- [5 Must-Have Gedit Plugins for Programmers | Yaser Sulaiman's Blog][8]
- [How to C program in gedit - Quora][9]


  [1]: https://i.stack.imgur.com/6uY6ul.png
  [2]: https://i.stack.imgur.com/042mbm.png
  [4]: https://i.stack.imgur.com/K9Xtd.gif
  [5]: https://i.stack.imgur.com/WikO2l.png
  [6]: https://www.howtoforge.com/tutorial/three-useful-gedit-plugins-for-programmers/
  [7]: https://www.cyberciti.biz/faq/gedit-python-c-cpp-autocomplete-plugin/
  [8]: https://yaserxp.wordpress.com/2008/09/03/5-must-have-gedit-plugins-for-programmers/
  [9]: https://www.quora.com/How-do-I-C-program-in-gedit
