---
layout:       post
title:        >
    Remember what files are opened in a session of gedit
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1305654
type:         Answer
tags:         gedit
created_date: 2021-01-07 01:10:42
edit_date:    
votes:        "2 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-08-07 17:32:39
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-01-07-Remember-what-files-are-opened-in-a-session-of-gedit.md
toc:          false
navigation:   false
clipboard:    false
---

A little late to the party but, I wrote a python program to reopen all my applications on reboot. This includes `gedit` and the last five opened files in their own tabs.

Here's the snippet from the program:

``` python

#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''

REQUIRES:

   sudo apt install xdotool
'''
    
from __future__ import print_function           # Must be first import
import os
import time

OTHERS_TIME = 3                                 # Firefox, etc. to load up
SERVER_TIME = 1.5                               # gnome-terminal-server time
BASHRC_TIME = 1.5                               # Seconds to load ~/.bashrc
WINDOW_TIME = .5                                # Seconds fpr window to appear

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
            return 0, 0

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
        Currently unnecessary because we work on active window '''
    windows = []
    for pid in all_pids:
        all_lines = os.popen('xdotool search --pid ' + str(pid)). \
                             read().strip().splitlines
        for l in all_lines():
            windows.append(int(l))

    return windows



def gedit():

    last_modified_files = gedit_recent_files()
    command = 'gedit '
    for f in last_modified_files:
        # Add each file name to parameter list passed to `gedit`
        command += '"' + f + '" '

    # Open gedit with last five modfied files. '&' = run in background
    command=command+' &'
    active_pid, active_win = launch_command(command)
    if active_pid == 0:
        print("ERROR launching", command, \
        "Aborting 'alienstart' script")
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

    gedit()

```

The larger REAL program is more complicated because it opens `gnome-terminal`, changes directory, renames tabs and move windows to one of three monitors. Sometimes the larger program launches programs in the background, sometimes in the foreground. It polls to ensure one program is running (or finished running) before proceeding to the next program.
