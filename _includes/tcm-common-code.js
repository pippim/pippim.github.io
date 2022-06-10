/* /_includes/tcm-common-code.js code shared by:
    /assets/js/theCookieMachine.js - Draggable Modal Dialog
    /tcm.md - The Cookie Machine documentation webpage
*/

/* June 9/2022 - setCookie() and getCookie() are no longer visible */
function setCookie(cname, value, exp_days) {
    const d = new Date();
    d.setTime(d.getTime() + (exp_days * 24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + value + ";" + expires + ";path=/" +
                    ";SameSite=Strict";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
    }
    return "";
}


// Get all .tcm-button class instances `/_layouts/default.html` has
// .tcm-button in two different place.
var tcmButtonClasses = document.getElementsByClassName("tcm-button");  // New class

var tcmButtonClick = function() {
    // TCM button was clicked on one of page header <div>s
    document.querySelector('#tcm_window').style.cssText = `
        display: flex;
        flex-direction: column;
    `;
    // Make tcm-button class invisible
    for (var ndx = 0; ndx < tcmButtonClasses.length; ndx++) {
        tcmButtonClasses[ndx].style.cssText = `
            opacity: 0.0;
            background: transparent;
            background-image: none;
            border: none;
        `;
    }
};

for (var ndx = 0; ndx < tcmButtonClasses.length; ndx++) {
    tcmButtonClasses[ndx].addEventListener('click', tcmButtonClick, false);
}

function htmlFrontMatter(results, name) {
    // home button & webpage info button uses
    if (results.length == 0) {
        var html = "<h3> 🔍 &emsp; No " + name + " found!</h3>\n";
        html += "<p>A network error has occurred.<br><br>\n";
        html += "Try again later. If error continues contact {{ site.title }}.<br><br>\n";
        return html;
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
    html += '#tcm_window_body th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?
    return html
}

function htmlWebsiteTree(results) {
    if (results.length == 0) {
        var html = "<h3> 🔍 &emsp; No website_tree found!</h3>\n";
        html += "<p>An error has occurred.<br><br>\n";
        html += "Try again later. If error continues contact {{ site.title }}.<br><br>\n";
        b.innerHTML = html;
        return;
    } else if (results.length == 1) {
        var html = '<h3 id="tcmHdr">1 {{ site.title }} website tree entry found.</h3>\n';
    } else {
        var html = '<h3 id="tcmHdr">' + results.length.toString() +
                   ' {{ site.title }} website tree entries found.</h3>\n';
    }

    html += '<div id="tcmLineDraw">\n';
    for (var i = 0; i < results.length; i++) {
        html += results[i];
        if (i != results.length - 1) { html += "<br>\n"; }
    }
    html += "</div>";

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
    html += '#tcmLineDraw {\n' +
            'font-family: Consolas, "Liberation Mono", Menlo, Courier, ' +
                       ' "Courier New", monospace;\n' +
            'line-height: .55;\n' +
            '}\n'
    // Note .55 line-height is for normal Cayman, must be overridden in tcm_doc (tcm.md)
    html += '</style>'

    return html
}

function getMarkdownFilename() {
    // WARNING: Extremely Jekyll Dependent for posts directory structure
    // If part = "programs" then go down another directory level
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

    // If part[1] is "programs" then drill down for name
    if (urlParts[1] == "programs") { full = "/programs/" + urlParts[2]; }

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

function htmlVisibilitySwitches () {
    var html = "<h3>TCM Window Button Visibility</h3>";
    html += "After closing this window, the TCM button will be:<br>"
    html += "&emsp; Visible on this webpage? " +
            '<img class="with-action" id="switch_this_page" ' +
            'src="{{ site.url }}/assets/img/icons/switch_off_left.png" /><br>'
    html += "&emsp; Visible on all webpages? " +
            '<img class="with-action" id="switch_all_pages" ' +
            'src="{{ site.url }}/assets/img/icons/switch_off_left.png" /><br>'
    html += "&emsp; Visible on all sessions? " +
            '<img class="with-action" id="switch_all_sessions" ' +
            'src="{{ site.url }}/assets/img/icons/switch_off_left.png" /><br>'
    return html
}

function htmlSearchStats() {
    /* return html code <table> <td> for:
        Statistic Key       Statistic Value
        timeCreated         999999?
        Search Words Count  888,888
    */
    var html = "<h3>Session Storage</h3>"
    html += '<table id="statTable">\n' ;
    // Statistics Table heading
    html += '  <tr><th>Statistic Key</th>\n' +
            '  <th>Statistic Value</th></tr>\n';

    for (const [key, value] of Object.entries(search_stats)) {
        html += '  <tr><td>' + key + '</td>\n' ;
        // TODO: Need database of object keys and their value format
        // If greater than 123 MB it's a Unix Date in Epoch
        var d = new Date(value);
        html += '  <td>';  // Start of table cell
        // html += value.toLocaleString();
        if (value < 123456789) { html += value.toLocaleString(); }
        else { html += d.toLocaleDateString() +  ' ' + d.toLocaleTimeString() }
        html += '</td></tr>\n';  // End of table cell and table row
    }
    html += '</table>\n';     // End of our table and form

    // TODO: Move next 9 lines to a shared function
    // Heading: "999 Pippim website entries found." <h3> styling
    html += '<style>\n#statTable th, #statTable td {\n' +
            '  padding: 0 .5rem;\n' +
            '}\n'
    html += '#statTable th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?
    return html; // Update TCM Window body
}  // End of htmlSearchStats()

function htmlLocalInfo() {
    /* return html code <table> <td> for:
        Statistic Key       Statistic Value
        timeCreated         999999?
        Search Words Count  888,888
    */
    var html = "<h3>Tim-ta Storage</h3>"
    html += '<table id="ttaTable">\n' ;
    // Local Storage Table heading
    html += '  <tr><th>Tim-ta Item</th>\n' +
            '  <th>Item Value</th></tr>\n';

    // If Tim-ta has never been run, objects won't exist
    if (true == false) {
        for (const [key, value] of Object.entries(search_stats)) {
            html += '  <tr><td>' + key + '</td>\n' ;
            // TODO: Need database of object keys and their value format
            // If greater than 123 MB it's a Unix Date in Epoch
            var d = new Date(value);
            html += '  <td>';  // Start of table cell
            // html += value.toLocaleString();
            if (value < 123456789) { html += value.toLocaleString(); }
            else { html += d.toLocaleDateString() +  ' ' + d.toLocaleTimeString() }
            html += '</td></tr>\n';  // End of table cell and table row
        }
    }
    html += '</table>\n';     // End of our table and form

    // TODO: Move next 9 lines to a shared function
    // Heading: "999 Pippim website entries found." <h3> styling
    html += '<style>\n#ttaTable th, #ttaTable td {\n' +
            '  padding: 0 .5rem;\n' +
            '}\n'
    html += '#ttaTable th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?
    return html; // Update TCM Window body
}  // End of htmlLocalInfo()

function htmlLocalStorage() {
    /* return html code <table> <td> for:
        Name                Size
    */
    var html = "<h3>Local Storage</h3>"
    html += '<table id="localTable">\n' ;
    // Local Storage Table heading. Use class "order" to allow sorting column
    html += '  <tr><th class="order">Name</th>\n' +
            '  <th>Size</th></tr>\n';

    for (const [key, value] of Object.entries(localStorage)) {
        html += '  <tr><td>' + key + '</td>\n' ;
        html += '  <td>' + value.length.toLocaleString(); + '</td></tr>\n';
    }
    html += '</table>\n';     // End of our table and form

    // TODO: Move next 9 lines to a shared function
    // Heading: "999 Pippim website entries found." <h3> styling
    html += '<style>\n#localTable th, #localTable td {\n' +
            '  padding: 0 .5rem;\n' +
            '}\n'
    html += '#localTable th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?
    return html; // Update TCM Window body
}  // End of htmlLocalStorage()

function htmlScreenInfo() {
    /* return html code <table> <td> for:
        Screen Property     Value
        screen.availTop     9,999
        screen.availLeft    9,999
        ETC.
    */
    var html = "<h3>Screen Interface</h3>"
    html += '<table id="screenTable">\n' ;
    // Screen Table heading
    html += '  <tr><th>Screen Property</th>\n' +
            '  <th>Value</th></tr>\n';

    var arrProp = ["availTop", "availLeft", "availHeight", "availWidth",
                   "top", "left", "height", "width", "colorDepth",
                   "pixelDepth", "orientation", "mozEnabled", "mozBrightness"]
    var o = (screen.orientation || {}).type ||
             screen.mozOrientation || screen.msOrientation;
    for (var i=0; i<arrProp.length; i++){ html += buildScreenEval(arrProp[i], o) ; }

    html += '</table>\n';     // End of our table and form

    html += '<style>\n#screenTable th, #screenTable td {\n' +
            '  text-align: left;\n' +
            '  padding: 0 .5rem;\n' +
            '}\n'
    html += '#screenTable th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?

    return html;
}  // End of htmlScreenInfo()

function htmlWindowInfo() {
    var html = "<h3>Window Object</h3>"
    html += '<table id="windowTable">\n' ;
    // Screen Table heading
    html += '  <tr><th>Window Property</th>\n' +
            '  <th>Value</th></tr>\n';

    for (const [key, value] of Object.entries(window)) {
        html += '  <tr><td>' + key + '</td>\n'
        html += '  <td>'  // Start of table cell
        var display = value
        if (typeof display === 'undefined') var display = "Undefined"
        if (display === null) display = "Null"
        if (typeof display === 'number') display = display.toLocaleString()
        else display = display.toString()
        if (display.startsWith("function")) display = "function() { ... }"
        if (display.endsWith("BarProp]")) {
            if (eval("window." + key + ".visible")) display = "Visible"
            else display = "Invisible"
        }
        html += display.toString();
        html += '</td></tr>\n';  // End of table cell and table row
        // We don't want to list HUGE session storage strings
        if (key == "search_words") { break } ;
    }

    html += '</table>\n';     // End of our table and form

    html += '<style>\n#windowTable th, #windowTable td {\n' +
            '  text-align: left;\n' +
            '  padding: 0 .5rem;\n' +
            '}\n'
    html += '#windowTable {\n' +
            '  max-width: 100vw;\n' +
            '  max-height: 80vh;\n' +
            '  overflow: auto;\n' +
            '}\n'
    html += '#windowTable th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?

    return html;
}  // End of htmlWindowInfo()

function htmlNavigatorInfo() {
    var html = "<h3>Navigator Object</h3>"
    html += '<table id="navigatorTable">\n' ;
    // Screen Table heading
    html += '  <tr><th>Navigator Property</th>\n' +
            '  <th>Value</th></tr>\n';

    var position;
    function success(p) { position = p }
    function error(msg) { console.log(msg) }
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(success, error)

    var arrProp = ["connection", "cookieEnabled", "credentials",
                   "deviceMemory", "geolocation", "hid", "hardwareConcurrency",
                   "keyboard", "language", "languages", "locks",
                   "maxTouchPoints", "mediaCapabilities", "mediaDevices",
                   "mediaSession", "onLine", "pdViewerEnabled", "permissions",
                   "presentation", "serial", "serviceWorker", "storage",
                   "userAgent", "userAgentData", "webDriver",
                   "windowControlsOverlay", "xr"];
    for (var i=0; i<arrProp.length; i++) html += buildNavigatorEval(arrProp[i])

    html += '</table>\n';     // End of our table and form

    html += '<style>\n#navigatorTable th, #navigatorTable td {\n' +
            '  text-align: left;\n' +
            '  padding: 0 .5rem;\n' +
            '}\n'
    html += '#navigatorTable {\n' +
            '  max-width: 100vw;\n' +
            '  max-height: 80vh;\n' +
            '  overflow: auto;\n' +
            '}\n'
    html += '#navigatorTable th {\n' +
            'position: -webkit-sticky;\n' +
            'position: sticky;\n' +
            'top: 0;\n' +
            'z-index: 1;\n' +
            'background: #f1f1f1;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?

    return html;
}  // End of htmlNavigatorInfo()

function buildScreenEval(prop, orientation) {
    // Build html using eval() of screen.availTop, etc.
    var command = "screen." + prop;
    var result = eval(command);
    var value = null;
    var html = "";
    if (typeof result === 'number') { value = result.toLocaleString(); }
    else if (result == '[object ScreenOrientation]') { value = orientation; }
    else { value = result }  // Assume result is "undefined"

    var instructions = "html = '<tr><td>screen." + prop + "</td><td> ';";
    instructions += "html += '" + value + "</td></tr>'";
    eval(instructions);
    return html
}

function buildNavigatorEval(prop) {
    // Build html using eval() of screen.availTop, etc.
    var command = "navigator." + prop;
    var result = eval(command);
    var value = null;
    var html = "";
    if (typeof result === 'number') { value = result.toLocaleString(); }
    else { value = result }  // Assume result is "undefined"

    var instructions = "html = '<tr><td>navigator." + prop + "</td><td> ';";
    instructions += "html += '" + value + "</td></tr>'";
    eval(instructions);
    return html
}
// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
function showProps(obj, objName) {
  let result = '';
  for (let i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      result += `${objName}.${i} = ${obj[i]}\n`;
    }
  }
  console.log(result);
}

function tcmButtonVisibility() {
    // Initialize switches with values after HTML declared with IDs
    switch_init("switch_this_page", vis_this_page);
    switch_init("switch_all_pages", vis_all_pages);
    switch_init("switch_all_sessions", vis_all_sessions);

    // Toggle switch on/off with button click
    document.getElementById("switch_this_page").addEventListener('click', () => {
        switch_toggle("switch_this_page");
        // If invisible this page, then invisible everywhere
        if (vis_this_page == "false") {
            switch_set("switch_all_pages", "false");
            switch_set("switch_all_sessions", "false");
        }
    });

    document.getElementById("switch_all_pages").addEventListener('click', () => {
        switch_toggle("switch_all_pages");
        // switched on force page visible or off force sessions invisible
        if (vis_all_pages == "true") { switch_set("switch_this_page", "true"); }
        if (vis_all_pages == "false") { switch_set("switch_all_sessions", "false"); }
    });

    document.getElementById("switch_all_sessions").addEventListener('click', () => {
        switch_toggle("switch_all_sessions");
        // If visible all sessions then force visible all pages
        if (vis_all_sessions == "true") {
            switch_set("switch_this_page", "true");
            switch_set("switch_all_pages", "true");
        }
    });

}

var vis_this_page = "true";     // Global default for exiting TCM Window.
var vis_all_pages = sessionStorage.vis_all_pages;
if (vis_all_pages === undefined) { vis_all_pages = "false" }
var vis_all_sessions = getCookie("vis_all_sessions")

// getCookie() will return "" when cookie is undefined.
if (vis_all_sessions == "") { vis_all_sessions = "false" }
// if All sessions were forced on by another session, set our session "true"
if (vis_all_sessions == "true") {
    vis_all_pages = "true"  // Force to "true" just in case it was "false"
    sessionStorage.vis_all_pages = vis_all_pages;
    makeTcmButtonVisible();
}

var switch_on_image = "{{ site.url }}/assets/img/icons/switch_on_right.png"
var switch_off_image = "{{ site.url }}/assets/img/icons/switch_off_left.png"

function makeTcmButtonVisible () {
    // Make #tcm_button at Top of Page (header section) visible
    // May 18/22 - Support multiple class definitions of .tcm-button
    for (var ndx = 0; ndx < tcmButtonClasses.length; ndx++) {
        tcmButtonClasses[ndx].style.cssText = cssTcmButtonShow()
    }
}

function cssTcmButtonShow () {
    // Return the CSS text that makes a TCM Button visible on page header
    return `
        opacity: 1.0;
        border: thin solid black;
        border-radius: .5rem;
        background-image: url({{ site.url }}/assets/img/icons/gingerbread_3.png),
                          url({{ site.url }}/assets/img/icons/button_background.png);
        background-repeat: no-repeat;
        background-size: cover;
    `
}

var objTcmVisById = {};  // Current state (on/"true" or off/"false") by id

function switch_init(id, bool) {
    /* Each switch in object dictionary with element and true/false setting */
    objTcmVisById[id] = {
        'element': document.getElementById(id),
        'setting': "false"
    };
    switch_set(id, bool);
}

function switch_set(id, bool) {
    objTcmVisById[id].setting = bool; 
    if (bool == "true" ) { objTcmVisById[id].element.src = switch_on_image;
                           objTcmVisById[id].element.title = "Click to switch off"; }
                    else { objTcmVisById[id].element.src = switch_off_image;
                           objTcmVisById[id].element.title = "Click to switch on"; }
    if (id == "switch_this_page") { vis_this_page = bool; }
    if (id == "switch_all_pages") {
        vis_all_pages = bool;
        sessionStorage.vis_all_pages = vis_all_pages;
    }
    if (id == "switch_all_sessions") {
        vis_all_sessions = bool;
        setCookie("vis_all_sessions", vis_all_sessions, 30);
    }
}

function check_all_switches() {
    vis_this_page = objTcmVisById["switch_this_page"].setting;
    vis_all_pages = objTcmVisById["switch_all_pages"].setting;
    vis_all_sessions = objTcmVisById["switch_all_sessions"].setting;
}

function switch_toggle(id) {
    if (objTcmVisById[id].setting == "true") { switch_set(id, "false"); }
                                        else { switch_set(id, "true"); }
}

/* End of /_includes/tcm-common-code.js */