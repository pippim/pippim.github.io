---
---
/* TODO: Get Server/Local storage:  https://stackoverflow.com/a/23516713/6929343
         Page refreshed date/time:  https://stackoverflow.com/a/47145745/6929343
         Reload Window if obsolete, flag all cached pages as dirty so they reload:
                                    https://stackoverflow.com/a/28041336/6929343
                                    https://stackoverflow.com/a/118886/6929343
*/
window.MyLib = {}; // global Object container; don't use var

var search_words = null           // global context new format as dictionary of points
var search_urls = null            //   "      "

var code_url = "{{ site.code_url }}";
// code_yml: https://       github.com        /pippim/pippim.github.io/blob/main
// raw_yml:  https://raw.githubusercontent.com/pippim/pippim.github.io/main
var raw_url = code_url.replace('github.com', 'raw.githubusercontent.com');
var raw_url = raw_url.replace('/blob/', '/');

async function load_search_objects() {
    search_words = await this.getJSON('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_words.json');
    // TODO: rename search_url.json to search_urls.json
    search_urls  = await this.getJSON('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json');

    /* Following doesn't work when search_include is still a promise and not yet an array....
    if (search_include typeof !== Promise) && (search_include.length === 0) {
        search_include = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json')
    } else {
        console.log('Using preloaded search_include object')
    }
    if (search_urls typeof !== Promise) && (search_urls.length === 0) {
        search_urls  = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json')
    } else {
        console.log('Using preloaded search_urls object')
    }
    */
}

async function load(url) {
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch(e) {
        console.log("load(url) error: 'obj' could not be fetched.");
    }

    return obj;
}

// https://stackoverflow.com/a/51992739/6929343
async function getJSON(url) {
    return fetch(url)
        .then((response)=>response.json())
        .then((responseJson)=>{return responseJson});
}


// Preload search objects
load_search_objects();

// Note theCokkieMachine.js is already using b:
// const b = document.getElementById('tcm_window_body')  // Website tree entries html codes

// From: https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
const c = document.getElementsByClassName("close")[0];  // Both 'X' close classes
const f = document.getElementById('search-form');
const q = document.getElementById('search-query');      // Search words input by user
const h = document.getElementById('search-modal-text')  // Search results html codes
const i = document.getElementById('search-clear-input');
const m = document.getElementById('search-modal');

check_q_values();  // Initial 'X' (close on input bar) status when page refreshed

// When the user clicks on <span> (x), close the modal
c.onclick = function () {
    m.style.display = "none";   // Turn off display for search results
    // Also called when X clicked in input bar, but handled in i.onclick listen
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (!m.contains(event.target)) {
        m.style.display = "none";   // Turn off display for search results
    }
}

f.addEventListener('submit', submitted);

q.addEventListener('keyup', function() {
    /* Fired on every key press */
    check_q_values();
});

q.addEventListener('paste', function() {
    /* Fired when pasting from clipboard */
    check_q_values();
});

q.addEventListener('cut', function() {
    /* Fired when cutting text */
    check_q_values();
});

// Handle multiple query input actions at cne time
// ['keydown', 'paste', 'cut'].forEach( function(evt) {
//     q.addEventListener(evt, check_q_values(), false);
// });

// Close ('X') clicked on search input bar
i.onclick = function(){
    q.value = "";
    check_q_values();
};

function check_q_values() {
    if (q.value !== "") {
        i.style.display = "block";
    } else {
        i.style.display = "none";
    }
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

/* NEW format using object of posts and points */
function get_hits(submit_str) {
    // Build object key/value pairs of url index found and total points
    const url_ndx_points = {};
    const words = submit_str.split(' ');

    for (const word of words) {
        l_word = word.toLowerCase();
        /* NEW style */
        if (!(check_word(l_word, url_ndx_points))) {
            check_root_word(l_word, url_ndx_points);
        }
        /* end of NEW style */

        /* OLD Style
        if (l_word in search_words) {
            let result_indices = search_words[l_word]
            let url_points = Object.entries(result_indices);

            for (var i = 0; i < url_points.length; i++) {
                const [key, value] = url_points[i].toString().split(',');
                if (key in url_ndx_points) {
                    url_ndx_points[key] += parseFloat(value);
                } else {
                    url_ndx_points[key] = parseFloat(value);
                }
            }
        }
        End of OLD style */
    }
    let sorted = Object.entries(url_ndx_points).sort((a, b) => b[1] - a[1])
    return sorted
}

function check_word(l_word, url_ndx_points) {

    if (!(l_word in search_words)) return false;

    let result_indices = search_words[l_word]
    let url_points = Object.entries(result_indices);

    for (var i = 0; i < url_points.length; i++) {
        const [key, value] = url_points[i].toString().split(',');
        if (key in url_ndx_points) {
            url_ndx_points[key] += parseFloat(value);
        } else {
            url_ndx_points[key] = parseFloat(value);
        }
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
            return true;
        }
    }
    const last_2 = word.slice(-2);
    if (last_2 == "ly" || last_2 == "ed" || last_2 == "'s" || last_2 == "es") {
        if (check_word(word.slice(0, -2), url_ndx_points)) {
            return true;
        }
    }
    const last_1 = word.slice(-1);
    if (last_1 == "s") {
        if (check_word(word.slice(0, -1), url_ndx_points)) {
            return true;
        }
    }
    return false;
}

/* End of /assets/js/search.js */
