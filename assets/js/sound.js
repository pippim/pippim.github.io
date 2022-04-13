---
---
/* ============================================================================

    /assets/js/sound.js

============================================================================ */

// Session Storage statistics
var stock_sounds = {}

// search_stats declared in /assets/js/search.js

// Fetch config.yml from internet or session Storage

async function load_sound_file(path) {
    // Get from internet and store in session
    fetch(raw_url + path)
        .then((response)=>response.text())
        .then((responseJson)=>{
            config_yml = responseJson;
            buildConfigYml()
            sessionStorage.setItem('config_yml', config_yml);
            search_stats["timeSiteRefreshed"] = timeSiteRefreshed;
            //search_stats["timeSiteRefreshed"] = 16930518;
            buildStats('_config.yml Count', arrConfigYml.length);
            buildStats('_config.yml Size', config_yml.length);
        });
}

// From: https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
function play_sound(event) {

    event.preventDefault();                 // Not sure what this does?
}

/* End of /assets/js/sound.js */