---
layout:       post
title:        >
    Can I uninstall Ubuntu Software-Centre from 18.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1066949
type:         Answer
tags:         software-center software-uninstall
created_date: 2018-08-19 20:36:39
edit_date:    
votes:        "5 "
favorites:    
views:        "2,523 "
accepted:     Accepted
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-19-Can-I-uninstall-Ubuntu-Software-Centre-from-18.04_.md
toc:          false
navigation:   false
clipboard:    true
---

You can simulate `software-center` removal to see what will be impacted:

``` 
sudo apt -s remove software-center
```

I don't have it installed so cannot show you what removal would look like.

A simulated install looks like this though:

{% include copyHeader.html %}
``` 
$ sudo apt -s install software-center
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  apt-xapian-index gir1.2-gmenu-3.0 libxapian-1.3-5 oneconf oneconf-common python-apt
  python-aptdaemon python-aptdaemon.gtk3widgets python-attr python-blinker python-bs4
  python-cffi-backend python-chardet python-cryptography python-cups python-dbus python-debian
  python-debtagshw python-defer python-dirspec python-enum34 python-gi-cairo python-html5lib
  python-httplib2 python-idna python-ipaddress python-jwt python-lxml python-oauthlib python-oneconf
  python-openssl python-pam python-piston-mini-client python-pkg-resources python-pyasn1
  python-pyasn1-modules python-serial python-service-identity python-six python-twisted-bin
  python-twisted-core python-twisted-web python-ubuntu-sso-client python-xapian python-xdg
  python-zope.interface python3-oneconf python3-piston-mini-client python3-xapian1.3
  software-center-aptdaemon-plugins ubuntu-sso-client
Suggested packages:
  xapian-tools python-apt-dbg python-apt-doc python-blinker-doc python-cryptography-doc
  python-cryptography-vectors python-dbus-doc python-dbus-dbg python-enum34-doc python-genshi
  python-crypto python-lxml-dbg python-lxml-doc python-openssl-doc python-openssl-dbg python-pam-dbg
  python-setuptools python-wxgtk3.0 | python-wxgtk python-twisted-bin-dbg python-tk python-glade2
  python-qt3 python-wxgtk3.0 xapian-doc ubuntu-sso-client-gui
The following NEW packages will be installed:
  apt-xapian-index gir1.2-gmenu-3.0 libxapian-1.3-5 oneconf oneconf-common python-apt
  python-aptdaemon python-aptdaemon.gtk3widgets python-attr python-blinker python-bs4
  python-cffi-backend python-chardet python-cryptography python-cups python-dbus python-debian
  python-debtagshw python-defer python-dirspec python-enum34 python-gi-cairo python-html5lib
  python-httplib2 python-idna python-ipaddress python-jwt python-lxml python-oauthlib python-oneconf
  python-openssl python-pam python-piston-mini-client python-pkg-resources python-pyasn1
  python-pyasn1-modules python-serial python-service-identity python-six python-twisted-bin
  python-twisted-core python-twisted-web python-ubuntu-sso-client python-xapian python-xdg
  python-zope.interface python3-oneconf python3-piston-mini-client python3-xapian1.3 software-center
  software-center-aptdaemon-plugins ubuntu-sso-client
0 upgraded, 52 newly installed, 0 to remove and 0 not upgraded.
Inst python-dbus (1.2.0-3 Ubuntu:16.04/xenial [amd64])
Inst python-dirspec (13.10-1ubuntu1 Ubuntu:16.04/xenial [all])
Inst python-httplib2 (0.9.1+dfsg-1 Ubuntu:16.04/xenial [all])
Inst python-blinker (1.3.dfsg2-1build1 Ubuntu:16.04/xenial [all])
Inst python-cffi-backend (1.5.2-1ubuntu1 Ubuntu:16.04/xenial [amd64])
Inst python-enum34 (1.1.2-1 Ubuntu:16.04/xenial [all])
Inst python-idna (2.0-3 Ubuntu:16.04/xenial [all])
Inst python-ipaddress (1.0.16-1 Ubuntu:16.04/xenial [all])
Inst python-pkg-resources (20.7.0-1 Ubuntu:16.04/xenial [all])
Inst python-pyasn1 (0.1.9-1 Ubuntu:16.04/xenial [all])
Inst python-six (1.10.0-3 Ubuntu:16.04/xenial [all])
Inst python-cryptography (1.2.3-1ubuntu0.1 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [amd64])
Inst python-jwt (1.3.0-1ubuntu0.1 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [all])
Inst python-oauthlib (1.0.3-1 Ubuntu:16.04/xenial [all])
Inst python-openssl (0.15.1-2build1 Ubuntu:16.04/xenial [all])
Inst python-twisted-bin (16.0.0-1ubuntu0.2 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [amd64])
Inst python-zope.interface (4.1.3-1build1 Ubuntu:16.04/xenial [amd64])
Inst python-attr (15.2.0-1 Ubuntu:16.04/xenial [all])
Inst python-pyasn1-modules (0.0.7-0.1 Ubuntu:16.04/xenial [all])
Inst python-service-identity (16.0.0-2 Ubuntu:16.04/xenial [all])
Inst python-twisted-core (16.0.0-1ubuntu0.2 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [all])
Inst python-twisted-web (16.0.0-1ubuntu0.2 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [all])
Inst python-ubuntu-sso-client (13.10-0ubuntu11 Ubuntu:16.04/xenial [all])
Inst ubuntu-sso-client (13.10-0ubuntu11 Ubuntu:16.04/xenial [all])
Inst libxapian-1.3-5 (1.3.4-0ubuntu6 Ubuntu:16.04/xenial [amd64])
Inst python3-xapian1.3 (1.3.4-0ubuntu1 Ubuntu:16.04/xenial [amd64])
Inst apt-xapian-index (0.47ubuntu8.4 Ubuntu:16.04/xenial-updates [all])
Inst gir1.2-gmenu-3.0 (3.13.3-6ubuntu3.1 Ubuntu:16.04/xenial-updates [amd64])
Inst python-apt (1.1.0~beta1ubuntu0.16.04.2 Ubuntu:16.04/xenial-updates [amd64])
Inst python-bs4 (4.4.1-1 Ubuntu:16.04/xenial [all])
Inst python-chardet (2.3.0-2 Ubuntu:16.04/xenial [all])
Inst python-cups (1.9.73-0ubuntu2 Ubuntu:16.04/xenial [amd64])
Inst python-debian (0.1.27ubuntu2 Ubuntu:16.04/xenial [all])
Inst python-debtagshw (2.0.1ubuntu6 Ubuntu:16.04/xenial [all])
Inst python-gi-cairo (3.20.0-0ubuntu1 Ubuntu:16.04/xenial [amd64])
Inst python-html5lib (0.999-4 Ubuntu:16.04/xenial [all])
Inst python-lxml (3.5.0-1build1 Ubuntu:16.04/xenial [amd64])
Inst python-pam (0.4.2-13.2ubuntu2 Ubuntu:16.04/xenial [amd64])
Inst python-serial (3.0.1-1 Ubuntu:16.04/xenial [all])
Inst python-xapian (1.2.22-2build1 Ubuntu:16.04/xenial [amd64])
Inst python-xdg (0.25-4 Ubuntu:16.04/xenial [all])
Inst python-piston-mini-client (0.7.5-0ubuntu2 Ubuntu:16.04/xenial [all])
Inst software-center-aptdaemon-plugins (0.1.6build1 Ubuntu:16.04/xenial [all])
Inst python-defer (1.0.6-2build1 Ubuntu:16.04/xenial [all])
Inst python-aptdaemon (1.1.1+bzr982-0ubuntu14 Ubuntu:16.04/xenial [all])
Inst python-aptdaemon.gtk3widgets (1.1.1+bzr982-0ubuntu14 Ubuntu:16.04/xenial [all])
Inst oneconf-common (0.3.9 Ubuntu:16.04/xenial [all])
Inst python3-piston-mini-client (0.7.5-0ubuntu2 Ubuntu:16.04/xenial [all])
Inst python3-oneconf (0.3.9 Ubuntu:16.04/xenial [all])
Inst oneconf (0.3.9 Ubuntu:16.04/xenial [all])
Inst python-oneconf (0.3.9 Ubuntu:16.04/xenial [all])
Inst software-center (16.01+16.04.20160420 Ubuntu:16.04/xenial [all])
Conf python-dbus (1.2.0-3 Ubuntu:16.04/xenial [amd64])
Conf python-dirspec (13.10-1ubuntu1 Ubuntu:16.04/xenial [all])
Conf python-httplib2 (0.9.1+dfsg-1 Ubuntu:16.04/xenial [all])
Conf python-blinker (1.3.dfsg2-1build1 Ubuntu:16.04/xenial [all])
Conf python-cffi-backend (1.5.2-1ubuntu1 Ubuntu:16.04/xenial [amd64])
Conf python-enum34 (1.1.2-1 Ubuntu:16.04/xenial [all])
Conf python-idna (2.0-3 Ubuntu:16.04/xenial [all])
Conf python-ipaddress (1.0.16-1 Ubuntu:16.04/xenial [all])
Conf python-pkg-resources (20.7.0-1 Ubuntu:16.04/xenial [all])
Conf python-pyasn1 (0.1.9-1 Ubuntu:16.04/xenial [all])
Conf python-six (1.10.0-3 Ubuntu:16.04/xenial [all])
Conf python-cryptography (1.2.3-1ubuntu0.1 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [amd64])
Conf python-jwt (1.3.0-1ubuntu0.1 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [all])
Conf python-oauthlib (1.0.3-1 Ubuntu:16.04/xenial [all])
Conf python-openssl (0.15.1-2build1 Ubuntu:16.04/xenial [all])
Conf python-twisted-bin (16.0.0-1ubuntu0.2 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [amd64])
Conf python-zope.interface (4.1.3-1build1 Ubuntu:16.04/xenial [amd64])
Conf python-attr (15.2.0-1 Ubuntu:16.04/xenial [all])
Conf python-pyasn1-modules (0.0.7-0.1 Ubuntu:16.04/xenial [all])
Conf python-service-identity (16.0.0-2 Ubuntu:16.04/xenial [all])
Conf python-twisted-core (16.0.0-1ubuntu0.2 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [all])
Conf python-twisted-web (16.0.0-1ubuntu0.2 Ubuntu:16.04/xenial-updates, Ubuntu:16.04/xenial-security [all])
Conf python-ubuntu-sso-client (13.10-0ubuntu11 Ubuntu:16.04/xenial [all])
Conf ubuntu-sso-client (13.10-0ubuntu11 Ubuntu:16.04/xenial [all])
Conf libxapian-1.3-5 (1.3.4-0ubuntu6 Ubuntu:16.04/xenial [amd64])
Conf python3-xapian1.3 (1.3.4-0ubuntu1 Ubuntu:16.04/xenial [amd64])
Conf apt-xapian-index (0.47ubuntu8.4 Ubuntu:16.04/xenial-updates [all])
Conf gir1.2-gmenu-3.0 (3.13.3-6ubuntu3.1 Ubuntu:16.04/xenial-updates [amd64])
Conf python-apt (1.1.0~beta1ubuntu0.16.04.2 Ubuntu:16.04/xenial-updates [amd64])
Conf python-bs4 (4.4.1-1 Ubuntu:16.04/xenial [all])
Conf python-chardet (2.3.0-2 Ubuntu:16.04/xenial [all])
Conf python-cups (1.9.73-0ubuntu2 Ubuntu:16.04/xenial [amd64])
Conf python-debian (0.1.27ubuntu2 Ubuntu:16.04/xenial [all])
Conf python-debtagshw (2.0.1ubuntu6 Ubuntu:16.04/xenial [all])
Conf python-gi-cairo (3.20.0-0ubuntu1 Ubuntu:16.04/xenial [amd64])
Conf python-html5lib (0.999-4 Ubuntu:16.04/xenial [all])
Conf python-lxml (3.5.0-1build1 Ubuntu:16.04/xenial [amd64])
Conf python-pam (0.4.2-13.2ubuntu2 Ubuntu:16.04/xenial [amd64])
Conf python-serial (3.0.1-1 Ubuntu:16.04/xenial [all])
Conf python-xapian (1.2.22-2build1 Ubuntu:16.04/xenial [amd64])
Conf python-xdg (0.25-4 Ubuntu:16.04/xenial [all])
Conf python-piston-mini-client (0.7.5-0ubuntu2 Ubuntu:16.04/xenial [all])
Conf software-center-aptdaemon-plugins (0.1.6build1 Ubuntu:16.04/xenial [all])
Conf python-defer (1.0.6-2build1 Ubuntu:16.04/xenial [all])
Conf python-aptdaemon (1.1.1+bzr982-0ubuntu14 Ubuntu:16.04/xenial [all])
Conf python-aptdaemon.gtk3widgets (1.1.1+bzr982-0ubuntu14 Ubuntu:16.04/xenial [all])
Conf oneconf-common (0.3.9 Ubuntu:16.04/xenial [all])
Conf python3-piston-mini-client (0.7.5-0ubuntu2 Ubuntu:16.04/xenial [all])
Conf python3-oneconf (0.3.9 Ubuntu:16.04/xenial [all])
Conf oneconf (0.3.9 Ubuntu:16.04/xenial [all])
Conf python-oneconf (0.3.9 Ubuntu:16.04/xenial [all])
Conf software-center (16.01+16.04.20160420 Ubuntu:16.04/xenial [all])
```

As you can see it has a great number of dependencies. By comparison `ubuntu-software` has none that would be removed:

``` 
$ sudo apt -s remove ubuntu-software
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages will be REMOVED:
  ubuntu-software
0 upgraded, 0 newly installed, 1 to remove and 0 not upgraded.
Remv ubuntu-software [3.20.5-0ubuntu0.16.04.11]
```

