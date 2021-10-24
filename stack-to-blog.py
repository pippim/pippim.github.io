#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ==============================================================================
#
#       stack-to-blog.py - Convert Stack Exchange Answers with a score of 2 or
#           more or that has been accepted into a Jekyll blog post.
#
#       Oct. 24 2021 - Initial version.
#
# ==============================================================================

"""
    USAGE
    ============================================================================

    Run the stack exchange data explorer query 'StackBlogPost'. First 3 lines:

    -- StackBlogPost: Convert Stack Exchange Answers to Blog Posts in Jekyll
    -- From: https://data.stackexchange.com/stackoverflow/query/edit/1492412#resultSets
    -- AccountId: Your SE network account ID number, found in the URL of your network profile page:

    Save the results in CSV format as QueryResults.csv

    Run stack-to-blog.py

"""

from __future__ import print_function  # Must be first import
from __future__ import with_statement  # Error handling for file opens

import csv

fields = []
data = []

with open('QueryResults.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print('Column names are"', row)
            fields = row
        else:
            data.append(row)
        line_count += 1

    print('Total rows:', line_count)

# Copy terminal output for first row containing column names.
# Then assign each column an 0-based index.
SITE = 0
POST_ID = 1
TYPE = 2
TITLE = 3
HTML = 4
MARKDOWN = 5
TAGS = 6
CREATED = 7
LAST_EDIT = 8
EDITED_BY = 9
SCORE = 10
FAVORITES = 11
VIEWS = 12
ANSWERS = 13
ACCEPTED = 14
CW = 15
CLOSED = 16

accepted_count = 0
question_count = 0
answer_count = 0
unknown_count = 0

total_votes = 0

for row in data:
    if row[SCORE] != '':
        score = int(row[SCORE])
    else:
        score = 0
    total_votes += score

    if row[TYPE] == "Question":
        question_count += 1
    elif row[TYPE] == "Answer":
        answer_count += 1
    else:
        unknown_count += 1  # Happens when managing stack exchange site
        #print('Unknown Type:', row)

    if row[ACCEPTED] != '':
        #print(row)
        accepted_count += 1

print('accepted_count:', accepted_count, 'total_votes:', total_votes)
print('question_count:', question_count, 'answer_count:', answer_count,
      'unknown_count:', unknown_count)

print('\n', fields)  # Reprint heading as footer for easier lookup on terminal

# End of stack-to-blog.py
