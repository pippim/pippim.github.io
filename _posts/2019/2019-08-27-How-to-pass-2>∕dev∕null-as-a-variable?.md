---
layout:       post
title:        >
    How to pass 2>∕dev∕null as a variable?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1168750
type:         Question
tags:         command-line bash redirect
created_date: 2019-08-27 00:51:14
edit_date:    2019-08-28 04:23:58
votes:        "16 "
favorites:    2
views:        "4,657 "
accepted:     Accepted
uploaded:     2022-01-09 15:58:35
toc:          false
navigation:   false
clipboard:    false
---

I have this code that works:

<!-- Language-all: lang-bash -->

``` 
# Hide irrelevant errors so chrome doesn't email us in cron
if [[ $fCron == true ]] ; then
    google-chrome --headless --disable-gpu --dump-dom \
        "$RobWebAddress" > "$DownloadName" 2>/dev/null
else
    # Get silly error messages when running from terminal
    google-chrome --headless --disable-gpu --dump-dom \
        "$RobWebAddress" > "$DownloadName"
fi

```

If I try to shorten it like this:

``` 
# Hide irrelevant errors so chrome doesn't email us in cron
local HideErrors
[[ $fCron == true ]] && HideErrors="2>/dev/null"

google-chrome --headless --disable-gpu --dump-dom \
    "$RobWebAddress" > "$DownloadName" "$HideErrors"

```

I get error messages:

``` 
[0826/043058.634775:ERROR:headless_shell.cc(597)] Open multiple tabs is only supported when remote debugging is enabled.
[0826/043058.672587:ERROR:headless_shell.cc(597)] Open multiple tabs is only supported when remote debugging is enabled.
[0826/043058.711640:ERROR:headless_shell.cc(597)] Open multiple tabs is only supported when remote debugging is enabled.
(... SNIP ...)

```

Why does a hard-coded argument work but not an argument as a variable?


----------

### Edit 2:

Currently I found success with second answer's alternate suggestion:

``` 
# Redirect errors when cron is used to /dev/null to reduce emails
ErrorPipe=/dev/stderr
[[ $fCron == true ]] && ErrorPipe=/dev/null

google-chrome --headless --disable-gpu --dump-dom \
                "$RobWebAddress" > "$DownloadName" 2>"$ErrorPipe"
## 
```



### Edit 1:

Based on the first answer, I should point out program header already contains:

``` 
[[ $fCron != true ]] &&
    exec 2> >(grep -v 'GtkDialog mapped without a transient parent' >&2)

```
