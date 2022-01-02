---
layout:       post
title:        >
    How to switch between headphones and speakers without unplugging headphones
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1005980
type:         Answer
tags:         sound alsa headphones
created_date: 2018-02-14 02:17:24
edit_date:    2018-04-28 17:19:43
votes:        "13 "
favorites:    
views:        "39,286 "
accepted:     
uploaded:     2022-01-02 16:31:33
toc:          false
navigation:   false
clipboard:    false
---

# Having both speakers and headphones plugged in and switching in software on-the-fly

By design, Pulseaudio automatically turns off Line Out when headphones are plugged in and uses Headphone slider instead. You can observe this behavior in alsamixer. What we want is to have Headphone and Line Out sliders working separately and at the same time. This is extremely useful if you want to remap Realtek's jacks to have, say, Rear Green for headphones and Blue for speakers (with the help of hdajackretask from alsa-tools).

To achieve this, you should directly edit Pulseaudio mixer's configuration.

### 1. We tell pulseaudio that headphones are always plugged in.

Edit:

``` 
/usr/share/pulseaudio/alsa-mixer/paths/analog-output-lineout.conf

```

Find:

``` 
[Jack Headphone]
state.plugged = no
state.unplugged = unknown

```

Change `no` to `yes`.

If you're using the jacks on the front of your computer's case change `[Jack Front Headphone]` instead.

### 2. By default, Line Out's volume controlled only by Master, and not by Line Out slider itself.

We want to merge Line Out with Master. Add this snippet to the end of the file:

``` 
[Element Line Out]
switch = mute
volume = merge

```

### 3. We need to completely cut off Line Out when we use headphones.

Edit:

``` 
/usr/share/pulseaudio/alsa-mixer/paths/analog-output-headphones.conf

```

Add this snippet to the end of the file:

``` 
[Element Line Out]
switch = off
volume = off

```

On some systems you may also need to disable Front by adding this snippet:

``` 
[Element Front]
switch = off
volume = off

```

### 4. Like Pulseaudio, Alsa itself cuts off speakers when headphones are plugged in. 

Open alsamixer: `alsamixer -c0` or `alsamixer -c1`

Use <kbd>&larr;</kbd>/<kbd>&rarr;</kbd> to Auto-Mute mode. Disable Auto-Mute Mode with <kbd>&darr;</kbd>. Close alsamixer with <kbd>Esc</kbd>.

Save your changes with: `alsactl store`

### 5. Restart Pulseaudio

``` 
$ pulseaudio -k
$ pulseaudio --start

```

Now you have two separate ports on the same sink in pulseaudio. They mute each other, so you can switch to headphones and this will mute Line Out, and vice versa. To switch between ports you can use Gnome or Plasma sound mixer, or install appropriate desktop extension. 


----------


[Source][1]


  [1]: https://wiki.archlinux.org/index.php/PulseAudio/Examples

