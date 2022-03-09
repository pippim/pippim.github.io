/* /assets/js/hrb.js - Stub for importing Hyperlink Recipe Baker

  Drop this code into your main JavaScript file

*/

import {processHyperlinkRecipe} from './hyperlinkRecipe.js';

// Webpage may have <div id="hrb_body" defined. If so populate it
window.addEventListener('DOMContentLoaded', (event) => {
    // https://stackoverflow.com/a/42526074/6929343
    var myEle = document.getElementById("hrb_body");
    if(myEle != null){
        processHyperlinkRecipe('hrb_body');
    }
});

/* End of /assets/js/hrb.js */
