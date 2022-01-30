// From: https://stackoverflow.com/a/55784549/6929343
async function load() {
    let url = 'https://raw.githubusercontent.com/pippim/pippim.github.io/main/assets/json/search_include.json';
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch(e) {
        console.log('error');
    }

    console.log(obj["brightness"]);
}

load();
