---
layout:       post
title:        >
    Command-line snake game?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/835994
type:         Answer
tags:         command-line software-recommendation games
created_date: 2016-10-12 09:21:07
edit_date:    2021-12-08 02:56:40
votes:        "8 "
favorites:    
views:        "2,785 "
accepted:     
uploaded:     2025-04-28 15:55:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-12-Command-line-snake-game_.md
toc:          false
navigation:   true
clipboard:    false
---




<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# Centipede

The game is called `centipede` but it's [website](http://wp.subnetzero.org/?p=269) is no longer being maintained. This is a bash game requiring no downloads and an interesting study for those interested in bash scripts.

## Options

You can change the size of the screen to make it smaller and more challenging by changing these variables:

``` bash
LASTCOL=40               # Last col of game area
LASTROW=20               # Last row of game area
```

Check out options for getting "pretty characters":

``` bash
# Prettier characters but not supported
# by all termtypes/locales
#SNAKECHAR="\0256"       # Character to use for snake
#WALLCHAR="\0244"        # Character to use for wall
#APPLECHAR="\0362"       # Character to use for apples
#
# Normal boring ASCII Chars
SNAKECHAR="@"            # Character to use for snake
WALLCHAR="X"             # Character to use for wall
APPLECHAR="o"            # Character to use for apples
```

Remove the comment from the first three code lines and add a comment (`#`) to the last three code lines.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## Complete bash code

Here's the complete code:

``` bash
#!/bin/bash
#
# Centipede game
#
# v2.0
#
# Author: sol@subnetzero.org
#
# Functions

drawborder() {
   # Draw top
   tput setf 6
   tput cup $FIRSTROW $FIRSTCOL
   x=$FIRSTCOL
   while [ "$x" -le "$LASTCOL" ];
   do
      printf %b "$WALLCHAR"
      x=$(( $x + 1 ));
   done

   # Draw sides
   x=$FIRSTROW
   while [ "$x" -le "$LASTROW" ];
   do
      tput cup $x $FIRSTCOL; printf %b "$WALLCHAR"
      tput cup $x $LASTCOL; printf %b "$WALLCHAR"
      x=$(( $x + 1 ));
   done

   # Draw bottom
   tput cup $LASTROW $FIRSTCOL
   x=$FIRSTCOL
   while [ "$x" -le "$LASTCOL" ];
   do
      printf %b "$WALLCHAR"
      x=$(( $x + 1 ));
   done
   tput setf 9
}

apple() {
   # Pick coordinates within the game area
   APPLEX=$[( $RANDOM % ( $[ $AREAMAXX - $AREAMINX ] + 1 ) ) + $AREAMINX ]
   APPLEY=$[( $RANDOM % ( $[ $AREAMAXY - $AREAMINY ] + 1 ) ) + $AREAMINY ]
}

drawapple() {
   # Check we haven't picked an occupied space
   LASTEL=$(( ${#LASTPOSX[@]} - 1 ))
   x=0
   apple
   while [ "$x" -le "$LASTEL" ];
   do
      if [ "$APPLEX" = "${LASTPOSX[$x]}" ] && [ "$APPLEY" = "${LASTPOSY[$x]}" ];
      then
         # Invalid coords... in use
         x=0
         apple
      else
         x=$(( $x + 1 ))
      fi
   done
   tput setf 4
   tput cup $APPLEY $APPLEX
   printf %b "$APPLECHAR"
   tput setf 9
}

growsnake() {
   # Pad out the arrays with oldest position 3 times to make snake bigger
   LASTPOSX=( ${LASTPOSX[0]} ${LASTPOSX[0]} ${LASTPOSX[0]} ${LASTPOSX[@]} )
   LASTPOSY=( ${LASTPOSY[0]} ${LASTPOSY[0]} ${LASTPOSY[0]} ${LASTPOSY[@]} )
   RET=1
   while [ "$RET" -eq "1" ];
   do
      apple
      RET=$?
   done
   drawapple
}

move() {
   case "$DIRECTION" in
      u) POSY=$(( $POSY - 1 ));;
      d) POSY=$(( $POSY + 1 ));;
      l) POSX=$(( $POSX - 1 ));;
      r) POSX=$(( $POSX + 1 ));;
   esac

   # Collision detection
   ( sleep $DELAY && kill -ALRM $$ ) &
   if [ "$POSX" -le "$FIRSTCOL" ] || [ "$POSX" -ge "$LASTCOL" ] ; then
      tput cup $(( $LASTROW + 1 )) 0
      stty echo
      echo " GAME OVER! You hit a wall!"
      gameover
   elif [ "$POSY" -le "$FIRSTROW" ] || [ "$POSY" -ge "$LASTROW" ] ; then
      tput cup $(( $LASTROW + 1 )) 0
      stty echo
      echo " GAME OVER! You hit a wall!"
      gameover
   fi

   # Get Last Element of Array ref
   LASTEL=$(( ${#LASTPOSX[@]} - 1 ))
   #tput cup $ROWS 0
   #printf "LASTEL: $LASTEL"

   x=1 # set starting element to 1 as pos 0 should be undrawn further down (end of tail)
   while [ "$x" -le "$LASTEL" ];
   do
      if [ "$POSX" = "${LASTPOSX[$x]}" ] && [ "$POSY" = "${LASTPOSY[$x]}" ];
      then
         tput cup $(( $LASTROW + 1 )) 0
         echo " GAME OVER! YOU ATE YOURSELF!"
         gameover
      fi
      x=$(( $x + 1 ))
   done

   # clear the oldest position on screen
   tput cup ${LASTPOSY[0]} ${LASTPOSX[0]}
   printf " "

   # truncate position history by 1 (get rid of oldest)
   LASTPOSX=( `echo "${LASTPOSX[@]}" | cut -d " " -f 2-` $POSX )
   LASTPOSY=( `echo "${LASTPOSY[@]}" | cut -d " " -f 2-` $POSY )
   tput cup 1 10
   #echo "LASTPOSX array ${LASTPOSX[@]} LASTPOSY array ${LASTPOSY[@]}"
   tput cup 2 10
   echo "SIZE=${#LASTPOSX[@]}"

   # update position history (add last to highest val)
   LASTPOSX[$LASTEL]=$POSX
   LASTPOSY[$LASTEL]=$POSY

   # plot new position
   tput setf 2
   tput cup $POSY $POSX
   printf %b "$SNAKECHAR"
   tput setf 9

   # Check if we hit an apple
   if [ "$POSX" -eq "$APPLEX" ] && [ "$POSY" -eq "$APPLEY" ]; then
      growsnake
      updatescore 10
   fi
}

updatescore() {
   SCORE=$(( $SCORE + $1 ))
   tput cup 2 30
   printf "SCORE: $SCORE"
}
randomchar() {
    [ $# -eq 0 ] && return 1
    n=$(( ($RANDOM % $#) + 1 ))
    eval DIRECTION=\${$n}
}

gameover() {
   tput cvvis
   stty echo
   sleep $DELAY
   trap exit ALRM
   tput cup $ROWS 0
   exit
}

###########################END OF FUNCS##########################

# Prettier characters but not supported
# by all termtypes/locales
#SNAKECHAR="\0256"                      # Character to use for snake
#WALLCHAR="\0244"                       # Character to use for wall
#APPLECHAR="\0362"                      # Character to use for apples
#
# Normal boring ASCII Chars
SNAKECHAR="@"                           # Character to use for snake
WALLCHAR="X"                            # Character to use for wall
APPLECHAR="o"                           # Character to use for apples
#
SNAKESIZE=3                             # Initial Size of array aka snake
DELAY=0.2                               # Timer delay for move function
FIRSTROW=3                              # First row of game area
FIRSTCOL=1                              # First col of game area
LASTCOL=40                              # Last col of game area
LASTROW=20                              # Last row of game area
AREAMAXX=$(( $LASTCOL - 1 ))            # Furthest right play area X
AREAMINX=$(( $FIRSTCOL + 1 ))           # Furthest left play area X
AREAMAXY=$(( $LASTROW - 1 ))            # Lowest play area Y
AREAMINY=$(( $FIRSTROW + 1))            # Highest play area Y
ROWS=`tput lines`                       # Rows in terminal
ORIGINX=$(( $LASTCOL / 2 ))             # Start point X - use bc as it will round
ORIGINY=$(( $LASTROW / 2 ))             # Start point Y - use bc as it will round
POSX=$ORIGINX                           # Set POSX to start pos
POSY=$ORIGINY                           # Set POSY to start pos

# Pad out arrays
ZEROES=`echo |awk '{printf("%0"'"$SNAKESIZE"'"d\n",$1)}' | sed 's/0/0 /g'`
LASTPOSX=( $ZEROES )                    # Pad with zeroes to start with
LASTPOSY=( $ZEROES )                    # Pad with zeroes to start with

SCORE=0                                 # Starting score

clear
echo "
Keys:

 W - UP
 S - DOWN
 A - LEFT
 D - RIGHT
 X - QUIT

If characters do not display properly, consider changing
SNAKECHAR, APPLECHAR and WALLCHAR variables in script.
Characters supported depend upon your terminal setup.

Press Return to continue
"

stty -echo
tput civis
read RTN
tput setb 0
tput bold
clear
drawborder
updatescore 0

# Draw the first apple on the screen
# (has collision detection to ensure we don't draw
# over snake)
drawapple
sleep 1
trap move ALRM

# Pick a random direction to start moving in
DIRECTIONS=( u d l r )
randomchar "${DIRECTIONS[@]}"

sleep 1
move
while :
do
   read -s -n 1 key
   case "$key" in
   w)   DIRECTION="u";;
   s)   DIRECTION="d";;
   a)   DIRECTION="l";;
   d)   DIRECTION="r";;
   x)   tput cup $COLS 0
        echo "Quitting..."
        tput cvvis
        stty echo
        tput reset
        printf "Bye Bye!\n"
        trap exit ALRM
        sleep $DELAY
        exit 0
        ;;
   esac
done
```


  [1]: http://wp.subnetzero.org/?p=269


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a></div>

