---
title: Hyperlink Recipe Baker
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

Just click a few buttons to paste clipboard contents and select "Bake"
option for a Hyperlink in HTML format or a Hyperlink in Markdown
format copied to your clipboard.

Then simply paste the "baked recipe" into your document with
<kbd>Ctrl</kbd> + <kbd>V</kbd>.


> **NOTE:** The Hyperlink Recipe Builder is not suitable for small screens (E.G. Smart Phones).

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Using Hyperlink Recipe Builder (HRB)

<div id="hrb_body">
<p> DUMMY TEXT - Real text set in User Script</p>
</div>
<!-- --> 
<script type="module" src="{{ site.url }}/assets/js/hyperlinkRecipe.js"></script>
<script>
import {processHyperlinkRecipe} from '/assets/js/hyperlinkRecipe.js' 
processHyperlinkRecipe('hrb_body');
</script>

1. Right-click on your target address bar and select "copy".
2. Click <kbd>URL (href)</kbd> above to paste.
3. Highlight title from target. Right-click and select "copy".
4. Click <kbd>Name (text)</kbd> above to paste.
5. Highlight excerpt from target. Right-click and select "copy".
6. Click <kbd>Tooltip (title)</kbd> above to paste.
7. Click <kbd>HTML</kbd> or <kbd>Markdown</kbd> to copy Hyperlink into clipboard.
8. Insert the clipboard containing hyperlink into your document. 

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Installing Hyperlink Recipe Builder on your own website

The easiest way is to
[open the raw code](https://raw.githubusercontent.com/pippim/multi-timer/main/src/mt)
on GitHub.

Then use:

- <kbd>Ctrl</kbd> + <kbd>A</kbd> to select all text
- <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy all text to clipboard
- Open the terminal with <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>
- Run `gedit mt`
- <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste text from clipboard
- Save the file and exit gedit.

Voila! You have just installed `mt` to your home directory.

Now add it to your GitHub Pages. E.G. `/assets/js/hyerlinkRecipe.js`

Then on your webpage markdown file insert the following:

``` html
<div id="hrb_body">
<p> DUMMY TEXT - Real text set in User Script</p>
</div>
<script>
import {processHyperlinkRecipe} from '/assets/js/hyperlinkRecipe.js'
processHyperlinkRecipe('hrb_body')
</script>
```

---


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

## Move Multi-Timer into PATH

In order to call Multi-Timer from any directory with the `mt` command
you will want to move the program into your path.

A good place for all users is `/usr/bin`.

A good place to use Multi-Timer just for yourself
is `~/bin`. Because `~` is shorthand for `/home/<YOUR USER NAME>`,
the `~/bin` directory under your home user name. By default,
you do not have a `~/bin` directory under your home user name. So you
will need to use:

```shell
mkdir ~/bin
```

> NOTE:
>
> After creating the `~/bin` directory you will need to
> close the terminal and reopen it.

To verify the new directory is in your path use:

```shell
echo $PATH
```

The very first directory will be `/home/<YOUR USER NAME>/bin`.

Now move the `mt` program from `~/mt` to `~/bin/mt` using:

``` shell
mv ~/mt ~/bin/mt
```

Now you are all set to call `mt` from any directory!

----


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# Optionally Modify Multi-Timer Source Code

The source code (Bash Script) can easily be changed by anyone with
moderate knowledge of the Linux Shell.  You can view the full
source code [here](https://github.com/pippim/multi-timer/blob/main/src/mt),

If you wish to change the source code, here are the likely places you
want to change:

``` bash
# Running under WSL (Windows Subsystem for Linux)?
if grep -qE "(Microsoft|WSL)" /proc/version &> /dev/null ; then
    fWindows10=TRUE
    SoundPlayer=""
    DefaultSound="C:\Windows\media\Ring05.wav"
    TitlePrefix="Windows 10"
else
    fWindows10=FALSE
    SoundPlayer="/usr/bin/paplay"
    DefaultSound="/usr/share/sounds/freedesktop/stereo/alarm-clock-elapsed.oga"
    TitlePrefix="Linux"
fi

DefaultIcon="/usr/share/icons/gnome/48x48/status/appointment-soon.png"
sIconFilename="$DefaultIcon"    # Give default until configuration read in
MAX_TIMERS=10                   # Default when creating configuration
```

> **IMPORTANT NOTE:**
>
> Version 0.2.0 was released on
> February 19, 2022 and not tested with WSL
> (Windows Subsystem for Linux).

---


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

# Dependencies

Here are the dependencies you ned to install for `mt`.

``` shell
sudo apt update
sudo apt install yad
sudo apt install libnotify-bin
```

---


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>



# Create a Second Configuration File

Lets say you want a second Multi-Timer Configuration file
for another project.  Enter these commands from the terminal (The `#`
comments are not necessary but will not effect operations):

```shell
cd ~/.config                  # Go to user's configuration directory
cp mt.conf mt_laundry.conf    # Copy Multi-Timer configuration file
rm mt.conf                    # Remove Multi-Timer configuration file
mt                            # Run Multi-Timer as if first time
```

This saves the current configuration as `mt_laundry.conf` and runs
Multi-Timer as if it were the first time.

The copy command (`cp`) and remove command (`rm`) can be combined into
a single move command (`mv`) to rename the configuration file:

```shell
cd ~/.config                  # Go to user's configuration directory
mv mt.conf mt_laundry.conf    # Rename Multi-Timer configuration file
```

---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

# Increasing Maximum Number of Timers

Lets say you created your configuration with the
*Maximum Number of Timers* for your laundry job set to 3 for:

- Wash
- Rinse
- Dry

Then you decided you wanted to add another timer for folding
your clothes. The conventional method is to simply delete the
configuration file (as described in the previous section) and
create a new configuration.

There is another option though. YOu can actually edit the
configuration file using `gedit` or another editor. For example,
type `gedit ~/.config/mt.conf` and you will see:

0.2.0|Minutes|1|1|/usr/bin/paplay|/usr/share/sounds/freedesktop/stereo/alarm-clock-elapsed.oga|/usr/share/icons/gnome/48x48/status/appointment-soon.png|Each set end|TRUE|FALSE|TRUE|FALSE|FALSE|FALSE|TRUE|TRUE|3|Wash|Rinse|Dry|16|13|58

The pipe character (`|`) separates fields in the configuration file.

Notice the end of the line contains:

    TRUE|3|Wash|Rinse|Dry|16|13|58

The `3` indicates the maximum number of timers. This is followed
by the timer aliases: `Wash`, `Rinse` and `Dry`. Next comes
the timer durations in minutes: `16`, `13` and `58`.

To change to four timers you would change them to:

    TRUE|4|Wash|Rinse|Dry|Fold|16|13|58|10

The `4` indicates the maximum number of timers. This is followed
by the timer aliases: `Wash`, `Rinse`, `Dry` and `Fold`. Next comes
the timer durations in minutes: `16`, `13`, `58` and `10`.

But while you are add it why not add some extra spare fields?

    TRUE|6|Timer 1|Wash|Rinse|Dry|Fold|Timer 6|0|16|13|58|10|0

You've just successfully created timer aliases `Timer 1` and
`Timer 6` with a duration of `0` minutes which means they
will never display and never get executed. If you ever want to
activate them just use the regular Main Configuration Tab in
Multi-Timer program.

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

# Future Plans

A web version where you can run Multi-Timer on any web browser on any
platform anywhere in the world.

The configuration file is stored on your web browser local storage in
the form of a Cookie.

A function to copy and paste your cookie into an email. Then send it
to yourself and receive it. Then paste the cookie onto another web
browser on your device. Or paste the cookie into a different device.
Or share your e-amil cookie with a friend / colleague and they can
run your Set of Timers.

Perhaps some day {{ site.title }} will have a special page of the
most popular Multi-Timer cookies that people can run.

Gone will be the notion of *Maximum Number of Timers*. You can have
an infinite amount depending on RAM. You can scroll and insert a
new timer anywhere in the set. You can highlight a timer and click
the Trash Bin. After confirmation all timers below simply move up
the list.

It will be easier to let you link the timer alarm to a YouTube
video instead of just a simple audio file.

The future can be revolutionary... or at the vary least evolutionary
because Cookies have existed for a long time, just never something
end-users were allowed to use for their own personal gain.

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a></div>
