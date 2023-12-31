---
layout:       post
title:        >
    Why does my computer keep displaying the GRUB menu when it starts up?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/877637
type:         Answer
tags:         boot grub2 startup
created_date: 2017-01-29 18:57:37
edit_date:    
votes:        "1 "
favorites:    
views:        "3,481 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-29-Why-does-my-computer-keep-displaying-the-GRUB-menu-when-it-starts-up_.md
toc:          false
navigation:   false
clipboard:    false
---

# Five keys you can press at Grub Menu

This write-up is from ([omgubuntu.co.uk - Five keys to show Grub menu Ubuntu][1]) which nicely lays out what you can do at Grub menu.

[![Five Keys Grub][2]][2]

## 1. Shift
Ubuntu does not display the GRUB menu by default. To see GRUB during boot you need to press the right-hand <kbd>Shift</kbd> key during boot.

## 2. Up/Down Arrow Keys
When you are at the GRUB menu you can use the <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys to select other operating systems and kernel configurations display in the menu. When you’ve selected the one you wish to highlight press <kbd>Enter</kbd> to boot it.

## 3. <kbd>e</kbd> for Edit
There may be times you need to edit a boot command,

Use the arrow keys to select a boot option and hit the <kbd>e</kbd> key to that entry’s boot options by hand.

You may need to do this to run a specific boot parameter, pass a kernel flag, adjust the run time level or set the frame buffer mode.

When you’re ready to boot with your modified changes press <kbd>Ctrl</kbd><kbd>X</kbd>. 

## 4. <kbd>c</kbd> for Command Line Mode
Press the <kbd>c</kbd> key at the GRUB Menu to switch into `CLI Mode`. From here you can do a wealth of things, including changing menu entry names, fixing a broken install, or booting into a custom kernel configuration.

## 5. <kbd>Esc</kbd> Key
Tap the <kbd>Esc</kbd> key at any time to return to the main GRUB Menu screen. Should you press <kbd>Esc</kbd> at the editor or command line screens all configuration changes you made are discarded and you’re plonked back at the main menu interface.


  [1]: http://www.omgubuntu.co.uk/2016/07/key-to-show-grub-menu-ubuntu
  [2]: https://i.stack.imgur.com/afz7O.jpg
