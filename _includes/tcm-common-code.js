/* /_includes/tcmButtonVisibility.js code shared by:
    /assets/js/theCookieMachine.js - Draggable Modal Dialog
    /tcm.md - The Cookie Machine documentation webpage
*/

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
    html += '</style>'  // Was extra \n causing empty space at bottom?
    return html; // Update TCM Window body
}

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
    for (var i=0; i<arrProp.length; i++){ html += buildEval(arrProp[i], o) ; }

    html += '</table>\n';     // End of our table and form

    html += '<style>\n#screenTable th, #screenTable td {\n' +
            '  text-align: left;\n' +
            '  padding: 0 .5rem;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?

    return html;  // Update TCM Window body
}

function htmlWindowInfo() {
    /* return html code <table> <td> for:
        Screen Property     Value
        screen.availTop     9,999
        screen.availLeft    9,999
        ETC.
    */
    var html = "<h3>Window Object</h3>"
    html += '<table id="windowTable">\n' ;
    // Screen Table heading
    html += '  <tr><th>Window Property</th>\n' +
            '  <th>Value</th></tr>\n';

    for (const [key, value] of Object.entries(window)) {
        html += '  <tr><td>' + key + '</td>\n' ;
        html += '  <td>';  // Start of table cell
        var display = value;
        if (typeof display === undefined) { var display = "Undefined" }
        if (display === null) { display = "Null" };
        display = display.toString();  // Needed for test if startsWith "function"
        // We don't want to list HUGE session storage strings
        if (display == "search_words") { break } ;
        if (display.startsWith("function")) { display = "function() { ... }" };
        html += display.toString();
        // If greater than 123 MB it's a Unix Date in Epoch
        //var d = new Date(value);
        // html += value.toLocaleString();
        //if (value < 123456789) { html += value.toLocaleString(); }
        //else { html += d.toLocaleDateString() +  ' ' + d.toLocaleTimeString() }
        html += '</td></tr>\n';  // End of table cell and table row
    }

    html += '</table>\n';     // End of our table and form

    html += '<style>\n#windowTable th, #windowTable td {\n' +
            '  text-align: left;\n' +
            '  padding: 0 .5rem;\n' +
            '}\n'
    html += '</style>'  // Was extra \n causing empty space at bottom?

    return html;  // Update TCM Window body
}

function buildEval(prop, orientation) {
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
  document.getElementById('tcm_button').style.cssText = `
    opacity: 1.0;
    border: thin solid black;
    border-radius: .5rem;
    background-image: url({{ site.url }}/assets/img/icons/gingerbread_3.png),
                      url({{ site.url }}/assets/img/icons/button_background.png);
    background-repeat: no-repeat;
    background-size: cover;
  `;
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

/* End of /_includes/tcm_button_visibility.js */