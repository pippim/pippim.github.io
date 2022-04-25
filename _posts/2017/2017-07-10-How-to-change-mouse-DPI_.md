---
layout:       post
title:        >
    How to change mouse DPI?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/934636
type:         Answer
tags:         14.04 mouse hardware
created_date: 2017-07-10 02:27:44
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "29,742 "
accepted:     
uploaded:     2022-04-24 19:32:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-10-How-to-change-mouse-DPI_.md
toc:          false
navigation:   false
clipboard:    true
---

# KISS - Keeping It Simple Solution

My wireless [Logitech MX Performance mouse][1] has DPI of 400 to 1600. To set the speed in Ubuntu I go to `System Settings` -> `Mouse & Touchpad` which brings up this display:

[![Mouse speed][2]][2]

Sliding the "Mouse pointer speed" changes the DPI rate for comfortable use. In Windows Logitech also recommends setting the DPI by [sliding the Mouse Pointer Speed][3]. Specifically it says:

3. Under **Pointer speed**, adjust the slider to your preferred DPI value. The minimum value is 400 DPI. The speed can be increased in increments of 200, up to a maximum of 1600 DPI.


----------


# The more complicated solution

Some report that for gaming mice the slowest pointer speed setting (above) is still too "insanely fast". In this situation you need to find the `xinput` name for your mouse using `xinput --list --short`:

``` 
rick@dell:~$ xinput --list --short
⎡ Virtual core pointer                      id=2    [master pointer  (3)]
⎜   ↳ Virtual core XTEST pointer                id=4    [slave  pointer  (2)]
⎜   ↳ Logitech Performance MX                   id=11   [slave  pointer  (2)]
⎜   ↳ Logitech K800                             id=12   [slave  pointer  (2)]
⎜   ↳ AlpsPS/2 ALPS GlidePoint                  id=15   [slave  pointer  (2)]
⎣ Virtual core keyboard                     id=3    [master keyboard (2)]
    ↳ Virtual core XTEST keyboard               id=5    [slave  keyboard (3)]
    ↳ Power Button                              id=6    [slave  keyboard (3)]
    ↳ Video Bus                                 id=7    [slave  keyboard (3)]
    ↳ Video Bus                                 id=8    [slave  keyboard (3)]
    ↳ Power Button                              id=9    [slave  keyboard (3)]
    ↳ Sleep Button                              id=10   [slave  keyboard (3)]
    ↳ Laptop_Integrated_Webcam_HD               id=13   [slave  keyboard (3)]
    ↳ Dell WMI hotkeys                          id=16   [slave  keyboard (3)]
    ↳ AT Translated Set 2 keyboard              id=14   [slave  keyboard (3)]
```

From the list we see the mouse is named "**Logitech Performance MX**".

Next we need the details of the mouse using `xinput --list-props "Logitech Performance MX"`:

{% include copyHeader.html %}
``` 
Device 'Logitech Performance MX':
    Device Enabled (139):   1
    Coordinate Transformation Matrix (141): 1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000
    Device Accel Profile (268): 0
    Device Accel Constant Deceleration (269):   1.000000
    Device Accel Adaptive Deceleration (270):   1.000000
    Device Accel Velocity Scaling (271):    10.000000
    Device Product ID (257):    1133, 4122
    Device Node (258):  "/dev/input/event8"
    Evdev Axis Inversion (272): 0, 0
    Evdev Axes Swap (274):  0
    Axis Labels (275):  "Rel X" (149), "Rel Y" (150), "Rel Horiz Wheel" (266), "Rel Vert Wheel" (267)
    Button Labels (276):    "Button Left" (142), "Button Middle" (143), "Button Right" (144), "Button Wheel Up" (145), "Button Wheel Down" (146), "Button Horiz Wheel Left" (147), "Button Horiz Wheel Right" (148), "Button Side" (261), "Button Extra" (262), "Button Forward" (263), "Button Back" (264), "Button Task" (265), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260), "Button Unknown" (260)
    Evdev Scrolling Distance (277): 1, 1, 1
    Evdev Middle Button Emulation (278):    0
    Evdev Middle Button Timeout (279):  50
    Evdev Third Button Emulation (280): 0
    Evdev Third Button Emulation Timeout (281): 1000
    Evdev Third Button Emulation Button (282):  3
    Evdev Third Button Emulation Threshold (283):   20
    Evdev Wheel Emulation (284):    0
    Evdev Wheel Emulation Axes (285):   0, 0, 4, 5
    Evdev Wheel Emulation Inertia (286):    10
    Evdev Wheel Emulation Timeout (287):    200
    Evdev Wheel Emulation Button (288): 4
    Evdev Drag Lock Buttons (289):  0
```

We need to multiply the `constant deceleration` above by 5 (recommended for gaming mice) using:

``` 
xinput --set-prop "Logitech Performance MX" "Device Accel Constant Deceleration" 5
```

Again `5` is recommended. On my platform (1600 DPI mouse) I used `2` (double slow) and had to increase the Ubuntu Mouse Pointer Speed slider bar from 1/3 to about 7/8.

If the above doesn't work, other recommended settings for gaming mice are:

``` 
xinput --set-prop "Logitech Performance MX" "Device Accel Velocity Scaling" 1
xinput --set-prop "Logitech Performance MX" "Device Accel Profile" -1
```

**NOTE:** Replace "Logitech Performance MX" above with the mouse name your `xinput` reports.

**NOTE:** The above changes are for Ubuntu 10.04 - 16.10. For Ubuntu 17.04 see [Lowering Mouse Sensitivity in Ubuntu and Fedora][4] where the bulk of this information comes from.

Special thanks to Q&A that popped up this afternoon: [Corsair M95 Gaming Mouse too sensitive / speed too fast. How to reduce speed?][5]


  [1]: https://www.logitech.com/en-ca/product/performance-mouse-mx
  [2]: https://i.stack.imgur.com/u0n9k.png
  [3]: http://support.logitech.com/en_us/article/Set-MX-Master-mouse-sensitivity-and-pointer-speed-with-Logitech-Options?product=a0qi0000006Njj9AAC
  [4]: https://patrickmn.com/aside/lowering-gaming-mouse-sensitivity-in-ubuntu-9-10/
  [5]: https://askubuntu.com/questions/934906/corsair-m95-gaming-mouse-too-sensitive-speed-too-fast-how-to-reduce-speed/934908#934908
