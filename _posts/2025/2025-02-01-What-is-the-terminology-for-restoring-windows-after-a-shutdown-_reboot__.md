---
layout:       post
title:        >
    What is the terminology for restoring windows after a shutdown (reboot)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1540258
type:         Answer
tags:         macosx session eyesome conky
created_date: 2025-02-01 22:46:15
edit_date:    
votes:        "7 "
favorites:    
views:        "964 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2025/2025-02-01-What-is-the-terminology-for-restoring-windows-after-a-shutdown-_reboot__.md
toc:          false
navigation:   false
clipboard:    false
---

I don't know what you universally call it, but I use this python script to open applications and move them to one of three monitors on boot. 

### Notes

- Requires `xdotool` to move windows which isn't available under Wayland
- Does not remember applications, you tell it which applications to open


### autostart script

``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Author: pippim.com
License: GNU GPLv3. (c) 2022-2025
Source: This repository
Description: autostart - Open All GUI applications and position on desktop
"""

from __future__ import print_function  # Must be first import
from __future__ import with_statement  # Error handling for file opens
# from __future__ import unicode_literals  # Not needed.
import warnings  # 'warnings' advises which commands aren't supported
warnings.simplefilter('default')  # in future Python versions.

#       Aug. 04 2023 - Initial version for www.pippim.com publication
#       Nov. 12 2024 - Add HomA (Home Automation)
#       Feb. 01 2025 - Post answer to: https://askubuntu.com/q/1540243/307523


SUDO_PASSWORD = "XXXXXXX"  # Only required for eyesome


import os
import time

OTHERS_TIME = 15  # pycharm open three projects, 60K+ lines
SERVER_TIME = 1.5  # gnome-terminal-server load time
BASHRC_TIME = 1.5  # Seconds to load ~/.bashrc
WINDOW_TIME = .5  # Seconds for window to appear
ACTIVE_WINDOW = ""  # Active Window will receive xdotool keystrokes

commands = ['sleep ' + str(OTHERS_TIME),       # pycharm snap time load time

            'gnome-terminal &',                # Launch terminal in background
            'sleep ' + str(SERVER_TIME),       # Time for terminal server start
            'move 2261 1225',                  # triple monitor setup

            'title "Python 1"',                # Window title (escape spaces)
            'xdotool type "cd ~/python"',      # Python development directory
            'xdotool key Return',              # Enter Key

            'xdotool key Control_L+Shift_L+T',  # Open new terminal tab
            'sleep ' + str(BASHRC_TIME),        # Bash command wait a sec
            'title "Python 2"',                 # Window title (escape spaces)

            'xdotool key Control_L+Shift_L+T',  # Open new terminal tab
            'sleep ' + str(BASHRC_TIME),        # Bash command wait a sec
            'title "Python 3"',                 # Window title (escape spaces)

            # ~/.config/autostart/cursor.desktop calls ~/python/cursor.sh too soon
            '~/python/cursor.sh',              # Large cursor for HDPI monitors

            'nautilus &',                      # Files (file manager) in background
            'sleep ' + str(BASHRC_TIME * 2),   # Bash command wait a sec
            'move 3849 2190',                  # triple monitor setup

            'gnome-terminal &',                # Launch terminal in background
            'sleep ' + str(BASHRC_TIME),       # Bash command wait a sec
            'move 2261 308',                   # triple monitor setup

            'title Dimmer',                    # Window title (escape spaces)
            'xdotool type "sudo /home/rick/eyesome/movie.sh"',
            'xdotool key Return',              # Enter Key
            'sleep .25',                       # Sleep until password prompt
            'xdotool type "' + SUDO_PASSWORD + '"',  # Will not appear in logs
            'xdotool key Return',              # Enter Key

            'xdotool key Control_L+Shift_L+T',  # Open new terminal tab
            'sleep ' + str(BASHRC_TIME),       # Bash command wait a sec
            'xdotool type "cd ~/python"',      # Python development directory
            'xdotool key Return',              # Enter Key
            'title mserve',                    # Window title (escape spaces)

            # Steals focus and keystrokes go to wrong window
            'push',                            # save active window
            'xdotool type "~/python/mmm &"',   # Multiple Monitor Manager
            'xdotool key Return',              # Enter Key
            'sleep ' + str(BASHRC_TIME * 2),   # Bash command two secs
            'move 2080 281',                   # triple monitor setup
            'pop',                             # restore active window

            'push',                            # save active window
            'xdotool type "~/homa/homa.py -f &"',  # HomA - Home Automation (Fast start)
            'xdotool key Return',              # Enter Key
            'sleep ' + str(BASHRC_TIME),       # Bash command wait a sec
            'move 3900 2350',                  # triple monitor setup
            'pop',                             # restore active window

            'xdotool type "~/python/m"',       # Music Player in foreground
            'xdotool key Return']

""" NOTE: To discover window coordinates, use 'wmctrl -lG'. E.G.:

$ wmctrl -lG
0x02a00002 -1 5355 24   410  1392 alien conky (alien)
0x03000003  0 4023 2317 1742 884  alien Mozilla Firefox
0x03c0000a  0 0    0    5790 3240 alien Desktop
0x03000022  0 0    0    1920 1080 alien The New Atlas LIVE: The Duran 
0x03e0004a  0 4377 1264 1377 855  alien website – mserve.md
0x03e00055  0 2858 620  1518 1495 alien mserve – ~/python/autostart
0x0540000a  0 2261 1253 1300 874  alien Python3
0x03c00c65  0 3870 2294 1280 736  alien Home
0x054000fe  0 2261 336  1300 874  alien mserve
0x06400030  0 1968 309  1447 810    N/A Multiple Monitors Manager - mmm
0x06800030  0 2889 78   1455 840    N/A SD Card SanDisk 128GB
0x06800e6e  0 3735 926  1724 813    N/A Playing Favorites - mserve
0x03000043  0 2563 62   900  767  alien Tim-ta run project Laundry — Mozilla Firefox
"""


def process_commands(command_list):
    """ Process commands in command_list """
    for command in command_list:
        if command.endswith('&'):
            # Launch in background and get window ID opened
            active_pid, active_win = launch_command(command)
            if active_pid == 0:
                print("ERROR launching", command, 
                      "Aborting 'autostart' script")
                exit()
        elif command.startswith('move'):
            move_window(command)
        elif command.startswith('title'):
            terminal_title(command)
        elif command.startswith('gedit'):
            gedit()
        elif command == 'push':
            push()
        elif command == 'pop':
            pop()
        else:
            run_and_wait(command)


def launch_command(ext_name):
    """ Launch external command in background and return PID to parent.
        Use for programs requiring MORE than .2 seconds to run. """
    all_pids = get_pids(ext_name)       # Snapshot current PID list
    all_wins = get_wins(all_pids)       # Snapshot of windows open
    new_pids = all_pids                 # Loop while equal
    sleep_count = 0                     # Counter to prevent infinite loops
    ''' Run a Linux command '''
    os.popen(ext_name)                  # Run command in background
    ''' Wait for command to appear in process list (PID) '''
    while new_pids == all_pids:         # Loop until new PID is assigned
        new_pids = get_pids(ext_name)   # Snapshot current PID list
        if sleep_count > 0:             # Don't sleep first time through loop
            time.sleep(.005)            # sleep 5 milliseconds
        sleep_count += 1
        if sleep_count == 1000:         # 5 second timeout
            print('launch_ext_command() ERROR: 5 second timeout reached')
            print('External command name:', ext_name)
            return 0, 0
    ''' List of new PIDs that appeared after os.popen() run to launch command '''
    pid_list = list(set(new_pids) - set(all_pids))
    if not len(pid_list) == 1:
        print('launch_command() ERROR: A new PID could not be found')
        return 0, 0
    ''' List of new Windows after os.popen() run to launch command '''
    time.sleep(WINDOW_TIME)  # Give time for window to appear
    new_wins = get_wins(all_pids)  # Snapshot of windows open
    win_list = list(set(new_wins) - set(all_wins))
    if not len(win_list) == 1:
        ''' The launched process PID is found but it didn't open a window'''
        return int(pid_list[0]), 0
    else:
        ''' Return PID and Window ID of program launched in background '''
        return int(pid_list[0]), int(win_list[0])


def run_and_wait(ext_name):
    """ Launch external command and wait for it to end.
        Use for programs requiring LESS than .2 seconds to run. """
    result = os.popen(ext_name).read().strip()
    return result


def get_pids(ext_name):
    """ Return list of PIDs for program name and arguments
        Whitespace output is compressed to single space """
    # Just grep up to first space in command line. It was failing on !
    prog_name = ext_name.split(' ', 1)[0]
    all_lines = os.popen("ps aux | grep -v grep | grep " + 
                         "'" + prog_name + "'").read().strip().splitlines
    PID = []
    first_line = True
    for line in all_lines():  # Read all PID lines output by 'ps' command
        if first_line:  # Sometimes first line is heading.
            first_line = False  # First line has been found
            continue  # Skip heading, or skip PID #1 which is irrelevant anyway
        single = ' '.join(line.split())  # Compress whitespace into single space
        PID.append(int(single.split(' ', 2)[1]))  # Add PID # to list
    return PID


def get_wins(all_pids):
    """ Return list of all windows open under PID list
        Currently unnecessary because we work on active window """
    windows = []
    for pid in all_pids:
        all_lines = os.popen('xdotool search --pid ' + str(pid)). \
                             read().strip().splitlines
        for line in all_lines():
            windows.append(int(line))
    return windows


def move_window(line):
    """ Move window to x y coordinates on Desktop
        If the letter x or y is passed, that dimension remains unchanged. E.G.:
            xdotool getactivewindow windowmove 100 100    # Moves to 100,100
            xdotool getactivewindow windowmove x 100      # Moves to x,100
            xdotool getactivewindow windowmove 100 y      # Moves to 100,y  """
    line = ' '.join(line.split())       # Compress whitespace to single space
    x = line.split(' ')[-2]
    y = line.split(' ')[-1]
    # We don't need to pass window ID as last active window defaults
    all_lines = os.popen('xdotool getactivewindow windowmove ' + x + ' ' + y). \
        read().strip().splitlines
    for line in all_lines():
        print(line)


def push():
    """ Save active window number """
    global ACTIVE_WINDOW
    ACTIVE_WINDOW = os.popen('xdotool getactivewindow').read().strip()


def pop():
    """ Restore focus to saved window number """
    # noinspection SpellCheckingInspection
    os.popen('xdotool windowfocus ' + ACTIVE_WINDOW).read().strip()


# noinspection SpellCheckingInspection
def terminal_title(new_title):
    """ Rather awkward calling xdotool which chokes on double quotes and bash
        via python which chokes on backslashes.

        Based on the bash function:
            function title() { PS1="${PS1/\\u@\\h: \\w/$@}"; }

        Reference for xdotool keycodes: 
        https://gitlab.com/cunidev/gestures/-/wikis/xdotool-list-of-key-codes """
    title = new_title.split(' ', 1)[1]   # Strip out leading "title" token
    run_and_wait('xdotool type PS1=')
    run_and_wait('xdotool key quotedbl')
    run_and_wait('xdotool type $')
    run_and_wait('xdotool key braceleft')
    run_and_wait('xdotool type PS1/')
    run_and_wait('xdotool key backslash')
    run_and_wait('xdotool key backslash')
    run_and_wait('xdotool type u@')
    run_and_wait('xdotool key backslash')
    run_and_wait('xdotool key backslash')
    run_and_wait('xdotool type "h: "')
    run_and_wait('xdotool key backslash')
    run_and_wait('xdotool key backslash')
    run_and_wait('xdotool type "w/"')
    command = 'xdotool type "' + title + '"'
    run_and_wait(command)
    run_and_wait('xdotool key braceright')
    run_and_wait('xdotool key quotedbl')
    run_and_wait('xdotool key Return')


def gedit():
    """ Load gedit with five most recent files.
        No longer used in favour of pycharm. """
    last_modified_files = gedit_recent_files()
    command = 'gedit '
    for f in last_modified_files:
        # Add each file name to parameter list passed to `gedit`
        command += '"' + f + '" '

    # Open gedit with last five modified files. '&' = run in background
    command = command + ' &'
    active_pid, active_win = launch_command(command)
    if active_pid == 0:
        print("ERROR launching", command,
              "Aborting 'autostart' script")
        exit()


def gedit_recent_files():
    # noinspection SpellCheckingInspection
    """ Get list of gedit 5 most recent files:
    
grep --no-group-separator -B5 'group>gedit' ~/.local/share/recently-used.xbel
 | sed -n 1~6p | sed 's#  <bookmark href="file:///#/#g' | sed 's/"//g'

/home/rick/python/mmm added=2020-05-02T15:34:55Z modified=2020-11-19T00:43:45Z visited=2020-05-02T15:34:56Z>
/home/rick/python/mserve added=2020-07-26T16:36:09Z modified=2020-11-28T01:57:19Z visited=2020-07-26T16:36:09Z>
    """
    # noinspection SpellCheckingInspection
    command = "grep --no-group-separator -B5 'group>gedit' " + \
              "~/.local/share/recently-used.xbel | " + \
              "sed -n 1~6p | sed 's#  <bookmark href=" + '"' + \
              "file:///#/#g' | " + "sed 's/" + '"' + "//g'"

    recent_files = []
    times = []
    all_lines = os.popen(command).read().strip().splitlines
    unique = 1  # gedit can give all open files same time
    for line in all_lines():
        fname = line.split(' added=', 1)[0]
        trailing = line.split(' added=', 1)[1]
        modified = trailing.split(' modified=', 1)[1]
        modified = modified.split('Z', 1)[0]
        d = time.strptime(modified, '%Y-%m-%dT%H:%M:%S')
        epoch = time.mktime(d)
        epoch = int(epoch)
        recent_files.append(fname)

        try:
            times.index(epoch)
            # gedit has given multiple files the same modification time
            epoch += unique
            unique += 1
        except ValueError:
            pass                    # Not a duplicate time
        times.append(epoch)

    N = 5
    top_files = []
    if N > len(times):
        # Less than 5 most recent files in list
        N = len(times)
        if N == 0:
            # No most recent files in list
            return top_files            # return empty list

    # Store list in tmp to retrieve index
    tmp = list(times)
    # Sort list so that largest elements are on the far right
    times.sort()

    #print ('5 most recent from lists and indices')
    for i in range(1, N + 1):
        top_files.append(recent_files[tmp.index(times[-i])])

    return top_files


if __name__ == "__main__":

    process_commands(commands)

# end of autostart

```
