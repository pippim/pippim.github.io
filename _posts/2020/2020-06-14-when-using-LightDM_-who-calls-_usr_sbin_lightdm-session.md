---
layout:       post
title:        >
    when using LightDM, who calls /usr/sbin/lightdm-session
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1250378
type:         Answer
tags:         lightdm
created_date: 2020-06-14 21:56:34
edit_date:    
votes:        "0 "
favorites:    
views:        "252 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-14-when-using-LightDM_-who-calls-_usr_sbin_lightdm-session.md
toc:          false
navigation:   false
clipboard:    false
---

The only place I found where it is called is also commented out so it is no longer called on line 11:



``` bash
$ cat /usr/lib/lightdm/config-error-dialog.sh

# Copyright (C) 2014 Canonical Ltd
# Author: Gunnar Hjalmarsson <gunnarhj@ubuntu.com>
#
# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free Software
# Foundation, version 3 of the License.
#
# See http://www.gnu.org/copyleft/gpl.html the full text of the license.

# This file may be sourced by the function source_with_error_check() in
# /usr/sbin/lightdm-session

export TEXTDOMAIN=lightdm
. /usr/bin/gettext.sh

PARA1=$(eval_gettext 'Error found when loading $CONFIG_FILE:')
PARA2=$(gettext 'As a result the session will not be configured correctly.
You should fix the problem as soon as feasible.')

TEXT="$PARA1\n\n$(fold -s $ERR)\n\n$PARA2"

if [ -x /usr/bin/kdialog ]; then
	TEXT_FILE=$(mktemp --tmpdir config-err-kdialog-XXXXXX)
	echo -n "$TEXT" > "$TEXT_FILE"
	kdialog --textbox "$TEXT_FILE" 500 300
	rm -f "$TEXT_FILE"
elif [ -x /usr/bin/zenity ]; then
	zenity --warning --no-wrap --text="$TEXT"
fi
```

