---
layout:       post
title:        How to get Processor ID from any linux command
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1190592
type:         Answer
tags:         bash java hardware cpu
created_date: 2019-11-21 13:32:40
edit_date:    2020-06-12 14:37:07
votes:        1
favorites:    
views:        727
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

From comments:

``` 
sudo dmidecode -t processor | grep -E ID |  sed 's/.*: //'

```

The `sed` command is used to remove the line prefix: "       ID: " as explained in this popular answer:

- [How to use Sed to replace all characters before colon?](https://unix.stackexchange.com/questions/136794/how-to-use-sed-to-replace-all-characters-before-colon)

> ### Explanation:  
>   
> First part pipes string to `sed`.  
>   
> The second is a basic sed substitution. The part between the first and  
> second / is the regex to search for and the part between the second  
> and third is what to replace it with (nothing in this case as we are  
> deleting).  
>   
> For the regex, . matches any character, * repeats this any number of  
> times (including zero) and : matches a colon. So effectively it is  
> anything followed by a colon. Since .* can include a colon, the match  
> is 'greedy' and everything up to the last colon is included.  

