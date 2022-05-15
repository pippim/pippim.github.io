---
title: Test New page-header-buttons
layout: test
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>

This is `test.md` rendered as `/test.html`.

It uses `/_layouts/test.html` layout file.

Test changes to `page-header-buttons` without effecting whole website.

After testing, copy to other layouts `default.html`, `hrb.html`, 
`post.html` and  `programs.html`

Note that `page.html` is frozen copy from when project started and
contains Cayman Theme defaults for historical reference purposes.

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id='hdr3'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a></div>
