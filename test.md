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

## Old HTML

```html
<!-- Copy code block contents to system clipboard. From: 
https://www.aleksandrhovhannisyan.com/blog/
how-to-add-a-copy-to-clipboard-button-to-your-jekyll-blog/
-->
<div class="code-header">
    <button class="copy-code-button" title="Copy code to clipboard"
            aria-label="Copy code to clipboard"></button>
</div>
```

## Old CSS

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

## New JavaScript on Author's Website

``` js
import { THEME_KEY, Themes, copyToClipboardButtonStrings } from './constants.mjs';
import ThemeToggle from './components/ThemeToggle/index.mjs';

const themeToggleElement = document.getElementById('theme-toggle');
const cachedTheme = localStorage.getItem(THEME_KEY);
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Themes.DARK : Themes.LIGHT;

// eslint-disable-next-line no-unused-vars
const themeToggle = new ThemeToggle({
  toggleElement: themeToggleElement,
  initialTheme: cachedTheme ?? preferredTheme,
  setTheme: (theme) => {
    document.documentElement.dataset[THEME_KEY] = theme;
    themeToggleElement.setAttribute('aria-pressed', theme === Themes.DARK);
  },
  setCachedTheme: (theme) => localStorage.setItem(THEME_KEY, theme),
  themes: {
    [Themes.LIGHT]: Themes.DARK,
    [Themes.DARK]: Themes.LIGHT,
  },
});

const copyableCodeBlocks = document.querySelectorAll('code[data-copyable="true"]');
copyableCodeBlocks.forEach((codeBlock) => {
  const code = codeBlock.innerText;

  const copyCodeButton = document.createElement('button');
  copyCodeButton.className = 'copy-code-button fs-sm';
  copyCodeButton.innerText = copyToClipboardButtonStrings.default;
  copyCodeButton.setAttribute('aria-label', copyToClipboardButtonStrings.ariaLabel);
  copyCodeButton.type = 'button';
  codeBlock.parentElement.append(copyCodeButton);

  // Accessible alert whose inner text changes when we copy.
  const copiedAlert = document.createElement('span');
  copiedAlert.setAttribute('role', 'alert');
  copiedAlert.classList.add('screen-reader-only');
  codeBlock.parentElement.append(copiedAlert);

  copyCodeButton.addEventListener('click', () => {
    window.navigator.clipboard.writeText(code);
    copyCodeButton.classList.add('copied');
    copyCodeButton.innerText = copyToClipboardButtonStrings.copied;
    copiedAlert.innerText = copyToClipboardButtonStrings.copied;

    setTimeout(() => {
      copyCodeButton.classList.remove('copied');
      copyCodeButton.innerText = copyToClipboardButtonStrings.default;
      copiedAlert.innerText = '';
    }, 2000);
  });
});
```

## Author's new CSS

```css
/* stylelint-disable no-descending-specificity */
@import "../functions";
@import "../mixins";

/* VS Code Dark Plus theme: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-vsc-dark-plus.css */

$code-block-padding: spacing(5);

pre[class*="language-"] {
  background: var(--color-code-background);
  box-shadow: var(--shadow-code-block);
  color: var(--color-code-text);
  position: relative;

  @include full-bleed;
  @include tablet {
    border-radius: spacing(-2);
  }

  &:hover {
    .copy-code-button {
      opacity: 1;
    }
  }

  code {
    padding: $code-block-padding;
    text-align: start;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    tab-size: 2;
    overflow-x: auto;
    display: block;

    &[data-file] {
      padding-top: calc(#{$code-block-padding} + 3em);

      // File name
      &::before {
        content: "Filename: " attr(data-file);
        position: absolute;
        top: 0;
        left: 0;
        color: var(--color-code-text);
        word-break: break-all;
        padding: $code-block-padding $code-block-padding 0;
        @include font-family("title");
        @include font-weight("title", "bold");
        @include font-size("sm");
      }
    }
  }

  .namespace {
    opacity: 0.7;
  }

  &::selection,
  & *::selection {
    text-shadow: none;
    color: unset;
    background: var(--color-code-selection);
  }
}

.token {
  &:is(.doctype, .doctype-tag) {
    .name {
      color: var(--color-code-attribute);
    }
  }

  &.comment {
    margin: 0;
  }

  &:is(.comment, .prolog) {
    color: var(--color-code-comment);
  }

  &.number {
    color: var(--color-code-constant);
  }

  &.script {
    color: var(--color-code-text);
  }

  &.punctuation,
  &.cdata {
    color: var(--color-code-punctuation);
  }

  /* stylelint-disable-next-line max-line-length */
  &:is(.keyword, .tag, .boolean, .constant, .inserted, .operator.arrow, .key.atrule, .rule, .keyword.module, .keyword.control-flow, .entity, .important, .punctuation.interpolation-punctuation, .doctype, .doctype-tag, .directive-hash),
  &.atrule .url {
    color: var(--color-code-keyword);
  }

  &:is(.selector, .string, .char, .builtin, .deleted, .regex, .attr-value),
  &.attr-value &.punctuation {
    color: var(--color-code-string);
  }

  &:is(.operator, .entity, .function),
  &.atrule &.url &.punctuation,
  &.attr-value &.punctuation.attr-equals,
  &.function &.maybe-class-name {
    color: var(--color-code-text);
  }

  &:is(.attr-name, .constant, .console, .property, .variable),
  &.imports &.maybe-class-name,
  &.exports &.maybe-class-name {
    color: var(--color-code-attribute);
  }

  &.italic {
    font-style: italic;
  }
}

/* Language Specific */

pre[class*="language-css"],
pre[class*="language-scss"],
pre[class*="language-sass"] {
  .token.selector {
    color: var(--color-code-selector);
  }
}

pre[class*="language-bash"] {
  .token:not(.comment) {
    color: var(--color-code-text) !important;
  }
}

.copy-code-button {
  opacity: 0;
  position: absolute;
  right: $code-block-padding;
  top: $code-block-padding;
  display: none;
  color: var(--color-code-text);
  background-color: var(--color-code-overlay-1);
  padding: spacing(-2) spacing(0);
  border-radius: spacing(-3);

  &:is(.copied, :focus) {
    opacity: 1;
  }

  &:is(.copied, :hover) {
    color: black;
    background-color: var(--color-code-overlay-2);
  }

  @include tablet {
    display: unset;
  }
}
```


<style>
.rouge-code-block {
    position: relative;
    margin: 5px;
    /* padding:2rem .5rem .5rem .5rem; */
}
.copy-rouge-button{
    position: absolute;
    color: red;
    display: none;
    top: 2rem;
    right: 1rem;
}

/* From: https://stackoverflow.com/a/2776136/6929343 */
.rouge-code-block:hover .copy-rouge-button { display: block; }

</style>

<script>
const copyButtonLabel = "Copy Code";

// You can use a class selector instead if available.
//let blocks = document.querySelectorAll("pre")
//let blocks = document.getElementsByClassName("highlighter-rouge")
//let blocks = document.getElementsByClassName("highlight")
//let blocks = document.querySelectorAll("pre.highlight")
let blocks = document.querySelectorAll("div.highlight")
console.log("blocks.length:", blocks.length)

//for(var ndxRouge=0; ndxRouge<blocks.length; ndxRouge++) {
//    block = blocks[ndxRouge]
blocks.forEach((block) => {
    // only add button if browser supports Clipboard API
    if (navigator.clipboard) {
        block.classList.add("rouge-code-block")
        console.log("Adding copyRougeButton")
        let copyRougeButton = document.createElement("button")
        copyRougeButton.classList.add("copy-rouge-button")
        copyRougeButton.innerText = copyButtonLabel
        copyRougeButton.setAttribute('title', 'Copy code to clipboard')
        copyRougeButton.addEventListener("click", copyRougeCode)
        block.appendChild(copyRougeButton)
    }
});
//}
 
async function copyRougeCode(event) {
    const button = event.srcElement
    const pre = button.parentElement
    let code = pre.querySelector("code")
    let text = code.innerText
    await navigator.clipboard.writeText(text)

    button.innerText = "Code Copied"
    button.style.color = "green"
    setTimeout(()=> {
        button.innerText = copyButtonLabel
        button.style.color = "red"
    },1000)
}
</script>

---

<a id='hdr3'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Override buttons

Use these buttons to force screen size 

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a></div>
