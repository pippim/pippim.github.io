---
title: Hyperlink Recipe Baker
layout: program
---

<!-- Full version - hyperlink.md - All the bells and whistles
     Diet version - hrb.md - No buttons, search bar, footer, TCM or notes 
-->

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

Just click a few buttons to paste clipboard contents and select "Bake"
option for a Hyperlink in HTML format or a Hyperlink in Markdown
format copied to your clipboard.

Then simply paste the "baked recipe" into your document with
<kbd>Ctrl</kbd> + <kbd>V</kbd>.

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Using Hyperlink Recipe Baker (HRB)

Below is the Hyperlink Recipe Baker which you can easily drop into your own webpage.

<!-- The div below is populated by /assets/js/theCookieMachine.js -->
<div id="hrb_body">
<p> DUMMY TEXT - Real text set in User Script </p>
</div>

## Usage

1. Right-click on your target address bar and select "copy".
2. Click <kbd>URL (href)</kbd> above to paste.
3. Highlight title from target. Right-click and select "copy".
4. Click <kbd>Name (text)</kbd> above to paste. Or, type in a name.
5. Highlight excerpt from target. Right-click and select "copy".
6. Click <kbd>Tooltip (title)</kbd> above to paste. Or, type in a name.
7. Click <kbd>HTML</kbd> or <kbd>Markdown</kbd> to copy Hyperlink into clipboard.
8. Insert the clipboard containing hyperlink into your document.

> **Important note for Stack Exchange Users**
>  
> Do **NOT** use the *New Window/Tab* option. Stack Exchange will 
> not render the final HTML whatsoever. Even the link name and
> href will be lost.

### Samples

Below is sample HTML baked recipe:

- <a href="https://github.com/microsoft/monaco-editor/issues/2183" target="_blank"  title="Chrome security prompt to allow reading clipboard">Paste shows warning in Google Chrome#2183  🔗</a>

Below is sample Markdown baked recipe:

- [Paste shows warning in Google Chrome#2183  🔗](https://github.com/microsoft/monaco-editor/issues/2183 "Chrome security prompt to allow reading clipboard"){:target="_blank"}

Voila! You are now a master baker.

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

## Read Clipboard Special Permissions

Modern browsers will let anyone and anything write to the clipboard.
Reading from the clipboard is a high security function requiring
explicit permission.

> **Reason for high security to read the Clipboard**
>
> A user may have a document with their passwords in it. When they need
> to sign on they may open the document, copy their password and paste
> it into the sign on screen. If you do that remember to immediately
> copy some random sentence into your clipboard immediately after
> pasting your password.

### Chrome

Chrome will ask you for permission to allow the copied; URL, Name and
Tooltip to be read.

### Firefox

Firefox requires you to grant
permission with these steps:

- Enter "about:config" in the address bar (without quotes).
- Acknowledge the "scary" message.
- Search on "dom.events.testing.asyncClipboard" (without quotes).
- Click the toggle icon to switch "False" to "True".

### If You Don't Want to Give Special Permission

If you don't want to grant permissions you can still use HRB by
using <kbd>Control</kbd> + <kbd>V</kbd> to paste clipboard
contents directly in the input field instead of using the button.

---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Install Hyperlink Recipe Baker on a Website

You can install *Hyperlink Recipe Baker*, **HRB** for short, 
on your own website. For this purpose a 
[scaled down version](https://pippim.github.io/hrb.html "Specially designed webpage easier to understand"){:target="_blank"}
has been created for you to include on your own website.


The easiest way is highlight the code in the the GitHub Repository
and paste into a new file in your website.

Follow these steps:

- Go to the [repo](https://github.com/pippim/hrb/blob/main/assets/js/hyperlinkRecipe.js "Pippim Hyperlink Recipe Baker GitHub Repository"){:target="_blank"}
- <kbd>Ctrl</kbd> + <kbd>A</kbd> to select all text
- <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy all text to clipboard
- Go to your own website repo and create a new file called `/assets/js/hyperlinkRecipe.js`
- <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste text from clipboard
- Save the new file

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

## Add JavaScript Filename to Top Level HTML

A scaled down version of your webpage top level `_layout` file:

{% include copyHeader.html %}
``` html
<!DOCTYPE html>
<!--  https://github.com/pippim/pippim.github.io/new/main/_layhouts/hrb.html

      Stripped down default.html version without searchbar, buttons and tcm.

      Requires:
        hrb.js (Stub JavaScript that imports hyperlinkRecipe.js)
        hyperlinkRecipe.js (imported by hrb.js)
        hrb.md (Stub markdown that renders to https://pippim.github.io/hrb.html
-->

<html lang="{{ site.lang | default: "en-US" }}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#157878">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="stylesheet"
          href="{{ '/assets/css/style.css?v=' |
                append: site.github.build_revision | relative_url }}">
    <link rel="shortcut icon" type="image/png" href="/favicon.png">
  </head>

  <body>
    <header class="page-header" role="banner">
      <h1 class="project-name"
        >{{ page.title | default: site.title |
         default: site.github.repository_name }}</h1>

      <!-- Top level JavaScript defined as module so it can import hyperlinkRecipe.js -->
      <script type="module" src="/assets/js/hrb.js"></script>

    </header>
    <main id="content" class="main-content" role="main">
     {{ content }}
    </main>
  </body>
</html>

<!-- End of _layouts/hrb.html -->
```

For HRB installation, The only lines of particular interest are:

{% include copyHeader.html %}
```html
<!-- Top level JavaScript defined as module so it can import hyperlinkRecipe.js -->
<script type="module" src="/assets/js/hrb.js"></script>
```

You may already have a JavaScript file setup in your top
level HTML. In this case simply change the `type` from
`applicatdion/javascript` to `module`. Then proceed to the next
section.

---

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

## Modify JavaScript File to Import `hyperlinkRecipe.js`

Then in one of your javaScript files (in this case we used `hrb.js`)
setup the code to invoke HRB:

{% include copyHeader.html %}
``` javascript
/* /assets/js/hrb.js - Stub for importing Hyperlink Recipe Baker

  Drop this code into your main JavaScript file

*/

import {processHyperlinkRecipe} from './hyperlinkRecipe.js';

// Webpage may have <div id="hrb_body" defined. If so populate it
window.addEventListener('DOMContentLoaded', (event) => {
    // https://stackoverflow.com/a/42526074/6929343
    var myEle = document.getElementById("hrb_body");
    if(myEle != null){
        processHyperlinkRecipe('hrb_body');
    }
});

/* End of /assets/js/hrb.js */
```

**NOTE:** The javascript file must be called by your toplevel markdown file such
as `_layouts/default.html`, `_layouts/post.html`, etc.

---

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

## Sample Markdown File with HRB Body

The `hrb.html` markdown file is rendered to HTML:

{% include copyHeader.html %}
```html
---
title: Hyperlink Recipe Baker
layout: hrb
---

<!-- The div below is populated by /assets/js/hrb.js -->
<div id="hrb_body">
<p> DUMMY TEXT - Real text set in User Script </p>
</div>

## Usage

1. Right-click on your target address bar and select "copy".
2. Click <kbd>URL (href)</kbd> above to paste.
3. Highlight title from target. Right-click and select "copy".
4. Click <kbd>Name (text)</kbd> above to paste.
5. Highlight excerpt from target. Right-click and select "copy".
6. Click <kbd>Tooltip (title)</kbd> above to paste.
7. Click <kbd>HTML</kbd> or <kbd>Markdown</kbd> to copy Hyperlink into clipboard.
8. Insert the clipboard containing hyperlink into your document.

For more details, including dropping this page into your own
website, see the 
[complete instructions](https://pippim.github.io/hyperlink.html# "Complete guide for using and installing Hyperlink Recipe Baker"){:target="_blank"}.
```

If you have cloned the entire {{ site.title }} website, edit the
hyperlink with your own website address.

---

<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

# Customizing Hyperlink Recipe Baker

"out of the box", HRB will automatically resize `<textarea>`
fields for *URL (href)*, *Recipe HTML* and *Recipe Markdown*. That
is to say, as the text grows, so does the size of the box it is in. 
As the text shrinks, so does the size of the box they it is in.

## Turn Off Auto-Resizing `<textarea>`

At the top of HRB's `/assets/js/hyperlinkRecipe.js` file you see:

{% include copyHeader.html %}
``` javascript
        autoRows:   "0" = No auto resizing
                  > "0" = maximum number of auto-resized rows

*/

var autoRows = '5';     // Override using -data-max="5"
var autoMinRows = "1";  // Override using -data-min="1"
```

If you wish to have manually resize the `<textare>` element,
then set `autoRows = '0'`. If you are interested, here is
the function called to automatically resize `<textarea>`:

{% include copyHeader.html %}
``` javascript
export function setTextAreaRows (textarea) {
    var minRows = Number(autoMinRows)       // autoMinRows must be declared globally above
    var maxRows = Number(autoRows)          // E.G. var autoRows = "5"; sets 5 maximum rows
    // CSS overrides 'data-min = "_"' or 'data-max = "_"'.  Where _ = number of rows.
    if (textarea.dataset.hasOwnProperty('min')) { minRows = Number(textarea.dataset.min) }
    if (textarea.dataset.hasOwnProperty('max')) { maxRows = Number(textarea.dataset.max) }
    var clone = textarea.cloneNode(true);   // Make clone of <textarea> element
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clone.left = String(w * -2) + "px";     // Set clone position left off of screen
    clone.style.width = textarea.offsetWidth.toString() + 'px';
    clone.rows = minRows.toString();        // Set clone # of rows to minimum required
    document.body.appendChild(clone);       // Add clone to webpage but it's out of view
    if (clone.offsetHeight < clone.scrollHeight) {
        for (var rows = minRows; rows <= maxRows; rows++) {
            clone.rows = rows.toString();   // Set new number of rows then test height
            if (clone.offsetHeight >= clone.scrollHeight) { break; }}}
    textarea.rows = clone.rows;             // Update real <textarea>
    clone.remove();                         // Remove cloned <textarea>
}
```

## Override Auto-Resizing `<textarea>` By Element

Notice `maxRows = Number(textarea.dataset.max`. You can have 
`autoRows = "5"` defined which causes scroll bars to
appear when `<textarea>` fields hit maximum of 5 rows.
Using `.dataset.max` though you can override a given
`<textarea>` for fewer or more rows as the maximum. That
is controlled in the CSS:

``` scss
'<td><textarea id="hrRecipeHtml" class="hrInput" cols="45" rows="1"\n' +
' data-min="1" data-max="6"\n' +
'placeholder="HTML Recipe will be built here"></textarea></td></tr>\n'
```

Here the minimum number of rows override is "1" and
the maximum number of rows override is "6".

---

<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a></div>
