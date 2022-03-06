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

/* assign element names by id */
var inputHref = null
var inputText = null
var inputTitle = null
var inputExternal = null
var inputNewWindow = null
var inputRecipeHtml = null
var inputRecipeMd = null

export function processHyperlinkRecipe(id) {
    const b = document.getElementById(id)  // div body id where html codes go
    doReset();      // Reset all button colors and empty strings
    paintTable(b);  // display <table>
}

function paintTable (b) {

    html = '<h3>Hyperlink Recipe Baker</h3>\n'

    html += '<form><table id="hrTable" class="hr_table">\n'
    html += '<tr id="ingredients">\n'
    html += '<th>Ingredients</th>\n'
    html += '<th>From the clipboard or set options</th>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    // Button class = "hrBtn". Don't use "button" which parent may have!!!
    html += '<td><button class="hrBtn" id="btnHref" ' +
            'title="Insert browser address bar string (from the clipboard)"' +
            '>URL (href)</button></td>\n'
    html += '<td id="hrHref" class="hrInput">\n'
    html += '<input type="text" placeholder="Mandatory. URL from clipboard will go here" /></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" id="btnText"' +
            'title="Insert name of link to appear in document (from the clipboard)"' +
            '>Name (text)</button></td>\n'
    html += '<td id="hrText" class="hrInput">\n'
    html += '<input type="text" placeholder="Mandatory. Link name from clipboard will go here" /></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" id="btnTitle"' +
            'title="Insert optional tooltip details about link (from the clipboard)"' +
            '>Tooltip (title)</button></td>\n'
    html += '<td id="hrTitle" class="hrInput">\n'
    html += '<input type="text" placeholder="Optional. Hover mouse over link and get this tooltip"></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" id="btnExternal"' +
            'title="Use optional UTF-8 icon to show link is an external website"' +
            '>External link</button></td>\n'
    html += '<td id="hrExternal" class="hrInput">\n'
    html += '<input type="text" placeholder="Optional. Append external link icon after Name (text)"></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'  // Open link in New Window/Tab
    html += '<td><button class="hrBtn" id="btnNewWindow"' +
            'title="When link is clicked, it will be opened in a new Browser Window or Tab"' +
            '>New Window</button></td>\n'
    html += '<td id="hrNewWindow" class="hrInput">\n'
    html += '<input type="text" placeholder="Optional. Open link in New Browser Window or Tab"></td>\n'
    html += '</tr>\n'

    html += '<tr id="recipes">\n'
    html += '<th>Recipes</th>\n'
    html += '<th>string sent to the clipboard</th>\n'
    html += '</tr>\n'

    html += '<tr>\n'  // HTML Recipe
    html += '<td><button class="hrBtn" id="btnRecipeHtml"' +
            'title="Copy HTML recipe to the clipboard. Then you can paste in document"' +
            '>HTML</button></td>\n'
    html += '<td id="hrRecipeHtml" class="hrInput">\n'
    html += '<input type="text" placeholder="HTML Recipe will be built here"></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'  // Markdown Recipe
    html += '<td><button class="hrBtn" id="btnRecipeMd"' +
            'title="Copy Markdown recipe to the clipboard. Then you can paste in document"' +
            '>Markdown</button></td>\n'
    html += '<td id="hrRecipeMd" class="hrInput">\n'
    html += '<input type="text" placeholder="Markdown Recipe will be built here"></td>\n'
    html += '</tr>\n'

    html += '</table></form>\n'     // End of our table and form

    /* Set styling for table elements */
    html += '<style>\n'             // Styling for Hyperlink Recipe table

    html += 'h3 {\n'                // "Hyperlink Recipe Baker" <h3> styling
    html += '  margin-top: .5rem;\n'
    html += '  margin-bottom: .5rem;\n'
    html += '}\n'

    html += '.hrTable {\n'          // Table details
    html += '  width: 100%;\n'      // Use max allowed space
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
    document.getElementById("hrTable").style.borderSpacing = ".3rem";

    /* Define functions on button clicks */
    document.getElementById("btnHref").onclick = doHref;
    document.getElementById("btnText").onclick = doText;
    document.getElementById("btnTitle").onclick = doTitle;
    document.getElementById("btnExternal").onclick = doExternal;
    document.getElementById("btnNewWindow").onclick = doNewWindow;
    document.getElementById("btnRecipeHtml").onclick = doRecipeHtml;
    document.getElementById("btnRecipeMd").onclick = doRecipeMd;

    /* Clipboard functions

    Enter about:config in navigation bar
    Click "Accept the Risk and Continue"
    Search dom.events.testing.asyncClipboard and set true

    */
    /* assign element names by id */
    inputHref = document.getElementById('hrHref');
    inputText = document.getElementById('hrText');
    inputTitle = document.getElementById('hrTitle');
    inputExternal = document.getElementById('hrExternal');
    inputNewWindow = document.getElementById('hrNewWindow');
    inputRecipeHtml = document.getElementById('hrRecipeHtml');
    inputRecipeMd = document.getElementById('hrRecipeMd');

    btnHref.addEventListener('click', () => {
        window.navigator.clipboard.readText().then(
            clipText => updateInput (inputHref, clipText));
    });

    /* Manual paste event handlers - These work but suppress for now... */
    // hrHref.addEventListener('paste', handlePaste);

    setButtonStyles();
}

function setButtonStyles () {
}

/* Shared function to read clipboard and update input */
function updateInput (elm, text) {
    if (text == "hell") {
        alert('Clipboard is empty or permissions not granted to read clipboard.\n\n' +
              'Chrome will seek your permission per website.\n\n' +
              'Firefox requires you to grant permissions to all websites:\n' +
              '  Enter "about:config" in the address bar (without quotes).\n' +
              '  Search on "dom.events.testing.asyncClipboard" (without quotes).\n' +
              '  Click the toggle icon to switch "False" to "True".\n\n' +
              'Or use "CTRL" + "V" or "Right-Click" then "Paste" to paste manually.\n' +
              'Then click button to add ingredient to recipe.')
        return
    }
    elm.value = text            // Set value of Input to clipboard contents
    alert('elm.value set to: ' + text)
}

/* Functions called on button click */
function doHref () {
    // URL (href) button has been clicked. Get clipboard contents
    // updateInput(hrHref);
}


function handlePaste(e) {
  var clipboardData, pastedData;

  // Stop data actually being pasted into div
  e.stopPropagation();
  e.preventDefault();

  // Get pasted data via clipboard API
  clipboardData = e.clipboardData || window.clipboardData;
  pastedData = clipboardData.getData('Text');

  // Do whatever with pastedData
  alert('pastedData: ' + pastedData);
}


function doText () {
    // Name (text) button has been clicked. Get clipboard contents
    hrText.focus();
    // hrText.select();
    console.log('in doText()')
    document.execCommand("paste");
}

// top level await isn't currently supported in Firefox
// const text = await navigator.clipboard.readText();

function doTitle () {
    // Name (text) button has been clicked. Get clipboard contents
    hrText.focus();
    // hrText.select();
    // alert('in doTitle() last text: ' + text)
    // const text2 = window.clipboardData.getData('Text')
    // alert('in doTitle() text2: ' + text2)
    document.execCommand("paste");
}

function doExternal () {}
function doNewWindow () {}
function doRecipeHtml () {}
function doRecipeMd () {}
function doReset () {}

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
