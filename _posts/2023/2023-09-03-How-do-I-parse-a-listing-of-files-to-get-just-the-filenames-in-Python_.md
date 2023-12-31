---
layout:       post
title:        >
    How do I parse a listing of files to get just the filenames in Python?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/77031241
type:         Answer
tags:         python parsing scripting ftp ftplib
created_date: 2023-09-03 07:00:00
edit_date:    2023-09-03 15:22:23
votes:        "0 "
favorites:    
views:        "12,845 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2023/2023-09-03-How-do-I-parse-a-listing-of-files-to-get-just-the-filenames-in-Python_.md
toc:          false
navigation:   false
clipboard:    false
---

This gets a list of all the filenames plus their sizes. It also walks the sub-directories.

``` python
def ftp_login():
    """ Future FTP stuff """

    import os
    from ftplib import FTP
    ftp = FTP()
    ftp.connect('phone', 2221)
    ftp.login('android', 'android')
    print("ftp.getwelcome():", ftp.getwelcome())
    def walk(path, all):
        """ walk the path """
        files = []
        ftp.dir(path, files.append)  # callback = files.append(line)
        # Filename could be any position on line so can't use line[52:] below
        # dr-x------   3 user group            0 Aug 27 16:32 Compilations
        for f in files:
            line = ' '.join(f.split())  # compress multiple whitespace to one space
            parts = line.split()  # split on one space
            size = parts[4]
            # Date format is either: MMM DD hh:mm or MMM DD  YYYY or MMM DD YYYY
            date3 = parts[7] + " "  # doesn't matter if the size is same as YEAR
            # No shortcut ' '.join(parts[8:]) - name could have had double space
            name = f.split(date3)[1]
            if f.startswith("d"):  # directory?
                new_path = path + name + os.sep
                walk(new_path, all)  # back down the rabbit hole
            else:
                # /path/to/filename.ext <SIZE>
                all.append(path + name + " <" + size.strip() + ">")

    all_files = []
    walk(os.sep, all_files)  # 41 seconds
    print("len(all_files):", len(all_files))  # 4,074 files incl 163 + 289 subdirs
    for i in range(10):
        print(all_files[i])
```

### Output:

``` shell
ftp.getwelcome(): 220 Service ready for new user.
len(all_files): 4074
/Compilations/Greatest Hits of the 80’s [Disc #3 of 3]/3-12 Poison.wav <47480228>
/Compilations/Greatest Hits of the 80’s [Disc #3 of 3]/3-12 Poison.mp3 <7343013>
/Compilations/Greatest Hits of the 80’s [Disc #3 of 3]/3-12 Poison.flac <31112653>
/Compilations/Greatest Hits of the 80’s [Disc #3 of 3]/3-12 Poison.oga <8075357>
/Compilations/Greatest Hits of the 80’s [Disc #3 of 3]/3-12 Poison.m4a <7662899>
/Compilations/Don't Let Me Be Misunderstood/07 House Of The Rising Sun (Quasimot.m4a <8015709>
/Compilations/Don't Let Me Be Misunderstood/01 Don't Let Me Be Misunderstood.m4a <33668167>
/Compilations/Don't Let Me Be Misunderstood/03 You're My Everything.m4a <12505304>
/Compilations/Don't Let Me Be Misunderstood/02 Gloria.m4a <8115224>
/Compilations/Don't Let Me Be Misunderstood/04 Black Pot.m4a <14617541>

```

### Usage

``` 
ftp.connect('phone', 2221)
```

- Change 'phone' to the host name or IP address
- Change 2221 to the port number or skip parameter if using port `21`

``` 
ftp.login('android', 'android')
```

- Change the first 'android' to user name
- Change the second 'android' to password
