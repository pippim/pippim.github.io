#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ==============================================================================
#
#       stack-to-blog.py - Convert Stack Exchange Answers with a score >= 2 or
#           accepted into a Jekyll blog post.
#
#       Oct. 24 2021 - Initial version.
#       NOv. 06 2021 - Two passes to count number of #, ##, etc. in first pass.
#       NOv. 13 2021 - Add TOC support and SE "<!-- language" conversion.
#       Nov. 17 2021 - Support for Pseudo-tags from keywords in answers.
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

    A copy of the query is in pippim.github.io/StackBlogPost. A
    copy of the output file QueryResults.CSV can also be found in the same
    root directory.

    Run the query and Save the results in CSV format as QueryResults.csv

    Move query results to your website folder. In Linux use:
        mv ~/Downloads/QueryResults.csv ~/website

    Run ~/website/stack-to-blog.py which will populate "~/website/_posts"
    sub-directory with one Jekyll blog post file for each Stack Exchange
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

INPUT_FILE = 'QueryResults.csv'
RANDOM_LIMIT = 10           # On initial trials limit the number of blog posts
PRINT_RANDOM = True         # Print out matching random record found (10 lines)
OUTPUT_DIR = "_posts/"      # Subdirectory name. Use "" for current directory
QUESTIONS_QUALIFIER = False  # Don't upload questions
VOTE_QUALIFIER = 2          # Posts need at least 2 votes to qualify
ACCEPTED_QUALIFIER = True   # All accepted answers are uploaded
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
NAV_WORD_MIN = 1000         # Minimum 1,000 words for navigation button bar

# If question or answer contains one of these "pseudo tags" then jekyll front
# will have tag added as if it were really on the question. Essentially you
# are tagging your answers and adding them to OP's question tags.
PSEUDO_TAGS = ["conky", "eyesome"]

fields = []                 # The column names used by Stack Exchanges
data = []                   # Returned rows, less record #1 (field names)
row_count = 0               # How many data rows (Answers / Blog posts)
random_row_nos = []         # Random row numbers exported during trail runs
all_tag_names = []          # Every tag name appearing on stack exchange answers
all_tag_counts = []         # Count of times tag has been used on SE answers

now = dt.now().strftime("%Y-%m-%d %H:%M:%S")

''' Read S.E.D.E. CSV file and convert to Python list: data [] '''
with open(INPUT_FILE) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        # The first row are column headings / field names
        if row_count == 0:
            print('Column names\n', row)
            fields = row
        else:
            data.append(row)
        row_count += 1

    #print('Total rows:', row_count)

row_count = len(data)
if row_count < 2:
    print('No CSV records found in INPUT_FILE:' + INPUT_FILE)
    exit()

''' Overview of sample set used for blog posts based on RANDOM_LIMIT '''
random_row_nos = [randint(1, row_count) for p in range(0, RANDOM_LIMIT)]
if RANDOM_LIMIT < 100:
    print('RANDOM_LIMIT:', RANDOM_LIMIT,
          'yielded random record numbers:', random_row_nos)

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
FRONT_LAYOUT    = "layout:       post"  # "layout:" MUST be used "post" can be changed
FRONT_UPLOADED  = "uploaded:     "  # Date & Time this program was run
FRONT_TOC       = "toc:          "  # Table of Contents? "true" or "false"
FRONT_NAV_BAR   = "navigation:   "  # Section navigation bar? "true" or "false"

row_number = 1                  # Current row number in query
accepted_count = 0              # How many posts were accepted
question_count = 0              # How many posts are questions
answer_count = 0                # How many posts are answers
unknown_count = 0               # How many posts are unknown, EG wiki-tags
most_lines = 0                  # Lines in the longest post
qualifying_blog_count = 0       # How many blogs could be saved
save_blog_count = 0             # How many blogs were saved given random limit

total_views = 0                 # Number of times viewed
total_votes = 0                 # How many up votes across all posts
total_lines = 0                 # Total lines of all posts
total_header_spaces = 0         # Total headers we added a space behind lsat "#"
total_headers = 0               # Total header count
total_quote_spaces = 0          # Total block quotes requiring two spaces at end
total_paragraphs = 0            # How many paragraphs are there?
total_words = 0                 # How many words by splitting whitespace
total_code_blocks = 0           # How many code blocks are there?
total_code_block_lines = 0      # How many lines are inside code blocks?
total_pre_codes = 0             # How many times does <pre><code> appear?
total_header_levels = [0, 0, 0, 0, 0, 0]
total_alternate_h1 = 0          # Alternate H1 lines followed by "=="
total_alternate_h2 = 0          # Alternate H2 lines followed by "--"
total_force_end = 0             # How many last empty lines added?
total_toc = 0                   # How many table of contents added?
total_nav_bar = 0               # How many navigation bars added?
language_forced = 0             # How many times was language fenced?

'''
Must be reinitialize between blog posts
'''
contents = ""               # Not used, placeholder
blog_filename = ""          # YYYY-MM-DD-blog-title.md
lines = []                  # Markdown lines list being processed
curr_index = 0              # Current line index within lines []
header_count = 0            # How many headers were found in blog post
alternate_h1 = 0            # Alternate H1 lines followed by "=="
alternate_h2 = 0            # Alternate H2 lines followed by "--"
''' Counts of header levels - H1, H2 ... H6 '''
header_levels = [0, 0, 0, 0, 0, 0]
paragraph_count = 0         # How many paragraphs in post last one not counted
word_count = 0              # How many words by splitting whitespace
in_code_block = False       # Are we in a code block? Then no # Header formatting
language_used = ""          # What language when fenced code blocks have none?
image_links = []            # Links to images found at bottom of SE posts
''' Used for each post '''
tags = ""                   # Front matter format: tags: TAG1 TAG2 TAG3


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

        TODO: Called in pass 1 and pass 2 so has ugly reset of totals in
            mainline. Break into two separate functions instead.
    """
    global total_header_spaces, header_count, total_code_block_lines
    global total_headers
    global lines, curr_index, header_levels, total_header_levels
    global alternate_h1, total_alternate_h1, alternate_h2, total_alternate_h2

    if in_code_block:
        ''' Note only header_spaces() function will increment count '''
        total_code_block_lines += 1
        return ln

    if ln[0:1] == "#":
        #print('Found header:', ln)
        header_count += 1   # For current post, reset between posts
        total_headers += 1
        # How many '#' are there at line start?
        hash_count = len(ln) - len(ln.lstrip('#'))
        # Is first character after "#" a space?
        if ln[hash_count:hash_count+1] != " ":
            #print('Forcing space at:', hash_count, ln)
            ln = ln[0:hash_count] + " " + ln[hash_count:]
            total_header_spaces += 1
            #print('After forcing:   ', hash_count, ln)

        # Increment count at level
        header_levels[hash_count - 1] += 1
        total_header_levels[hash_count - 1] += 1

    elif curr_index == line_count - 1:
        pass  # Don't go past size of list

    # If current line is empty or starts with < (HTML) skip alternate test
    elif ln == "" or ln[0:1] == "<":
        pass

    elif lines[curr_index + 1][0:1] == "=":
        ''' This is an H1 Line because next line is "=="
        '''
        header_count += 1   # For current post, reset between posts
        total_headers += 1
        alternate_h1 += 1
        total_alternate_h1 += 1
        ln = "# " + ln
        lines[curr_index + 1] = ""  # Blank out "=="
        # Increment count at level
        header_levels[0] += 1
        total_header_levels[0] += 1

    elif lines[curr_index + 1][0:2] == "--":
        ''' This is an H2 Line because next line is "--"
            NOTE: Kramdown requires two "--" and a single one won't do.
        '''
        #print(ln)  # Uncomment this and next 2 lines to test alternate H2
        #print(lines[curr_index + 1])
        #print(row[URL])

        header_count += 1   # For current post, reset between posts
        total_headers += 1
        alternate_h2 += 1
        total_alternate_h2 += 1
        ln = "## " + ln
        lines[curr_index + 1] = ""  # Blank out "--"
        # Increment count at level
        header_levels[1] += 1
        total_header_levels[1] += 1

    # Append HTML header ID. EG: <a> id="hdr9"></a>
    ''' Move this to second pass
    if hash_count <= TOC_HDR_LEVEL:
        ln = ln + '<a id="hdr' + str(header_count) + '"></a>'
        # Second pass will insert lines to GOTO this "id" name
    '''
    return ln


def block_quote(ln):
    """ Append two spaces at end of block quote ('>') if necessary

        If inside fenced code block, ignore # lines and don't count as header.

    """
    global total_quote_spaces

    if in_code_block:
        return ln

    if ln[0:1] == ">":
        #print('Found block quote:', ln)
        if ln[-2:] != "  ":
            #print('Forcing two spaces after:', ln)
            ln = ln + "  "
            total_quote_spaces += 1
    return ln


def check_paragraph(ln):
    """ If line is empty it means it's a paragraph.  Note if line ends in
        two spaces it forces a new line but not a paragraph break.  Also
        note if three lines were written in a row they would be merged
        into one paragraph.

        FUTURE: The paragraph number indicates where to insert TOC.


        Also count number of words
    """
    global total_paragraphs, paragraph_count, total_words, word_count
    if len(ln) == 0:
        total_paragraphs += 1   # For all posts
        paragraph_count += 1    # For current post

    ''' Add to word counts '''
    word_list = ln.split()
    count = len(word_list)
    word_count += count
    total_words += count


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
    if ln.startswith("<!-- language"):
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
            in_code_block = True        # For this post only
            if ln[-1] == "`" or ln[-1] == " ":
                ln = ln + " " + language_used
                language_forced += 1
        else:
            in_code_block = False       # For this post only

    return ln


def check_pre_code(ln):
    """ Check if line starts with <pre><code> or <code>
    """
    global total_pre_codes
    if ln.startswith("<pre><code>") or ln.startswith("<code>"):
        ''' NOT SUPPORTED. Print line to terminal '''
        print('===========:', ln)
        total_pre_codes += 1


def check_contents(ln):
    """ check if TOC should be inserted here

    CREDIT: https://www.aleksandrhovhannisyan.com/blog/
            jekyll-table-of-contents/#how-to-create-a-table-of-contents-in-jekyll

    For TOC to work you need to create an include file named
    '_includes/toc.md" and fill it with this markup:

## Table of Contents
{:.no_toc}

* TOC
{:toc}

    Then, in your post, all you have to do is insert this one-liner wherever
    you want your table of contents to appear:

{% include toc.md %}

    So, here's the Sass that'll get the job done by creating the file
    '_sass/someSassFile.scss':

.screen-reader-only {
    position: absolute;
    left: -5000px;

    &:focus {
        left: 0;
    }
}

    """

    global contents, total_quote_spaces
    if CONTENTS is None:
        return  # Global CONTENTS variable is null, so no TOC

    return ln


def navigation_bar(level, skip_btn=True):
    """ Return Navigation Bar. Verbosity driven by NAV_BAR_OPT

        The first header doesn't contain "Top" or "ToS" because it is already
        at the top.

        The TOC header doesn't contain option for "ToC" because it is already
        there.

    """
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
    if insert_toc and level != TOC_LOC:
        bar = bar + '  <a href="#hdr' + str(TOC_LOC) + '" class ="hdr-btn">ToC</a>'

    # Skip button will always appear except on footer
    if skip_btn:
        bar = bar + '  <a href="#hdr' + str(hdr_Skip) + '" class ="hdr-btn">Skip</a>'

    bar = bar + '</div>\n'

    if NAV_BAR_OPT >= 4:
        bar = bar + "\n"

    return bar


def front_matter(r):
    """ Output Jekyll front matter to md string """
    md = "---\n" + FRONT_LAYOUT + "\n" + FRONT_TITLE + r[TITLE] + '\n'
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
        md = md + FRONT_CREATED + r[CREATED] + '\n'
    if FRONT_LAST_EDIT is not None:
        md = md + FRONT_LAST_EDIT + r[LAST_EDIT] + '\n'
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
    md = md + FRONT_UPLOADED + now + '\n'
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

    md = md + "---\n\n"

    return md


def create_blog_filename():
    """ Return blog filename.
        Replace all spaces in title with "-"
        Replace all forward slash (/) with ∕ DIVISION SLASH U+2215
    """
    filename = '_posts/' + row[CREATED].split()[0] + '-' + \
        row[TITLE].replace(' ', '-').replace('/', '∕') + '.md'

    return filename


def write_md(md):
    """ Write to SE converted to Jekyll markdown to blog_filename """
    with open(blog_filename, 'w') as fh:
        if force_end_line:
            # Write everything except last character ('\n`)
            fh.write(md[:-1])
        else:
            # Write everything
            fh.write(md)



''' Main loop to process All query records
    - If RANDOM_LIMIT is used then only output matching random_rec_nos []
    - Match criteria for answer up votes or accepted check mark
    - Check if in fenced code block (``` bash) for example. If not then:
        - Reformat '#Header 1' to '# Header 1'. Same for "##H2" to "## H2", etc.
        - Count number of '#' header lines
        - Add two spaces after "< Block Quote" lines

    - Second pass to insert '{% include toc.md %}' at paragraph # (TOC_LOC)
    - Anytime a line is inserted, loop through following header_index []
        entries and bump index number up by 1

    TODO: 
        Develop HTML anchors for "#pippim_hdr_1". Then apply links for:
            Top, ToS, ToC, Skip, Back (Top of Page, Top of Section, Table of
            Contents, Browser History Back). Mobile uses abbreviations,
            Desktop uses full spelling.  
'''

for row in data:

    row_number += 1
    ''' Reset counters for each stack exchange Q&A '''
    save_blog = True        # Default until a condition turns it off
    lines = []              # Markdown lines list being processed
    curr_index = 0          # Current line index within lines []
    header_count = 0        # How many headers were found in blog post
    ''' Counts of header levels - H1, H2 ... H6 '''
    header_levels = [0, 0, 0, 0, 0, 0]
    paragraph_count = 0     # How many paragraphs (headers count as 2) in post
    word_count = 0          # How many words (includes "## ") in post
    language_used = ""  # What language when fenced code blocks have none?
    in_code_block = False   # In a code block # Header formatting is skipped
    force_end_line = False  # Did Pass #1 force an empty blank line at end?
    ''' YYYY-MM-DD-Title-with-spaces-converted-to-dashes.md '''
    blog_filename = create_blog_filename()

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
        if not QUESTIONS_QUALIFIER:
            save_blog = False  # Questions aren't posted
    elif row[TYPE] == "Answer":
        answer_count += 1
    else:
        unknown_count += 1  # Happens when managing stack exchange site
        #print('Unknown Type:', dump(row))

    ''' If we aren't saving this blog, grab the next '''
    if save_blog is False:
        if row_number in random_row_nos:
            # This random record doesn't qualify so replace
            # with next record number
            index = random_row_nos.index(row_number)
            random_row_nos[index] = row_number + 1
        continue

    ''' convert SE tags: "<tag1><tag2><tag3>" to: "tag1 tag2 tag3" '''
    tags = row[TAGS].replace("><", " ")
    tags = tags.replace("<", "").replace(">", "")

    #if row_number == 15:
    #    print('tags before:', works)
    #    print('tags after: ', tags)

    lines = row[MARKDOWN].splitlines()
    line_count = len(lines)
    if lines[line_count - 1] != "":
        lines.append("")
        line_count += 1
        force_end_line = True
        total_force_end += 1

    ''' Pass #1: Count line types '''
    for curr_index, line in enumerate(lines):
        line = check_code_block(line)  # Turn off formatting when in code block
        line = header_space(line)  # Change #Header to # Header and Alt-H1, Alt-H2
        line = block_quote(line)  # Formatting for block quotes
        check_paragraph(line)  # Check if markdown paragraph (empty line)
        lines[curr_index] = line  # Stuff back any changes made

    ''' Does this answer qualify for TOC or Navigation Bar?
    
        COMMENTS COPIED FROM ABOVE:
        
        ' Table of Contents (TOC) options. '
# If TOC is never wanted, set to None
CONTENTS = "{% include toc.md %}"
TOC_HDR_MIN = 6             # Number of Headers required to qualify TOC insert
TOC_LOC = 2                 # Put TOC before second header

NAV_BAR_OPT = 4             # Insert Navigation Bar into markdown?
    0 = No navigation bar
    1 = single line. EG <a id=... </div>
    2 = two lines. EG <a id= then new line then with <div>...</div>
    3 = Option 2 plus empty (blank) line above for readability
    4 = Option 3 plus empty (blank) line above for even more readability
    5 = Option 4 plus comment for ultimate readability

    Note: Markdown compresses all blank lines into a single blank line between
          paragraphs. HTML code inserted simply counts as another blank line to
          be compressed into a single blank line.
NAV_BAR_LEVEL = 2           # Put before "#" or "##" only. Not before "###"
NAV_BAR_MIN = 2             # Minimum of 2 "#" or "##" for Navigation bar
NAV_FORCE_TOC = True        # Put TOC to navigation bar regardless of "#"
 
    '''

    ''' Reset counts of header levels - H1, H2 ... H6 '''
    # header_levels = [0, 0, 0, 0, 0, 0]
    # paragraph_count = 0     # How many paragraphs (headers count as 2) in post
    # word_count = 0          # How words (includes "## ") in post
    in_code_block = False   # In a code block # Header formatting is skipped

    '''
    FROM: https://github.com/toshimaru/jekyll-toc
    Set toc: true in posts for which you want the TOC to appear.

        ---
        layout: post
        title: "Welcome to Jekyll!"
        toc: true
        ---
    '''
    insert_toc = False
    if CONTENTS is not None:
        if header_count >= TOC_HDR_MIN and word_count >= TOC_WORD_MIN:
            insert_toc = True
            total_toc += 1
            print('total_toc:    ', total_toc, blog_filename)

    insert_nav_bar = False
    if NAV_BAR_OPT > 0:
        qualifier = sum(header_levels[:NAV_BAR_LEVEL])
        if qualifier >= NAV_BAR_MIN and word_count >= TOC_WORD_MIN:
            insert_nav_bar = True
            total_nav_bar += 1
            #print('total_nav_bar:', total_nav_bar, blog_filename)

    ''' Pass #2: Generate new markdown (kramdown) '''
    new_md = front_matter(row)
    header_levels = [0, 0, 0, 0, 0, 0]  # Reset pass 1 variables recycled now
    header_count = 0
    total_header_spaces = 0
    total_header_levels = [0, 0, 0, 0, 0, 0]
    # total_code_block_lines = 0
    toc_inserted = False
    sum2 = 0
    alternate_h1 = 0
    total_alternate_h1 = 0
    alternate_h2 = 0
    total_alternate_h2 = 0

    for line in lines:
        check_code_block(line)      # Turn off formatting when in code block
        # Did this post qualify for adding navigation bar?
        # Save how header levels counts we have now
        old_header_levels = list(header_levels)
        # TODO: reverse doubling up totals
        line = header_space(line)   # Formatting for #Header or # Header lines
        if insert_nav_bar:
            sum1 = sum(old_header_levels[:NAV_BAR_LEVEL])
            sum2 = sum(header_levels[:NAV_BAR_LEVEL])
            # For next qualifying header level insert HTML for navigation bar.
            if sum1 != sum2:
                # First check if at TOC_LOC and insert TOC if needed
                if insert_toc:
                    if sum2 == TOC_LOC:
                        new_md = new_md + navigation_bar(TOC_LOC)
                        if NAV_BAR_OPT <= 3:
                            # When 4 a blank line already inserted before us
                            new_md = new_md + "\n"
                        new_md = new_md + CONTENTS + "\n"
                        new_md = new_md + "\n"  # When 4 a blank line already inserted before us
                        toc_inserted = True  # Not necessary but is consistent
                    if sum2 >= TOC_LOC:
                        sum2 += 1   # All heading levels after TOC are 1 greater

                new_md = new_md + navigation_bar(sum2)

        elif insert_toc:
            # No navigation bar but we still need TOC at header count
            if header_count == TOC_LOC and toc_inserted is False:
                if NAV_BAR_OPT <= 3:
                    # When 4 a blank line already inserted before us
                    new_md = new_md + "\n"
                new_md = new_md + CONTENTS + "\n"
                new_md = new_md + "\n"
                toc_inserted = True  # Prevents regeneration next line read
                print('toc only:', blog_filename)

        # line = block_quote(line)    # Formatting for block quotes
        # check_paragraph(line)       # Check if markdown paragraph (empty line)
        new_md = new_md + line + '\n'

    ''' Add tag for footer to jump to when 'Skip' button used '''
    if insert_nav_bar:
        # sum2 has last header id number used. Skip ID tag is 1 greater
        hdr_id = sum2 + 1
        if insert_toc and sum2 >= TOC_LOC:
            hdr_id += 1  # All heading levels after TOC are 1 greater
        if force_end_line:
            force_end_line = False  # Keep EOF empty line we added
        else:
            new_md = new_md + "\n"  # Empty line before HTML ID tag
        new_md = new_md + navigation_bar(hdr_id, skip_btn=False)

    total_lines += line_count
    if line_count > most_lines:
        most_lines = line_count
        #print('====== THE MOST LINES ======', most_lines)
        #dump(row)

    qualifying_blog_count += 1
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


print('// =============================/   T O T A L S   \\============================== \\\\')
print('')
print('accepted_count:   {:>6,}'.format(accepted_count),
      ' | total_votes:   {:>11,}'.format(total_votes),
      ' | total_views:   {:>11,}'.format(total_views))
print('question_count:   {:>6,}'.format(question_count),
      ' | answer_count:       {:>6,}'.format(answer_count),
      ' | save_blog_count:    {:>6,}'.format(save_blog_count))
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
      ' | code_block_lines:  {:>7,}'.format(total_code_block_lines),
      ' | total_toc:         {:>7,}'.format(total_toc))
print('most_lines:       {:>6,}'.format(most_lines),
      ' | total_force_end:  {:>8,}'.format(total_force_end),
      ' | total_nav_bar:     {:>7,}'.format(total_nav_bar))
print('total_header_levels:       ', total_header_levels)

# End of stack-to-blog.py
