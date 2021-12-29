#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ==============================================================================
#
#       stack-to-blog.py - Convert Stack Exchange Answers with a score >= 2 or
#           accepted into a Jekyll blog post.
#
#       Oct. 24 2021 - Initial version.
#       Nov. 06 2021 - Two passes to count number of #, ##, etc. in first pass.
#       Nov. 13 2021 - Add TOC support and SE "<!-- language" conversion.
#       Nov. 17 2021 - Support for Pseudo-tags from keywords in answers.
#       Nov. 24 2021 - Check self-answered questions and not accepted yet.
#       Dec. 04 2021 - Copy fenced code block to clipboard.
#       Dec. 07 2021 - Support 4 space indented code. Convert to fenced block.
#       Dec. 09 2021 - Change SE half-links [https://..] to [link name].
#       Dec. 11 2021 - Minimum number of words since last Navigation Bar.
#       Dec. 18 2021 - Posts by Tag index generation.
#       Dec. 28 2021 - Create posts_by_vote.html
#
# ==============================================================================

"""
    USAGE
    ============================================================================

    Using your Stack Exchange UserID (EG mine is: 4775729), run the
        Stack Exchange Data Explorer query:
        "https://data.stackexchange.com/stackoverflow/query/1505559/
        all-my-posts-on-the-se-network-with-markdown-and-html-content-
        plus-editors-and-s"

    A copy of the query has been saved in pippim.github.io/StackBlogPost. A
    copy of the output file QueryResults.csv can also be found in the same
    root directory.

    Run the query and Save the results in CSV format as QueryResults.csv

    Move query results to your website folder. In Linux use:
        mv ~/Downloads/QueryResults.csv ~/website/sede

    Run ~/website/sede/stack-to-blog.py which will populate "~/website/_posts"
    subdirectory with one Jekyll blog post file for each Stack Exchange
    post that qualifies.

    Each post file begins with:

        ---
        layout: post
        title:  What is the question in Stack Exchange?
        ---

"""

from __future__ import print_function  # Must be first import
from __future__ import with_statement  # Error handling for file opens

from datetime import datetime as dt
# Above for error: datetime.now().strftime("%Y-%m-%d %H:%M:%S")
# AttributeError: 'module' object has no attribute 'now'
# Credit: https://stackoverflow.com/a/32463688/6929343

import csv
from random import randint


"""
    TO-DO
    ============================================================================

    There are long-term TO-DO's littered through out the program. This section is
    for the immediate TO-DO's.

    FIRST TO-DO:

    Build array of all posts front matter stack_URL and corresponding 
    post filename. Prioritize post filename over Stack Exchange reference.
    From example https://stackoverflow.com/a/9195560/6929343 :
    
        [Some Link]({% post_url 2010-07-21-name-of-post %})

    SECOND TO-DO:
    
    Create list of tag substitutions, eg windows-subsystem-for-linux becomes wsl
"""

INPUT_FILE = 'QueryResults.csv'
RANDOM_LIMIT = None         # On initial trials limit the number of blog posts
PRINT_RANDOM = False        # Print out matching random records found
OUTPUT_DIR = "../_posts/"   # Subdirectory name. Use "" for current directory
QUESTIONS_QUALIFIER = True  # Convert questions to blog posts
VOTE_QUALIFIER = 2          # Posts need at least 2 votes to qualify
ACCEPTED_QUALIFIER = True   # All accepted answers are uploaded
PRINT_COLUMN_NAMES = False  # Print QueryResults first row to terminal
PRINT_NOT_ACCEPTED = False  # Print self answered questions not accepted

# Don't confuse above with row 'ACCEPTED' index or the flag 'FRONT_ACCEPTED'

''' Table of Contents (TOC) options. '''
# If TOC is never wanted, set to None
CONTENTS = "{% include toc.md %}"
TOC_HDR_MIN = 6             # Number of Headers required to qualify TOC insert
TOC_WORD_MIN = 1000         # Minimum 1,000 words for TOC
TOC_LOC = 2                 # Insert TOC as 2nd header (Don't go below 2!)

NAV_BAR_OPT = 4             # Insert Navigation Bar into markdown?
''' 0 = No navigation bar
    1 = single line. EG <a id=... </div>
    2 = two lines. EG <a id= then new line then with <div>...</div>
    3 = Option 2 plus empty (blank) line above for readability
    4 = Option 3 plus empty (blank) line above for even more readability
    5 = Option 4 plus comment for ultimate readability

    Note: Markdown compresses all blank lines into a single blank line between
          paragraphs. HTML code inserted simply counts as another blank line to
          be compressed into a single blank line.
'''
NAV_BAR_LEVEL = 2           # Only for "#" or "##". Not for "###", "####", etc.
NAV_FORCE_TOC = True        # Put TOC to navigation bar regardless of "#"
NAV_BAR_MIN = 3             # Minimum number of # & ## headers required
NAV_WORD_MIN = 700          # Minimum 700 words for navigation button bar
NAV_LAST_WORDS = 200        # Minimum of 200 words since last navigation bar to
                            # qualify for a new bar. An image counts as 1,000 words.
NAV_LAST_LINES = 13         # Minimum of 13 lines since last navigation bar. Note
                            # TOC is 1 line and automatically counts as minimum.

''' Copy code block contents to clipboard options. '''
# If Copy button is never wanted, set to None
COPY_TO_CLIPBOARD = "{% include copyHeader.html %}"
COPY_LINE_MIN = 20          # Number of lines required to qualify for button

# If question or answer contains one of these "pseudo tags" then jekyll front
# will have tag added as if it were really on the question. Essentially you
# are tagging your answers and adding them to OP's question tags.
PSEUDO_TAGS = ["conky", "cpuf", "eyesome", "grub", "iconic", "multi-timer", 'vnstat', 'yad']

TAG_MIN_GROUP = 10          # Minimum index page group of posts sorted by Tag Name
TAG_MAX_GROUP = 20          # Maximum index page group of posts sorted by Tag Name
# Unfortunately for the time-being the letter groups must be hand-crafted.
# To assist with hand-crafting print out new_groups[] in gen_post_by_tag_groups()
TAG_LETTERS = [('.', '9'), ('a', 'a'), ('b', 'b'), ('c', 'c'), ('d', 'd'),
               ('e', 'f'), ('g', 'g'), ('h', 'k'), ('l', 'l'), ('m', 'o'),
               ('p', 'r'), ('s', 's'), ('t', 't'), ('u', 'v'), ('w', 'z')]
POST_BY_TAG_HTML = "../_includes/posts_by_tag.html"  # relative to sede directory
POST_BY_VOTE_HTML = "../_includes/posts_by_vote.html"  # relative to sede directory
posts_vote = []  # tuple score, title, our_url

''' SE Sites to exclude from our website '''
EXCLUDE_SITES = ["English Language & Usage", "Politics", "Unix & Linux Meta",
                 "Meta Stack Exchange", "Sports", "Meta Stack Overflow",
                 "Medical Sciences", "Ask Ubuntu Meta"]

''' Initialize Global Variables '''
rows = []                   # Returned rows, less record #1 (field names)
row_count = 0               # How many rows (Answers / Blog posts)
random_row_nos = []         # Random row numbers exported during trail runs
all_tag_counts = 0          # Count of tags used on SE answers

now = dt.now().strftime("%Y-%m-%d %H:%M:%S")

# Copy terminal output of record #1 with column names and paste below.
# Then change names to uppercase and assign each column a 0-based index.
SITE = 0
POST_ID = 1
URL = 2
LINK = 3
TYPE = 4
TITLE = 5
HTML = 6
MARKDOWN = 7
TAGS = 8
CREATED = 9
LAST_EDIT = 10
EDITED_BY = 11
SCORE = 12
FAVORITES = 13
VIEWS = 14
ANSWERS = 15
ACCEPTED = 16
CW = 17
CLOSED = 18

''' Custom Front Matter for Jekyll blog posts

Typical front matter contains:
    ---
    layout: post
    title: How do I make XYZ work in ABC?
    ---

If you change "FRONT_URL = None" below to: "FRONT_URL = stack_url" you get:

    ---
    layout: default
    title: How do I make XYZ work in ABC?
    stack_url: https://askubuntu.com/questions/1039357/
    ---

This allows a button that links to the original Stack Exchange answer 

'''

FRONT_SITE      = "site:         "  # EG "site:         Ask Ubuntu"
FRONT_POST_ID   = None              # EG "post_id:      1104017"
FRONT_URL       = "stack_url:    "  # EG "stack_url:    https://askubuntu.com/q/1104017"
                                    # If selected you MUST select FRONT_SITE & FRONT_TYPE too
FRONT_LINK      = None              # EG "post_link:    https://askubuntu.com/q/1104017|How can I
                                    # send mobile text message from terminal?"
FRONT_TYPE      = "type:         "  # EG "type:         Question"
FRONT_TITLE     = "title:        "  # Always appears in front matter!
FRONT_HTML      = None              # This will NEVER be put into front matter
FRONT_MARKDOWN  = None              # This will NEVER be put into front matter
FRONT_TAGS      = "tags:         "  # EG "tags:         command-line bash sms
FRONT_CREATED   = "created_date: "  # EG "created_date: 2020-01-15 15:21:55"
FRONT_LAST_EDIT = "edit_date:    "  # EG "edit_date:    2020-05-27 17:27:45"
FRONT_EDITED_BY = None              # EG "edit_user:    Community (-1)"
FRONT_SCORE     = "votes:        "  # EG "votes:        64" or blank/nil
FRONT_FAVORITES = "favorites:    "  # EG "favorites:    33" or blank/nil
FRONT_VIEWS     = "views:        "  # EG "views:        72,056" or blank/nil
FRONT_ANSWERS   = None              # EG "answers:      3" or blank/nil
FRONT_ACCEPTED  = "accepted:     "  # EG "accepted:     Accepted" or blank/nil
FRONT_CW        = None              # EG "community:    CW" blank/nil
FRONT_CLOSED    = None              # EG "closed:       Closed" or blank/nil

# Extra front matter generated by `stack-to-blog.py` actions:
FRONT_LAYOUT    = "layout:       post"
# "layout:" MUST be used but "post" can be changed to whatever your site uses
FRONT_UPLOADED  = "uploaded:     "  # Date & Time this program was run
FRONT_TOC       = "toc:          "  # Table of Contents? "true" or "false"
FRONT_NAV_BAR   = "navigation:   "  # Section navigation bar? "true" or "false"
FRONT_CLIPBOARD = "clipboard:    "  # Copy to clipboard button used? "true" or "false"
# Variables below aren't necessary because Liquid has variables
# See: https://stackoverflow.com/a/53251634/6929343
FRONT_LINES     = None  # Number of lines and number of paragraphs are the same thing!
FRONT_PARAGRAPHS = None
FRONT_WORDS     = None
FRONT_READ_TIME = None      # Reading Time = Number of words / 250

'''
Totals for all Stack Exchange posts even those not converted
'''
row_number = 1              # Current row number in query
accepted_count = 0          # How many posts were accepted
question_count = 0          # How many posts are questions
answer_count = 0            # How many posts are answers
unknown_count = 0           # How many posts are unknown, EG wiki-tags
most_lines = 0              # Lines in the longest post
qualifying_blog_count = 0   # How many blogs could be saved
save_blog_count = 0         # How many blogs were saved given random limit

total_views = 0             # Number of times viewed
total_votes = 0             # How many up votes across all posts
total_lines = 0             # Total lines of all posts
total_header_spaces = 0     # Total headers we added a space behind lsat "#"
total_headers = 0           # Total header count
total_quote_spaces = 0      # Total block quotes with two spaces appended
total_paragraphs = 0        # How many paragraphs are there?
total_words = 0             # How many words by splitting whitespace
total_pseudo_tags = 0       # Keywords that qualify as tags for question
total_sites = []            # Post counts by SE site name
total_tag_names = []        # Tag names and counts for all the posts,
                            # Pseudo tags starts the list automatically
total_tag_letters = []      # Tag names first letter (or digit) and counts
tag_posts = []
ACCEPTED_STRING = "✅&ensp;Solution"
#tag_posts.append((str_name, r[TITLE], blog_filename, r[VIEWS, r[SCORE],
#                 accepted, created_date_string]))

total_code_blocks = 0       # How many code blocks are there?
total_block_lines = 0       # How many lines are inside code blocks?
total_code_indents = 0      # How many code indents are there?
total_indent_lines = 0      # How many lines are inside code indents?
total_half_links = 0        # SE uses [https://…] instead of [Post Title]
total_bad_half_links = 0    # SE half-links unresolved - not in this query
total_suppress_nav = 0      # Total Navigation Bars suppressed (< NAV_LAST_WORDS)
total_clipboards = 0        # How many copy to clipboard inserts?
total_copy_lines = 0        # How many code block lines in clipboard inserts?
total_pre_codes = 0         # How many times does <pre><code> appear?
total_header_levels = [0, 0, 0, 0, 0, 0]
total_alternate_h1 = 0      # Alternate H1 lines followed by "=="
total_alternate_h2 = 0      # Alternate H2 lines followed by "--"
total_force_end = 0         # How many last empty lines added?
total_toc = 0               # How many table of contents added?
total_nav_bar = 0           # How many navigation bars added?
total_self_answer = 0       # How many self-answered questions?
total_self_accept = 0       # Of those, how many have been accepted?
self_not_accept_url = []    # List of URLs not accepted
language_forced = 0         # How many times was language fenced?

'''
Totals for single blog post - reinitialized between blog posts
'''
contents = ""               # Not used, placeholder
base_filename = ""          # YYYY-MM-DD-blog-title.md
blog_filename = ""          # OUTPUT_DIR + base_filename
lines = []                  # Markdown lines list being processed
line_index = 0              # Current line index within lines []
header_count = 0            # How many headers were found in blog post
header_space_count = 0      # How many header spaces had to be added after #?
alternate_h1 = 0            # Alternate H1 lines followed by "=="
alternate_h2 = 0            # Alternate H2 lines followed by "--"
''' Counts of header levels - H1, H2 ... H6 '''
header_levels = [0, 0, 0, 0, 0, 0]
paragraph_count = 0         # How many paragraphs in post last one not counted
word_count = 0              # How many words by splitting whitespace
pseudo_tag_count = 0        # Words in answer that qualify as tags for question
pseudo_tag_names = []       # All tag names added for this post
self_answer = False         # Is this a self-answered question?
self_accept = False         # Is this self-answered question accepted?

in_code_block = False       # Are we in a code block? Then no # Header formatting
old_in_code_block = False   # Double duty as old_in_code_indent
code_block_index = 0        # Double duty as code_indent_index
in_code_indent = False
language_used = ""          # What language when fenced code blocks have none?
half_links = 0              # SE uses [https://…] instead of [Post Title]
bad_half_links = 0          # SE half-links unresolved - not in this query
last_nav_index = 0          # Last line index number with navigation bar
last_nav_level = 0
last_nav_TOC = False
suppress_nav_bars = 0       # How many nav bars suppressed in this post?

''' Functions
    ====================================================================
    
    Functions must be defined prior to being called.  The following
    functions are defined:

    dump(r)
    header_space(ln)
    block_quote(ln) 
    check_pseudo_tags(ln) 
    check_code_block(ln) 
    check_code_indent(ln) 
    check_copy_code(line_index)
    navigation_bar(level, skip_btn=True)  
    front_matter(r)
    create_blog_filename()
    check_self_answer(r)
    write_md(md)
    fatal_error(msg)

'''


def dump(r):
    """ Dump contents of one row to terminal in good-looking format
    """
    print('Site:   ', r[SITE], '  |  Post ID:', r[POST_ID], '  |  Type:', r[TYPE])
    print('Title:  ', r[TITLE][:80])
    print('URL:    ', r[URL][:80])
    print('blog:   ', blog_filename)

    limit = r[HTML].find('\n')      # Limit HTML to first line or 80 chars
    if limit > 80 or limit == -1:
        limit = 80
    print('HTML:   ', r[HTML][:limit])

    limit = r[MARKDOWN].find('\n')  # Limit MD to first line or 80 chars
    if limit > 80 or limit == -1:
        limit = 80
    print('MARK_DN:', r[MARKDOWN][:limit])
    print('Created:', r[CREATED], ' |  Edited: ', r[LAST_EDIT],
          ' |  Edited by:', r[EDITED_BY])  # Compensate for time having extra space
    print('Tags In:', r[TAGS], '  |  Tags Out:', tags)
    print('pseudo_tag_count:', pseudo_tag_count,
          '  |  total_pseudo_tags:', total_pseudo_tags)
    print('Votes:  ', r[SCORE], '  |  Views:', r[VIEWS], '  |  Answers:', r[ANSWERS],
          '  |  Accepted:', r[ACCEPTED])
    print('header_count:', header_count, '  |  paragraph_count:', paragraph_count,
          '  |  word_count:', word_count)
    print('Alternate H1:', alternate_h1, '  |  Alternate H2:', alternate_h2,
          '  |  6 Header level counts', header_levels, '\n')


def header_space(ln):
    """ Add space after # for headers if necessary

        Count the number of headers to header_count and header_levels

        If inside fenced code block, ignore # lines and don't count as header.

        Convert alternate H1 and H2 ('==', '--' line follows) to # and ##.
            This will simply things during second pass when navigation bar
            buttons need to be inserted.

    """
    global header_count, header_space_count
    global lines, line_index, header_levels
    global alternate_h1, alternate_h2

    if in_code_block or in_code_indent:
        return ln

    # Kind of silly accepting parameter ln already known to be
    # lines[line_index]
    if line_index == len(lines) - 1:
        return ln  # We are on the last line

    if ln[0:1] == "#":
        #print('Found header:', ln)
        header_count += 1   # For current post, reset between posts
        # How many '#' are there at line start?
        hash_count = len(ln) - len(ln.lstrip('#'))
        if hash_count > 6:
            print('Hash count > 6:', hash_count)
            print('in_code_block:', in_code_block,
                  '| in_code_indent:', in_code_indent)
            if row[URL] == "https://askubuntu.com/q/835994":
                print(row[MARKDOWN])
                print(lines)
            # eg: 2016-10-12-Command-line-snake-game?.md
            #     ###########################END OF FUNCS##########################

            # Shouldn't get this error because inside code indent
            ''' Also at bottom of file:
                    done
        
                    ```
                    
                    ```
                      [1]: http://wp.subnetzero.org/?p=269
                    ```
                    
                    ```
            '''
            dump(row)
            return ln

        # Is first character after "#" a space?
        if ln[hash_count:hash_count+1] != " ":
            #print('Forcing space at:', hash_count, ln)
            ln = ln[0:hash_count] + " " + ln[hash_count:]
            header_space_count += 1
            #print('After forcing:   ', hash_count, ln)

        # Increment count at level
        header_levels[hash_count - 1] += 1

    elif line_index == line_count - 1:
        pass  # Don't go past size of list

    # If current line is empty or starts with < (HTML) skip alternate test
    elif ln == "" or ln[0:1] == "<":
        pass

    elif lines[line_index + 1][0:1] == "=":
        ''' This is an H1 Line because next line is "=="
        '''
        header_count += 1   # For current post, reset between posts
        alternate_h1 += 1
        ln = "# " + ln
        lines[line_index + 1] = ""  # Blank out "=="
        # Increment count at level
        header_levels[0] += 1

    elif lines[line_index + 1][0:2] == "--":
        ''' This is an H2 Line because next line is "--"
            NOTE: Kramdown requires two "--" and a single one won't do.
        '''
        #print(ln)  # Uncomment this and next 2 lines to test alternate H2
        #print(lines[line_index + 1])
        #print(row[URL])

        header_count += 1   # For current post, reset between posts
        alternate_h2 += 1
        ln = "## " + ln
        lines[line_index + 1] = ""  # Blank out "--"
        # Increment count at level
        header_levels[1] += 1

    return ln


def block_quote(ln):
    """ Append two spaces at end of block quote ('>') if necessary

        If inside fenced code block, ignore < lines and don't count as quote.

    """
    global total_quote_spaces

    if in_code_block or in_code_indent:
        return ln

    if ln[0:1] == ">":
        #print('Found block quote:', ln)
        if ln[-2:] != "  ":
            #print('Forcing two spaces after:', ln)
            ln = ln + "  "
            total_quote_spaces += 1

    return ln


def check_half_links(ln):
    """ Scan line for SE half-links where '[https://...]' appears.
        SE half-links support specifying only the URL and SE goes
        out to get the current name for the URL. This only works in
        SE though, not in G-H Pages.

        From: https://meta.stackexchange.com/help/formatting

        There are three ways to write links. Each is easier to read than the last:

            Here's an inline link to [Google](https://www.google.com/).
            Here's a reference-style link to [Google][1].
            Here's a very readable link to [Yahoo!][yahoo].

              [1]: https://www.google.com/
              [yahoo]: https://www.yahoo.com/

        TODO:
            Substitute HREF from SE post to G-H post if it exists.

    """
    global total_half_links, total_bad_half_links, half_links, bad_half_links

    if in_code_block or in_code_indent:
        return ln

    last_start = 0
    print_this = None
    # print_this = "https://askubuntu.com/questions/1039357"

    while True:
        # Search for next half-link after last half-link
        start = ln.find("[https://", last_start)
        if start == -1:
            break  # No more half-links were found

        end = ln.find("]", start)  # Find end of half-link.
        if end == -1:
            print('HALF-LINK start without end')
            last_start = start + 8  # Next link to search for
            continue

        half_link = ln[start+1:end]  # Remove [] wrapper
        parts = half_link.split('/')
        # search = '<a href="' in HTML
        part_search = parts[0] + "//" + parts[2]
        """ Search for:
                <a href="https.../meaning-file?utm_medium=organic&utm_source=
            What exists:
                <a href="https.../meaning-file?utm_medium=organic&amp;utm_sou

            So build a shorter search only containing:
                <a href="https://askubuntu.com/questions/396957/
        
            TODO: Drawback with shorter search is if there are multiple links
                  to the same website and links have > 2 common sub-directories.
        """

        if len(parts) > 3:
            part_search = part_search + "/" + parts[3]
        if len(parts) > 4:
            part_search = part_search + "/" + parts[4]

        html_search = '<a href="' + part_search
        # end-1 can have / which messes up .find
        found_start = row[HTML].find(html_search)
        if found_start == -1:
            print('LINK Not Found:', html_search)
            print(parts)
            print(row[HTML])
            break

        ''' Search for name's starting > '''
        name_start = row[HTML].find('>', found_start)
        failure = "'name_start'"
        name_end = name_start  # For PyCharm error checker
        if name_start != -1:
            name_start += 1  # Skip over >
            failure = None
            ''' Search for name's ending </a> '''
            name_end = row[HTML].find('</a>', name_start)
            if name_end == -1:
                failure = "'name_end'"

        if failure:
            print(failure, 'Not Found:', html_search)
            print(parts)
            print(row[HTML])
            bad_half_links += 1
            total_bad_half_links += 1
            last_start = start + 8
            continue

        # Get link's name
        name = row[HTML][name_start:name_end]

        half_links += 1
        total_half_links += 1
        ln = ln.replace(half_link, name)

        if part_search == print_this:
            print()
            print('PARTS:  ', part_search)
            print('SEARCH: ', html_search)
            print('REPLACE:', '[' + half_link + ']')
            print('WITH:   ', '[' + name + ']')
            print('URL:    ', row[URL])
            print(ln, "\n")

        last_start = start + 8  # Next link to search for

    return ln


def check_tail_links(ln):
    """ Scan line for '  [x]: [https://...]'

        if the https:// reference is to SE answer in Pippim then
        replace it.

    """

    if in_code_block or in_code_indent:
        return ln

    if ln[:3] != "  [":
        return ln

    # Bail out early until code developed
    if ln[:3] == "  [":
        return ln

    return ln


def get_index(search, names):
    """ Find index matching search in names list """
    for name_index, name in enumerate(names):
        if search == name.split('|')[0]:
            return name_index

    return None


def incr_index(name_index, names):
    """ Increment value within "Tag-name|9999"
    """
    str_name, str_value = names[name_index].split('|')
    names[name_index] = str_name + "|" + str(int(str_value) + 1)


def look_index(offset, name_index, names):
    """ Return previous or next name/value pair in list using offset
    """
    ndx = name_index + offset
    if 0 <= ndx < len(names):
        str_name, str_value = names[ndx].split('|')
        return str_name, int(str_value)
    else:
        return None, None



def add_tag_post(name_index, names, r):
    """ Log post detail in tag_posts[] list of tuples. The tuple
        contains:
            1: tag name: grub
            2: post title: How to fix problem?
            3: post blog filename: 2021-12-15-How-to-fix-problem?.md
            4: post views: 99,999
            5: post votes: 99
            6: post accepted: ✅ Solution (or blank if not accepted)
            7: created date
        :param name_index index in names list
        :param names - list of "Tag-name 9999"
        :param r - Row
    """
    global tag_posts, total_tag_letters

    str_name, str_value = names[name_index].split('|')
    if r[TYPE] == "Answer" and r[ACCEPTED] == "Accepted":
        accepted = ACCEPTED_STRING
    else:
        accepted = ""
    post_created_date = r[CREATED]

    s = dt.strptime(post_created_date[:10], "%Y-%m-%d")
    created_date_string = s.strftime('%B %-d, %Y')
    t = (str_name, base_filename, r[TITLE], r[VIEWS], r[SCORE],
         accepted, created_date_string)
    tag_posts.append(t)

    ''' Add to first letter (or digit) of tags '''
    entry = str_name[:1]  # First let (or digit) of tag
    #if entry == ".":
    #    print(entry, tags)
    #if str_name == "ram":
    #    print(str_name, tags)
    entry_ndx = get_index(entry, total_tag_letters)
    if entry_ndx is not None:
        # All the tags added for all the posts
        incr_index(entry_ndx, total_tag_letters)
    else:
        total_tag_letters.append(entry + "|1")

    #if entry == ".":
    #    print(entry, tags)
    #    print(t)


def tally_tags():
    """ Record tags used and how many posts they appear in
        Must be called after pseudo_tag_names calculated for post
        Called between Pass 1 and Pass 2.
    """
    global total_tag_names, all_tag_counts

    for entry in pseudo_tag_names:
        all_tag_counts += 1
        entry_ndx = get_index(entry, total_tag_names)
        if entry_ndx is None:
            print('total_tag_names:', total_tag_names)
            fatal_error("pseudo_tag_name not found: " + entry +
                        " in total_tag_names.")
        # All the tags added for all the posts
        incr_index(entry_ndx, total_tag_names)
        add_tag_post(entry_ndx, total_tag_names, row)

    entries = tags.split()
    for entry in entries:
        all_tag_counts += 1
        entry_ndx = get_index(entry, total_tag_names)
        if entry_ndx is None:
            total_tag_names.append(entry + "|0")
            entry_ndx = len(total_tag_names) - 1
        # All the tags added for all the posts
        incr_index(entry_ndx, total_tag_names)
        add_tag_post(entry_ndx, total_tag_names, row)



def check_pseudo_tags(ln):
    """
        Check if pseudo-tag should be inserted based on keywords list.
        
        If line is empty it means it's a paragraph.  Note if line ends in
        two spaces it forces a new line but not a paragraph break.  Also
        note if three lines were written in a row they would be merged
        into one paragraph.

        FUTURE?: The paragraph number indicates where to insert TOC.

        Count number of words. Check if word qualifies as a pseudo
        tag.

    """
    global total_paragraphs, paragraph_count, total_words, word_count
    global pseudo_tag_count, total_pseudo_tags, pseudo_tag_names

    if len(ln) == 0:
        total_paragraphs += 1   # For all posts
        paragraph_count += 1    # For current post

    ''' Add to word counts '''
    word_list = ln.split()
    count = len(word_list)
    word_count += count
    total_words += count

    ''' Add to pseudo-tags - SE tags (and ours) are always in lower case '''
    for pseudo in PSEUDO_TAGS:
        tag_search = pseudo.lower()
        for word in word_list:
            found = word.lower()
            if found.startswith('`') and found.endswith('`'):
                # `program_name` becomes program_name
                found = found[1:-1]
            if tag_search == found:
                pseudo_tag_count += 1
                total_pseudo_tags += 1
                # A pseudo-tag isn't added if it's already in question tags
                if tag_search not in pseudo_tag_names:
                    if tag_search not in tags:
                        # Pseudo-tag names added for this post's list
                        pseudo_tag_names.append(tag_search)


def check_shebang():
    """ Check shebang's language """
    # Kind of silly accepting parameter ln already known to be
    # lines[line_index]
    if line_index == len(lines) - 1:
        return None  # We are on the last line

    ln = lines[line_index + 1]  # Get next line

    if ln.startswith('#!/bin/') or ln.startswith('#!/usr/bin/env'):
        if "bash" in ln:
            return "bash"
        if "sh" in ln:
            return "sh"
        if "python" in ln:
            return "python"

    return None


def check_code_block(ln):
    """ If line starts with ``` we are now in code block.

        If already in code block and line begins with ```
            then we are now out of code block.

        Set default syntax language when none on code block. SE standard:
            <!-- language: bash -->
            <!-- language-all: lang-bash -->

    """
    global in_code_block, total_code_blocks, language_used, language_forced

    ''' Code blocks may be indented so left strip spaces before test

        NOTE: This test must be done BEFORE check_code_indent() test.    

        To end code block you must use ```.
        
        TODO: count number of backticks that initiate a code block.
              For example ```` (4) can start a code block then if ``` (3)
              appears it doesn't terminate code block but is interpreted
              literally as backticks. EG
              
              This is an example of using fenced code backticks:
              
              ````
              ``` html
              <element code>Stuff stuff stuff</element code>
              ```
              ```` 
    '''

    if in_code_indent:
        return ln

    if ln.startswith("<!-- language"):
        # Get "bash" inside of <!-- language-all: lang-bash -->
        # Store as language_used for inside of code block.
        language_used = ln.split(": ")[1]
        # Strip off " -->" at end of string
        language_used = language_used[:-4]
        if language_used.startswith("lang-"):
            # Strip off "lang-" at start of string
            language_used = language_used[5:]
        if language_used == "none":
            # "none" is best set as "text" for universal recognition
            language_used = "text"

        #print('language_used:', language_used, 'length:', len(language_used))
        return ""  # Former "<!-- language" line is now an empty line

    if ln.lstrip()[0:3] == "```":
        # Add language if not used already
        if in_code_block is False:
            total_code_blocks += 1      # Total for all posts
            in_code_block = True        # Code block has begun
            this_language = language_used
            # Check next line for shebang
            she_language = check_shebang()
            if she_language:
                this_language = she_language
            if ln[-1] == "`" or ln[-1] == " ":
                ln = ln + " " + this_language
                language_forced += 1
        else:
            in_code_block = False       # Code block has ended

    return ln


def check_code_indent(ln):
    """ If line starts with "    " we are now in code indent.

        If already in code indent and line does NOT begin with "    "
            then we are now out of code block.


    """
    global in_code_indent, total_code_indents

    ''' Code blocks may be indented which are called "in_code_indent" here.

        If line begins with four spaces consider it entering a code indent.
        
        TODO: code indents immediately following a ul (unordered list) or 
        li (list item) are not considered a code indent. Neither are code
        indents following another code indent. 

        To end code indent you must use line with no leading space.

        For many ways of SE code blocks see:
        https://medium.com/analytics-vidhya/5-ways-to-embed-code-in-stack-overflow-8d9f38edf02c
    '''

    if in_code_block:
        return ln

    if ln[:4] == "    ":
        # Add language if not used already
        if in_code_indent is False:
            total_code_indents += 1  # Total for all posts
            in_code_indent = True  # Code indent has begun
            # Check next line for shebang
            # #!/bin/sh (shell)
            # #!/bin/bash
            # #!/bin/.... (python anywhere in line)
            this_language = language_used
            # TODO Check past boundary
            she_language = check_shebang()
            if she_language:
                this_language = she_language
            # print('BEFORE ln:', ln)
            ln = "``` " + this_language + "\n" + ln[4:]
            # print('AFTER ln:', ln)
        else:
            ln = ln[4:]     # Remove first four characters
            # print('ln:', ln)
    elif in_code_indent:
        in_code_indent = False  # Code indent has ended
        ln = ln + "\n```\n"  # Add ending code block

    return ln


def check_copy_code(this_index):
    """ Check to insert copy to clipboard include.

        If already in code block and line begins with ```
            then we are now out of code block.

        Set default syntax language when none on code block. SE standard:
            <!-- language: bash -->
            <!-- language-all: lang-bash -->

    """
    global total_block_lines, total_indent_lines
    global old_in_code_block, code_block_index
    global lines, line_count, line_index
    global total_clipboards, total_copy_lines

    inserted_command = ""
    if in_code_block is True or in_code_indent is True:
        if in_code_block:
            total_block_lines += 1
        else:
            total_indent_lines += 1

        # old_in_code_block repurposed for old_in_code_indent as well
        if old_in_code_block is False:
            # Set index for start of code block or code indent
            code_block_index = this_index
            # print('Start code block:', lines[this_index])
    elif old_in_code_block is True:
        # Just ended code block or code indent, how many lines?
        code_block_line_count = this_index - code_block_index
        # Sanity check, lines[index] must contain fenced code block ```
        code = lines[code_block_index]

        # print('  End code block:', lines[this_index])
        if code[0:3] == "```":
            # Copy to clipboard only supported when fenced code
            # block is NOT indented
            if COPY_TO_CLIPBOARD is not None and \
               code_block_line_count >= COPY_LINE_MIN:
                inserted_command = COPY_TO_CLIPBOARD
                total_clipboards += 1
                total_copy_lines += code_block_line_count
        else:
            # The lines[index] fenced code block ``` isn't left justified.
            # Probably within list item and copy to clipboard doesn't work.
            print('Unable to decipher code block:', code)

    if in_code_block or in_code_indent:
        old_in_code_block = True
    else:
        old_in_code_block = False

    return inserted_command


def one_time_change(ln):
    """ One time change for unique situations
    """

    # One time change before SEDE data dump Dec 26/2021
    search_str  = '"|,/,─,\\"'
    replace_str = '`|,/,─,\\`'
    if search_str in ln:
        if now > "2021-12-26":
            return ln  # One time change has been done already
        # print('One Time Change FOUND! now=', now)
        # print(ln)
        # print(search_str, 'has been replaced with:', replace_str)
        ln = ln.replace(search_str, replace_str)

    return ln


''' ==========================  PASS 2 Functions  ========================== '''


def check_last_navigation_bar():
    """ Counts how many words since last navigation bar

        A picture is literally worth 1,0000 words

    """
    global suppress_nav_bars, total_suppress_nav

    if last_nav_index == 0:
        return True  # First navigation bar always included

    if last_nav_TOC:
        # TODO, use sum of header levels for # of TOC lines
        return True  # Always do nav bar after TOC.

    words = 0
    for i in range(last_nav_index, line_index + 1):
        ln = lines[i]
        word_list = ln.split()
        count = len(word_list)
        words += count
        if "[![" in ln:
            words += 1000

    count_lines = line_index - last_nav_index

    if words < NAV_LAST_WORDS and count_lines < NAV_LAST_LINES:
        suppress_nav_bars += 1      # This post
        total_suppress_nav += 1     # All posts
        return False

    return True


def navigation_bar(skip_btn=True):
    """ Return Navigation Bar. Verbosity driven by NAV_BAR_OPT

        The first header doesn't contain "Top" or "ToS" because it is already
        at the top.

        The TOC header doesn't contain option for "ToC" because it is already
        there.

    """
    global last_nav_index, last_nav_level, last_nav_TOC

    last_nav_level += 1
    level = last_nav_level
    last_nav_TOC = False

    bar = ""  # Create new navigation bar

    if NAV_BAR_OPT >= 3:
        bar = bar + "\n"  # Empty line before navigation bar

    bar = bar + '<a id="hdr' + str(level) + '"></a>'
    if NAV_BAR_OPT >= 2:
        bar = bar + "\n"    # ID tag on separate line

    # Calculate jump points
    hdr_ToS = level - 1
    hdr_Skip = level + 1
    bar = bar + '<div class="hdr-bar">'
    # If first Navigation Bar then no Top or Tos
    if level != 1:
        bar = bar + '  <a href="#" class ="hdr-btn">Top</a>'
        bar = bar + '  <a href="#hdr' + str(hdr_ToS) + '" class ="hdr-btn">ToS</a>'

    # TOC button only appears when active and if this isn't the TOC header itself.
    if insert_toc:
        if level != TOC_LOC:
            bar = bar + '  <a href="#hdr' + str(TOC_LOC) + '" class ="hdr-btn">ToC</a>'
        else:
            last_nav_TOC = True

    # Skip button will always appear except on footer
    if skip_btn:
        bar = bar + '  <a href="#hdr' + str(hdr_Skip) + '" class ="hdr-btn">Skip</a>'

    bar = bar + '</div>\n'

    if NAV_BAR_OPT >= 4:
        bar = bar + "\n"

    last_nav_index = line_index
    return bar


def front_matter(r):
    """ Output Jekyll front matter to md string """
    md = "---\n" + FRONT_LAYOUT + "\n"
    md = md + FRONT_TITLE + r[TITLE] + '\n'
    if FRONT_SITE is not None:
        md = md + FRONT_SITE + r[SITE] + '\n'
    if FRONT_URL is not None:
        md = md + FRONT_URL + r[URL] + '\n'
        ''' NOTE: When FRONT_URL is used then FRONT_SITE and FRONT_TYPE must
            also be used because "_layouts/post.html" contains:
              {% if page.stack_url and page.stack_url != "" and page.stack_url != nil %}
                <h2 class="project-tagline"><a href="{{ page.stack_url }}"
                       >🔍 See Original {{ page.type }} on {{ page.site }}</a>
                </h2>
              {% endif %}
        '''
    if FRONT_POST_ID is not None:
        md = md + FRONT_POST_ID + r[POST_ID] + '\n'
    if FRONT_LINK is not None:
        md = md + FRONT_LINK + r[LINK] + '\n'
    if FRONT_TYPE is not None:
        md = md + FRONT_TYPE + r[TYPE] + '\n'

    if FRONT_TAGS is not None:
        md = md + FRONT_TAGS + tags + '\n'

    if FRONT_CREATED is not None:
        md = md + FRONT_CREATED + r[CREATED][:19] + '\n'
    if FRONT_LAST_EDIT is not None:
        md = md + FRONT_LAST_EDIT + r[LAST_EDIT][:19] + '\n'
    if FRONT_EDITED_BY is not None:
        md = md + FRONT_EDITED_BY + r[EDITED_BY] + '\n'
    if FRONT_SCORE is not None:
        if r[SCORE] == "":
            md = md + FRONT_SCORE + r[SCORE] + '\n'
        else:
            md = md + FRONT_SCORE + '{:,}'.format(int(r[SCORE])) + '\n'
    if FRONT_FAVORITES is not None:
        if r[FAVORITES] == "":
            md = md + FRONT_FAVORITES + r[FAVORITES] + '\n'
        else:
            md = md + FRONT_FAVORITES + '{:,}'.format(int(r[FAVORITES])) + '\n'
    if FRONT_VIEWS is not None:
        if r[VIEWS] == "":
            md = md + FRONT_VIEWS + r[VIEWS] + '\n'
        else:
            md = md + FRONT_VIEWS + '{:,}'.format(int(r[VIEWS])) + '\n'
    if FRONT_ANSWERS is not None:
        md = md + FRONT_ANSWERS + r[ANSWERS] + '\n'
    if FRONT_ACCEPTED is not None:
        md = md + FRONT_ACCEPTED + r[ACCEPTED] + '\n'
    if FRONT_CW is not None:
        md = md + FRONT_CW + r[CW] + '\n'
    if FRONT_CLOSED is not None:
        md = md + FRONT_CLOSED + r[CW] + '\n'

    # Extra front matter generated by `stack-to-blog.py` actions:
    md = md + FRONT_UPLOADED + now[:19] + '\n'
    if insert_toc is True:
        jekyll_boolean = "true"
    else:
        jekyll_boolean = "false"
    md = md + FRONT_TOC  + jekyll_boolean + '\n'

    if insert_nav_bar is True:
        jekyll_boolean = "true"
    else:
        jekyll_boolean = "false"
    md = md + FRONT_NAV_BAR + jekyll_boolean + '\n'

    if insert_clipboard is True:
        jekyll_boolean = "true"
    else:
        jekyll_boolean = "false"
    md = md + FRONT_CLIPBOARD + jekyll_boolean + '\n'

    md = md + "---\n\n"

    return md


def create_blog_filename():
    """ Return blog filename.
        Replace all spaces in title with "-"
        Replace all forward slash (/) with ∕ DIVISION SLASH U+2215
    """
    global base_filename

    base_filename = row[CREATED].split()[0] + '-' + row[TITLE] + '.md'
    base_filename = \
        base_filename.replace(' ', '-').replace('/', '-').replace('%', '-').replace('`', '-').replace('"', '%22')
    filename = OUTPUT_DIR + base_filename

    return filename


def check_self_answer(r):
    """ Called for every question.

        If same title exists in an answer this is a self-answered question.

        When self-answered question we skip blogging the question and the
        answer is blogged assuming it reaches the required minimum vote. If
        the answer is accepted (and it should be) it still needs the minimum
        votes.

        An error dump is printed if the question is self-answered but not
        accepted. This happens when answer was forgotten after the 2-day
        waiting period to accept answers had expired.

    """

    global self_answer, self_accept, total_self_answer, total_self_accept
    for search in rows:
        if search[TITLE] == r[TITLE] and search[TYPE] == "Answer":
            self_answer = True  # Is this a self-answered question?
            total_self_answer += 1
            # print('SELF_ANSWERED')
            if search[ACCEPTED] == "Accepted":
                self_accept = True  # Is this self-answered question accepted?
                total_self_accept += 1
                # dump(r)
                # dump(search)
            else:
                # print('NOT ACCEPTED')
                self_not_accept_url.append(search[URL])
                # dump(r)
                # dump(search)


def write_md(md):
    """ Write to SE converted to Jekyll markdown to blog_filename """
    with open(blog_filename, 'w') as fh:
        if force_end_line:
            # Write everything except last character ('\n`)
            fh.write(md[:-1])
        else:
            # Write everything
            fh.write(md)


def fatal_error(msg):
    """ Print fatal error and exit program """
    print('#' * 80)
    print('#', ' ' * 31, "FATAL ERROR", ' ' * 32, '#')
    print('#' * 80)
    print()
    print(msg)
    exit()


''' END OF JOB
    =======================================================================

    - next_group_matches(current, group_list)
    - get_tag_letter_index(letter): Get index in TAG_LETTERS
    - gen_post_by_tag_groups(): Generate list of posts by tags small groups
    - gen_post_by_tag_html(): Generate <details><summary> html code 
    - html_badge(count):
    - html_tag_line(start, end, count):
    - html_details_start(summary):
    - html_write_post_by_tag(html): Write posts by tags HTML page

'''


def get_tag_letter_index(letter):
    """ Return index within TAG_LETTERS for letter passed. """
    for ndx, letters in enumerate(TAG_LETTERS):
        first, last = letters
        if first <= letter <= last:
            #if letter == 'w':
            #    print(ndx, letters, first, letter, last)
            #    exit()
            return ndx
        
    fatal_error("letter: " + letter + ' not found in TAG_LETTERS')


def gen_post_by_vote():
    """ Generate Posts by Tag HTML index using <details><summary>
    """
    posts_vote.sort()
    html = ""
    for i in range(len(posts_vote) - 1, len(posts_vote) - 11, -1):
        vote, title, post_filename = posts_vote[i]
        html += html_post_line(str(vote), post_filename, title, mark_tag=True)

    html_write_post_by_vote(html)


def gen_post_by_tag_groups():
    """ Generate Posts by Tag HTML index using <details><summary>

    INPUT:

    tag_posts[] is list of tuples that contains:
        1: tag name: grub
        2: post blog filename: 2021-12-15-How-to-fix-problem?.md
        3: post title: How to fix problem?
        4: post views: 99,999
        5: post votes: 99
        6: post accepted: ✅ Solution (or blank if not accepted)
        7: last edit: December 16, 2021 (if blank then created date)

    total_tag_letters is list of tuples containing:

        1. First letter (or digit / special character) of Tag name
        2. Count of posts beginning with this Tag letter

    total_tag_names is list of tuples containing:

        1. Tag name
        2. Count of posts with this Tag name

    TAG_MIN_GROUP = 10          # Minimum index page group of posts sorted by Tag Name
    TAG_MAX_GROUP = 20          # Maximum index page group of posts sorted by Tag Name

    TAG_AVG_GROUP is a calculated field in this function

    """

    global tag_posts, total_tag_letters, total_tag_names
    tag_posts.sort()
    total_tag_letters.sort()
    # Force "logitech-unifying" after "logitech"
    total_tag_names = [i.replace('|', ' |') for i in total_tag_names]
    total_tag_names.sort()
    total_tag_names = [i.replace(' |', '|') for i in total_tag_names]

    TAG_AVG_GROUP = TAG_MIN_GROUP + (TAG_MAX_GROUP - TAG_MIN_GROUP) / 2
    # print("TAG_AVG_GROUP:", TAG_AVG_GROUP)  # TESTED WORKING

    letter_group_counts = [0] * len(TAG_LETTERS)  # A-B, C-D-E, F-H, etc.
    prev_tag_index = None
    prev_tag_letter = ""
    prev_tag_name = ""
    prev_tag_spans_many_groups = ""
    tag_letter_index_changed = False
    current_tag_fits = False    # Will current tag fit inside group?
    current_tag_fits_own_group = False  # > TAG_MIN_GROUP
    current_tag_spans_many_groups = False  # > TAG_AVG_GROUP * 2
    this_tag_forced_break = False
    next_tag_fits = False       # Will next tag fit inside group?
    next_tag_fits_own_group = False  # Will next tag fit inside group?

    inner_letter_count = 0
    inner_name_count = 0

    group_count = 0             # Number of <details>> groups
    groups = []                 # Control list of posts in <DETAIL> group
    group_start_name = ""       # First tag name + YYYY-MM-DD in group
    group_start_index = None    # First post_tags[index] in group
    group_end_name = ""         # Last tag name + YYYY-MM-DD in group
    group_end_index = None      # Last post_tags[index] in group
    inner_count = 0             # How many posts added so far in group
    prev_name_count = 0
    tag_name_count = 0
    prev_name = None
    next_name = None
    next_name_count = 0
    tag_letter = None
    tag_letter_count = 0
    tag_index = None

    for post_index, post in enumerate(tag_posts):
        # parse post tuple into named fields
        tag_name, post_filename, title, view, votes, accepted, \
            created_date_string = post

        tag_letter_index_changed = False
        force_break = False
        break_rule = None  # Undocumented rule force group break
        keep_rule = None  # Keep next > TAG_AVG but <= TAG_MAX

        # When tag name changes see what fits in this group and next group
        if tag_name != prev_tag_name:
            tag_name_index = get_index(tag_name, total_tag_names)
            tag_name_count = int(total_tag_names[tag_name_index].split('|')[1])

            tag_letter = tag_name[:1]
            # tag_letter_index and tag_letter_count are not used
            tag_letter_index = get_index(tag_letter, total_tag_letters)
            tag_letter_count = int(total_tag_letters[tag_letter_index].split('|')[1])

            # Use previous and next counts to massage number of posts in group
            prev_name, prev_name_count = \
                look_index(-1, tag_name_index, total_tag_names)
            if prev_name_count is None:
                prev_name_count = 0

            next_name, next_name_count = \
                look_index(+1, tag_name_index, total_tag_names)
            if next_name_count is None:
                next_name_count = 0

            if tag_letter != prev_tag_letter:
                inner_letter_count = 0

            inner_name_count = 0
            this_tag_forced_break = False

            # Has letter group changed?
            # It changes see what fits in this group of posts and next group
            tag_index = get_tag_letter_index(tag_letter)
            if tag_index != prev_tag_index and prev_tag_index is not None:
                tag_letter_index_changed = True
                prev_name_count = 0
                prev_tag_spans_many_groups = False
            else:
                prev_tag_spans_many_groups = current_tag_spans_many_groups


            # Some debugging
            if 169 <= group_count <= 168:  # Adjust when wanted
                print()
                print('TAG:', tag_name, 'BEFORE:', 'current_tag_fits:', current_tag_fits,
                      ' | next_tag_fits:', next_tag_fits)
                print('inner_count + tag_name_count < TAG_MAX_GROUP:',
                      inner_count, tag_name_count, TAG_MAX_GROUP)
                #print('prev_name_count:', prev_name_count,
                #      '| next_name_count:', next_name_count)  # TESTED & WORKING

            if inner_count + tag_name_count <= TAG_AVG_GROUP:
                current_tag_fits = True
            else:
                current_tag_fits = False

            current_tag_fits_own_group = False
            if TAG_MIN_GROUP <= tag_name_count <= TAG_MAX_GROUP:
                current_tag_fits_own_group = True

            current_tag_spans_many_groups = False  # > TAG_AVG_GROUP * 2
            if tag_name_count > TAG_MAX_GROUP:
                current_tag_spans_many_groups = True

            if inner_count + tag_name_count + next_name_count <= TAG_AVG_GROUP:
                next_tag_fits = True
            else:
                next_tag_fits = False

            next_tag_fits_own_group = False
            if next_name_count >= TAG_MIN_GROUP:
                next_tag_fits_own_group = True
            if 169 <= group_count <= 168:  # Adjust when wanted
                print('AFTER:', 'current_tag_fits:', current_tag_fits,
                      ' | next_tag_fits:', next_tag_fits,
                      ' | next_tag_fits_own_group:', next_tag_fits_own_group)
                print('current_tag_spans_many_groups:', current_tag_spans_many_groups,
                      ' | prev_tag_spans_many_groups:', prev_tag_spans_many_groups)
                print('next_name_count:', next_name_count,
                      ' | inner_count:', inner_count,
                      ' | inner_name_count:', inner_name_count)
                print('tag_name_index:', tag_name_index,
                      ' | prev_name:', prev_name,
                      ' | prev_name_count:', prev_name_count)
                print('tag_index:', tag_index,
                      ' | prev_tag_index:', prev_tag_index,
                      ' | letter_group_counts[tag_index]:',
                      letter_group_counts[tag_index])
                print()
        else:
            # Tag name has not changed. Optional debug printing.
            if 152 <= group_count <= 151:  # Adjust when wanted
                print('Non-Breaking TAG:', tag_name, 'current_tag_fits:', current_tag_fits,
                      ' | Keep rule:', keep_rule)
                print('current_tag_spans_many_groups:', current_tag_spans_many_groups,
                      ' | prev_tag_spans_many_groups:', prev_tag_spans_many_groups)
                print('next_name_count:', next_name_count,
                      ' | inner_count:', inner_count,
                      ' | inner_name_count:', inner_name_count)
                print()

        if tag_letter_index_changed:
            force_break = True
            break_rule = 0

        elif current_tag_fits:
            # If the current tag fits, don't overflow previous large group
            if inner_count <= prev_name_count >= TAG_MIN_GROUP:
                # (29, 'apt 2016-08-29', 378, 'apt 2018-08-14', 392, 15)
                # (30, 'apt', 393, 'ascii', 412, 20)
                if not this_tag_forced_break:
                    force_break = True
                    break_rule = 1
                    this_tag_forced_break = True
            # If the current tag fits, don't spill over into next group
            elif inner_count + tag_name_count - inner_name_count > TAG_AVG_GROUP:
                force_break = True
                break_rule = 2
            elif prev_tag_spans_many_groups:
                force_break = True
                break_rule = 3
            else:
                force_break = False

        # The current tag doesn't fit the group, decide where to break group
        elif current_tag_spans_many_groups and prev_tag_name != tag_name:
            force_break = True
            break_rule = 4

        elif current_tag_spans_many_groups and inner_count >= TAG_AVG_GROUP:
            remaining = tag_name_count - inner_name_count
            if remaining <= TAG_MAX_GROUP - TAG_AVG_GROUP:
                keep_rule = 1
            else:
                force_break = True
                break_rule = 5

        elif inner_count >= TAG_AVG_GROUP:
            # Why aren't we forcing a break in all situations???
            remaining = tag_name_count - inner_name_count
            if remaining + inner_count <= TAG_MAX_GROUP and prev_tag_name == tag_name:
                keep_rule = 2
                if 27 <= group_count <= 26:
                    print()
                    print('keep-rule: 2 using: remaining + TAG_AVG_GROUP <= TAG_MAX_GROUP:')
                    print(remaining, TAG_AVG_GROUP, TAG_MAX_GROUP)
                    print('tag_name_count:', tag_name_count, 'inner_name_count:',
                          inner_name_count, 'inner_count:', inner_count)
                    print('prev_tag_name != ', prev_tag_name, 'tag_name:', tag_name)
            else:
                force_break = True
                break_rule = 666

            # Following are unreachable because they are ineffective now
            #if not current_tag_fits_own_group and tag_name_count > TAG_MIN_GROUP:
            #    force_break = True
            #    break_rule = 6
            #if inner_count >= TAG_MAX_GROUP:
            #    force_break = True
            #    break_rule = 7
            #if inner_count + tag_name_count - inner_name_count >= TAG_MAX_GROUP:
            #    force_break = True
            #    break_rule = 8
            #if prev_tag_spans_many_groups:
            #    force_break = True
            #    break_rule = 9

        elif current_tag_fits_own_group and prev_tag_name != tag_name:
            force_break = True
            break_rule = 10

        elif prev_tag_spans_many_groups and prev_tag_name != tag_name:
            force_break = True
            break_rule = 11

        elif next_tag_fits_own_group and current_tag_fits_own_group is False\
                and inner_count + tag_name_count - inner_name_count > TAG_MAX_GROUP\
                and not (current_tag_spans_many_groups or current_tag_fits_own_group):
            # Special rule for:
            # (33, 'automation', 425, 'background-process', 436, 12)
            # (34, 'backlight', 437, 'backlight', 445, 9)
            # (35, 'backup', 446, 'backup', 459, 14)
            if not this_tag_forced_break:
                force_break = True
                break_rule = 12
                this_tag_forced_break = True

        if force_break:
            group_count += 1
            t = (group_count, group_start_name, group_start_index,
                 group_end_name, group_end_index, inner_count)
            groups.append(t)
            if 169 <= group_count <= 168:  # Adjust start/end when wanted
                print('tag_name:', tag_name, ' | current_tag_fits:', current_tag_fits,
                      ' | current_tag_fits_own_group:', current_tag_fits_own_group)
                print('current_tag_spans_many_groups:', current_tag_spans_many_groups,
                      ' | prev_tag_spans_many_groups:', prev_tag_spans_many_groups)
                print('prev_tag_name:', prev_tag_name, ' | prev_name_count:',
                      prev_name_count, ' | prev_name:', prev_name)
                print('next_name:', next_name, ' | next_name_count:',
                      next_name_count, ' | next_tag_fits:', next_tag_fits)
                print("group_count:",  group_count, " | group_start_name:",
                      group_start_name, " | group_start_index:", group_start_index)
                print("group_end_name:", group_end_name, " | group_end_index:",
                      group_end_index, " | inner_count:", inner_count)
                print('tag_name_count:', tag_name_count, " | next_name_count:",
                      next_name_count, ' | break_rule:', break_rule)
                print()

            inner_count = 0  # Reset

        if inner_count == 0:
            group_start_name = tag_name + " " + post_filename[:10]
            group_start_index = post_index

        if "." <= tag_letter <= " ":           # TESTED WORKING
            if tag_letter != prev_tag_letter:
                print('Starting tag letter:', tag_letter.ljust(20), 'expected:', tag_letter_count)
            if tag_name != prev_tag_name:
                print('  Starting tag name:', tag_name.ljust(20), 'expected:', tag_name_count)

        prev_tag_index = tag_index
        prev_tag_name = tag_name
        prev_tag_letter = tag_letter
        inner_name_count += 1
        inner_letter_count += 1
        inner_count += 1
        letter_group_counts[tag_index] += 1
        # Set default in case next read starts a new group or this is EOL
        group_end_name = tag_name + " " + post_filename[:10]
        group_end_index = post_index

    # Last group still in buffer
    if group_count >= 1:
        t = (group_count, group_start_name, group_start_index,
             group_end_name, group_end_index, inner_count)
        groups.append(t)

    ''' Hand-crafting tag letter groups.
    '''
    # Uncomment below to get needed data to hand-craft TAG_LETTERS.
    print('group_count:', group_count)
    for group_ndx, group in enumerate(groups):
        hold_count = group_count
        group_count = group_ndx + 1
        if 169 <= group_count <= 168:  # Adjust when wanted
            group_no, start, start_ndx, end, end_ndx, count = group
            print(group)
        group_count = hold_count  # Awkward recycling so same test is used

    for i in range(370, 369):
        print(total_tag_names[i])

    ''' BUILD new_groups WITH MASSAGED TEXT
        ==========================================================================
        
        new_groups same structure as groups

    '''
    # Remove suffixes from names that don't span at least two groups
    new_groups = []
    last_end = "$as$@#%23 1234"  # Something never a tag name
    for group_ndx, group in enumerate(groups):
        group_no, start, start_ndx, end, end_ndx, count = group
        start_name, start_suffix = start.split()
        end_name, end_suffix = end.split()

        if start_name != end_name:
            start = start_name
            end = end_name
        # start name is equal to end name, but is it a name spanning only one group?
        else:
            last_name = last_end.split()[0]
            if start_name != last_name:
                if group_ndx < len(groups) - 1:
                    next_group = groups[group_ndx + 1]
                    next_start = next_group[1].split()[0]
                    # print(next_start)  # TESTED WORKING
                    if end_name != next_start:
                        start = start_name
                        end = end_name

        t = (group_no, start, start_ndx, end, end_ndx, count)
        new_groups.append(t)
        last_end = end

    ''' USE new_groups LIST TO BUILD HTML IN _includes/post_by_tags.html
        ======================================================================

    '''

    html = ""
    total_group_count = 0
    for letter_index, letter_group in enumerate(TAG_LETTERS):
        group_count = letter_group_counts[letter_index]
        if group_count == 0:
            continue  # No post groups under this letter group

        # Write out <details><summary>tag</summary>\n\n
        group_start, group_end = letter_group
        tag_line = html_tag_line(group_start, group_end, group_count)

        # FROM: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#customizing_the_disclosure_widget
        html += html_details_start(tag_line)
        # Now find groups of posts beginning with this letter / these letters
        fake_group_count = 0  # Currently not traversing a made up fake group

        for group in new_groups:
            group_no, start, start_ndx, end, end_ndx, count = group
            letter = start[:1]
            if letter < group_start:
                continue                # Skip to letter start
            if letter > group_end:
                break                   # Past letter end

            total_group_count += 1

            # Does tag span many groups?

            # Make tag spanning many groups of posts a parent
            # Note that 2+ ranges  are combined into new sub-group. For example:
            # (251, 'upgrade 2016-08-13', 3420, 'upgrade 2018-04-29', 3434, 15)
            # (252, 'upgrade 2018-04-29', 3435, 'upgrade 2019-07-09', 3449, 15)
            # (253, 'upgrade 2019-07-20', 3450, 'upgrade 2019-12-15', 3458, 9)
            # becomes:
            # (None, 'upgrade', 251, 'upgrade', 253, 39)
            # (251, '2016-08-13', 3420, '2018-04-29', 3434, 15)
            # (252, '2018-04-29', 3435, '2019-07-09', 3449, 15)
            # (253, '2019-07-20', 3450, '2019-12-15', 3458, 9)

            # Write posts with href
            if fake_group_count == 0:
                fake_group_count, fake_post_count = test_fake_group(group_no, new_groups)
                if fake_group_count > 1:
                    html += expand_fake_groups(group_no, new_groups,
                                               fake_group_count, fake_post_count)
                else:
                    fake_group_count = 0
                    mark_tag = start != end
                    html += html_posts(start, start_ndx, end, end_ndx, count, mark_tag)
            else:
                fake_group_count -= 1

        #print('letter_index:', letter_index, 'letter_group:', letter_group,
        #      'group count:', group_count)

        # Write out </p></details> end tag
        html += html_details_end()

    if total_group_count != len(new_groups):
        print('total_group_count:', total_group_count,
              'len(new_groups):', len(new_groups))
        # fatal_error('total_count != len(new_groups)')
    #print(html)
    html_write_post_by_tag(html)


def test_fake_group(group_no, groups):
    """
    Does tag span many groups? If so we'll create pseudo group of groups.

    Return the number of groups and total number of posts if true. Otherwise,
    return 0, 0.
     
    :param group_no: Group number within groups list
    :param groups: List of
    :return: True if tag spans many groups, False if not
    """
    group_count = post_count = 0
    group_no, start, start_ndx, end, end_ndx, count = groups[group_no - 1]
    if " " not in start or " " not in end:
        return group_count, post_count

    our_group = start.split()[0]
    while True:
        if " " not in start or " " not in end:
            return group_count, post_count

        if our_group != end.split()[0]:
            return group_count, post_count
    
        if group_no >= len(groups):
            return group_count, post_count

        group_no += 1
        group_count += 1
        post_count += count

        group_no, start, start_ndx, end, end_ndx, count = groups[group_no - 1]
        if " " not in start or " " not in end:
            return group_count, post_count
        if start.split()[0] != our_group:
            return group_count, post_count


def expand_fake_groups(group_no, groups, fake_group_count, fake_post_count):

    html = ""   # Start with empty html
    # print("expanding group_no:", group_no)
    our_group_no = group_no
    group_no, start, start_ndx, end, end_ndx, count = groups[group_no - 1]
    our_group_name = start.split()[0]
    tag_line = html_tag_line(our_group_name, our_group_name, fake_post_count)

    html += html_details_start(tag_line)

    for fake_group_ndx in range(0, fake_group_count):
        group_no, start, start_ndx, end, end_ndx, count = \
            groups[our_group_no - 1 + fake_group_ndx]

        # Write out <details><summary>tag</summary>\n\n
        group_name = start.split()[0]
        if group_name != our_group_name:
            break
        group_start = start.split()[1]
        group_end = end.split()[1]

        # Try using regular processing
        html += html_posts(group_start, start_ndx, group_end, end_ndx, count,
                           mark_tag=False, details="Dates: ")

    # Write out </p></details> end tag
    html += html_details_end()

    return html


def html_posts(start, start_ndx, end, end_ndx, count,
               mark_tag=False, details=None):

    html = ""  # Start with empty html

    # Write out <details><summary>tag</summary>\n\n
    tag_line = html_tag_line(start, end, count, details)
    html = html_details_start(tag_line) + "<p>\n"

    # details of posts with href
    for i in range(start_ndx, end_ndx + 1):
        tag_name, post_filename, title, view, votes, accepted, \
            created_date_string = tag_posts[i]
        html += html_post_line(tag_name, post_filename, title, mark_tag=mark_tag)

    # Write out </p></details> end tag
    html += "</p>" + html_details_end()

    return html


def html_badge(count):
    """ Make HTML badge. Requires css styling in assets/css/style.scss:

    param badge_count: integer value
    return HTML string
    """

    return '&ensp;&ensp;<span class="badge">' + str(count) + '</span>'


def html_tag_line(start, end, count, details=None):
    """ Build tag line 'TAGS x ⟶ y (count)

    param start = starting tag
    param end = ending tag
    param count = tag count for badge
    """
    badge = html_badge(count)
    if details is not None:
        t_line = details + "<mark>" + start + "</mark> ⟶ <mark>" + \
                 end + "</mark>" + badge
    elif start != end:
        t_line = "TAGS: <mark>" + start + "</mark> ⟶ <mark>" + \
                 end + "</mark>" + badge
    else:
        t_line = "TAG: <mark>" + start + "</mark>" + badge

    return t_line


def html_post_line(tag_name, post_filename, title, mark_tag=False):
    """ Build post reference line
    """
    opt_tag = ""
    if mark_tag:
        opt_tag = "<mark>" + tag_name + "</mark>"

    # Fix " in title: # https://meta.stackexchange.com/a/21557/366359
    title = title.replace('<', '&lt;')
    # Convert post_filename to html filename
    html_filename = \
        post_filename.replace('-', '/', 3).replace('.md', '.html')
    return opt_tag + '<a href="' + html_filename + '">' + title + '</a><br />\n'


def html_details_start(summary):
    """ One extra blank line after summary to please Kramdown. """
    return '<details class="dtl"><summary>' + summary + "</summary>\n\n"


def html_details_end():
    return "</details>\n\n"


def html_write_post_by_vote(html):
    """ Write posts by tags HTML page """
    with open(POST_BY_VOTE_HTML, 'w') as fh:
        # Write everything
        fh.write(html)


def html_write_post_by_tag(html):
    """ Write posts by tags HTML page """
    with open(POST_BY_TAG_HTML, 'w') as fh:
        # Write everything
        fh.write(html)


''' INITIALIZATION
    =======================================================================

    - Sanity Check on front matter
    - Read S.E.D.E. CSV file and convert to Python list: rows []
    - Ensure file is not empty
    - Set Random Record Limit list 
'''

# Bailout if incompatible front matter picked
if not FRONT_LAYOUT.startswith('layout:'):
    fatal_error('FRONT_LAYOUT does not begin with "layout:". CONTENT IS: '
                + FRONT_LAYOUT)
if FRONT_URL is not None:
    # FRONT_SITE and FRONT_TYPE required by: _includes/page.html
    if FRONT_SITE is None:
        fatal_error('When FRONT_URL is used then FRONT_SITE is required.')
    if FRONT_TYPE is None:
        fatal_error('When FRONT_URL is used then FRONT_TYPE is required.')

# Read CSV file into list
with open(INPUT_FILE) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        # The first row are column headings / field names
        if row_count == 0:
            # We don't want column headings in rows list
            if PRINT_COLUMN_NAMES:
                print('Column names\n', row)
        else:
            # rows list contains all rows except first row
            rows.append(row)
        row_count += 1

    #print('Total rows:', row_count)

# If less than 2 records consider an empty file
row_count = len(rows)
if row_count < 2:
    fatal_error('No CSV records found in INPUT_FILE:' + INPUT_FILE)

# Number of blog posts converted controlled by RANDOM_LIMIT
if RANDOM_LIMIT is not None:
    random_row_nos = [randint(1, row_count) for p in range(0, RANDOM_LIMIT)]
    if RANDOM_LIMIT < 100:
        print('RANDOM_LIMIT:', RANDOM_LIMIT,
              'Random record numbers to convert:', random_row_nos)

''' Initialize Total Tag Names with Pseudo-Tags '''
for tag in PSEUDO_TAGS:
    total_tag_names.append(tag + "|0")


''' MAIN LOOP to process All query records
    ======================================

    - Match criteria for answer up votes or accepted check mark
    - Check if in fenced code block (``` bash) for example. If not then:
        - Reformat '#Header 1' to '# Header 1'. Same for "##H2" to "## H2", etc.
        - Count number of '#' header lines
        - Count number of lines, paragraphs and number of words.
        - Tally counts at header levels [H1, H2, H3, H4, H5 and H6]
        - Add two spaces after "< Block Quote" lines

    - Second pass to insert '{% include toc.md %}' at paragraph # (TOC_LOC)
    - Anytime a TOC is inserted, following header_index []
        entries and bump index number up by 1
    - Insert Navigation Bar Buttons: 
        HTML anchors for #hdr1, #hdr2. etc. Then apply "<a href" links for:
        Top, ToS, ToC and, Skip (Top of Page, Top of Section, Table of
        Contents and, Skip section).  
    - If RANDOM_LIMIT is used then only output matching random_rec_nos []
'''

for row in rows:

    row_number += 1
    ''' Reset counters for each stack exchange Q&A '''
    save_blog = True        # Default until a condition turns it off
    lines = []              # Markdown lines list being processed
    line_index = 0          # Current line index within lines []
    header_count = 0        # How many headers were found in blog post
    header_space_count = 0  # How many spaces had to be added after #?
    ''' Counts of header levels - H1, H2 ... H6 '''
    header_levels = [0, 0, 0, 0, 0, 0]
    paragraph_count = 0     # How many paragraphs (headers count as 2) in post
    word_count = 0          # How many words (includes "## ") in post
    pseudo_tag_count = 0    # Words in answer that qualify as tags for question
    pseudo_tag_names = []   # Reset pseudo tag names from last post
    language_used = ""      # What language when fenced code blocks have none?
    in_code_block = False   # In a code block # Header formatting is skipped
    old_in_code_block = False
    code_block_index = 0
    in_code_indent = False
    half_links = 0          # SE uses [https://…] instead of [Post Title]
    bad_half_links = 0      # SE half-links unresolved - not in this query
    last_nav_index = 0      # Last line index number with navigation bar
    last_nav_level = 0
    last_nav_TOC = False
    suppress_nav_bars = 0   # How many nav bars suppressed in this post?
    force_end_line = False  # Did Pass #1 force an empty blank line at end?
    self_answer = False     # Is this a self-answered question?
    self_accept = False     # Is this self-answered question accepted?

    ''' Tally SE Site Name counts'''
    site_name = row[SITE]
    site_ndx = get_index(site_name, total_sites)
    if site_ndx is None:
        # First time add the site name to list with count of 0
        total_sites.append(site_name + "|0")
        site_ndx = len(total_sites) - 1
    # Increment post count for current SE site name
    incr_index(site_ndx, total_sites)

    ''' YYYY-MM-DD-Title-with-spaces-converted-to-dashes.md '''
    blog_filename = create_blog_filename()  # Also sets base_filename

    ''' SCORE = (Up Votes - Down Votes) in string format'''
    if row[SCORE] != '':
        score = int(row[SCORE])
    else:
        score = 0
    total_votes += score    # score is up-votes - down-votes can be negative
    if score < VOTE_QUALIFIER:
        save_blog = False   # Below up-vote requirement

    ''' VIEWS '''
    if row[VIEWS] != '':
        views = int(row[VIEWS])
    else:
        views = 0
    total_views += views    # score is up-votes - down-votes can be negative

    ''' If Accepted turned on save blog (but it might be question) '''
    if row[ACCEPTED] != '':
        accepted_count += 1
        if ACCEPTED_QUALIFIER:
            save_blog = True  # Previous tests may have turned off

    ''' TYPE = "Question" or "Answer" or "Wiki"'''
    if row[TYPE] == "Question":
        question_count += 1
        check_self_answer(row)
        if not QUESTIONS_QUALIFIER or self_answer:
            save_blog = False  # Questions aren't posted
    elif row[TYPE] == "Answer":
        answer_count += 1
    else:
        unknown_count += 1  # Happens when managing stack exchange site
        #print('Unknown Type:', dump(row))

    ''' Exclude specific SE sites '''
    for exclude in EXCLUDE_SITES:
        if row[SITE] == exclude:
            save_blog = False
            break

    ''' If we aren't saving this blog, grab the next '''
    if save_blog is False:
        if RANDOM_LIMIT is not None:
            if row_number in random_row_nos:
                # This random record doesn't qualify so replace
                # with next record number
                index = random_row_nos.index(row_number)
                random_row_nos[index] = row_number + 1
        continue

    ''' Add to post votes list '''
    vote_tuple = (score, row[TITLE], base_filename)
    posts_vote.append(vote_tuple)

    ''' convert SE tags: "<tag1><tag2><tag3>" to: "tag1 tag2 tag3"
        NOTE: pseudo_tag_names will be appended to this list later.
    '''
    tags = row[TAGS].replace("><", " ")
    tags = tags.replace("<", "").replace(">", "")

    #if row_number == 15:
    #    print('tags before:', works)
    #    print('tags after: ', tags)

    lines = row[MARKDOWN].splitlines()
    line_count = len(lines)
    if lines[line_count - 1] != "":
        # We need to force empty blank line at end to prevent searching
        # past end of list when checking next line's contents
        lines.append("")
        line_count += 1
        force_end_line = True
        total_force_end += 1

    ''' Pass #1: Count markdown elements '''
    new_lines = []
    insert_clipboard = False  # Does not have any copy to clipboard inserts yet
    for line_index, line in enumerate(lines):
        line = check_code_block(line)   # Turn off formatting when in code block
        line = check_code_indent(line)  # Reformat code indent to fenced code block
        line = header_space(line)       # #Header, Alt-H1, Alt-H2. Set header_levels
        line = block_quote(line)        # Formatting for block quotes
        line = check_half_links(line)   # SE uses [https://…] instead of [Post Title]
        line = check_tail_links(line)   # SE uses [https://…] instead of [Post Title]
        check_pseudo_tags(line)         # Check if pseudo tag(s) should be added
        line = one_time_change(line)    # One Time Changes
        lines[line_index] = line        # Update any changes to original
        new_lines.append(line)          # Modified version of original lines

        # Check if we need to include copy to clipboard command
        command = check_copy_code(line_index)
        if command:
            insert_clipboard = True     # Will set Jekyll front matter = true
            # prepend command + \n to ``` bash line
            new_lines[code_block_index] = \
                command + "\n" + new_lines[code_block_index]

    lines = []
    for line in new_lines:
        # Split \n inserted by check_code_indent()
        sub_lines = line.split('\n')
        if len(sub_lines) > 1:
            for sub_line in sub_lines:
                lines.append(sub_line)
        else:
            lines.append(line)

    ''' Add to total lines '''
    tally_tags()
    total_lines += line_count
    if line_count > most_lines:
        most_lines = line_count
        #print('====== THE MOST LINES ======', most_lines)
        #dump(row)

    insert_toc = False  # Does not qualify for TOC yet
    if CONTENTS is not None:
        if header_count >= TOC_HDR_MIN and word_count >= TOC_WORD_MIN:
            insert_toc = True
            total_toc += 1
            # print('total_toc:    ', total_toc, blog_filename)

    insert_nav_bar = False  # Does not qualify for Navigation Buttons yet
    if NAV_BAR_OPT > 0:
        qualifier = sum(header_levels[:NAV_BAR_LEVEL])
        if qualifier >= NAV_BAR_MIN and word_count >= NAV_WORD_MIN:
            insert_nav_bar = True
            total_nav_bar += 1
            # print('total_nav_bar:', total_nav_bar, blog_filename)

    ''' Pass #2: Generate new markdown (Kramdown) '''
    # Add SE Question tags + our answer key tags (if any)
    string = ' '.join(pseudo_tag_names)
    if len(string) > 0:
        tags = tags + " " + string

    # Generate Markdown (MD)  with front matter file start
    new_md = front_matter(row)

    ''' Add to totals using header_space() counts '''
    total_headers += header_count
    total_header_spaces += header_space_count
    total_alternate_h1 += alternate_h1
    total_alternate_h2 += alternate_h2
    total_header_levels = [x + y for x, y in zip(total_header_levels,
                                                 header_levels)]

    ''' Reset counts used in header_space() '''
    header_count = 0
    header_levels = [0, 0, 0, 0, 0, 0]
    alternate_h1 = 0
    alternate_h2 = 0
    if in_code_block or in_code_indent:
        print('still in code block or code_indent when post ended')
        dump(row)
    in_code_block = False   # In a code block # Header formatting is skipped
    in_code_indent = False
    toc_inserted = False    # Has TOC been inserted yet?
    sum2 = 0                # Track for new header to insert Navigation Bar
    last_nav_id = 0         # Last navigation bar ID assigned

    ''' Pass #2: Loop through lines to insert TOC and Navigation Bar '''
    for line_index, line in enumerate(lines):
        check_code_block(line)      # Turn off formatting when in code block
        # Did this post qualify for adding navigation bar?
        # Save header levels counts we have now to "old_"
        old_header_levels = list(header_levels)
        line = header_space(line)   # #Header, Alt-H1, Alt-H2. Set header_levels
        if insert_nav_bar:
            sum1 = sum(old_header_levels[:NAV_BAR_LEVEL])
            sum2 = sum(header_levels[:NAV_BAR_LEVEL])
            # For next qualifying header level insert HTML for navigation bar.
            if sum1 != sum2:
                # First check if at TOC_LOC and insert TOC if needed
                if insert_toc:
                    if sum2 == TOC_LOC:
                        new_md = new_md + navigation_bar()
                        if NAV_BAR_OPT <= 3:
                            # If Option "4" a blank line already inserted before us
                            new_md = new_md + "\n"
                        new_md = new_md + CONTENTS + "\n"
                        new_md = new_md + "\n"  # When 4 a blank line already inserted before us
                        last_nav_id += 1
                        toc_inserted = True  # Not necessary but is consistent
                    if sum2 >= TOC_LOC:
                        sum2 += 1   # All heading levels after TOC are 1 greater

                if check_last_navigation_bar():
                    new_md = new_md + navigation_bar()

        elif insert_toc:
            # No navigation bar, but we still need TOC at header count
            if header_count == TOC_LOC and toc_inserted is False:
                if NAV_BAR_OPT <= 3:
                    # If Option "4" a blank line already inserted before us
                    new_md = new_md + "\n"
                new_md = new_md + CONTENTS + "\n"
                new_md = new_md + "\n"
                toc_inserted = True  # Prevents regeneration next line read
                # print('toc only:', blog_filename)

        new_md = new_md + line + '\n'

    ''' Add Navigation Bar for footer '''
    if insert_nav_bar:
        # sum2 has last header id number used. Skip ID tag is 1 greater
        hdr_id = sum2 + 1
        if insert_toc and sum2 >= TOC_LOC:
            hdr_id += 1  # All heading levels after TOC are 1 greater
        if force_end_line:
            force_end_line = False  # Keep EOF empty line we added
        else:
            new_md = new_md + "\n"  # Empty line before HTML ID tag
        new_md = new_md + navigation_bar(skip_btn=False)

    qualifying_blog_count += 1
    if RANDOM_LIMIT is not None:
        if row_number in random_row_nos:
            if save_blog is True:
                save_blog_count += 1
                #print('Random upload row number: {:>6,}'.format(row_number))
                # print(new_md)
                if PRINT_RANDOM:
                    dump(row)
                write_md(new_md)
            else:
                # This random record doesn't qualify so replace
                # with next record number
                #print('Random row record number: {:>6,}'.format(row_number),
                #      " - Does NOT qualify as blog so using next number.")
                index = random_row_nos.index(row_number)
                random_row_nos[index] = row_number + 1
    else:
        save_blog_count += 1
        write_md(new_md)

gen_post_by_vote()
gen_post_by_tag_groups()    # Generate list of posts in smaller groups

if PRINT_NOT_ACCEPTED and len(self_not_accept_url) > 0:
    print()
    print('// ==============/   Self-Answered Questions not accepted   \\================ \\\\')
    print('')
    for url in self_not_accept_url:
        print('URL:', url)
    print('')

if RANDOM_LIMIT is None:
    random_limit = '  None'
else:
    random_limit = '{:>6,}'.format(RANDOM_LIMIT)

print('// =============================/   T O T A L S   \\============================== \\\\')
print('')
print('RANDOM_LIMIT:    ', random_limit,
      ' | PRINT_RANDOM:  {:>11}'.format(str(PRINT_RANDOM)),
      ' | NAV_FORCE_TOC: {:>11}'.format(str(NAV_FORCE_TOC)))
print('NAV_BAR_MIN:      {:>6,}'.format(NAV_BAR_MIN),
      ' | NAV_WORD_MIN:  {:>11}'.format(NAV_WORD_MIN),
      ' | COPY_LINE_MIN: {:>11}'.format(COPY_LINE_MIN))
print('accepted_count:   {:>6,}'.format(accepted_count),
      ' | total_votes:   {:>11,}'.format(total_votes),
      ' | total_views:   {:>11,}'.format(total_views))
print('question_count:   {:>6,}'.format(question_count),
      ' | answer_count:       {:>6,}'.format(answer_count),
      ' | save_blog_count:    {:>6,}'.format(save_blog_count))
print('total_self_answer:{:>6,}'.format(total_self_answer),
      ' | total_self_accept:  {:>6,}'.format(total_self_accept),
      ' | Self Needing Accept:{:>6,}'.format(total_self_answer -
                                             total_self_accept))
print('total_headers:    {:>6,}'.format(total_headers),
      ' | total_header_spaces:{:>6,}'.format(total_header_spaces),
      ' | total_quote_spaces: {:>6,}'.format(total_quote_spaces))
print('total_lines: {:>11,}'.format(total_lines),
      ' | total_paragraphs:{:>9,}'.format(total_paragraphs),
      ' | total_words: {:>13,}'.format(total_words))
print('total_pre_codes:  {:>6,}'.format(total_pre_codes),
      ' | total_alternate_h1: {:>6,}'.format(total_alternate_h1),
      ' | total_alternate_h2: {:>6,}'.format(total_alternate_h2))
print('total_code_blocks:{:>6,}'.format(total_code_blocks),
      ' | total_block_lines: {:>7,}'.format(total_block_lines),
      ' | total_clipboards:  {:>7,}'.format(total_clipboards))
print('total_code_indents:{:>5,}'.format(total_code_indents),
      ' | total_indent_lines:{:>7,}'.format(total_indent_lines),
      ' | total_half_links:  {:>7,}'.format(total_half_links))
print('total_pseudo_tags:{:>6,}'.format(total_pseudo_tags),
      ' | total_copy_lines:  {:>7,}'.format(total_copy_lines),
      ' | total_toc:         {:>7,}'.format(total_toc))
print('# total_tag_names:{:>6,}'.format(len(total_tag_names)),
      ' | total_force_end:  {:>8,}'.format(total_force_end),
      ' | total_nav_bar:     {:>7,}'.format(total_nav_bar))
print('all_tag_counts: {:>8,}'.format(all_tag_counts),
      ' | # tag_posts:      {:>8,}'.format(len(tag_posts)),
      ' | # total_tag_letters:{:>6,}'.format(len(total_tag_letters)))
print('total_header_levels:       ', total_header_levels)
#print('TAG_LETTERS:               ', TAG_LETTERS)
#print('total_tag_letters:         ', total_tag_letters)
#print('EXCLUDE_SITES:, EXCLUDE_SITES'
#print('total_tag_names:     ', total_tag_names)
#print(total_sites)

# End of stack-to-blog.py
