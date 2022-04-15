---
---
/* ============================================================================

    /assets/js/sound.js

    ONLY for webpages that need it, include this script to preload (fetch)
    sound files (audio files).

============================================================================ */

// Session Storage statistics
const stockNames = ["Alarm_03.mp3", "Alarm_05.mp3", "Alarm_12.mp3"];
const stockPrefix = "{{ site.url }}/assets/sound/";

function loadStockNames () {
    // If stock name isn't in local storage, fetch it from website
    for (var i = 0; i < stockNames.length; i++) {
        var localItem = JSON.parse(localStorage.getItem(stockNames[i]));
        if (localItem === null) { fetch_sound(stockNames[i]); }
        else { setSoundSource(stockNames[i], localItem); } } }

// document.addEventListener("DOMContentLoaded", function(event){
    loadStockNames();
// });

async function fetch_sound(name) {
    // Get sound file from website and add to localStorage
    fetch(stockPrefix + name)
    .then((response)=>response.blob())
    .then((results)=>{
        // Create asynchronous 'reader' and listen for it to finish
        var reader = new FileReader();
        reader.addEventListener("loadend", function() {
            var base64FileData = reader.result.toString();
            var mediaFile = {
              fileUrl: name,
              size: results.size,
              type: results.type,
              src: base64FileData
            };
            localStorage.setItem(name, JSON.stringify(mediaFile));
            var reReadItem = JSON.parse(localStorage.getItem(name));
            setSoundSource(name, reReadItem)
        });
        // Above listener is executed when below reader completes
        reader.readAsDataURL(results);
    });
}

function setSoundSource (name, localItem) {
    audioControl = document.getElementById(name);
    audioControl.src = localItem.src;
}

/* End of /assets/js/sound.js */