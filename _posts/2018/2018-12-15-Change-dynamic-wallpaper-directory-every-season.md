---
layout:       post
title:        >
    Change dynamic wallpaper directory every season
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1102084
type:         Answer
tags:         scripts wallpaper
created_date: 2018-12-15 14:24:49
edit_date:    2022-01-06 12:14:05
votes:        "3 "
favorites:    
views:        "895 "
accepted:     Accepted
uploaded:     2022-02-13 07:46:52
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-15-Change-dynamic-wallpaper-directory-every-season.md
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Introduction

The basic question is how to do something at the start of Spring, Summer, Fall and Winter. For this I would create a bash script that runs on boot, rather than clogging up `cron` with entries.

I've approached this answer using the OP's question "How do I develop a script?". So I've deviated from usual method of simply posting a bash script and enhanced the answer with:

- References are included within the code. They link to Stack Exchange answers for solving specific problems. For example: How to copy files, How to get day of year, etc.
- A section on "Testing" is provided as it is something we all need to do
- A section on "Enhancements" is provided because software is usually developed in versions where each is incrementally better than the previous version.


----------





<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

# When do seasons start?

From the [Farmer's Almanac][1]:

## Seasons of 2018

| Season | Astronomical Start | Meteorological Start |
| ------ | ------------------ | -------------------- |
| SPRING | Tuesday, March 20, 12:15 P.M. EDT | Thursday, March 1 |
| SUMMER | Thursday, June 21, 6:07 A.M. EDT | Friday, June 1 |
| FALL | Saturday, September 22, 9:54 P.M. EDT | Saturday, September 1 |
| WINTER | Friday, December 21, 5:23 P.M. EST | Saturday, December 1 |


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Convert season start date to Day of Year

For our `bash` script to work we need to know what day of the year each seasons start.

``` bash
$ echo $(date --date="March 20" '+%j')
079
$ echo $(date --date="June 21" '+%j')
172
$ echo $(date --date="Sep 22" '+%j')
265
$ echo $(date --date="Dec 21" '+%j')
355
# Reference: https://unix.stackexchange.com/questions/352176/take-input-arguments-and-pass-them-to-date
## ```




# Create bash script: `season.sh`

Open the terminal using: <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>

Create the directory if it doesn't exist: `mkdir -p ~/bin`

Edit the script using: `gedit ~/bin/season.sh`

- **Note:** Lubuntu user's need to use `leafpad` instead of `gedit`

Copy and paste the following lines into `gedit`:

{% include copyHeader.html %}
``` bash

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# !/bin/bash
# NAME: season.sh
# PATH: ~/bin
# DATE: December 15, 2018

# NOTE: Written for: https://askubuntu.com/questions/1100934/change-dynamic-wallpaper-directory-every-season/1102084#1102084

# User defined variables, change to suit your needs
# Our directory names, lines indented for cosmetic reasons only
SlideShowDir="~/Season Slide Show"
   SpringDir="~/Pictures/Spring Slide Show"
   SummerDir="~/Pictures/Summer Slide Show"
     FallDir="~/Pictures/Fall Slide Show"
   WinterDir="~/Pictures/Winter Slide Show"

CheckTripWire () {
    # Our last season is in "~/Season Slide Show/CurrentSeason"
    LastSeasonFilename="$SlideShowDir"/CurrentSeason
    LastSeason=$(cat "$LastSeasonFilename")
    
    [[ "$LastSeason" == "$Season" ]] && return 0 # Season still the same
    
    # We now know our season has changed.
    
    rm -f "$SlideShowDir"/{*,.*}           # Erase all files in target
    # Reference: https://askubuntu.com/questions/60228/how-to-remove-all-files-from-a-directory
    
    echo "$Season" > "$LastSeasonFilename" # Record new season in target
    
    # Copy new slide show based on season
    if (( "$Season" == SPRING)) ; then
        cp -R "$SpringDir"/. "$SlideShowDir"/
        # Reference: https://stackoverflow.com/questions/3643848/copy-files-from-one-directory-into-an-existing-directory
    elif (( "$Season" == SUMMER)) ; then
        cp -R "$SummerDir"/. "$SlideShowDir"/
    elif (( "$Season" == FALL)) ; then
        cp -R "$FallDir"/. "$SlideShowDir"/
    else
        cp -R "$WinterDir"/. "$SlideShowDir"/
    fi

} # End of CheckTripWire () function.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

# Start of Mainline

DOY=$(date '+%j')                     # DOY = Current Day of Year
# Reference: https://stackoverflow.com/questions/10112453/how-to-get-day-of-the-year-in-shell

if ((DOY>=079 && DOY<172)) ; then
    Season="SPRING"                   # Spring has sprung!
    # Reference: https://stackoverflow.com/questions/12614011/using-case-for-a-range-of-numbers-in-bash
elif ((DOY>=172 && DOY<265)) ; then
    Season="SUMMER"                   # Hit the beach!
elif ((DOY>=265 && DOY<355)) ; then
    Season="FALL"                     # Rake those leaves!
else
    Season="WINTER"                   # Shovel the snow!
fi


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

# Current season establish, now see if we tripped the wire
CheckTripWire

exit 0 # Command not necessary but good habit to signify no Abend.
```

Save the file in `gedit`. Now mark it as executable using:

``` bash
chmod a+x ~/bin/season.sh
```

Next we need to add it to startup applications. Reference: [How do I start applications automatically on login?](How do I start applications automatically on login?)

**Note:** You probably already have your slide show setup in startup applications. You will want to use `season.sh` **BEFORE** your regular slide show as it deletes and copies files which would crash the slide show program if it started first.


----------

# Testing

You will want to test `season.sh` script when you create it and not wait a year to see if it works properly or not. Reference: [Faking the date for a specific shell session](https://serverfault.com/questions/138325/faking-the-date-for-a-specific-shell-session)


----------

# Enhancements

After initially developing a script it is common to enhance it Days, Weeks, Months or even Years later. This section discusses some enhancements you might want to make to `session.sh` down the road.

## Compress files to save disk space

Consider keeping the off-season images compressed in **TAR** (Tape Archive) format to save on disk space. Then replace the `cp` (Copy) command with the `tar` command to uncompress the files. Reference: [23 tar Command Examples For Linux](https://www.rootusers.com/23-tar-command-examples-for-linux/):

For example, we would change:

``` bash
cp -R "$SpringDir"/. "$SlideShowDir"/
```

To:

``` bash
tar -xf "$SpringDir"archive.tar -C "$SlideShowDir"/
```

... and so on for the other seasons.

## Setup variables for season start

Using variables for season start days makes it easier to modify the script and makes the code easier to read (aka *code readability*).

Consider setting up Variables for start of season:

``` bash
SpringStart=079
SummerStart=179
FallStart=265
WinterStart=355
```

Define the variables at the top of the script to make them easier to spot and change. You might want to do this for leap years. You might want to change to "Meteorological" season starts instead of "Astronomical" start dates.

Then change these lines:

``` bash
if ((DOY>=079 && DOY<172)) ; then
elif ((DOY>=172 && DOY<265)) ; then
elif ((DOY>=265 && DOY<355)) ; then
```

To this:

``` bash
if ((DOY>="$SpringStart" && DOY<"$SummerStart")) ; then
elif ((DOY>="$SummerStart" && DOY<"$FallStart")) ; then
elif ((DOY>="$FallStart" && DOY<"$WinterStart")) ; then
```


  [1]: https://www.almanac.com/content/first-day-seasons#







<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a></div>

