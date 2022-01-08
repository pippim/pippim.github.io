---
layout:       post
title:        >
    Where are sudo's insults stored?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/837614
type:         Answer
tags:         sudo
created_date: 2016-10-15 20:22:01
edit_date:    2019-11-15 03:43:34
votes:        "88 "
favorites:    
views:        "46,746 "
accepted:     
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    true
---

# Make your own insults

You can change sudo insults without recompiling sudo.

See: [Adding new sudo insults](Adding new sudo insults)

----------

# Header files with insults

When we look at all the insults we discover an interesting tidbit: saying Broccoli is politically correct, but saying Burrito is not. All the insults are listed below.

## `ins_2001.h` (2001 Space Odyssey insults):

``` 
.
    /*
     * HAL insults (paraphrased) from 2001.
     */
    
    "Just what do you think you're doing Dave?",
    "It can only be attributed to human error.",
    "That's something I cannot allow to happen.",
    "My mind is going. I can feel it.",
    "Sorry about this, I know it's a bit silly.",
    "Take a stress pill and think things over.",
    "This mission is too important for me to allow you to jeopardize it.",
    "I feel much better now.",

```

## `ins_classic.h` (Original Sudo 8 insults):

``` 
    /*
     * Insults from the original sudo(8).
     */

    "Wrong!  You cheating scum!",
#ifdef PC_INSULTS
    "And you call yourself a Rocket Scientist!",
#else
    "No soap, honkie-lips.",
#endif
    "Where did you learn to type?",
    "Are you on drugs?",
    "My pet ferret can type better than you!",
    "You type like i drive.",
    "Do you think like you type?",
    "Your mind just hasn't been the same since the electro-shock, has it?",

```

## `ins_csops.h` (CSOps insults):

``` 
    /*
     * CSOps insults (may be site dependent).
     */

    "Maybe if you used more than just two fingers...",
    "BOB says:  You seem to have forgotten your passwd, enter another!",
    "stty: unknown mode: doofus",
    "I can't hear you -- I'm using the scrambler.",
    "The more you drive -- the dumber you get.",
#ifdef PC_INSULTS
    "Listen, broccoli brains, I don't have time to listen to this trash.",
#else
    "Listen, burrito brains, I don't have time to listen to this trash.",
#endif
    "I've seen penguins that can type better than that.",
    "Have you considered trying to match wits with a rutabaga?",
    "You speak an infinite deal of nothing",

```

## `ins_goons.h` (Goon Show insults):

{% include copyHeader.html %}
``` 
.
    /*
     * Insults from the "Goon Show."
     */

    "You silly, twisted boy you.",
    "He has fallen in the water!",
    "We'll all be murdered in our beds!",
    "You can't come in. Our tiger has got flu",
    "I don't wish to know that.",
    "What, what, what, what, what, what, what, what, what, what?",
    "You can't get the wood, you know.",
    "You'll starve!",
    "... and it used to be so popular...",
    "Pauses for audience applause, not a sausage",
    "Hold it up to the light --- not a brain in sight!",
    "Have a gorilla...",
    "There must be cure for it!",
    "There's a lot of it about, you know.",
    "You do that again and see what happens...",
    "Ying Tong Iddle I Po",
    "Harm can come to a young lad like that!",
    "And with that remarks folks, the case of the Crown vs yourself was proven.",
    "Speak English you fool --- there are no subtitles in this scene.",
    "You gotta go owwwww!",
    "I have been called worse.",
    "It's only your word against mine.",
    "I think ... err ... I think ... I think I'll go home",

```

The file `insults.h` contains compiler instructions on which of the above insults to include in the compiled sudo program. Indeed, you could create your own insults file, add the name to insults.h and recompile to have messages like, "What, are you an ArchLinux user?" or "This isn't Windows where errors are commonplace!", etc.

Notice the `#ifdef PC_INSULTS` in some of the insult files. This doesn't mean "if you have a personal computer" it means "if you want to be politically correct."


----------


# Listing all insults to your terminal

For Ubuntu 16.04.6 LTS you can use this:

``` 
strings /usr/lib/sudo/sudoers.so | head -n1670 | tail -n49

```

For other Ubuntu versions the line numbers passed to `head` command might change. Hopefully others can verify for their version.


