---
title: Stack Exchange Answers
layout: default
---

# Answers by {{ site.title }}

Questions that {{ site.title }} has answered have over
 **{{ site.views_human }} views** as of {{ site.refreshed | date: "%B %e, %Y" }}.
They are posted on Stack Exchange websites
 such as [Ask Ubuntu 🔗](https://askubuntu.com "Visit www.askubuntu.com 🔗") and
[Stack Overflow 🔗](https://stackoverflow.com "Visit www.stackoverflow.com 🔗").
About 5% of the posts you see here are questions and not answers.
Hopefully, reviewing these questions will help you to write your own when you need to.

## Top Ten Answers by <mark>Votes</mark>

{% include posts_by_vote.html %}

## Posts grouped by <mark>Tag</mark>

There are {{ site.all_tag_counts }} tags used by {{ site.title }} posts.
To make accessing them more managable, tags are grouped by letter,
then grouped by tag, then optionally grouped by date range and then 
grouped by about 15 posts.

Click the expand chevron (▶️) to expand a group of tags.

Click the collapse chevron (🔽) to shrink a group of tags.

## {{ site.all_tag_counts }} Tags in {{ site.post_count }} Posts

{::options parse_block_html="false" /}

{% include posts_by_tag.html %}

{::options parse_block_html="false" /}
