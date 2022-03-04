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
    html += "Ingredients - From clipboard. '*' = Mandatory<br>\n";
    html += "&emsp;URL (href) *<br>\n";
    html += "&emsp;Name (text) *<br>\n";
    html += "&emsp;Tooltip (title)<br>\n";
    html += "Options - On/Off<br>\n";
    html += "&emsp;External Icon.<br>\n";
    html += "&emsp;New Window/Tab.<br>\n";
    html += "Recipes - To clipboard<br>\n";
    html += "&emsp;HTML<br>\n";
    html += "&emsp;Markdown\n";
    html += "</p>";
    b.innerHTML = html;              // Update TCM Window body
}

/* End of /assets/js/hyperlinkRecipe.js */
