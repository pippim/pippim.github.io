---
title: The Cookie Machine
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

<script>
/* include tcm-common-code.js code shared by:
    /assets/js/theCookieMachine.js - Draggable Modal Dialog
    /tcm.md - The Cookie Machine documentation webpage
*/
{% include tcm-common-code.js %}
</script>

# Introduction

{% include image.html src="/assets/img/tcm/TCM Header with Gingerbread Man.png"
   alt="TCM Header with Gingerbread Man.png"
   style="float: none; width: 100%; margin: .25rem 0 1rem 0px;"
   caption="The Cookie Machine's Gingerbread Man Button on far right."
%}

*The Cookie Machine*, commonly abbreviated as **TCM**,
webpage heading is shown above. The normally transparent 
"Gingerbread Man" button visible. When visible, it
always appears in the same spot at the top of
the {{ site.title }} webpage.

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

{% include image.html src="/assets/img/tcm/TCM transparent button.gif"
   alt="TCM transparent button.gif"
   style="float: left; width: 75%; margin: 2rem 1rem 1rem 0px;"
   caption="The Cookie Machine Transparent Button"
%}

# How to Open The Cookie Machine (TCM)

There is a transparent button you can select to open 
*The Cookie Machine* (TCM).

As the `.gif` animation above shows, the transparent button is
located to the far right of the regular buttons. It is
the same height as the regular buttons.

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# TCM Draggable Window

{% include image.html src="/assets/img/tcm/TCM Draggable Window.gif"
   style="width: 100%; margin: 0;"
   alt="TCM Draggable Window"
   caption="The Cookie Machine Draggable Window"
%}

When you open *The Cookie Machine* (TCM for short), a draggable
window appears. As show above, click and hold the title bar 
to drag the window anywhere on your screen.  If you drag it so
far off the screen you can't access the title bar anymore,
simply refresh the screen and no work is lost.

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# TCM Window Buttons

{% include image.html src="/assets/img/tcm/TCM Window Buttons.gif"
   style="width: 100%; margin: 0;"
   alt="TCM Window Buttons"
   caption="The Cookie Machine Buttons"
%}

The TCM Window Buttons brighten as you hover over them. Selecting
a button instantly changes the window's content. In the above
animation however, each button is merely hovered over.

## TCM Window Button Icons

<div class="tcm_doc_window_button">
    <button id="tcm_doc_window_icon" title="TCM Window Icon"></button>
    <button id="tcm_display_home" title="Home Page - Site summary"></button>
    <button id="tcm_display_cloud" title="Cloud storage - Site website tree"></button>
    <button id="tcm_display_local" title="Local storage - Cookies and cache"></button>
    <button id="tcm_hyperlink_recipe" title="Hyperlink Recipe Baker"></button>
    <button id="tcm_webpage_info" title="Webpage information - Front Matter"></button>
    <button id="tcm_cookie_jar" title="Cookie Jar - Import/Export cookies"></button>
</div>

Here are all the TCM Window Buttons at twice their normal size.
In the next section a brief table summary of what each button
does is presented. Click on the button or click "Read more..."
to get more details.

## TCM Window Button Summary Description

<table id="tcm_window_table" class="hrb_table">
   <tr><th>Button</th>
       <th>Description</th>
   </tr>
   <tr><td><button id="tcm_window_icon" class="tcm_documentation" 
      onClick='window.location="#tcm_icon"'
      title="The Cookie Machine Window Icon" ></button></td>
   <td><b>TCM Icon</b> - <em>The Cookie Machine</em> (<b>TCM</b>)
      Icon appears in the TCM Window title bar.
      It also appears in the webpage header after you close TCM.
      Clicking the TCM icon in the webpage header reopens TCM. 
      <a href="#tcm_icon">Read more...</a></td></tr> 
   <tr><td><button id="tcm_display_home" class="tcm_documentation" 
      onClick='window.location="#home_button"'
      title="The Cookie Machine Home Page" ></button></td>
   <td><b>Home Page</b> - Displays site wide global Jekyll Front Matter such as; 
      URLs, number of views, number of posts, etc.
      <a href="#home_button">Read more...</a></td></tr> 
   <tr><td><button id="tcm_display_cloud" class="tcm_documentation" 
      onClick='window.location="#cloud_button"'
      title="Cloud storage - Display website tree" ></button></td> 
   <td><b>Cloud Storage</b> - Displays {{ site.title }} website directory tree
      <a href="#cloud_button">Read more...</a></td></tr> 
   <tr><td><button id="tcm_display_local" class="tcm_documentation" 
      onClick='window.location="#local_button"'
      title="Local storage - Display cookies and cache" > </button></td> 
   <td><b>Local Storage</b> - Change cookies used for option settings such as;
      Less/More front matter and TCM Button visibility on page header.
      <a href="#local_button">Read more...</a></td></tr>
   <tr><td><button id="tcm_hyperlink_recipe" class="tcm_documentation" 
      onClick='window.location="#hyperlink_button"'
      title="Hyperlink Recipe Baker" > </button></td> 
   <td><b>Hyperlink Recipe Baker (HRB)</b> - Used to create hyperlinks 
      in HTML or Markdown format See the
      <a href="https://pippim.github.io/hyperlink.html#" target="_blank" 
      title="Complete instructions for using Hyperlink Recipe Baker"
      >full documentation</a>. Very handy for creating hyperlinks to
      the current webpage, without having to switch to another browser tab.
      <a href="#hyperlink_button">Read more...</a></td></tr>
   <tr><td><button id="tcm_webpage_info" class="tcm_documentation" 
      onClick='window.location="#webpage_button"'
      title="Webpage Name and Front Matter" ></button></td>
   <td><b>Webpage Information</b> - Display Jekyll Front Matter 
      for current webpage <a href="#webpage_button">Read more...</a></td></tr>
   <tr><td><button id="tcm_cookie_jar" class="tcm_documentation" 
      onClick='window.location="#cookie_jar_button"'
      title="The Cookie Jar - Import/Export cookies" ></button></td>
   <td><b>Cookie Jar</b> - 
      The Cookie jar is for file uploads and downloads.
      Cookies and local storage is saved and retrieved
      from the Cookie Jar. <a href="#cookie_jar_button">Read more...</a></td></tr> 
</table>

<!-- NOTE: Button image IDs for  #tcm_window_icon through #tcm_cookie_jar
           are defined in /assets/css/style.scss 
-->

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

<a id="tcm_icon"></a>
## TCM Icon

<div class="tcm_doc_window_button">
    <button id="tcm_doc_window_icon" title="TCM Window Icon"></button>
</div>

The Cookie Machine (TCM) icon, ***TCM Icon*** is a Gingerbread Man.

When a {{ site.title }} webpage loads the Icon is in a transparent
button you cannot see. If you position your mouse to the right after
the "normal" buttons in the page header, the cursor changes shape.
The cursor changing shape indicates you can now select the TCM
Window button.

After selecting and then closing the TCM Window, the TCM Icon will
appear in the webpage header. It will remain visible until a new
webpage is loaded.

You can change the rules for TCM Icon visibility in the 
<a href="#tcm_icon" title="Change TCM Button visibility 
rules" >Local Storage</a> section.

---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

<a id="home_button"></a>

## Home Button

<div class="tcm_doc_window_button">
    <button id="tcm_display_home" title="Home Page - Site summary"></button>
</div>

The ***Home Button*** displays Jekyll Front Matter for the 
{{ site.title }} website. Front matter is stored as 
YAML key/value pairs in `_config.yml`. 

Comments and 
blank lines are not displayed. The total number 
of lines count will includes comments and blank 
lines which are not displayed in the window.

The Home Button window contents are displayed below: 



<div id="tcm_home"></div>

<style>
#tcm_home {
   border: 3px solid grey;
   margin-left: 1em;
   padding: .5rem;
}
#tcm_home table th, table td { padding: .018rem 1rem ! important; }
</style>

<script>
// arrConfigYml defined in search.js
var html = htmlFrontMatter(arrConfigYml, "Site Front Matter ('_config.yml')");
document.getElementById("tcm_home").innerHTML = html;
</script>

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

<a id="cloud_button"></a>

## Cloud Button

<div class="tcm_doc_window_button">
    <button id="tcm_doc_display_cloud" title="Cloud storage - Site website tree"></button>
</div>
The ***Cloud Button*** displays the {{ site.title }} website tree.
This is useful information If you are a web developer. For the
average user though, it has little value.

The website tree is not displayed in real time. Contents are
taken from the file `_includes/website_tree.txt` which is
manually uploaded from time to time. The file contents can
be generated using the Linux `tree` command. See the
`refresh.sh` bash script for an 
[example 🔗](https://github.com/pippim/pippim.github.io/blob/main/sede/refresh.sh 
"Using the `tree` command to generate website_tree.txt"){:target="_blank"}.

The {{ site.title }} website tree is displayed below:

<div id="tcm_website_tree"></div>

> **NOTE:** Directory level depth is suppressed for `/assets/img/icons`
> subdirectory through `/assets/img/stack/` subdirectory. This keeps the
> number of lines down.

<style>
#tcm_website_tree {
   border: 3px solid grey;
   margin-left: 1em;
   padding: .5rem;
   max-height: 90vh;
   max-width: 100%;
   overflow: auto;
   white-space: pre;         // 2022-03-12 will this restore spacing in website_tree.json
}
</style>

<script>
fetch(raw_url + '/assets/json/website_tree.json')
   .then((response) => response.json())
   .then((website_tree) => {
      var html = htmlWebsiteTree(website_tree);
      //html += '<style>#tcmLineDraw {\n' +
      //   'line-height: 1;\n' +
      //   '}\n'
      html += '</style>';
   document.getElementById("tcm_website_tree").innerHTML = html;
});
</script>


---


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

<a id="local_button"></a>

## Local Storage Button

<div class="tcm_doc_window_button">
    <button id="tcm_display_local" title="Local storage - Cookies and cache"></button>
</div>

The **Local Storage*** Button is used to view and control
cookie settings.

Cookies are stored locally within your Web Browser client
settings. They cannot be viewed/changed by another webpage
or webserver. They cannot be used by another Web Browser.

See the Cookie Jar if you wish to share cookies with
another Web Browser, or another device, or another user.

The TCM Icon at the top of each webpage visibility is
controlled by cookies described below.

On/Off slider switches are used to control when the
TCM Button is visible at the top of webpages. When the
switch is red it "off" and when it is green it is "on".

In the TCM window's local storage section you will see:

<div id="tcm_switches"></div>

> **NOTE:** The slider switches above are live and will
> effect TCM Button visibility as if you had set them
> in the Cookie Machine directly.

<div id="tcm_search_stats"></div>

The Search Engine Statistics are kept in Session Storage
to save page load times. Once every 24 hours the Session
Storage is refreshed from the internet. When this happens
an extra couple of seconds delay will occur on the first
webpage read.

<style>
#tcm_switches, #tcm_search_stats {
   max-width: 30rem;
   border: 3px solid grey;
   margin-left: 1em;
   padding: .5rem;
}
</style>
<script>
document.getElementById("tcm_switches").innerHTML = htmlVisibilitySwitches();
document.getElementById("tcm_search_stats").innerHTML = htmlSearchStats();

tcmButtonVisibility()

</script>


----

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

<a id="hyperlink_button"></a>

## Hyperlink Recipe Baker Button

<div class="tcm_doc_window_button">
    <button id="tcm_hyperlink_recipe" title="Hyperlink Recipe Baker"></button>
</div>

The ***Hyperlink Recipe Baker*** Button spins up an instance of the
Hyperlink Recipe Baker or, **HRB** for short.

This allows you to quickly create hyperlinks on any 
{{ site.title }} website page
without having to switch browser tabs.

There are actually four instances of HRB available:

- In the Cookie Machine (TCM)
- On the main HRB webpage
- On the "Diet" HRB webpage
- Immediately below

<div id="hrb_body"></div>
<script>
processHyperlinkRecipe("hrb_body")
</script>

Instructions for using the Hyperlink Recipe Baker can be found 
[here](https://www.pippim.com/hyperlink.html "Hyperlink Recipe Baker").

---


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

<a id="webpage_button"></a>

## Webpage Information Button

<div class="tcm_doc_window_button">
    <button id="tcm_webpage_info" title="Webpage information - Front Matter"></button>
</div>

The ***Webpage Information*** Button displays
Jekyll Front Matter for the current webpage on the 
{{ site.title }} website. Front matter is internally
stored as YAML key/value pairs at the top of each page.

Comments and 
blank lines are not displayed. The total number 
of lines count *may* include comments and blank 
lines which are not displayed in the window.

The Webpage Information window contents are displayed below: 

<div id="tcm_doc_webpage"></div>

There is not much information on this current page window.
If you were to navigate to a blog post (in the "Answers"
section), then you would see a lot more Front Matter.

<style>
#tcm_doc_webpage {
   border: 3px solid grey;
   margin-left: 1em;
   padding: .5rem;
}
#tcm_doc_webpage table th, table td { padding: .018rem 1rem ! important; }
</style>

<script>
var urlMarkdown = getMarkdownFilename();
var html = "<p><b>Filename: </b>" + urlMarkdown + "</p>\n";
fetch(urlMarkdown)
  .then((response) => response.text())
  .then((results) => {
      var results = results.split("\n")  // Convert string into array
      var front_yml = getFrontMatter(results)
      html += htmlFrontMatter(front_yml, "Current Webpage Front Matter");
      document.getElementById("tcm_doc_webpage").innerHTML = html;
  });
</script>


---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>



<a id="cookie_jar_button"></a>

## Cookie Jar Button

<div class="tcm_doc_window_button">
    <button id="tcm_cookie_jar" title="Cookie Jar - Import/Export cookies"></button>
</div>

The ***Cookie Jar*** Button allows you to see, download/export,
upload/import, create and delete Cookies.

The Cookie Jar wsa created because Cookies, Session Storage,
Local Storage and Indexed DB are tightly controlled by
Web Browsers.

You can use the Cookie Jar to:

- Transfer cookies to another Web Browser
- Transfer cookies to another Device
- Transfer cookies to another User

Although the Cookie Jar can be set to the conventional
folder name `Donwloads`, a separate folder can be used.
For example, a folder named `Cookie Jar` could be
created in your home directory.


---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

# Future Plans

A web version where you can run Multi-Timer on any web browser on any
platform anywhere in the world.

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a></div>
