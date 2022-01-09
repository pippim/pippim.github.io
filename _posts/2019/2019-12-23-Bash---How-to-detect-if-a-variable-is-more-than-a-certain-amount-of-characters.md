---
layout:       post
title:        >
    Bash - How to detect if a variable is more than a certain amount of characters
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1198187
type:         Answer
tags:         bash
created_date: 2019-12-23 20:43:29
edit_date:    2020-06-12 14:37:07
votes:        "9 "
favorites:    
views:        "7,549 "
accepted:     Accepted
uploaded:     2022-01-09 16:04:07
toc:          false
navigation:   false
clipboard:    false
---

You can use **if-then-else-fi** like this:

``` 
if [[ ${#detect} -gt 8 ]] ; then
    echo "Error message..."
    exit 1
else
    echo "Good to go..."
    exit 0
fi
```

`exit 1` generally means failure and `exit 0` generally means success. In either case your script ends immediately when `exit` is encountered so use them appropriately.

You can also use implied **if-then** which is fairly unique the the shell language:

``` 
[[ ${#detect} -gt 8 ]] && { echo "Error message..." ; exit 1 ; }

# successful code here
exit 0
```

If you didn't need an error message the `{ ... }` braces aren't required for a single command eg:

``` 
[[ ${#detect} -gt 8 ]] && exit 1

```

can be used to say "If the variable named detect is > 8 then exit".


----------

## Enhancing the process

Generally it is considered rude to allow the user only one chance to input a string. The polite method is to ask for the string again after telling them it needs to be 8 characters or less. For example:

``` 
echo "Enter character string 1 to 8 characters long or press <CTRL>+C to exit."
while True ; do
    read StringVar
    [[ ${#StringVar} -ge 1 ]] && [[ ${#StringVar} -le 8 ]] && break
    echo "Sorry that string is ${#StringVar} long. Please try again."
done

# successful code here

```

In this case the program keeps requesting input until variable `StringVar` is obtained and it is **greater than or equal to 1** *AND* it is **less than or equal to 8** at which point the `while` look is broken out of with the `break` command.

Alternately the user can press <kbd>Ctrl</kbd>+<kbd>C/kbd> to terminate the bash script.

The concise lines:

``` 
[[ ${#StringVar} -ge 1 ]] && [[ ${#StringVar} -le 8 ]] && break
echo "Sorry that string is ${#StringVar} long. Please try again."

```

... can be made ridiculously verbose like this:

``` 
if [[ ${#StringVar} -ge 1 ]] ; then
    if [[ ${#StringVar} -le 8 ]] ; then
        break
    else
        echo "Sorry that string is ${#StringVar} long. Please try again."
        continue
    fi
else
    echo "Sorry that string is ${#StringVar} long. Please try again."
    continue
fi

```

Although not incorrect it is wasteful to both the programmer's and system's time.
