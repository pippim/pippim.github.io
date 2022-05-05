---
layout:       post
title:        >
    Nautilus gives a warning when opened in the current directory from the terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1010327
type:         Answer
tags:         command-line xorg nautilus 17.10 pygi
created_date: 2018-02-27 15:55:48
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "4,854 "
accepted:     Accepted
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-27-Nautilus-gives-a-warning-when-opened-in-the-current-directory-from-the-terminal.md
toc:          false
navigation:   false
clipboard:    false
---

To open Nautilus from the current directory use:

``` 
nautilus .
```

To open with a given file selected use:

``` 
nautilus . -s filename
```

If the file name has spaces enclose it in double quotes (`" `).


----------


# Warning messages will appear

Nautilus, gedit and other apps are all based on Gnome Took Kit (GTK) and it is infamous for giving warning messages. 99% of the time you can ignore them. Does `nautilus` open ok with the current directory displayed? That is the only question. For Ubuntu 16.04.3 LTS with `xorg` there are lots of warnings:

``` 
$ nautilus .

(nautilus:18233): GLib-GIO-CRITICAL **: g_dbus_interface_skeleton_unexport: assertion 'interface_->priv->connections != NULL' failed

(nautilus:18233): GLib-GIO-CRITICAL **: g_dbus_interface_skeleton_unexport: assertion 'interface_->priv->connections != NULL' failed

(nautilus:18233): Gtk-CRITICAL **: gtk_icon_theme_get_for_screen: assertion 'GDK_IS_SCREEN (screen)' failed

(nautilus:18233): GLib-GObject-WARNING **: invalid (NULL) pointer instance

(nautilus:18233): GLib-GObject-CRITICAL **: g_signal_connect_object: assertion 'G_TYPE_CHECK_INSTANCE (instance)' failed
```


Once again Nautilus works fine and these annoying warning messages are simply part of the Gnome back bone history of Ubuntu and other Linux distributions.
