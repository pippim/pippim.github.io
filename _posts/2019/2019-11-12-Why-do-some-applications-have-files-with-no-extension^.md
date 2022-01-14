---
layout:       post
title:        >
    Why do some applications have files with no extension?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1188178
type:         Answer
tags:         file-format
created_date: 2019-11-12 14:34:59
edit_date:    
votes:        "2 "
favorites:    
views:        "7,477 "
accepted:     
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-12-Why-do-some-applications-have-files-with-no-extension^.md
toc:          false
navigation:   false
clipboard:    false
---

90% of the filenames circled are all uppercase letters. This is addressed in our sister-site Software Engineering:

- [Readme.txt vs. README.txt][1]

All-uppercase letters stand out and make the file easily visible which makes sense because it is probably the first thing a new user would want to look at. (Or, at least, should have looked at…) As others have already said, file names starting with a capital letter will be listed before lower-case names in [ASCIIbetical sorting][2] (`LC_COLLATE=C`) which helps make the file visible at a first glance.

The `README` file is part of a bunch of files a user of a free software package would normally expect to find. Others are INSTALL (instructions for building and installing the software), `AUTHORS` (list of contributors), `COPYING` (license text), `HACKING` (how to get started for contributing, maybe including a `TODO` list of starting points), `NEWS` (recent changes) or ChangeLog (mostly redundant with version control systems).

This is what the [GNU Coding Standards][3] have to say about the `README` file.

>The distribution should contain a file named `README` with a general overview of the package:  
>   
> -        the name of the package;  
> -        the version number of the package, or refer to where in the package the version can be found;  
> -        a general description of what the package does;  
> -        a reference to the file `INSTALL`, which should in turn contain an explanation of the installation procedure;  
> -        a brief explanation of any unusual top-level directories or files, or other hints for readers to find their way around the source;  
> -        a reference to the file which contains the copying conditions. The GNU GPL, if used, should be in a file called COPYING.  
> If the GNU LGPL is used, it should be in a file called  
> `COPYING`.`LESSER`.  

Developers interested in file naming conventions should visit [Software Engineering site][4].


  [1]: https://softwareengineering.stackexchange.com/questions/301691/readme-txt-vs-readme-txt
  [2]: http://www.catb.org/~esr/jargon/html/A/ASCIIbetical-order.html
  [3]: https://www.gnu.org/prep/standards/html_node/Releases.html#Releases
  [4]: https://softwareengineering.stackexchange.com
