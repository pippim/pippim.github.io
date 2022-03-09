/*
    /assets/js/hyperlinkRecipe.js - Hyperlink Recipe Baker (HRM for short)

    Instructions: https://pippim.github.io/hyperlink.html

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
            '<td><textarea id="hrHref" class="hrInput" cols="45" rows="1"" \n' +
            'placeholder="Mandatory. URL from clipboard will go here"></textarea></td></tr>\n'
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
            '<td><textarea id="hrRecipeHtml" class="hrInput" cols="45" rows="1"\n' +
            'placeholder="HTML Recipe will be built here"></textarea></td></tr>\n'
    // Bake Markdown Recipe
    html += '<tr><td><button class="hrBtn" id="btnRecipeMd" type="button"\n' +
            'title="Copy Markdown recipe to the clipboard. Then you can paste in document"\n' +
            '>Markdown</button></td>\n' +
            '<td><textarea id="hrRecipeMd" class="hrInput" cols="45" rows="1"\n' +
            'placeholder="Markdown Recipe will be built here"></textarea></td></tr>\n'
    html += '</table></form>\n'     // End of our table and form


    // Styling for Hyperlink Recipe table
    html += '<style>\n'
    // Heading: "Hyperlink Recipe Baker" <h3> styling: .5rem margins all around
    html += '#hrHdr { margin: .5rem; }\n'
    // No borders in table
    html += 'table, tr, th, td { border: none ! important; }\n'
    // Table details: Space between columns
    html += 'td { padding: 0 1rem; border-collapse: collapse; }\n'
    // Buttons in the first column. Tiny bit of left & right padding
    // Because Chrome and Firefox vary between shrinking & expanding on hover
    html += '.hrBtn {\n' +
            '  color: #000;\n' +
            '  background-color: YellowGreen;\n' +
            '  width: 100%;\n' +
            '  padding: 0 .4rem;\n' +
            '  border-radius: .5rem;\n' +
            '  text-align: center;\n' +
            '}\n'
    // Button Hover: border .163rem ok in Firefox but grows in Chrome
    html += '.hrBtn:hover {\n' +
            '  color: #fff;\n' +
            '  background-color: DarkGreen;\n' +
            '}\n'
    // Column 2 minimum width to give lots of room for URL
    // width and height = 100% for <textarea> draggable corner to resize
    // Box sizing takes full column width not varying by text length
    html += '.hrInput {\n' +
            '  min-width: 550px;\n' +
            '  width: 100%; height: 100%;\n' +
            '  box-sizing: border-box;\n' +
            '  -webkit-box-sizing:border-box;\n' +
            '  -moz-box-sizing: border-box;\n' +
            '}\n'

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

    /* Clipboard read functions (HIGH SECURITY) for href, text and title buttons */
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

    /* When user changes a character or pastes directly */
    inputHref.oninput = function() {buildRecipes()};
    inputText.oninput = function() {buildRecipes()};
    inputTitle.oninput = function() {buildRecipes()};
    inputExternal.oninput = function() {buildRecipes()};
    inputNewWindow.oninput = function() {buildRecipes()};

    /* Manual paste event handlers - These work but suppress for now... */
    // hrHref.addEventListener('paste', handlePaste);

}

/* Shared function to read clipboard and update input */

var oldClip = null
var newClip = null

function updateInput (elm, text) {
    if (text == null || text == "") {
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
    if (elm == inputHref) {
        validateUrl(text);
    }
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

function buildRecipes () {
    /* Create HTML & Markdown recipes using ingredients */

    // If both mandatory fields are empty then do nothing
    if (inputHref === "" && inputText === "") {
        inputRecipeHtml.value = ""
        inputRecipeMd.value = ""
        return
    }

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

var lastUrl = null
var validUrlSyntax = null
var validUrlExists = null

function validateUrl(Url) {
    if (Url == lastUrl) {
        return validUrlExists  // Same URL would be same 404 status
    }
    validUrlSyntax = isValidUrl(Url)
    // https://stackoverflow.com/a/28747321/6929343
    var performance = window.performance;
    var startTime = performance.now()
    validUrlExists = UrlExists(Url)
    var endTime = performance.now()
    var elapsedTime = endTime - StartTime
    alert('validUrlSyntax: ' + validUrlSyntax +
          'validUrlExists: ' + validUrlExists +
          'time to check: ' + elapsedTime + ' milliseconds`)
    lastUrl = Url
}

export function isValidUrl(Url) {
    // See:  https://stackoverflow.com/a/49849482
    var res = Url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    // return (res !== null)
    return (res != null)
}

export function UrlExists(Url) {
    // See: https://stackoverflow.com/a/31936894
    var http = new XMLHttpRequest();
    http.open('HEAD', Url, false);
    http.send();
    return http.status!=404;
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
