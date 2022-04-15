---
---
/* ============================================================================

    /assets/js/sound.js

============================================================================ */

// Session Storage statistics
var stock_sounds = {}  // FUTURE
const stockNames = ["Alarm_03.mp3", "Alarm_10.mp3", "Alarm_12.mp3"];
const stockPrefix = "{{ site.url }}/assets/sound/";

function loadStockNames () {
    // If stock name isn't in local storage, fetch it from website
    for (var i = 0; i < stockNames.length; i++) {
        console.log('stockNames[i]: ' + stockPrefix + stockNames[i])
        // console.log(localStorage.getItem(stockNames[i]))
        if (localStorage.getItem(stockNames[i]) === null) {
            fetch_sound(stockNames[i]);
        }
    }
}

loadStockNames();

async function fetch_sound(name) {
    // Get sound file from website and add to localStorage
    console.log('fetch_sound() PRE-FETCH: ' + name);
    fetch(stockPrefix + name)
    .then((response)=>response.blob())
    .then((results)=>{
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
        });
        // Above listener is executed when below reader completes
        reader.readAsDataURL(results);
    });
}


/* End of /assets/js/sound.js */