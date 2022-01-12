---
layout:       post
title:        >
    How to read .json to output an specific number?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1191386
type:         Answer
tags:         grep conky json
created_date: 2019-11-24 20:04:21
edit_date:    
votes:        "2 "
favorites:    
views:        "1,781 "
accepted:     
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

A better answer can probably be made using a tool like `jq` but a brute force method would be:

``` 
$ head -c400 ~/.cache/weather.xml

{"cod":"200","message":0,"cnt":40,"list":[{"dt":1574629200,"main":{"temp":12.8,"temp_min":12.8,"temp_max":13.07,"pressure":1020,"sea_level":1020,"grnd_level":1012,"humidity":82,"temp_kf":-0.27},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":92},"wind":{"speed":2.22,"deg":232},"sys":{"pod":"n"},"dt_txt":"2019-11-24 21:00:00"},{"dt":1574640000,"ma

```

This displays the first 400 characters of the file and it appears your information is always at the start of the file?

``` 
$ head -c400 ~/.cache/weather.xml | sed 's/.*icon":"//g'

04n"}],"clouds":{"all":92},"wind":{"speed":2.22,"deg":232},"sys":{"pod":"n"},"dt_txt":"2019-11-24 21:00:00"},{"dt":1574640000,"ma

```

This removes everything up to and including `"icon":"` leaving `04n` which you desire at the beginning of the line.

``` 
$ head -c400 ~/.cache/weather.xml | sed 's/.*icon":"//g' | sed 's/".*//'

04n

```

Finally this gives you everything you were looking for.

Not pretty but it works.
