// From: https://stackoverflow.com/a/12393346/6929343
window.MyLib = {}; // global Object container; don't use var

var search_include = null         // global context old format as list of post indices
var search_words = null           // global context new format as dictionary of points
var search_urls = null            //   "      "

async function load_search_objects() {
    search_include = await this.getJSON('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json');
    search_words = await this.getJSON('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_words.json');
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

function search_fetched() {
    /* Attach to test button onclick event */
    console.log("search_include: " + search_include['display']);
    console.log("search_urls: " + search_urls[630]);
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
    // console.log("c.onclick event");
    // Also called when X clicked in input bar, but handled in i.onclick listen
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (!m.contains(event.target)) {
        m.style.display = "none";   // Turn off display for search results
        // console.log("window.onclick event outside of modal");
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
    console.log('results: ' + results)

    //console.log("Number of results: " + results.length);
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

    // Process all results
    html += "<ol>\n"

    for (var i = 0; i < results.length; i++) {
        const [key, value] = results[i].toString().split(',');
        console.log('key: ' + key + ' value: ' + value);
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
        // console.log('l_word: ' + l_word);
        if (l_word in search_words) {
            let result_indices = search_words[l_word]
            let url_points = Object.entries(result_indices);
            // console.log('url_points: ' + url_points);
            // PRINTS: 113,5.5,238,5.5,474,0.5,572,10
            // console.log('url_points.length: ' + url_points.length)
            // PRINTS: url_points.length: 4
            for (var i = 0; i < url_points.length; i++) {
            //for (const [key, value] in result_indices) {
                const [key, value] = url_points[i].toString().split(',');
                // console.log('key: ' + key + ' value: ' + value);
                if (key in url_ndx_points) {
                //if (url_ndx_points[key]){
                    // Key Exists add to value
                    url_ndx_points[key] += parseFloat(value);
                } else {
                    // Key Exists push into array
                    url_ndx_points[key] = parseFloat(value);
                }
            }
        }
    }
    // console.log('< SORT original first entry: ' +
                Object.keys(url_ndx_points)[0]);
    // See: https://stackoverflow.com/a/37607084/6929343
    let sorted = Object.entries(url_ndx_points).sort((a, b) => b[1] - a[1])
    // console.log('> SORT sorted: ' + sorted)
    return sorted
}

/* End of /assets/js/search.js */
