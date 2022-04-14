---
---
/* ============================================================================

    /assets/js/sound.js

============================================================================ */

// Session Storage statistics
var stock_sounds = {}  // FUTURE

// search_stats declared in /assets/js/search.js
if (localStorage.Alarm_03 === undefined) { load_sound('Alarm_03'); }
else { var Alarm_03 = JSON.parse(localStorage.getItem('Alarm_03')); }

// Fetch config.yml from internet or session Storage

async function load_sound(name) {
    // Get from internet and store in localStorage
    // raw_url defined in /assets/js/search.js
    var audioFileUrl = "{{ site.url }}/assets/sound/" + name + ".mp3"
    fetch(audioFileUrl)
      .then(function(res) {
        res.blob().then(function(blob) {
          //var size = blob.size;
          //var type = blob.type;
          var reader = new FileReader();

          reader.addEventListener("loadend", function() {
            // console.log('reader.result:', reader.result);
            // 1: play the base64 encoded data directly works
            // audioControl.src = reader.result;
            // 2: Serialize the data to localStorage and read it back then play...
            var base64FileData = reader.result.toString();
            var mediaFile = {
              fileUrl: audioFileUrl,
              size: blob.size,
              type: blob.type,
              src: base64FileData
            };
            // save the file info to localStorage
            localStorage.setItem(name, JSON.stringify(mediaFile));
            // Move below to new control
            //var reReadItem = JSON.parse(localStorage.getItem(name));
            //audioControl.src = reReadItem.src;
          });
          // Appears below is executed first, then above runs...
          reader.readAsDataURL(blob);
        });
      });
}

const stockNames = ["Alarm_03.mp3", "Alarm_10.mp3", "Alarm_12.mp3"];
const stockPrefix = "{{ site.url }}/assets/sound/";

function loadStockNames () {
    // If stock name isn't in local storage, fetch it from website
    for (var i = 0; i < stockNames.length; i++) {
        console.log('stockNames[i]: ' + stockPrefix + stockNames[i])
        if (localStorage.getItem(stockNames[i]) === undefined) {
            fetch_sound(stockPrefix + stockNames[i]);
        }
    }
}

loadStockNames();

async function fetch_sound(name) {
    // Get from internet and store in localStorage
    fetch(name)
      .then((response)=>response.blob())
      .then((results)=>{
/*
     .then(function(res) {
        res.blob().then(function(blob) {

*/
        var size = results.size;
        var type = results.type;
        var reader = new FileReader();

        reader.addEventListener("loadend", function() {
            var base64FileData = reader.result.toString();
            var mediaFile = {
              fileUrl: name,
              size: blob.size,
              type: blob.type,
              src: base64FileData
            };
            // save the file info to localStorage
            localStorage.setItem(name, JSON.stringify(mediaFile));
            console.log('fetch_sound() COMPLETE: ' + name);
        });
        // Above listener is executed when below reader completes
        reader.readAsDataURL(blob);
      });
    console.log('fetch_sound() STARTED: ' + name);
}


/* End of /assets/js/sound.js */