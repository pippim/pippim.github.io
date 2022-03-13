---
---
// The Cookie Machine (TCM for short)

// Note: Requires search.js to be loaded first for getJSON function.
//       search.js defines global variables
//       tcm_window defined in _includes/tcm-window.html

// Button Image source: https://www.cleanpng.com/free/

// imported functions.  Parent needs <script type="module"...
// See: /_layouts/program.html, etc.
import {processHyperlinkRecipe} from './hyperlinkRecipe.js';

// Webpage may have <div id="hrb_body" defined. If so populate it
/* Test if this is breaking stuff. */
window.addEventListener('DOMContentLoaded', (event) => {
    // https://stackoverflow.com/a/42526074/6929343
    var myEle = document.getElementById("hrb_body");
    if(myEle != null){
        processHyperlinkRecipe('hrb_body');
    }
});

// Draggable window: https://www.w3schools.com/howto/howto_js_draggable.asp
// Make the DIV element draggable:
dragElement(document.getElementById("tcm_window"));

function dragElement(elm) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elm.id + "_header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elm.id + "_header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elm.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elm.style.top = (elm.offsetTop - pos2) + "px";
    elm.style.left = (elm.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.querySelector('#tcm_button').addEventListener('click', () => {
  // Reveal tcm_window and move to top right
  // document.querySelector('#tcm_window').style.cssText = `
  //  display: block;
  //  top: 20;
  //  right: 20;
  //`;  // top & right effect here is to move to TCM Button position
  document.querySelector('#tcm_window').style.display = "block";
  // Make tcm_button invisible
  document.querySelector('#tcm_button').style.cssText = `
    color: #FFFFFF00;
    border: none;
  `;
});

document.querySelector('#tcm_window_close').addEventListener('click', () => {
  // Hide tcm_window
  document.querySelector('#tcm_window').style.display = "none";
  // Make tcm_button visible
  document.querySelector('#tcm_button').style.cssText = `
    color: #FFFFFF;
    border: 2px solid white;`;
});

var website_tree = []

const b = document.getElementById('tcm_window_body')  // Website tree entries html codes
var oldFontSize = null      // Save for when LineDraw changes
var oldLineHeight = null
var html = null             // Late declaration for html not defined error popping up

document.querySelector('#tcm_display_cloud').addEventListener('click', () => {
    // TODO: rename search_url.json to search_urls.json
    fetch('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/website_tree.json')
      .then((response) => response.json())
      .then((website_tree) => {
        website_tree_to_html(website_tree);
        // console.log('Here is the json!', website_tree);
      });
});

document.querySelector('#tcm_display_home').addEventListener('click', () => {
    home_page_to_html();
});

document.querySelector('#tcm_display_local').addEventListener('click', () => {
    // fm_var cookie, search_url.json and search_words.json must already be
    // globally defined.
    local_storage_to_html();
});

document.querySelector('#tcm_hyperlink_recipe').addEventListener('click', () => {
    // fm_var cookie, search_url.json and search_words.json must already be
    // globally defined.
    restoreOldFont(b);
    processHyperlinkRecipe('tcm_window_body')
});

function home_page_to_html() {
    restoreOldFont(b);
    html = "<p>";
    html += "<h3>The Cookie Machine (TCM) Future Applications:</h3>\n";
    html += "  ☑ View cookies used on the {{ site.title }} website.<br>\n";
    html += "  ☑ Send cookie via mail. For backup or sharing.<br>\n";
    html += "  ☑ Receive cookie via mail. From yourself or colleague.<br>\n";
    html += "  ☑ Countdown Timers. For multi-phase time sensitive missions.<br>\n";
    html += "  ☑ And in the future... Other ways of sharing/using Cookies.\n";
    html += "</p>";
    b.innerHTML = html;              // Update TCM Window body
}

function website_tree_to_html(results) {
    if (results.length == 0) {
        html = "<h3> 🔍 &emsp; No website_tree found!</h3>\n";
        html += "<p>An error has occurred.<br><br>\n";
        html += "Try again later. If error continues contact {{ site.tittle }}.<br><br>\n";
        b.innerHTML = html;
        return;
    } else if (results.length == 1) {
        var html = '<h3 id="tcmHdr">1 {{ site.title }} website entry found.</h3>\n';
    } else {
        var html = '<h3 id="tcmHdr">' + results.length.toString() +
                   ' {{ site.title }} website entries found.</h3>\n';
    }

    setLineDrawFont(b); // Not needed with <code> but need line-height
    html += "<p>\n";
    for (var i = 0; i < results.length; i++) {
        html += results[i] + "<br>\n";
    }
    html += "</p>";

    html += '<style> #tcmHdr {\n'    // Heading: "999 Pippim website entries found." <h3> styling
    html += '  margin-top: .5rem;\n'
    html += '  margin-bottom: 0px;\n'
    html += '} </style>\n'

    b.innerHTML = html; // Update TCM Window body

}

function local_storage_to_html() {
    restoreOldFont(b);
    html = "<p>";
    html += "<h3>The Cookie Machine (TCM) Future Local Storage:</h3>\n";
    html += "  ☑ Display cookies used on the {{ site.title }} website.<br>\n";
    html += "  ☑ Display cache usage.<br>\n";
    html += "</p>";
    b.innerHTML = html;              // Update TCM Window body
}

/* Further research

document.getElementById("demo").style.font = "italic bold 20px arial,serif";

font-style
font-variant
font-weight
font-size
line-height
font-family
*/

function setLineDrawFont(elm) {
    let compStyles = window.getComputedStyle(elm);
    // Old font size and line height declared globally so they can be restore by Home button
    oldFontSize = compStyles.getPropertyValue('font-size');
    oldLineHeight = compStyles.getPropertyValue('line-height');
    // console.log("Font size: " + oldFontSize + " Line height: " + oldLineHeight);
    // font-family from: _sass/jekyll-theme-cayman.scss line 36
    elm.style.cssText = `
      font-family: Consolas, "Liberation Mono", Menlo, Courier, "Courier New", monospace;
      line-height: .55;
    `;
    // line-height: 1.163; <-- this was above
}

function restoreOldFont(elm) {
    if (oldFontSize != null) {
        // From _sass/jekyll-theme-cayman.scss line 227
        elm.style.cssText = `
          font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: .55;
        `;
        //  line-height: 1.5; <-- Old before white-space: pre;
    }
}

// Setup The Cookie Machine Window's home page text inner HTML
home_page_to_html();

// Setup hdr-bar buttons with tooltips
function set_hdr_tooltips () {
    var hdr_bars = document.getElementsByClassName('hdr-bar');
    var hdr_bars_cnt = hdr_bars.length;
    // console.log("hdr_bars_cnt: " + hdr_bars_cnt);
    // var newTextForNotesClass = "This is the new title text for the notes-class-name group.";

    var anchors = document.querySelectorAll('.hdr-bar > a');
    for (var i = 0; i < anchors.length; i++) {
        var itm = anchors[i]
        var h = itm.href;           // Get href ID
        var t = itm.text;           // Get link text
        // console.log("text: " + t);
        var title = "";

        if      (t == 'Top')  { title = "Go to top of page"; }
        else if (t == 'ToS')  { title = "Go to top of section"; }
        else if (t == 'ToC')  { title = "Go to Table of Contents"; }
        else if (t == 'Skip') { title = "Skip this section and go to next section"; }
        else    { console.log("Unknown link text: " + t + " href: " + h); }

        if (title != "") { itm.title = title; }
    }
}

// Assign tooltip (title=) to section navigation bar buttons
set_hdr_tooltips();

/* End of /assets/js/theCookieMachine.js */
