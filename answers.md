---
title: Answers
layout: default
---

# Answers by Pippim

Pippim answers have over
 **52 million views** as of November 22, 2021.
They are posted on Stack Exchange websites
 like [AskUbuntu](askubuntu.com) and
[Stack Overflow](stackoverflow.com). About 8%
 of the posts Pippim has made are
also questions. Sometimes a good question can
 be as helpful as an answer.

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>  
    </li>
  {% endfor %}
</ul>

## Posts by Tag

There are about 3,633 tags used by Pippim Answers.
To make accessing them more managable, tags are nested by letter,
then by tag, then the posts are listed in small grouups of about 15.

Click the expand chevron (▶️) to expand a group of tags.

Click the collapse chevron (🔽) to shrink a group of tags.

### Answer Tags

{::options parse_block_html="false" /}

{% include posts_by_tag.html %}

{::options parse_block_html="false" /}
