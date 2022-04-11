---
layout:       post
title:        >
    How can I send mobile text message from terminal?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1104018
type:         Answer
tags:         command-line bash windows-subsystem-for-linux sms
created_date: 2018-12-23 13:55:49
edit_date:    2020-06-12 14:37:07
votes:        "60 "
favorites:    
views:        "80,180 "
accepted:     Accepted
uploaded:     2022-04-11 04:33:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-23-How-can-I-send-mobile-text-message-from-terminal_.md
toc:          false
navigation:   true
clipboard:    false
---




<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# SMS Texting from Terminal / Shell / Bash

For the following steps open a terminal prompt aka "Command Line Interface" or "CLI". In most Linux distributions do this using <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>

## `textbelt.com` to send text from bash

I found a reddit article: [Send an SMS Text Message from the Command Line][1] with this Bash / Terminal command you can use:

``` bash
curl -X POST https://textbelt.com/text \
   --data-urlencode phone='7801234567' \
   --data-urlencode message='Find Your Phone!' \
   -d key=textbelt
```

Replace `7801234567` with your phone number. If you are texting an international phone number (outside Canada / USA) follow these [instructions][2].

**Note:** The software replaces "Find Your Phone!" with a message that you need to purchase a key to use a custom message. But the software still insists you must provide a message that gets overwritten.

----------


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## Other reasons for sending SMS Text Message from Bash

Finding my smartphone was an unusual need to send an SMS text message from Bash. You might have a few people that should be texted when:

- Disks are about to fail (or other hardware errors occurred)
- Disk space utilization exceeds threshold, for example 90%
- RAM is full and swap is being used heavily
- Web server is experiencing external attacks
- A user had too many invalid sign-ons and account is deactivated
- A specific job has been run which effects key processes
- A door badge reader monitors a certain door being unlocked

----------


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## `textbelt.com` is Free for one text per day

Only one **free** SMS message a day can be sent by a given sender. Here is an example of the first and second attempts on one day:

``` bash
$ find-phone # bash script with above command
{"success":true,"textId":"168141545572031481","quotaRemaining":0}

$ find-phone
{"success":false,"error":"Only one test text message is allowed per day.","quotaRemaining":0}
```

**Note:** You maybe able to reset your router's IP address for more than one text per day but I haven't tested this yet.

You can use prepaid unlimited texts. There are many SMS gateway services available. Pricing at above vendor link varies from $0.03 to $0.15 per text. This is for reference and not an endorsement nor recommendation. Please do your homework and search for reputable pay-for-service vendors at best prices.

----------


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr5">Skip</a></div>

## Create Bash Script

You could create a bash script called `sms` containing:

``` bash
#!/bin/bash
curl -X POST https://textbelt.com/text --data-urlencode phone='$1' --data-urlencode message='$2' -d key=textbelt
```

- Send SMS message using `sms 7801234567 "Hello World"`
- Thank you Fabby for testing this from the EU and confirming it works there.

----------


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr6">Skip</a></div>

# Send Email to carrier of the smartphone with SMS Text Message

For the following all you need is a web browser like FireFox, Internet Explorer or Chrome. No need to dive into the "bowels of bash" or limit yourself to one free text per day.

Many carriers allow you to send SMS Text Message to a smartphone by addressing an email to `phone_number@mobile_provider_name.com`.

## Phone Number look up to get carrier's website address

To get the provider's website address using the phone number go to: [https://freecarrierlookup.com/](https://freecarrierlookup.com/). Imagine we entered the phone number: `7801234567`:

[![Fee Carrier Lookup.png][3]][3]

We are told the email address to use is `7801234567@pcs.rogers.com`. Now send an email to this address and your phone will sound with a notification.

Of course if you have your smartphone configured to sound with a notification when email arrives you can simply email your phone in the first place!


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr7">Skip</a></div>

## CLI interface for sending email address

In **Ask Ubuntu** there are many questions and answers on how to send email using bash. I'm using `ssmtp` (Secure Simple Mail Transport Protocol) for my `cron` daily backups: [Backup Linux configuration, scripts and documents to Gmail]({% post_url /2017/2017-06-06-Backup-Linux-configuration_-scripts-and-documents-to-Gmail %})

Although this setup is for one user, you can create a file with multiple users to text messages to:

``` bash
Name         Email Address
Tiny Tim     5551234567@att.com
Mrs. Clause  5552223333@sprint.com
Bad Elf      5551114444@telus.net
```

Then in your bash code [something like this][4]:

``` bash
ssmtp 5551234567@att.com < mail.txt
```

Where `mail.txt` looks like this:

``` bash
Cc: admin@our_company.com
Subject: Nightly Database Update FAILED
From: root@our_company.com
Content-Type: text/html; charset="utf8"


<html>
<body>
<div style="
    background-color:
    #abcdef; width: 300px;
    height: 300px;
    ">
</div>
Nightly database update failed at procedure: AP005.
</body>
</html>
```

<sub>There are many ways of sending email from bash. This is just one example. The important thing is the email address contains the smartphone number followed by the smartphone provider's web address</sub>

  [1]: https://www.reddit.com/r/linux/comments/20c58i/send_an_sms_text_message_from_the_command_line/
  [2]: https://textbelt.com/
  [3]: https://i.stack.imgur.com/k9Pro.png
  [4]: https://blog.edmdesigner.com/send-email-from-linux-command-line/


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a></div>

