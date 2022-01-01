---
layout:       post
title:        >
    Python adding a list to a slice of another list
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/64129264
type:         Question
tags:         python list slice addition
created_date: 2020-09-30 00:12:54
edit_date:    2020-09-30 00:50:00
votes:        "1 "
favorites:    
views:        "48 "
accepted:     Accepted
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

Here's basic problem:

``` 
>>> listb = [ 1, 2, 3, 4, 5, 6, 7 ]
>>> slicea = slice(2,5)
>>> listb[slicea]
[3, 4, 5]
>>> lista = listb[slicea]
>>> lista
[3, 4, 5]
>>> listb[slicea] += lista
>>> listb
[1, 2, 3, 4, 5, 3, 4, 5, 6, 7]
```
`listb` should be 

``` 
[1, 2, 6, 8, 10, 6, 7]

```

But `3, 4, 5` was inserted after `3, 4, 5` not added to it.


----------


# tl;dr

I have this code that's not working:

``` 
    self.lib_tree.item(song)['values'][select_values] = adj_list
    self.lib_tree.item(album)['values'][select_values] += adj_list
    self.lib_tree.item(artist)['values'][select_values] += adj_list

```

The full code is this:

``` 
def toggle_select(self, song, album, artist):

```

``` 
    # 'values' 0=Access, 1=Size, 2=Selected Size, 3=StatTime, 4=StatSize,
    #          5=Count, 6=Seconds, 7=SelSize, 8=SelCount, 9=SelSeconds
    # Set slice to StatSize, Count, Seconds
    total_values = slice(4, 7)       # start at index, stop before index
    select_values = slice(7, 10)     # start at index, stop before index

```

``` 
    tags = self.lib_tree.item(song)['tags']
    if "songsel" in tags:
        # We will toggle off and subtract from selected parent totals
        tags.remove("songsel")
        self.lib_tree.item(song, tags=(tags))
        # Get StatSize, Count and Seconds
        adj_list = [element * -1 for element in \
                    self.lib_tree.item(song)['values'][total_values]]
    else:    
        tags.append("songsel")
        self.lib_tree.item(song, tags=(tags))
        # Get StatSize, Count and Seconds
        adj_list = self.lib_tree.item(song)['values'][total_values]  # 1 past

```

``` 
    self.lib_tree.item(song)['values'][select_values] = adj_list
    self.lib_tree.item(album)['values'][select_values] += adj_list
    self.lib_tree.item(artist)['values'][select_values] += adj_list
    if self.debug_toggle < 10:
        self.debug_toggle += 1
        print('artist,album,song:',self.lib_tree.item(artist, 'text'), \
                                   self.lib_tree.item(album, 'text'), \
                                   self.lib_tree.item(song, 'text'))
        print('adj_list:',adj_list)

```


The `adj_list` has the correct values showing up in debug.

***How do I add a list of values to the slice of a list?***
