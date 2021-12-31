---
layout:       post
title:        >
    Temporarily switch to a full-screen, hairline cursor
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1095983
type:         Answer
tags:         16.04 cursor
created_date: !!str "2018-11-25 19:01:19"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "10"
favorites:    
views:        !!str "1,778"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

There was a [similar question][1] a couple years ago.

The accept answer has four recommendations:

 - [Magnification in GNOME Shell][1]
 - [Zoom Options Dialog (Universal Access)][2]
 - [Gnome Magnifier Review][3]
 - [Cursor as full screen crosshairs][4]

# Best Choice

All four should be investigated but the third suggestion leads to a promising app: [Zoom Options Dialog (Universal Access)][5]:

[![ZoomOptions_XhairsTab.png][6]][6]

Figure 2. Zoom Options Dialog showing the "Crosshairs" Tab.

## Crosshairs Switch

The switch labelled Crosshairs toggles the display of crosshairs.

## Overlaps mouse cursor

When the Overlaps mouse cursor checkbox is checked, the crosshairs intersect the mouse pointer. When unchecked, the crosshairs end before intersecting the mouse cursor.

## Thickness

The Thickness slider determines the width of the crosshairs. The range is from 1 to 100 pixels.

## Length

The Length slider determines the length of the crosshairs. The range is from very short, through fractions of the size of the screen, to a length that extends to the edges of the screen.

## Color

The color button launches a color chooser dialog to set the color and transparency of the crosshairs. 


----------

# Step by step instructions

[Step by step instructions][7] (using **Gnome 2.2**) were written by the BBC (British Broadcasting Corporation). 

Here are a couple of screenshots accompanying the instructions from that site:

[![orca 1.jpg][8]][8]

[![orca 2.jpg][9]][9]


----------

Ubuntu Wiki has instructions for installing Orca for Unity and Gnome desktop environments [here][10]. However **Unity** DOES NOT have the Assistive Technology features for Magnifier and Cross Hairs. You MUST use Gnome DE for these features. [Source][11]. 

Zoom Options Dialog is part of the [ÆGIS (Ontario) Project][12]. It is funded and supported by the [Ontario Ministry of Economic Development and Innovation][13] and the [ÆGIS (Europe) Project][14]. You can also check these websites for more instructions.


  [1]: https://unix.stackexchange.com/questions/264161/how-can-i-make-fullscreen-cross-hairs-appear-centered-on-the-pointer
  [2]: https://wiki.gnome.org/Projects/GnomeShell/Magnification/ZoomOptionsDialog
  [3]: https://wiki.ubuntu.com/Accessibility/Reviews/gnome-mag
  [4]: https://apple.stackexchange.com/questions/48515/cursor-as-full-screen-crosshairs
  [5]: https://wiki.gnome.org/Projects/GnomeShell/Magnification/ZoomOptionsDialog#Crosshairs_Switch
  [6]: https://i.stack.imgur.com/0rmv2.png
  [7]: http://www.bbc.co.uk/accessibility/guides/magnify/computer/linux/gnome/index.shtml
  [8]: https://i.stack.imgur.com/sHUEd.jpg
  [9]: https://i.stack.imgur.com/X4W7F.jpg
  [10]: https://help.ubuntu.com/community/Accessibility
  [11]: http://www.aegis-project.eu/index.php?option=com_content&view=article&id=209&Itemid=78
  [12]: https://aegis.idrc.ocadu.ca/
  [13]: https://www.ontario.ca/page/ministry-economic-development-job-creation-trade
  [14]: http://www.aegis-project.eu/
