// From: https://stackoverflow.com/a/12393346/6929343
window.MyLib = {}; // global Object container; don't use var

var search_include = null         // global context
var search_urls = null           //   "      "

async function load_search_objects() {
    if (search_include == null) {
        search_include = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json')
    }
    if (search_urls == null) {
        search_urls  = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json', 630)
    }
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
    console.log("Top 25 results: " + top_summary);
    // const url = google + site + '+' + q.value;
    // const win = window.open(url, '_blank');
    // win.focus();
}

f.addEventListener('submit', submitted);

function get_results(submit_str) {
    // Build list array of each time url index found
    const results_list = [];
    // var result_indices = [];
    const words = submit_str.split(' ');

    for (const word of words) {
        console.log('word: ' + word);
        if (typeof search_include[word] !== undefined && search_include[word] !== null) {
            console.log('search_include[word]: ' + search_include[word]);
            let result_indices = search_include[word];
            console.log('result_indices: ' + result_indices)
            if (typeof result_indices !== undefined && result_indices !== null) {
                const results = result_indices.split(' ');
                for (const result in results) {
                    results_list.push(result);
                }
            } else {
                console.log("result_indices is null for word: " + word);
            }
        }
    }
    return results_list
}

function sum_and_sort(results, top_limit) {
    // summarize number of times url found and sort high to low
    // https://stackoverflow.com/a/37604992/6929343
    let counts = arr.reduce((map, results) => {
        map[results] = (map[results] || 0) + 1;
        return map;
    }, {});

    sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

    return sorted.slice(0, top_limit);
}

/* Need drop down search results: https://stackoverflow.com/a/63610185/6929343
*/

/* End of /assets/js/search.js */
