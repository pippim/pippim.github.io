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

<!-- The div below is populated by /assets/js/theCookieMachine.js -->
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

# Installing Hyperlink Recipe Builder on your own website

The easiest way is highlight the code in the the GitHub Repository 
and paste into a new file in your website.

Follow these steps:

- Go to the [repo](https://raw.githubusercontent.com/pippim/hrb/main/hyperlinkRecipe.js "Pippim Hyperlink Recipe Baker GitHub Repository"){:target="_blank"} 
- <kbd>Ctrl</kbd> + <kbd>A</kbd> to select all text
- <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy all text to clipboard
- Go to your own website repo and create a new file called `/assets/js/hyperlinkRecipe.js`
- <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste text from clipboard
- Save the new file

On one of your webpage markdown files insert the following:

``` html
<!-- The div below is populated by /assets/js/main.js -->
<div id="hrb_body">
<p> DUMMY TEXT - Real text set in User Script</p>
</div>
```

Then in one of your javaScript files (in this case we used `main.js` enter:

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

**NOTE:** The javascript file must be called by your toplevel markdown file such
as `_layouts/default.html`, `_layouts/post.html`, etc.

## CSS

In your `/assets/css/style.scss` file (or whatever it is named), add the following:

``` scss
#hrb_body {
    border: .3rem solid;  // let color default to text color
}
```

You can add more styling into your main CSS file if you like but, keep in mind
there is a lot of CSS styling done in `hyperlinkRecipe.js`

Above is optional if you would like a border around the Hyperlink Recipe Builder.


---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a></div>
