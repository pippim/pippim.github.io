---
layout:       post
title:        How does ubuntu terminals autocomplete work?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1137560
type:         Answer
tags:         auto-completion
created_date: 2019-04-24 02:55:56
edit_date:    2020-06-12 14:37:07
votes:        2
favorites:    
views:        399
accepted:     
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

An almost identical question was asked in StackExchange:

### [How does bash tab completion work?][1]

> I have been spending a lot of time in the shell lately and I'm  
> wondering how the tab autocomplete works. What's the mechanism behind  
> it? How does the bash know the contents of every directory?  


----------


### The top voted answer:

There are two parts to the autocompletion:

* The readline library, as already mentioned by fixje, manages the command line editing, and calls back to bash when tab is pressed, to enable completion. Bash then gives (see next point) a list of possible completions, and readline inserts as much characters as are identified unambiguously by the characters already typed in. (You can configure the readline library quite much, see the section [Command line editing][2] of the Bash manual for details.)

* Bash itself has the built-in `complete` to define a completion mechanism for individual commands. If for the current command nothing is defined, it used completion by file name (using opendir/readdir, as Ignacio said).

   The part to define your own completions is described in the section [Programmable Completion][3]. In short, with
   `complete «options» «command»` you define the completion for some command. For example `complete -u su` says
``` 
*when completing an argument for the `su` command, search for users of the current system*.

```

   If this is more complicated than the
   normal options can cover (e.g. different completions depending on argument index, or depending on previous arguments),
   you can use `-F function`, which will then invoke a shell function to generate the list of possible completions.
   (This is used for example for the git completion, which is very complicated, depending on subcommand and sometimes
   on options given, and using sometimes names of branches (which are nothing bash knows about).

You can list the existing completions defined in your current bash environment using simply `complete`, to have an impression on what is possible. If you have the bash-completion package installed (or however it is named on your system), completions for a lot of commands are installed, and as Wrikken said, `/etc/bash_completion` contains a bash script which is then often executed at shell startup to configure this. Additional custom completion scripts may be placed in `/etc/bash_completion.d`; those are all sourced from `/etc/bash_completion`.


  [1]: https://stackoverflow.com/questions/5570795/how-does-bash-tab-completion-work
  [2]: http://info2html.sourceforge.net/cgi-bin/info2html-demo/info2html?%28bash.info.gz%29Command%2520Line%2520Editing
  [3]: http://info2html.sourceforge.net/cgi-bin/info2html-demo/info2html?%28bash.info.gz%29Programmable%2520Completion
