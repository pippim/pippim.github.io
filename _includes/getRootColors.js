/*  /_includes/getRootColors.js - get Root Colors before:
        /asset/css/style.scss in all /_layouts
        test.md
        tcm-common-code.js (included in theCookieMachine.js)
*/

console.log("Start of /_includes/getRootColors.js")
// Color Schemes - See below for descriptions
var colorSchemeCayman = {
    name: "colorSchemeCayman",
    "--nav-button-bg-color": "#F0FFF0",
    "--nav-button-color": "#159957",
    "--msgq-error-bg-color": "#f44336",
    "--msgq-warning-bg-color": "#ff9800",
    "--msgq-info-bg-color": "#2196F3",
    "--msgq-success-bg-color": "#04AA6D",
    "--msgq-body-bg-color": "#f1f1f1",
    "--msgq-border-color": "#d3d3d3",
    "--header-accent-color": "#FFFF00",
    "--button-focus-color": "#1E90FF",
    "--progress-bar-color": "#008000",
    "--flash-bg-color": "#808080",
    "--boldest-color": "#000000",
    "--link-visited": "#800080",
    "--header-heading-color": "#ffffff",
    "--header-bg-color": "#159957",
    "--header-bg-color-secondary": "#155799",
    "--section-headings-color": "#159957",
    "--body-text-color": "#606c71",
    "--body-bg-color": "#ffffff",
    "--body-link-color": "#1e6bb8",
    "--body-link-inverted-color": "#e19447",
    "--blockquote-text-color": "#819198",
    "--code-bg-color": "#f3f6fa",
    "--code-text-color": "#567482",
    "--border-color": "#dce6f0",
    "--table-border-color": "#e9ebec",
    "--hr-border-color": "#eff0f1",
    "--kbd-background-color": "#fafbfc",
    "--kbd-border-color": "#c6cbd1",
    "--kbd-border-bottom-color": "#959da5",
    "--kbd-box-shadow-color": "#959da5",
    "--kbd-color": "#444d56"
}

var colorSchemeDark = {
    name: "colorSchemeDark",
    "--nav-button-bg-color": "#494b4c",
    "--nav-button-color": "#f9fbfc",
    "--msgq-error-bg-color": "#f44336",
    "--msgq-warning-bg-color": "#ff9800",
    "--msgq-info-bg-color": "#2196F3",
    "--msgq-success-bg-color": "#04AA6D",
    "--msgq-body-bg-color": "#313131",
    "--msgq-border-color": "#434343",
    "--header-accent-color": "#FFFF00",
    "--button-focus-color": "#1E90FF",
    "--progress-bar-color": "#008000",
    "--flash-bg-color": "#808080",
    "--boldest-color": "#ffffff",
    "--link-visited": "#800080",
    "--header-heading-color": "#ffd080",
    "--header-bg-color": "#057937",
    "--header-bg-color-secondary": "#053779",
    "--section-headings-color": "#159957",
    "--body-text-color": "#e0ece1",
    "--body-bg-color": "#101010",
    "--body-link-color": "#5eabf8",
    "--body-link-inverted-color": "#e19447",
    "--blockquote-text-color": "#819198",
    "--code-bg-color": "#13161a",
    "--code-text-color": "#b6b4b2",
    "--border-color": "#4c4640",
    "--table-border-color": "#494b4c",
    "--hr-border-color": "#3f3031",
    "--kbd-background-color": "#2a2b2c",
    "--kbd-border-color": "#c6cbd1",
    "--kbd-border-bottom-color": "#e5ede5",
    "--kbd-box-shadow-color": "#e5ede5",
    "--kbd-color": "#040d06"
}

var currentColorScheme  // "colorSchemeCayman" or "colorSchemeDark"
var imageColorSchemeCayman =
        "{{ site.url }}/assets/img/icons/color_scheme_cayman.png"
var imageColorSchemeDark =
        "{{ site.url }}/assets/img/icons/color_scheme_dark.png"

function getCurrentColors() {
    /*  Local storage key "colorScheme" contains our scheme name.
        If it doesn't exist use "colorSchemeCayman" and save to new key.
    */
    // currentColorScheme = JSON.parse(localStorage.getItem('colorScheme'))
    currentColorScheme = localStorage.getItem('colorScheme')
    // console.log("Reading currentColorScheme:", currentColorScheme)
    if (currentColorScheme == null) {
        // localStorage.setItem("colorScheme", JSON.stringify(colorSchemeCayman))
        localStorage.setItem("colorScheme", "colorSchemeCayman")
        currentColorScheme = "colorSchemeCayman"
        // currentColorScheme = Object.assign( {}, colorSchemeCayman)
        // Shallow object copy - https://stackoverflow.com/a/34294740/6929343
        // console.log("Creating currentColorScheme:", currentColorScheme)
    }
    return (extractRootColors(currentColorScheme))
}

function extractRootColors(schemeName) {
    // Set dark theme
    //var scheme = {[schemeName]}  // Get scheme object from name
    var scheme = window[schemeName]  // Get scheme object from name
    const margin = "    "
    var root = ""
    console.log("/assets/js/setRootColors.js color scheme:", scheme.name)
    for (const key of Object.keys(scheme)) {
        if (!(key.startsWith("--"))) continue  // Ignore "name"
        root += margin + scheme[key]
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

if (environment == "Linux x86_64 Firefox 88") {
    // Set dark theme on development machine
    if (currentColorSchem == "colorSchemeDark") return  // Already set
    console.log("/_includes/getRootColors.js environment:", environment)
    setColorScheme(colorSchemeDark)
    localStorage.setItem("colorScheme", "colorSchemeDark")
}

function getColorCode(scheme, key) {
    const rootElm = document.querySelector(':root')
    const rs = getComputedStyle(rootElm)
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
    console.log("/_includes/getRootColors.js setColorScheme():", scheme.name)
    currentColorScheme = scheme.name
    for (const key of Object.keys(scheme)) {
        if (!(key.startsWith("--"))) continue  // Ignore "name"
        setColorCode(scheme, key)
    }
}

/* Long long comments

:root {
    //  Used by Pippim. Defaults are stored in memory (here). Also created
    //  in memory is colorSchemeDark. You can copy and modify either scheme
    //  and save to local storage under your own name.
    //--honeydew: #F0FFF0;  /* light greenish yellow used for nav-background-color
    --nav-button-bg-color: #F0FFF0;  // Honeydew light greenish yellow
    --nav-button-color: #159957;  // Cayman green
    --msgq-error-bg-color: #f44336;  // Light Red
    --msgq-warning-bg-color: #ff9800;  // Light Orange
    --msgq-info-bg-color: #2196F3;  // Light Blue
    --msgq-success-bg-color: #04AA6D;  // Light Green
    --msgq-body-bg-color: #f1f1f1;  // Light Grey
    --msgq-border-color: #d3d3d3;  // Dark Grey

    --header-accent-color: #FFFF00;  // Yellow also button focus text
    --button-focus-color: #1E90FF;  // Dodger Blue (for background)
    --progress-bar-color: #008000;  // Green
    --flash-bg-color: #808080;  // Grey
    --boldest-color: #000000;  // Black on white screen, white on black screen
    --link-visited: #800080;  // Purple
    // $salmon: #FA8072 !default; // salmon
    // $lavender: #E6E6FA !default; // lavender

    //  Copied from github/page-themes/cayman/_sass/variables.scss
    //  to /assets/_sass/variables.scss and & prefix changed to --
    --header-heading-color: #ffffff;  // White
    --header-bg-color: #159957;  // Cayman Green
    --header-bg-color-secondary: #155799;  // Cayman Blue
    // Text
    --section-headings-color: #159957;  // Cayman Green
    --body-text-color: #606c71;  // grey
    --body-bg-color: #ffffff;  // white
    --body-link-color: #1e6bb8;  // Link blue
    --body-link-inverted-color: #e19447;  // Have no clue used by cayman theme
    // from: https://stackoverflow.com/a/36908191/6929343
    --blockquote-text-color: #819198;  // steel blue/grey
    // Code
    --code-bg-color: #f3f6fa;  // faint grey
    --code-text-color: #567482;  // light royal blue
    // Borders
    --border-color: #dce6f0;  // faint sky blue
    --table-border-color: #e9ebec;  // faint grey
    --hr-border-color: #eff0f1;  // faint grey
    //  /assets/_sass/variables.scss that never had an '&' sass prefix
    --kbd-background-color: #fafbfc;  // white
    --kbd-border-color: #c6cbd1;  // light grey/blue
    --kbd-border-bottom-color: #959da5;  // grey/blue
    --kbd-box-shadow-color: #959da5;  // grey/blue
    --kbd-color: #444d56;  // dark grey/blue
}

*/

/* End of /_includes/getRootColors.js */