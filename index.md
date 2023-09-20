---
title: Welcome to Pippim
layout: default
---

<!-- TODO:

   Turn into promotion:

      Slide show with pop up points:

         Tim-Ta (Dancing alarm clocks - Wash DONE!, Rinse DONE!, Dryer DONE!
         Copy Code to clipboard button
         Super-Slim Super-Fast Search
         Long Document Section Navigation
         Hyperlink Recipe Baker
         Convert external website to your own brand website
         Bash can do GUI - Multi-Timer

-->


<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr6">ToC</a>  <a href="#hdr2">Skip</a></div>

<div id="mascot-image">
{% include image.html src="/assets/img/pngwing.com.png"
   alt="GitHub Octocat Mascot by pngwing.com"
   style="float: left; width: 45%; margin: 2em 1em 0px 0px;"
   caption="GitHub's Octocat Mascot image credit:
      <a href='https://www.pngwing.com/en/free-png-medya'>PNGWING  🔗</a>"
%}
</div>
<script>
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('mascot-image').classList.add('slide-up'); 
});
</script>

# Introduction

Welcome to {{ site.title }}'s website powered by GitHub.

[Tim-ta](https://pippim.github.io/programs/tim-ta.html 
"Create and run timers for Laundry, Workouts, Breaks etc.") 
runs inside your browser. Use it for project timers:

<!-- Image next to bullets suck the bullets into image
- Doing Laundry
- Repetitive Workout Sets<br>
- Coffee and Lunch Breaks<br>
<div style="left: 2rem;">
   <ul>
      <li> Doing Laundry </li>
      <li> Repetitive Workout Sets </li>
      <li> Coffee and Lunch Breaks </li>
   </ul>
</div>
-->

&ensp; ◆ &ensp; Doing Laundry<br>
&ensp; ◆ &ensp; Repetitive Workout Sets<br>
&ensp; ◆ &ensp; Coffee and Lunch Breaks<br>

Pick from stock alarm sounds and upload your own sounds.
Backup your ***Tim-ta*** projects and transfer them to other
browsers, other devices or other users. Import projects from
other Users or Devices.

[Hyperlink Recipe Baker](https://pippim.github.io/programs/hyperlink.html 
"Generate hyperlinks for markdown or HTML") 
is an invaluable tool for those who write articles about
the internet, technical documents or sales literature that
reference other articles.

[Convert](https://pippim.github.io/programs/stack.html 
"Convert Stack Exchange Posts to Your Own Website") 
your popular *Stack Exchange Posts* to your own website 
with additional features like;
Table of Contents, Section Navigation buttons, Copy code
blocks to clipboard and Show summary statistics. You can see
the conversion results by clicking the 
<kbd>✅ Answers</kbd> button above.

A ***different kind*** of site search engine greets you. Others
operate at an average speed of 2.5 MB/s (Megabytes per second)
over the internet. This one runs at the speed of RAM; about
19,200 MB/s!

There are **no ads** on {{ site.title }}. You can't buy
{{ site.title }} a coffee. No third party websites are used
to deliver {{ site.title }} website content. It is impossible
for {{ site.title }} to collect your data and store it on
the {{ site.title }} website because it is hosted by GitHub.

---

## Mobile Phone Support


<video src="https://user-images.githubusercontent.com/92641463/268849032-28b64b2c-0b54-4a14-8836-8aa78a6a011c.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/268849032-28b64b2c-0b54-4a14-8836-8aa78a6a011c.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="float: left; width: 40%; max-width: 95vw; margin: 1rem 2rem 1rem 0;">
  </video>

<!-- OLD:

style="max-height:640px; width: 100% !important; height: auto !important;">

-->

The video on the left shows what the {{ site.title }} Website 
looks like on a typical mobile phone screen. The recording was
made on a desktop with the browser window made slim and tall (675 x 1259).

### Color Theme Button
{:.no_toc}

The top-left of every page has the <kbd> 🌟 </kbd> ("Sun") 
/ <kbd> 🌙 </kbd> ("Crescent Moon") toggle button. Clicking
the toggle button changes the website color theme (for all
{{ site.title }} browser windows) and briefly spins the icon. 
Click the "Sun" to set the light color for using your phone outside.
Click the "Crescent Moon" to set the dark color for using
your phone inside. 

The *Color Theme* icon is always in the same place on all webpages. 
It always works the same way on mobile phones and desktop systems.

### Hamburger Button
{:.no_toc}

The <kbd> ☰ </kbd> (Hamburger) button reveals Page Header Buttons that
will not fit horizontally on a phone screen. A dropdown
menu appears with buttons arranged vertically.

### Search Button
{:.no_toc}

The <kbd> 🔍 </kbd> (Magnifying Glass) button opens 
a proprietary, {{ site.title }} engineered,
search engine. Free of third-party search engine providers! 
Search results are point-weighted with words
appearing in the Page Titles and Headers getting more weight 
than the same word appearing in the Page Body.

To reduce false-positives, some words are intentionally removed
such as "the", "error", etc.

Multiple search words are based on "or" tests. Most search 
engines use the "and" tests.

### Lightning Bolt Button
{:no_toc}

The <kbd> ⚡ </kbd> (Lightning Bolt) button opens a
proprietary, {{ site.title }} engineered, quick jump window.
The quick jump window allows you to quickly navigate within a web page.
The lightning bolt button appears whenever the page is scrolled.
It stays in the same place for a few seconds after scrolling
stops.

---

## Navigation Buttons

This section discusses the *Page Navigation
Buttons* that appear on the top of each page. Then
we will discuss the *Section Navigation Buttons*
that can appear at the top of major sections.

### Page Navigation Buttons
{:.no_toc}

The top of each page contains a search bar and
navigation buttons to take you to other pages:

- <kbd>⌂ Home</kbd> brings you to this page.

- <kbd>❓ About</kbd> discusses everything you want to know about {{ site.title }}. Still have questions? Just email.

- <kbd>✅ Answers</kbd> to questions people have about computers. 
As of {{ site.refreshed | date: "%B %e, %Y" }}, 
there have been over **{{ site.views_human }} views**
of the questions where {{ site.title }} has posted up-voted answers. 

- <kbd>💻 Programs</kbd> are applications {{ site.title }} created to make your life easier.

- <kbd>📧 Email</kbd> lets you send an email to {{ site.title }}.

### Section Navigation Buttons
{:.no_toc}

The top of major sections contain navigation buttons to take you to other sections:

- <kbd>Top</kbd> - Displays the top of the page

- <kbd>ToS</kbd> - Displays the top of the previous section

- <kbd>ToC</kbd> - Displays the Table of Contents

- <kbd>Skip</kbd> - Skips the section and displays the next section

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr3">Skip</a></div>
## Get in Touch

There are many ways to contact {{ site.title }}.
The conventional way is via email. Another way is commenting
on Stack Exchange Posts or GitHub Repos.

### The Conventional Way of Getting in Touch
{:.no_toc}

Get in touch with {{ site.title }} by sending an email.

<!-- Change Pippim to your contact info below -->
- [📧 Send an Email to Pippim ⧉ 🔗](mailto:pippim.com@gmail.com
"Send email to pippim.com@gmail.com ⧉ 🔗"){:target="_blank"}

### Leave a Comment / Question at The Source
{:.no_toc}

Leaving a comment or question at the source such as
Stack Exchange answer or GitHub Repo saves you from
specifying what your communication is referring to.

#### Stack Exchange Answers (Ask Ubuntu)
{:.no_toc}

![Ask Ubuntu image](/assets/img/ask_ubuntu.png){: 
style="float: left; margin: 0 2rem 0 0;" width="20%" }

You can leave a comment or question where the Stack Exchange
answer appears. Each answer on this website here has a direct
link to the original answer on Stack Exchange.
<br clear="left"/>

#### GitHub Repos
{:.no_toc}

![Inspector cat detective with magnifying glass](/assets/img/inspectocat.jpg){: 
style="float: left; margin: 0 2rem 0 0;" width="20%" }

For {{ site.title }} programs on GitHub Repos, you can go directly
to the repository and post a new issue. Issues can be bug reports,
questions, requests for new features or enhancements to existing
functions.
<br clear="left"/>

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr4">Skip</a></div>

<div id="octocat-image">
{% include image.html src="/assets/img/Octocat.png"
   alt="Octocat image by GitHub.com"
   style="float: right; width: 40%; margin: 2em 0px 0px 1em;"
   caption="Octocat image credit 🔗:
      <a href='https://github.com/logos'>github.com logos</a>"
%}
</div>
<!--  Slide left only observed when refresh clicked at this point
      or if . -->
<script>
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('octocat-image').classList.add('slide-left'); 
});
</script>

# GitHub Pages

The {{ site.title }} website is hosted on **GitHub Pages**.
You can download (or simply view) the {{ site.title }}
website markdown files. For example, `index.md` is the markdown
file for the page you are reading now and available
[here ⧉ 🔗](https://github.com/pippim/pippim.github.io/edit/main/index.md 
"See this page's markdown code in GitHub Pages ⧉ 🔗"){:target="_blank"}.

Get your own website up and running in a weekend by picking
from a collection of website designs called themes. Then
type your information into markdown files.

GitHub Pages is free. Change your website from a MAC,
a PC running Windows or Linux, and even a smart phone.

## **TL;DR**
{:.no_toc}

"**TL;DR**" stands for "**Too Long, Didn't Read**". Unless you
are interested in the technology of websites, and how this website
in particular was created, you will probably want to stop reading
here.

Whenever you commit to a website repository, GitHub Pages will run
[Jekyll ⧉ 🔗](https://jekyllrb.com/ 
"See how Jekyll rebuilds GitHub Pages websites ⧉ 🔗"){:target="_blank"}
to rebuild the pages in your site, from the content in your Markdown files.

The {{ site.title }} website is based on the GitHub Pages Jekyll theme called
[Cayman ⧉ 🔗](https://pages-themes.github.io/cayman/ 
"Visit the Cayman Theme for GitHub Pages website ⧉ 🔗"){:target="_blank"}.
Initial setup was straight forward and very quick. However adding custom buttons
becomes more complicated as you need to learn
[HTML ⧉ 🔗](https://blog.webjeda.com/new-page-jekyll/ 
"See how HTML is used in Jekyll ⧉ 🔗"){:target="_blank"}
and [Sass/SCSS ⧉ 🔗](https://jekyllrb.com/docs/configuration/sass/ 
"See how Sass is used in Jekyll ⧉ 🔗"){:target="_blank"}.

---

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
[GitHub Flavored Markdown ⧉ 🔗](https://guides.github.com/features/mastering-markdown/ 
"See how GitHub converts markdown with kramdown ⧉ 🔗"){:target="_blank"}.

---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr6">Skip</a></div>

## How the Table of Contents is Generated
{:.no_toc}

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
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr7">Skip</a></div>
<!-- Note: hover tooltips are autogenerated in /assets/js/theCookieMachine.js > function set_hdr_tooltips () --> 
```

The TOC command is used in real markdown below and generates the actual TOC:

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr7">Skip</a></div>
<!-- Note: hover tooltips are autogenerated in /assets/js/theCookieMachine.js > function set_hdr_tooltips () --> 

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

There are many [GitHub Pages Jekyll Themes ⧉ 🔗](https://pages.github.com/themes/ 
"View the various GitHub Pages themes ⧉ 🔗"){:target="_blank"}
you can pick from for your website. Spend some time reviewing your options
before committing to one.

Initially the {{ site.title }} website used the Cayman Theme for a day. Then the
Merlot Theme was used for a week and, then it came back full circle to the
Cayman Theme again.

At first the Cayman Theme
[didn't display the page title properly ⧉ 🔗](https://github.com/pages-themes/cayman/issues/134 
"View the issue on Cayman Theme GitHub Repository ⧉ 🔗"){:target="_blank"}.
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
[repository settings ⧉ 🔗](https://github.com/pippim/pippim.github.io/settings/pages 
"View {{ site.title }} GitHub Pages repository settings ⧉ 🔗"){:target="_blank"}.
The name of this theme is saved in the Jekyll `_config.yml` configuration file.


**GitHub Pages** maintains a real-time listing of
[version numbers** ⧉ 🔗](https://pages.github.com/versions/ 
"View current GitHub Pages application version numbers ⧉ 🔗"){:target="_blank"}
for Jekyll, Sass, kramdown, Rouge, etc..

There are many open-source providers involved in the 
{{ site.title }} website:

- **GitHub Pages** - [Websites for you and your projects. ⧉ 🔗](https://pages.github.com/ 
"Hosted directly from your GitHub repository. Just edit, push, and your changes are live. ⧉ 🔗"){:target="_blank"}
- **Jekyll** - [Transform your plain text into static websites and blogs. ⧉ 🔗](https://jekyllrb.com/ 
"No more databases, comment moderation, or pesky updates to install—just your content. ⧉ 🔗"){:target="_blank"}
- **Liquid** - [Jekyll uses the Liquid templating language to process templates. ⧉ 🔗](https://jekyllrb.com/docs/liquid/ 
"Jekyll provides a number of useful Liquid additions to help you build your site. ⧉ 🔗"){:target="_blank"}
- **Sass** - [Sass: Syntactically Awesome Style Sheets ⧉ 🔗](https://sass-lang.com/ 
"Sass is the most mature, stable, and powerful professional grade CSS extension language in the world. ⧉ 🔗"){:target="_blank"}
- **Cayman Theme** - [Cayman is a Jekyll theme for GitHub Pages. ⧉ 🔗](https://pages-themes.github.io/cayman/ 
"Cayman is a clean, responsive theme for GitHub Pages. ⧉ 🔗"){:target="_blank"}
- **Ruby** - [dynamic, open source programming language ⧉ 🔗](http://www.ruby-lang.org/en/ 
"more powerful than Perl, and more object-oriented than Python ⧉ 🔗"){:target="_blank"}
- **Rouge** - [language syntax highlighting ⧉ 🔗](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers 
"List of all languages supported by Rouge ⧉ 🔗"){:target="_blank"}
- **kramdown** - [converting a superset of Markdown ⧉ 🔗](https://kramdown.gettalong.org/ 
"(sic, not Kramdown or KramDown, just kramdown) ⧉ 🔗"){:target="_blank"}

---

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr9">Skip</a></div>

## Images, Javascript, CSS and HTML
{:.no_toc}

It is important to follow these instructions to setup your site:
[Adding a theme to your GitHub Pages site using Jekyll ⧉ 🔗](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll
"GitHub Instructions ⧉ 🔗"){:target="_blank"}.
For example, `/_layouts/default.html` probably needs to be copied from the
theme website to your own website in order to make significant changes.

There are many file types in the {{ site.title }} website stored at various
locations:

- A few local images are stored in `/assets/img/` directory. The 
hundreds of images in blog posts come directly from *Stack Exchange* 
and are not stored on the `/{{ site.title }}.github.io/` website.
- Videos (up to 10 MB) are stored as comments in the associated 
GitHub Repository (e.g. **mserve**), and then linked as an HTML 
image source.
- SCSS and
[Sass CSS ⧉ 🔗](https://www.geeksforgeeks.org/what-is-the-difference-between-scss-and-sass/
"What is the difference between SCSS and SASS?"){:target="_blank"} 
files are stored in the `/assets/css/` directory and the 
`/_sass/` directory. The `/_sass/` directory can have files 
you can't see in `pippim.github.io`, because they are really stored 
in the Cayman Theme for Jekyll, and automatically pulled from that 
site whenever the {{ site.title }} Website is rendered.
- This <kbd>⌂ Home</kbd> page is stored in the `/index.md` file.
- The <kbd>❓ About</kbd> page is stored in `/about.md`.
- The <kbd>✅ Answers</kbd> page is stored in `/answers.md`. 
Individual answers are internally known as "blog posts" and are 
stored under the `/_posts/` directory with one file per answer.
- The <kbd>💻 Programs</kbd> page is stored in `/programs.md`.
- HTML encoding can be found in any file. Small bits and pieces 
of HTML can even be found in markdown files which end in 
`.md`. Pure HTML files (with no markdown or CSS) can be found  
under the `/_includes/` directory.
- Javascript files are mostly kept under the `/assets/js/` directory
with some stored under the `/_includes/` directory.
- Some `.md` files contain embedded Javascript which in turn generates
HTML and CSS dynamically.

---

<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr10">Skip</a></div>

{% include image.html src="/assets/img/cookie-clicker.png"
   alt="Cookie image by cookie-clicker.co"
   style="float: left; width: 40%; margin: 2em 1em 0px 0px;"
   caption="Cookie image credit  🔗:
      <a href='https://cookie-clicker.co/'>Cookie-Clicker.co</a>"
%}

## Disabling Cookies

There is one cookie used on the {{ site.title }} website.
It remembers the status of the ***More*** / ***Less*** button
for blog posts. You can disable the cookie using links below.

### Disable Cookies in Chrome
{:.no_toc}

[Clear, enable, and manage cookies in Chrome ⧉ 🔗](https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DDesktop 
"How to clear cookies with Chrome Browser ⧉ 🔗"){:target="_blank"}

### Disable Cookies in Firefox
{:.no_toc}

[Block websites from storing cookies in Firefox ⧉ 🔗](https://support.mozilla.org/en-US/kb/block-websites-storing-cookies-site-data-firefox 
"How to clear cookies with Chrome Browser ⧉ 🔗"){:target="_blank"}

To protect your ***More*** / ***Less*** cookie setting (not that it would
do a spy any good), the ***SameSite*** policy is set to ***Strict*** so
you know no one else can read it. Also, the cookie is stored on your
local storage and it is not sent to any file server or the cloud.
You can view this in the file `/assets/js/post_fm.js`:

``` javascript
document.cookie = cname + "=" + value + ";" + expires + ";path=/" +
                  ";SameSite=Strict";
```

The same code can be found in `/assets/js/theCookieJar.js`. Here
a cookie is created to remember the Cookie Machine button's
visibility on all pages.

---

<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr6">ToC</a>  <a href="#hdr11">Skip</a></div>

## {{ site.title }} Website Directory Tree
{:.no_toc}

The directory tree will help you get a better understanding
of the {{ site.title }} website at `pippim.github.io`. As of
{{ site.refreshed | date: "%B %e, %Y" }}, the directory tree
for {{ site.title }} on GitHub Pages looked like this:

<div id="line_draw" class="line-draw">
{% highlight text %}
{% include website_tree.txt %}
{% endhighlight %}
</div>
<style> 
#line_draw.highlight pre { line-height: .55 ! important; }
// .highlight:not(#line_draw) pre, pre { line-height: 1.45 ! important; } 
</style>


## Daily Backup
{:.no_toc}

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

---

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
[Pippim Website repo ⧉ 🔗](https://github.com/pippim/pippim.github.io/blob/main/sede/stack-to-blog.py 
"View source code for stack-to-blog.py"){:target="_blank"}.

The [**FULL DOCUMENTATION** to Convert Stack Exchange Posts to Your Own Website ⧉](https://pippim.github.io/programs/stack.html 
"Convert Stack Exchange Posts to Your Own Website"){:target="_blank"}
for `stack-to-blog.py` used to create
the posts on this {{ site.title }} website will help you create your 
own website.

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr6">ToC</a></div>
