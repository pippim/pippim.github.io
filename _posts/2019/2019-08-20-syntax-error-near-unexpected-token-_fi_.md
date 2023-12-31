---
layout:       post
title:        >
    syntax error near unexpected token `fi'
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1167121
type:         Answer
tags:         command-line bash scripts
created_date: 2019-08-20 15:16:51
edit_date:    
votes:        "1 "
favorites:    
views:        "3,106 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-20-syntax-error-near-unexpected-token-_fi_.md
toc:          false
navigation:   false
clipboard:    false
---

Not sure if problem (on phone here) but you have extra `;` so I would restructure code to:

``` 
if [ "$domain_pdp_process_id" -gt "$zeroProcessId" ]; then
    echo "domain pdp is running"
else
    echo "domain pdp is not running"
fi
```

Or:

``` 
if [ "$domain_pdp_process_id" -gt "$zeroProcessId" ]
then
    echo "domain pdp is running"
else
    echo "domain pdp is not running"
fi
```
