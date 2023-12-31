---
layout:       post
title:        >
    Printing out from a file
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1184589
type:         Answer
tags:         server apache2 iptables
created_date: 2019-10-29 00:54:42
edit_date:    
votes:        "0 "
favorites:    
views:        "43 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-29-Printing-out-from-a-file.md
toc:          false
navigation:   false
clipboard:    false
---

There's probably a better way but this is what I would do. First convert the input file:

``` 
$ cat nmap-scan.txt

Host: 45.310.302.11 (li982-11.members.ionic.com)    
Ports: 21/closed/tcp//ftp///, 22/open/tcp//ssh//OpenSSH 5.3 (protocol 2.0)/, 23/closed/tcp//telnet///, 25/closed/tcp//smtp///, 53/closed/tcp//domain///, 80/open/tcp//http//Apache httpd/, 110/closed/tcp//pop3///, 111/closed/tcp//rpcbind///, 135/filtered/tcp//msrpc///, 139/filtered/tcp//netbios-ssn///, 143/closed/tcp//imap///, 443/open/tcp//ssl|http//Apache httpd/, 445/filtered/tcp//microsoft-ds///, 993/closed/tcp//imaps///, 995/closed/tcp//pop3s///, 1723/closed/tcp//pptp///, 3306/open/tcp//mysql//MySQL 5.7.24/, 3389/closed/tcp//ms-wbt-server///, 5900/closed/tcp//vnc///, 8080/closed/tcp//http-proxy///
```

To a new file with fields separated by new lines:

``` 
$ sed -e 's/, /\n/g' nmap-scan.txt > nmap-new.txt

$ cat nmap-new.txt

Host: 45.310.302.11 (li982-11.members.ionic.com)    
Ports: 21/closed/tcp//ftp///
22/open/tcp//ssh//OpenSSH 5.3 (protocol 2.0)/
23/closed/tcp//telnet///
25/closed/tcp//smtp///
53/closed/tcp//domain///
80/open/tcp//http//Apache httpd/
110/closed/tcp//pop3///
111/closed/tcp//rpcbind///
135/filtered/tcp//msrpc///
139/filtered/tcp//netbios-ssn///
143/closed/tcp//imap///
443/open/tcp//ssl|http//Apache httpd/
445/filtered/tcp//microsoft-ds///
993/closed/tcp//imaps///
995/closed/tcp//pop3s///
1723/closed/tcp//pptp///
3306/open/tcp//mysql//MySQL 5.7.24/
3389/closed/tcp//ms-wbt-server///
5900/closed/tcp//vnc///
8080/closed/tcp//http-proxy///
```

Then grep the new file in simpler syntax:

``` 
$ grep -E '^80/|^443/' nmap-new.txt

80/open/tcp//http//Apache httpd/
443/open/tcp//ssl|http//Apache httpd/
```

