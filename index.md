---
layout: default
---

![Github Octacat Mascot by pngwing.com](/assets/img/pngwing.com.png){: style="float: left" height="50%" width="50%"}{:class="img-responsive"}
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr6" class="hdr-btn">ToC</a>  <a href="#hdr2" class="hdr-btn">Skip</a>  </div>  <a id="hdr1"></a>
# Introduction

Welcome to Pippim. A collection of questions and answers about using your computer, especially in Linux and specifically Ubuntu. All the solutions are free. You can use them as you like. There are also full-fledged applications that are free for you to use as well.

## Page navigation buttons

The top of each page contains navigation buttons to take you to other pages:

- <kbd>⌂ Home</kbd> brings you to this page.

- <kbd>❓ About</kbd> disccusses everything you want to know about Pippim. Still have questions? Just email.

- <kbd>✅ Answers</kbd> to questions people have using computers. Most posts are about Linux and specifically Ubuntu.

- <kbd>💻 Programs</kbd> are applicationss Pippim created to make your life easier.

- <kbd>📧 Email</kbd> lets you send an email to Pippim.

> ***BEWARE:*** When you click a button to go to a page, that button will disappear because the page you are on will never show the button for that page. This was done to limit number of buttons on mobile user screens. It deviates from traditional website design as of November 2, 2021.

*Github's "Octocat" mascot image credit:* [PNGWING](https://www.pngwing.com/en/free-png-medya)

## Section navigation buttons

The top of major sections contain navigation buttons to take you to other sections:

- <kbd>Top</kbd> - Takes you to the top of the page

- <kbd>ToS</kbd> - Takes you to the top of the previous section

- <kbd>ToC</kbd> - Takes you to the Table of Contents

- <kbd>Skip</kbd> - Skips the section and takes you to the next section

---
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr1" class="hdr-btn">ToS</a>  <a href="#hdr6" class="hdr-btn">ToC</a>  <a href="#hdr3" class="hdr-btn">Skip</a>  </div>  <a id="hdr2"></a>
## Get in touch

Get in touch with pippim by sending an email. You can also visit the other pippim.com website on Google Sites.

- Click this link to: [📧 Send an Email to pippim](mailto:pippim.com@gmail.com)

- Click this link to visit the pippim website on Google Sites: [www.pippim.com](https://pippim.com)

### Leave a comment / question at the source

You can leave a comment or question where the Stack Exchange answer appears. In the future each answer will have a direct link to the original answer. For the time being you can search the Stack Exchange site + answer title. For example search on "Ask Ubuntu How to get CPU temperature".

For Pippim programs on Github, you can go directly to the repository and post a new issue. Issues can be bug reports, questions or new features or enhancements to existing features.

---
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr2" class="hdr-btn">ToS</a>  <a href="#hdr6" class="hdr-btn">ToC</a>  <a href="#hdr4" class="hdr-btn">Skip</a>  </div>  <a id="hdr3"></a>
# Github Pages

This website was created (for free) on **Github Pages**. You can use the [editor on GitHub](https://github.com/pippim/pippim.github.io/edit/main/index.md) to see how this page was defined in the markdown file called `index.md`.

**TL;DR**

"TL;DR" stands for "Too Long, Didn't Read". Unless you are truly interested in the technology of websites and how this website in particular was created, you will probably want to stop reading now...

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

The Pippim website is based on the Github Pages Jekyll theme called (Cayman)[https://pages-themes.github.io/cayman/]. Initial setup is straight forward. If you want custom buttons it becomes more complicated as you need to learn (HTML)[https://blog.webjeda.com/new-page-jekyll/] and (Sass/SCSS)[https://jekyllrb.com/docs/configuration/sass/].

<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr3" class="hdr-btn">ToS</a>  <a href="#hdr6" class="hdr-btn">ToC</a>  <a href="#hdr5" class="hdr-btn">Skip</a>  </div>  <a id="hdr4"></a>

## Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for:

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

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr4" class="hdr-btn">ToS</a>  <a href="#hdr6" class="hdr-btn">ToC</a>  <a href="#hdr6" class="hdr-btn">Skip</a>  </div>  <a id="hdr5"></a>

## Convert Stack Exchange Q&A to Jekyll Blog Post

Pippim programs use *Web Scraping* like **Mr. Roboto** to get price changes, **eyesome** to get your sunrise/sunset times and **mserve** to get music lyrics. 

Other Pippim programs use APIs like **bserve** to get gmail messages, **tvpowered** to monitor TV remote power button to put your system to sleep and **mserve** to get CD Audio track names and album covert art images. 

This Pippim website (pippim.github.io) creates 2,000 blog posts using a different technique than *Web Scraping* or *REST APIs* called *Data Conversion*. Data conversion allows thousands of website pages to be created with ***no work!***. Well OK the free **Github Pages** static website generator does *a lot* of work :). You do have to do the first two steps below:

- The first step is to run this [Stack Exchange Data Explorer query](https://meta.stackexchange.com/a/371435/366359).

- Next a Python program called `stack-blog-post.py` is run. It does all the magic described below.

- Pippim adds the navigation bar (Top, ToS, ToC and Skip) by putting HTML tags into the markdown files. Then HTML code controls jumping to tags when a button is clicked. Here's an easy to read example of the code:

``` html
## Qualified header 4

A bunch of text lines under qualified header...

<div class="hdr-bar">
  <a href="#" class="hdr-btn">Top</a>
  <a href="#hdr4" class="hdr-btn">ToS</a>
  <a href="#hdr2" class="hdr-btn">ToC</a>
  <a href="#hdr6" class="hdr-btn">Skip</a>
</div>
<a id="hdr5"></a>

# Qualified header 5    
```

- In the markdown file that `stack-to-blog.py` creates the real HTML navigation buttons and id tag look like this:

``` html

<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr4" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr6" class="hdr-btn">Skip</a>  </div>  <a id="hdr5"></a>

# Qualified header 5    
```

- Two extra spaces are added between HTML elements for readability. An extra line is added before and after the HTML button bar for readability however the markdown interpreter condenses multiple blank lines into a single blank line. The HTML commands themselves are considered a blank line.

- If you would like to modify the button properties (position, color, size, hover, etc), `hdr-bar` and `hdr-btn` are defined in `assets/css/style.scss`.

- Block quotes are defined in Stack Exchange like this:
```
> line 1
> line 2
```
- If they were not modified they would display on Github Pages Markdown as:
> line 1
> line 2

- Pippim appends two spaces to the end of block quotes in Stack Exhange answers so they render properly:
> line 1  
> line 2  

- **Note:** You can open one of the blog posts and compare it to the Stack Exchange original answer.

- Pippim will take older markdown format on Stack Exchange Answers where `#Header` was used and convert it to `# Header`.

- Pippim converts Stack Exchange Question tags formated as: `<Tag1><Tag2><Tag3>` and converts them to: `Tags: [Tag1 Tag2 Tag3]` for Jekyll.

- Pippim setups the Jekyll **front matter** as required for Title and sets the blog filename as expected. However it also allows custom **front matter** for URL, Votes, Last Edit Date, etc.

A preview of `stack-to-blog.py` is presented a few sections below and the full program can be accessed on the <kbd>💻 Programs</kbd> page.

<div class="hdr-bar">  <a id="hdr6"></a>  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr5" class="hdr-btn">ToS</a>  <a href="#hdr6" class="hdr-btn">ToC</a>  <a href="#hdr7" class="hdr-btn">Skip</a>  </div>  <a id="hdr6"></a>

## Table of Contents support

To get a Table of Contents (TOC) insert `{ % include toc.md % }` at the place you want it. All your markdown headers with `#`, `##` and `###`, etc. are used to create the TOC. Note there is no space between `{ %` and `% }` in the command but, spaces had to be added to show the commnd. The properly formatted TOC command is used on the next line and generates the **Table of Contents** you see below:

{% include toc.md %}

<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr6" class="hdr-btn">ToS</a>  <a href="#hdr6" class="hdr-btn">ToC</a>  <a href="#hdr8" class="hdr-btn">Skip</a>  </div>  <a id="hdr7"></a>

## Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/pippim/pippim.github.io/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

To see the current Jekyll, Sass, Rouge version numbers, etc. used by **Github Pages** click [here](https://pages.github.com/versions/). It is very important to find the correct documentation version when you are using instructions for setting up your website!

<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr7" class="hdr-btn">ToS</a>  <a href="#hdr6" class="hdr-btn">ToC</a>  <a href="#hdr9" class="hdr-btn">Skip</a>  </div>  <a id="hdr8"></a>

## Images, Javascript, CSS and HTML

These are the file types in the pippim website:

- A few local images are stored in `assets/img/` directory. The hundreds of images in blog posts come directly from Stack Exchange and are not stored in `pippim.github.io`.
- SCSS and [Sass CSS](https://www.geeksforgeeks.org/what-is-the-difference-between-scss-and-sass/) files are mostly stored in the `assets/css/` directory. Some are stored in the `_sass/` directory. The `_sass/` directory has files you can't see in `pippim.github.io` because they are really stored in the Cayman Theme for Jekyll and automatically pulled from there whenever website is rendered.
- This <kbd>⌂ Home</kbd> page is stored in `index.md` file in the root directory (`/`).
- The <kbd>❓ About</kbd> page is stored in `about.md` in `/`.
- The <kbd>✅ Answers</kbd> page is stored in `answers.md` in `/`. Individual answers are internally known as "blog posts" and are stored in the `_posts` directory with one file per answer.
- The <kbd>💻 Programs</kbd> page is stored in `programs.md` in `/`.
- HTML encoding can be found in any file. Small bits and pieces of HTML can beven be found in andmarkdown files which end in `.md`. Pure HTML files (with no markdown or CSS) can be found in the `_includes` directory.
- As of November 4, 2021 this website doesn't include and **Javascript** but typically you would place those files in `assets/js/`.

### Pippim website directory tree

The directory tree will help you get a better understanding of the Pippim website at `pippim.github.io`. As of October 30, 2021, the directory tree for Pippim on Github Pages looked like this:

``` bash
$ tree
.
├── about.md
├── answers.md
├── assets
│   ├── css
│   │   ├── style.scss
│   │   └── syntax.scss
│   └── img
│       ├── Ask Ubuntu profile.png
│       ├── Blog_Project-Management-101.png
│       ├── earth-from-space.jpg
│       ├── octojekyll-opt.jpg
│       └── pngwing.com.png
├── _config.yml
├── _includes
│   ├── head-custom.html
│   └── toc.md
├── index.md
├── _layouts
│   ├── default.html
│   └── post.html
├── LICENSE
├── _posts
│   └── 2021-10-24-welcome-to-jekyll.md
├── programs.md
├── QueryResults.csv
├── _sass
│   ├── cayman.scss
│   ├── jekyll-theme-cayman.scss
│   ├── normalize.scss
│   ├── rouge-github.scss
│   ├── toc.scss
│   └── variables.scss
├── StackBlogPost
└── stack-to-blog.py

7 directories, 27 files
```

<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr8" class="hdr-btn">ToS</a>  <a href="#hdr6" class="hdr-btn">ToC</a>  <a href="#hdr10" class="hdr-btn">Skip</a></div><a id="hdr9"></a>

## Python program stack-to-blog.py

To generate this site's blog posts (which are really Stack Excahgne Answers), the Python program `stack-to-blog.py` was used. Here is a small snippet of that program:

Note it is important to follow these instructions to setup your site: [Adding a theme to your GitHub Pages site using Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll)

Otherwise Jekyll documentation itself could break your Github Pages theme you've chosen. For example, `_layouts/default.html` needs to be copied from your theme!

Here is a small snippet of the Python program `stack-to-blog.py`:

``` python
def dump(r):
    """ Dump contents of one row to terminal in good-looking format
    """
    print('Site:   ', r[SITE], '  |  Post ID:', r[POST_ID], '  |  Type:', r[TYPE])
    print('Title:  ', r[TITLE][:80])
    print('Link:   ', r[LINK][:80])
    limit = r[HTML].find('\n')
    if limit > 80 or limit == -1:
        limit = 80
    print('HTML:   ', r[HTML][:limit])
    limit = r[MARKDOWN].find('\n')
    if limit > 80 or limit == -1:
        limit = 80
    print('MARK:   ', r[MARKDOWN][:limit])
    print('Created:', r[CREATED], '  |  Tags:', r[TAGS])
    print('Edited: ', r[LAST_EDIT], '  |  Edited by:', r[EDITED_BY])
    print('Votes:  ', r[SCORE], '  |  Views:', r[VIEWS], '  |  Answers:', r[ANSWERS],
          '  |  Accepted:', r[ACCEPTED], '\n')
```

<a id="hdr10"></a>
