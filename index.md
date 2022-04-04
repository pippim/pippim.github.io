---
title: Welcome to Pippim
layout: default
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr6">ToC</a>  <a href="#hdr2">Skip</a></div>

{% include image.html src="/assets/img/pngwing.com.png"
   alt="GitHub Octocat Mascot by pngwing.com"
   style="float: left; width: 45%; margin: 2em 1em 0px 0px;"
   caption="GitHub's Octocat Mascot image credit:
      <a href='https://www.pngwing.com/en/free-png-medya'>PNGWING  🔗</a>"
%}

# Introduction

Welcome to {{ site.title }}'s website.

A ***different kind*** of site search engine greets you. Others
operate at an average speed of 2.5 MB/s (Megabytes per second)
over the internet. This one runs at the speed of RAM; about
19,200 MB/s!

[Convert](https://pippim.github.io/stack.html "Convert Stack Exchange Posts to Your Own Website") your popular *Stack Exchange
Posts* to **your own website** with additional features like;
Table of Contents, Section Navigation buttons, Copy code
blocks to clipboard and Show summary statistics.

There are **no ads** on {{ site.title }}. You don't need to buy
{{ site.title }} a coffee (it's already free at work!).

## Navigation Buttons

This section discusses the *Page Navigation
Buttons* that appear on the top of each page. Then
we will discuss the *Section Navigation Buttons*
that can appear at the top of major sections.

### Page Navigation Buttons

The top of each page contains a search bar and
navigation buttons to take you to other pages:

- <kbd>⌂ Home</kbd> brings you to this page.

- <kbd>❓ About</kbd> discusses everything you want to know about {{ site.title }}. Still have questions? Just email.

- <kbd>✅ Answers</kbd> to questions people have using computers. As of {{ site.refreshed | date: "%B %e, %Y" }}, {{ site.title }} answers have over **{{ site.views_human }} views!**

- <kbd>💻 Programs</kbd> are applications {{ site.title }} created to make your life easier.

- <kbd>📧 Email</kbd> lets you send an email to {{ site.title }}.

> ***NOTE:*** &ensp;When you click a button to go to a page, that button will disappear and be replaced by another. The page you are currently on will not display it's own button. This was done to limit number of buttons on mobile user screens. This technique deviates from conventional website design as of November 2, 2021. Perhaps this technique will be adopted in the future by other websites though. 😄

### Section Navigation Buttons

The top of major sections contain navigation buttons to take you to other sections:

- <kbd>Top</kbd> - Displays the top of the page

- <kbd>ToS</kbd> - Displays the top of the previous section

- <kbd>ToC</kbd> - Displays the Table of Contents

- <kbd>Skip</kbd> - Skips the section and displays the next section

---
<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr3">Skip</a></div>
## Get in Touch

There are many ways of getting in touch with {{ site.title }}.
The conventional way via email and on other websites. The direct
method on Stack Exchange Answers or GitHub Repos.

### The Conventional Way of Getting in Touch

Get in touch with {{ site.title }} by sending an email.

<!-- Change Pippim to your contact info below -->
- [📧 Send an Email to Pippim 🔗](mailto:pippim.com@gmail.com "Send email to pippim.com@gmail.com 🔗")

### Leave a Comment / Question at The Source

Leaving a comment or question at the source such as
Stack Exchange answer or GitHub Repo saves you from
specifying what your communication is referring to.

#### Stack Exchange Answers (Ask Ubuntu)

![Ask Ubuntu image](/assets/img/ask_ubuntu.png){: style="float: left" height="20%" width="20%"}

You can leave a comment or question where the Stack Exchange
answer appears. Each answer on this website here has a direct
link to the original answer on Stack Exchange.
<br clear="left"/>

#### GitHub Repos

![Inspector cat detective with magnifying glass](/assets/img/inspectocat.jpg){: style="float: left" width="20%"}

For {{ site.title }} programs on GitHub Repos, you can go directly
to the repository and post a new issue. Issues can be bug reports,
questions, requests for new features or enhancements to existing
functions.
<br clear="left"/>

---
<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr4">Skip</a></div>

{% include image.html src="/assets/img/cookie-clicker.png"
   alt="Cookie image by cookie-clicker.co"
   style="float: left; width: 40%; margin: 2em 1em 0px 0px;"
   caption="Cookie image credit  🔗:
      <a href='https://cookie-clicker.co/'>Cookie-Clicker.co</a>"
%}

# Cookies

There is one cookie used on the {{ site.title }} website.
It remembers the status of the "More" or "Less" button
for blog posts. You can disable the cookie using links below.

### Disable Cookies in Chrome

[Clear, enable, and manage cookies in Chrome 🔗](https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DDesktop "How to clear cookies with Chrome Browser 🔗")

### Disable Cookies in Firefox

[Block websites from storing cookies in Firefox 🔗](https://support.mozilla.org/en-US/kb/block-websites-storing-cookies-site-data-firefox "How to clear cookies with Chrome Browser 🔗")

To protect your More/Less cookie setting (not that it would
do a spy any good), `SameSite` policy is set to "Strict" so
you know no one else can read it. Also it is stored on your
local browser and not sent to any file server or the cloud.
You can view this in the file `assets/js/post_fm.js`:

``` javascript
document.cookie = cname + "=" + value + ";" + expires + ";path=/" +
                    ";SameSite=Strict";
```

The above is code from line 9 of the file.

The same code can be found in `/assets/js/theCookieJar.js`. Here
a cookie is created to remember the Cookie Machine button's
visibility on all pages.

{% include image.html src="/assets/img/Octocat.png"
   alt="Octocat image by GitHub.com"
   style="float: right; width: 40%; margin: 2em 0px 0px 1em;"
   caption="Octocat image credit 🔗:
      <a href='https://github.com/logos'>github.com logos</a>"
%}


# GitHub Pages

The {{ site.title }} website is hosted on **GitHub Pages**.
You can download (or simply view) the {{ site.title }}
website markdown files. For example, `index.md` is the markdown
file for the page you are reading now and available
[here 🔗](https://github.com/pippim/pippim.github.io/edit/main/index.md "See this page's markdown code in GitHub Pages 🔗").

Get your own website up and running in a weekend by picking
from a collection of website designs called themes. Then
type your information into markdown files.

GitHub Pages is free. Change your website from a MAC,
a PC running Windows or Linux, and even a smart phone.

## **TL;DR**

"**TL;DR**" stands for "**Too Long, Didn't Read**". So unless you
are truly interested in the technology of websites and how this website
in particular was created, you will probably want to stop reading
the rest of this page.

Whenever you commit to a website repository, GitHub Pages will run
[Jekyll 🔗](https://jekyllrb.com/ "See how Jekyll rebuilds GitHub Pages websites 🔗")
to rebuild the pages in your site, from the content in your Markdown files.

The {{ site.title }} website is based on the GitHub Pages Jekyll theme called
[Cayman 🔗](https://pages-themes.github.io/cayman/ "Visit the Cayman Theme for GitHub Pages website 🔗").
Initial setup was straight forward and very quick. However adding custom buttons
becomes more complicated as you need to learn
[HTML 🔗](https://blog.webjeda.com/new-page-jekyll/ "See how HTML is used in Jekyll 🔗")
and [Sass/SCSS 🔗](https://jekyllrb.com/docs/configuration/sass/ "See how Sass is used in Jekyll 🔗").

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr5">Skip</a></div>

## Markdown

GitHub Pages and many other websites use a language called Markdown.
Markdown is a lightweight and easy-to-use syntax for styling your
writing. It includes conventions for:

```
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see
[GitHub Flavored Markdown 🔗](https://guides.github.com/features/mastering-markdown/ "See how GitHub converts markdown with kramdown 🔗").

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr6">Skip</a></div>

## How the Table of Contents is Generated

All markdown headers with `#`, `##` and `###`, etc. are used to create the **Table of Contents** (TOC). A little bit of one-time prep work is required for TOC support. For example, the file `_sass/toc.scss` is setup with:

``` scss
.screen-reader-only {
    position: absolute;
    left: -5000px;

    &:focus {
        left: 0;
    }
}
```

Another one-time setup is the file `_includes/toc.md` containing the markdown for how the TOC looks and functions. This file contains:

``` sass
## Table of Contents
{:.no_toc}

* TOC
{:toc}
```

To get a Table of Contents (TOC) in any website page, insert a
liquid tag where you want the TOC to appear. For example on this
page you are reading, `index.md`, is the following markdown code:

``` html
... you are reading, `index.md`, is the following markdown code:
{% raw %}
{% include toc.md %}
{% endraw %}
<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a> ... </div>
```

The TOC command is used in real markdown below and generates the actual TOC:

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr7">Skip</a></div>

{% include toc.md %}

---

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr8">Skip</a></div>

{% include image.html src="/assets/img/github pages themes.png"
   alt="GitHub Pages Themes.png"
   style="float: right; width: 60%; margin: 2em 0px 0px 1em;"
   caption="Image credit 🔗:
            <a href='https://docs.ycrc.yale.edu/clusters-at-yale/guides/github_pages/'
               >Yale University</a>"
%}
## Jekyll Themes

There are many [GitHub Pages Jekyll Themes 🔗](https://pages.github.com/themes/ "View the various GitHub Pages themes  🔗")
you can pick from for your website. Spend some time reviewing your options
before committing to one.

Initially the {{ site.title }} website used the Cayman Theme for a day. Then the
Merlot Theme was used for a week and, then it came back full circle to the
Cayman Theme again.

At first the Cayman Theme
[didn't display the page title properly 🔗](https://github.com/pages-themes/cayman/issues/134 "View the issue on Cayman Theme GitHub Repository 🔗").
Consequently, the Merlot theme was used. However, problems arose
with the Merlot banner on the left not rendering properly on small
screens. So it was back to Cayman and after changing the theme,
the page title worked properly. New problems arose with the page
buttons, <kbd>Home</kbd>, <kbd>About</kbd>, etc. With trial
and error however those problems were solved too.

This is the first website {{ site.title }} created. The somewhat naive initial estimate
was it would take a weekend to create. That estimate was back on
October 16, 2021 and today is January 9 2022. The
moral of the story is: *"It may take longer than expected
to set up your first website but, don't give up."* &ensp; **You can do it!** 😄

Your GitHub Pages site will use the layout and styles from the Jekyll
theme you have selected in your
[repository settings 🔗](https://github.com/pippim/pippim.github.io/settings/pages "View {{ site.title }} GitHub Pages repository settings 🔗").
The name of this theme is saved in the Jekyll `_config.yml` configuration file.


**GitHub Pages** maintains a real-time listing of
[version numbers 🔗](https://pages.github.com/versions/ "View current GitHub Pages application version numbers 🔗")
for Jekyll, Sass, kramdown, Rouge, etc..

There are many open-source providers involved in the {{ site.title }} website:

- **GitHub Pages** - [Websites for you and your projects. 🔗](https://pages.github.com/ "Hosted directly from your GitHub repository. Just edit, push, and your changes are live. 🔗")
- **Jekyll** - [Transform your plain text into static websites and blogs. 🔗](https://jekyllrb.com/ "No more databases, comment moderation, or pesky updates to install—just your content. 🔗")
- **Liquid** - [Jekyll uses the Liquid templating language to process templates. 🔗](https://jekyllrb.com/docs/liquid/ "Jekyll provides a number of useful Liquid additions to help you build your site. 🔗")
- **Sass** - [Sass: Syntactically Awesome Style Sheets 🔗](https://sass-lang.com/ "Sass is the most mature, stable, and powerful professional grade CSS extension language in the world. 🔗")
- **Cayman Theme** - [Cayman is a Jekyll theme for GitHub Pages. 🔗](https://pages-themes.github.io/cayman/ "Cayman is a clean, responsive theme for GitHub Pages. 🔗")
- **Ruby** - [dynamic, open source programming language 🔗](http://www.ruby-lang.org/en/ "more powerful than Perl, and more object-oriented than Python 🔗")
- **Rouge** - [language syntax highlighting 🔗](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers "List of all languages supported by Rouge 🔗")
- **kramdown** - [converting a superset of Markdown 🔗](https://kramdown.gettalong.org/ "(sic, not Kramdown or KramDown, just kramdown) 🔗")

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr9">Skip</a></div>

## Images, Javascript, CSS and HTML

It is important to follow these instructions to setup your site:
[Adding a theme to your GitHub Pages site using Jekyll 🔗](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll).
For example, `_layouts/default.html` probably needs to be copied from the
theme website to your own website in order to make significant changes.

There are many file types in the {{ site.title }} website stored at various
locations:

- A few local images are stored in `assets/img/` directory. The hundreds of images in blog posts come directly from Stack Exchange and are not stored on the `pippim.github.io` website.
- SCSS and [Sass CSS 🔗](https://www.geeksforgeeks.org/what-is-the-difference-between-scss-and-sass/) files are mostly stored in the `assets/css/` directory. Some are stored in the `_sass/` directory. The `_sass/` directory has files you can't see in `pippim.github.io` because they are really stored in the Cayman Theme for Jekyll and automatically pulled from there whenever website is rendered.
- This <kbd>⌂ Home</kbd> page is stored in `index.md` file in the root directory (`/`).
- The <kbd>❓ About</kbd> page is stored in `about.md` in `/`.
- The <kbd>✅ Answers</kbd> page is stored in `answers.md` in `/`. Individual answers are internally known as "blog posts" and are stored in the `_posts` directory with one file per answer.
- The <kbd>💻 Programs</kbd> page is stored in `programs.md` in `/`.
- HTML encoding can be found in any file. Small bits and pieces of HTML can beven be found in and markdown files which end in `.md`. Pure HTML files (with no markdown or CSS) can be found in the `_includes` directory.
- Javascript files are kept in `assets/js/`.


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr10">Skip</a></div>

## {{ site.title }} Website Directory Tree

The directory tree will help you get a better understanding
of the Pippim website at `pippim.github.io`. As of
{{ site.refreshed | date: "%B %e, %Y" }}, the directory tree
for {{ site.title }} on GitHub Pages looked like this:


<div>id="stack_line_draw">
``` terminal
{% include website_tree.txt %}
```
</div>
<style> #stack_line_draw { line-height: 1; } </style>

**NOTE:** The `_posts` directory contains {{ site.post_count }} posts
which are not displayed above.

<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr11">Skip</a></div>

## Daily Backup

Normally you will `git pull` all the directories and files from your website
to your local drive. If you plan on developing locally, you probably want
to save your daily work. This script is what {{ site.title }} uses for
daily backup to gmail.com (in the cloud, so it should be safe):

``` bash
# WEBSITE - Local copies of files on pippim.github.io (EXCLUDES /assets/css/img)
tar -rpf "$Filename" website/*.md       # about.md, answers.md, programs.md
tar -rpf "$Filename" website/*.yml      # _config.yml
tar -rpf "$Filename" website/_includes  # copyHeader.html, image.html & toc.md
tar -rpf "$Filename" website/_layouts   # default.html & post.html
tar -rpf "$Filename" website/_plugins   # insert_git_code.rb (NOT supported)
tar -rpf "$Filename" website/_sass      # jekyll-theme-cayman.scss & toc.scss
tar -rpf "$Filename" website/assets/css # style.scss file
tar -rpf "$Filename" website/assets/js  # javascript files
tar -rpf "$Filename" website/sede/*.sh  # refresh GitHub Pages each week
tar -rpf "$Filename" website/sede/*.py  # stack-to-blog.py and SEDE query below
tar -rpf "$Filename" website/sede/StackQuery
```

<h3><b> IMPORTANT NOTE: </b></h3>

> Images are ***NOT*** included in the daily backup.  This is because this is a small subset of my daily backup script that is called from `cron` every morning.
>
> The full script compresses files and emails to gmail.com. Including images would make the backup exceed Google quotas of 20 MB per backup and 15 GB for all backups.
>
>  If you want to include images  in your own backup, add the following to the daily backup script:
>    ``` bash
>    tar -rpf "$Filename" website/assets/img # Image files
>    ````

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr12">Skip</a></div>

## Convert Stack Exchange to GitHub Pages

{% include image.html src="/assets/img/stack/stack-to-blog progress display.gif"
   alt="stack-to-blog.py"
   style="float: none; width: 100%; margin: 0px 0px 0px 0px;"
   caption="Progress Display Bar used by <b>stack-to-blog.py</b>"
%}

Converting thousands of Stack Exchange Q&A in MarkDown format isn't as easy
as simply copying them over to GitHub Pages. The python program
`stack-to-blog.py` was used to convert Stack Exchange posts to
GitHub Pages Posts.
The complete `stack-to-blog.py` program can be accessed on the
[Pippim Website repo 🔗](https://github.com/pippim/pippim.github.io/blob/main/sede/stack-to-blog.py "View source code for stack-to-blog.py").

The [**FULL DOCUMENTATION** to Convert Stack Exchange Posts to Your Own Website](https://pippim.github.io/stack.html "Convert Stack Exchange Posts to Your Own Website")
for `stack-to-blog.py` used to create
the posts on this {{ site.title }} website will help you create your own website.

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr6">ToC</a></div>
