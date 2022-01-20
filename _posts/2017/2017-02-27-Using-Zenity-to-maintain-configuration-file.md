---
layout:       post
title:        >
    Using Zenity to maintain configuration file
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/887708
type:         Answer
tags:         command-line bash scripts configuration zenity yad eyesome
created_date: 2017-02-27 05:05:15
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "1,037 "
accepted:     Accepted
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-27-Using-Zenity-to-maintain-configuration-file.md
toc:          false
navigation:   true
clipboard:    true
---

Zenity can only display previous value when there is only one entry field. As such the code below puts the previous values into the label fields and instructs user to type new value into entry fields or leave it blank to keep existing value.


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## The Bash Code




{% include copyHeader.html %}
``` bash
#!/bin/bash

# Read configuration file with entries separated by " " into array
IFS=' ' read -ra CfgArr < ~/bin/adaptive-brightness-configuration-file

# Zenity form with current values in entry label
# because initializing multiple entry data fields not supported
output=$(zenity --forms --title="Laptop Adaptive Brightness Configuration" \
        --text="Enter new settings or leave entries blank to keep (existing) settings" \
   --add-entry="/sys/class/backlight/??????/brightness driver : (${CfgArr[0]})" \
   --add-entry="Day time maximum display brightness : (${CfgArr[1]})" \
   --add-entry="Transition minutes after sunrise to maximum : (${CfgArr[2]})" \
   --add-entry="Night time minimum display brightness : (${CfgArr[3]})" \
   --add-entry="Transition minutes before sunset to minimum : (${CfgArr[4]})")

IFS='|' read -a ZenArr <<<$output # Split zenity entries separated by "|" into array elements

# Update non-blank zenity array entries into configuration array
for i in ${!ZenArr[@]}; do
    if [[ ${ZenArr[i]} != "" ]]; then CfgArr[i]=${ZenArr[i]} ; fi
done

# write configuration file using array (fields automatically separated by " ")
echo "${CfgArr[@]}" > ~/bin/adaptive-brightness-configuration-file
```

I was surprised after hours of googling, examples of this code couldn't be found. Hopefully others googling the same problem can find this code.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

## The Screen

[![adaptive brightness 3][1]][1]

In this answer the `zenity` form has a different order and expanded labels for fields. Although **4882** is maximum for this `intel_backlight` driver it's like staring into the sun and **1000** is practical maximum indoors.

Many thanks to [muru][5] for guidance converting original code from old-style COBOL format using field names, to modern Bash format utilizing arrays.

----------


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# Using `yad` instead of `zenity`

In 2018 I revamped the project and renamed it to [**Eyesome**][2]. Now it uses `yad` which is a super-charged forked version of `zenity`. `yad` uses the same coding style in bash and adds more functionality.

## Notebook support for multiple tabs

Using `yad` you can display current field values plus create forms in tabbed notebook format:

[![eyesome-edit-configuration-general.png][3]][3]

<sub>Whilst writing this answer I noticed the screen was out of date and says `5 to 20 seconds`. I've changed it to say `1 to 20 seconds` for the next publication.</sub>


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## Monitor 3 from the tab list

Here is what Monitor 3 looks like from the tab list:

[![eyesome-edit-configuration-monitor-3.png][4]][4]

Sample code for generating this screen is listed in the next section.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Sample code

The three monitors share a common function to build the bulk of the code. For Monitor 3 we use:

``` bash
# Monitor 3 notebook page
BuildMonitorPage "$CFG_MON3_NDX"
yad --plug=$KEY --tabnum=4 --form \
    "${aMonPage[@]}" > "$res4" &
```

The `BuildMonitorPage` function does the heavy lifting though. Here is what it looks like:


{% include copyHeader.html %}
``` bash
BuildMonitorPage () {
    # Move configuration array monitor 1-3 to Working Screen fields
    # $1 = CfgArr Starting Index Number

    aMonPage=()
    i="$1"
    aMonPage+=("--field=Monitor Number::RO")
    aMonPage+=("${CfgArr[$((i++))]}")

    aMonPage+=("--field=Monitor Status::CB")
    Status=("${CfgArr[$((i++))]}")
    cbStatus="Enabled!Disabled"
    cbStatus="${cbStatus/$Status/\^$Status}"
    aMonPage+=("$cbStatus")

    aMonPage+=("--field=Monitor Type::CB")
    Type=("${CfgArr[$((i++))]}")
    cbType="Hardware!Software"
    cbType="${cbType/$Type/\^$Type}"
    aMonPage+=("$cbType")

    aMonPage+=("--field=Monitor Name:")
    aMonPage+=("${CfgArr[$((i++))]}")
    aMonPage+=("--field=Internal Name:")
    aMonPage+=("${CfgArr[$((i++))]}")
    aMonPage+=("--field=Xrandr Name:")
    aMonPage+=("${CfgArr[$((i++))]}")
    aMonPage+=("--field=Daytime Brightness::NUM")
    aMonPage+=("${CfgArr[$((i++))]}"!0.1..9999!.01!2)
    aMonPage+=("--field=Daytime Red::NUM")
    aMonPage+=("${CfgArr[$((i++))]}"!0.1..2.0!.01!2)
    aMonPage+=("--field=Daytime Green::NUM")
    aMonPage+=("${CfgArr[$((i++))]}"!0.1..2.0!.01!2)
    aMonPage+=("--field=Daytime Blue::NUM")
    aMonPage+=("${CfgArr[$((i++))]}"!0.1..2.0!.01!2)
    aMonPage+=("--field=Nighttime Brightness::NUM")
    aMonPage+=("${CfgArr[$((i++))]}"!0.1..9999!.01!2)
    aMonPage+=("--field=Nighttime Red::NUM")
    aMonPage+=("${CfgArr[$((i++))]}"!0.1..2.0!.01!2)
    aMonPage+=("--field=Nighttime Green::NUM")
    aMonPage+=("${CfgArr[$((i++))]}"!0.1..2.0!.01!2)
    aMonPage+=("--field=Nighttime Blue::NUM")
    aMonPage+=("${CfgArr[$((i++))]}"!0.1..2.0!.01!2)
    aMonPage+=("--field=Current Brightness::RO")
    aMonPage+=("${CfgArr[$((i++))]}")
    aMonPage+=("--field=Current Gamma::RO")
    aMonPage+=("${CfgArr[$((i++))]}")
    
} # BuildMonitorPage
```

Yad will store numbers internally to 6 decimal places by default. During presentation to user you can override the number of decimal places used. In the code above you see:

``` bash
    aMonPage+=("--field=Nighttime Brightness::NUM")
    aMonPage+=("${CfgArr[$((i++))]}"!0.1..9999!.01!2)
```

The last line contains current value from configuration array (`CfgArr`) followed by:

- `0.1` minimum allowed value
- `9999` maximum allowed value
- `.01` step value if user presses up arrow or down arrow to change
- `2` number of decimal places displayed on screen

To see all the screens and read an overview see this **Ask Ubuntu** Answer:

- [Set initial startup background brightness depending on daytime](Set initial startup background brightness depending on daytime)

Visit the `eyesome` github page and download all the bash code here:

- [Set brightness and gamma for three monitors using sunrise and sunset times from internet][2] 


  [1]: https://i.stack.imgur.com/8RL9t.png
  [2]: https://github.com/WinEunuuchs2Unix/eyesome
  [3]: https://i.stack.imgur.com/EOV2y.png
  [4]: https://i.stack.imgur.com/C5YLm.png
  [5]: https://askubuntu.com/users/158442/muru


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a></div>

