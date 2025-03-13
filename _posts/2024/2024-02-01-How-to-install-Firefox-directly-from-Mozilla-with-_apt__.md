---
layout:       post
title:        >
    How to install Firefox directly from Mozilla with `apt`?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1502032
type:         Answer
tags:         software-installation firefox deb
created_date: 2024-02-01 03:05:17
edit_date:    2024-08-08 23:52:22
votes:        "4 "
favorites:    
views:        "30,742 "
accepted:     Accepted
uploaded:     2025-03-13 15:35:00
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2024/2024-02-01-How-to-install-Firefox-directly-from-Mozilla-with-_apt__.md
toc:          false
navigation:   false
clipboard:    false
---

If you are using `snap` version you need to remove it first. Note an **Ask Ubuntu** post says you will [lose your bookmarks](https://askubuntu.com/a/1404401/307523):

``` shell
sudo snap remove firefox
```

Mozilla has [instructions on their website][1] for installing the latest `.deb` version directly:

***Note:*** Step 3 below didn't work for me. Although it's not a mandatory step, If it doesn't work for you, an alternative is shown beneath last step.

1. Create a directory to store APT repository keys if it doesn't exist:

    ``` shell
    sudo install -d -m 0755 /etc/apt/keyrings
``` 
```
```
2. Import the Mozilla APT repository signing key:

    ``` shell
    wget -q https://packages.mozilla.org/apt/repo-signing-key.gpg -O- | sudo tee /etc/apt/keyrings/packages.mozilla.org.asc > /dev/null
``` 
```
If you do not have `wget` installed, you can install it with: 

``` shell
sudo apt-get install wget
````
```
3. The fingerprint should be 35BAA0B33E9EB396F59CA838C0BA5CE6DC6315A3. *See note below if this doesn't work.*

    ``` shell
    gpg -n -q --import --import-options import-show /etc/apt/keyrings/packages.mozilla.org.asc | awk '/pub/{getline; gsub(/^ +| +$/,""); print "\n"$0"\n"}'
``` 
```
```
4. Next, add the Mozilla APT repository to your sources list:

    ``` shell
    echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] https://packages.mozilla.org/apt mozilla main" | sudo tee -a /etc/apt/sources.list.d/mozilla.list > /dev/null
``` 
```
```
5. Configure APT to prioritize packages from the Mozilla repository:

    ``` shell
    echo '
    Package: *
    Pin: origin packages.mozilla.org
    Pin-Priority: 1000
    ' | sudo tee /etc/apt/preferences.d/mozilla
``` 
```
```
6. Update your package list and install the Firefox .deb package:

    ``` shell
    sudo apt-get update && sudo apt-get install firefox
``` 
```
## ```


### Alternate method for Step 3.

To get the fingerprint in step 3 I used:

```shell
gpg --with-fingerprint /etc/apt/keyrings/packages.mozilla.org.asc | awk '/pub/{getline; gsub(/^ +| +$/,""); print "\n"$0"\n"}'

Key fingerprint = 35BA A0B3 3E9E B396 F59C  A838 C0BA 5CE6 DC63 15A3
```

---

### Summary

This worked well for Ubuntu 16.04 ESM on January 31, 2024 but others report it's working well for all modern Ubuntu versions.

There was no need to remove the old version 88 before installing the new version 122.

I was quite happy on-line banking and other advanced websites now work without having to resort to using Chromium. I keep Chromium around for Selenium and Google Messages Web but, I still don't want to fire it up just to access a modern website.

Further reading from OMG Ubuntu:

 - [How to Install Firefox as DEB on Ubuntu (Not Snap)](https://www.omgubuntu.co.uk/2022/04/how-to-install-firefox-deb-apt-ubuntu-22-04)

  [1]: https://support.mozilla.org/en-US/kb/install-firefox-linux#w_install-firefox-deb-package-for-debian-based-distributions
