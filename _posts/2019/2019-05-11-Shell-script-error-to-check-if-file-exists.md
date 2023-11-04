---
layout:       post
title:        >
    Shell script error to check if file exists
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1142370
type:         Answer
tags:         command-line bash scripts xubuntu sh
created_date: 2019-05-11 11:10:01
edit_date:    
votes:        "2 "
favorites:    
views:        "4,565 "
accepted:     
uploaded:     2023-11-04 11:19:12
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-11-Shell-script-error-to-check-if-file-exists.md
toc:          false
navigation:   false
clipboard:    false
---

I made a few changes to your script:

- `# !/bin/bash` although it works is unconventional. Use `#!/bin/bash` instead.
- Filename is one word but often we think it is two. Consequently it was spelled differently as `file-name` and `file_name`
- Cosmetically lines between `if` -> `else` -> `fi` should be indented for greater readability. It still works vertically aligned it's just easier to read when indented.
- Extra words in `Enter the name of the file` can be shortened to `Enter filename` to make programs shorter and faster. This also makes it quicker for people to read instructions.



``` bash
#!/bin/bash

echo -e "Enter filename: \c"
read filename

if [ -e "$filename" ]
then
    echo "$filename found"
else
    echo "$filename not found"
fi
```
