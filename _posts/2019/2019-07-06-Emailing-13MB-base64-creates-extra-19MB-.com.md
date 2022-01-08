---
layout:       post
title:        >
    Emailing 13MB base64 creates extra 19MB .com
site:         Super User
stack_url:    https://superuser.com/q/1456859
type:         Answer
tags:         email backup gmail tar gmail-imap
created_date: 2019-07-06 18:26:26
edit_date:    
votes:        "1 "
favorites:    
views:        "39 "
accepted:     Accepted
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    false
---

I was using instructions in the most up-voted answer:

- [How can I send attachment with ssmtp in Linux?][1]

that recommends:

``` 
echo -e "to: receiver@domain.tld\nsubject: subject\n"| (cat - && uuencode /path/to/attachment attachment.name) | ssmtp receiver@gmail.com

```

I did some new research and it seems `uuencode` was something popular 25 years ago but not so much today. The basic flaw with the bash script is `uuencode` is putting the attachment within the body of the message.

A much better method was found here:

- [5 Ways to Send Email From Linux Command Line][2]

Where I used the `mail` program built into my Ubuntu distribution already:

``` 
mail -a "$Filename64" -s "$Filename64" "$EmailAddr" < /dev/null

```


  [1]: https://unix.stackexchange.com/a/90881/200094
  [2]: https://tecadmin.net/ways-to-send-email-from-linux-command-line/
