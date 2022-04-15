---
title: Tim-ta (Timed Tasks) - Run Set of Alarms Consecutively
layout: program
---

<!-- javascript for Tim-ta Sounds -->
<script type="text/javascript" src="/assets/js/sound.js" ></script>

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

{% include image.html src="/assets/img/tcm/TCM Header with Gingerbread Man.png"
   alt="TCM Header with Gingerbread Man.png"
   style="float: none; width: 100%; margin: .25rem 0 1rem 0px;"
   caption="The Cookie Machine's Gingerbread Man Button on far right."
%}

*Tim-ta* (**Tim**ed-**ta**sks) gives a countdown timer
where each task is always a predetermined amount of time.
For example, when doing the laundry it might be:

- 16 minutes and 30 seconds for the wash cycle
- 13 minutes and 15 seconds for the rinse cycle
- 58 minutes and 40 seconds for the dryer

With Tim-ta you arrive at the washer and dryer the exact
second you need to be there. You'll Never miss the rinse
cycle fabric softener to eliminate static cling. You'll 
never have wrinkled clothes from being left overnight in
the dryer. It doesn't stop you from mixing red and white
fabrics in hot water to end up with PINK clothes though!

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

{% include image.html src="/assets/img/tcm/TCM transparent button.gif"
   alt="TCM transparent button.gif"
   style="float: left; width: 75%; margin: 2rem 1rem 1rem 0px;"
   caption="The Cookie Machine Transparent Button"
%}

# How to Open The Cookie Machine (TCM)

There is a transparent button you can select to open 
*The Cookie Machine* (TCM).

As the `.gif` animation above shows, the transparent button is
located to the far right of the regular buttons. It is
the same height as the regular buttons.

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Test Sound Files

Click the filenames below to hear their sound. The first section
lists stock sound files. The second section lists sound files
you have uploaded

## Stock Sound Files

Below are {{ site.title }} stock sound files:
<br><br>
- **Alarm_03.mp3**&emsp;&emsp;<audio controls="true" id="Alarm_03.mp3"></audio>
<br><br>
- **Alarm_05.mp3**&emsp;&emsp;<audio controls="true" id="Alarm_05.mp3"></audio>
<br><br>
- **Alarm_12.mp3**&emsp;&emsp;<audio controls="true" id="Alarm_12.mp3"></audio>


## Custom Stock Files


Alarm_03.mp3

<script>
// Code goes here

var audioFileUrl = '{{ site.url }}/assets/sound/Alarm_03.mp3';
window.onload = function() {
  var downloadButton = document.getElementById('download');
  var audioControl = document.getElementById('audio');
  audioControl.onerror = function(){
    console.log(audioControl.error);
  };
  downloadButton.addEventListener('click', function() {
    audioControl.src = null;

    fetch(audioFileUrl)
      .then(function(res) {
        res.blob().then(function(blob) {
          // var size = blob.size;  // Comment out to test if needed
          // var type = blob.type;
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
            localStorage.setItem('myTest', JSON.stringify(mediaFile));
            // read out the file info from localStorage again
            var reReadItem = JSON.parse(localStorage.getItem('myTest'));
            audioControl.src = reReadItem.src;
          });
          reader.readAsDataURL(blob);
        });
      });
   });
};

</script>

<button id="download">Fetch file</button>
<br />
<audio controls="true" id="audio"></audio>

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a></div>
