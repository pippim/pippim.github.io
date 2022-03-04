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

export function processHyperlinkRecipe(b) {
    // b = TCM Window Body

    //console.log("b: " + b)
    //const b2 = document.getElementById('tcm_window_body')
    //console.log("b2: " + b2)
    html = "<p>";
    html += "<h3>Hyperlink Recipe Baker</h3>\n";
    html += "Ingredients - Get from clipboard. '*' = Mandatory<br>\n";
    html += "&ensp;URL (href) *<br>\n";
    html += "&ensp;Name (text) *<br>\n";
    html += "&ensp;Tooltip (title)<br>\n";
    html += "Options - On/Off<br>\n";
    html += "&ensp;External Icon.<br>\n";
    html += "&ensp;New Window/Tab.\n";
    html += "Recipes - Put into clipboard<br>\n";
    html += "  ☑ Specify external link icon.<br>\n";
    html += "  ☑ Specify open in new window/tab.\n";
    html += "</p>";
    b.innerHTML = html;              // Update TCM Window body
}

/* End of /assets/js/hyperlinkRecipe.js */
