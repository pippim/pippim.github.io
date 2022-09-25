---
layout:       post
title:        >
    SyntaxError: '' string literal contains an unescaped line break
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/71403965
type:         Answer
tags:         php html module syntax-error
created_date: 2022-03-09 03:24:18
edit_date:    
votes:        "2 "
favorites:    
views:        "37,784 "
accepted:     
uploaded:     2022-09-25 16:54:18
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-03-09-SyntaxError_-__-string-literal-contains-an-unescaped-line-break.md
toc:          false
navigation:   false
clipboard:    false
---

Search engine brought me to this Q&A but the solution is totally different. It's posted just in case it helps others.

This error was searched:

``` terminal
Uncaught SyntaxError: '' string literal contains an unescaped line break
```

The line in question contained:

``` javascript
    alert('validUrlSyntax: ' + validUrlSyntax +
          ' validUrlExists: ' + validUrlExists +
          ' time to check: ' + elapsedTime + ' milliseconds`)
```

Notice the last apostrophe is really a back tick. Changing the back tick to an apostrophe `'` solved the problem.

