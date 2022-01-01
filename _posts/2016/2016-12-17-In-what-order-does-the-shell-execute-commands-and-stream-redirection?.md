---
layout:       post
title:        >
    In what order does the shell execute commands and stream redirection?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/861522
type:         Answer
tags:         command-line bash redirect
created_date: 2016-12-17 03:18:28
edit_date:    
votes:        "3 "
favorites:    
views:        "5,548 "
accepted:     
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

It's always left to right... except when

Just like in Math we do left to right except multiplication and division is done before addition and subtraction, except operations inside parenthesis (+ -) would be done before multiplication and division.

As per the Bash beginners guide here ([Bash Beginners Guide][1]) there are 8 orders of hierarchy of what comes first (before left to right):

 1. Brace expansion "{}"
 2. Tilde expansion "~"
 3. Shell parameter and variable expression "$"
 4. Command substitution "$(command)"
 5. Arithmetic expression "$((EXPRESSION))"
 6. Process Substitution *what we are talking about here* "<(LIST)" or ">(LIST)"
 7. Word Splitting "'< space>< tab>< newline>'"
 8. File Name Expansion "*", "?", etc.

So it's always left to right... except when...

  [1]: http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_04.html
