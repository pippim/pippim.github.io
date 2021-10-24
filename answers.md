# Answers

These answers are posted on Stack Exchange websites like AskUbuntu.com, StackOverflow.com, etc.
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
