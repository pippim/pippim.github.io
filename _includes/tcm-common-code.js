/*  /_includes/tcm-common-code.js code shared by:
        /assets/js/theCookieMachine.js - Draggable Modal Dialog
        /programs/tcm.md - The Cookie Machine documentation webpage
        /programs/stack.md - Convert Stack Exchange Posts

    icons from: https://www.cleanpng.com/
*/

// Color Schemes - getRootColors.js for local storage current scheme
// { % include getRootColors.js %}  // Breaks tcm.md window displays
// Oct 10/22 commented out above and colorScheme went undefined for 20 minutes
// During those 20 minutes everyone will need to delete localStorage.colorScheme


/* June 9/2022 - setCookie() and getCookie() in theCookieJar.js */
function setCookie(cname, value, exp_days) {
    const d = new Date();
    d.setTime(d.getTime() + (exp_days * 24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + value + ";" + expires + ";path=/" +
                    ";SameSite=Strict";
}

function getCookie(cname) {
    // Sept 25 2022 - Compact code
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1)
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return ""
}

/*  Get all .color-scheme-button class instances. `/_includes/page-header.html`
    has .color-scheme-button in two different HTML places.

    Defined in `/_includes/getRootColors.js`:

        currentColorScheme  // "colorSchemeCayman" or "colorSchemeDark"
        imageColorSchemeCayman =
            "{{ site.url }}/assets/img/icons/color_scheme_cayman.png"
        imageColorSchemeDark =
            "{{ site.url }}/assets/img/icons/color_scheme_dark.png"

*/

var cspButtonClasses = document.getElementsByClassName("color-scheme-button")

var cspButtonClick = function() {
    // Color Scheme Picker button was clicked on one of page header <div>s
    this.classList.toggle('rotate-button')  // Add/remove rotate image in button
    if (currentColorScheme == "colorSchemeCayman") {
        currentColorScheme = "colorSchemeDark"
        setColorScheme(colorSchemeDark)  // _includes/getRootColors.js
    }
    else {
        currentColorScheme = "colorSchemeCayman"
        setColorScheme(colorSchemeCayman)  // _includes/getRootColors.js
    }
    localStorage.setItem("colorScheme", currentColorScheme)
    // Wait 300 ms for transition to finish then change image
    setTimeout(function(){
        setColorSchemeButtonImage(currentColorScheme)
    }, 300)
}

for (var ndx = 0; ndx < cspButtonClasses.length; ndx++) {
    cspButtonClasses[ndx].addEventListener('click', cspButtonClick, false)
}

function setColorSchemeButtonImage(schemeName) {
    // Changing foreground image problematic. Use background image instead
    for (var ndx = 0; ndx < cspButtonClasses.length; ndx++) {
        var elm = cspButtonClasses[ndx]
        if (schemeName == "colorSchemeCayman") {
            elm.style.backgroundImage = "url('" + imageColorSchemeDark + "')"
            elm.title = "Switch {{ site.title }} Website to color scheme Dark"
        }
        else {
            elm.style.backgroundImage = "url('" + imageColorSchemeCayman + "')"
            elm.title = "Switch {{ site.title }} Website to color scheme Cayman"
        }
    }
}

setColorSchemeButtonImage(currentColorScheme)

// Get all .tcm-button class instances. `/_includes/page-header.html`
// has .tcm-button in two places.
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
            // 'background: #f1f1f1;\n' +  (Oct 10/22)
            'background: var(--hr-border-color);\n' +
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
    html += "<h3>Debug / trace variables</h3>";
    html += "To examine key variables when they are set use:<br>"
    html += "&emsp; Send notification (alert) in popup window? " +
            '<img class="with-action" id="switch_alert" ' +
            'src="{{ site.url }}/assets/img/icons/switch_off_left.png" /><br>'
    html += "&emsp; Print to console log (CTRL + SHIFT + I)? " +
            '<img class="with-action" id="switch_console_log" ' +
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
    html += '<table class="objectTableStyle">\n' ;
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

    return html; // Update TCM Window body
}  // End of htmlSearchStats()

function htmlLocalStorage() {
    /* return html code <table> <td> for:
        Name                Size
    */
    var html = "<h3>Local Storage</h3>"
    //html += '<table id="localTable" class="objectTableStyle">\n' ;
    html += '<table class="objectTableStyle">\n' ;
    // Local Storage Table heading. Use class "order" to allow sorting column
    html += '  <tr><th class="order">Name</th>\n' +
            '  <th>Size</th></tr>\n';

    for (const [key, value] of Object.entries(localStorage)) {
        html += '  <tr><td>' + key + '</td>\n' ;
        html += '  <td>' + value.length.toLocaleString(); + '</td></tr>\n';
    }
    html += '</table>\n';     // End of our table and form

    return html; // Update TCM Window body
}  // End of htmlLocalStorage()

/* Style for session/local storage object tables
    Upgrade from unique IDs for #statTable, #localTable, #screenTable, etc.
*/
const objectTableStyleSheet = document.createElement('style')

objectTableStyleSheet.innerHTML = `

.objectTableStyle th, .objectTableStyle td {
    padding: 0 .5rem;
}

.objectTableStyle th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
    /* background: #f1f1f1; Oct 10/22 */
    background: var(--hr-border-color);
}
`
document.head.appendChild(objectTableStyleSheet)

// From: https://stackoverflow.com/a/70024272/6929343
function table_sort() {
    const styleSheet = document.createElement('style')
    styleSheet.innerHTML = `
        .order-inactive span {
            visibility:hidden;
        }
        .order-inactive:hover span {
            visibility:visible;
        }
        .order-active span {
            visibility: visible;
        }
    `
    document.head.appendChild(styleSheet)

    document.querySelectorAll('th.order').forEach(th_elem => {
        let asc = true
        const span_elem = document.createElement('span')
        span_elem.style = "font-size:0.8rem; margin-left:0.5rem"
        span_elem.innerHTML = "▼"
        th_elem.appendChild(span_elem)
        th_elem.classList.add('order-inactive')

        const index = Array.from(th_elem.parentNode.children).indexOf(th_elem)
        th_elem.addEventListener('click', (e) => {
            document.querySelectorAll('th.order').forEach(elem => {
                elem.classList.remove('order-active')
                elem.classList.add('order-inactive')
            })
            th_elem.classList.remove('order-inactive')
            th_elem.classList.add('order-active')

            if (!asc) {
                th_elem.querySelector('span').innerHTML = '▲'
            } else {
                th_elem.querySelector('span').innerHTML = '▼'
            }
            //const arr = Array.from(th_elem.closest("table").querySelectorAll('tbody tr'))
            const arr = Array.from(th_elem.closest("table").querySelectorAll('tbody tr')).slice(1)
            arr.sort((a, b) => {
                const a_val = a.children[index].innerText
                const b_val = b.children[index].innerText
                return (asc) ? a_val.localeCompare(b_val) : b_val.localeCompare(a_val)
            })
            arr.forEach(elem => {
                th_elem.closest("table").querySelector("tbody").appendChild(elem)
            })
            asc = !asc
        })
    })
}

function htmlScreenInfo() {
    /* return html code <table> <td> for:
        Screen Property     Value
        screen.availTop     9,999
        screen.availLeft    9,999
        ETC.
    */
    var html = "<h3>Screen Interface</h3>"
    html += '<table class="objectTableStyle">\n' ;
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

    return html;
}  // End of htmlScreenInfo()

function htmlWindowInfo() {
    var html = "<h3>Window Object</h3>"
    html += '<table id="windowTable" class="objectTableStyle">\n' ;
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

    html += '<style>\n#windowTable {\n' +
            '  max-width: 100vw;\n' +
            '  max-height: 80vh;\n' +
            '  overflow: auto;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?

    return html;
}  // End of htmlWindowInfo()

function htmlNavigatorInfo() {
    var html = "<h3>Navigator Object</h3>"
    html += '<table id="navigatorTable" class="objectTableStyle">\n' ;
    // Screen Table heading
    html += '  <tr><th>Navigator Property</th>\n' +
            '  <th>Value</th></tr>\n';

    var position;
    function success(p) { position = p }
    function error(msg) { console.log(msg) }
    /*  Oct 2/22 - too much spamming after location tracking blocked each time
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(success, error)
    */
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

    html += '<style>\n#navigatorTable {\n' +
            '  max-width: 100vw;\n' +
            '  max-height: 80vh;\n' +
            '  overflow: auto;\n' +
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

/* MAJOR SECTION */

function tcmButtonVisibility() {
    // Initialize switches with values after HTML declared with IDs
    switch_init("switch_this_page", vis_this_page);
    switch_init("switch_all_pages", vis_all_pages);
    switch_init("switch_all_sessions", vis_all_sessions);
    switch_init("switch_alert", displayAlert);  // 2025-04-27 new global var
    switch_init("switch_console_log", displayConsoleLog);  // 2025-04-27 new global var

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

    // 2025-04-27 Add display alerts for key variables being set
    document.getElementById("switch_alert").addEventListener('click', () => {
        switch_toggle("switch_alert");
    });

    // 2025-04-27 Add display alerts for key variables being set
    document.getElementById("switch_console_log").addEventListener('click', () => {
        switch_toggle("switch_console_log");
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

/* April 27/2025 - Define displayAlert and displayConsoleLog for debugging.
*/
var displayAlert = "false", displayConsoleLog = "false"  // default in case of error
displayAlert = getCookie("displayAlert")
displayConsoleLog = getCookie("displayConsoleLog")

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
    if (id == "switch_alert") {
        displayAlert = bool;
        setCookie("displayAlert", displayAlert, 30);
    }
    if (id == "switch_console_log") {
        displayConsoleLog = bool;
        setCookie("displayConsoleLog", displayConsoleLog, 30);
    }
}

function check_all_switches() {
    vis_this_page = objTcmVisById["switch_this_page"].setting;
    vis_all_pages = objTcmVisById["switch_all_pages"].setting;
    vis_all_sessions = objTcmVisById["switch_all_sessions"].setting;
    displayAlert = objTcmVisById["switch_alert"].setting;
    displayConsoleLog = objTcmVisById["switch_console_log"].setting;
}

function switch_toggle(id) {
    if (objTcmVisById[id].setting == "true") { switch_set(id, "false"); }
                                        else { switch_set(id, "true"); }
}

/*
// TEST list the color scheme

console.log("_includes/tcm-common-code.js colorSchemeCayman")
function getColorCode(scheme, key) {
    // Get the styles (properties and values) for the root
    const rootElm = document.querySelector(':root')  // Will not work for popup
    const rs = getComputedStyle(rootElm)
    const value = scheme[key]
    // Alert the value of the --blue variable
    // console.log("The value of " + key + " is: " + value)
    return value
}

// From theCookieMachine.js
function setColorCode(scheme, key) {
    // Set the value of variable --msgq-error-bg-color to another value (in this case "lightblue")
    const rootElm = document.querySelector(':root')  // Will not work for popup
    const value = scheme[key]
    if (value === null) return
    rootElm.style.setProperty(key, value);
}
*/

function separateRgbColors(colorCode) {
    /*  '#99aabb' returns ['99', 'aa', 'bb']
        "1234567890".match(/.{1,2}/g);
            // Results in:
            ["12", "34", "56", "78", "90"]
    */
    if (colorCode.length != 7) {alert("separateRgbColors()"); return "#f9e8d7";}
    const numbers = colorCode.slice(1)  // Drop '#' prefix
    return numbers.match(/.{1,2}/g)
}

function calcBgColorCode(colorCode) {
    /*  Return black or white contrasting color depending on passed color
    */
    var colorRgbArr = separateRgbColors(colorCode)
    if (colorRgbArr.length != 3) {alert("calcBgColorCode()"); return "#808080";}
    var high = 0  // If two or more above 80 return black
    for (var i = 0; i < 2; i++) if (colorRgbArr[i] > "80") high++
    if (high > 1) return "#000000"
             else return "#ffffff"
}


function htmlColorSchemes () {
    var html = "<h2>TCM Color Schemes</h2>"
    html += "Available color schemes are listed below:<br>"

    /* First list stock color schemes, later list user defined */
    var schemes = [colorSchemeCayman, colorSchemeDark]
    for (var i = 0; i < schemes.length; i++) {
        const scheme = schemes[i]
        //console.log("tcm.common-code.js / htmlColorSchemes / scheme:",
        //            scheme['name'])
        html += "<h3>TCM Color Scheme: " + scheme.name + "</h3>"
        for (const key of Object.keys(scheme)) {
            if (!(key.slice(0,2) == "--")) {
                // Skip "name" key EG colorSchemeCayman
                console.log("Skipping key:", key, "value:",scheme[key])
                continue
            }
            if (!(scheme[key].slice(0,1) == "#")) {
                // Skip non-color code EG "1.0" (for opacity)
                console.log("Skipping non-color code key:", key, "value:", scheme[key])
                continue
            }
            html += htmlStyleColorLine(scheme, key)
            // console.log(key, scheme[key], getColorCode(scheme, key))
        }
    }

    return html
}

function htmlStyleColorLine (scheme, key) {
    /* Get the scheme's color code (not the :root {} code) */
    const background = scheme[key]
    const foreground = calcBgColorCode(scheme[key])
    var html = "<h4 "
    html += 'style="background-color: ' + background + ';\n'
    html += ' color: ' + foreground + ';\n'
    html += ' padding: .5rem;\n'
    html += ' border: 2px solid ' + foreground + ';">'
    html += key + ' : ' + scheme[key] + '</h4>\n'
    return html
}


/* End of /_includes/tcm-common-code.js */