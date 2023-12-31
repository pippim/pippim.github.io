---
layout:       post
title:        >
    Crackling sound and noise when using line in
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1092664
type:         Answer
tags:         sound pulseaudio alsa
created_date: 2018-11-13 20:42:06
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "1,840 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-13-Crackling-sound-and-noise-when-using-line-in.md
toc:          false
navigation:   false
clipboard:    false
---

Pulseaudio may be the culprit:

Use `sudo -H gedit /etc/modprobe.d/alsa-base.conf`

Search for:

``` 
options snd-hda-intel position_fix=1
```

and change it to:

``` 
options snd-hda-intel position_fix=2
```

Source: [Crackling sound from microphone recently, in 13.04](Crackling sound from microphone recently, in 13.04)

----------


If you are using [TLP][1]:

## Audio

``` 
SOUND_POWER_SAVE_ON_AC=0
SOUND_POWER_SAVE_ON_BAT=1
```

Timeout (in seconds) for the audio power saving mode (supports Intel HDA, AC97). A value of `0` disables power save.

**Hint:** this setting can cause slight clicks in sound output.

``` 
SOUND_POWER_SAVE_CONTROLLER=Y
```

- Y – powers off the controller together with the sound chip
- N – controller active permanently


  [1]: https://linrunner.de/en/tlp/docs/tlp-configuration.html#audio
