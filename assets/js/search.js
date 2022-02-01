// From: https://stackoverflow.com/a/12393346/6929343
window.MyLib = {}; // global Object container; don't use var
var search_words = null         // global context
var search_urls = null           //   "      "

// From: https://stackoverflow.com/a/55784549/6929343
var search_words = load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json', 'display')
var search_urls = load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json', 630)

async function load_search_objects() {
    search_words = load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json', 'brightness')
    // console.log(search_words['brightness']);
    search_urls = load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json', 750)
    // console.log(search_urls[750]);
}

async function load(url, key_or_index) {
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch(e) {
        console.log("load(url, key_or_index) error: 'obj' could not be fetched.");
    }

    console.log(obj[key_or_index]);

    return obj
}

async function load_search_objects_old() {
    let url = 'https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json';
    let search_words = null;

    try {
        search_words = await (await fetch(url)).json();
    } catch(e) {
        console.log('error: search_words could not be loaded.');
    }

    console.log(search_words["brightness"]);

    let url2 = 'https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json';
    let search_urls = null;

    try {
        search_urls = await (await fetch(url2)).json();
    } catch(e) {
        console.log('error: search_urls could not be loaded.');
    }

    console.log(search_urls[1000]);
}

// load_search_objects();  // Do we really need this here?
