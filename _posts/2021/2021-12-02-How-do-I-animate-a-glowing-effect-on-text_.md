---
layout:       post
title:        >
    How do I animate a glowing effect on text?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/70192841
type:         Answer
tags:         css css-animations
created_date: 2021-12-02 00:20:59
edit_date:    
votes:        "1 "
favorites:    
views:        "76,834 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-12-02-How-do-I-animate-a-glowing-effect-on-text_.md
toc:          false
navigation:   false
clipboard:    false
---

I found this [on-line](https://www.w3schools.com/howto/howto_css_glowing_text.asp) and it only took a couple of minutes to setup:

``` css
// Neon glowing Text: https://www.w3schools.com/howto/howto_css_glowing_text.asp
.glow {
  // font-size: 80px; // Way TOO BIG
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}
```

I don't like the colors and will change them to a fire color (if I can figure out the codes):

[![Pippim Neon Glowing Title.gif][1]][1]


  [1]: https://i.stack.imgur.com/L1SFW.gif
