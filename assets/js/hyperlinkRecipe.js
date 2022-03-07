/*
    Hyperlink Recipe Baker (HRM for short)

    hyperlinkRecipe.js - Create hyperlinks from Clipboard pastes (at least two).
                        Export hyperlinks to Clipboard
                            Recipe 1 = HTML format
                            Recipe 2 = Markdown format

   Note:    Uses export processHyperlinkRecipe(className) so parent Javascript
            function uses:

                import processHyperlinkRecipe from 'hyperlinkRecipe.js';

                Then to call use:

                    <div id="tcm_window_body"<p> Empty paragraph </p></div>
                    document.querySelector('#tcm_hyperlink_recipe').addEventListener('click', () => {
                        processHyperlinkRecipe('tcm_window_body')
                    });

            Assuming this module is called from TCM, the Top level HTML must be using:
                 <script type="module" src="/assets/js/theCookieMachine.js" ></script>

            See: https://pippim.github.io/hyperlink.html
*/

var html = null

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
    paintTable(b);
}

function paintTable (b) {
    // Button class = "hrBtn". Don't use "button" which parent may have!!!
    // NOTE: onclick is not supported: https://stackoverflow.com/a/17378538/6929343

    html = '<h3 id="hrHdr">Hyperlink Recipe Baker</h3>\n'  // HRB heading in level 3 larger font
    // Table must be created wrapped inside form for <input variables
    html += '<form><table id="hrTable" class="hr_table">\n'
    // Ingredients heading
    html += '<tr><th>Ingredients</th>\n' +
            '<th>Button inserts the clipboard contents</th></tr>\n'
    // Button and Input for URL (href) Must be https?//:  Note glitch with "required"
    html += '<tr><td><button class="hrBtn" id="btnHref" type="button"\n' +
            'title="Insert browser address bar string (from the clipboard)"\n' +
            '>URL (href)</button></td>\n' +
            '<td><input id="hrHref" class="hrInput" type="url" pattern="https?://.+" \n' +
            'placeholder="Mandatory. URL from clipboard will go here" /></td></tr>\n'
    // Link Name (text)
    html += '<tr><td><button class="hrBtn" id="btnText" type="button"\n' +
            'title="Insert name of link to appear in document (from the clipboard)"\n' +
            '>Name (text)</button></td>\n' +
            '<td><input id="hrText" class="hrInput" type="text" type="button"\n' +
            'placeholder="Mandatory. Link name from clipboard will go here" /></td></tr>\n'
    // Tooltip on Hover (title)
    html += '<tr><td><button class="hrBtn" id="btnTitle" type="button"\n' +
            'title="Insert optional tooltip details about link (from the clipboard)"\n' +
            '>Tooltip (title)</button></td>\n' +
            '<td><input id="hrTitle" class="hrInput" type="text"\n' +
            'placeholder="Optional. Hover mouse over link and get this tooltip"></td></tr>\n'
    // Variations Heading
    html += '<tr><th>Variations</th>\n' +
            '<th>Button toggles options on and off</th></tr>\n'
    // Toggle UTF-8 Symbol for external links
    html += '<tr><td><button class="hrBtn" id="btnExternal" type="button"\n' +
            'title="Use optional UTF-8 symbol to show link is an external website"\n' +
            '>External link</button></td>\n' +
            '<td><input id="hrExternal" class="hrInput" type="text"\n' +
            'placeholder="Optional. Append external link symbol to Name (text)"></td></tr>\n'
    // Toggle Open link in New Window/Tab
    html += '<tr><td><button class="hrBtn" id="btnNewWindow" type="button"\n' +
            'title="When link is clicked, it will be opened in a new Browser Window or Tab"\n' +
            '>New Window</button></td>\n' +
            '<td><input id="hrNewWindow" class="hrInput" type="text"\n' +
            'placeholder="Optional. Open link in New Browser Window or Tab"></td></tr>\n'
    // Bake Heading
    html += '<tr><th>Bake</th>\n' +
            '<th>Button puts the recipe into the clipboard</th></tr>\n'
    // Bake HTML Recipe
    html += '<tr><td><button class="hrBtn" id="btnRecipeHtml" type="button"\n' +
            'title="Copy HTML recipe to the clipboard. Then you can paste in document"\n' +
            '>HTML</button></td>\n' +
            '<td><input id="hrRecipeHtml" class="hrInput" type="text"\n' +
            'placeholder="HTML Recipe will be built here"></td></tr>\n'
    // Bake Markdown Recipe
    html += '<tr><td><button class="hrBtn" id="btnRecipeMd" type="button"\n' +
            'title="Copy Markdown recipe to the clipboard. Then you can paste in document"\n' +
            '>Markdown</button></td>\n' +
            '<td><input id="hrRecipeMd" class="hrInput" type="text"\n' +
            'placeholder="Markdown Recipe will be built here"></td></tr>\n'
    // End of our table and form
    html += '</table></form>\n'

    /* Set styling for table elements */
    html += '<style>\n'             // Styling for Hyperlink Recipe table

    html += '#hrHdr {\n'            // Heading: "Hyperlink Recipe Baker" <h3> styling
    html += '  margin-top: .5rem;\n'
    html += '  margin-bottom: .5rem;\n'
    html += '}\n'

    html += 'td {\n'                // Table details
    html += '  padding: 0 1rem;\n'  // Space between columns
    html += '}\n'

    // Column 2 minimum width to give lots of room for URL
    // Box sizing takes full column width not varying by text length
    html += '.hrInput {\n'
    html += '  min-width: 550px;\n' // 600 is ok for modal, too wide for webpage
    html += '  box-sizing: border-box;\n'
    html += '  -webkit-box-sizing:border-box;\n'
    html += '  -moz-box-sizing: border-box;\n'
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
    // border .163rem works ok in Firefox but grows button in Chrome
    html += '    border: .12rem solid Black;\n'
    html += '  }\n'                 // End of button hover styling

    html += '</style>\n'            // End of all styles

    b.innerHTML = html;             // Update TCM Window body

    // Some space between columns
    document.getElementById("hrTable").style.borderSpacing = ".3rem";

    /* Set easier to use element names for inputs by id */
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

function doRecipeHtml () {
    buildRecipes();
    // TODO: check mandatory fields href and text are non-blank
    window.navigator.clipboard.writeText(inputRecipeHtml.value)
}

function doRecipeMd () {
    // TODO: Can RecipeHtml and RecipeMd be combined into single function?
    buildRecipes();
    window.navigator.clipboard.writeText(inputRecipeMd.value)
}

/* old and new not used yet... */
var oldRecipeHtml = ""
var oldRecipeMd = ""
var newRecipeHtml = ""
var newRecipeMd = ""

function buildRecipes () {
    /* Create HTML & Markdown recipes using ingredients */

    // Convert special characters to HTML &code; values
    var href = sanitizeValue(inputHref.value)
    var text = sanitizeValue(inputText.value)
    var title = sanitizeValue(inputTitle.value)

    // OPTIONAL - UTF-8 external link symbol appended to link name (text)
    if (useExternal) { text += inputExternal.value; }

    // OPTIONAL - open in new browser window / tab
    // NOTES: Doesn't work in regular markdown, insert HTML Recipe instead
    //        Markdown Recipe does work for Kramdown (in Jekyll anyway)
    //        Stack Exchange strips it out of HTML along with other attributes
    //          See: https://meta.stackexchange.com/a/135909/366359
    var newHtml = ""
    var newMd = ""
    if (useNewWindow) {
        newHtml = ' ' + inputNewWindow.value + ' '
        newMd = '{:' + inputNewWindow.value + '}'
    }

    // Assume no tooltip - use endings to terminate href attribute
    var titleHtml = '>';
    var titleMd = ')';
    // Add optional hover tooltip (title)
    if (title !== "") {
        // Format title string that follows URL address (href)
        titleHtml = ' title="' + title + '">';
        titleMd = ' "' + title + '")';
    }

    // Sample Recipes created:
    // <a href="https://github.com/microsoft/monaco-editor/issues/2183" target="_blank"  title="Chrome security prompt to allow reading clipboard">Paste shows warning in Google Chrome#2183  🔗</a>
    // [Paste shows warning in Google Chrome#2183  🔗](https://github.com/microsoft/monaco-editor/issues/2183 "Chrome security prompt to allow reading clipboard"){:target="_blank"}

    inputRecipeHtml.value =
        '<a href="' + href + '"' + newHtml + titleHtml + text + '</a>'
    inputRecipeMd.value =
        "[" + text + "](" + href + titleMd + newMd
}

function sanitizeValue (value) {
    // Special characters in href, text and title attributes need HTML &code;
    // Regex method for multiples: https://stackoverflow.com/a/3971261/6929343
    value = value.replace(/\&/g, '&amp;')  // Must be the first one!
    value = value.replace(/\</g, '&lt;')
    value = value.replace(/\>/g, '&gt;')
    value = value.replace(/\'/g, '&apos;')
    return value.replace(/\"/g, "&quot;")
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
