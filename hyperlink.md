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

Below is the Hyperlink Recipe Baker which you can easily drop into your own webpage.

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

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# Installing Hyperlink Recipe Builder on your own website

The easiest way is highlight the code in the repo and paste into a new
file in your website.

Follow these steps:

- Go to: the GitHub Repository
- <kbd>Ctrl</kbd> + <kbd>A</kbd> to select all text
- <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy all text to clipboard
- Go to your own website repo and create a new file
- <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste text from clipboard
- Save the new file

Voila! You have just installed `mt` to your home directory.

Now add it to your GitHub Pages. E.G. `/assets/js/hyerlinkRecipe.js`

Then on your webpage markdown file insert the following:

``` html
<div id="hrb_body">
<p> DUMMY TEXT - Real text set in User Script</p>
</div>
```

Then add the javaScript hooks:

``` javascript
/* NOTE: <script type="module" replaces the optional type="application/javascript"  

Top level (E.G. /_layouts/default.html) must contain a javascript file:

    <script type="module" src="/assets/js/theCookieMachine.js" ></script>

That JavaScript file imports the source:
*/
    // imported functions.  Parent needs <script type="module"...
    // See: /_layouts/program.html, etc.
    import {processHyperlinkRecipe} from './hyperlinkRecipe.js';
    
    // Webpage may have <div id="hrb_body" defined. If so populate it
    document.addEventListener('DOMContentLoaded', function() {
        // https://stackoverflow.com/a/42526074/6929343
        var myEle = document.getElementById("hrb_body");
        if(myEle){
            processHyperlinkRecipe('hrb_body');
        }
    }, false);
```

---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a></div>
