---
title: test-search.js - New close button
layout: test
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

This is `/test.md` rendered as `/test.html`.

It uses `/_layouts/test.html` layout file.

It uses `/assets/js/test-search.js` instead of `search.js`.

Test changes to `page-header-buttons` via include `test-page-header.html`.
Test changes to `test-search.js` without effecting whole website.

After testing, copy code changes to other layouts `default.html`, `hrb.html`, 
`post.html` and  `programs.html`

Note that `_layouts/page.html` is frozen copy from when project started and
contains Cayman Theme defaults for historical reference purposes.

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

# Setting Colors

In `_sass` directory are:

```shell
-rw-rw-r--  1 rick rick 7056 Nov  3  2022 jekyll-theme-cayman.scss
-rw-rw-r--  1 rick rick 4909 Oct 18  2022 rouge-github-gruvbox.scss
-rw-rw-r--  1 rick rick 3998 Oct 17  2022 rouge-github-monokai-sublime.scss
-rw-rw-r--  1 rick rick 3297 Oct 19  2022 rouge-github-original.scss
-rw-rw-r--  1 rick rick 4909 Oct 18  2022 rouge-github.scss
-rw-rw-r--  1 rick rick 3689 Oct 16  2022 rouge-github-virtua-creative.scss
-rw-rw-r--  1 rick rick  105 Dec  5  2021 toc.scss

```

For cayman theme the default rouge color is a bluish #567482
that appears washed out on chocolate background. 

## `/assets/css/style.scss`

Yellow Sun / Black Moon in `/assets/css/style.scss`:

```css

/* Color Scheme Picker Button in page header */
.color-scheme-button {
    // button rotates when clicked see tcm-common-code.js
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    left: 0;
    margin-left: .3rem;
    background: transparent;
    border: none;
    outline: none;
    background-repeat: no-repeat;
    background-size: cover;
    transition: transform 0.3s;

    //@include large  { height: 44px; width: 44px; }
    // @include medium { height: 36px; width: 36px; }
    //@include medium { height: 42px; width: 42px; }
    //@include small  { height: 42px; width: 42px; }
    height: 44px;
    width: 44px;

    &:hover {
        filter: brightness(150%);
    }
}

.rotate-button {
    // Toggle this class on/off color-scheme-button when clicked
    transform: rotate(180deg);
}
```

## Javascript 

### `_includes/tcm-common-code.js`

```javascript

/*  Get all .color-scheme-button class instances `/_layouts/default.html` has
    .color-scheme-button in two different HTML places.

    Defined in `/_includes/getRootColors.js`:

        currentColorScheme  // "colorSchemeCayman" or "colorSchemeDark"
        imageColorSchemeCayman =
            "{{ site.url }}/assets/img/icons/color_scheme_cayman.png"
        imageColorSchemeDark =
            "{{ site.url }}/assets/img/icons/color_scheme_dark.png"

*/

var cspButtonClasses = document.getElementsByClassName("color-scheme-button")

var cspButtonClick = function() {
    // Color Scheme Picker button was clicked on one of page header <div>s
    this.classList.toggle('rotate-button')  // Add/remove rotate image in button
    if (currentColorScheme == "colorSchemeCayman") {
        currentColorScheme = "colorSchemeDark"
        setColorScheme(colorSchemeDark)
    }
    else {
        currentColorScheme = "colorSchemeCayman"
        setColorScheme(colorSchemeCayman)
    }
    localStorage.setItem("colorScheme", currentColorScheme)
    // Wait 300 ms for transition to finish then change image
    setTimeout(function(){
        setColorSchemeButtonImage(currentColorScheme)
    }, 300)
}

for (var ndx = 0; ndx < cspButtonClasses.length; ndx++) {
    cspButtonClasses[ndx].addEventListener('click', cspButtonClick, false)
}

function setColorSchemeButtonImage(schemeName) {
    // Changing foreground image problematic. Use background image instead
    for (var ndx = 0; ndx < cspButtonClasses.length; ndx++) {
        var elm = cspButtonClasses[ndx]
        if (schemeName == "colorSchemeCayman") {
            elm.style.backgroundImage = "url('" + imageColorSchemeDark + "')"
            elm.title = "Switch {{ site.title }} Website to color scheme Dark"
        }
        else {
            elm.style.backgroundImage = "url('" + imageColorSchemeCayman + "')"
            elm.title = "Switch {{ site.title }} Website to color scheme Cayman"
        }
    }
}

setColorSchemeButtonImage(currentColorScheme)

// Get all .tcm-button class instances `/_layouts/default.html` has
// .tcm-button in two different place.
var tcmButtonClasses = document.getElementsByClassName("tcm-button");  // New class

var tcmButtonClick = function() {
    // TCM button was clicked on one of page header <div>s
    document.querySelector('#tcm_window').style.cssText = `
        display: flex;
        flex-direction: column;
    `;
    // Make tcm-button class invisible
    for (var ndx = 0; ndx < tcmButtonClasses.length; ndx++) {
        tcmButtonClasses[ndx].style.cssText = `
            opacity: 0.0;
            background: transparent;
            background-image: none;
            border: none;
        `;
    }
};

for (var ndx = 0; ndx < tcmButtonClasses.length; ndx++) {
    tcmButtonClasses[ndx].addEventListener('click', tcmButtonClick, false);
}
```

### `_includes/getRootColors.js`

```javascript

var currentColorScheme  // "colorSchemeCayman" or "colorSchemeDark"
// {{ site.url }} is required when File Save As used for off-line copy
var imageColorSchemeCayman =
        "{{ site.url }}/assets/img/icons/color_scheme_cayman.png"
var imageColorSchemeDark =
        "{{ site.url }}/assets/img/icons/color_scheme_dark.png"

function getCurrentColors() {
    /*  Local storage key "colorScheme" contains our scheme name.
        If it doesn't exist use "colorSchemeCayman" and save to new key.
    */
    currentColorScheme = localStorage.getItem('colorScheme')
    if (currentColorScheme == null) {
        localStorage.setItem("colorScheme", "colorSchemeCayman")
        currentColorScheme = "colorSchemeCayman"
    }
    return (extractRootColors(currentColorScheme))
}

function extractRootColors(schemeName) {
    // Set passed "colorScheme" of "Cayman" or "Dark"
    var scheme = window[schemeName]  // Get scheme object from name
    var root = ""
    // console.log("/assets/js/setRootColors.js color scheme:", scheme.name)
    for (const key of Object.keys(scheme)) {
        if (!(key.startsWith("--"))) continue  // Ignore "name"
        root += "    " + key + ": " + scheme[key] + ";\n"
    }
    return root
}

getCurrentColors()  // We are done now. Rest of functions are optional

/* Optional functions to control root variables */
const browser = getBrowser()
const environment = navigator.oscpu + " " + browser.name + " " +
                    browser.version

function getBrowser() {
    // From: https://stackoverflow.com/a/16938481/6929343
    var ua = navigator.userAgent, tem
    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || []
        return {name: 'IE', version: (tem[1] || '') }
    }
    if (M[1]==='Chrome') {
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if (tem!=null) return { name:'Opera', version:tem[1] }
    }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?']
    if ((tem=ua.match(/version\/(\d+)/i))!=null) M.splice(1,1,tem[1])
    return {
        name: M[0],
        version: M[1]
    }
 }

function getColorCode(scheme, key) {
    //const rootElm = document.querySelector(':root')
    //const rs = getComputedStyle(rootElm)
    const value = scheme[key]
    return value
}

function setColorCode(scheme, key) {
    const value = scheme[key]
    if (value === null) return
    const rootElm = document.querySelector(':root')
    rootElm.style.setProperty(key, value);
}

function setColorScheme(scheme) {
    // Set dark theme
    //console.log("/_includes/getRootColors.js setColorScheme():", scheme.name)
    currentColorScheme = scheme.name
    //localStorage.setItem("colorScheme", "colorSchemeDark")
    // Above is breaking system???
    for (const key of Object.keys(scheme)) {
        if (!(key.startsWith("--"))) continue  // Ignore "name"
        setColorCode(scheme, key)
    }
}

```

# Color Codes - `rouge-github-monokai-sublime.scss`

<h1 style="background-color:#999999;">.highlight .gh { color: #999999; }</h1>
<h1 style="background-color:#f6aa11;">.highlight .sr { color: #f6aa11; }</h1>
<h1 style="background-color:#888888;">.highlight .go { color: #888888; }</h1>
<h1 style="background-color:#555555;">.highlight .gp { color: #555555; }</h1>
<h1 style="background-color:#aaaaaa;">.highlight .gu { color: #aaaaaa; }</h1>
<h1 style="background-color:#f6aa11;">.highlight .nb { color: #f6aa11; }</h1>
<h1 style="background-color:#5F9EA0;">.highlight .cm { color: #5F9EA0; }</h1>
<h1 style="background-color:#960050;">.highlight .err{ color: #960050; }</h1>
<h1 style="background-color:#49483e;">.highlight .gd { color: #49483e; }</h1>
<h1 style="background-color:#66d9ef;">.highlight .kc { color: #66d9ef; }</h1>
<h1 style="background-color:#ae81ff;">.highlight .mf { color: #ae81ff; }</h1>
<h1 style="background-color:#e6db74;">.highlight .sd { color: #e6db74; }</h1>
<h1 style="background-color:#a6e22e;">.highlight .fm { color: #a6e22e; }</h1>
<h1 style="background-color:#00cdcd;">.highlight .vc { color: #00cdcd; }</h1>
<h1 style="background-color:#ffffff;">.highlight .w  { color: #ffffff; }</h1>
<h1 style="background-color:#f92672;">.highlight .ow { color: #f92672; }</h1>
<h1 style="background-color:#fbf1c7;">.highlight .pi { color: #fbf1c7; }</h1>
<h1 style="background-color:#272822;">ALL { background-color: #272822; }</h1>
<h1 style="background-color:#75715e;">dimgrey => '#75715e'</h1>

# Test Fetch API

## Rouge List of Tokens

The table below is from the 
[Rouge Ruby List of Tokens ⧉ 🔗](https://github.com/rouge-ruby/rouge/wiki/List-of-tokens 
"CSS class names used by Rouge in Jekyll Github Pages"){:target="_blank"}.

| ***Token name***            | ***Token shortname*** | ***Description***                                                                |
|-----------------------------|-----------------------|----------------------------------------------------------------------------------|
| Text                        |                       | Any type of text data                                                            |
| Text.Whitespace             | w                     | Specially highlighted whitespace                                                 |
| Error                       | err                   | Lexer errors                                                                     |
| Escape                      | esc                   | Escape ***(New)***                                                               |
| Other                       | x                     | Token for data not matched by a parser (e.g. HTML markup in PHP code)            |
| Keyword                     | k                     | Any keyword                                                                      |
| Keyword.Constant            | kc                    | Keywords that are constants                                                      |
| Keyword.Declaration         | kd                    | Keywords used for variable declaration (e.g. var in javascript)                  |
| Keyword.Namespace           | kn                    | Keywords used for namespace declarations                                         |
| Keyword.Pseudo              | kp                    | Keywords that aren't really keywords                                             |
| Keyword.Reserved            | kr                    | Keywords which are reserved (such as end in Ruby)                                |
| Keyword.Type                | kt                    | Keywords which refer to a type id (such as int in C)                             |
| Name                        | n                     | Variable/function names                                                          |
| Name.Attribute              | na                    | Attributes (in HTML for instance)                                                |
| Name.Builtin                | nb                    | Builtin names which are available in the global namespace                        |
| Name.Builtin.Pseudo         | bp                    | Builtin names that are implicit (such as self in Ruby)                           |
| Name.Class                  | nc                    | For class declaration                                                            |
| Name.Constant               | no                    | For constants                                                                    |
| Name.Decorator              | nd                    | For decorators in languages such as Python or Java                               |
| Name.Entity                 | ni                    | Token for entities such as &nbsp; in HTML                                        |
| Name.Exception              | ne                    | Exceptions and errors (e.g. ArgumentError in Ruby)                               |
| Name.Function               | nf                    | Function names                                                                   |
| Name.Property               | py                    | Token for properties                                                             |
| Name.Label                  | nl                    | For label names                                                                  |
| Name.Namespace              | nn                    | Token for namespaces                                                             |
| Name.Other                  | nx                    | For other names                                                                  |
| Name.Tag                    | nt                    | Tag mainly for markup such as XML or HTML                                        |
| Name.Variable               | nv                    | Token for variables                                                              |
| Name.Variable.Class         | vc                    | Token for class variables (e.g. @@var in Ruby)                                   |
| Name.Variable.Global        | vg                    | For global variables (such as $LOAD_PATH in Ruby)                                |
| Name.Variable.Instance      | vi                    | Token for instance variables (such as @var in Ruby)                              |
| Name.Variable.Magic         | vm                    | Token for magic variables ***(New)***                                            |
| Literal                     | l                     | Any literal (if not further defined)                                             |
| Literal.Date                | ld                    | Date literals                                                                    |
| Literal.String              | s                     | String literals                                                                  |
| Literal.String.Affix        | sa                    | String Affix ***(New)***                                                         |
| Literal.String.Backtick     | sb                    | String enclosed in backticks                                                     |
| Literal.String.Char         | sc                    | Token type for single characters                                                 |
| Literal.String.Delimiter    | dl                    | String Delimiter ***(New)***                                                     |
| Literal.String.Doc          | sd                    | Documentation strings (such as in Python)                                        |
| Literal.String.Double       | s2                    | Double quoted strings                                                            |
| Literal.String.Escape       | se                    | Escaped sequences in strings                                                     |
| Literal.String.Heredoc      | sh                    | For "heredoc" strings (e.g. in Ruby)                                             |
| Literal.String.Interpol     | si                    | For interpolate part in strings (e.g. in Ruby)                                   |
| Literal.String.Other        | sx                    | Token type for any other strings (for example %q{foo} string constructs in Ruby) |
| Literal.String.Regex        | sr                    | Regular expressions literals                                                     |
| Literal.String.Single       | s1                    | Single quoted strings                                                            |
| Literal.String.Symbol       | ss                    | Symbols (such as :foo in Ruby)                                                   |
| Literal.Number              | m                     | Any number literal (if not further defined)                                      |
| Literal.Number.Float        | mf                    | Float numbers                                                                    |
| Literal.Number.Hex          | mh                    | Hexadecimal numbers                                                              |
| Literal.Number.Integer      | mi                    | Integer literals                                                                 |
| Literal.Number.Integer.Long | il                    | Long integer literals                                                            |
| Literal.Number.Oct          | mo                    | Octal literals                                                                   |
| Literal.Number.Hex          | mx                    | Hexadecimal literals                                                             |
| Literal.Number.Bin          | mb                    | Binary literals                                                                  |
| Operator                    | o                     | Operators (commonly +, -, /, *)                                                  |
| Operator.Word               | ow                    | Word operators (e.g. and)                                                        |
| Punctuation                 | p                     | Punctuation which is not an operator                                             |
| Punctuation.Indicator       | pi                    | Punctuation indicator ***(New)***                                                |
| Comment                     | c                     | Single line comments                                                             |
| Comment.Hashbang            | ch                    | Hashbang comment ***(New)***                                                     |
| Comment.Doc                 | cd                    | Doc comment ***(New)***                                                          |
| Comment.Multiline           | cm                    | Multiline comments                                                               |
| Comment.Preproc             | cp                    | Preprocessor comments such as <% %> in ERb                                       |
| Comment.PreprocFile         | cpf                   | Preprocessor comments file ***(New)***                                           |
| Comment.Single              | c1                    | Comments that end at the end of the line                                         |
| Comment.Special             | cs                    | Special data in comments such as @license in Javadoc                             |
| Generic                     | g                     | Unstyled token                                                                   |
| Generic.Deleted             | gd                    | Token value as deleted                                                           |
| Generic.Emph                | ge                    | Token value as emphasized                                                        |
| Generic.Error               | gr                    | Token value as an error message                                                  |
| Generic.Heading             | gh                    | Token value as a headline                                                        |
| Generic.Inserted            | gi                    | Token value as inserted                                                          |
| Generic.Output              | go                    | Marked as a program output                                                       |
| Generic.Prompt              | gp                    | Marked as a command prompt                                                       |
| Generic.Strong              | gs                    | Mark the token value as bold (for rst lexer)                                     |
| Generic.Subheading          | gu                    | Marked as a sub-headline                                                         |
| Generic.Traceback           | gt                    | Mark the token as a part of an error traceback                                   |
| Generic.Lineno              | gl                    | Line numbers                                                                     |


Code provided by tech support on Github.
[Rouge `token.rb` 🔗](https://github.com/rouge-ruby/rouge/blob/master/lib/rouge/token.rb#L75 
"CSS class names used by Rouge in Jekyll Github Pages"){:target="_blank"}

<script>
async function myFetch() {
    let response = await fetch('https://github.com/rouge-ruby/rouge/wiki/List-of-tokens');
    console.log("response 1:", response)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("response 2:", response)
    
    let text = await response.text(); // await ensures variable has fulfilled Promise
    console.log(text);
}

myFetch()
// Cross-Origin Request Blocked: The Same Origin Policy disallows reading the 
// remote resource at https://github.com/rouge-ruby/rouge/wiki/List-of-tokens. 
// (Reason: CORS header “Access-Control-Allow-Origin” missing).

</script>

# Rouge Legend

``` css
/**
 * From: https://code.gov.cz/gov-cz/about/-/blob/a1cb43f3effc4de4d270f8cca881cbf8f3ddc064/_sass/_syntax-highlighting.scss
 * Syntax highlighting styles
 */
.highlight {
    background: #fff;
    @extend %vertical-rhythm;

    .highlighter-rouge & {
      background: #eef;
    }

    .c     { color: #998; font-style: italic } // Comment
    .err   { color: #a61717; background-color: #e3d2d2 } // Error
    .k     { font-weight: bold } // Keyword
    .o     { font-weight: bold } // Operator
    .cm    { color: #998; font-style: italic } // Comment.Multiline
    .cp    { color: #999; font-weight: bold } // Comment.Preproc
    .c1    { color: #998; font-style: italic } // Comment.Single
    .cs    { color: #999; font-weight: bold; font-style: italic } // Comment.Special
    .gd    { color: #000; background-color: #fdd } // Generic.Deleted
    .gd .x { color: #000; background-color: #faa } // Generic.Deleted.Specific
    .ge    { font-style: italic } // Generic.Emph
    .gr    { color: #a00 } // Generic.Error
    .gh    { color: #999 } // Generic.Heading
    .gi    { color: #000; background-color: #dfd } // Generic.Inserted
    .gi .x { color: #000; background-color: #afa } // Generic.Inserted.Specific
    .go    { color: #888 } // Generic.Output
    .gp    { color: #555 } // Generic.Prompt
    .gs    { font-weight: bold } // Generic.Strong
    .gu    { color: #aaa } // Generic.Subheading
    .gt    { color: #a00 } // Generic.Traceback
    .kc    { font-weight: bold } // Keyword.Constant
    .kd    { font-weight: bold } // Keyword.Declaration
    .kp    { font-weight: bold } // Keyword.Pseudo
    .kr    { font-weight: bold } // Keyword.Reserved
    .kt    { color: #458; font-weight: bold } // Keyword.Type
    .m     { color: #099 } // Literal.Number
    .s     { color: #d14 } // Literal.String
    .na    { color: #008080 } // Name.Attribute
    .nb    { color: #0086B3 } // Name.Builtin
    .nc    { color: #458; font-weight: bold } // Name.Class
    .no    { color: #008080 } // Name.Constant
    .ni    { color: #800080 } // Name.Entity
    .ne    { color: #900; font-weight: bold } // Name.Exception
    .nf    { color: #900; font-weight: bold } // Name.Function
    .nn    { color: #555 } // Name.Namespace
    .nt    { color: #000080 } // Name.Tag
    .nv    { color: #008080 } // Name.Variable
    .ow    { font-weight: bold } // Operator.Word
    .w     { color: #bbb } // Text.Whitespace
    .mf    { color: #099 } // Literal.Number.Float
    .mh    { color: #099 } // Literal.Number.Hex
    .mi    { color: #099 } // Literal.Number.Integer
    .mo    { color: #099 } // Literal.Number.Oct
    .sb    { color: #d14 } // Literal.String.Backtick
    .sc    { color: #d14 } // Literal.String.Char
    .sd    { color: #d14 } // Literal.String.Doc
    .s2    { color: #d14 } // Literal.String.Double
    .se    { color: #d14 } // Literal.String.Escape
    .sh    { color: #d14 } // Literal.String.Heredoc
    .si    { color: #d14 } // Literal.String.Interpol
    .sx    { color: #d14 } // Literal.String.Other
    .sr    { color: #009926 } // Literal.String.Regex
    .s1    { color: #d14 } // Literal.String.Single
    .ss    { color: #990073 } // Literal.String.Symbol
    .bp    { color: #999 } // Name.Builtin.Pseudo
    .vc    { color: #008080 } // Name.Variable.Class
    .vg    { color: #008080 } // Name.Variable.Global
    .vi    { color: #008080 } // Name.Variable.Instance
    .il    { color: #099 } // Literal.Number.Integer.Long
}
```


## Rouge `_sass/rouge-github.scss`

``` css
/*  https://github.com/daveyarwood/gruvbox-pygments/blob/master/gruvbox.css
    Oct 17/22 copy from rouge-github-gruvbox.scss (backup version)
    https://github.com/rouge-ruby/rouge/blob/master/lib/rouge/token.rb#L75
    Note we use Num as an alias for Literal::Number and Str as an alias for Literal::String.
*/
.highlight table td { padding: 5px; }
.highlight table pre { margin: 0; }

.highlight .hll { background-color: #ffffcc }
.highlight  { background: #282828; background-color: #282828; color: #ebdbb2; }
.highlight .c { color: #928374; font-style: italic; } /* Comment */
.highlight .err { color: #ebdbb2; } /* Error */
.highlight .esc { color: #ebdbb2; } /* Escape */
.highlight .g { color: #ebdbb2; } /* Generic */
.highlight .k { color: #fe8019; } /* Keyword */
.highlight .l { color: #ebdbb2; } /* Literal */
.highlight .n { color: #ebdbb2; } /* Name */
.highlight .o { color: #fe8019; } /* Operator */
.highlight .x { color: #ebdbb2; } /* Other */
.highlight .p { color: #ebdbb2; } /* Punctuation */
.highlight .ch { color: #928374; font-style: italic; } /* Comment.Hashbang */
.highlight .cm { color: #928374; font-style: italic; } /* Comment.Multiline */
.highlight .cp { color: #8ec07c; } /* Comment.Preproc */
.highlight .c1 { color: #928374; font-style: italic; } /* Comment.Single */
.highlight .cs { color: #928374; font-style: italic; } /* Comment.Special */
.highlight .gd { color: #282828; background-color: #fb4934 } /* Generic.Deleted */
.highlight .ge { color: #83a598; text-decoration: underline; } /* Generic.Emph */
.highlight .gr { color: #ebdbb2; font-weight: bold; background-color: #fb4934 } /* Generic.Error */
.highlight .gh { color: #b8bb26; font-weight: bold; } /* Generic.Heading */
.highlight .gi { color: #282828; background-color: #b8bb26 } /* Generic.Inserted */
.highlight .go { color: #504945; } /* Generic.Output */
.highlight .gp { color: #ebdbb2; } /* Generic.Prompt */
.highlight .gs { color: #ebdbb2; } /* Generic.Strong */
.highlight .gu { color: #b8bb26; font-weight: bold; } /* Generic.Subheading */
.highlight .gt { color: #ebdbb2; font-weight: bold; background-color: #fb4934 } /* Generic.Traceback */
.highlight .kc { color: #fe8019; } /* Keyword.Constant */
.highlight .kd { color: #fe8019; } /* Keyword.Declaration */
.highlight .kn { color: #fe8019; } /* Keyword.Namespace */
.highlight .kp { color: #fe8019; } /* Keyword.Pseudo */
.highlight .kr { color: #fe8019; } /* Keyword.Reserved */
.highlight .kt { color: #fabd2f; } /* Keyword.Type */
.highlight .ld { color: #ebdbb2; } /* Literal.Date */
.highlight .m { color: #d3869b; } /* Literal.Number */
.highlight .s { color: #b8bb26; } /* Literal.String */
.highlight .na { color: #b8bb26; font-weight: bold; } /* Name.Attribute */
.highlight .nb { color: #fabd2f; } /* Name.Builtin */
.highlight .nc { color: #ebdbb2; } /* Name.Class */
.highlight .no { color: #d3869b; } /* Name.Constant */
.highlight .nd { color: #ebdbb2; } /* Name.Decorator */
.highlight .ni { color: #fabd2f; } /* Name.Entity */
.highlight .ne { color: #fb4934; } /* Name.Exception */
.highlight .nf { color: #fabd2f; } /* Name.Function */
.highlight .nl { color: #fb4934; } /* Name.Label */
.highlight .nn { color: #ebdbb2; } /* Name.Namespace */
.highlight .nx { color: #ebdbb2; } /* Name.Other */
.highlight .py { color: #ebdbb2; } /* Name.Property */
.highlight .nt { color: #fb4934; } /* Name.Tag */
.highlight .nv { color: #ebdbb2; } /* Name.Variable */
.highlight .ow { color: #fe8019; } /* Operator.Word */
.highlight .w { color: #ebdbb2; } /* Text.Whitespace */
.highlight .mb { color: #d3869b; } /* Literal.Number.Bin */
.highlight .mf { color: #d3869b; } /* Literal.Number.Float */
.highlight .mh { color: #d3869b; } /* Literal.Number.Hex */
.highlight .mi { color: #d3869b; } /* Literal.Number.Integer */
.highlight .mo { color: #d3869b; } /* Literal.Number.Oct */
.highlight .sb { color: #b8bb26; } /* Literal.String.Backtick */
.highlight .sc { color: #b8bb26; } /* Literal.String.Char */
.highlight .sd { color: #b8bb26; } /* Literal.String.Doc */
.highlight .s2 { color: #b8bb26; } /* Literal.String.Double */
.highlight .se { color: #b8bb26; } /* Literal.String.Escape */
.highlight .sh { color: #b8bb26; } /* Literal.String.Heredoc */
.highlight .si { color: #b8bb26; } /* Literal.String.Interpol */
.highlight .sx { color: #b8bb26; } /* Literal.String.Other */
.highlight .sr { color: #b8bb26; } /* Literal.String.Regex */
.highlight .s1 { color: #b8bb26; } /* Literal.String.Single */
.highlight .ss { color: #83a598; } /* Literal.String.Symbol */
.highlight .bp { color: #fabd2f; } /* Name.Builtin.Pseudo */
.highlight .vc { color: #ebdbb2; } /* Name.Variable.Class */
.highlight .vg { color: #ebdbb2; } /* Name.Variable.Global */
.highlight .vi { color: #ebdbb2; } /* Name.Variable.Instance */
.highlight .il { color: #d3869b; } /* Literal.Number.Integer.Long */

/* End of rouge-github-gruvbox.scss */

```

## Rouge `_sass/rouge-github-monokai-sublime.scss`

```css
/*  https://github.com/pages-themes/cayman/blob/master/_sass/rouge-github.scss
    Oct 15/22 copy from rouge-github-monokai-sublime.scss (backup version)
    // = found in original cayman theme
    // missing = found here but not in cayman theme
*/
.highlight table td { padding: 5px; }
.highlight table pre { margin: 0; }
.highlight .gh { color: #999999; } //
.highlight .sr { color: #f6aa11; } //
.highlight .go { color: #888888; } //
.highlight .gp { color: #555555; } //
.highlight .gs {    font-weight: bold; } //
.highlight .gu { color: #aaaaaa; } //
.highlight .nb { color: #f6aa11; } //
.highlight .cm { color: #5F9EA0; font-style: italic; } //
.highlight .cp { color: #5F9EA0; } //
.highlight .c1 { color: #5F9EA0; font-style: italic; } //
.highlight .cs { color: #5F9EA0; font-weight: bold; font-style: italic; } //
.highlight .c  { color: #5F9EA0; font-style: italic; } //
.highlight .ch { color: #5F9EA0; } // missing
.highlight .cd { color: #5F9EA0; font-style: italic; } //
.highlight .cpf{ color: #5F9EA0; } // missing
.highlight .err{ color: #960050; } // background ?
.highlight .gr { color: #960050; } //
.highlight .gt { color: #960050; } //
.highlight .gd { color: #49483e; } // background ?
.highlight .gi { color: #49483e; } //
.highlight .ge { color: #49483e; font-style: italic; } //
.highlight .kc { color: #66d9ef; font-weight: bold; } //
.highlight .kd { color: #66d9ef; font-weight: bold; } //
.highlight .kr { color: #66d9ef; font-weight: bold; } //
.highlight .no { color: #66d9ef; } //
.highlight .kt { color: #66d9ef; font-weight: bold; } //
.highlight .mf { color: #ae81ff; } //
.highlight .mh { color: #ae81ff; } //
.highlight .il { color: #ae81ff; } //
.highlight .mi { color: #ae81ff; } //
.highlight .mo { color: #ae81ff; } //
.highlight .m  { color: #ae81ff; } //
.highlight .mb { color: #ae81ff; } //
.highlight .mx { color: #ae81ff; } //
.highlight .sc { color: #ae81ff; } //
.highlight .se { color: #ae81ff; } //
.highlight .ss { color: #ae81ff; } //
.highlight .sd { color: #e6db74; } //
.highlight .s2 { color: #e6db74; } //
.highlight .sb { color: #e6db74; } //
.highlight .sh { color: #e6db74; } //
.highlight .si { color: #e6db74; } //
.highlight .sx { color: #e6db74; } //
.highlight .s1 { color: #e6db74; } //
.highlight .s  { color: #e6db74; } //
.highlight .sa { color: #e6db74; } // missing
.highlight .dl { color: #e6db74; } // missing
.highlight .na { color: #a6e22e; } //
.highlight .nc { color: #a6e22e; } //
.highlight .nd { color: #a6e22e; font-weight: bold; } //
.highlight .ne { color: #a6e22e; font-weight: bold; } //
.highlight .nf { color: #a6e22e; font-weight: bold; } //
.highlight .fm { color: #a6e22e; } // missing
.highlight .vc { color: #00cdcd; } //
.highlight .nn { color: #00cdcd; } //
.highlight .nl { color: #00cdcd; font-weight: bold; } //
.highlight .ni { color: #00cdcd; font-weight: bold; } //
.highlight .bp { color: #00cdcd; } //
.highlight .vg { color: #00cdcd; } //
.highlight .vi { color: #00cdcd; } //
.highlight .nv { color: #00cdcd; } //
.highlight .vm { color: #00cdcd; } // missing
.highlight .w  { color: #ffffff; } //
.highlight .n  { color: #ffffff; } // missing
.highlight .py { color: #ffffff; } // missing
.highlight .nx { color: #ffffff; } // missing
.highlight .ow { color: #f92672; font-weight: bold; } //
.highlight .nt { color: #f92672; } //
.highlight .k  { color: #f92672; font-weight: bold; } //
.highlight .kv { color: #f92672; font-weight: bold; } //
.highlight .kn { color: #f92672; font-weight: bold; } //
.highlight .kp { color: #f92672; font-weight: bold; } //
.highlight .o  { color: #f92672; font-weight: bold; } //
.highlight .p  { color: #fbf1c7; } // missing
.highlight .pi { color: #fbf1c7; } // missing

.highlight {
  color: #ffffff;
  background-color: #272822;
  border-radius: .5rem;
  /* Oct 15/22 - Following already in Cayman
  margin-bottom: 30px;
  margin-top: 27px;
  margin-left: 0px;
  margin-right: 0px;
  width: 100%; */
}

/* End of rouge-github-monokai-sublime.scss */
```

# Miscellaneous Color Codes

<h1 style="background-color:#1e6bb8;">--body-link-color: #1e6bb8;</h1>
<h1 style="background-color:#e19447;">--body-link-inverted-color: #e19447;</h1>

<h1 style="background-color:#819198;">#819198</h1>
<h1 style="background-color:#f3f6fa;">#f3f6fa</h1>
<h2 style="background-color:#567482;">#567482 bluish color code in rouge plain text</h2>
<h1 style="background-color:#dce6f0;">#dce6f0</h1>
<h1 style="background-color:#e9ebec;">#e9ebec</h1>
<h1 style="background-color:#eff0f1;">#eff0f1</h1>

<h1 style="background-color:#fafbfc;">#fafbfc</h1>
<h1 style="background-color:#c6cbd1;">#c6cbd1</h1>
<h1 style="background-color:#959da5;">#959da5</h1>
<h1 style="background-color:#444d56;">#444d56</h1>
<h1 style="background-color:#e9ebec;">#e9ebec</h1>

# Copy code

This section shows how to copy code inside Rouge to the system clipboard.

The original Author's old code and new code is below. However {{ site.title }}
website had to use a totally new technique.

https://github.com/AleksandrHovhannisyan/aleksandrhovhannisyan.com/issues/35

## Test Single Text Line

```html
<!-- This is a single line of HTML comment -->
```


## Test Two Text Lines

```html
<!-- This is the first line of HTML comment -->
<!-- This is the second line -->
```

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

---

<a id='hdr3'></a>
<div class='hdr-bar'>  <a href='#'>Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Override buttons

Use these buttons to force screen size 

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a></div>
