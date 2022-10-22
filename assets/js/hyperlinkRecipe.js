/*
    /assets/js/hyperlinkRecipe.js - Hyperlink Recipe Baker (HRM for short)

    TODO: Need cookies for:
        autoRows:   "0" = No auto resizing
                  > "0" = maximum number of auto-resized rows

*/

var autoRows = '5';     // Override using -data-max="5"
var autoMinRows = "1";  // Override using -data-min="1"
// For timing commands. https://stackoverflow.com/a/28747321/6929343
var performance = window.performance

// var html = null

/* assign element names by id */
var inputHref = null
var inputText = null
var inputTitle = null
var inputExternal = null
var inputNewWindow = null
var inputRecipeHtml = null
var inputRecipeMd = null
var hrbMessageElm, hrbMessageTextElm

export function processHyperlinkRecipe(id) {
    const b = document.getElementById(id)  // div body id where html codes go
    // Button class = "hrbBtn". Don't use "button" which parent may have!!!
    // NOTE: onclick is not supported: https://stackoverflow.com/a/17378538/6929343

    var html = '<div id="hrbMessageId">\n' +  // This div will show error messages
                 '<span id="hrbMessageText">Test message</span>\n' +
                 '<button class="icon_back_fixed" id="hrbMessageBtn" \n' +
                   'style = "margin-left: 3rem; \n' +
                   '         background-image: url(/assets/img/icons/x.png);"\n' +
                 '</button>\n' +
               '</div>\n'
    html += '<h3 id="hrbHdr">Hyperlink Recipe Baker</h3>\n'  // heading level 3 font
    // Table must be created wrapped inside form for <input variables
    html += '<form><table id="hrbTable" class="hrb_table">\n'
    // Ingredients heading
    html += '<tr><th>Ingredients</th>\n' +
            '<th>Click button or use <kbd>Ctrl</kbd> + <kbd>V</kbd> to insert clipboard contents</th></tr>\n'
    // Button and textarea for URL (href)
    html += '<tr><td><button class="hrbBtn" id="btnHref" type="button"\n' +
            'title="Browser address bar (paste from the clipboard)"\n' +
            '>URL (href)</button></td>\n' +
            '<td><textarea id="hrHref" class="hrbInput" cols="45" rows="1"\n' +
            'placeholder="Mandatory. URL from clipboard will go here"></textarea></td></tr>\n'
    // Link Name (text)
    html += '<tr><td><button class="hrbBtn" id="btnText" type="button"\n' +
            'title="Name of link to appear in document. Paste or type in."\n' +
            '>Name (text)</button></td>\n' +
            '<td><input id="hrText" class="hrbInput" type="text"\n' +
            'placeholder="Mandatory. Link name from clipboard will go here" /></td></tr>\n'
    // Tooltip on Hover (title)
    html += '<tr><td><button class="hrbBtn" id="btnTitle" type="button"\n' +
            'title="Optional tooltip when hovering over link name"\n' +
            '>Tooltip (title)</button></td>\n' +
            '<td><input id="hrTitle" class="hrbInput" type="text"\n' +
            'placeholder="Optional. Hovering mouse over link displays tooltip"></td></tr>\n'
    // Variations Heading
    html += '<tr><th>Variations</th>\n' +
            '<th>Variation button toggles options on and off</th></tr>\n'
    // Toggle UTF-8 Symbol for external links
    html += '<tr><td><button class="hrbBtn" id="btnExternal" type="button"\n' +
            'title="Use optional UTF-8 symbol to show link is an external website"\n' +
            '>External link</button></td>\n' +
            '<td><input id="hrExternal" class="hrbInput" type="text"\n' +
            'placeholder="Optional. Append external link symbol to Name (text)"></td></tr>\n'
    // Toggle Open link in New Window/Tab
    html += '<tr><td><button class="hrbBtn" id="btnNewWindow" type="button"\n' +
            'title="When link is clicked, it will be opened in a new Browser Window or Tab"\n' +
            '>New Window</button></td>\n' +
            '<td><input id="hrNewWindow" class="hrbInput" type="text"\n' +
            'placeholder="Optional. Open link in New Browser Window or Tab"></td></tr>\n'
    // Bake Heading
    html += '<tr><th>Bake</th>\n' +
            '<th>Bake button puts the recipe into the clipboard</th></tr>\n'
    // Bake HTML Recipe. Optional data-min and data-max used here.
    html += '<tr><td><button class="hrbBtn" id="btnRecipeHtml" type="button"\n' +
            'title="Copy HTML recipe to the clipboard. Then you can paste in document"\n' +
            '>HTML</button></td>\n' +
            '<td><textarea id="hrRecipeHtml" class="hrbInput" cols="45" rows="1"\n' +
            ' data-min="1" data-max="6"\n' +
            'placeholder="HTML Recipe will be built here"></textarea></td></tr>\n'
    // Bake Markdown Recipe
    html += '<tr><td><button class="hrbBtn" id="btnRecipeMd" type="button"\n' +
            'title="Copy Markdown recipe to the clipboard. Then you can paste in document"\n' +
            '>Markdown</button></td>\n' +
            '<td><textarea id="hrRecipeMd" class="hrbInput" cols="45" rows="1"\n' +
            'placeholder="Markdown Recipe will be built here"></textarea></td></tr>\n'
    html += '</table></form>\n'  // End of our table and form


    // Styling for Hyperlink Recipe table
    html += '<style>\n'
    /* Oct 19/22 - When message is needed, set 'display: flex'
                   https://stackoverflow.com/a/28922140/6929343
    */
    html += '#hrbMessageId {\n' +
            '  display: flex;\n' +
            '  justify-content: space-between;\n' +
            '  color: var(--msgq-header-color);\n' +  // Oct 22/22: always white
            '  background-color: var(--msgq-error-bg-color);\n' +  // can override
            '  border: 4px solid var(--hr-border-color);\n' +
            '  padding: 1rem;\n' +
            '  margin-bottom: 1rem;\n' +
            '}\n'
    // Parent <div> should have border for better looks
    // ONLY for hrb_body, not for tcm_window_body!
    html += '#hrb_body' + ' { border: .2rem solid; padding-bottom: 1rem; }\n'
    // Heading: "Hyperlink Recipe Baker" <h3> styling: .5rem margins all around
    html += '#hrbHdr { margin: .5rem; }\n'
    // Table 100% width, fixed layout
    html += '#' + id + ' table { table-layout: fixed; width: 100%; }\n'
    // Buttons in the first column have fixed width, other column auto.
    html += '#' + id + ' table tr th:nth-child(1){ width: 10rem; }\n'
    // No borders inside the table
    html += '#' + id + ' table, tr, th, td { border: none ! important; }\n'
    // Table details: Space between columns
    html += '#' + id + ' td { padding: .25rem 1rem; }\n' /* Oct 20/22 was padding: 0 1rem; */
    // html += '#' + id + ' td+td { width: auto; }\n'
    // Because Chrome and Firefox vary between shrinking & expanding on hover
    html += '.hrbBtn {\n' +
            '  color: #000;\n' +
            '  background-color: YellowGreen;\n' +
            '  width: 100%;\n' +
            '  padding: 0 .4rem;\n' +
            '  border-radius: .5rem;\n' +
            '  text-align: center;\n' +
            '}\n'
    // Button Hover: border .163rem ok in Firefox but grows in Chrome
    html += '.hrbBtn:hover {\n' +
            '  color: #fff;\n' +
            '  background-color: DarkGreen;\n' +
            '}\n'
    // Column 2 minimum width to give lots of room for URL
    // width and height = 100% for <textarea> if draggable corner resizes
    html += '.hrbInput {\n' +
            '  width: 100%; height: 100%;\n' +
            '  overflow-y: auto;\n'
    // Give resizing grabber if textarea doesn't auto-expand with data overflow
    if (autoRows == "0") { html += '  resize: vertical;\n '}
                    else { html += '  resize: none;\n '}
    html += '}'                     // End of .hrbInput class styling

    html += '</style>'              // End of all styles

    b.innerHTML = html;             // Update TCM Window body

    // Some space between columns
    document.getElementById("hrbTable").style.borderSpacing = ".3rem";
    hrbMessageElm = document.getElementById("hrbMessageId")
    hrbMessageTextElm = document.getElementById("hrbMessageText")
    closeMessage()  // Set display none
    /* Set easier to use element names for inputs by id */
    inputHref = document.getElementById('hrHref');
    inputText = document.getElementById('hrText');
    inputTitle = document.getElementById('hrTitle');
    inputExternal = document.getElementById('hrExternal');
    inputNewWindow = document.getElementById('hrNewWindow');
    inputRecipeHtml = document.getElementById('hrRecipeHtml');
    inputRecipeMd = document.getElementById('hrRecipeMd');

    /* Clipboard read functions (HIGH SECURITY) for href, text and title buttons
    */
    btnHref.addEventListener( 'click', () => { pasteText(inputHref) })
    btnText.addEventListener( 'click', () => { pasteText(inputText) })
    btnTitle.addEventListener( 'click', () => { pasteText(inputTitle) })

    /* Functions to format recipe & put into clipboard (low security) */
    document.getElementById("btnExternal").onclick = doExternal;
    document.getElementById("btnNewWindow").onclick = doNewWindow;
    document.getElementById("btnRecipeHtml").onclick = function() {
        doRecipe("HTML", inputRecipeHtml.value) }
    document.getElementById("btnRecipeMd").onclick = function() {
        doRecipe("Markdown", inputRecipeMd.value) }
    /* onclick= doesn't work inside user script */
    document.getElementById("hrbMessageBtn").onclick = closeMessage;

    /* When user changes a character or pastes directly */
    inputHref.oninput = function() {buildRecipes()};
    inputText.oninput = function() {buildRecipes()};
    inputTitle.oninput = function() {buildRecipes()};
    inputExternal.oninput = function() {buildRecipes()};
    inputNewWindow.oninput = function() {buildRecipes()};

    /* Manual paste event handlers - These work but suppress for now... */
    // hrHref.addEventListener('paste', handlePaste);
}  // End of processHyperlinkRecipe(id)

function showMessage(msg) {
    hrbMessageTextElm.innerHTML = msg
    hrbMessageElm.style.display = "flex"
}

function closeMessage() {
    hrbMessageElm.style.display = "none"
}

function showInfo(msg) {
    hrbMessageElm.style.backgroundColor = "var(--msgq-info-bg-color)"
    splashMessage(msg)
}

function showSuccess(msg) {
    hrbMessageElm.style.backgroundColor = "var(--msgq-success-bg-color)"
    splashMessage(msg)
}

function splashMessage(msg) {
    showMessage(msg)
    setTimeout(()=> {
        closeMessage()
        hrbMessageElm.style.backgroundColor = "var(--msgq-error-bg-color)"
    },1500)  // Display message for 1.5 seconds
}

/*
    OLD FORMAT:
        btnHref.addEventListener( 'click', () => { navigator.clipboard.readText().then(
            clipText => updateInput (inputHref, clipText)); });
    NEW FORMAT:
        btnHref.addEventListener( 'click', () => { pasteText(inputHref) })
*/
async function pasteText(targetElm) {
    closeMessage()  // Clear any old error messages
    try {
        navigator.clipboard.readText().then(
            clipText => updateInput (targetElm, clipText))
    }
    catch (error) {
        const link = '<a href="https://www.pippim.com/programs/hyperlink.html' +
                     '#read-clipboard-permissions" target="_blank"  ' +
                     'title="Review how to grant read clipboard permission">' +
                     'grant clipboard permission</a>'
        showMessage ("Permissions for reading clipboard not set. "+
                     "Either " + link + " or use " +
                     "<kbd>Ctrl</kbd>&nbsp;+&nbsp;<kbd>V</kbd> " +
                     "to paste clipboard contents.")
    }
}

async function pasteImage() {
    try {
        const permission = await navigator.permissions.query({ name: 'clipboard-read' });
        if (permission.state === 'denied') {
            throw new Error('Not allowed to read clipboard.');
        }
        const clipboardContents = await navigator.clipboard.read();
        for (const item of clipboardContents) {
            if (!item.types.includes('image/png')) {
                throw new Error('Clipboard contains non-image data.');
            }
            const blob = await item.getType('image/png');
            destinationImage.src = URL.createObjectURL(blob);
        }
    }
    catch (error) {
        console.error(error.message);
    }
}

/* Shared function to read clipboard and update input */

var oldClip = null
var newClip = null
var validUrlExists = false

function updateInput (elm, text) {
    // Pasting from clipboard could have line break at end of string
    var text = text.replace(/\n$/, '')
    closeMessage()  // Clear any old error messages
    if (text == null || text == "") {
        showMessage("Clipboard is empty. Make sure you copy text first.")
        return
    }
    if (text.length > 2048) {
        showMessage("Clipboard text > 2048 characters. Verify what was copied.")
        return
    }
    oldClip = elm.value
    elm.value = text            // Set value of Input to clipboard contents
    newClip = text
    if (autoRows != "0") { setTextAreaRows(elm) }
    buildRecipes()
    if (elm == inputHref) {
        validateUrl(text)
        if (validUrlExists == false)
            return
    }

    showInfo("Clipboard successfully read.")
}

/* Non-clipboard reading functions called on button click */
var useExternal = false;
var stringExternal = " 🔗";  // TODO: Make into local storage option

function doExternal () {
    // If external off turn on, if on then turn off
    useExternal = !useExternal;
    if (useExternal) { inputExternal.value = stringExternal; }
                else { inputExternal.value = ""; }
    // TODO: If user keys in string, save as stringExternal?
    buildRecipes();
}

var useNewWindow = false;
var stringNewWindow = 'target="_blank"';

function doNewWindow () {
    // If external off turn on, if on then turn off
    useNewWindow = !useNewWindow;
    if (useNewWindow) {
        inputNewWindow.value = stringNewWindow;
        showInfo("Link will open in new Browser Window or Tab.")
    } else {
        inputNewWindow.value = "";
        showInfo("Link will open in same Browser Tab.")
    }
    buildRecipes();
}
/* OLD independent functions
function doRecipeHtml () {
    // TODO: check mandatory fields href and text are non-blank
    buildRecipes()
    validateUrl(inputHref.value)
    if (validUrlExists == true)
        window.navigator.clipboard.writeText(inputRecipeHtml.value)
        showSuccess("HTML hyperlink saved to clipboard.")
}
function doRecipeMd () {
    // TODO: Can RecipeHtml and RecipeMd be combined into single function?
    buildRecipes()
    validateUrl(inputHref.value)
    if (validUrlExists == true)
        window.navigator.clipboard.writeText(inputRecipeMd.value)
        showSuccess("Markdown hyperlink saved to clipboard.")
}
*/
function doRecipe (type, text) {
    // Write text (inputRecipeHtml.value or inputRecipeMd.value) to clipboard
    // If either mandatory fields are empty then do nothing
    if (inputHref.value === "") {
        showMessage("Hyperlink URL (href) is blank. " + type + " Recipe can't be baked.")
        return
    }
    if (inputText.value === "") {
        showMessage("Hyperlink Name (text) is blank. " + type + " Recipe can't be baked.")
        return
    }
    buildRecipes()
    validateUrl(inputHref.value)

    if (validUrlExists) {
        window.navigator.clipboard.writeText(text)
        showSuccess(type + " Hyperlink saved to clipboard.<br>" + text)
    }
    else
        showMessage("Invalid Hyperlink URL(href). " + type + " Recipe can't be baked.")

}

function buildRecipes () {
    /* Create HTML & Markdown recipes using ingredients */

    // If both mandatory fields are empty then do nothing - DOES NOTHING?
    if (inputHref === "" && inputText === "") {
        inputRecipeHtml.value = ""
        inputRecipeMd.value = ""
    }

    // Convert special characters to HTML &code; values
    var href = sanitizeValue(inputHref.value)
    var text = sanitizeValue(inputText.value)
    var title = sanitizeQuote(inputTitle.value)

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
    if (autoRows != "0") { setTextAreaRows(inputRecipeHtml) }

    inputRecipeMd.value =
        "[" + text + "](" + href + titleMd + newMd
    if (autoRows != "0") { setTextAreaRows(inputRecipeMd) }
}

function sanitizeValue (value) {
    // Special characters in href, text and title attributes need HTML &code;
    // Regex method for multiples: https://stackoverflow.com/a/3971261/6929343
    // Can be enhanced. See:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
    value = value.replace(/\&/g, '&amp;')  // Must be the first one!
    value = value.replace(/\</g, '&lt;')
    value = value.replace(/\>/g, '&gt;')
    // value = value.replace(/\(/g, '&lpar;')  // Not needed in Name(text)
    // value = value.replace(/\)/g, '&rpar;')  // Irrelevant in other two fields
    value = value.replace(/\[/g, '&lbrack;')
    value = value.replace(/\]/g, '&rbrack;')
    value = value.replace(/\'/g, '&apos;')
    return value.replace(/\"/g, "&quot;")
}

function sanitizeQuote (value) {
    // Special characters in title attributes requiring HTML &code;
    // Regex method for multiples: https://stackoverflow.com/a/3971261/6929343
    return value.replace(/\"/g, "&quot;")
}

var lastUrl = null
var lastTime = null
var validUrlSyntax = null

function validateUrl(Url) {
    if (Url == lastUrl) {
        return validUrlExists  // Same URL would be same 404 status
    }
    validUrlExists = false
    validUrlSyntax = isValidUrl(Url)
    if (validUrlSyntax == false) {
        showMessage('The website address (URL) shown below ' +
                    'has invalid format:<br><br>&ensp;-&emsp;' + Url)
        return false
    }

    if (lastTime == null) {
        // TODO: This is only being called during paste inputHref, not typing
        //       This is also called when Baking Recipes to clipboard
        //       If we were validating whilst typing though we would only do
        //       so after a few seconds since last key or when focus moves
        //       out of field or when mouse moves out of bounding box.
        lastTime = performance.now()
    }

    var startTime = performance.now()
    validUrlExists = UrlExists(Url)
    var endTime = performance.now()
    var elapsedTime = endTime - startTime
    if (validUrlExists == false)
        showMessage('The website address (URL) does not exist (404 error):\n\n' + Url)

    lastUrl = Url   // If next time same URL we can skip the tests for 404.
    return validUrlExists
}

export function isValidUrl(Url) {
    // See:  https://stackoverflow.com/a/49849482
    var res = Url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    // return (res !== null)  // Fails on URL: &&
    return (res != null)
}

export function UrlExists(Url) {
    // See: https://stackoverflow.com/a/31936894
    var http = new XMLHttpRequest();
    return true;
    /* The rest of this is hopeless
    http.open('HEAD', Url, false);
    http.send();
    return http.status!=404;
    */
    /* https://stackoverflow.com/questions/24371734/firefox-cross-origin-request-blocked-despite-headers

         Cross-Origin Request Blocked: The Same Origin Policy
         disallows reading the remote resource at
         https://stackoverflow.com/questions/13591339/html2canvas-offscreen.
         (Reason: CORS header “Access-Control-Allow-Origin” missing).
    */
}

export function setTextAreaRows (textarea) {
    var minRows = Number(autoMinRows)       // autoMinRows must be declared globally above
    var maxRows = Number(autoRows)          // E.G. var autoRows = "5"; sets 5 maximum rows
    // CSS overrides 'data-min = "_"' or 'data-max = "_"'.  Where _ = number of rows.
    if (textarea.dataset.hasOwnProperty('min')) { minRows = Number(textarea.dataset.min) }
    if (textarea.dataset.hasOwnProperty('max')) { maxRows = Number(textarea.dataset.max) }
    var clone = textarea.cloneNode(true);   // Make clone of <textarea> element
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clone.left = String(w * -2) + "px";     // Set clone position left off of screen
    clone.style.width = textarea.offsetWidth.toString() + 'px';
    clone.rows = minRows.toString();        // Set clone # of rows to minimum required
    document.body.appendChild(clone);       // Add clone to webpage but it's out of view
    if (clone.offsetHeight < clone.scrollHeight) {
        for (var rows = minRows; rows <= maxRows; rows++) {
            clone.rows = rows.toString();   // Set new number of rows then test height
            if (clone.offsetHeight >= clone.scrollHeight) { break; }}}
    textarea.rows = clone.rows;             // Update real <textarea>
    clone.remove();                         // Remove cloned <textarea>
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
