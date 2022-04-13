#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ==============================================================================
#
#       check-html-ids.py - Catch and fix id= errors.  Makes life easier
#           inserting new Navigation Bars without having to renumber dozens of
#           existing sections below.
#
#       Feb 21 2022 - Initial version.
#
# ==============================================================================

"""

    Creates a backup of all files that might bne modified.  Must delete the
        existing backups before running program.

"""

from __future__ import print_function  # Must be first import
from __future__ import with_statement  # Error handling for file opens

import os                   # Test if directory exists
import shutil               # Make backup files to .bak extension

# Filenames are relative to program directory "/website/sede"
# answers.md, about.md, hrb.md and programs.md have no section navigation bars
EXTRA_SEARCH_FILES = ['../programs/hyperlink.md', '../index.md',
                      '../programs/mserve.md', '../programs/mt.md',
                      '../programs/stack.md', '../programs/tcm.md',
                      '../programs/timta.md']

CONTENTS = "{% include toc.md %}"

TOC_id_no = None            # Used to jump to "ToC" button, E.G. int(2)
last_id_no = None           # Used to override "Skip" button E.G. int(25)
id_lines = []               # line index where ID number HTML is inserted
div_lines = []              # line index where div line HTML is inserted
lines_changed = 0           # How many lines were changed ID and DIV
classes_changed = 0         # How many classes were changed


def fatal_error(msg):
    """ Print fatal error and exit program """
    print('#' * 80)
    print('#', ' ' * 31, "FATAL ERROR", ' ' * 32, '#')
    print('#' * 80)
    print('')
    print(msg)
    exit()


def read_file(fname):
    """ Read markdown (.md file) and return as list of
        lines: config[]
    """

    fname_bak = fname + ".bak"
    if os.path.exists(fname_bak):
        fatal_error("'The backup file: '" + fname_bak + "' already exists!")

    prt = "  CREATE BACKUP --> Copy: '" + fname + \
          "'  To: '" + fname_bak + "'"
    banner(prt, style=0)
    shutil.copy(fname, fname_bak)

    if not os.path.exists(fname):
        fatal_error("'The file: '" + fname + "' was not found!")

    with open(fname, 'r') as fn:
        all_lines = fn.readlines()
        config = [one_line.rstrip() for one_line in all_lines]

    return config


def save_file(fname, lines):
    """ Save markdown (.md file) using return as list of
        lines: config[]
    """

    if not os.path.exists(fname):
        fatal_error("'The file: '" + fname + "' was not found!")

    """ Write markdown file with updated ID HTML elements """
    with open(fname, 'w') as fh:
        # Write everything
        for ln in lines:
            fh.write(ln + "\n")


# noinspection PyUnboundLocalVariable
def banner(msg, style=1, length=78):
    """
        Print message inside 80 character line draw box

        Pass style of 1, 2 or 3.  Pass 0 to get random style

        Default length is 78 for a message box 80 characters wide.

        Enhancements:   Pass list of messages for multi-line support
    """
    if style == 0:
        import random
        samples = random.sample(range(1, 4), 1)
        style = samples[0]

    print()
    if style == 1:
        nw = '┌'; ns = '─'; ne = '┐'; we = '│'; se = '┘'; sw = '└'
    if style == 2:
        nw = '┏'; ns = '━'; ne = '┓'; we = '┃'; se = '┛'; sw = '┗'
    if style == 3:
        nw = '╔'; ns = '═'; ne = '╗'; we = '║'; se = '╝'; sw = '╚'
    print(nw + ns * length       + ne)
    print(we + msg.ljust(length) + we)
    print(sw + ns * length       + se)


def process_extra_files():
    """
        Add search words from markdown files.

        EXTRA_SEARCH_FILES = ['../about.md', '../answers.md', ...]

        html_url contains 'https://pippim.github.io'
    """

    file_count = len(EXTRA_SEARCH_FILES)
    print('Processing', file_count, 'extra search files')
    for i, extra in enumerate(EXTRA_SEARCH_FILES):
        all_lines = read_file(extra)
        check_lines(all_lines)
        update_lines(all_lines)
        if lines_changed > 0:
            print('lines changed:', lines_changed)
            if classes_changed > 0:
                print('classes changed:', classes_changed)
            # Write changes to disk
            save_file(extra, all_lines)
        else:
            backup_name = extra + '.bak'
            print("   No changes were made to file. Backup file: '" +
                  backup_name + "' removed.")
            os.remove(backup_name)


def check_lines(lines):
    """
        First pass to setup line indexes for <a id="hdrX" tags
        
        Also removes deprecated class="hdr-btn"
    """
    global lines_changed, classes_changed, TOC_id_no, last_id_no, id_lines, div_lines

    # Initialize global variables used in update function
    lines_changed = 0           # How many lines were changed due to class deprecations
    classes_changed = 0         # How many deprecated classes were removed?
    TOC_id_no = None            # ID number for table of contents
    last_id_no = None           # Last ID number on file (usually the footer)
    id_lines = []               # List of line index for each ID number
    div_lines = []              # list of line index for each division (usually ID + 1)

    # local variables
    current_number = 0
    number_of_groups = 0
    in_code_block = False
    first_id = True

    for i, ln in enumerate(lines):

        ln_strip = ln.lstrip()
        if in_code_block:                   # Are we currently in code block?
            if ln_strip.startswith('```'):
                in_code_block = False       # End code block
            continue                        # NOTE indent level, always executed
        else:
            if ln_strip.startswith('```'):
                in_code_block = True        # Start code block
                continue

        if ln.startswith('<a id="hdr'):
            next_line = lines[i + 1]
            # Possible TOC line is always set even if already known
            try:
                possible_TOC_line = lines[i + 2]
                if possible_TOC_line == "":
                    possible_TOC_line = lines[i + 3]
            except IndexError:
                possible_TOC_line = ""      # End of file
            number_of_groups += 1
        else:
            continue                        # HTML lines are skipped over

        current_number += 1

        number = ln.split('"')[1]           # Grab hdrX from line
        number = number.replace('hdr', '')  # Grab X from hdrX
        if current_number != int(number):
            print('Current ID number should be:', current_number,
                  ' | But number was:', number)

        if ' class="hdr-btn"' in next_line:
            count = next_line.count(' class="hdr-btn"')
            if classes_changed == 0:
                error(i, number, ln,
                      "Deprecated class 'hdr-btn' found: " + str(count)
                      + " times.", next_line)
            classes_changed += count
            lines_changed += 1

        if classes_changed > 0:
            next_line = next_line.replace(' class="hdr-btn"', '')
            lines[i + 1] = next_line  # Update mutable line in list

        next_line_groups = next_line.split('>  <')
        group_count = len(next_line_groups)

        if TOC_id_no is None and possible_TOC_line == CONTENTS:
            TOC_id_no = current_number

        # The first button bar should have count of 3 (div, ToC and Skip)
        if first_id and group_count != 3:
            error(i, number, ln,
                  "First ID group count (div + buttons) should be 3 but is: " +
                  str(group_count), next_line_groups)


        # If TOC, then it should have count of 4 (div, Top, ToS and Skip)
        if first_id is False:
            if TOC_id_no == current_number and group_count != 4:
                error(i, number, ln,
                      "TOC line; group count (div + buttons) should be 4 but is: " +
                      str(group_count), next_line_groups, possible_TOC_line)

        # First group on next line should be: '<div class="hdr-bar"'
        if next_line_groups[0] != '<div class="hdr-bar"':
            error(i, number, ln,
                  'Invalid Group 1[0]: <div class="hdr-bar" expected but found: ' +
                  next_line_groups[0], next_line_groups)
            div_lines.append(i)     # The div line will have to be on ID line for now
        else:
            div_lines.append(i+1)   # The div line follows the ID line as it should

        id_lines.append(i)

        # Should always have a "Top" button except on the first ID
        if first_id is False and next_line_groups[1] != 'a href="#">Top</a':
            error(i, number, ln,
                  'Invalid Group 2[1]: a href="#">Top</a expected but found: ' +
                  next_line_groups[1], next_line_groups)

        first_id = False

    last_id_no = current_number


def error(i, number, ln, line1, line2="", line3=""):
    """ Print error messages """
    print('')
    print(line1)
    if line2 != "":
        if isinstance(line2, list):
            # line2[0] = ""  # Blank out '<div class="hdr-bar">  '
            print(line2[1:])
        else:
            print(line2)
    if line3 != "":
        print(line3)
    print('Lines Index:', i, '| ID Number:', number, '| Line:', ln)


def update_lines(lines):
    """
        NOTE: TOC_id_no and last_id_no are globally defined.

        check_lines() function may have set lines_changed already.
    """
    global lines_changed

    if last_id_no < 2:
        print("\nThere are less than 2 ID's in the file. Aborting...")
        exit()

    div_str = '<div class="hdr-bar">'
    end_div = '</div>'
    top_str = '  <a href="#">Top</a>'
    if TOC_id_no is None:
        toc_str = ""
        toc_test = 9999999  # Impossibly large IO number
    else:
        toc_str = '  <a href="#hdr' + str(TOC_id_no) + '">ToC</a>'
        toc_test = TOC_id_no

    for i, id_ndx in enumerate(id_lines):

        div_ndx = div_lines[i]
        old_id_line = lines[id_ndx]
        old_div_line = lines[div_ndx]

        new_id     = '<a id="hdr'    + str(i + 1) + '"></a>'
        tos_str  = '  <a href="#hdr' + str(i)     + '">ToS</a>'
        skip_str = '  <a href="#hdr' + str(i + 2) + '">Skip</a>'
        if i == 0:                  # First ID?
            new_div = div_str + toc_str + skip_str + end_div
        elif i == toc_test - 1:    # TOC ID?
            new_div = div_str + top_str + tos_str + skip_str + end_div
        elif i == last_id_no - 1:   # Last ID?
            new_div = div_str + top_str + tos_str + toc_str + end_div
        else:                       # All other IDs
            new_div = div_str + top_str + tos_str + toc_str + skip_str + end_div

        lines[id_ndx] = new_id

        if div_ndx == id_ndx + 1:
            lines[div_ndx] = new_div
        else:
            # Make two lines out of one because we never found <div> tag
            lines[id_ndx] += "\n" + new_div

        new_id_line = lines[id_ndx]
        new_div_line = lines[div_ndx]
        if old_id_line != new_id_line:
            lines_changed += 1
        if old_div_line != new_div_line:
            lines_changed += 1

        if old_id_line != new_id_line or old_div_line != new_div_line:
            print()
            print('===  OLD  ===:', old_id_line)       # Before changes are made
            print(old_div_line)
            print('===  NEW  ===:', new_id_line)       # Before changes are made
            print(new_div_line)


process_extra_files()

# End of check-html-ids.py
