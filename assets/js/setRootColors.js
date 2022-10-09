---
---
// /assets/js/setRootColors - Set Root Colors before /asset/css/style.scss

console.log("Start of /_layouts/test.html")
// Color Schemes - getRootColors.js for descriptions
{% include getRootColors.js %}

function applyRootColors() {
    // Your CSS as text: https://stackoverflow.com/a/707580/6929343
    // root colors: Cayman green, Cayman blue, Honeydew
    // name-column fluctuates based on currentTable and scrSetSize
    var styles = ':root {\n'
    styles += getCurrentColors()
    styles += '}\n'

    var rootStyleSheet = document.createElement("style")
    rootStyleSheet.innerText = styles
    document.head.appendChild(rootStyleSheet)

}  // End of applyRootStyles()

applyRootColors()

/* End of /assets/js/setRootColors.js */