---
layout:       post
title:        >
    Command not found error in Bash script
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1126586
type:         Answer
tags:         command-line bash scripts
created_date: 2019-03-18 10:52:18
edit_date:    2019-03-19 07:34:00
votes:        "4 "
favorites:    
views:        "5,254 "
accepted:     
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-03-18-Command-not-found-error-in-Bash-script.md
toc:          false
navigation:   false
clipboard:    true
---

Pasting your code into [https://www.shellcheck.net/](https://www.shellcheck.net/)/ reports:

{% include copyHeader.html %}
``` 
$ shellcheck myscript
 
Line 7:
  read -p "Enter FULL folder path where you want to install project1:" fullpath
  ^-- SC2162: read without -r will mangle backslashes.
 
Line 9:
  read -p "Continue? (Y/N): " confirm
  ^-- SC2162: read without -r will mangle backslashes.
 
Line 26:
  if find $fullpath/project1/project1_repo -mindepth 1 | read; then
          ^-- SC2086: Double quote to prevent globbing and word splitting.
                                                         ^-- SC2162: read without -r will mangle backslashes.

Did you mean: (apply this, apply all SC2086)
  if find "$fullpath"/project1/project1_repo -mindepth 1 | read; then
 
Line 36:
if [ -n "$(ls -A $DIR)" ]; then
                 ^-- SC2086: Double quote to prevent globbing and word splitting.

Did you mean: (apply this, apply all SC2086)
if [ -n "$(ls -A "$DIR")" ]; then
 
Line 45:
if [ -d $fullpath/project1/project1_repo ]; then
        ^-- SC2086: Double quote to prevent globbing and word splitting.

Did you mean: (apply this, apply all SC2086)
if [ -d "$fullpath"/project1/project1_repo ]; then
 
Line 46:
      [ -n "$(ls -A $fullpath/project1/project1_repo)" ] && echo "Not Empty" || echo "Empty"
                    ^-- SC2086: Double quote to prevent globbing and word splitting.

Did you mean: (apply this, apply all SC2086)
      [ -n "$(ls -A "$fullpath"/project1/project1_repo)" ] && echo "Not Empty" || echo "Empty"
 
Line 56:
  if [ -n "$(ls -A $fullpath/project1/project1_repo)" ]; then
                   ^-- SC2086: Double quote to prevent globbing and word splitting.

Did you mean: (apply this, apply all SC2086)
  if [ -n "$(ls -A "$fullpath"/project1/project1_repo)" ]; then
```

You can follow the suggestion to use `"$fullpath"` and any other recommendations in comments above. After fixing current errors  **ShellCheck** reports, it may then report additional errors when you run it again.
