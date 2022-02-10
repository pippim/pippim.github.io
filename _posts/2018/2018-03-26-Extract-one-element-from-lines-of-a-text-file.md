---
layout:       post
title:        >
    Extract one element from lines of a text file
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1019411
type:         Answer
tags:         command-line text-processing grep
created_date: 2018-03-26 17:04:33
edit_date:    2018-03-27 10:32:56
votes:        "3 "
favorites:    
views:        "1,313 "
accepted:     
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-26-Extract-one-element-from-lines-of-a-text-file.md
toc:          false
navigation:   false
clipboard:    true
---

This is one of those questions where it is helpful to have test input file and examples of desired output.

# Input File

Here is a test input file I copied from the Internet and modified to encase search words within `**` pairs:

{% include copyHeader.html %}
``` 
$ cat ~/Downloads/wordlist.txt
**Schadenfreude**
This is a German word, although used in English too, which is used to mean ‘malicious enjoyment of the misfortunes of others’. It comes from the joining of the words schaden meaning ‘harm’ and freude meaning ‘joy’.

**Waldeinsamkeit**
Ever found yourself wandering alone through a forest and wanting to express the emotion brought about by that wander? Look no further! In German, Waldeinsamkeit means ‘woodland solitude’.

**L’esprit de l’escalier**
We all know the feeling of walking away from an argument and instantly thinking of the ideal comeback, or leaving a conversation and remembering the perfect contribution to a no-longer relevant subject. In French, l’esprit de l’escalier is the term used to refer to that irritating feeling. It literally translates as ‘the spirit of the staircase’, more commonly known as ‘staircase wit’. It comes from the idea of thinking of a response as you’re leaving somebody’s house, via their staircase.

**Schlimazel**
The Mr Men series of books by Roger Hargreaves is a staple of many a British child’s bookshelves, and there is a word which could have been created for the character Mr Bump. Like Mr Bump, a Schlimazel is ‘a consistently unlucky, accident-prone person, a born loser’. It is a Yiddish word, coming from the Middle High German word slim meaning ‘crooked’ and the Hebrew mazzāl meaning ‘luck’.

**Depaysement**
Ever go on holiday, only to experience a strange sensation of disorientation at the change of scenery? Dépaysement is a French word which refers to that feeling of disorientation that specifically arises when you are not in your home country.

**Duende**
This Spanish term implies something magical or enchanting. It originally referred to a supernatural being or spirit  similar to an imp or pixie (and is occasionally borrowed in that sense into English with reference to Spanish and Latin American folklore). Now, it has adapted to refer to the spirit of art or the power that a song or piece of art has to deeply move a person.

**Torschlusspanik**
Are you getting older? Scared of being left behind or ‘left on the shelf’? This British idiom has its own word in German: Torschlusspanik, which literally translates as ‘panic at the shutting of a gate’, is used frequently in a general sense meaning ‘last –minute panic’, of the type you might experience before a deadline.

*Do*Not*Return*these four star lines
*word***
***word*
word**
```

# Using `grep`

Using `grep` it's fairly straightforward to get a word list:

``` 
$ grep -E -o '\*\*[^*]{,20}\*\*' ~/Downloads/wordlist.txt
**Schadenfreude**
**Waldeinsamkeit**
**L’esprit de l’escalier**
**Schlimazel**
**Depaysement**
**Duende**
**Torschlusspanik**
```

If you want to remove the `**` encasing the words, add a pipe to `sed`:

``` 
$ grep -E -o '\*\*[^*]{,20}\*\*' ~/Downloads/wordlist.txt | sed 's/*//g'
Schadenfreude
Waldeinsamkeit
L’esprit de l’escalier
Schlimazel
Depaysement
Duende
Torschlusspanik
```

# Saving index of words to a file

If you want to save your `grep` and `sed` output use the file redirection `>` command:

``` 
$ grep -E -o '\*\*[^*]{,20}\*\*' ~/Downloads/wordlist.txt | sed 's/*//g' > ~/Downloads/wordlist-index.txt

$ cat ~/Downloads/wordlist-index.txt
Schadenfreude
Waldeinsamkeit
L’esprit de l’escalier
Schlimazel
Depaysement
Duende
Torschlusspanik
```

Note original answer posted yesterday enhanced with new post today from muru on a separate Q&A: [Use specified quantifier in grep to retrieve satisfied vocabulary][1]


  [1]: https://askubuntu.com/questions/1019528/use-specified-quantifier-in-grep-to-retrieve-satisfied-vocabulary/1019532#1019532
