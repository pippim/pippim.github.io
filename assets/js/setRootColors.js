---
---
// /assets/js/setRootColors - Set Root Colors before /asset/css/style.scss

console.log("Start of /_layouts/test.html")
// Color Schemes - style.scss for descriptions
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

function applyRootColors() {
    // Your CSS as text: https://stackoverflow.com/a/707580/6929343
    // root colors: Cayman green, Cayman blue, Honeydew
    // name-column fluctuates based on currentTable and scrSetSize
    var styles = ':root {\n'
    styles += '  --test-color: #1060F0;\n'
    styles += getCurrentColors()
    styles += '}\n'

    rootStyleSheet = document.createElement("style")
    rootStyleSheet.innerText = styles
    document.head.appendChild(rootStyleSheet)

}  // End of applyRootStyles()

var currentColorScheme  // Global variable

function getCurrentColors() {
    /*  Local storage key colorScheme contains our scheme name.
        If it doesn't exist use Cayman Theme and save to new key.
    */
    if (typeof localStorage.getItem("colorScheme") === 'undefined')
        localStorage.setItem("colorScheme", JSON.stringify(colorSchemeCayman))
    currentColorScheme = JSON.parse(localStorage.getItem('colorScheme'))
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

/* End of /assets/js/setRootColors.js */