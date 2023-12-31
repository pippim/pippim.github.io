---
layout:       post
title:        >
    move files from its current directory into subdirectory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182528
type:         Answer
tags:         bash
created_date: 2019-10-20 22:04:06
edit_date:    2019-10-20 22:16:29
votes:        "0 "
favorites:    
views:        "1,169 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-20-move-files-from-its-current-directory-into-subdirectory.md
toc:          false
navigation:   false
clipboard:    false
---

The `mv` (move) command and the `cp` (copy) commands do not create directories like they do in Windows.

This works though:



``` bash
# loop through all subdirectories
for d in $(find . -type d) ; do
    echo $d
    myarray=( $(find $d -maxdepth 1 -name "*.json") )
    if [ ${#myarray[@]} -gt 0 ]; then 
        mkdir -p $d/JSON/
        mv $d/*.json $d/JSON/
    fi
done
```


----------


You should be skeptical and test first. Here's a test script:

``` bash
#!/bin/bash

# NAME: move (move file pattern to new sub-directory name)
# PATH: $HOME/askubuntu/
# DESC: Answer for: https://askubuntu.com/questions/1182501/move-files-from-its-current-directory-into-subdirectory
# DATE: October 20, 2019.

CreateFiles () {
mkdir -p subdir-A
mkdir -p subdir-B/subdir-C

echo "1 json" >> subdir-A/1.json
echo "2 json" >> subdir-A/2.json
echo "3 json" >> subdir-A/3.json
echo "4 json" >> subdir-A/4.json
echo "1 file" >> subdir-A/1.mp4
echo "2 file" >> subdir-A/2.mp4
echo "1 file" >> subdir-A/3.mp4

echo "1 json" >> subdir-B/subdir-C/1.json
echo "2 json" >> subdir-B/subdir-C/2.json
echo "3 json" >> subdir-B/subdir-C/3.json
echo "4 json" >> subdir-B/subdir-C/4.json
echo "1 file" >> subdir-B/subdir-C/1.mp4
echo "2 file" >> subdir-B/subdir-C/2.mp4
echo "1 file" >> subdir-B/subdir-C/3.mp4
}

tree -h subdir*

CreateFiles       # Only do this once then comment it out for next time.

# loop through all subdirectories
for d in $(find . -type d) ; do
    echo $d
    myarray=( $(find $d -maxdepth 1 -name "*.json") )
    if [ ${#myarray[@]} -gt 0 ]; then 
        mkdir -p $d/JSON/
        mv $d/*.json $d/JSON/
    fi
done
```

Here's what happens when you run it:

``` bash
$ move

subdir-A
├── [   7]  1.json
├── [   7]  1.mp4
├── [   7]  2.json
├── [   7]  2.mp4
├── [   7]  3.json
├── [   7]  3.mp4
└── [   7]  4.json
subdir-B
└── [4.0K]  subdir-C
    ├── [   7]  1.json
    ├── [   7]  1.mp4
    ├── [   7]  2.json
    ├── [   7]  2.mp4
    ├── [   7]  3.json
    ├── [   7]  3.mp4
    └── [   7]  4.json

1 directory, 14 files
.
./subdir-B
./subdir-B/subdir-C
./subdir-A
subdir-A
├── [   7]  1.mp4
├── [   7]  2.mp4
├── [   7]  3.mp4
└── [4.0K]  JSON
    ├── [   7]  1.json
    ├── [   7]  2.json
    ├── [   7]  3.json
    └── [   7]  4.json
subdir-B
└── [4.0K]  subdir-C
    ├── [   7]  1.mp4
    ├── [   7]  2.mp4
    ├── [   7]  3.mp4
    └── [4.0K]  JSON
        ├── [   7]  1.json
        ├── [   7]  2.json
        ├── [   7]  3.json
        └── [   7]  4.json

3 directories, 14 files
```

