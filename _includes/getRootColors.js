/*  /_includes/setRootColors - get Root Colors before:
        /asset/css/style.scss in all /_layouts
        test.md
        tcm-common-code.js
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

var currentColorScheme  // Object with all root keys

function getCurrentColors() {
    /*  Local storage key colorScheme contains our scheme name.
        If it doesn't exist use Cayman Theme and save to new key.
        BAD DESIGN: If website updates color scheme, user's saved colors
                    in local storage is loaded with older colors. Change
                    structure to save the name only
    */
    currentColorScheme = JSON.parse(localStorage.getItem('colorScheme'))
    console.log("Reading currentColorScheme:", currentColorScheme)
    //if (typeof localStorage.getItem("colorScheme") === 'undefined')
    if (currentColorScheme == null) {
        localStorage.setItem("colorScheme", JSON.stringify(colorSchemeCayman))
        currentColorScheme = Object.assign( {}, colorSchemeCayman)
        console.log("Creating currentColorScheme:", currentColorScheme)
        // Shallow object copy - https://stackoverflow.com/a/34294740/6929343
    }
    return (extractRootColors(currentColorScheme))
}

function extractRootColors(scheme) {
    // Set dark theme
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
    // Set dark theme
    console.log("/assets/js/tim-ta.js environment:", environment)
    setColorScheme(colorSchemeDark)
    /*
    for (const key of Object.keys(colorSchemeDark)) {
        if (key.startsWith("fail_test")) continue  // Ignore test fail data
        if (key.startsWith("name")) continue  // Ignore test fail data
        console.log(key, colorSchemeDark[key], getColorCode(colorSchemeDark, key))
        setColorCode(colorSchemeDark, key)
    }
    */
}

function getColorCode(scheme, key) {
    // Get the styles (properties and values) for the root
    const rootElm = document.querySelector(':root')  // Will not work for popup
    const rs = getComputedStyle(rootElm)
    const value = scheme[key]
    // Alert the value of the --blue variable
    // console.log("The value of " + key + " is: " + value)
    return value
}

// From theCookieMachine.js
function setColorCode(scheme, key) {
    // Set the value of variable --msgq-error-bg-color to another value (in this case "lightblue")
    const rootElm = document.querySelector(':root')  // Will not work for popup
    const value = scheme[key]
    if (value === null) return
    rootElm.style.setProperty(key, value);
}

function setColorScheme(schemeName) {
    // Set dark theme
    console.log("/assets/js/theCookieMachine.js color scheme:", schemeName)
    for (const key of Object.keys(schemeName)) {
        if (!(key.startsWith("--"))) continue  // Ignore "name"
        console.log(key, schemeName[key], getColorCode(schemeName, key))
        setColorCode(schemeName, key)
    }
}


/* Long long comments

*/

/* End of /_includes/getRootColors.js */