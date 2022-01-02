---
layout:       post
title:        >
    How can I change what's displayed at a login shell?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/434701
type:         Answer
tags:         bash login prompt profile
created_date: 2018-03-31 16:28:12
edit_date:    
votes:        "3 "
favorites:    
views:        "58,468 "
accepted:     
uploaded:     2022-01-02 16:07:48
toc:          true
navigation:   true
clipboard:    true
---

From [Ask Ubuntu][1]:

[![Ubuntu splash screen.png][2]][2]

Check the **Ask Ubuntu** link above for comments and possibly new answers from other users.


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# `now` bash script

The heavy lifting is the splash component that shows this:

``` 
$ now
 
Weather report: Edmonton               March 2018            ┌────────────────────────────┐
                                  Su Mo Tu We Th Fr Sa       │   ┏━┓╺┓  ┏━┓┏━┓   ┏━┓┏┳┓   │
     \   /     Sunny                           1  2  3       │   ┃┃┃ ┃ ╹┏━┛┗━┫   ┣━┛┃┃┃   │
      .-.      -23--14 °C          4  5  6  7  8  9 10       │   ┗━┛╺┻╸╹┗━╸┗━┛   ╹  ╹ ╹   │
   ― (   ) ―   ↘ 22 km/h          11 12 13 14 15 16 17       └────────────────────────────┘
      `-’      14 km              18 19 20 21 22 23 24  
     /   \     0.9 mm             25 26 27 28 29 30 31  
                                                        

```

Yes it really is -14 in Edmonton and feels like -23. A good time to spend the long-weekend inside playing the newly arrived Tomb Raider 2013! Maybe brush up on that Resume to move to Vancouver or Montreal...

Here is the code:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: now
# PATH: $HOME/bin
# DESC: Display current weather, calendar and time
# CALL: Called from terminal or ~/.bashrc
# DATE: Apr 6, 2017. Modified: Mar 30, 2018.

# NOTE: To display all available toilet fonts use this one-liner:
#       for i in ${TOILET_FONT_PATH:=/usr/share/figlet}/*.{t,f}lf; do j=${i##*/}; toilet -d "${i%/*}" -f "$j" "${j%.*}"; done

# Setup for 92 character wide terminal
DateColumn=34 # Default is 27 for 80 character line, 34 for 92 character line
TimeColumn=61 # Default is 49 for   "   "   "   "    61 "   "   "   "

#--------- WEATHER ----------------------------------------------------------

# Current weather, already in color so no need to override
echo " "
# Replace Edmonton with your city name, GPS, etc. See: curl wttr.in/:help
curl wttr.in/Edmonton?0 --silent --max-time 3
# Timeout #. Increase for slow connection---^

```

``` bash
echo " "
echo " "                # Pad with blank lines for calendar & time to fit

#--------- DATE -------------------------------------------------------------

# calendar current month with today highlighted.
# colors 00=bright white, 31=red, 32=green, 33=yellow, 34=blue, 35=purple,
#        36=cyan, 37=white

tput sc                 # Save cursor position.
# Move up 9 lines
while [ $((++i)) -lt 10 ]; do tput cuu1; done

# Depending on length of your city name and country name you will:
#   1. Comment out next three lines of code. Uncomment fourth code line.
#   2. Change subtraction value and set number of print spaces to match
#      subtraction value. Then place comment on fourth code line.

```

``` bash
Column=$(($DateColumn - 10))
tput cuf $Column        # Move x column number
printf "          "     # Blank out ", country" with x spaces
#tput cuf $DateColumn    # Position to column 27 for date display

```

{% include copyHeader.html %}
``` bash

# -h needed to turn off formating: https://askubuntu.com/questions/1013954/bash-substring-stringoffsetlength-error/1013960#1013960
cal -h > /tmp/terminal

CalLineCnt=1
Today=$(date +"%d")
# Prefix with space when length < 2
if [[ ${#Today} < 2 ]] ; then
    Today=" "$Today
fi
printf "\033[32m"   # color green -- see list above.

while IFS= read -r Cal; do
    printf "$Cal"
    if [[ $CalLineCnt > 2 ]] ; then
        # See if today is on current line & invert background
        tput cub 22
        for (( j=0 ; j <= 18 ; j += 3 )) ; do
            Test=${Cal:$j:2}            # Current day on calendar line
            if [[ "$Test" == "$Today" ]] ; then
                printf "\033[7m"        # Reverse: [ 7 m
                printf "$Today"
                printf "\033[0m"        # Normal: [ 0 m
                printf "\033[32m"       # color green -- see list above.
                tput cuf 1
            else
                tput cuf 3
            fi
        done
    fi

    tput cud1               # Down one line
    tput cuf $DateColumn    # Move 27 columns right
    CalLineCnt=$((++CalLineCnt))
done < /tmp/terminal

printf "\033[00m"           # color -- bright white (default)
echo ""

tput rc                     # Restore saved cursor position.

#-------- TIME --------------------------------------------------------------

tput sc                 # Save cursor position.
# Move up 9 lines
i=0
while [ $((++i)) -lt 10 ]; do tput cuu1; done
tput cuf $TimeColumn    # Move 49 columns right

# Do we have the toilet package?
if hash toilet 2>/dev/null; then
    echo " "$(date +"%I:%M %P")" " | \
        toilet -f future --filter border > /tmp/terminal
# Do we have the figlet package?
elif hash figlet 2>/dev/null; then
    echo $(date +"%I:%M %P") | figlet > /tmp/terminal
# else use standard font
else
    echo $(date +"%I:%M %P") > /tmp/terminal
fi

while IFS= read -r Time; do
    printf "\033[01;36m"    # color cyan
    printf "$Time"
    tput cud1               # Up one line
    tput cuf $TimeColumn    # Move 49 columns right
done < /tmp/terminal

tput rc                     # Restore saved cursor position.

exit 0

```


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Prerequisites

For the fancy time display you need to install `toilet`:

``` bash
sudo apt install toilet

```

For another fancy time display (but not quite as fancy) install `figlet`:

``` bash
sudo apt install figlet

```

Otherwise the time will be displayed in "normal" font.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## Weather

Weather is provided by the `curl wttr.in/cityname?0` command. In your terminal use: `curl wttr.in/:help` for additional details.

### Weather: Change city name

You'll want to modify this section of code and change `Edmonton` to your city name:

``` bash
# Replace Edmonton with your city name, GPS, etc. See: curl wttr.in/:help
curl wttr.in/Edmonton?0 --silent --max-time 3
# Timeout #. Increase for slow connection---^

```

Unicode is supported for city names like `/Москва` (Moscow). Airport letters are supported such as `YEG` for Edmonton.

### Weather: Remove country name

When terminal is set for 92 characters wide, the weather displays as "Edmonton, Canada." which is too long for my liking:

[![Weather with country.png][3]][3]

Worse yet when terminal is set for default 80 characters wide:

[![Weather country name 80 chars.png][4]][4]

To circumvent the problem, ", Countryname" is blanked out on the screen with this code:

``` bash
# Depending on length of your city name and country name you will:
#   1. Comment out next three lines of code. Uncomment fourth code line.
#   2. Change subtraction value and set number of print spaces to match
#      subtraction value. Then place comment on fourth code line.
Column=$(($DateColumn - 10))
tput cuf $Column        # Move x column number
printf "          "     # Blank out ", country" with x spaces
#tput cuf $DateColumn    # Position to column 27 for date display

```

If you need help with this part of the script please post comment below for assistance.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Terminal screen width adjustments

Adjust the spacing to your terminal screen width by changing:

``` bash
# Setup for 92 character wide terminal
DateColumn=34 # Default is 27 for 80 character line, 34 for 92 character line
TimeColumn=61 # Default is 49 for   "   "   "   "    61 "   "   "   "

```


----------



<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

# Tying it all together in `~/.bashrc`

Edit your `~/.bashrc` file and add these lines to the bottom:

``` bash
# Splash Calendar and time
now

# ASCII Linux distribution display
screenfetch

```

Save the `~/.bashrc" file changes.

To display the Ubuntu information you need `screenfetch`:

``` bash
sudo apt install screenfetch

```

There are similar display packages to `screenfetch` so shop around!

If you want the same command prompt with "─────────" dividing line between commands, change these lines:

``` bash
if [ "$color_prompt" = yes ]; then
    PS1='───────────────────────────────────────────────────────────────────────────────────────────
${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='───────────────────────────────────────────────────────────────────────────────────────────
${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

```

Note the length of the separator line coincides with width of `screenfetch` output. In this case it is 92 characters wide and `gnome-terminal` preferences are set accordingly.


  [1]: {% post_url /2018/2018-03-30-Terminal-splash-screen-with-Weather,-Calendar,-Time-&-Sysinfo? %}
  [2]: https://i.stack.imgur.com/LY6hT.png
  [3]: https://i.stack.imgur.com/pl1P7.png
  [4]: https://i.stack.imgur.com/43AWN.png


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

