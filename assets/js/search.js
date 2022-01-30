// From: https://stackoverflow.com/a/55784549/6929343
async function load_search_objects() {
    let url = 'https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json';
    let search_words = null;

    try {
        search_words = await (await fetch(url)).json();
    } catch(e) {
        console.log('error: search_words could not be loaded.');
    }

    console.log(search_words["brightness"]);

    let url = 'https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_url.json';
    let search_urls = null;

    try {
        search_urls = await (await fetch(url)).json();
    } catch(e) {
        console.log('error: search_urls could not be loaded.');
    }

    console.log(search_urls[1000]);
}
