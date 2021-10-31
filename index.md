
![Github Octacat Mascot by pngwing.com](/assets/img/pngwing.com.png){: style="float: left" height="50%" width="50%"}{:class="img-responsive"}
<div class="hdr-bar"><a href="#" class="hdr-btn">Top</a><a href="#hdr6" class="hdr-btn">ToC</a><a href="#hdr2" class="hdr-btn">Skip</a></div>
# Introduction<a id="hdr1"></a>

Welcome to Pippim. A collection of questions and answers about using your computer, especially in Linux and specifically Ubuntu. All the solutions are free. You can use them as you like. There are also full-fledged applications that are free for you to use as well.

## How to use the buttons at the top of the page

Click the <kbd>❓ About</kbd> button above to learn what the name pippim stands for. *(Hint: it's nothing)*

Click the <kbd>✅ Answers</kbd> button above to read solutions for problems people have using computers. Mostly for problems in Linux and specifically in Ubuntu.

The <kbd>💻 Programs</kbd> button leads you to applicationss pippim created to make your life easier.

Click the <kbd>📧 Email</kbd> button to send an email to pippim. You can also click the link below.

*Github's "Octocat" mascot image credit:* [PNGWING](https://www.pngwing.com/en/free-png-medya)

## How to use the navigation buttons at the top of each section

<kbd>Top</kbd> - Takes you to the top of the page

<kbd>ToS</kbd> - Takes you to the top of the previous section

<kbd>ToC</kbd> - Takes you to the Table of Contents

<kbd>Skip</kbd> - Skips the section and takes you to the next section

---
<div class="hdr-bar"><a href="#" class="hdr-btn">Top</a><a href="#hdr1" class="hdr-btn">ToS</a><a href="#hdr6" class="hdr-btn">ToC</a><a href="#hdr3" class="hdr-btn">Skip</a></div>
## Get in touch<a id="hdr2"></a>

Get in touch with pippim by sending an email. You can also visit the other pippim.com website on Google Sites.

- Click this link to: [📧 Send an Email to pippim](mailto:pippim.com@gmail.com)

- Click this link to visit the pippim website on Google Sites: [www.pippim.com](https://pippim.com)

### Leave a comment / question at the source

You can leave a comment or question where the Stack Exchange answer appears. In the future each answer will have a direct link to the original answer. For the time being you can search the Stack Exchange site + answer title. For example search on "Ask Ubuntu How to get CPU temperature".

For Pippim programs on Github, you can go directly to the repository and post a new issue. Issues can be bug reports, questions or new features or enhancements to existing features.

---
<div class="hdr-bar"><a href="#" class="hdr-btn">Top</a><a href="#hdr2" class="hdr-btn">ToS</a><a href="#hdr6" class="hdr-btn">ToC</a><a href="#hdr4" class="hdr-btn">Skip</a></div>
# Github Pages<a id="hdr3"></a>

This website was created (for free) on **Github Pages**. You can use the [editor on GitHub](https://github.com/pippim/pippim.github.io/edit/main/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.
<div class="hdr-bar"><a href="#" class="hdr-btn">Top</a><a href="#hdr3" class="hdr-btn">ToS</a><a href="#hdr6" class="hdr-btn">ToC</a><a href="#hdr5" class="hdr-btn">Skip</a></div>
## Markdown<a id="hdr4"></a>

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

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

### How Pippim converts Stack Exchange Q&A to Jekyll Blog Posts

Pippim adds the navigation bar (Top, ToS, ToC and Skip) by first putting HTML tags into the markdown files:

```
# Header1<a id="hdr1"></a>
## Header2<a id="hdr2"></a>
### Header3<a id="hdr3"></a>
```

Navigation button bars are then inserted in front of qualifying secction headers as show below. Note the actual format is condensed but for illustration purposes the `<div>...</div>` is spread out over many lines.

``` html
## Qaulified header 4<a id="hdr4"></a>

A bunch of text lines under qualified header

``` html
<div class="hdr-bar">
  &ltq;a href="#" class="hdr-btn">Top</a>
  <a href="#hdr4" class="hdr-btn">ToS</a>
  <a href="#hdr6" class="hdr-btn">ToC</a>
  <a href="#hdr6" class="hdr-btn">Skip</a>
</div

## Qaulified header<a id="hdr5"></a>
```

Pippim appends two spaces to the end of block quotes in Stack Exhange answers. Take for example how block quotes are defined in Stack Exchange:

```
> line 1
> line 2
```

If they were not modified they would display as:

> line 1
> line 2

After Pippim reformats the block quotes for Github Pages markdown they show up properly:

> line 1  
> line 2  

You can open one of the blog posts and compare it to the Stack Exchange original answer.

<div class="hdr-bar"><a href="#" class="hdr-btn">Top</a><a href="#hdr4" class="hdr-btn">ToS</a><a href="#hdr6" class="hdr-btn">ToC</a><a href="#hdr6" class="hdr-btn">Skip</a></div>

## Table of Contents support<a id="hdr5"></a>

To get a Table of Contents (TOC) insert `{ % include toc.md % }` at the place you want it. All your markdown headers with `#`, `##` and `###`, etc. are used to create the TOC. Note there is no space between `{ %` and `% }` in the command but, spaces had to be added to show the commnd. The real TOC command is used on the next line:

<div class="hdr-bar"><a id="hdr6"></a><a href="#" class="hdr-btn">Top</a><a href="#hdr5" class="hdr-btn">ToS</a><a href="#hdr6" class="hdr-btn">ToC</a><a href="#hdr7" class="hdr-btn">Skip</a></div>

{% include toc.md %}

<div class="hdr-bar"><a href="#" class="hdr-btn">Top</a><a href="#hdr6" class="hdr-btn">ToS</a><a href="#hdr6" class="hdr-btn">ToC</a><a href="#hdr8" class="hdr-btn">Skip</a></div>

## Jekyll Themes<a id="hdr7"></a>

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/pippim/pippim.github.io/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

<div class="hdr-bar"><a href="#hdr1" class="hdr-btn">Top</a><a href="#hdr7" class="hdr-btn">ToS</a><a href="#hdr6" class="hdr-btn">ToC</a><a href="#hdr9" class="hdr-btn">Skip</a></div>

## Images, Javascript, CSS and HTML<a id="hdr8"></a>

These are the file types in the pippim website:

- Images are stored in `assets/img/` directory
- SCSS (a superset of CSS) files are stored in `assets/css/` directory
- Sass (Used to generat ToC) files are stored in `_sass/` diretory
- This pages is stored in `index.md` file in the root directory
- The <kbd>About</kbd> page is stored in `about.md` file in the root directory
- The <kbd>Answers</kbd> page is stored in `answers.md` file in the root directory
- The <kbd>Programs</kbd> page is stored in `programs.md` file in the root directory
- The blog entries (called Answers in pippim) are stored in the `_posts/` directory
- HTML can be found in any file, including markdown files which end in `.md`. Pure HTML files can be found in the `_includes` directory

### Directory tree

As of October 30, 2021, the directory tree for Pippim on Github Pages looked like this:

```
$ tree
.
├── about.md
├── answers.md
├── assets
│   ├── css
│   │   └── style.scss
│   └── img
│       ├── Blog_Project-Management-101.png
│       ├── earth-from-space.jpg
│       ├── octojekyll-opt.jpg
│       └── pngwing.com.png
├── _config.yml
├── _includes
│   ├── head-custom.html
│   └── toc.md
├── index.md
├── LICENSE
├── _posts
│   └── 2021-10-24-welcome-to-jekyll.md
├── programs.md
├── QueryResults.csv
├── _sass
│   └── toc.scss
├── StackBlogPost
└── stack-to-blog.py

6 directories, 16 files
```

<a id="hdr9"></a>
