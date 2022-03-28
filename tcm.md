---
title: The Cookie Machine
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

{% include image.html src="/assets/img/tcm/TCM transparent button.gif"
   alt="TCM transparent button.gif"
   style="float: left; width: 75%; margin: .25rem 1rem 1rem 0px;"
   caption="The Cookie Machine Transparent Button"
%}

*The Cookie Machine*, commonly abbreviated as **TCM**,
is accessed using a transparent button at the top of
every {{ site.title }} web page.

TCM is new technology that repurposes "Cookies". Cookies
were historically used to track your activity on the
the internet. With TCM, cookies are used to
save, share and quickly import configurations from other
browsers, users and devices.

Development began on February 25, 2022 and should take 
about six months to complete.

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Accessing The Cookie Machine (TCM)

There is a transparent button you can click to access 
*The Cookie Machine* (TCM). This button is not available
on Smart Phones because the screen size is too small.

As the `.gif` animation shows the transparent button is
located to the far right of the regular buttons. It is
the same height as the regular buttons and about 5
characters wide.

## Draggable Window

When you open *The Cookie Machine* (TCM for short), a draggable
window appears:

Click and hold the title bar and drag the window anywhere on your screen.

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

{% include image.html src="/assets/img/tcm/TCM transparent button.gif"
   alt="TCM transparent button.gif"
   style="float: left; width: 75%; margin: 2rem 1rem 1rem 0px;"
   caption="The Cookie Machine Transparent Button"
%}

# TCM Window Buttons

The buttons brighten as you hover over them.


<table id="tcm_window_table" class="hrb_table">
   <tr><th>Buttons</th>
       <th>Usage</th>
   </tr>

   <tr><td><button id="tcm_window_icon" class="tcm_documentation" 
   title="The Cookie Machine Window Icon" ></button></td>
   <td><em>The Cookie Machine</em> (<b>TCM</b>) Window Icon - 
   appears in the title bar.
   It also appears in the webpage header after you close TCM.
   Clicking the TCM icon in the webpage header reopens TCM. In other words,
   the button is no longer hidden!</td></tr> 

   <tr><td><button id="tcm_display_home" class="tcm_documentation" 
   title="The Cookie Machine Home Page" ></button></td>
   <td><b>Home Page</b> - Displays site wide global Jekyll Front Matter such as; 
   URLs, number of views, number of posts, etc.</td></tr> 
   
   <tr><td><button id="tcm_display_cloud" class="tcm_documentation" 
   title="Cloud storage - Display website tree" ></button></td> 
   <td><b>Cloud Storage</b> - Displays {{ site.title }} website directory tree</td></tr> 
   
   <tr><td><button id="tcm_display_local" class="tcm_documentation" 
   title="Local storage - Display cookies and cache" > </button></td> 
   <td><b>Local Storage</b> - Change cookies used for option settings such as;
   Less/More front matter and TCM Button visibility on page header.</td></tr>
   
   <tr><td><button id="tcm_hyperlink_recipe" class="tcm_documentation" 
   title="Hyperlink Recipe Baker" > </button></td> 
   <td><b>Hyperlink Recipe Baker (HRB)</b> - Used to create hyperlinks 
   in HTML or Markdown format See the
   <a href="https://pippim.github.io/hyperlink.html#" target="_blank" 
   title="Complete instructions for using Hyperlink Recipe Baker"
   >full documentation</a>. Very handy for creating hyperlinks to
   the current webpage, without having to switch to another browser tab.
   </td></tr>
   
   <tr><td><button id="tcm_webpage_info" class="tcm_documentation" 
   title="Webpage Name and Front Matter" ></button></td>
   <td><b>Webpage Information</b> - Display Jekyll Front Matter 
   for current webpage</td></tr>

   <tr><td><button id="tcm_window_icon" class="tcm_documentation" 
   title="The Cookie Jar" ></button></td>
   <td><b>Cookie Jar</b> - 
   The Cookie jar is for file uploads and downloads.
   Cookies and local storage is saved and retrieved
   from the Cookie Jar. </td></tr> 

</table>

<!-- NOTE: #tcm_window_icon through #tcm_webpage_info defined in /assets/css/style.scss -->

<style>
  #tcm_window_table table { table-layout: fixed; width: 100%; border: 3px solid black; }
  #tcm_window_table table tr th:nth-child(1){ width: 10rem; }
  #tcm_window_table td { padding: 0 1rem; }
  #tcm_window_table td+td { width: auto; }
  .tcm_documentation {
    display:block;
    width: 45px;
    height: 45px;
    margin: .5rem .5rem;
    background-repeat: no-repeat;
    background-size: cover;
    border: none;  
  }
  .tcm_documentation:hover {
    filter: brightness(150%);
  }
</style>


---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>


---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>


# Home Button

Displays Jekyll Front Matter for the website. This
is formatted as YAML key/value pairs in `_config.yml`.

Comments and blank lines are not displayed.

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Cloud Button

Displays website tree.

---


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

# Local Storage Button

The local storage section is used to control cookie settings.

The TCM Top of Page Button's visibility is controlled by 
cookies described below.

On/Off slider switches are used to control when the
TCM Button is visible at the top of webpages. When the
switch is red it "off" and when it is green it is "on".

In the TCM window's local storage section you will see:

<h3>Local Storage and Cookies:</h3>

After closing this window, the TCM button will be:<br>

&emsp; Visible on this webpage?
   <img class="with-action" id="switch_this_page" 
   src="/assets/img/icons/switch_off_left.png" /><br>

&emsp; Visible on all webpages? 
   <img class="with-action" id="switch_all_pages" 
   src="/assets/img/icons/switch_off_left.png" /><br>

&emsp; Visible on all sessions? 
   <img class="with-action" id="switch_all_sessions" 
   src="/assets/img/icons/switch_off_left.png" />

> **NOTE:** The slider switches above are live and will
> effect TCM Button visibility as if you had set them
> in the Cookie Machine directly.

<script>

/* include tcm_button_visibility.js code shared by:
    /assets/js/theCookieMachine.js - Draggable Modal Dialog
    /tcm.md - The Cookie Machine documentation webpage
*/
{% include tcmButtonVisibility.js %}
tcmButtonVisibility()

</script>


----

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# Hyperlink Button

Spins up an instance of the Hyperlink Recipe Baker.

This allows you to quickly create hyperlinks on any website page
without having to switch browser tabs.


# Webpage Information Button

Displays Jekyll Front Matter for the current webpage. This
is formatted as YAML key/value pairs.

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
