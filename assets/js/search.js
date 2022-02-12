// From: https://stackoverflow.com/a/12393346/6929343
window.MyLib = {}; // global Object container; don't use var

var search_include = null         // global context
var search_urls = null           //   "      "

async function load_search_objects() {
    search_include = await this.getJSON('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json');
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

// Get the modal - From: https://stackoverflow.com/a/46296164/6929343
//var modal = document.getElementById('search-modal');
// modal.style.display = "none";  // Fudge -- Appears before clicking???

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

// From: https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
function submitted(event) {
    event.preventDefault();                 // Not sure what this does?
    const results = get_results(q.value);   // URLS matching search words into array
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
    const top_summary = sum_and_sort(results, 1000); // Maximum 1000 links
    //console.log("input width: " + q.offsetWidth);
    //console.log("Top 25 results: " + top_summary + " | Top 5 URLs below:");
    //for (url_ndx of top_summary.slice(0, 5)) {
        // console.log("url_ndx: " + url_ndx + " | URL: " + search_urls[url_ndx]);
        // const arr = search_urls[url_ndx].split(' | ', 1);
        // hyper_link = arr[0];
        // hyper_title = search_urls[url_ndx].substring(hyper_link.length + 3);
        // console.log("url_ndx: " + url_ndx + " | Title: " + hyper_title);
    //}
    // Process all results
    html += "<ol>\n"
    for (url_ndx of top_summary) {
        const arr = search_urls[url_ndx].split(' | ', 1);
        hyper_link = arr[0];
        hyper_title = search_urls[url_ndx].substring(hyper_link.length + 3);
        html += "  <li><a href='" + hyper_link + "'>" + hyper_title + "</a></li>\n";
    }
    html += "</ol>\n";

    h.innerHTML = html;              // Put search results into modal box
    m.style.display = "block";       // Display search results by displaying modal
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

function get_results(submit_str) {
    // Build list array of each time url index found
    const results_list = [];
    const words = submit_str.split(' ');

    for (const word of words) {
        lword = word.toLowerCase();
        // console.log('lword: ' + lword);
        // if (typeof search_include[lword] !== undefined && search_include[lword] !== null) {
        if (lword in search_include) {
            // console.log('search_include[lword]: ' + search_include[lword]);
            let result_indices = search_include[lword] + '';
            // append '' see: https://stackoverflow.com/a/10145979/6929343
            const results = result_indices.split(",");
            // console.log('results: ' + results)
            for (const result in results) {
                // results_list.push(result);  // Key of object, not value in array :(
                results_list.push(results[result]);
            }
            // console.log('results_list: ' + results_list)
        }
    }
    return results_list
}

function sum_and_sort(raw, top_limit) {
    // summarize number of times url found and sort high to low
    // https://stackoverflow.com/a/37604992/6929343
    let counts = raw.reduce((map, item) => {
        map[item] = (map[item] || 0) + 1;
        return map;
    }, {});

    sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

    return sorted.slice(0, top_limit);
}

/* End of /assets/js/search.js */
