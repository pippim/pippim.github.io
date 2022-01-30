#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ==============================================================================
#
#       website-search.py - Create dictionary of search words.
#
#       Jan. 25 2022 - Initial version.
#
# ==============================================================================

"""
    USAGE
    ============================================================================

    import website_search
    ws = website_search.WebsiteSearch()

    For each post:
        ws.post_init(final_url)
        For each line in post:
            ws.parse(line)
        ws.post_save()

    ws.site_save()

    On the client side using AJAX, see examples of $,getJSON():
        https://www.sitepoint.com/ajaxjquery-getjson-simple-example/

    On the client side using FETCH(), see examples:
        https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        https://www.xul.fr/en/html5/fetch.php

Yes. "Object vs Arrays in Javascript is as Python's Dictionaries vs Lists".
Performance pros and cons are also the same. With lists being more efficient
if numeric indexes are appropriate to the task and dictionaries being more
efficient for long lists that must be accessed by a string.

var dict = {};
dict['apple'] = "a sweet edible fruit";
dict['boy'] = "a young male human";

var list = [];
list.push("apples");
list.push("oranges");
list.push("pears");



"""

from __future__ import print_function  # Must be first import
from __future__ import with_statement  # Error handling for file opens

#import time
from datetime import datetime as dt
# Above for error: datetime.now().strftime("%Y-%m-%d %H:%M:%S")
# AttributeError: 'module' object has no attribute 'now'
# Credit: https://stackoverflow.com/a/32463688/6929343

import json

"""
    TO-DO
    ============================================================================

    Punctuation - If word ends in "?" then remove "?". Same is true for "!".

        If word ends in " (double quotes) and starts with " then drop both ".
        Same is true for ' (single quote) and ` (backtick).

        Punctuations in the middle like post.title, my_var, set-brightness.sh
            we want to keep. People will search matching programming terms.

    Change:
    
        https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-30-Laptop-not-coming-back-from-sleep-after-lid-close.html

    To:
        https://pippim.github.io/2018/05/30/Laptop-not-coming-back-from-sleep-after-lid-close.html

    Create javascript for search engine. To keep global use properties service:
        
        https://stackoverflow.com/questions/30053254/saving-an-array-globally
        
    A list in Python is called an Array in Javascript:
    
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
        
    A dictionary in Python is called an Object in Javascript:
    
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
        
    For python dictionary like behavior in a Javascript Object:
    
        From: https://livecodestream.dev/post/everything-you-should-know-about-javascript-dictionaries/
            let dict = Object.create(null)
            let dict = {
            "color": "red",
            1: [12, 14, 90],
            1.2: 123,
            
    Get object: https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
    
        $.getJSON('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json', function(data) {
            // JSON result in `data` variable
        });

    Not using JQuery, this answer: https://stackoverflow.com/a/55784549/6929343        

        async function load() {
            let url = 'https://raw.githubusercontent.com/pippim...';
            let obj = null;
            
            try {
                obj = await (await fetch(url)).json();
            } catch(e) {
                console.log('error');
            }
            
            console.log(obj["brightness"]);
        }
        
        load();
 
"""

# https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json
INCLUDE_FILE = "../assets/json/search_include.json"
EXCLUDE_FILE = "../assets/json/search_exclude.json"
SYMBOL_FILE = "../assets/json/search_symbol.json"
# https://github.com/pippim/pippim.github.io/blob/main/assets/json/search_url.json
URL_FILE = '../assets/json/search_url.json'
MAX_WORD_SIZE = 20  # Anything longer than 20 is a hyperlink

# If word ends in "es" and no match subtract that and check for match
# If word ends in "'s"      "           "           "           "
# If word ends in "s"       "           "           "           "
# If word ends in "ed"      "           "           "           "
# If word ends in "ly"      "           "           "           "
# If word ends in "n't"     "           "           "           "
# If word ends in "ing"     "           "           "           "

''' TODO: What happens to e.g. or E.G.
          Decided not to exclude "slow", "slowly", "long" and "forever"
'''
exclude_word_list = [
    'a', 'accept', 'add', 'after', 'afternoon', 'also', 'and', 'another',
    'answer', 'app', 'application', 'appear', 'appears', 'attempt',
    'bad', 'basically', 'be', 'bed', 'because', 'before', 'beginner',
    'believe', 'bet', 'broke', 'broken', 'bug', 'but',
    'can', 'cannot', 'case', 'casual', 'change', 'close', 'computer',
    'conquer', 'consequently', 'cool', 'could', 'crazy',
    'dam', 'damn', 'delete', 'decide', 'decision', 'desperate',
    'disappear', 'do', 'done',
    'edit', 'eg', 'either', 'enough', 'error', 'even', 'eventually', 'evening',
    'end', 'ever', 'every', 'everyone', 'everytime', 'everything', 'everywhere',
    'fail', 'failure', 'famous', 'fantastic', 'feel', 'few', 'feeling',
    'finally', 'file', 'filename', 'finish', 'for', 'formerly', 'fun'
    'gather', 'get', 'go', 'good', 'got', 'great',
    'ha', 'had', 'haha', 'has', 'have', 'he', 'hear', 'heard',
    'help', 'her', 'him', 'his', 'how', 'hope', 'hoping', 'however',
    'i', 'if', "i'm", 'in', 'instead', 'interest', 'it', 'itself',
    'just',
    'keep', 'know', 'known',
    'laptop', 'less', 'like', 'linux', 'look',
    'many', 'me', 'message', 'mine', 'more', 'modify', 'morning', 'my', 'myself',
    'neat', 'need', 'never', 'new', 'newbie', 'nice', 'night',
    'no', 'not', 'note', 'nothing',
    'off', 'old', 'on', 'open', 'or', 'our', 'ourselves', 'out', 'over',
    'performance', 'please', 'poor', 'primarily', 'pc', 'program', 'ps',
    'quality', 'question', 'quick', 'quickest', 'quickly', 'quirk', 'quit',
    'ready', 'real', 'really', 'revise', 'right',
    'said', 'script', 'searching', 'seems', 'set', 'she', 'should', 'side',
    'so', 'solution', 'soon', 'someone', 'something', 'sometime', 'speed',
    'start', 'strange', 'suggest', 'suggestion', 'sure',
    'thank', 'the', 'them', 'then', 'think', 'thought', 'through',
    'time', 'tired', 'to', 'today', 'tomorrow', 'tonight', 'tried', 'try',
    'ubuntu', 'unknown', 'until', 'unless', 'update', 'us',
    'very', 'verify',
    'who', 'what', 'where', 'when', 'why', 'want', 'way', 'we', 'whenever',
    'windows', 'weird', 'will',  'willing', 'wish', 'wonder', "won't",
    'work', 'working', 'would', 'wrong',
    'yes', 'you', 'your', 'yourself', "you're",
    'zealous', 'zombie', 'january', 'february', 'march', 'april', 'may',
    'june', 'july', 'august', 'september', 'october', 'november', 'december',
    'one', 'first', 'two', 'twice', 'second', 'three', 'third',
    'four', 'fourth', 'five', 'fifth', 'six', 'sixth',
    'afaik', 'fwiw', 'hth', 'iirc', 'imo', 'imho', 'lol', 'tl;dr'
]

# Create dictionary from list, each key has value 0 (count word usage)
# At EOJ write out dictionary to JSON file exclude.json for website to use

tt_DEBUG = False  # Print debug events


class InitCommonVars:
    """ Variables common to WebsiteSearch__init__() and post_init()
        Must appear before first reference (ShowInfo)
    """

    def __init__(self):
        self.post_included = {}             # post_init() dictionary for included
        self.post_excluded = {}             # post_init() excluded words & counts
        self.post_final_url = None          # rendered html URL


class WebsiteSearch(InitCommonVars):
    """ Manage fading in and fading out of tooltips (balloons).
    """

    def __init__(self):

        """ Duplicate entry_init() """
        InitCommonVars.__init__(self)       # Recycled class to set self. instances

        self.site_included = {}             # All words indexed on site
        # All words excluded on site - dict build from list with 0 counts
        self.site_excluded = dict.fromkeys(exclude_word_list, 0)
        self.url_list = []                  # list of urls in search dictionary
        self.post_index = 0                 # post in

    def post_init(self, post_final_url):

        InitCommonVars.__init__(self)  # Initialize all tip instances

        self.post_final_url = post_final_url
        self.url_list.append(self.post_final_url)

    def parse(self, ln):
        """ Parse every word in line.
        """
        # Don't index #, ##, ###, etc heading levels at start of line
        while ln[:1] == "#":
            ln = ln[1:]

        words = ln.split()
        for word in words:
            if len(word) > MAX_WORD_SIZE:
                continue
            word = word.lower()
            word = self.remove_pairs(word)
            if len(word) == 0:
                continue
            if self.word_excluded(word):
                # https://stackoverflow.com/a/12992212/6929343
                self.post_excluded[word] = self.post_excluded.get(word, 0) + 1
            else:
                self.post_included[word] = self.post_included.get(word, 0) + 1

    def remove_pairs(self, word):
        """ Recursive call such that "**Brightness**" becomes Brightness """
        # Unfortunately we get:
        #   "sharing.png][2]][2": [
        #     374

        if len(word) <= 1:
            return word  # Prevent infinite recursions

        first_char = word[:1]
        last_char = word[-1:]
        if first_char == last_char:
            if first_char in ".,:[{(<``" or first_char in '"':
                word = word[1:]
                word = word[:-1]
                word = self.remove_pairs(word)

        # Note we want to keep $brightness as bash variable name
        if first_char in ".,:*`":
            word = word[1:]
            word = self.remove_pairs(word)

        if last_char in ".,:*`":
            word = word[:-1]
            word = self.remove_pairs(word)

        return word

    def word_excluded(self, word):
        if word in self.site_excluded:
            return True

        # If word ends in "es" and no match subtract that and check for match
        # If word ends in "'s"      "           "           "           "
        # If word ends in "s"       "           "           "           "
        # If word ends in "es"      "           "           "           "
        # If word ends in "ed"      "           "           "           "
        # If word ends in "ly"      "           "           "           "
        # If word ends in "n't"     "           "           "           "
        # If word ends in "ing"     "           "           "           "
        last_3 = word[-3:]
        if last_3 == "ing" or last_3 == "n't":
            if word[:-3] in self.site_excluded:
                return True

        last_2 = word[-2:]
        if last_2 == "ly" or last_2 == "ed" or last_2 == "'s" or last_2 == "es":
            if word[:-2] in self.site_excluded:
                return True

        last_1 = word[-1:]
        if last_1 == "s":
            if word[:-1] in self.site_excluded:
                return True

        return False

    def post_save(self):
        """ Roll up post totals into site totals
        """
        for i in self.post_included:
            # For every word included in post, update site included word dictionary
            self.site_included.setdefault(i, [])
            self.site_included[i].append(self.post_index)
        for i in self.post_excluded:
            # For counts of words excluded from post, update site excluded word count
            self.site_excluded.setdefault(i, 0)
            self.site_excluded[i] += self.post_excluded[i]
        # Increment index for next post to add
        self.post_index += 1

    def site_save(self):
        """ Convert site totals to JSON format
        """
        json_object = json.dumps(self.site_included, indent=2, ensure_ascii=False)
        with open(INCLUDE_FILE, 'w') as fh:
            fh.write(json_object)
        json_object = json.dumps(self.site_excluded, indent=2)
        with open(EXCLUDE_FILE, 'w') as fh:
            fh.write(json_object)
        json_object = json.dumps(self.url_list, indent=2)
        with open(URL_FILE, 'w') as fh:
            fh.write(json_object)

        print('website-search.py')
        print('total indexed pages: ', len(self.url_list))
        print('total included words:', len(self.site_included))
        total = 0
        for i in self.site_included:
            total += len(self.site_included[i])
        print('total html page references:', total)
        print('total excluded words:', len(self.site_excluded))
        total = 0
        for i in self.site_excluded:
            total += self.site_excluded[i]
        print('total times words excluded:', total)


def d_print(*args):
    """ Only print debugging lines when tt_DEBUG is true """
    if tt_DEBUG is True:
        prt_time = dt.utcnow().strftime("%M:%S.%f")[:-3]
        print(prt_time, *args)

# End of search.py
