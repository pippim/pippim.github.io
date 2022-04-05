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

// Search statistics
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
            sessionStorage.setItem('search_words', search_words_store);
            buildStats('Search Words Count', Object.keys(search_words).length);
            buildStats('Search Words Size', search_words_store.length);
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
            buildStats('Search URLs Count', search_urls.length);
            buildStats('Search URLs Size', search_urls_store.length);
        });
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
            buildStats('_config.yml Count', arrConfigYml.length);
            buildStats('_config.yml Size', config_yml.length);
        });
}

function buildConfigYml () {
    // Sets global array arrConfigYml and flagPostsByYear used by two functions
    // NOTE: Cannot call on page load because fetch is running asynchronously
    arrConfigYml = config_yml.split("\n")  // Convert string into array
    // Set flagPostsByYear flag
    flagPostsByYear = "false";
    for (var i = 0; i < arrConfigYml.length; i++) {
        var ymlKeyValue = arrConfigYml[i].split(':');
        if (ymlKeyValue.length == 2 && !ymlKeyValue[0].startsWith('#')) {
            if (ymlKeyValue[0] == "posts_by_year") {
                flagPostsByYear = ymlKeyValue[1].trim();
            }
            if (ymlKeyValue[0] == "refreshed") {
                timeSiteRefreshed = Date.parse(ymlKeyValue[1].trim());
                alert("timeSiteRefreshed: " + timeSiteRefreshed);
            }
        }
    }
}

function newStats () {
    search_stats = {} // Wipe out previous stats
    search_stats["timeCreated"] = timeNow;
}

function buildStats (key, value) {
    search_stats[key] = value
    // console.log('adding key/value: ' + key + " / " + value +
    //            " | length: " + Object.keys(search_stats).length);
    // After 7 stats (plus timestamp) we are done
    if (Object.keys(search_stats).length = 8) {
        // alert("5 search stats created");
        sessionStorage.setItem('search_stats', JSON.stringify(search_stats));
    }
}

/*  NOTE: theCookieMachine.js is already using b:
    const b = document.getElementById('tcm_window_body') */

// From: https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
const c = document.getElementById('search-modal-close');    // 'X' close search results
const f = document.getElementById('search-form');           // Wrapper around query & close button
const q = document.getElementById('search-query');          // Search words input by user
const h = document.getElementById('search-modal-text')      // Search results html codes
const i = document.getElementById('search-clear-input');    // 'X' to clear search words
const m = document.getElementById('search-modal');          // Where search results appear

set_x_to_close();  // Initial 'X' (close on input bar) status when page refreshed

// When the user clicks on <span> (x), close the modal
c.onclick = function () {
    m.style.display = "none";   // Turn off display for search results
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (!m.contains(event.target)) { m.style.display = "none"; }
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

    event.preventDefault();                 // Not sure what this does?
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

    h.innerHTML = html;              // Put search results into modal box
    m.style.display = "block";       // Display search results by revealing modal
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