---
title: Test New page-header-buttons and New page-header-hamburger menu
layout: test
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>

# Introduction

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

# Copy code

https://github.com/AleksandrHovhannisyan/aleksandrhovhannisyan.com/issues/35

## Old CSS

{% include copyHeader.html %}
```css
// Copy code block contents to clipboard
// See: _includes/copyHeader.html for credit
.code-header {
    display: flex;
    justify-content: flex-end;
}

.copy-code-button {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: 4px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 4px 8px;

    &::before {
        content: "Copy";
    }

    &::after {
        content: "📋";
        display: block;
    }

    // This class will be toggled via JavaScript
    &.copied {
        &::before { content: "Copied!"; }
        &::after { content: "✔️"; }
    }
}
```

## Old Javascript

{% include copyHeader.html %}
``` js
// Copy code block contents to clipboard. 
// See _includes/copyHeader.html for credit

// This assumes that you're using Rouge; if not, update the selector
const codeBlocks = document.querySelectorAll('.code-header + .highlighter-rouge');
const copyCodeButtons = document.querySelectorAll('.copy-code-button');

copyCodeButtons.forEach((copyCodeButton, index) => {
  const code = codeBlocks[index].innerText;

  copyCodeButton.addEventListener('click', () => {
    // Copy the code to the user's clipboard
    window.navigator.clipboard.writeText(code);

    // Update the button text visually
    /* NEW CODE published May 23, 2022:
        const { innerText: originalText } = copyCodeButton;
        copyCodeButton.innerText = 'Copied!';
    */
    // (Optional) Toggle a class for styling the button
    copyCodeButton.classList.add('copied');

    // After 2 seconds, reset the button to its initial UI
    setTimeout(() => {
      /* NEW CODE published May 23, 2022:
          copyCodeButton.innerText = originalText;
      */
      copyCodeButton.classList.remove('copied');
    }, 2000);
  });
});
```

---

<a id='hdr3'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Override buttons

Use these buttons to force screen size 

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a></div>
