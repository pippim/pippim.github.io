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
  /*
  document.querySelector('#tcm_window').style.display = "block";
  */
  /* https://stackoverflow.com/a/38066257/6929343  added*/
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
  // Make tcm_button visible
  document.querySelector('#tcm_button').style.cssText = `
      opacity: 1.0;
      border: thin solid black;
      border-radius: .5rem;
      background-image: url({{ site.url }}/assets/img/icons/gingerbread_3.png),
                        url({{ site.url }}/assets/img/icons/button_background.png);
      background-repeat: no-repeat;
      background-size: cover;
   `;
});


const b = document.getElementById('tcm_window_body')  // Website tree entries html codes
var oldFontSize = null      // Save for when LineDraw changes
var oldLineHeight = null
var configYml = []          // Array containing _config.yml
var flagPostsByYear = null  // true or false from _config.yml key posts_by_year

document.querySelector('#tcm_display_home').addEventListener('click', () => {
    restoreOldFont(b);
    front_matter_to_html(configYml, "Site Front Matter ('_config.yml')");
});

document.querySelector('#tcm_display_cloud').addEventListener('click', () => {
    // This function changes system font so others call restoreOldFont(b); to restore
    fetch(raw_url + '/assets/json/website_tree.json')
      .then((response) => response.json())
      .then((website_tree) => {
        website_tree_to_html(website_tree);
        // console.log('Here is the json:\n' + website_tree);
      });
});

document.querySelector('#tcm_display_local').addEventListener('click', () => {
    // Display cookies and cache (WIP)
    restoreOldFont(b);
    // fm_var cookie, search_url.json and search_words.json must already be
    // globally defined.
    local_storage_to_html();
});

document.querySelector('#tcm_hyperlink_recipe').addEventListener('click', () => {
    restoreOldFont(b);
    processHyperlinkRecipe('tcm_window_body');
});

document.querySelector('#tcm_webpage_info').addEventListener('click', () => {
    restoreOldFont(b);
    // Display webpage info - filename, front matter and text (WIP)
    // raw_url set in search.js loaded before us
    webpage_info_to_html();
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

function front_matter_to_html(results, name) {

    if (results.length == 0) {
        var html = "<h3> 🔍 &emsp; No " + name + " found!</h3>\n";
        html += "<p>An error has occurred.<br><br>\n";
        html += "Try again later. If error continues contact {{ site.title }}.<br><br>\n";
        b.innerHTML = html;
        return;
    } else if (results.length == 1) {
        var html = '<h3 id="tcmHdr">1 ' + name + ' line found.</h3>\n';
    } else {
        var html = '<h3 id="tcmHdr">' + results.length.toString() +
                   ' ' + name + ' lines found.</h3>\n';
    }

    html += '<table id="ymlTable" class="yml_table">\n' ;
    // YAML heading
    html += '<tr><th>YAML Key</th>\n' +
            '<th>YAML Value</th></tr>\n';

    var validYamlCount = 0;
    for (var i = 0; i < results.length; i++) {
        var a = results[i].split(':');
        var ymlKey = a.shift()      // https://stackoverflow.com/a/5746883/6929343
        var ymlValue = a.join(':')  // Some values have : in them
        if (ymlValue.length > 0 && !ymlKey.startsWith('#')) {
            html += '<tr><td>' + ymlKey + '</td>\n' ;
            var value = ymlValue.trim();  // YAML continuation line?
            if (value == ">") { value = results[i+1].trim(); }
            html += '<td>' + value + '</td></tr>\n';
            validYamlCount++;
        }
    }
    html += '</table>\n';     // End of our table and form

    // TODO: Move next 9 lines to a shared function
    // Heading: "999 Pippim website entries found." <h3> styling
    html += '<style> #tcmHdr {\n' +
            '  margin-top: .5rem;\n' +
            '  margin-bottom: 0px;\n' +
            '}\n'
    html += '#tcm_window_body {\n' +
            '  margin: 0;' +
            '}\n'

    // NOTE: Setup in hyperlinkRecipe.js - No borders inside the table
    // html += '#hrb_body table, tr, th, td { border: none ! important; }\n'
    // Table details: Space between columns
    // html += '#hrb_body td { padding: 0 1rem; }\n'
    html += '#tcm_window_body table { border-collapse: collapse ! important; }\n'
    html += '#tcm_window_body th, td { padding: .018rem 1rem; }\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?
    b.innerHTML = html; // Update TCM Window body
}

function website_tree_to_html(results) {
    if (results.length == 0) {
        var html = "<h3> 🔍 &emsp; No website_tree found!</h3>\n";
        html += "<p>An error has occurred.<br><br>\n";
        html += "Try again later. If error continues contact {{ site.title }}.<br><br>\n";
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
        html += results[i];
        if (i != results.length - 1) { html += "<br>\n"; }
    }
    html += "</p>";

    // TODO: Move next 9 lines to a shared function
    // Heading: "999 Pippim website entries found." <h3> styling
    html += '<style>'
    html += '#tcmHdr {\n' +
            '  margin-top: .5rem;\n' +
            '  margin-bottom: 0px;\n' +
            '}\n'
    html += '#tcm_window, #tcm_window_body {\n' +
            '  margin: 0;' +
            '}\n'
    html += '</style>'

    b.innerHTML = html; // Update TCM Window body

}

function webpage_info_to_html() {

    var urlMarkdown = getMarkdownFilename();

    fetch(urlMarkdown)
        .then((response) => response.text())
        .then((results) => {
            var results = results.split("\n")  // Convert string into array
            // alert('results.length: ' + results.length)
            var front_yml = getFrontMatter(results)
            // alert(front_yml)
            // console.log('Here is the text file:\n' + config_yml);
            front_matter_to_html(front_yml, "Current Page Front Matter");
        });

}

function getMarkdownFilename() {
    // WARNING: Extremely Jekyll Dependent
    loadConfigYml();
    var urlHref = location.href;            // https://pipp... #...
    var urlProtocol = location.protocol;    // https:
    var urlHost = location.hostname;        // pippim.github.io
    var urlPath = location.pathname;        // /yyyy/mm/dd/
    console.log("urlPath: '" + urlPath + "'  | urlPath.length: " + urlPath.length)
    var urlParts = location.pathname.split("/");
    /*
    alert('urlProtocol: ' + urlProtocol +
          ' | urlHost: ' + urlHost +
          ' | urlPath: ' + urlPath +
          ' | urlParts.length: ' + urlParts.length +
          ' | urlParts[1]: ' + urlParts[1])
    */
    if (urlPath == "/") {
        // Has no .html at all
        var full = "/index.html"
    } else {
        // Assume it's simply Title.html
        var full = "/" + urlParts[1];
    }

    // If length of parts = 5 then we know it's a post
    if (urlParts.length == 5) {
        // NOTE: parts[0] is always empty field before leading /
        // Replace '/yyyy/mm/dd/Title' with 'yyyy-mm-dd-Title'
        const root = urlParts[1] + "-" + urlParts[2] + "-" +
                     urlParts[3] + "-" + urlParts[4]
        // if posts by year
        if (flagPostsByYear.toLowerCase() == "true") {
            // Replace '/yyyy/mm/dd/Title.html' with '_posts/yyyy/yyyy-mm-dd-Title.html'
            // urlParts[1] = yyyy
            full = "/_posts/" + urlParts[1] + "/" + root;
        } else {
            // All posts are in /_posts/ subdirectory regardless of year
            full = "/_posts/" + root;
        }
    }

    return raw_url + full.replace('.html', '.md');
}

function getFrontMatter(txtArr) {
    var frontMatter = []
    if (txtArr[0] == "---") {
        for (var i = 1; i < txtArr.length; i++) {
            if (txtArr[i] == "---") { break } // End of the line ;)
            frontMatter.push(txtArr[i])
        }
    }
    return frontMatter
}

function loadConfigYml () {
    // Sets global array configYml and flagPostsByYear used by two functions

    fetch(raw_url + '/_config.yml')
        .then((response) => response.text())
        .then((config_yml) => {
            configYml = config_yml.split("\n")  // Convert string into array
            // Set flagPostsByYear flag
            flagPostsByYear = "false";
            for (var i = 0; i < configYml.length; i++) {
                var ymlKeyValue = configYml[i].split(':');
                if (ymlKeyValue.length == 2 && !ymlKeyValue[0].startsWith('#')) {
                    if (ymlKeyValue[0] == "posts_by_year") {
                        flagPostsByYear = ymlKeyValue[1].trim(); } } }
        });
}

loadConfigYml();    // Required by two TCM Window Buttons - Home & Webpage Info

/* Further research

document.getElementById("demo").style.font = "italic bold 20px arial,serif";

font-style
font-variant
font-weight
font-size
line-height
font-family
*/

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

        Optional information for posting comments / sending emails:

            Name
            Address
            Phone Number

        System generated information:

            Browser Version
            IP address
            Last website

        Base64 would allow emailing?

        Initially just support stringify and parse

        Top level container:

            Pippim Website Payload Version 1.0

        Second level container

            Local Storage Version 1.0

        Third Level containers

            Payload headers Version 1.0

        Fourth Level containers (Payload headers Version 1.0)

            User Configuration Version 1.0
            Local Cookies Version 1.0
            Sites Visited Version 1.0
            Multi-Timer Version 1.0

        Sample Payload:

            Timer Version, Timer Name,

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

    var html = "<p>";
    html += "<h3>The Cookie Machine (TCM) Future Local Storage:</h3>\n";
    html += "  ☑ Display cookies used on the {{ site.title }} website.<br>\n";
    html += "  ☑ Display cache usage.";
    html += "</p>";
    html += setToggle('toggle_switch', 'checked')
    // image is square but contents are rectangular wide
    html += setImageToggle('toggle_image', 'checked', "30px", "20px",
        "/assets/img/icons/switch_off_left.png",
        "/assets/img/icons/switch_on_right.png")
    b.innerHTML = html;              // Update TCM Window body

    // Webpage (hrb.md) may have <div id="hrb_body" defined. If so populate it
    window.addEventListener('DOMContentLoaded', (event) => {
        // https://stackoverflow.com/a/42526074/6929343
        document.getElementById("toggle_image").onclick = clickImageToggle;
    });

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


function setImageToggle(id, checked, width, height, off_image, on_image) {
    // From: http://css3.bradshawenterprises.com/cfimg/
    var html = '<div id="cf2" class="shadow" id="' + id + '">\n'

    html += '  <img class="bottom" src="' + '{{ site.url }}' + off_image + '" />\n' +
            '  <img class="top" src="' + '{{ site.url }}' + on_image + '" />\n' +
            '</div>\n'

    // CSS
    html += '<style>\n'

    html += '#cf2 {\n' +
            '  position: relative;\n' +
            '  width: ' + width + ';\n' +
            '  height: ' + height + ';\n' +
            '  margin: 0 auto;\n' +
            '}\n'
    html += '#cf2 img {\n' +
            '  position: absolute;\n' +
            '  left: 0;\n' +
            '  -webkit-transition: opacity 1s ease-in-out;\n' +
            '  -moz-transition: opacity 1s ease-in-out;\n' +
            '  -o-transition: opacity 1s ease-in-out;\n' +
            '  transition: opacity 1s ease-in-out;\n' +
            '}\n'
    html += '#cf2 img.transparent {\n' +
            '  opacity: 0;\n' +
            '}\n'
    html += '#cf_onclick {\n' +
            '  cursor: pointer;\n' +
            '}\n'

    html += '</style>\n'

    return html
}

function clickImageToggle() {
    alert('clickImageToggle()')
}

function setToggle(id, checked) {
    // id = name to assign, state = "checked" (ON) or "" (OFF)
    // From: https://www.w3schools.com/howto/howto_css_switch.asp
    var html = '<label class="switch">\n' +
               '  <input type="checkbox" ' + checked + '>\n' +
               '  <span class="slider"></span>\n' +
               '</label>\n'

    // CSS
    html += '<style>\n'

    html += '.switch {\n' +
            '  position: relative;\n' +
            '  display: inline-block;\n' +
            '  width: 60px;\n' +
            '  height: 34px;\n' +
            '}\n'

    html += '.switch input {\n' +
            '  opacity: 0;\n' +
            '  width: 0;\n' +
            '  height: 0;\n' +
            '}\n'

    html += '.slider {\n' +
            '  position: absolute;\n' +
            '  cursor: pointer;\n' +
            '  top: 0;\n' +
            '  left: 0;\n' +
            '  right: 0;\n' +
            '  bottom: 0;\n' +
            '  background-color: #ccc;\n' +
            '  -webkit-transition: .2s;\n' +
            '  transition: .2s;\n' +
            '}\n'

    html += '.slider:before {\n' +
            '  position: absolute;\n' +
            '  content: "";\n' +
            '  height: 26px;\n' +
            '  width: 26px;\n' +
            '  left: 4px;\n' +
            '  bottom: 4px;\n' +
            '  background-color: white;\n' +
            '  -webkit-transition: .2s;\n' +
            '  transition: .2s;\n' +
            '}\n'

    html += 'input:checked + .slider {\n' +
            '  background-color: #2196F3;\n' +
            '}\n'

    html += 'input:focus + .slider {\n' +
            '  box-shadow: 0 0 1px #2196F3;\n' +
            '}\n'

    html += 'input:checked + .slider:before {\n' +
            '  -webkit-transform: translateX(26px);\n' +
            '  -ms-transform: translateX(26px);\n' +
            '  transform: translateX(26px);\n' +
            '}\n'

    html += '</style>\n'

    return html
}


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
    //if (oldFontSize != null) {
        // From _sass/jekyll-theme-cayman.scss line 227
        elm.style.cssText = `
          font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.2;
        `;
        //  line-height: 1.5; <-- Old before white-space: pre;
    //}
}

// Add tooltips to hdr-bar buttons
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