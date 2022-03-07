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
<p> DUMMY TEXT - Real text set in User Script </p>
</div>

<!-- NOTE: <script type="module" replaces the optional type="application/javascript"  

Top level (E.G. /_layouts/default.html) must contain a javascript file:

    <script type="module" src="/assets/js/theCookieMachine.js" ></script>

That JavaScript file imports the source:

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
-->

1. Right-click on your target address bar and select "copy".
2. Click <kbd>URL (href)</kbd> above to paste.
3. Highlight title from target. Right-click and select "copy".
4. Click <kbd>Name (text)</kbd> above to paste.
5. Highlight excerpt from target. Right-click and select "copy".
6. Click <kbd>Tooltip (title)</kbd> above to paste.
7. Click <kbd>HTML</kbd> or <kbd>Markdown</kbd> to copy Hyperlink into clipboard.
8. Insert the clipboard containing hyperlink into your document.

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

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

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a></div>
