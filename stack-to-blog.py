#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ==============================================================================
#
#       stack-to-blog.py - Convert Stack Exchange Answers with a score of 2 or
#           more into a Jekyll blog post. Accepted answers have 3 added to the
#           score.
#
#       Oct. 24 2021 - Initial version. Supports "Tags: [Topic1 Topic2]" using
#           Stack tags.
#
# ==============================================================================

"""
    USAGE
    ============================================================================

    Run the stack exchange data explorer query:
        https://data.stackexchange.com/stackoverflow/query/1407382/all-my-posts-on-the-se-network-with-markdown-and-html-content-plus-editors-and-s
        NOTE: Use your Stack Exchange UserID. Mine is: 4775729
    It has been saved in pippim.github.io/StackBlogPost. First 3 lines:

    -- StackBlogPost: Convert Stack Exchange Answers to Blog Posts in Jekyll
    -- From: https://data.stackexchange.com/stackoverflow/query/edit/1492412#resultSets
    -- AccountId: Your SE network account ID number, found in the URL of your network profile page:


    Save the results in CSV format as QueryResults.csv

    Move query results to your website folder. In Linux use:
        mv ~/Downloads/QueryResults.csv ~/website

    Run stack-to-blog.py which will populate the _posts directory in the tree:
.
├── about.md
├── about.md~
├── assets
│   ├── css
│   │   ├── style.scss
│   │   └── style.scss~
│   └── img
│       ├── Blog_Project-Management-101.png
│       ├── octojekyll-opt.jpg
│       └── pngwing.com.png
├── _includes
│   └── head-custom.html
├── index.md
├── _posts
├── QueryResults.csv
├── StackBlogPost
└── stack-to-blog.py

    TODO: Add front matter. Include "categories: eyesome" or "categories:
            .conkyrc" "votes: 999" - Note accepted answers have 3 added
            up-votes

        Sidebar navigation with top, original Q&A, Github, TOC Sections can
            be based on #, ## and ### headers. See email to Michael Rose tonight
            (October 26, 2021 @ 8pm) for more information.

        Automatic "Excerpt" front matter or in markdown taking first 200
            characters of blog post or perhaps first paragraph if close to 200.

        Put TOC in markdown using:
            https://ouyi.github.io/post/2017/12/31/jekyll-table-of-contents.html
            
        Originally today was thinking of Michael Rose's Minimalistic Mistakes,
            Basically Basic or Skinny Bones Jekyll Themes but just now read
            about Jekyll Doc Them 6.0 and that might be better as it focuses
            on according sidebar navigation.
            See https://github.com/tomjoht/documentation-theme-jekyll
"""

from __future__ import print_function  # Must be first import
from __future__ import with_statement  # Error handling for file opens
import csv
from random import randint

INPUT_FILE = 'QueryResults.csv'
RANDOM_LIMIT = 10           # On initial trials limit the number of blog posts
PRINT_RANDOM = True         # Print out matching random record found (10 lines)
OUTPUT_DIR = "_posts/"      # Subdirectory name. Use "./" for current directory
QUESTIONS = False           # Don't upload questions
VOTES = 2                   # Answers need at least 2 votes to qualify
ACCEPTED = True             # All accepted answers are uploaded
# Generate TOC when CONTENTS variable is not blank
CONTENTS = "** Table of Contents **"
TOC_HDR_MIN = 6             # Number of Headers required to qualify TOC
TOC_LOC = 2                 # Put TOC before second second paragraph


# If question or answer contains one of these keywords then jekyll front
# matter has "categories: KEYWORD" added. There can be more than one KEYWORD.
PROGRAMS = ["eyesome", "multi-timer", ".bashrc", ".conkyrc", "cdd", "mserve", "bserve"]

fields = []                 # The column names used by Stack Exchanges
data = []                   # Returned rows, less record #1 (field names)
row_count = 0               # How many data rows (Answers / Blog posts)
random_row_nos = []         # Random row numbers exported during trail runs
all_tag_names = []          # Every tag name appearing on stack exchange answers
all_tag_counts = []         # Count of times tag has been used on SE answers

''' Read SE CSV file and convert to Python list '''
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

random_row_nos = [randint(1, row_count) for p in range(0, RANDOM_LIMIT)]
print('RANDOM_LIMIT:', RANDOM_LIMIT,
      'yielded random record numbers:', random_row_nos)

# Copy terminal output of record #1 with column names and paste below.
# Then change names to uppercase and assign each column a 0-based index.
SITE = 0
POST_ID = 1
LINK = 2
TYPE = 3
TITLE = 4
HTML = 5
MARKDOWN = 6
TAGS = 7
CREATED = 8
LAST_EDIT = 9
EDITED_BY = 10
SCORE = 11
FAVORITES = 12
VIEWS = 13
ANSWERS = 14
ACCEPTED = 15
CW = 16
CLOSED = 17

row_number = 1              # Current row number in query
accepted_count = 0          # How many posts were accepted
question_count = 0          # How many posts are questions
answer_count = 0            # How many posts are answers
unknown_count = 0           # How many posts are unknown, EG wiki-tags
most_lines = 0              # Lines in the longest post
qualifying_blog_count = 0   # How many blogs could be saved
save_blog_count = 0         # How many blogs were saved given random limit

total_votes = 0             # How many up votes across all posts
total_lines = 0             # Total lines of all posts
total_header_spaces = 0     # Total headers we added a space behind lsat "#"
total_quote_spaces = 0      # Total block quotes requiring two spaces at end
total_paragraphs = 0        # How many paragraphs are there?
total_code_blocks = 0       # How many code blocks are there?
total_code_block_lines = 0  # How many lines are inside code blocks?
total_pre_codes = 0         # How many times does <pre><code> appear?

''' Must be reinitialize between blog posts
    TODO: Put into class with init()
'''
contents = ""               # Not used, placeholder
blog_filename = ""          # YYYY-MM-DD-blog-title.md
header_count = 0            # How many headers were found in blog post
paragraph_count = 0         # How many paragraphs in post last one not counted
in_code_block = False       # Are we in a code block? Then no # Header formatting
image_links = []            # Links to images found at bottom of SE posts
toc_index = None            # md_new position


def dump(r):
    """ Dump contents of one row to terminal in good-looking format

        NOTE: POST_ID is only "1083730" but we really need:
        "https://askubuntu.com/a/1083730/307523"

    """
    print('Site:   ', r[SITE], '  |  Post ID:', r[POST_ID], '  |  Type:', r[TYPE])
    print('Title:  ', r[TITLE][:80])
    print('Link:   ', r[LINK][:80])
    limit = r[HTML].find('\n')
    if limit > 80 or limit == -1:
        limit = 80
    print('HTML:   ', r[HTML][:limit])
    limit = r[MARKDOWN].find('\n')
    if limit > 80 or limit == -1:
        limit = 80
    print('MARK:   ', r[MARKDOWN][:limit])
    print('Created:', r[CREATED], '  |  Tags:', r[TAGS])
    print('Edited: ', r[LAST_EDIT], '  |  Edited by:', r[EDITED_BY])
    print('Votes:  ', r[SCORE], '  |  Views:', r[VIEWS], '  |  Answers:', r[ANSWERS],
          '  |  Accepted:', r[ACCEPTED], '\n')


def header_space(ln):
    """ Add space after # for headers if necessary

        Assign HTML tag <a id="hdr9"></a>
        This isn't perfect because if inside "```code" block then something
            like "#HandleLidSwitch" should not be touched. However since it is
            a comment line in the first place it should not matter if it was
            displayed as "# HandleLidSwitch".

            Further problem is <a id="hdr9"></a> is appended to line!
    """
    global total_header_spaces, header_count, total_code_block_lines

    if in_code_block:
        total_code_block_lines += 1
        return ln

    if ln[0:1] == "#":
        #print('Found header:', ln)
        header_count += 1   # For current post, reset between posts
        # How many '#' are there at line start?
        hash_count = len(ln) - len(ln.lstrip('#'))
        # Is first character after "#" a space?
        if ln[hash_count:hash_count+1] != " ":
            #print('Forcing space at:', hash_count, ln)
            ln = ln[0:hash_count] + " " + ln[hash_count:]
            total_header_spaces += 1
            #print('After forcing:   ', hash_count, ln)

        # Append HTML header ID. EG: <a> id="hdr9"></a>
        ln = ln + '<a id="hdr' + str(header_count) + '"></a>'
    return ln


def block_quote(ln):
    """ Append two spaces at end of block quote ('>') if necessary """
    global total_quote_spaces
    if ln[0:1] == ">":
        #print('Found block quote:', ln)
        if ln[-2:] != "  ":
            #print('Forcing two spaces after:', ln)
            ln = ln + "  "
            total_quote_spaces += 1
    return ln


def check_paragraph(ln):
    """ If line is empty it means it's a paragraph """
    global total_paragraphs, paragraph_count
    if len(ln) == 0:
        total_paragraphs += 1   # For all posts
        paragraph_count += 1    # For current post


def check_code_block(ln):
    """ If line starts with ``` we are now in code block.

        If already in code block and line begins with ```
            then we are now out of code block.

        The same holds true if line contains <pre><code> and
            ends with </code></pre>
     """
    global in_code_block, total_code_blocks
    if ln[0:3] == "```":
        if in_code_block is False:
            total_code_blocks += 1   # For all posts
            in_code_block = True
        else:
            in_code_block = False


def check_pre_code(ln):
    """ Check if <pre><code> appers on line
     """
    if "<pre><code>" in ln:
        print('===========:', ln)
        total_pre_codes += 1


def check_image_link(ln):
    """ Image links appear at the bottom of SE posts in this format:
       __[1]: https://www.reddit.com/r/gigabytegaming/comments/90jze6/aero_15x_v8_annoyances/

       Where __ are two leading spaces

       We need to take references to images in the format [![Image name][1]][1] and
        convert them to: ![Image name](full_URL_name)
    """
    pass


def check_url_link(ln):
    """ Image links appear at the bottom of SE posts in this format:
       __[1]: https://www.reddit.com/r/gigabytegaming/comments/90jze6/aero_15x_v8_annoyances/

       Where __ are two leading spaces

       We need to take references to images in the format [![Image name][1]][1] and
        convert them to: ![Image name](full_URL_name)
    """
    pass


def check_language_all(ln):
    """ Check for <!-- Language-all: lang-bash --> line
        If it exists then following ``` lines need " bash" appended
    """
    pass


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

    if ln[0:1] == "#":
        #print('Found header:', ln)
        if contents == "":
            # First time generate header stub for TOC
            contents = CONTENTS
        if ln[-2:] != "  ":
            #print('Forcing two spaces after:', ln)
            ln = ln + "  "
            total_quote_spaces += 1
    return ln


''' Main loop to process All query records
    - If RANDOM_LIMIT is used then only output matching random_rec_nos []
    - Match criteria for answer up votes or accepted check mark
    - Reformat '#Header 1' to '# Header 1'. Same for "##H2" to "## H2", etc.
    - Count number of '#' header lines
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
    save_blog = True        # Default until a condition turns it off
    header_count = 0        # How many headers were found in blog post
    paragraph_count = 0     # How many paragraphs (includes headers) in post
    in_code_block = False   # In a code block # Header formatting is skipped
    toc_index = None        # Position to insert within md_new string

    if row[SCORE] != '':
        score = int(row[SCORE])
    else:
        score = 0
    total_votes += score    # score is up-votes - down-votes can be negative
    if score < VOTES:
        save_blog = False   # Below up-vote requirement

    if row[TYPE] == "Question":
        question_count += 1
        if not QUESTIONS:
            save_blog = False  # Questions aren't posted
    elif row[TYPE] == "Answer":
        answer_count += 1
    else:
        unknown_count += 1  # Happens when managing stack exchange site
        #print('Unknown Type:', dump(row))

    if row[ACCEPTED] != '':
        #dump(row)
        accepted_count += 1
        if ACCEPTED:
            save_blog = True  # Previous tests may have turned off

    # SE tags have the format: "<tag1><tag2><tag3>"
    works = row[TAGS].split('<')[1:]  # [ "Tag1>", "Tag2>", "Tag3>" ]
    tag_count = 0
    tags = []
    for work in works:
        tag_count += 1
        work = work[0:-1]  # "Tag>" becomes "Tag"
        tags.append(work)

    #if row_number == 15:
    #    print('tags before:', works)
    #    print('tags after: ', tags)

    # Older posts could have "#HEADER" instead of "# HEADER" insert space
    # Posts with block quotes ('>') need two spaces at the end of the line
    #  for proper HTML conversion from Markdown
    original_md = row[MARKDOWN]
    new_md = ""
    line_count = 0
    for line in original_md.splitlines():
        line_count += 1
        check_code_block(line)      # Turn off formatting when in code block
        line = header_space(line)   # Formatting for #Header or # Header lines
        line = block_quote(line)    # Formatting for block quotes
        check_paragraph(line)       # Check if markdown paragraph (empty line)
        new_md = new_md + line + '\n'

    total_lines += line_count
    if line_count > most_lines:
        most_lines = line_count
        #print('====== THE MOST LINES ======', most_lines)
        #dump(row)

    blog_filename = row[CREATED].split()[0] + '-' + \
        row[TITLE].replace(' ', '-') + '.md'

    qualifying_blog_count += 1
    if row_number in random_row_nos:
        if save_blog is True:
            save_blog_count += 1
            print('Random upload row number:', row_number)
            print(blog_filename, "=========== CONTENTS BELOW ==========:")
            print(new_md)
            dump(row)
        else:
            # This random record doesn't qualify so replace
            # with next record number
            print('random record number:', row_number,
                  "doesn't qualify as blog so using next number.")
            index = random_row_nos.index(row_number)
            random_row_nos[index] = row_number + 1


print('\n==============   T O T A L S   ================')
print('accepted_count:', accepted_count, 'total_votes:', total_votes)
print('question_count:', question_count, 'answer_count:', answer_count,
      'unknown_count:', unknown_count)
print('total_lines:', total_lines, 'total_header_spaces:', total_header_spaces,
      'total_quote_spaces:', total_quote_spaces)
print('total_paragraphs:', total_paragraphs, "total_code_blocks:",
      total_code_blocks, 'total_code_block_lines:', total_code_block_lines)
print('total_pre_codes:', total_pre_codes)

# End of stack-to-blog.py
