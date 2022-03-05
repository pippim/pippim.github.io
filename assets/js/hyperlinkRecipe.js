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

function paintTable (b) {

    html = '<h3>Hyperlink Recipe Baker</h3>\n'

    html += '<table id="hrTable" class="hr_table">\n'
    html += '<tr id="ingredients">\n'
    html += '<th>Ingredients</th>\n'
    html += '<th>From the clipboard or set options</th>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" onclick="doHref()" ' +
            'title="Insert browser address bar string (from the clipboard)"' +
            '>URL (href)</button></td>\n'
    html += '<td><div id="hrHref" class="hr_href>\n'
    html += '<input type="string">https://pippim.github.io\n'
    html += '</div></td>\n'
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
    html += '<td><div id="hrRecipeHtml" class="hr_recipe_html>\n'
    html += '<input type="string">Copy HTML Hyperlink Recipe to clipboard\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button class="hrBtn" onclick="doRecipeMarkdown()"' +
            'title="Copy Markdown recipe to the clipboard. Then you can paste in document"' +
            '>Markdown</button></td>\n'
    html += '<td><div id="hrRecipeMd" class="hr_recipe_md>\n'
    html += '<input type="string">Copy Markdown Hyperlink Recipe to clipboard\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '</table>\n'            // End of our table

    /* Set styling for table elements */
    html += '<style>\n'             // Styling for Hyperlink Recipe table

    html += 'h3 {\n'                // "Hyperlink Recipe Baker" <h3> styling
    html += '  margin-top: .5rem;\n'
    html += '  margin-bottom: .5rem;\n'
    html += '}\n'

    html += 'td {\n'                // Table details
    html += '  padding: 0 1rem;\n'  // Space between columns
    html += '}\n'

    html += '.hrBtn {\n'            // Don't use ".button" which parent may have!!!
    html += '  background-color: YellowGreen;\n'
    html += '  width: 100%;\n'
    html += '  border-radius: .5rem;\n'
    // html += '  margin: .25rem;\n'  // Override, too much left-ness going on
    // html += '  padding: 0px;\n'     // For centering to work!
    html += '  text-align: center;\n'
    html += '}\n'                   // End of button styling
    html += '.hrBtn:hover {\n'
    html += '    color: #fff;\n'
    html += '    background-color: DarkGreen;\n'
    html += '    border: .2rem solid Black;\n'
    html += '  }\n'                 // End of button hover styling

    html += '</style>\n'            // End of all styles

    b.innerHTML = html;             // Update TCM Window body
    document.getElementById("hrTable").style.borderSpacing = "5px";
    setButtonStyles();
}

function setButtonStyles () {
}

function doHref () {}
function doText () {}
function doTitle () {}
function doExternal () {}
function doNewWindow () {}
function doRecipeHtml () {}
function doRecipeMarkdown () {}
function doReset () {}

/* End of /assets/js/hyperlinkRecipe.js */
