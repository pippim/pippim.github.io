---
title: "Internet of Things" - Control TV's and power outlets
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

This page describes how to **Control TV's and power outlets.**

At the heart of the system is the `tvpowered` program
which starts after you login. This is a bash script stored
in your `~/.config/autostart` directory.

To assist with setting up your "Internet of Things" (IoT)
the program `ssh-setup` is called to document the devices
attached to your LAN and/or Wi-Fi router.

To power off electric lights when you shut down or suspend
your computer the `/etc/NetworkManager/dispatcher.d/pre-down.d`
directory contains the bash script `smartplug_off`.

When resuming from system sleep (waking up your laptop)
the `/lib/systemd/system-sleep` directory contains the
bash scripts:

- `sound.sh` Turns on sound for nVidia 970 HDMI output
- `sonytv` Turns Sony TV picture off and leaves sound on

The bash script `fliptv` toggles the wall outlet power
behind the main TV. In this case the power controls a
lamp to provide back lighting which reduces eye strain.

The bash script `flipkitchen` toggles the wall outlet power
behind the second TV. In this case the power controls a
lamp to provide back lighting which reduces eye strain.

There are three bash scripts to control a Sony TV screen:

- `pictureoff.sh` Turns off the Sony TV screen but leaves sound on
- `pictureon.sh` Turns on the Sony TV screen which consumes 100 watts
- `picturetog.sh` Toggles Sony TV screen off and on

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---
<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# {{ site.title }} Website Directory Tree

{% include website_tree.html %}

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# Clone {{ site.title }} Website Locally

These are the Linux instructions for cloning the 
{{ site.title }} website to your local drive.

``` bash
sudo apt update && sudo apt install git
cd ~
git clone https://github.com/pippim/pippim.github.io.git website2
cp -ar ~/website2 ~/website
```

> NOTE: `~/website` is your working directory and
> `~/website2` is a mirror copy of the website needed
> to publish changes with `refresh.sh` bash script.

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Convert Stack Exchange to GitHub Pages

{% include image.html src="/assets/img/stack/stack-to-blog progress display.gif"
   alt="stack-to-blog.py"
   style="float: none; width: 100%; margin: 0px 0px 0px 0px;"
%}

Converting thousands of Stack Exchange Q&A in markdown format isn't as easy
as simply copying them over to GitHub Pages. The python program
`stack-to-blog.py` was used to convert Stack Exchange posts to
GitHub Pages Posts.
The full `stack-to-blog.py` program can be accessed on the
[Pippim Website repo 🔗](https://github.com/pippim/pippim.github.io/blob/main/sede/stack-to-blog.py){:target="_blank"}.

The program automatically:

- Creates Jekyll front matter on posts and front matter totals for site.
- Selects Stack Exchange Posts based on meeting minimum criteria such as up-votes or accepted answer status.
- If self-answered question, the answer is included and not the question.
- If self-answered question, the accepted answer alone doesn't qualify. Votes from other are the qualifier.
- Initial testing allows selecting small set of random record numbers to convert.
- Converts Stack Exchange Markdown formats to GitHub Pages Kramdown Markdown format.
- Creates hyperlinks to original Answer in Stack Exchange and Kramdown in GitHub Pages.
- Creates search word to URL indices excluding 50% of words like "a", "the", etc. to save space.
- Selectively inserts Table of Contents based on minimum criteria settings.
- Selectively inserts Section Navigation Buttons for: <kbd>Top</kbd> (Top of Page), <kbd>ToS</kbd> (Top of Section), <kbd>ToC</kbd> (Table of Contents) and <kbd>Skip</kbd> (Skip section).
- Selectively inserts "Copy Code Block to System Clipboard" button based on lines of code.
- Creates HTML with "Top Ten Answers" with the most votes.
- Creates powerful nested expandable/collapsible detail/summary HTML for many thousands of tags by post.
- Remaps hyperlinks in Stack Exchange Posts to {{ site.title }} website posts if they were converted.
- Fixes old broken `#header` Stack Exchange Markdown.
- Converts `< block quote` Stack Exchange Markdown into what works in Jekyll Kramdown.
- Convert Stack Exchange `<!-- language -->` tags to fenced code block language.
- When no fenced code block language is provided, uses shebang language first (if available).
- Converts older four-space indented code blocks to fenced code blocks.
- Converts Stack Exchange Hyperlinks where the website post title is implied and not explicit.
- Prints list of self-answered questions that were not accepted after the mandatory two day wait period.
- Prints list of Rouge Syntax Highlighting languages not supported in fenced code blocks.
- Prints summary totals when finished.

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Stack Exchange Data Explorer

The **Stack Exchange Data Explorer** retrieves all your posts from the
Stack Exchange (SE) network into a CSV file (up to 10 MB) for downloading.

To download your SE posts you will need to:

- Click the link below
- Log in to the SE Data Explorer
- Search for the query: *"All my posts on the SE network"*
- Enter your network ID for the query parameter. E.G. 4775729
- After a few minutes, when the query completes, download the Query Results.

Each of these steps is described in detail in the following sections.

## First Step is to Log In

The first step in converting Stack Exchange posts to {{ site.title }}
website posts is to run a
[Stack Exchange Data Explorer Query 🔗](https://data.stackexchange.com/){:target="_blank"}.
After clicking the link you are presented with the Log In screen:

{% include image.html src="/assets/img/stack/stack exchange data explorer login.png"
   alt="Stack Exchange Data Explorer Log In Screen"
   style="float: none; width: 100%; margin: 0px 0px 0px 0px;"
%}

Click the <kbd>log in</kbd> button at the top right of the screen.
Then you can log in using **Google** or **Stack Overflow**. I use
the latter since Google already knows too much about us :)

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

{% include image.html src="/assets/img/stack/stack exchange data explorer search bar.png"
   alt="Stack Exchange Data Explorer Query Search Bar"
   style="float: right; width: 60%; margin: 3rem 0px 0px 1rem;"
%}

## Search For Query

After logging in, the top of the window provides a search bar to find a query.
Enter; *"All my posts on the SE network"* or copy with the button below
and, paste into the search bar.

``` text
All my posts on the SE network
```
