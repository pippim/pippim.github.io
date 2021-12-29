---
layout:       post
title:        Can't grep price in downloaded webpage
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1167206
type:         Question
tags:         websites html css
created_date: 2019-08-21 01:16:35
edit_date:    2019-08-24 03:48:05
votes:        0
favorites:    
views:        299
accepted:     Accepted
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

Using `wget` I downloaded this webpage:

[![Walmart Website.png][1]][1]

With the command:

``` 
RobWebsiteAddress="https://www.walmart.ca/en/ip/Dispenser-Set-Tumbler-Organizer-Bathroom-Bin-Holder-Bathroom-Containers-Soap-Set-Accessories-Travel-6Pcs-Accessory-Ejoyous-Dish-Toothbrush/PRD4406MV3EZF75"
DownloadName="Ejoyous1"
wget -O- -q --user-agent=AGENT "$RobWebAddress" > "$DownloadName"

```

When I try to open the file in `gedit` it goes crazy.

When I use:

``` 
grep -i 23.31 Ejoyous1 | wc
      0       0       0

```

The price isn't found. If I `grep` on the word `price` I get one long line of 146,329 characters returned which is probably what drove `gedit` crazy:

``` 
$ grep -i price Ejoyous1 | wc
      1    6292  146329

```

Within the .5 MB file is some hints:

``` 
$ grep -i necolas Ejoyous1
/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */

```

As you can tell this is from Walmart's website. I have no problem getting Costco's pricing and Ikea's pricing by simply downloading the webpage with `wget` and grepping it. I also have no problem viewing the downloaded files from Costco or Ikea with `gedit`.

How can I interpret this language if it's a derivative of HTML? What tools should I use? Any clues to get on the right path?

  [1]: https://i.stack.imgur.com/ckgq7.png
