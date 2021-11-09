---
layout: default
---

# Answers by Pippim

Pippim answers (and a small percentage of questions) have over **51 million** views (as of November 8, 2021). They are posted on Stack Exchange websites like [AskUbuntu](askubuntu.com) and [Stack Overflow](stackoverflow.com).
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
