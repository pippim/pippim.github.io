---
title: Errors
layout: default
---

# Errors discovered in Pippim Website

Below are various error conditions that can occur. If the section
is empty, it's a good thing!

## Posts with no title

<ul>
  {% for post in site.posts %}
   {% if not page.title or page.title == "" or page.title == nil %}
    <li>
      {% post.url %}
    </li>
   {% endif %}
  {% endfor %}
</ul>
