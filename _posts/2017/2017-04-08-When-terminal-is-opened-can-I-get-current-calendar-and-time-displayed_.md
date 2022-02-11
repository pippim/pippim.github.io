---
layout:       post
title:        >
    When terminal is opened can I get current calendar and time displayed?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/901394
type:         Answer
tags:         command-line bash bashrc
created_date: 2017-04-08 00:02:32
edit_date:    2020-06-12 14:37:07
votes:        "9 "
favorites:    
views:        "1,942 "
accepted:     Accepted
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-04-08-When-terminal-is-opened-can-I-get-current-calendar-and-time-displayed_.md
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Improved Version

You can see the improved version here: [https://askubuntu.com/a/1020693/307523](https://askubuntu.com/a/1020693/307523)

It looks like this:

[![Terminal Splash Screen][3]][3]


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

# Original Version



You can print an introduction banner when the terminal is opened using the `~/.bashrc` script. If you have figlet (`sudo apt install figlet`) you can take advantage of large letters to display the time:

[![now][1]][1]

In the first instance `figlet` is used to display the time and in the second a regular font is used.


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Additional screen examples using `toilet`

[![now 3][2]][2]

This screen uses fonts from the `toilet` package. The last example uses `future` font and is used in the code below. Additionally, the calendar is set to cyan color in the code below.

The `toilet` package allows additional font types and formatting styles over the `figlet` package which it is forked from. To install the package use `sudo apt install toilet` after installing `figlet` as described above.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# The code

Here is the code you need to make it all work. It's recommended to place this script in your `/home/user/bin` directory as it is automatically added to your path. This script is named `now` but you can use any unique name you like.



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: now
# PATH: $HOME/bin
# DESC: Display current calendar and time
# CALL: Called from terminal or ~/.bashrc
# DATE: Apr 6, 2017. Modified: Apr 10, 2017.

# NOTE: To display all available toilet fonts use this one-liner:
#       for i in ${TOILET_FONT_PATH:=/usr/share/figlet}/*.{t,f}lf; do j=${i##*/}; toilet -d "${i%/*}" -f "$j" "${j%.*}"; done

# calendar current month with today higlighted.
# colors 00=bright white, 31=red, 32=green, 33=yellow, 34=blue, 35=purple,
#        36=cyan, 37=white
printf "\033[36m"       # color 36=cyan
echo ""; cal;
printf "\033[00m"       # color bright white (default)
echo ""

tput sc                 # Save cursor position.
# Move up 9 lines
while [ $((++i)) -lt 10 ]; do tput cuu1; done
tput cuf 25             # Move 25 columns right

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
    printf "\033[01;32m" # color green
    printf "$Time"
    tput cud1           # Up one line
    tput cuf 25         # Move 25 columns right
done < /tmp/terminal

tput rc                 # Restore saved cursor position.

exit 0
```

### Mark script as executable

Copy this code into your editor and save it to the file `now`. Next mark it as executable using:

``` bash
sudo chmod +x now
```

### Add script to `~./bashrc`

Once this is completed you can type `now` in the terminal and you will see the calendar and time. To wrap it all up and have it automatically displayed each time you open the terminal:

- Edit the file `~/.bashrc`
- Go to the end and insert a new line containing `now`
- Save the file

Now when opening the terminal you will be greeted with the current day highlighted on current month's calendar followed by the current time.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Dissecting the code

Here we'll briefly look at how the code works without discussing every line.

### `figlet` and `toilet` packages

The script first checks if `toilet` is installed with the `hash` command. If so that is used to display time. If not `figlet` is used if installed. If neither are installed a regular font is used.

In the code above a comment can be copied to your command line and executed to show available `figlet` and `toilet` fonts on your terminal:

``` bash
for i in ${TOILET_FONT_PATH:=/usr/share/figlet}/*.{t,f}lf; do j=${i##*/}; toilet -d "${i%/*}" -f "$j" "${j%.*}"; done
```

To change the font used for time display search the code for this line:

``` bash
toilet -f future --filter border > /tmp/terminal
```

and change the font name `future` to the font name you choose. Keep in mind some fonts are too large to fit on the display.

### Selecting colors

Set the color you want for the calendar and the time separately. In the above code, notice the command:

``` bash
printf "\033[36m"       # color 36=cyan
```

Change the last two digits to the color code you want to use. From tinkering with the code I found these values:

> **00**=bright white, **31**=red, **32**=green, **33**=yellow, **34**=blue, **35**=purple, **36**=cyan, **37**=white  

If you find additional color codes please post a comment below or update this answer.


  [1]: https://i.stack.imgur.com/nLPhV.png
  [2]: https://i.stack.imgur.com/MkX4d.png
  [3]: https://i.stack.imgur.com/neTG7.png


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a></div>

