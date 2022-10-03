---
---
/* TODO: Get Server/Local storage:  https://stackoverflow.com/a/23516713/6929343
         Page refreshed date/time:  https://stackoverflow.com/a/47145745/6929343
         Reload Window if obsolete, flag all cached pages as dirty so they reload:
                                    https://stackoverflow.com/a/28041336/6929343
                                    https://stackoverflow.com/a/118886/6929343
*/

// Use site.code from _config.yml to build raw_url
const code_url = "{{ site.code_url }}";
// code_url: https://       github.com        /pippim/pippim.github.io/blob/main
//  raw_url: https://raw.githubusercontent.com/pippim/pippim.github.io/main
var raw_url = code_url.replace('github', 'raw.githubusercontent');
raw_url = raw_url.replace('/blob/', '/');
const timeNow = new Date().getTime();
const oneDay= 1000 * 60 * 60 * 24;

// Local Storage Color Active Color Scheme
{% include tcm-common-code.js %}
var active_color = {}
if (localStorage.active_color === undefined) { newActiveColor() }
else { active_color = JSON.parse(localStorage.getItem('active_color')); }

// Session Storage statistics
var search_stats = {}
if (sessionStorage.search_stats === undefined) { newStats(); }
else { search_stats = JSON.parse(sessionStorage.getItem('search_stats')); }

// if search_stats["timeCreated"] > 24 hours old, erase sessionStorage
// Don't use sessionStorage.clear() because we loose TCM Window Visibility
if (search_stats["timeCreated"] < timeNow - oneDay) {
    newStats(); // Wipe out previous stats
    sessionStorage.removeItem("search_stats");
    sessionStorage.removeItem("search_words");
    sessionStorage.removeItem("search_urls");
    sessionStorage.removeItem("config_yml");
}

/* Display visibility switches and search statistics */
var arrConfigYml = []           // Array containing _config.yml
var flagPostsByYear = null      // true or false from _config.yml key posts_by_year
var timeSiteRefreshed = null    // Time website was last refreshed

// Fetch config.yml from internet or session Storage
var config_yml = [];  // config_yml is raw text and arrConfigYml is an array
if (sessionStorage.config_yml === undefined) { load_config_yml(); }
else { config_yml = sessionStorage.getItem('config_yml'); buildConfigYml(); }

async function load_config_yml() {
    // Get from internet and store in session
    fetch(raw_url + '/_config.yml')
        .then((response)=>response.text())
        .then((responseJson)=>{
            config_yml = responseJson;
            buildConfigYml()
            sessionStorage.setItem('config_yml', config_yml);
            search_stats["timeSiteRefreshed"] = timeSiteRefreshed;
            //search_stats["timeSiteRefreshed"] = 16930518;
            buildStats('_config.yml Count', arrConfigYml.length);
            buildStats('_config.yml Size', config_yml.length);
        });
}
// Get sessionStorage search objects: search_words & search_urls
var search_words = {}
if (sessionStorage.search_words === undefined) { load_search_words(); }
else { search_words = JSON.parse(sessionStorage.getItem('search_words')); }

var search_urls = []
if (sessionStorage.search_urls === undefined) { load_search_urls(); }
else { search_urls = JSON.parse(sessionStorage.getItem('search_urls')); }

async function load_search_words() {
    // Also used by /assets/js/theCookieMachine.js
    fetch(raw_url + '/assets/json/search_words.json')
        .then((response)=>response.json())
        .then((responseJson)=>{
            search_words = responseJson;
            // https://stackoverflow.com/a/32905820/6929343
            var search_words_store = JSON.stringify(search_words)
            const [total_hits, total_points] = calcTotalHits(search_words);
            sessionStorage.setItem('search_words', search_words_store);
            buildStats('Search Word Count', Object.keys(search_words).length);
            buildStats('Search Word Hits', total_hits);
            buildStats('Search Word Points', total_points);
            buildStats('Search Word Size', search_words_store.length);
        });
}

async function load_search_urls() {
    // Also used by /assets/js/theCookieMachine.js
    fetch(raw_url + '/assets/json/search_url.json')
        .then((response)=>response.json())
        .then((responseJson)=>{
            search_urls = responseJson;
            // https://stackoverflow.com/a/32905820/6929343
            var search_urls_store = JSON.stringify(search_urls);
            sessionStorage.setItem('search_urls', search_urls_store);
            buildStats('Search URL Count', search_urls.length);
            buildStats('Search URL Size', search_urls_store.length);
        });
}

function buildConfigYml () {
    // Sets global array arrConfigYml and flagPostsByYear used by two functions
    // NOTE: Cannot call on page load because fetch is running asynchronously
    arrConfigYml = config_yml.split("\n")  // Convert string into array
    // Set flagPostsByYear flag
    flagPostsByYear = "false";
    timeSiteRefreshed = timeNow;  // Give default if not found
    for (var i = 0; i < arrConfigYml.length; i++) {
        //var ymlKeyValue = arrConfigYml[i].split(':');
        // Also in tcm-common-code.js consider glob
        var a = arrConfigYml[i].split(':');
        var ymlKey = a.shift()      // https://stackoverflow.com/a/5746883/6929343
        var ymlValue = a.join(':')  // Some values have : in them

        var ymlKeyValue = arrConfigYml[i].split(':')
        // if (i == 14) {alert(ymlKey +" ymlValue.trim(): " + ymlValue.trim());}
        //if (ymlKeyValue.length == 2 && !ymlKeyValue[0].startsWith('#')) {
        if (ymlValue.length > 0 && !ymlKey.startsWith('#')) {
            if (ymlKeyValue[0] == "posts_by_year") {
                flagPostsByYear = ymlKeyValue[1].trim();
            }
            if (ymlKey == "refreshed") {
                //alert("ymlValue.trim(): " + ymlValue.trim());
                timeSiteRefreshed = Date.parse(ymlValue.trim());
                //alert("timeSiteRefreshed: " + timeSiteRefreshed);
            }
        }
    }
}

function newActiveColor () {
    active_color = {} // Wipe out previous active color
    active_color["name"] = "Cayman Theme"
    if (typeof colorSchemeDark === 'undefined') var display = "CAN'T SEE"
    else var display = colorSchemeDark['name']
    console.log("Set Cayman Theme. Other theme:", display)
}

function newStats () {
    search_stats = {} // Wipe out previous stats
    search_stats["timeCreated"] = timeNow;
}

function buildStats (key, value) {
    search_stats[key] = value
    // After 8 stats (plus 2 timestamps) we are done
    if (Object.keys(search_stats).length = 10) {
        // alert("5 search stats created");
        sessionStorage.setItem('search_stats', JSON.stringify(search_stats));
    }
}

function calcTotalHits(words) {
    // returns total search words hits and points for stats
    var total_hits = 0 ;
    var total_points = 0 ;

    // For every word in search_words
    for (const [word, results] of Object.entries(words)) {
        let url_points = Object.entries(results);
        // For every URL/Points pair in word results
        for (var i = 0; i < url_points.length; i++) {
            total_hits += 1;
            const [key, value] = url_points[i].toString().split(',');
            // DISCARD key, (URL index number) not needed at this time
            total_points += parseFloat(value); } }

    return [total_hits, total_points];
}

/*  NOTE: theCookieMachine.js is already using b:
    const b = document.getElementById('tcm_window_body') */

// From: https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
const c = document.getElementById('search-modal-close');    // 'X' close search results
const d = document.getElementById('page-header-dropdown');  // The hamburger menu
const e = document.getElementById('dropdown-content');      // hamburger menu dropdown options
const f = document.getElementById('search-form');           // Wrapper around query & close button
const g = document.getElementById('search-container');      // Wrapper around form & modal
const h = document.getElementById('search-modal-text')      // Search results html codes
const i = document.getElementById('search-clear-input');    // 'X' to clear search words
const m = document.getElementById('search-modal');          // Where search results appear
const n = document.getElementsByClassName('page-header-search-button')  // In two places
const q = document.getElementById('search-query');          // Search words input by user
const s = document.getElementById('search-symbol');         // Mag glass beside search-query

set_x_to_close();  // Initial 'X' (close on input bar) status when page refreshed

// When the user clicks on <span> (x), close the modal
c.onclick = function () {
    event.stopPropagation()  // Don't let window.onclick see this click
    m.style.display = "none";   // Turn off display for search results modal
    // TODO: Restore original Y Offset before scrolling to make room for modal
    //       Do we want to close search form too? Saves clicks for user
}

// When the user clicks on page-header-hamburger button, display mobile dropdown list
var boolDropdown = false
if (d !== null) {
    d.onclick = function (event) {
        //const d = document.getElementById('page-header-dropdown');  // The hamburger menu
        //const e = document.getElementById('dropdown-content');      // hamburger menu dropdown options
        //const f = document.getElementById('search-form');           // Wrapper around query & close button
        //const m = document.getElementById('search-modal');          // Where search results appear
        event.stopPropagation()  // Don't let window.onclick see this click
        boolDropdown = !boolDropdown
        if (boolDropdown) {
            d.scrollIntoView()  // Move to top so children have room to grown

            e.style.display = "block"
            setContentDimmed(e)
            // Move to top so children have room to grown (after scrollbar removed)
            scrollToJustAbove(e)
            // Search form may be open and stopPropagation stops window.click() running
            f.style.display = "none";  // Close search form
            boolSearchForm = false
            m.style.display = "none";  // close search results modal
        } else  {
            e.style.display = "none"
            window.scrollTo({top: 0, behavior: 'smooth'});
            reverseContentDimmed()
        }
        //console.log("d.onclick boolDropdown:", boolDropdown, "boolSearchForm:", boolSearchForm)
    }
}

var boolSearchForm = false  // Is search form active?

// Loop through all class named .page-header-search-button
for (var ndx = 0; ndx < n.length; ndx++) {
    //ndxPageHeaderSearchButton = ndx
    n[ndx].onclick = function (event) {
        //const d = document.getElementById('page-header-dropdown');  // The hamburger menu
        //const e = document.getElementById('dropdown-content');      // hamburger menu dropdown options
        //const f = document.getElementById('search-form');           // Wrapper around query & close button
        //const m = document.getElementById('search-modal');          // Where search results appear
        // n = page header search button Class list beside hamburger.
        // Will replace p (page-header-search ID) after all pages are converted
        //const n = document.getElementsByClassName('page-header-search-button');
        //const p = document.getElementById('page-header-search');    // page search beside hamburger
        event.stopPropagation()  // Don't let window.onclick see this click
        boolSearchForm = !boolSearchForm
        if (boolSearchForm) {
            //n[ndxPageHeaderSearchButton].scrollIntoView()  // Move to top so children have room to grown
            f.style.display = "flex"
            setContentDimmed(g)  // New g replaces f
            // Move to top so children have room to grown (after scrollbar removed)
            scrollToJustAbove(g)
            // f.insertAfter('#search-form-location')  // No longer needed plus causes bump down
            // Hamburger dropdown may be open and stopPropagation stops window.click() running
            if (e !== null && e != "none") {
                e.style.display = "none";  // Close dropdown menu options
                boolDropdown = false
            }
        }
        else  {
            f.style.display = "none"
            m.style.display = "none"  // Search modal may be open
            window.scrollTo({top: 0, behavior: 'smooth'});
            reverseContentDimmed()
        }
        //console.log("p.onclick boolDropdown:", boolDropdown, "boolSearchForm:", boolSearchForm)

    }
}

// For some reason 'e' is empty (length is zero) causing first page click to scroll to top
//console.log("e.style.display.length:", e.style.display.length)
e.style.display = "none"

// When the user clicks anywhere outside of the modal(m) close it
window.onclick = function (event) {
    /* We only get clicks not handled by above functions that stopPropagation */
    //const d = document.getElementById('page-header-dropdown');  // The hamburger menu
    //const e = document.getElementById('dropdown-content');      // hamburger menu dropdown options
    //const f = document.getElementById('search-form');           // Wrapper around query & close button
    //const m = document.getElementById('search-modal');          // Where search results appear
    if (!m.contains(event.target) && m.style.display != "none") {
        m.style.display = "none"  // Close search results modal
        scrollToJustAbove(f)      // Full focus back to #search-query input
    /* OPTIONAL - Close #search-form altogether
        f.style.display = "none"  // Close search form
        boolSearchForm = false
        window.scrollTo({top: 0, behavior: 'smooth'});
        reverseContentDimmed()
    */
        return
    }
    if (!f.contains(event.target) && f.style.display != "none") {
        f.style.display = "none"  // Close search form
        boolSearchForm = false
        window.scrollTo({top: 0, behavior: 'smooth'});
        reverseContentDimmed()
        return
    }
    if (e !== null && e.style.display != "none") {
        //console.log("e.style.display:", e.style.display)
        e.style.display = "none"  // Close dropdown menu options
        boolDropdown = false
        window.scrollTo({top: 0, behavior: 'smooth'});
        reverseContentDimmed()
        return
    }
    //console.log("window.onclick: boolDropdown:", boolDropdown)
}

var saveBackgroundColor;  // May 18/22 - New code not working

function setContentDimmed(elm) {
    document.body.style.overflow = "hidden"
    elm.classList.add("dim-body")
}

function reverseContentDimmed() {
    document.body.style.overflow = "auto"
    e.classList.remove("dim-body")  // dropdown menu dimming
    f.classList.remove("dim-body")  // search form dimming
    g.classList.remove("dim-body")  // search form dimming
}

f.addEventListener('submit', submitted);

f.addEventListener('input', set_x_to_close);

// Close ('X') clicked on search input bar
i.onclick = function(){
    q.value = "";           // Clear all search words
    set_x_to_close();       // Turn off 'X' (Close) icon
};

function set_x_to_close() {
    // When search words typed, turn on "X" image to clear the words
    // const q = document.getElementById('search-query');
    // const i = document.getElementById('search-clear-input');
    if (q.value !== "") { i.style.display = "inline-block"; }
                   else { i.style.display = "none"; }
}

// From: https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
function submitted(event) {

    event.preventDefault();                 // Stop other events from receiving signal
    const results = get_hits(q.value);      // URLS matching search words into array

    if (results.length == 0) {
        html = "<h2> 🔍 &emsp; No results found!</h2>\n";
        html += "<p>Use more search words that are descriptive.<br><br>\n"
        html += "Non-descriptive words are ignored. Some example words ignored are:<br><br>\n"
        html += "&emsp;- who, what, where, when, why, how, a, the, it, and, or, then, etc.</p>\n"
        h.innerHTML = html;
        //q.value = ""  // Test because this is what X button would do
        m.style.display = "block";  // Turn on search results display
        return
    } else if (results.length == 1) {
        var html = "<h2>1 result found.</h2>\n"
    } else {
        var html = "<h2>" + results.length.toString() + " results found.</h2>\n"
    }

    // Process all results. Use class 'search-results' to style purple for visited links
    html += '<ol class="search-results">\n'

    for (var i = 0; i < results.length; i++) {
        const [key, value] = results[i].toString().split(',');
        const arr = search_urls[key].split(' | ', 1);
        hyper_link = arr[0];
        hyper_title = search_urls[key].substring(hyper_link.length + 3);
        html += "  <li><a href='" + hyper_link + "'>" + hyper_title + "</a></li>\n"
        //html += "  <li><a href='" + hyper_link + "'>" + hyper_title + "</a>" +
        //         " <badge> " + value.toString() + " </badge> points." + "</li>\n";
    }
    html += "</ol>\n";

    h.innerHTML = html;             // Put search results into modal box
    m.style.display = "block";      // Display search results by revealing modal
    scrollToJustAbove(m)            // Give room to display results without scrolling
}

function scrollToJustAbove(element) {
    // From: https://stackoverflow.com/questions/52570291/scrollintoview-20px-above-element
    //let dims = element.getBoundingClientRect();
    //let dims = element.offsetTop
    //var margin = 10
    //window.scrollTo(window.scrollX, dims.top - margin);
    // From: https://stackoverflow.com/a/56391657/6929343
    const yOffset = -80;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    //console.log("element.getBoundingClientRect().top:",
    //            element.getBoundingClientRect().top,
    //            "window.pageYOffset:", window.pageYOffset)
    //console.log("Applying yOffset:", yOffset, "Results in y:", y)
    //console.log("scrollToJustAbove")
    window.scrollTo({top: y, behavior: 'smooth'});
}

function get_hits(submit_str) {
    // Build object key/value pairs of url index found and total points
    const url_ndx_points = {};
    const words = submit_str.split(' ');

    for (const word of words) {
        l_word = word.toLowerCase();
        /* If word not found, subtract "es", "s", 'ed", etc and check again */
        if (!(check_word(l_word, url_ndx_points))) {
            check_root_word(l_word, url_ndx_points);
        }
    }
    // Sort by points highest to lowest
    let sorted = Object.entries(url_ndx_points).sort((a, b) => b[1] - a[1])
    return sorted
}

function check_word(l_word, url_ndx_points) {
    // If search word not in database, exit
    if (!(l_word in search_words)) return false;

    let result_indices = search_words[l_word]
    let url_points = Object.entries(result_indices);

    for (var i = 0; i < url_points.length; i++) {
        const [key, value] = url_points[i].toString().split(',');
        if (key in url_ndx_points) { url_ndx_points[key] += parseFloat(value); }
                              else { url_ndx_points[key] = parseFloat(value); }
    }
    return true;
}

function check_root_word(word, url_ndx_points) {

    /* Port Python from website_search.py:

    def word_excluded(self, word):

    # If word ends in "es" and no match subtract that and check for match
    # If word ends in "'s"      "           "           "           "
    # If word ends in "s"       "           "           "           "
    # If word ends in "es"      "           "           "           "
    # If word ends in "ed"      "           "           "           "
    # If word ends in "ly"      "           "           "           "
    # If word ends in "n't"     "           "           "           "
    # If word ends in "ing"     "           "           "           "
    */

    const last_3 = word.slice(-3);
    if (last_3 == "ing" || last_3 == "n't") {
        if (check_word(word.slice(0, -3), url_ndx_points)) {
            return true; }}

    const last_2 = word.slice(-2);
    if (last_2 == "ly" || last_2 == "ed" || last_2 == "'s" || last_2 == "es") {
        if (check_word(word.slice(0, -2), url_ndx_points)) {
            return true; }}

    const last_1 = word.slice(-1);
    if (last_1 == "s") {
        if (check_word(word.slice(0, -1), url_ndx_points)) {
            return true; }}

    return false;  // After subtracting suffixes, no root word was found
}

/*
    COLOR SCHEMES (Themes)
    ======================

    This file /assets/js/search.js is the only one that can achieve this:

    </header>

    {% include tcm-draggable-window.html %}

    <main id="content" class="main-content" role="main">

      {% include search.html %}
      <script type="text/javascript" src="/assets/js/search.js" ></script>

      {{ content }}

    </main>
  </body>

    The class "main-content" (there should only be one) contains many of
    colour codes
*/

    //var ctMainElm = document.getElementsByClassName('main-content')[0]
    const ctMainElm = document.getElementById('content')
    console.log("ctMainElm:", ctMainElm)

/*  kbd {
        background-color: #fafbfc;
        border: 1px solid #c6cbd1;
        border-bottom-color: #959da5;
        box-shadow: inset 0 -1px 0 #959da5;
        color: #444d56;
    }
*/

    //var kbdBackgroundColor = ctMainElm.getElementsByTagName('kbd')[0].
    //    getAttribute('background-color')
    var kbdBackgroundColor = ctMainElm.getElementsByTagName('kbd')
    console.log("kbdBackgroundColor:", kbdBackgroundColor)


/* End of /assets/js/search.js */