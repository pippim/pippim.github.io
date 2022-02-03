// From: https://stackoverflow.com/a/12393346/6929343
window.MyLib = {}; // global Object container; don't use var

var search_words = null         // global context
var search_urls = null           //   "      "

async function load_search_objects() {
    search_words = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json')
    search_urls  = await load('https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json', 630)
    // search_fetched();
}

function search_fetched() {
    /* Attach to test button onclick event */
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
const google = 'https://www.google.com/search?q=site%3A+';
const site = 'pippim.github.io';

function submitted(event) {
  event.preventDefault();
  const url = google + site + '+' + q.value;
  const win = window.open(url, '_blank');
  win.focus();
}

f.addEventListener('submit', submitted);


/* End of /assets/js/search.js */
