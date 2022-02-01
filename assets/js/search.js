// From: https://stackoverflow.com/a/12393346/6929343
window.MyLib = {}; // global Object container; don't use var

var search_words = null         // global context
var search_urls = null           //   "      "

// From: https://stackoverflow.com/a/55784549/6929343
// Below runs OK, but what's the point if it's not saved?
// var search_words = load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json', 'display')
// var search_urls = load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json', 630)

async function load_search_objects() {
    search_words = load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json', 'brightness')
    // console.log(search_words['brightness']);  // Undefined because fetch isn't finished?
    search_urls = load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json', 750)
    // console.log(search_urls[750]);  // Undefined because fetch isn't finished?
}

async function load(url, key_or_index) {
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch(e) {
        console.log("load(url, key_or_index) error: 'obj' could not be fetched.");
    }

    console.log(obj[key_or_index]);  // obj[index] Works ok here, but not outside of function?

    return obj  // Are we returning nothing because fetch isn't finished yet?
}

/* End of /assets/js/search.js */
