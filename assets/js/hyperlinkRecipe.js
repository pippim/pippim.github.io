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

    html = '<table id="hrTable" class="hr_table">\n'
    html += '<tr id="ingredients">\n'
    html += '<th>Get Clipboard</th>\n'
    html += '<th>Clipboard Results</th>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button id="button" onclick="doHref()">URL (href)</button></td>\n'
    html += '<td><div id="hrHref" class="hr_href>\n'
    html += '<input type="string">https://pippim.github.io\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button id="button" onclick="doText()">Name (text)</button></td>\n'
    html += '<td><div id="hrText" class="hr_text>\n'
    html += '<input type="string">This is a very long name for the website description\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button id="button" onclick="doTitle()">Tooltip (title)</button></td>\n'
    html += '<td><div id="hrTitle" class="hr_title>\n'
    html += '<input type="string">Hover mouse over link and get this tooltip\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button id="button" onclick="doExternal()">External link</button></td>\n'
    html += '<td><div id="hrExternal" class="hr_external>\n'
    html += '<input type="string">Append external link icon after Name (text)\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button id="button" onclick="doNewWindow()">New Window</button></td>\n'
    html += '<td><div id="hrNewWindow" class="hr_new_window>\n'
    html += '<input type="string">Open link in New Browser Window or Tab\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr id="recipes">\n'
    html += '<th>Set Clipboard</th>\n'
    html += '<th>Recipe</th>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button id="button" onclick="doRecipeHtml()">HTML</button></td>\n'
    html += '<td><div id="hrRecipeHtml" class="hr_recipe_html>\n'
    html += '<input type="string">Copy HTML Hyperlink Recipe to clipboard\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '<tr>\n'
    html += '<td><button id="button" onclick="doRecipeMarkdown()">Markdown</button></td>\n'
    html += '<td><div id="hrRecipeMd" class="hr_recipe_md>\n'
    html += '<input type="string">Copy Markdown Hyperlink Recipe to clipboard\n'
    html += '</div></td>\n'
    html += '</tr>\n'

    html += '</table>'
    b.innerHTML = html;              // Update TCM Window body
    document.getElementById("hrTable").style.borderSpacing = "5px";

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
