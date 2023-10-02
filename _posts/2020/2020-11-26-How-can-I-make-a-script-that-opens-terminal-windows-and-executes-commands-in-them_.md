---
layout:       post
title:        >
    How can I make a script that opens terminal windows and executes commands in them?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1295328
type:         Answer
tags:         command-line scripts services
created_date: 2020-11-26 02:24:00
edit_date:    2020-11-29 16:40:44
votes:        "2 "
favorites:    
views:        "712,341 "
accepted:     
uploaded:     2023-10-02 01:03:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-11-26-How-can-I-make-a-script-that-opens-terminal-windows-and-executes-commands-in-them_.md
toc:          false
navigation:   false
clipboard:    false
---

Almost a decade late to the party but, here's my answer using Python.

In the `.gif` below I launched the program from an existing terminal with screen recorder running to show what it would look like at login:

[![dellstart.gif][1]][1]

I wrote a python program for this answer. There are some extra features not requested by OP but beneficial to me:

- Runs on autostart to setup GUI applications frequently used after login.
- Opens multiple `gnome-terminal` tabs.
- Assign title to terminal tabs.
- Moves windows to preferred position on desktop.
- Opens `gedit` and last five opened files in separate tabs.


----------


The python program:

``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

#==============================================================================
#
#       dellstart - Autostart GUI applications on Dell Fileserver
#
#==============================================================================

'''
CALL:

   dellstart

REQUIRES:

   sudo apt install xdotool
    
'''

from __future__ import print_function           # Must be first import
import os
import time

BASHRC_TIME = 2                                 # Seconds to load ~/.bashrc
WINDOW_TIME = .5                                # Secpmds fpr window to appear

commands = [ 'gnome-terminal &',                # Launch terminal in background
             'sleep '+str(BASHRC_TIME),         # Bash command wait a sec
             'move x y',                        # Move windows to x and/or y
#             'move 2100 1000',                  # triple monitor setup
             'xdotool type "cd ~"',             # Change to home directory
             'xdotool key Return',              # Enter Key
             'xdotool type "./ssh-activity"',   # Suspend after 15 minutes
             'xdotool key Return',              # Enter Key
             'title SSH\ Activity',             # Window title (escape spaces)
             'xdotool key Control_L+Shift_L+T', # Open new terminal tab
             'sleep '+str(BASHRC_TIME),         # Bash command wait a sec
             'xdotool type "cd ~/askubuntu"',   # Change to working directory
             'xdotool key Return',              # Enter Key
             'title Ask\ Ubuntu',               # Window title (escape spaces)
             'gedit',                           # Last 5 files will open up
             'move x y',                        # Move windows to x and/or y
#             'move 3849 2266',                  # triple monitor setup
           ]

""" NOTE: To discover window coordinates, arrange on desktop and type:

        wmctrl -lG
"""

def process_commands(command_list):

    for command in command_list:

        if command.endswith('&'):
            # Launch in background and get window ID opened
            active_pid, active_win = launch_command(command)
            if active_pid == 0:
                print("ERROR launching", command, \
                "Aborting 'dellstart' script")
                exit()

        elif command.startswith('move'):
            move_window(command, active_win)

        elif command.startswith('title'):
            terminal_title(command)

        elif command.startswith('gedit'):
            gedit()

        else:
            run_and_wait(command)


def launch_command(ext_name):
    ''' Launch external command in background and return PID to parent.
        Use for programs requiring more than .2 seconds to run.
    '''

    all_pids = get_pids(ext_name)       # Snapshot current PID list
    all_wins = get_wins(all_pids)       # Snapshot of windows open
    new_pids = all_pids
    new_wins = all_wins
    sleep_count = 0                     # Counter to prevent infinite loops

    os.popen(ext_name)                  # Run command in background

    while new_pids == all_pids:         # Loop until new PID is assigned
        new_pids = get_pids(ext_name)   # Snapshot current PID list
        if sleep_count > 0:             # Don't sleep first time through loop
            time.sleep(.005)            # sleep 5 milliseconds
        sleep_count += 1
        if sleep_count == 1000:         # 10 second time-out
            print('launch_ext_command() ERROR: max sleep count reached')
            print('External command name:',ext_name)
            return 0

    pid_list = list(set(new_pids) - set(all_pids))
    if not len(pid_list) == 1:
        print('launch_command() ERROR: A new PID could not be found')
        return 0, 0

    time.sleep(WINDOW_TIME)             # Give time for window to appear
    new_wins = get_wins(all_pids)       # Snapshot of windows open
    win_list = list(set(new_wins) - set(all_wins))
    if not len(win_list) == 1:
        #print('launch_command() ERROR: New Window ID could not be found')
        #suppress error message because we aren't using window ID at all
        return int(pid_list[0]), 0

    # Return PID of program we just launched in background
    return int(pid_list[0]), int(win_list[0])


def run_and_wait(ext_name):
    ''' Launch external command and wait for it to end.
        Use for programs requiring less than .2 seconds to run.
    '''

    result = os.popen(ext_name).read().strip()
    #print('run_and_wait() command:', ext_name)
    return result


def get_pids(ext_name):
    ''' Return list of PIDs for program name and arguments
        Whitespace output is compressed to single space
    '''
    all_lines = []
    # Just grep up to first space in command line. It was failing on !
    prog_name = ext_name.split(' ',1)[0]
    all_lines = os.popen("ps aux | grep -v grep | grep " + \
                        "'" + prog_name + "'").read().strip().splitlines
    PID = []
    for l in all_lines():
        l = ' '.join(l.split())         # Compress whitespace into single space
        PID.append(int(l.split(' ', 2)[1]))

    return PID


def get_wins(all_pids):
    ''' Return list of all windows open under PID list
        Currently unncessary because we work on active window '''
    windows = []
    for pid in all_pids:
        all_lines = os.popen('xdotool search --pid ' + str(pid)). \
                             read().strip().splitlines
        for l in all_lines():
            windows.append(int(l))

    return windows


def move_window(line, active_win):
    ''' Move window to x y coorindates on Desktop

        If the letter x or y is passed, that dimension remains unchanged eg:

            xdotool getactivewindow windowmove 100 100    # Moves to 100,100
            xdotool getactivewindow windowmove x 100      # Moves to x,100
            xdotool getactivewindow windowmove 100 y      # Moves to 100,y

    '''
    line = ' '.join(line.split())       # Compress whitespace to single space
    x = line.split(' ')[-2]
    y = line.split(' ')[-1]

    # We don't need to pass window ID as last active window defaults
    all_lines = os.popen('xdotool getactivewindow windowmove ' + x + ' ' + y). \
                         read().strip().splitlines
    for l in all_lines():
        print(l)


def terminal_title(new_title):
    ''' Rather awkward calling xdotool which chokes on double quotes and bash
        via python which chokes on backslashes.

        Simple format (if it worked) would be:
            command = r'PS1="${PS1/\\u@\\h: \\w/' + title + '}"'

        The bash function copied from is:
            function termtitle() { PS1="${PS1/\\u@\\h: \\w/$@}"; }

        Reference for xdotool keycodes: 
        https://gitlab.com/cunidev/gestures/-/wikis/xdotool-list-of-key-codes
    '''

    title = new_title.split(' ', 1)[1]   # Strip out leading "title" token

    command = 'xdotool type PS1='
    run_and_wait(command)
    run_and_wait('xdotool key quotedbl')
    command = 'xdotool type $'
    run_and_wait(command)
    run_and_wait('xdotool key braceleft')
    command = 'xdotool type PS1/'
    run_and_wait(command)
    run_and_wait('xdotool key backslash')
    run_and_wait('xdotool key backslash')
    command = 'xdotool type u@'
    run_and_wait(command)
    run_and_wait('xdotool key backslash')
    run_and_wait('xdotool key backslash')
    command = 'xdotool type "h: "'
    run_and_wait(command)
    run_and_wait('xdotool key backslash')
    run_and_wait('xdotool key backslash')
    command = 'xdotool type "w/"'
    run_and_wait(command)
    command = 'xdotool type "' + title + '"'
    run_and_wait(command)
    run_and_wait('xdotool key braceright')
    run_and_wait('xdotool key quotedbl')
    run_and_wait('xdotool key Return')


def gedit():

    last_modified_files = gedit_recent_files()
    command = 'gedit '
    for f in last_modified_files:
        command=command+'"'
        command=command+f
        command=command+'" '
    # Open gedit with last five modfied files
    command=command+' &'
    active_pid, active_win = launch_command(command)
    if active_pid == 0:
        print("ERROR launching", command, \
        "Aborting 'dellstart' script")
        exit()


def gedit_recent_files():
    ''' Get list of gedit 5 most recent files:
    
grep --no-group-separator -B5 'group>gedit' ~/.local/share/recently-used.xbel | sed -n 1~6p | sed 's#  <bookmark href="file:///#/#g' | sed 's/"//g'

/home/rick/python/mmm added=2020-05-02T15:34:55Z modified=2020-11-19T00:43:45Z visited=2020-05-02T15:34:56Z>
/home/rick/python/mserve added=2020-07-26T16:36:09Z modified=2020-11-28T01:57:19Z visited=2020-07-26T16:36:09Z>

    '''
    command = "grep --no-group-separator -B5 'group>gedit' " + \
              "~/.local/share/recently-used.xbel | " + \
              "sed -n 1~6p | sed 's#  <bookmark href=" + '"' + \
              "file:///#/#g' | " + "sed 's/" + '"' + "//g'"

    recent_files = []
    times = []
    all_lines = os.popen(command).read().strip().splitlines
    uniquifier = 1                  # gedit can give all open files same time
    for l in all_lines():
        fname = l.split(' added=', 1)[0]
        trailing = l.split(' added=', 1)[1]
        modified = trailing.split(' modified=', 1)[1]
        modified = modified.split('Z', 1)[0]
        # TODO: 2038
        d = time.strptime(modified, '%Y-%m-%dT%H:%M:%S')
        epoch = time.mktime(d)
        epoch = int(epoch)
        recent_files.append(fname)

        try:
            times.index(epoch)
            # gedit has given multiple files the same modification time
            epoch += uniquifier
            uniquifier += 1
        except:
            pass                    # Not a duplicate time
        times.append(epoch)

    N=5
    top_files = []
    if N > len(times):
        # Less than 5 most recent files in list
        N = len(times)
        if N == 0:
            # No most recent files in list
            return top_files            # return empty list

    # Store list in tmp to retrieve index
    tmp=list(times)
    # Sort list so that largest elements are on the far right
    times.sort()

    #print ('5 most recent from lists and indices')
    for i in range(1, N+1):
        top_files.append(recent_files[tmp.index(times[-i])])

    return top_files


if __name__ == "__main__":

    process_commands(commands)

# end of dellstart
```


----------


Note you may have to tinker with the variable `BASHRC_TIME` on your system to make program run faster. I have a lot of functions running in my `~/.bashrc` and yours may run a lot faster.

I've planned on writing this for many years but never got around to it until now.

  [1]: https://i.stack.imgur.com/S788m.gif
