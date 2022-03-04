---
---
/* hyperlinkRecipe.js - Create hyperlinks from Clipboard pastes (at least two).
                        Export hyperlinks to Clipboard
                            Recipe 1 = HTML format
                            Recipe 2 = Markdown format

   Note:    Uses export processHyperlinkRecipe(className) so parent Javascript
            function uses:

                import processHyperlinkRecipe from 'hyperlinkRecipe.js';

            Assuming this module is called from TCM, the Top level HTML must be using:
                 <script type="module" src="/assets/js/theCookieMachine.js" ></script>

*/

export function processHyperlinkRecipe(b) {
    // b = TCM Window Body

    var html = "<p>";
    html += "The Hyperlink Recipe Baker:<br><br>\n";
    html += "  ☑ Paste URL (href) from clipboard. *<br>\n";
    html += "  ☑ Paste Name (text) from clipboard. *<br>\n";
    html += "  ☑ Paste Tooltip (title) from clipboard.<br>\n";
    html += "  ☑ Specify external link icon.<br>\n";
    html += "  ☑ Specify open in new window/tab.\n";
    html += "</p>";
    b.innerHTML = html;              // Update TCM Window body
}

/* End of /assets/js/hyperlinkRecipe.js */
