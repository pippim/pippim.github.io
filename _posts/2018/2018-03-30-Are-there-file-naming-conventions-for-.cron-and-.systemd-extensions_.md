---
layout:       post
title:        >
    Are there file-naming conventions for .cron and .systemd extensions?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1020411
type:         Question
tags:         bash scripts files cron systemd
created_date: 2018-03-30 00:20:03
edit_date:    2021-08-05 07:11:28
votes:        "2 "
favorites:    
views:        "1,558 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-30-Are-there-file-naming-conventions-for-.cron-and-.systemd-extensions_.md
toc:          false
navigation:   false
clipboard:    false
---

I'm starting to rename all my existing bash scripts in `/home/Me/bin` and `/usr/local/bin` from no extension to a `.sh` extension. The reason is the exact same file name with drastically different contents and purposes will sometimes exist in `/etc/cron.d` or `/lib/systemd/system-sleep`. This is causing false-positives with `locate --regex '<file_name>'` searches.

I've googled around and can't find any file extension naming conventions for `cron` or `systemd`.

- If I went with DOS 8.3 conventions I would pick `.crn` and `.syd`
- If I went with 4 characters it I would pick `.cron` and `.sysd`
- If I went with 2 characters like `.sh` I would pick `.cr` and `.sd`

I've seen `.py` used for Python, `.c` for C program, `.h` for header file, `.o` for compiled object. This leads me to presume the Linux-verse would prefer two character extensions. I think the four character extensions are more readable. I don't see any need for DOS 8.3 format since the old 8.x component is now 256.x in size or something like that. Systemd service files buck the "shorter-is-better" trend with `.service` files instead of `.sr` or `.srv`.

Before I go through the labour of renaming files and editing the parents that call the files with new names, **are there any existing file extension conventions**?

Note that if you or your organization has internal standards, that would be a perfectly acceptable answer, in absence of industry standards.


----------

Just found a [launchpad bug report][1] where a user named a job `/etc/cron.d/job.cron` and it crashed due to the `.` in the name. The bug was filed in 2011 and confirmed, but still not fixed.

This means all my extensions will have to start with `-` instead of `.`


  [1]: https://bugs.launchpad.net/ubuntu/+source/cron/+bug/706565
