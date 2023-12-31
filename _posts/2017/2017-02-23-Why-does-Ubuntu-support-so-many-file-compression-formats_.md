---
layout:       post
title:        >
    Why does Ubuntu support so many file compression formats?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/886470
type:         Answer
tags:         16.04 file-format archive compression
created_date: 2017-02-23 11:26:31
edit_date:    
votes:        "0 "
favorites:    
views:        "1,163 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-23-Why-does-Ubuntu-support-so-many-file-compression-formats_.md
toc:          false
navigation:   false
clipboard:    false
---

Many files are already compressed in modern day systems when it comes to audio, images, videos and games. For data files however there are lots of options available. The reason being that over time people developed new algorithms for faster speed or better compression rates.

From ([Lifehacker.com - Whats the best way to compress a bunch of files][1]) there is a nice write-up:

 - **Zip:** It won't compress your files down a ton, but it's super fast and you don't need to install any extra software. Great for Windows and Mac users.
 - **Tar.gz:** Similar to zip, tar.gz files are pretty darn fast. It's the most universally available option for Linux users, and also compresses files to a slightly smaller size than zip. Great for Linux usess.
Tar.
 - **bzip2:** Another great option for Linux users; tar.bzip2 is a bit slower than tar.gz, but will compress files to a smaller size.
 - **7z:** The archive format made popular by our favorite compression tool, 7-Zip. It's pretty slow, but it compresses files like nobody's business. This is the best format to use if you need a really, really small file. 7-Zip is only available for Windows, but you can get a command-line tool for Mac OS X and Linux, too. 7z is one of the only compression formats that can split files up into multiple archives and put them back together, too. This may seem counterintuitive, but it's useful if you're trying to send many large files over something like email, which limits the size of the files you send
 - **RAR:** This format is comparable to 7z. 7z usually has better compression, with a few notable exceptions like mp3s in which case RAR compresses to smaller sizes. However, the only software that creates RAR files (WinRAR) is shareware, and Windows-only. You can uncompress RAR files on Mac and Linux, but not create them. RAR can also split up compressed archives into multiple parts.

  [1]: http://lifehacker.com/5772385/whats-the-best-way-to-compress-a-bunch-of-files
