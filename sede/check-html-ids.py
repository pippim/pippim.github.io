#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ==============================================================================
#
#       check-html-ids.py - Catch and fix id= errors.
#
#       Feb. 21 2022 - Initial version.
#
# ==============================================================================

"""


"""

from __future__ import print_function  # Must be first import
from __future__ import with_statement  # Error handling for file opens

import os                   # Test if directory exists

# Same names as stack-to-blog.py uses
EXTRA_SEARCH_FILES = ['../index.md', '../mserve.md', '../mt.md',
                      '../programs.md', '../stack.md']

CONTENTS = "{% include toc.md %}"

#from stack_to_blog import EXTRA_SEARCH_FILES, CONTENTS  # This runs the whole program!
#from stack-to-blog import EXTRA_SEARCH_FILES, CONTENTS  # Syntax error on '-' in name

TOC_id_no = None                # Used to jump to "ToC" button, E.G. int(2)
last_id_no = None               # Used to override "Skip" button E.G. int(25)
id_line_ndxs = None
div_line_ndxs = None


def fatal_error(msg):
    """ Print fatal error and exit program """
    print('#' * 80)
    print('#', ' ' * 31, "FATAL ERROR", ' ' * 32, '#')
    print('#' * 80)
    print('')
    print(msg)
    exit()


def read_file(fname):
    """ Read _config.yml (passed as fname) and return as list of
        lines: config[]
    """

    if not os.path.exists(fname):
        fatal_error("'The file: '" + fname + "' was not found!")

    with open(fname, 'r') as fn:
        all_lines = fn.readlines()
        config = [one_line.rstrip() for one_line in all_lines]

    return config


def update_config():
    """ Update site wide variables in _config.yml

    See: /website/sede/refresh.sh for how file is updated on GitHub Pages

    Key/Value pairs that are updated. Note "_" is a 1/4 space to trick YAML:

    views = 99,999,999_
    views_human = 99.9 million
    refreshed = YYYY-MM-DD HH:MM:SS+0000
    questions = 300_
    answers = 2,172_
    accepted = 469_
    save_blog = 1,122_
    all_tag_counts = 3,342

    """
    return


def process_extra_files():
    """
        Add search words from markdown files.

        EXTRA_SEARCH_FILES = ['../about.md', '../answers.md', ...]

        html_url contains 'https://pippim.github.io'
    """
    file_count = len(EXTRA_SEARCH_FILES)
    print('Processing', file_count, 'extra search files')
    for i, extra in enumerate(EXTRA_SEARCH_FILES):
        print('\n ========== Current Filename:', extra)
        all_lines = read_file(extra)
        pass_1_count = check_lines(all_lines, 0)
        #if pass_1_count != 0:
        #    update_lines(all_lines, pass_1_count)


def check_lines(lines, pass_1_count):
    """
        When pass_1_count = 0 this is first pass so no updating.
        
        When pass_1_count > 0 that is how many id's are in the file.
    """
    global TOC_id_no, last_id_no, id_line_ndxs, div_line_ndxs

    if pass_1_count == 0:
        # This is first pass. Initialize global variables
        TOC_id_no = None
        last_id_no = None
        id_line_ndxs = []
        div_line_ndxs = []

    current_number = 0
    number_of_groups = 0
    in_code_block = False
    last_id = False
    first_id = True
    deprecated_btn = 0

    if pass_1_count == 0:
        check = True
    else:
        check = False


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
            if TOC_id is None:
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
        if current_number == pass_1_count:
            last_id = True

        number = ln.split('"')[1]           # Grab hdrX from line
        number = number.replace('hdr', '')  # Grab X from hdrX
        if current_number != int(number):
            if check:
                print('Current ID number should be:', current_number,
                      ' | But number was:', number)

        if ' class="hdr-btn"' in next_line:
            count = next_line.count(' class="hdr-btn"')
            if check and deprecated_btn == 0:
                error(check, i, number, ln,
                      "Deprecated class 'hdr-btn' found: " + str(count)
                      + " times.", next_line)
            deprecated_btn += count

        if deprecated_btn > 0:
            next_line = next_line.replace(' class="hdr-btn"', '')
            lines[i + 1] = next_line  # Update mutable line in list

        next_line_groups = next_line.split('>  <')
        group_count = len(next_line_groups)

        if possible_TOC_line == CONTENTS:
            TOC_id = True
            TOC_id_no = current_number
        else:
            TOC_id = False

        # The first button bar should have count of 3 (div, ToC and Skip)
        if first_id and group_count != 3:
            error(check, i, number, ln,
                  "First ID group count should be 3 but is: " +
                  str(group_count), next_line_groups)

        # The last button bar should have count of 4 (div, Top, ToS and ToC)
        if last_id and group_count != 4:
            error(check, i, number, ln,
                  "Last ID group count should be 4 but is: " +
                  str(group_count), next_line_groups)

        # The middle button bars should have count of 5 (div, Top, ToS, ToC and Skip)
        # Unless it is a TOC, then it should have count of 4 (div, Top, ToS and Skip)
        if first_id is False and last_id is False:
            if TOC_id is False and group_count != 5:
                error(check, i, number, ln,
                      "Middle ID and no TOC; group count should be 5 but is: " +
                      str(group_count), next_line_groups, possible_TOC_line)
            if TOC_id and group_count != 4:
                error(check, i, number, ln,
                      "Middle ID with TOC; group count should be 4 but is: " +
                      str(group_count), next_line_groups, possible_TOC_line)

        if first_id and last_id:
            print("\nThere is only one ID in file. Aborting...")
            exit()

        # Middle groups should have count of 5 (div, Top, ToS, ToC and Skip)
        # Last group should have count of 4 (div, Top, ToS and ToC)
        #print('group_count:', group_count)

        if next_line_groups[0] != '<div class="hdr-bar"':
            error(check, i, number, ln,
                  'Invalid Group 1[0]: <div class="hdr-bar" expected but found: ' +
                  next_line_groups[0], next_line_groups)
        if next_line_groups[1] != 'a href="#">Top</a':
            if first_id is False:
                error(check, i, number, ln,
                      'Invalid Group 2[1]: a href="#">Top</a expected but found: ' +
                      next_line_groups[1], next_line_groups)

        first_id = False

    last_id_no = current_number

    return current_number  # Count of id's found. Passed back to us next time


def error(check, i, number, ln, line1, line2="", line3=""):
    """ Print error when in check mode. Not in update mode. """
    if check is False:
        return

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
    print('Index:', i, '| Number:', number, '| Line:', ln)


def update_lines(lines, pass_1_count):
    """
        When pass_1_count = 0 this is first pass so no updating.

        When pass_1_count > 0 that is how many id's are in the file.
    """
    global TOC_id_no, last_id_no

    if pass_1_count == 0:
        # This is first pass. Initialize global variables
        TOC_id_no = None
        last_id_no = None

    current_number = 0
    number_of_groups = 0
    in_code_block = False
    last_id = False
    first_id = True
    deprecated_btn = 0

    if pass_1_count == 0:
        check = True
    else:
        check = False

    for i, ln in enumerate(lines):

        ln_strip = ln.lstrip()
        if in_code_block:  # Are we currently in code block?
            if ln_strip.startswith('```'):
                in_code_block = False  # End code block
            continue  # NOTE indent level, always executed
        else:
            if ln_strip.startswith('```'):
                in_code_block = True  # Start code block
                continue

        if ln.startswith('<a id="hdr'):
            next_line = lines[i + 1]
            if TOC_id is None:
                try:
                    possible_TOC_line = lines[i + 2]
                    if possible_TOC_line == "":
                        possible_TOC_line = lines[i + 3]
                except IndexError:
                    possible_TOC_line = ""  # End of file
            number_of_groups += 1
        else:
            continue  # HTML lines are skipped over

        current_number += 1
        if current_number == pass_1_count:
            last_id = True

        number = ln.split('"')[1]  # Grab hdrX from line
        number = number.replace('hdr', '')  # Grab X from hdrX
        if current_number != int(number):
            if check:
                print('Current ID number should be:', current_number,
                      ' | But number was:', number)

        if ' class="hdr-btn"' in next_line:
            count = next_line.count(' class="hdr-btn"')
            if check and deprecated_btn == 0:
                error(check, i, number, ln,
                      "Deprecated class 'hdr-btn' found: " + str(count)
                      + " times.", next_line)
            deprecated_btn += count

        if deprecated_btn > 0:
            next_line = next_line.replace(' class="hdr-btn"', '')
            lines[i + 1] = next_line  # Update mutable line in list

        next_line_groups = next_line.split('>  <')
        group_count = len(next_line_groups)

        if possible_TOC_line == CONTENTS:
            TOC_id = True
            TOC_id_no = current_number
        else:
            TOC_id = False

        # The first button bar should have count of 3 (div, ToC and Skip)
        if first_id and group_count != 3:
            error(check, i, number, ln,
                  "First ID group count should be 3 but is: " +
                  str(group_count), next_line_groups)

        # The last button bar should have count of 4 (div, Top, ToS and ToC)
        if last_id and group_count != 4:
            error(check, i, number, ln,
                  "Last ID group count should be 4 but is: " +
                  str(group_count), next_line_groups)

        # The middle button bars should have count of 5 (div, Top, ToS, ToC and Skip)
        # Unless it is a TOC, then it should have count of 4 (div, Top, ToS and Skip)
        if first_id is False and last_id is False:
            if TOC_id is False and group_count != 5:
                error(check, i, number, ln,
                      "Middle ID and no TOC; group count should be 5 but is: " +
                      str(group_count), next_line_groups, possible_TOC_line)
            if TOC_id and group_count != 4:
                error(check, i, number, ln,
                      "Middle ID with TOC; group count should be 4 but is: " +
                      str(group_count), next_line_groups, possible_TOC_line)

        if first_id and last_id:
            print("\nThere is only one ID in file. Aborting...")
            exit()

        # Middle groups should have count of 5 (div, Top, ToS, ToC and Skip)
        # Last group should have count of 4 (div, Top, ToS and ToC)
        # print('group_count:', group_count)

        if next_line_groups[0] != '<div class="hdr-bar"':
            error(check, i, number, ln,
                  'Invalid Group 1[0]: <div class="hdr-bar" expected but found: ' +
                  next_line_groups[0], next_line_groups)
        if next_line_groups[1] != 'a href="#">Top</a':
            if first_id is False:
                error(check, i, number, ln,
                      'Invalid Group 2[1]: a href="#">Top</a expected but found: ' +
                      next_line_groups[1], next_line_groups)

        first_id = False

    last_id_no = current_number

    return current_number  # Count of id's found. Passed back to us next time


process_extra_files()

# End of check-html-ids.py
