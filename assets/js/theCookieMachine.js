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

/* include tcmButtonVisibility.js code shared by:
    /assets/js/theCookieMachine.js - Draggable Modal Dialog
    /tcm.md - The Cookie Machine documentation webpage
*/
{% include tcmButtonVisibility.js %}

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
    buildConfigYml();    // Required by two TCM Window Buttons - Home & Webpage Info
    var html = htmlFrontMatter(configYml, "Site Front Matter ('_config.yml')");
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
    // fm_var cookie, search_url.json and search_words.json must already be
    // globally defined.
    local_storage_to_html();
});

document.querySelector('#tcm_hyperlink_recipe').addEventListener('click', () => {
    processHyperlinkRecipe('tcm_window_body');
});

document.querySelector('#tcm_webpage_info').addEventListener('click', () => {
    // Display webpage info - filename, front matter and text (WIP)
    // raw_url set in search.js loaded before us
    webpage_info_to_html();
});

document.querySelector('#tcm_cookie_jar').addEventListener('click', () => {
    // Display webpage info - filename, front matter and text (WIP)
    // raw_url set in search.js loaded before us
    // https://www.javascripttutorial.net/web-apis/javascript-notification/
    const greeting = new Notification('Multi-Timer is running');
    setTimeout(() => greeting.close(), 10*1000);
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


function webpage_info_to_html() {
    buildConfigYml();    // Required by two TCM Window Buttons - Home & Webpage Info
    var urlMarkdown = getMarkdownFilename();

    fetch(urlMarkdown)
        .then((response) => response.text())
        .then((results) => {
            var results = results.split("\n")  // Convert string into array
            // alert('results.length: ' + results.length)
            var front_yml = getFrontMatter(results)
            // alert(front_yml)
            // console.log('Here is the text file:\n' + config_yml);
            var html = htmlFrontMatter(front_yml, "Current Page Front Matter");
            b.innerHTML = html; // Update TCM Window body
        });
}

function getMarkdownFilename() {
    // WARNING: Extremely Jekyll Dependent for posts directory structure
    var urlPath = location.pathname;
    var urlParts = location.pathname.split("/");
    // if urlPath is simply / it's the root /index.html, else assume no suffixes
    if (urlPath == "/") { var full = "/index.html" }
                   else { var full = "/" + urlParts[1]; }

    // If length of parts = 5 then we know it's a post using subdirectories
    if (urlParts.length == 5) {
        // NOTE: parts[0] is always empty field before leading /
        // Replace '/yyyy/mm/dd/Title' with 'yyyy-mm-dd-Title'
        const root = urlParts[1] + "-" + urlParts[2] + "-" +
                     urlParts[3] + "-" + urlParts[4]
        // prepend /_posts/ unless by year use '_posts/yyyy/'
        if (flagPostsByYear.toLowerCase() != "true") { full = "/_posts/" + root; }
        else { full = "/_posts/" + urlParts[1] + "/" + root; }
    }

    return raw_url + full.replace('.html', '.md');
}

function getFrontMatter(arrText) {
    // Extract front matter at top of text file
    var arrFrontMatter = []
    if (arrText[0].trim() == "---") {
        for (var i = 1; i < arrText.length; i++) {
            if (arrText[i].trim() == "---") { break }
            arrFrontMatter.push(arrText[i]) } }

    return arrFrontMatter
}

async function load_config_yml() {
    // Get from internet and store in session
    fetch(raw_url + '/_config.yml')
        .then((response)=>response.text())
        .then((responseJson)=>{
            config_yml = responseJson;
            // https://stackoverflow.com/a/32905820/6929343
            sessionStorage.setItem('config_yml', config_yml);
        });
}

function local_storage_to_html() {
    /*
        Downloaded cookies location:
            https://stackoverflow.com/a/18678698/6929343
        Upload (drag & drop):
            https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
        Caching (local storage) in browser:
            https://jonmeyers.io/blog/simple-caching-with-local-storagejav
        Convert to base64 and back again for email attachments:
            https://stackoverflow.com/a/38134374/6929343
        Get and set list of links visited:
            https://stackoverflow.com/a/9970626/6929343
        Cross fading images:
            http://css3.bradshawenterprises.com/cfimg/
        Cross fading checkbox:
            https://stackoverflow.com/a/17795397/6929343
        Shortest code switching images:
            https://stackoverflow.com/a/43661406/6929343


    */

    // if ('caches' in window){
    //    alert('caches found in window');
    // }
    var cntCaches = 0
    caches.keys().then(function(keyList) {
        cntCaches++;
    });
    //console.log("cntCaches: " + cntCaches)

    /* Future use */

    var myCookies = getCookies();
    // Object.keys(myCookies).forEach(prop => console.log(prop))

    // https://stackoverflow.com/a/921808/6929343
    for (var key in myCookies) {
        // skip loop if the property is from prototype
        if (!myCookies.hasOwnProperty(key)) continue;

        var obj = myCookies[key];
        var value = ""
        for (var prop in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(prop)) continue;

            // Key=Prop: 0=M 1=o 2=r 3=e spells out "More"
            // alert(prop + " = " + obj[prop]);
            value += obj[prop];
        }
        //alert("key: " + key + " | value: " + value)
    }

    // const items = { ...localStorage };
    // console.log("items: " + items)

    // var archive = allStorage();
    // console.log("archive: " + archive)

    var html = htmlVisibilitySwitches();

    // Function shared with tcm.md in _includes/tcmButtonVisibility.js
    html += htmlSearchStats();
    b.innerHTML = html;              // Update TCM Window body

    /*  Process slider switches - shared  with ~/tcm.md
        USE: % include tcmButtonVisibility.js %}
    */
    tcmButtonVisibility()
}

function getCookies() {
    // https://stackoverflow.com/a/252959/6929343
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
        var pair = pairs[i].split("=");
        cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
}

function getStorage() {
    // https://stackoverflow.com/a/17748203/6929343
    var archive = {}, // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        archive[ keys[i] ] = localStorage.getItem( keys[i] );
    }

    return archive;
}

function allStorage() {
    // https://stackoverflow.com/a/17748203/6929343
    var archive = {}, // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        archive[ keys[i] ] = localStorage.getItem( keys[i] );
    }

    return archive;
}

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