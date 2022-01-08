---
layout:       post
title:        >
    Failure to download extra data files: flashplugin-installer (not a duplicate question)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/826750
type:         Answer
tags:         apt 16.04 firefox google-chrome flash
created_date: 2016-09-19 02:27:58
edit_date:    2017-04-13 12:25:15
votes:        "11 "
favorites:    
views:        "10,478 "
accepted:     
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    false
---

Credit to [gunnar-hjalmarsson][1] for this answer.

Adobe once began life making fonts for Microsoft Windows. Later it became the premiere program for playing videos over the internet and live TV broadcasts (which I use it for). However now HTML5 is commonly used for playing videos in Google's YouTube and FlashPlayer is becoming marginalized.

Within Google Chrome web browser `PepperFlash` support is built in so a separate flash plugin is no longer required for watching flash content. However on my system (perhaps because I deleted Google Chrome Beta) the error in the original question occurred.

The error message:

``` 
Err:1 http://archive.canonical.com/pool/partner/a/adobe-flashplugin/adobe-flashplugin_20160913.1.orig.tar.gz

```

showed up because Canonical partners was not enabled. I don't remember turning it off but the solution is to turn it on.

## Enable Canonical Partners


To enable partners in Canonical select `System Settings` then `Software & Updates` and then `Other Partners`. This screen appears:

[![Canonical Partners][2]][2]

**Check the box to allow partners**.

As Gunnar points out `flashplugin-installer` isn't needed for firefox so `adobe-flashplugin` is a better option to install. Google chrome has flash player support embedded through a process called `Pepper Flash Player` and doesn't need `flashplugin-installer` either.

The final solution is:

``` 
sudo apt-get remove flashplugin-installer
sudo apt-get purge flashplugin-installer
sudo apt-get install adobe-flashplugin

```

Thanks again to **Gunnar** for his comments to solve the pesky pop-up message.

Although `flashplugin-installer` is in the title and body, the **partner** errors could apply to many situations and I welcome recommendations to change the title, question or answer.

PS I realize remove and purge can be combined into a single line. I also realize `apt-get` is inferior to a solo `apt` in many respects.

PPS Adobe also gets credit for .PDF files although on Linux platform many free alternatives exist.

PPPS I notice there are other boxes not checked off on the screenshot above and if this answer can be improved by explaining them don't hesitate to comment. I am dpkg challenged as recent down votes have proved.


  [1]: https://askubuntu.com/users/159370/gunnar-hjalmarsson
  [2]: http://i.stack.imgur.com/Bgevc.png
