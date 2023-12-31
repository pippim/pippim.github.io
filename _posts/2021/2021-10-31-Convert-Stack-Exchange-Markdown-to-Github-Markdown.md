---
layout:       post
title:        >
    Convert Stack Exchange Markdown to Github Markdown
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/69783520
type:         Question
tags:         github type-conversion markdown
created_date: 2021-10-31 02:20:51
edit_date:    2023-01-21 03:41:44
votes:        "0 "
favorites:    
views:        "198 "
accepted:     Accepted
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-10-31-Convert-Stack-Exchange-Markdown-to-Github-Markdown.md
toc:          false
navigation:   false
clipboard:    false
---

Has anyone documented the differences between Stack Exchange Markup and Github Markup?

I'm in the midst of a project to convert Stack Exchange Markdown to Github Markdown. It *might* be a little more complicated because Jekyll on Github Pages uses a Markdown derivative called "Kramdown".

I've already written some of the conversion in my Python program. For example old SE posts with `#Header` must be converted to `# Header`.

Another example are "> Block quote" lines have two spaces appended to the end of the line.

Now it's starting to get tricky (for me at least) where in an image in SE is specified as:

``` 
[![Ubuntu 5 DE.png][1]][1]

**Note:** Blah, blah, blah

  [1]: https://i.stack.imgur.com/MoxHd.jpg

```

It has to be converted to Github image markdown format:

``` 
![Ubuntu 5 DE.png](https://i.stack.imgur.com/MoxHd.jpg)

**Note:** Blah, blah, blah

```

Another example of "footer hyper links" (for lack of a better noun) in Stack Exchange Markdown is:

``` 
- [Jack Master Volume?][1]

The simplest solution then is to install [JackMix][2]:

find listed [here][3].

[this script][4] is where you are heading:


  [1]: https://discourse.ardour.org/t/jack-master-volume/84650
  [2]: http://www.arnoldarts.de/jackmix/.
  [3]: http://jackaudio.org/applications/
  [4]: https://unix.stackexchange.com/questions/374085/lower-or-increase-pulseaudio-volume-on-all-outputs
```

Needs to be converted to Github Markdown format of:

``` 
- [Jack Master Volume?](https://discourse.ardour.org/t/jack-master-volume/84650)

The simplest solution then is to install [JackMix](http://www.arnoldarts.de/jackmix/.):

find listed [here](http://jackaudio.org/applications/).

[this script](https://unix.stackexchange.com/questions/374085/lower-or-increase-pulseaudio-volume-on-all-outputs) is where you are heading:
```

Finally tonight I discovered that in Stack Exchange you can have:

``` 


    #!/bin/bash
    cat "$Filename.zip" | base64 > "$Filename64"
```

That needs reformatting to Github Markdown like this:

```` bash
``` bash
# !/bin/bash
cat "$Filename.zip" | base64 > "$Filename64"
``` bash
````

It gets even more complicated when SE Markdown has:

``` bash
<!-- language-all: lang-bash -->
```

Or it has this:

``` bash
<pre><code>Some lines of code
some more lines of
code </code></pre>
```

An existing Github Repo to convert would be awesome! If not then if someone has documented the differences between Stack Exchange Markup and Github Markup that would be great too.

If this question goes unanswered for a month then I guess I'll be answering it eventually after the trial-error-fix process is finished.
