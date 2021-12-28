---
layout:       post
title:        Beautiful Soup to extract megalobiz lyrics
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/68977976
type:         Question
tags:         html beautifulsoup
created_date: 2021-08-30 00:44:27
edit_date:    
votes:        1
favorites:    
views:        61
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

I'm new to Beautiful Soup and Internet HTML. I'm using Python and Linux. I don't know how to extract `LRC` lyrics from the following:

``` 
<div id="lrc_54479852_details" class="lyrics_details entity_more_info">
                                <span id="lrc_54479852_lyrics">[length:04:47.14]<br>
    [re:www.megalobiz.com/lrc/maker]<br>
    [ve:v1.2.3]<br>
    [00:33.09]Hello my friend<br>
    [00:34.59] we meet again<br>
    ...
    [04:20.53]hello again<br>
    [04:26.02]My sacrifice</span>
</div>

```

**Note 1**: The song number "54479852" will always be changing so a wildcard will have to be used in it's place.

**Note 2**: `...` represents lines deleted for the sake of brevity
