// From: https://stackoverflow.com/a/12393346/6929343
window.MyLib = {}; // global Object container; don't use var

var search_include = null         // global context
var search_urls = null           //   "      "

// fudge it
var modal = document.getElementById('search-modal');
modal.style.display = "none";

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
    if (results.length == 0) {
        return
    }
    const top_summary = sum_and_sort(results, 25);
    console.log("Top 25 results: " + top_summary + " | Top 5 URLs below:");
    for (url_ndx of top_summary.slice(0, 5)) {
        console.log("url_ndx: " + url_ndx + " | URL: " + search_urls[url_ndx]);
        const arr = search_urls[url_ndx].split(' | ', 1);
        hyper_link = arr[0];
        hyper_title = arr[1];
    }
    console.log("input width: " + document.getElementById("search-query").offsetWidth);

    // Get the modal - From: https://stackoverflow.com/a/46296164/6929343
    var modal = document.getElementById('search-modal');

    // Get the button that opens the modal
    var btn = document.getElementById("search-utf8-mag-glass");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    // invalid assignment left-hand side
    btn.onclick = function () {
        modal.style.display = "block";
        console.log("btn.onclick event");
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        console.log("span.onclick event");
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.log("btn.onclick event");
        }
    }

    // const url = google + site + '+' + q.value;
    // const win = window.open(url, '_blank');
    // win.focus();
}

f.addEventListener('submit', submitted);

Array.prototype.forEach.call(document.querySelectorAll('.clearable-input'), function(el) {
  var input = el.querySelector('input');

  //conditionallyHideClearIcon();
  // input.addEventListener('input', conditionallyHideClearIcon);
  //el.querySelector('[data-clear-input]').addEventListener('click', function(e) {
  // el.querySelector('[search-query]').addEventListener('click', function(e) {
  //  input.value = '';
  //  conditionallyHideClearIcon();
  //});

  function conditionallyHideClearIcon(e) {
    var target = (e && e.target) || input;
    target.nextElementSibling.style.display = target.value ? 'block' : 'none';
  }
});

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

// Fudge it all anyways
var fudge = document.getElementById('search-modal');
fudge.style.display = "none";

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


// Get the modal
//     From: https://stackoverflow.com/a/46296164/6929343
    var modal = document.getElementById('search-modal');

    // Get the button that opens the modal
    var btn = document.getElementById("search-utf8-mag-glass");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

.modal {
            display: none;
            // Hidden by default
            position: fixed;
            // Stay in place
            z-index: 1;
            // Sit on top
            padding-top: 100px;
            // Location of the box
            left: 0;
            top: 0;
            width: 100%;
            // Full width
            height: 100%;
            // Full height
            overflow: auto;
            // Enable scroll if needed
            background-color: rgb(0, 0, 0);
            // Fallback color
            background-color: rgba(0, 0, 0, 0.4);
            // Black w/ opacity
        }
        // Modal Content

        .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            left: 8px;
            position: absolute;
            top: 90px;
        }
        // The Close Button

        .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }

<h2>Modal Example</h2>

    <div><input id="myInputTextBox" /></div>

    <!-- Trigger/Open The Modal -->
    <button id="myBtn">Open Modal</button>

    <!-- The Modal -->
    <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
        </div>

    </div>

*/

/* End of /assets/js/search.js */
