// From: https://stackoverflow.com/a/12393346/6929343
window.MyLib = {}; // global Object container; don't use var

var search_words = null         // global context
var search_urls = null           //   "      "

// From: https://stackoverflow.com/a/55784549/6929343
var search_words = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json')
var search_urls  = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json', 630)

async function load_search_objects() {
    search_fetched();
}

function search_fetched() {
    console.log("search_words: " + search_words['display']);
    console.log("search_urls:  " + search_urls[630]);
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

/* End of /assets/js/search.js */
