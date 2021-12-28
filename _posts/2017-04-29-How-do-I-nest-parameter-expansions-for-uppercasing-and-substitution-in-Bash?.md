---
layout:       post
title:        How do I nest parameter expansions for uppercasing and substitution in Bash?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/43690512
type:         Question
tags:         bash replace uppercase
created_date: 2017-04-29 00:14:39
edit_date:    2017-04-29 00:40:16
votes:        1
favorites:    
views:        49
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

I have two bash string built in commands that work fine independently but when nested generate an error message no matter what I try. Here's the two individual commands that work:

``` 
$ A="etc/.java"
$ echo $A
/etc/.java
$ B="${A//$'\057\056'/$'\057'}"
$ echo $B
/etc/java
$ B="${A^^}"
$ echo $B
/ETC/.JAVA

```

Now trying to combine the two commands together I get errors:

``` 
$ B="${${A^^}//$'\057\056'/$'\057'}"
bash: ${${A^^}///.//}: bad substitution
$ B="${ ${A^^}//$'\057\056'/$'\057'}"
bash: ${ ${A^^}///.//}: bad substitution
$ B="${ ${A^^} //$'\057\056'/$'\057'}"
bash: ${ ${A^^} ///.//}: bad substitution
$ B="${"${A^^}"//$'\057\056'/$'\057'}"
bash: ${"${A^^}"//'/.'/'/'}: bad substitution
$ B="${ "${A^^}" //$'\057\056'/$'\057'}"
bash: ${ "${A^^}" //'/.'/'/'}: bad substitution
$ B="${${A^^} //$'\057\056'/$'\057'}"
bash: ${${A^^} ///.//}: bad substitution

```

Simplified examples are presented above so one can copy and paste to their own terminal. Piping or redirection would be complicated because my real world code is this:

``` 
  while [[ $i -lt $DirsArrCnt ]] ; do
    DirsArr[$i]=false
    CurrNdx=$i
    CurrKey="${DirsArr[$(( $i + 1 ))]}"
    # ^^ = convert to upper-case
    # ${Variable//$'\041\056'/$'\041'} = Change /. to / for hidden directory sorting
    if [[ "${"${CurrKey^^}"//$'\041\056'/$'\041'}" > \
          "${"${LastKey^^}"//$'\041\056'/$'\041'}" ]] || \
       [[ "${"${CurrKey^^}"//$'\041\056'/$'\041'}" = \
          "${"${LastKey^^}"//$'\041\056'/$'\041'}" ]] ; then
        LastNdx=$CurrNdx
        LastKey="$CurrKey"
        i=$(( $i + $OneDirArrCnt))
        continue
    fi

```
