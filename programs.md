# pippim Programs

Assortment of Linux programs written in Bash and Python by pippim.

## Sample Python program snippet

To generate this site's blog posts (which are really Stack Excahgne Answers), the Python program `stack-to-blog.py` was used. Here is a small snippet of that program:

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

