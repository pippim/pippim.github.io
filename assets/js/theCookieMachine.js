---
---
// The Cookie Machine (TCM for short)

// Note: Requires search.js to be loaded first for getJSON function.
//       search.js defines global variables
//       tcm_window defined in _includes/tcm-window.html

// Button Image source: https://www.cleanpng.com/free/

// imported functions.  Parent needs <script type="module"...
// See: /_layouts +> /default.html, / hrb.html, /program.html, etc.
import {processHyperlinkRecipe} from './hyperlinkRecipe.js';
import { getCookie , setCookie } from './theCookieJar.js';

/* include tcm-common-code.js code shared by:
    /assets/js/theCookieMachine.js - Draggable Modal Dialog
    /tcm.md - The Cookie Machine documentation webpage
*/
{% include tcm-common-code.js %}

// Webpage (hrb.md) may have <div id="hrb_body" defined. If so populate it
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
    // https://stackoverflow.com/a/52554777/6929343

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
  // TCM button click on webpage header
  document.querySelector('#tcm_window').style.cssText = `
    display: flex;
    flex-direction: column;
  `;
  // Make tcm_button invisible
  document.querySelector('#tcm_button').style.cssText = `
    opacity: 0.0;
    background: transparent;
    background-image: none;
    border: none;
  `;
});

document.querySelector('#tcm_window_close').addEventListener('click', () => {
  // Hide tcm_window
  document.querySelector('#tcm_window').style.display = "none";
  // Make tcm_button (main page header) visible?
  if (vis_this_page == "true") { makeTcmButtonVisible() }
});


const b = document.getElementById('tcm_window_body')  // Website tree entries html codes

document.querySelector('#tcm_display_home').addEventListener('click', () => {
    // arrConfigYml in search.js required by two TCM Window Buttons - Home & Webpage Info
    var html = htmlFrontMatter(arrConfigYml, "Site Front Matter ('_config.yml')");
    b.innerHTML = html; // Update TCM Window body
});

document.querySelector('#tcm_display_cloud').addEventListener('click', () => {
    // Display Website Tree
    fetch(raw_url + '/assets/json/website_tree.json')
      .then((response) => response.json())
      .then((website_tree) => {
        var html = htmlWebsiteTree(website_tree);
        b.innerHTML = html; // Update TCM Window body
      });
});

document.querySelector('#tcm_display_local').addEventListener('click', () => {
    // Display cookies and cache (WIP)
    var html = htmlVisibilitySwitches();
    html += htmlSearchStats();
    html += htmlScreenInfo();
    b.innerHTML = html;

    /*  Process TCM Window Button Visibility slider switches - shared  with ~/tcm.md
        USE: % include tcm-common-code.js %} */
    tcmButtonVisibility()});

document.querySelector('#tcm_hyperlink_recipe').addEventListener('click', () => {
    processHyperlinkRecipe('tcm_window_body');
});

document.querySelector('#tcm_webpage_info').addEventListener('click', () => {
    // Display webpage info - filename, front matter and text (WIP)
    // raw_url set in search.js loaded before us
    var urlMarkdown = getMarkdownFilename();

    fetch(urlMarkdown)
        .then((response) => response.text())
        .then((results) => {
            var results = results.split("\n")  // Convert string into array
            var front_yml = getFrontMatter(results)
            var html = htmlFrontMatter(front_yml, "Current Webpage Front Matter");
            html += htmlWindowInfo();
            b.innerHTML = html; // Update TCM Window body
        });
});

document.querySelector('#tcm_cookie_jar').addEventListener('click', () => {
    // Display webpage info - filename, front matter and text (WIP)
    // raw_url set in search.js loaded before us
    // https://www.javascripttutorial.net/web-apis/javascript-notification/
    var html = '<div class="container">\n' +
               '<h1>JavaScript Notification API Demo</h1>\n' +
                '<div class="error"></div>\n' +
                '</div>'
    var fileDownload="https://pippim.com/assets/img/TCM Header with Gingerbread Man.png"
    alert('About to download ' + fileDownload);
    b.innerHTML = html;
    let downloading = browser.downloads.download({url: fileDownload})
    console.log("downloading: " + downloading)
(async () => {
    // create and show the notification
    const showNotification = () => {
        // create a new notification
        const notification = new Notification('JavaScript Notification API', {
            body: 'File has been downloaded.',
            icon: '{{ site.url }}/favicon.png'
        });

        // close the notification after 10 seconds
        setTimeout(() => {
            notification.close();
        }, 10 * 1000);

        // navigate to a URL when clicked
        notification.addEventListener('click', () => {

            window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');
        });
    }

    // show an error message
    const showError = () => {
        const error = document.querySelector('.error');
        error.style.display = 'block';
        error.textContent = 'You blocked the notifications';
    }

    // check notification permission
    let granted = false;

    if (Notification.permission === 'granted') {
        granted = true;
    } else if (Notification.permission !== 'denied') {
        let permission = await Notification.requestPermission();
        granted = permission === 'granted' ? true : false;
    }

    // show notification or error
    granted ? showNotification() : showError();

})();
});

function introduction_to_html() {
    var html = "<p>";
    html += "<h3>The Cookie Machine (TCM) Future Applications:</h3>\n";
    html += "  ☑ View cookies used on the {{ site.title }} website.<br>\n";
    html += "  ☑ Send cookie via mail. For backup or sharing.<br>\n";
    html += "  ☑ Receive cookie via mail. From yourself or colleague.<br>\n";
    html += "  ☑ Countdown Timers. For multi-phase time sensitive missions.<br>\n";
    html += "  ☑ And in the future... Other ways of sharing/using Cookies.\n";
    html += "</p>";
    b.innerHTML = html;              // Update TCM Window body
}

introduction_to_html()  // Load immediately

// Assign tooltip (title=) to section navigation bar buttons
set_hdr_tooltips();
// Add tooltips to hdr-bar buttons on all blog post pages with navigation buttons
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


/* End of /assets/js/theCookieMachine.js */