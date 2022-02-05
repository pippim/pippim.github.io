// From: https://stackoverflow.com/a/12393346/6929343
window.MyLib = {}; // global Object container; don't use var

var search_include = null         // global context
var search_urls = null           //   "      "

async function load_search_objects() {
    search_include = await this.getJSON('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json');
    search_urls  = await this.getJSON('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json');

    /* Following doesn't work when search_include is still a promise and not yet an array....
    if (search_include.length === 0) {
        search_include = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json')
    } else {
        console.log('Using preloaded search_include object')
    }
    if (search_urls.length === 0) {
        search_urls  = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json')
    } else {
        console.log('Using preloaded search_urls object')
    }
    */
    // search_fetched();
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
/* ORIGINAL
const f = document.getElementById('form');
const q = document.getElementById('query');
const google = 'https://www.google.com/search?q=site%3A+';
const site = 'pagedart.com';

function submitted(event) {
    event.preventDefault();
    const url = google + site + '+' + q.value;
    const win = window.open(url, '_blank');
    win.focus();
}

f.addEventListener('submit', submitted);
*/

const f = document.getElementById('search-form');
const q = document.getElementById('search-query');
// const google = 'https://www.google.com/search?q=site%3A+';
// const site = 'pippim.github.io';

function submitted(event) {
    event.preventDefault();
    const q = document.getElementById('search-query');  // Added later, not sure if required...
    const results = get_results(q.value);
    console.log("Number of results: " + results.length);
    const top_summary = sum_and_sort(results, 25);
    console.log("Top 25 results: " + top_summary + " | Top 5 URLs below:");
    for (url_ndx of top_summary.slice(0, 5)) {
        console.log("url_ndx: " + url_ndx + " | URL: " + search_urls[url_ndx]);
        const arr = search_urls[url_ndx].split(' | ', 1);
        hyper_link = arr[0];
        hyper_title = arr[1];
    }
    console.log("input width: " + document.getElementById("search-query").offsetWidth);

    // const url = google + site + '+' + q.value;
    // const win = window.open(url, '_blank');
    // win.focus();
}

f.addEventListener('submit', submitted);

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

/* Need drop down search results: https://stackoverflow.com/a/63610185/6929343

    https://stackoverflow.com/questions/16806406/javascript-popup-window-with-scrollbars
    
    https://stackoverflow.com/questions/29326226/creating-javascript-search-boxes-for-custom-sites-that-create-popup-windows-show
    
    https://stackoverflow.com/questions/44678100/javascript-display-search-results-on-page
    
    Need to format HTML: https://stackoverflow.com/questions/2109205/open-window-in-javascript-with-html-inserted
*/

/* End of /assets/js/search.js */
