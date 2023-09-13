---
---
/*  /assets/js/search.js - Search word processing
    icons from: https://www.cleanpng.com/
*/

// Use site.code from _config.yml to build raw_url
const code_url = "{{ site.code_url }}";
// code_url: https://       github.com        /pippim/pippim.github.io/blob/main
//  raw_url: https://raw.githubusercontent.com/pippim/pippim.github.io/main
var raw_url = code_url.replace('github', 'raw.githubusercontent');
raw_url = raw_url.replace('/blob/', '/');
const timeScriptStarted = new Date().getTime();
const oneDay= 1000 * 60 * 60 * 24;

// search statistics kept in sessionStorage
var search_stats = {}
if (sessionStorage.search_stats === undefined) newStats()
else search_stats = JSON.parse(sessionStorage.getItem('search_stats'))

// if search_stats["timeCreated"] > 24 hours old, erase sessionStorage
// Don't use sessionStorage.clear() because we loose TCM Window Visibility
if (search_stats["timeCreated"] < timeScriptStarted - oneDay) {
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
    // Get from server and store in session for faster access
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
    flagPostsByYear = "false"
    timeSiteRefreshed = timeScriptStarted;  // Give default if not found
    for (var i = 0; i < arrConfigYml.length; i++) {
        // Also in tcm-common-code.js consider global function
        var a = arrConfigYml[i].split(':')
        var ymlKey = a.shift()      // https://stackoverflow.com/a/5746883/6929343
        var ymlValue = a.join(':')  // Some values have : in them

        var ymlKeyValue = arrConfigYml[i].split(':')
        // if (i == 14) alert(ymlKey +" ymlValue.trim(): " + ymlValue.trim())
        if (ymlValue.length > 0 && !ymlKey.startsWith('#')) {
            if (ymlKeyValue[0] == "posts_by_year")
                flagPostsByYear = ymlKeyValue[1].trim()
            if (ymlKey == "refreshed")
                timeSiteRefreshed = Date.parse(ymlValue.trim());
        }
    }
}

function newStats () {
    search_stats = {} // Wipe out previous stats
    search_stats["timeCreated"] = timeScriptStarted;
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
const i = document.getElementById('search-clear-input');    // Red BackTab to clear search words
                                                            // Black 'X' to close search
const jb = document.getElementById('jump-button');          // Jump to h1, h2, menu
const jm = document.getElementById('jump-modal');           // Jump modal container
const jc = document.getElementById('jump-modal-text')       // Jump modal 'X' close button
const jt = document.getElementById('jump-modal-text');      // Jump modal text
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

// When the user clicks on <span> (x), close the modal
var boolJumpModal = false  // Is jump form active?
jc.onclick = function () {
    event.stopPropagation()  // Don't let window.onclick see this click
    jm.style.display = "none";   // Turn off display for search results modal
    boolJumpModal = false
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
        //const jb = document.getElementById('jump-button');          // Jump to h1, h2, menu
        //const jm = document.getElementById('jump-modal');           // Jump modal container
        //const jt = document.getElementById('jump-modal-text');      // Jump modal text
        //const m = document.getElementById('search-modal');          // Where search results appear
        event.stopPropagation()  // Don't let window.onclick see this click
        boolDropdown = !boolDropdown
        if (boolDropdown) {
            d.scrollIntoView()  // Move to top so children have room to grown

            e.style.display = "block"  // Sep 1/23 overlaps header bottom
            //e.style.display = "inline-block"  // Sep 1/23 was overlapping header
            //e.style.width = "100%"  // Sep 1/23 force below header
            setContentDimmed(e)
            // Move to top so children have room to grown (after scrollbar removed)
            scrollToJustAbove(e)
            // Search form may be open and stopPropagation stops window.click() running
            f.style.display = "none";  // Close search form
            boolSearchForm = false
            m.style.display = "none";  // close search results modal
        } else {
            e.style.display = "none"
            window.scrollTo({top: 0, behavior: 'smooth'});
            reverseContentDimmed()
        }
        //console.log("d.onclick boolDropdown:", boolDropdown, "boolSearchForm:", boolSearchForm)
    }
}

var boolSearchForm = false  // Is search form active?

// Search Magnify Glass button clicked
// Loop through all class named .page-header-search-button
for (var ndx = 0; ndx < n.length; ndx++) {
    //ndxPageHeaderSearchButton = ndx
    n[ndx].onclick = function (event) {
        //const d = document.getElementById('page-header-dropdown');  // The hamburger menu
        //const e = document.getElementById('dropdown-content');      // hamburger menu dropdown options
        //const f = document.getElementById('search-form');           // Wrapper around query & close button
        //const jb = document.getElementById('jump-button');          // Jump to h1, h2, menu
        //const jm = document.getElementById('jump-modal');           // Jump modal container
        //const jt = document.getElementById('jump-modal-text');      // Jump modal text
        //const m = document.getElementById('search-modal');          // Where search results appear
        //const n = document.getElementsByClassName('page-header-search-button');
        event.stopPropagation()  // Don't let window.onclick see this click
        boolSearchForm = !boolSearchForm
        if (boolSearchForm) {
            // Search form is open
            f.style.display = "flex"
            setContentDimmed(g)  // New g replaces f
            // Move to top so children have room to grow (after scrollbar removed)
            scrollToJustAbove(g)
            // Cursor into search words input field
            q.focus();  // _includes/search.html id="search_query"
            q.select();
            // Hamburger dropdown may be open and stopPropagation stops window.click() running
            if (e !== null && e != "none") {
                e.style.display = "none";  // Close dropdown menu options
                boolDropdown = false
            }
        }
        else {
            //f.style.display = "none"
            //m.style.display = "none"  // Search modal may be open
            //window.scrollTo({top: 0, behavior: 'smooth'});
            //reverseContentDimmed()
            closeSearchForm()  // Sep 2/23
            /* TODO: Check function below:
                function closeSearchForm() {
                    f.style.display = "none"  // Close search form
                    boolSearchForm = false
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    reverseContentDimmed()
                }
            */
        }
        //console.log("p.onclick boolDropdown:", boolDropdown, "boolSearchForm:", boolSearchForm)
    }
}

// Handle ESC key (key code 27)
// https://stackoverflow.com/a/27759070/6929343
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27 && boolSearchForm) {
        closeSearchForm();
    }
});



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
        return
    }

    if (!jm.contains(event.target) && jm.style.display != "none") {
        jm.style.display = "none"  // Close search results modal
        return
    }

    if (!f.contains(event.target) && f.style.display != "none") {
        closeSearchForm()
        return
    }
    if (e !== null && e.style.display != "none") {
        //console.log("e.style.display:", e.style.display)
        e.style.display = "none"  // Close dropdown menu options
        boolDropdown = false
        window.scrollTo({top: 0, behavior: 'smooth'});
        reverseContentDimmed()
    }
}

function closeSearchForm() {
    /* Shared between 'X' to close and click outside search query */
    //const f = document.getElementById('search-form');           // Wrapper around query & close button
    f.style.display = "none"  // Close search form
    m.style.display = "none"  // Sep 2/23 - Search modal may be open
    boolSearchForm = false
    window.scrollTo({top: 0, behavior: 'smooth'});
    reverseContentDimmed()
}

var saveBackgroundColor;  // May 18/22 - New code not working

// Search Magnify Glass button clicked
// Loop through all class named .page-header-search-button
jb.onclick = function (event) {
    //const d = document.getElementById('page-header-dropdown');  // The hamburger menu
    //const e = document.getElementById('dropdown-content');      // hamburger menu dropdown options
    //const f = document.getElementById('search-form');           // Wrapper around query & close button
    //const jb = document.getElementById('jump-button');          // Jump to h1, h2, menu
    //const jm = document.getElementById('jump-modal');           // Jump modal container
    //const jt = document.getElementById('jump-modal-text');      // Jump modal text
    //const m = document.getElementById('search-modal');          // Where search results appear
    //const n = document.getElementsByClassName('page-header-search-button');
    event.stopPropagation()  // Don't let window.onclick see this click
    e.style.display = "none"  // Drop down content
    boolDropdown = false
    f.style.display = "none"  // Search form
    m.style.display = "none"  // Search modal
    boolSearchForm = false
    reverseContentDimmed()

    boolJumpModal = !boolJumpModal
    if (boolJumpModal) {
        jm.style.display = "block";      // Display search results by revealing modal
        setContentDimmed(jm)
    }
    else {
        //window.scrollTo({top: 0, behavior: 'smooth'});
        closeJumpModal()
    }
    //console.log("p.onclick boolDropdown:", boolDropdown, "boolJumpModal:", boolJumpModal)
}

function closeJumpModal() {
    /* Shared between set_x_to_close and click outside modal */
    //const f = document.getElementById('search-form');           // Wrapper around query & close button
    jm.style.display = "none"  // Close jump modal
    boolJumpModal = false
    reverseContentDimmed()
}

// From: https://stackoverflow.com/a/35376840/6929343
// Change 'i' to 'hi' and 'j' to 'hj'
/*
for (hi=1; hi<=6; hi++) {
    var headers = document.getElementsByTagName('h'+hi);
    for (hj=0; hj<headers.length; hj++) {
        headers[hj].className = 'h';
    }
}
var headers = document.getElementsByClassName('h');
for (hi=0; hi<headers.length; hi++) {
    headers[hi].innerHTML += ' '+hi;
}
*/

function setContentDimmed(elm) {
    document.body.style.overflow = "hidden"
    elm.classList.add("dim-body")
}

function reverseContentDimmed() {
    document.body.style.overflow = "auto"
    e.classList.remove("dim-body")  // dropdown menu dimming
    f.classList.remove("dim-body")  // search form dimming
    g.classList.remove("dim-body")  // search form dimming
    jm.classList.remove("dim-body")  // jump-modal
}

f.addEventListener('submit', submitted);

f.addEventListener('input', set_x_to_close);

// Close ('X') or back tab character clicked on search input bar
i.onclick = function(event) {
    // Oct 15/22: Instead of making 'X' icon appear, change to: ⌫ ("&#x232B;")
    if (q.value !== "") {
        q.value = ""  // Erase search string
        set_x_to_close()  // Set 'X' (Close) icon or back tab character
    }
    else {
        closeSearchForm()
        closeJumpModal()  // Sep 13/23 new modal shares 'X' close
    }
}

function set_x_to_close() {
    // Oct 15/22: Instead of making 'X' icon appear, change to erase icon
    // const q = document.getElementById('search-query');
    // const i = document.getElementById('search-clear-input');
    if (q.value == "") {
        i.style.backgroundImage = "url({{ site.url }}/assets/img/icons/x.png)"
        i.title = "Close search form"
    }
    else {
        i.style.backgroundImage = "url({{ site.url }}/assets/img/icons/erase_input.png)"
        i.title = "Clear search word(s)"
    }
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
    }
    html += "</ol>\n";

    h.innerHTML = html;             // Put search results into modal box
    m.style.display = "block";      // Display search results by revealing modal
    scrollToJustAbove(m)            // Give room to display results without scrolling
}

function scrollToJustAbove(element) {
    // From: https://stackoverflow.com/a/56391657/6929343
    const yOffset = -80;
    const y_new = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y_new, behavior: 'smooth'});
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

/* End of /assets/js/search.js */