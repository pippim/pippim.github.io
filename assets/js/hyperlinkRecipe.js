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

    html = '<h3>Hyperlink Recipe Baker</h3>\n'  // HRB heading in level 3 larger font

    html += '<form><table id="hrTable" class="hr_table">\n'  // Ingredients heading
    html += '<tr id="ingredients">\n'
    html += '<th>Ingredients</th>\n'
    html += '<th>From the clipboard or set options</th>\n'
    html += '</tr>\n'

    html += '<tr>\n'                // Button and Input for URL (href)
    // Button class = "hrBtn". Don't use "button" which parent may have!!!
    // NOTE: onclick is not supported: https://stackoverflow.com/a/17378538/6929343
    html += '<td><button class="hrBtn" id="btnHref"\n' +
            'title="Insert browser address bar string (from the clipboard)"\n' +
            '>URL (href)</button></td>\n'
    html += '<td class="hrInput">\n'
    html += '<input id="hrHref" type="text" placeholder="Mandatory. URL from clipboard will go here" /></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'                // Link Name (text)
    html += '<td><button class="hrBtn" id="btnText"\n' +
            'title="Insert name of link to appear in document (from the clipboard)"\n' +
            '>Name (text)</button></td>\n'
    html += '<td class="hrInput">\n'
    html += '<input type="text" id="hrText" placeholder="Mandatory. Link name from clipboard will go here" /></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'                // Tooltip on Hover (title)
    html += '<td><button class="hrBtn" id="btnTitle"\n' +
            'title="Insert optional tooltip details about link (from the clipboard)"\n' +
            '>Tooltip (title)</button></td>\n'
    html += '<td class="hrInput">\n'
    html += '<input type="text" id="hrTitle" placeholder="Optional. Hover mouse over link and get this tooltip"></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'                // UTF-8 Symbol for external links
    html += '<td><button class="hrBtn" id="btnExternal"\n' +
            'title="Use optional UTF-8 icon to show link is an external website"\n' +
            '>External link</button></td>\n'
    html += '<td class="hrInput">\n'
    html += '<input id="hrExternal" type="text" placeholder="Optional. Append external link icon after Name (text)"></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'                // Open link in New Window/Tab
    html += '<td><button class="hrBtn" id="btnNewWindow"\n' +
            'title="When link is clicked, it will be opened in a new Browser Window or Tab"\n' +
            '>New Window</button></td>\n'
    html += '<td class="hrInput">\n'
    html += '<input id="hrNewWindow" type="text" placeholder="Optional. Open link in New Browser Window or Tab"></td>\n'
    html += '</tr>\n'

    html += '<tr id="recipes">\n'   // Recipe Heading
    html += '<th>Recipes</th>\n'
    html += '<th>string sent to the clipboard</th>\n'
    html += '</tr>\n'

    html += '<tr>\n'                // HTML Recipe
    html += '<td><button class="hrBtn" id="btnRecipeHtml"' +
            'title="Copy HTML recipe to the clipboard. Then you can paste in document"' +
            '>HTML</button></td>\n'
    html += '<td class="hrInput">\n'
    html += '<input id="hrRecipeHtml" type="text" placeholder="HTML Recipe will be built here"></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'                // Markdown Recipe
    html += '<td><button class="hrBtn" id="btnRecipeMd"' +
            'title="Copy Markdown recipe to the clipboard. Then you can paste in document"' +
            '>Markdown</button></td>\n'
    html += '<td class="hrInput">\n'
    html += '<input id="hrRecipeMd" type="text" placeholder="Markdown Recipe will be built here"></td>\n'
    html += '</tr>\n'

    html += '</table></form>\n'     // End of our table and form

    /* Set styling for table elements */
    html += '<style>\n'             // Styling for Hyperlink Recipe table

    html += 'h3 {\n'                // "Hyperlink Recipe Baker" <h3> styling
    html += '  margin-top: .5rem;\n'
    html += '  margin-bottom: .5rem;\n'
    html += '}\n'

    //html += '.hrTable {\n'          // Table details
    //html += '  width: 100%;\n'      // Use max allowed space
    //html += '}\n'

    html += 'td {\n'                // Table details
    html += '  padding: 0 1rem;\n'  // Space between columns
    html += '}\n'

    // Column 2 minimum width to give lots of room for URL
    // Box sizing takes full column width not varying by text length
    html += 'input[type="text"] {\n'
    html += '     min-width: 600px;\n'
    html += '     box-sizing: border-box;\n'
    html += '     -webkit-box-sizing:border-box;\n'
    html += '     -moz-box-sizing: border-box;\n'
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

    html += '</style>\n'            // End of all styles

    b.innerHTML = html;             // Update TCM Window body

    // Some space between columns
    document.getElementById("hrTable").style.borderSpacing = ".3rem";

    /* Set input elements by id */
    inputHref = document.getElementById('hrHref');
    inputText = document.getElementById('hrText');
    inputTitle = document.getElementById('hrTitle');
    inputExternal = document.getElementById('hrExternal');
    inputNewWindow = document.getElementById('hrNewWindow');
    inputRecipeHtml = document.getElementById('hrRecipeHtml');
    inputRecipeMd = document.getElementById('hrRecipeMd');

    /* Clipboard read functions (HIGH SECURITY) for href, text and title */
    btnHref.addEventListener( 'click', () => { navigator.clipboard.readText().then(
            clipText => updateInput (inputHref, clipText)); });
    btnText.addEventListener( 'click', () => { navigator.clipboard.readText().then(
            clipText => updateInput (inputText, clipText)); });
    btnTitle.addEventListener('click', () => { navigator.clipboard.readText().then(
            clipText => updateInput (inputTitle, clipText)); });

    /* Functions to format recipe & put into clipboard (low security) */
    document.getElementById("btnExternal").onclick = doExternal;
    document.getElementById("btnNewWindow").onclick = doNewWindow;
    document.getElementById("btnRecipeHtml").onclick = doRecipeHtml;
    document.getElementById("btnRecipeMd").onclick = doRecipeMd;

    /* Manual paste event handlers - These work but suppress for now... */
    // hrHref.addEventListener('paste', handlePaste);

}

/* Shared function to read clipboard and update input */

var oldClip = null
var newClip = null

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
    oldClip = elm.value
    elm.value = text            // Set value of Input to clipboard contents
    newClip = text
    buildRecipes();
}

/* Non-clipboard reading functions called on button click */
var useExternal = false;
var stringExternal = " 🔗";

function doExternal () {
    // If external off turn on, if on then turn off
    useExternal = !useExternal;
    if (useExternal) {
        inputExternal.value = stringExternal;
    } else {
        // TODO: If value not blank, save as stringExternal?
        inputExternal.value = "";
    }
    buildRecipes();
}

var useNewWindow = false;
var stringNewWindow = 'target="_blank"';

function doNewWindow () {
    // If external off turn on, if on then turn off
    useNewWindow = !useNewWindow;
    if (useNewWindow) {
        inputNewWindow.value = stringNewWindow;
    } else {
        inputNewWindow.value = "";
    }
    buildRecipes();
}

function doRecipeHtml () {}
function doRecipeMd () {}
function doReset () {}

var recipeHTML = null
var recipeMd = null

function buildRecipes () {
    /* Create HTML & Markdown recipes using ingredients */

    // Convert special characters to HTML &code; values
    var href = sanitizeValue(inputHref.value)
    var text = sanitizeValue(inputText.value)
    var title = sanitizeValue(inputTitle.value)

    // Add UTF-8 external link symbol to link name (text)
    if (useExternal) { text += inputExternal.value; }

    // Add optional open in new window / tab of browser
    // NOTES: Doesn't work in regular markdown, insert HTML Recipe instead
    //        Markdown Recipe does work for Kramdown (in Jekyll anyway)
    var newHtml = ""
    var newMd = ""
    if (useNewWindow) {
        newHtml = inputNewWindow.value + ' '
        newMd = '{:' + inputNewWindow.value + '}'
    }

    // Assume no tooltip - use endings to terminate href attribute
    var titleHtml = '">';
    var TitleMd = ')';
    // Add optional hover tooltip (title)
    if (title !== "") {
        // Format title string that follows URL address (href)
        titleHtml = '" title="' + title + '">';
        titleMd = ' "' + title + ')';
    }

    recipeHTML = '<a href="' + href + newHtml + titleHtml + text + '</a>'
    recipeMd = "[" + text + inputExternal.value + "]{" + href + titleMd + newMd
    // Update table column on screen
    inputRecipeHtml.value = recipeHTML
    inputRecipeMd.value = recipeMd
}

function sanitizeValue (value) {
    // Special characters in href, text and title attributes need HTML &code;
    value = value.replace('<', '&lt;')
    value = value.replace('>', '&gt;')
    value = value.replace("'", "&apos;")
    return value.replace('"', '&quot;')
}

/* Future use? */
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
