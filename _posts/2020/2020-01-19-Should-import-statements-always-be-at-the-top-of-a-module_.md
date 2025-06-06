---
layout:       post
title:        >
    Should import statements always be at the top of a module?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59812974
type:         Answer
tags:         python optimization pep8
created_date: 2020-01-19 18:11:30
edit_date:    2020-06-20 09:12:55
votes:        "2 "
favorites:    
views:        "197,386 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-01-19-Should-import-statements-always-be-at-the-top-of-a-module_.md
toc:          false
navigation:   false
clipboard:    false
---

# Readability

In addition to startup performance, there is a readability argument to be made for localizing `import` statements. For example take python line numbers 1283 through 1296 in my current first python project:

``` 
listdata.append(['tk font version', font_version])
listdata.append(['Gtk version', str(Gtk.get_major_version())+"."+
                 str(Gtk.get_minor_version())+"."+
                 str(Gtk.get_micro_version())])

import xml.etree.ElementTree as ET

xmltree = ET.parse('/usr/share/gnome/gnome-version.xml')
xmlroot = xmltree.getroot()
result = []
for child in xmlroot:
    result.append(child.text)
listdata.append(['Gnome version', result[0]+"."+result[1]+"."+
                 result[2]+" "+result[3]])
```

If the `import` statement was at the top of file I would have to scroll up a long way, or press <kbd>Home</kbd>, to find out what `ET` was. Then I would have to navigate back to line 1283 to continue reading code.

Indeed even if the `import` statement was at the top of the function (or class) as many would place it, paging up and back down would be required.

Displaying the Gnome version number will rarely be done so the `import` at top of file introduces unnecessary startup lag.
