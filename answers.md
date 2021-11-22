---
layout: default
---

# Answers Written by Pippim

Answers Pippim have written have over **52 million views** as of November 22, 2021.
They are posted on Stack Exchange websites like [AskUbuntu](askubuntu.com) and
[Stack Overflow](stackoverflow.com). About 8% of the posts Pippim has made are
also questions. Sometimes a good question can be as helpful as an answer.

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>  
    </li>
  {% endfor %}
</ul>
