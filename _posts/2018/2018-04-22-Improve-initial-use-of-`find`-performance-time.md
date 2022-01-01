---
layout:       post
title:        >
    Improve initial use of `find` performance time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1027187
type:         Answer
tags:         command-line performance ram find cache conky
created_date: !!str "2018-04-22 12:37:03"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "2"
favorites:    
views:        !!str "1,263"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Challenging project

In the following sections are things that should work but don't work. In the end the only "sure-fire" way of making this work was with this bash script:



{% include copyHeader.html %}
``` bash
#!/bin/bash
# NAME: find-cache
# DESC: cache find command search files to RAM
# NOTE: Written for: https://askubuntu.com/questions/1027186/improve-initial-use-of-find-performance-time?noredirect=1#comment1669639_1027186

for i in {1..10}; do
    echo "========================" >> /tmp/find-cache.log
    printf "find-cache.log # $i: "  >> /tmp/find-cache.log
    date                            >> /tmp/find-cache.log
    echo "Free RAM at start:"       >> /tmp/find-cache.log
    free -h | head -n2              >> /tmp/find-cache.log
    printf "Count of all files: "   >> /tmp/find-cache.log
    SECONDS=0                       # Environment variable
    time find /* 2>/dev/null|wc -l  >> /tmp/find-cache.log
    duration=$SECONDS               # Set elapsed seconds
    echo "$(($duration / 60)) minutes and $(($duration % 60)) seconds for find." \
                                    >> /tmp/find-cache.log
    echo "Free RAM after find:"     >> /tmp/find-cache.log
    free -h | head -n2              >> /tmp/find-cache.log
    echo "Sleeping 15 seconds..."   >> /tmp/find-cache.log
    sleep 15
done

```

Copy above text to a script file named: `find-cache`. Put the script name in **Startup Applications**. Use the instructions in the next section but substitute the command name `/usr/bin/find...` with `/<path-to-script>/find-cache`.

Don't forget to mark the script as executable using:

``` bash
chmod a+x /<path-to-script>/find-cache

```

`<path-to-script>` should be in your $PATH environment such as `/usr/local/bin` or preferably `/home/<your-user-name>/bin`. To double check use `echo $PATH` to reveal the environment variable.

Every time I login I usually startup `conky` and `firefox`. You probably do other things. To fine-tune settings for your system check the log file:

{% include copyHeader.html %}
``` bash
$ cat /tmp/find-cache.log
========================
find-cache.log # 1: Sun Apr 22 09:48:40 MDT 2018
Free RAM at start:
              total        used        free      shared  buff/cache   available
Mem:           7.4G        431M        5.9G        628M        1.1G        6.1G
Count of all files: 1906881
0 minutes and 59 seconds for find.
Free RAM after find:
              total        used        free      shared  buff/cache   available
Mem:           7.4G        1.1G        3.0G        599M        3.3G        5.3G
Sleeping 15 seconds...
========================
find-cache.log # 2: Sun Apr 22 09:49:54 MDT 2018
Free RAM at start:
              total        used        free      shared  buff/cache   available
Mem:           7.4G        1.2G        2.9G        599M        3.3G        5.3G
Count of all files: 1903097
0 minutes and 9 seconds for find.
Free RAM after find:
              total        used        free      shared  buff/cache   available
Mem:           7.4G        1.1G        3.0G        599M        3.3G        5.3G
Sleeping 15 seconds...

    (... SNIP ...)

```

**Note:** between 1st and 2nd iteration free RAM drops 3 GB but `firefox` is restoring 12 tabs at the same time.

**What's going on?** For whatever reason when `find` is run just once in a startup bash job, or a `cron` reboot bash job, the Linux Kernel thinks: *"They probably don't want to keep the page cache so I'll empty it to save RAM"*. However when the `find` command is run 10 times as in this script the Linux Kernel thinks: *"Whoaa they really like this stuff in the page cache, I better not clear it out"*.

At least that is my best guess. Regardless of the reason, this approach works as tested many times.


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

# What should work but doesn't work

Below are two attempts at making this project work. I've left them here so others don't waste time repeating them. If you think you can fix them by all means refine them, post an answer and I'll gleefully up-vote.

## Use Startup Applications

Tap and release the <kbd>Windows</kbd> / <kbd>Super</kbd> key (it has the icon: ![Winkey1][1] or ![Winkey2][2] or ![Winkey3][3]) to bring up `dash`.

In the search field type `startup` and you'll see the **Startup Applications** icon appear. Click the icon. When the window opens click `Add` on the right. Fill in the new Startup Program fields as follows:

- Fill in the name as `Cache Find to RAM`.
- Fill in the command as `sleep 30 && find /* 2>/dev/null | wc`.
- Add a comment such as "Initial run of Find command to cache disk to ram".
- Click the `Add` button on the bottom.

Now reboot and check performance of `find` command.

**Credits:** Windows Key icons copied from Super User [post][4].

----------


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Cron at reboot

You can use `cron` to call the `find` command at boot time to cache the slow disk to fast RAM. Run the command `crontab -e` and add the following line at the bottom:

``` bash
@reboot /usr/sleep 30 && /usr/bin/find /* 2>/dev/null | wc -l

```

- `@reboot` tells `cron` to run this command at every boot / reboot.
- `/usr/sleep 30` has the `find` command wait 30 seconds before running so the boot runs as fast as possible. Increase this to 45 or 60 depending on your boot speed, time to login and your startup applications to run.
- `/usr/bin/find /* 2>/dev/null | wc-l` calls the find command searching all files (`/*`). Any error messages are hidden by `2>/dev/null`. The number of files are counted using `| wc -l`. On my system it is about 2 million due to one Ubuntu installation and two Windows 10 installations.
- After adding the line use <kbd>Ctrl</kbd>+<kbd>O</kbd> followed by <kbd>Enter</kbd> to save the file.
- After saving the file use <kbd>Ctrl</kbd>+<kbd>X</kbd> to exit the `nano` editor used by `cron`. If you chose a different editor than `nano` use the appropriate commands to save and exit.

As always the acronym **YMMV** (Your Mileage May Vary) applies.

After reboot I did these tests to prove it **does not** work:

``` bash
rick@alien:~$ time find / -type f \( -name "*.tar" -o -name "*.tar.*" \) 2>/dev/null | wc
     26      26    1278

real    1m10.022s
user    0m7.246s
sys     0m12.840s
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ time find / -type f \( -name "*.tar" -o -name "*.tar.*" \) 2>/dev/null | wc
     26      26    1278

real    0m8.954s
user    0m2.476s
sys     0m3.709s

```


  [1]: http://i.stack.imgur.com/jAWh1.png
  [2]: http://i.stack.imgur.com/MB2Nl.jpg
  [3]: http://i.stack.imgur.com/hcAFr.png
  [4]: https://superuser.com/posts/813102/edit


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a></div>

