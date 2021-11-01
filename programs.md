---
title: Programs
layout: default
---
# pippim Programs

Assortment of Linux programs written in Bash and Python by pippim.

## Sample Python program snippet

To generate this site's blog posts (which are really Stack Excahgne Answers), the Python program `stack-to-blog.py` was used. Here is a small snippet of that program:

Note it is important to follow these instructions to setup your site: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll

Otherwise Jekyll documentation itself could break your Github Pages theme you've chosen. For example, `_layouts/default.html` needs to be copied from your theme!

``` python
def dump(r):
    """ Dump contents of one row to terminal in good-looking format
    """
    print('Site:   ', r[SITE], '  |  Post ID:', r[POST_ID], '  |  Type:', r[TYPE])
    print('Title:  ', r[TITLE][:80])
    print('Link:   ', r[LINK][:80])
    limit = r[HTML].find('\n')
    if limit > 80 or limit == -1:
        limit = 80
    print('HTML:   ', r[HTML][:limit])
    limit = r[MARKDOWN].find('\n')
    if limit > 80 or limit == -1:
        limit = 80
    print('MARK:   ', r[MARKDOWN][:limit])
    print('Created:', r[CREATED], '  |  Tags:', r[TAGS])
    print('Edited: ', r[LAST_EDIT], '  |  Edited by:', r[EDITED_BY])
    print('Votes:  ', r[SCORE], '  |  Views:', r[VIEWS], '  |  Answers:', r[ANSWERS],
          '  |  Accepted:', r[ACCEPTED], '\n')
```

## Coming soon to this page

- eyesome
- mserve
- bserve
- multi-timer
- cpuf
- cpp
- .conkyrc

