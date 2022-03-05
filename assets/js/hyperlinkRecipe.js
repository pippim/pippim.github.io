---
---
/* hyperlinkRecipe.js - Create hyperlinks from Clipboard pastes (at least two).
                        Export hyperlinks to Clipboard
                            Recipe 1 = HTML format
                            Recipe 2 = Markdown format

   Note:    Uses export processHyperlinkRecipe(className) so parent Javascript
            function uses:

                import processHyperlinkRecipe from 'hyperlinkRecipe.js';

                Then to call use:

                    const b = document.getElementById('tcm_window_body')
                    document.querySelector('#tcm_hyperlink_recipe').addEventListener('click', () => {
                        processHyperlinkRecipe(b)
                    });

            Assuming this module is called from TCM, the Top level HTML must be using:
                 <script type="module" src="/assets/js/theCookieMachine.js" ></script>

*/

var html = null
var hrClass = "<style>"
var hrClass = "<style>"

export function processHyperlinkRecipe(id) {
    const b = document.getElementById(id)  // div body id where html codes go
    doReset();      // Reset all button colors and empty strings
    paintTable(b);  // display <table>
}

/* Functions called on button click */
function doHref () {
    // URL (href) button has been clicked. Get clipboard contents
    hrRef.focus();
    document.execCommand("paste");
}

function doText () {}
function doTitle () {}
function doExternal () {}
function doNewWindow () {}
function doRecipeHtml () {}
function doRecipeMarkdown () {}
function doReset () {}

function paintTable (b) {

    html = '<h3>Hyperlink Recipe Baker</h3>\n'

    html += '<form><table id="hrTable" class="hr_table">\n'
    html += '<tr id="ingredients">\n'
    html += '<th>Ingredients</th>\n'
    html += '<th>From the clipboard or set options</th>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    // Button class = "hrBtn". Don't use "button" which parent may have!!!
    html += '<td><button class="hrBtn" onclick="doHref()" ' +
            'title="Insert browser address bar string (from the clipboard)"' +
            '>URL (href)</button></td>\n'
    html += '<td id="hrRef" class="hrInput">\n'
    html += '<input type="text" placeholder="Mandatory. URL from clipboard will go here"></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" onclick="doText()"' +
            'title="Insert name of link to appear in document (from the clipboard)"' +
            '>Name (text)</button></td>\n'

    html += '<td><div id="hrText" class="hr_text>\n'
    html += '<input type="string">This is a very long name for the website description\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" onclick="doTitle()"' +
            'title="Insert optional tooltip details about link (from the clipboard)"' +
            '>Tooltip (title)</button></td>\n'

    html += '<td><div id="hrTitle" class="hr_title>\n'
    html += '<input type="string">Hover mouse over link and get this tooltip\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" onclick="doExternal()"' +
            'title="Use optional UTF-8 icon to show link is an external website"' +
            '>External link</button></td>\n'

    html += '<td><div id="hrExternal" class="hr_external>\n'
    html += '<input type="string">Append external link icon after Name (text)\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" onclick="doNewWindow()"' +
            'title="When link is clicked, it will be opened in a new Browser Window or Tab"' +
            '>New Window</button></td>\n'

    html += '<td><div id="hrNewWindow" class="hr_new_window>\n'
    html += '<input type="string">Open link in New Browser Window or Tab\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr id="recipes">\n'
    html += '<th>Recipes</th>\n'
    html += '<th>String sent to the clipboard</th>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" onclick="doRecipeHtml()"' +
            'title="Copy HTML recipe to the clipboard. Then you can paste in document"' +
            '>HTML</button></td>\n'

    html += '<td id="hrRecipeHtml" class="hrInput">\n'
    html += '<input type="text" placeholder="HTML Recipe will be built here"></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" onclick="doRecipeMarkdown()"' +
            'title="Copy Markdown recipe to the clipboard. Then you can paste in document"' +
            '>Markdown</button></td>\n'

    html += '<td><div id="hrRecipeMd" class="hrInput">\n'
    html += '<input type="text" placeholder="Markdown Recipe will be built here">\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '</table></form>\n'     // End of our table and form

    /* Set styling for table elements */
    html += '<style>\n'             // Styling for Hyperlink Recipe table

    html += 'h3 {\n'                // "Hyperlink Recipe Baker" <h3> styling
    html += '  margin-top: .5rem;\n'
    html += '  margin-bottom: .5rem;\n'
    html += '}\n'

    html += 'td {\n'                // Table details
    html += '  padding: 0 1rem;\n'  // Space between columns
    html += '}\n'

    html += '.hrBtn {\n'            // Buttons in the first column
    html += '  background-color: YellowGreen;\n'
    html += '  width: 100%;\n'
    html += '  border-radius: .5rem;\n'
    html += '  text-align: center;\n'
    html += '}\n'                   // End of button styling
    html += '.hrBtn:hover {\n'
    html += '    color: #fff;\n'
    html += '    background-color: DarkGreen;\n'
    html += '    border: .163rem solid Black;\n'
    html += '  }\n'                 // End of button hover styling

    html += 'input[type="text"] {\n'
    html += '     width: 100%;\n'   // Set to full width of column 2
    html += '     box-sizing: border-box;\n'
    html += '     -webkit-box-sizing:border-box;\n'
    html += '     -moz-box-sizing: border-box;\n'
    html += '}\n'

    html += '</style>\n'            // End of all styles

    b.innerHTML = html;             // Update TCM Window body
    document.getElementById("hrTable").style.borderSpacing = "5px";
    setButtonStyles();
}

function setButtonStyles () {
}

/* assign element names by id */
var strHref = document.getElementById('hrHref');
var strText = document.getElementById('hrText');
var strTitle = document.getElementById('hrTitle');
var strExternal = document.getElementById('hrExternal');
var strNewWindow = document.getElementById('hrNewWindow');
var strRecipeHtml = document.getElementById('hrRecipeHtml');
var strRecipeMd = document.getElementById('hrRecipeMd');

/* Not supported in firefox
var writePermission = navigator.permissions.query({name: "clipboard-write"}).then(result => {
  if (result.state == "granted" || result.state == "prompt") {
    return true
  } else {
    return false
  }
});

var readPermission = navigator.permissions.query({name: "clipboard-read"}).then(result => {
  if (result.state == "granted" || result.state == "prompt") {
    return true
  } else {
    return false
  }
});

console.log("writePermission: " + writePermission)
console.log("readPermission: " + readPermission)
*/

/* End of /assets/js/hyperlinkRecipe.js */
