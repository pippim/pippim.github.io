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
    var audioFileUrl = raw_url + "/assets/sound/" + name + ".mp3"
    fetch(audioFileUrl)
      .then(function(res) {
        res.blob().then(function(blob) {
          var size = blob.size;
          var type = blob.type;
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
};

/* End of /assets/js/sound.js */