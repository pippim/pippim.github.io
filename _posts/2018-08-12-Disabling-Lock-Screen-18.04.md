---
layout:       post
title:        Disabling Lock Screen 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064704
type:         Answer
tags:         18.04 lock-screen
created_date: 2018-08-12 16:22:14
edit_date:    2020-01-06 15:11:47
votes:        63
favorites:    
views:        43,542
accepted:     
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

# Disable Lock Screen

You can disable the lock screen permanently when waking from suspend.

First use this command to discover current settings:

``` 
$ gsettings get org.gnome.desktop.lockdown disable-lock-screen
false

```

Now set it to `true` using this command:

``` 
gsettings set org.gnome.desktop.lockdown disable-lock-screen 'true'

```

If you are unhappy with the new setting you can reverse it using:

``` 
gsettings set org.gnome.desktop.lockdown disable-lock-screen 'false'

```


------------


# Disable Screen Saver Locking

There was some confusion where people think disabling the Lock screen also disables the screen saver which is invoked after a certain period of inactivity. The screen saver requires input to get your desktop back. Some people may want the screen saver to come on but not have it locked when waking up the screen.

To check screen saver lock status use:

``` 
$ gsettings get org.gnome.desktop.screensaver lock-enabled
true

```

If true you can turn off screen saver locking with:

``` 
gsettings set org.gnome.desktop.screensaver lock-enabled false

```

To reverse the setting back use:

``` 
gsettings set org.gnome.desktop.screensaver lock-enabled true
## 
```



In Gnome [screen locking guide][1] it says:

> ## 6.2. Screen Locking  
>   
> By default, GNOME Power Manager supports a simple locking scheme. This  
> means that the screen will lock if set to **Lock screen** in  
> gnome-screensaver when the lid is closed, or the system performs a  
> suspend or hibernate action.  
>   
> There is a complex locking scheme available for power users that  
> allows locking policy to change for the lid, suspend and hibernate  
> actions. To enable this complex mode, you will have to disable the  
> GConf key:  
>   
> -    `/apps/gnome-power-manager/lock/use_screensaver_settings`  
>   
> Then the policy keys can be set to force a *gnome-screensaver* lock  
> and unlock when the action is performed:  
>   
> -    `/apps/gnome-power-manager/lock/blank_screen`  
> -    `/apps/gnome-power-manager/lock/suspend`  
> -    `/apps/gnome-power-manager/lock/hibernate`  

  [1]: https://help.gnome.org/users/gnome-power-manager/stable/preferences-advanced.html.en_GB#advanced-preferences-locking
