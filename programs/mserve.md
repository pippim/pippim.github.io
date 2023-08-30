---
title: Music Player with CD Encoding, Lyrics Scraping and Synchronizing
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

**mserve** (Music Server) is firstly a Music Player entertains you with 
animated graphics, VU meters and scrolling lyrics. Secondly, it encode CDs
with track titles and artwork automatically obtained from the *MusicBrainz* 
database. **mserve** automatically downloads lyrics scores from the 
internet. Lyrics score lines can be synchronized by simply clicking 
each line as it is sung.

## Multiple Everything
{:.no_toc}

***<font size="5"> Why have one when you can have multiples?: </font>***

- Multiple Locations Synchronization (including mobile and file servers)
- Multiple Playlists per location (every location also has default favorites)
- <a href="#windows-open-where-you-want-them">Multiple Window</a> 
save positions for music location tree, current playing, 
volume control, playlists control, fine-tune time index, location
maintenance, three SQL Table viewers, and CD encoding (ripping)
- Multiple Monitors ensure windows open on correct monitor
- Multiple processes for lag free animations
- Multiple animations for artwork; spin, slide and pixelate
- Multiple VU meters displaying sound level; left and right
- Multiple Show Chronology/Resume Song/Volume/Playlist Buttons states
per Playlist per location
- Multiple sound level fade methods for pause/play, switch sound
source between TV and mserve, fine-tune lyrics time index, etc.
- Multiple CD Encoding formats, quality, images and filename formatting
- Multiple MusicBrainz CD album/track releases to chose from for artist
- Multiple Website Scraping for Lyrics is in progress but currently
defaults to `genius.com`


## Features

**mserve** has regular features you would expect. This section lists
some unique features you might not expect.
 
### Innovative Features Most Applications Don't Have:
{:.no_toc}

- Help buttons in **mserve** bring you directly to this web
page's appropriate sections
- <a href="#synchronize-location">Synchronize files</a> 
across multiple locations, including sleeping hosts 
that are woken up and kept awake as long as necessary
- <a href="#information-centre">Information Centre</a> 
displays history of messages, statuses and actions
- Tooltips appear after time delay, 
<a href="#tooltips-gradually-fade-in-and-out">fade in/out</a>, 
and follow mouse pointer
- <a href="#basic-time-synchronization">Basic Lyrics Time</a> 
Synchronization and 
<a href="#fine-tune-time-index">Advanced Lyrics Time</a> 
Synchronization (Synchronized lyrics lines are stored in 
a Time Index list and this term is frequently used)
- Two timers for playing music during 
<a href="#hockey-tv-commercial-buttons">TV broadcast commercials</a>
- Written in relatively easy to learn Python so you can modify
for Linux, Windows WSL, Chrome OS, Windows (a lot more work) 
and Mac (modest amount of more work)
- An <a href="#sql-database-using-sqlite3">SQL Database</a> 
shares lyrics score and time index 
across all locations for conformity and reduced storage space.
- Proprietary data dictionary technology to quickly 
view SQL table rows and even 
<a href="#sql-location-table-viewer-sample-video">rearrange columns</a>.


### Features Most Music Players Don't Have:
{:.no_toc}

- Album Artwork animations and VU Meters during playback
- Album Artwork at pixel 3,3 coordinates, sets a <a 
href="#automatic-skin-color-based-on-artwork">different color theme</a>, 
during song playback (resizing window can result in different 
color theme)
- Define image file for 
<a href="#image-for-songs-with-no-artwork">songs with no artwork</a>.  
- <a href="#synchronized-lyrics-in-action">Scrolling lyrics</a> 
score during playback (automatically web scraped)
- Two clicks to
<a href="#renaming-artists-albums-and-song-files-after-encoding">
rename Artists, Albums and Song files</a> 
in both the storage device and the **mserve** SQL database 
at the same time.
- <a href="#sample-synchronize-location-test-host-video">
Granular remote host tests</a> 
when location opened for playing or synchronization.
- Encode CD to music files in MP3, MP4, FLAC, WAV and OGA format 
as this 
<a href="#how-to-encode-a-cd-overview">sample video</a> 
demonstrates
- Scrape [MusicBrainz.org 🔗](https://musicbrainz.org/ 
"MusicBrainz for Artist / Album CD track details"){:target="_blank"} 
for Artist / Album CD track details and artwork
- Scrape [genius.com 🔗](https://genius.com/ 
"search song lyrics"){:target="_blank"} 
and other websites to get song lyrics
- Restores file's OS last access time to original if 
less than 80% of song was played
- Updates play count and last play time, if 80% of song played
- Cross-fading other sound sources when toggling play/pause, FF/REW,
and during TV broadcast commercials

## **mserve** is Still Under Construction
{:.no_toc}

{% include image.html src="/assets/img/tim-ta/Tim-ta Under Construction.png"
   alt="Under Construction.png"
   style="float: left; width: 50%; margin: 1rem 2rem 1rem 2rem;"
   caption="Under Construction.png"
%}

> ***IMPORTANT NOTES:*** 
> 
> ⬤ **mserve** was primarily tested with Linux, specifically 
Ubuntu 16.04 LTS and Python 2.7.12.
> 
> ⬤ **mserve** was briefly tested with ChromeOS for about a month 
and modified.
> 
> ⬤ You *should* be able to toggle between Pyhon 2.7.x and 
Python 3.x by changing the *"shebang"* at the top of each `.py`. 
Testing on Python 3.x will begin prior to next **mserve** upgrade.
> 
> ⬤ Current plans are to upgrade to Ubuntu 24.04 LTS and Python 3.12 
in year 2024. A "lite" Ubuntu 16.04 version running Unity may be 
created as some sort of virtual machine. It's already been announced 
that Ubuntu 24.04 (via Debian) will not ship with Python 2.7 anymore.
> 
> ⬤ Support for `sshfs` has been discontinued by the developer in 
November 2022. Plans are underway to switch over to FTP and and 
`curlftpss` to mount host drives locally.
> 
> ⬤ There is **NO** installation script for **mserve**. You will 
have to manually install dependencies with:
> 
>    `sudo apt install python-xxxxx`.

See the
<a href="#mserveDependencies">required dependencies</a>
for **mserve** section for more details. 
For typical power users, many of the dependencies will already
be installed.


## **mserve** Installation

**mserve** (Music Server) is written in Python.
The main program is called `mserve.py` and can be found in the 
[mserve GitHub Repository 🔗](https://github.com/pippim/mserve/blob/main/src/mserve.py 
"View mserve Python source code"){:target="_blank"}. Copy all 
files in the `src` folder to a new directory on your machine. 
For example, `<HOME>/mserve` for Linux, Mac, Chrome OS or 
Windows Subsystem for Linux (WSL), ***or***, `<HOME>\mserve`
for Windows. As of August 30, 2023, **mserve** 
will not run under Windows without modification.

`mserve.py` is called with `m` from the command line or a 
desktop shortcut. It is recommended you start using **mserve**
from the command line to see any error messages that might
appear.

`m` is a wrapper Python script that centers 
a logo on your screen for a moment while **mserve**
is loaded into memory. Using `m` instead of `mserve.py` 
speeds up loading because `mserve.pyc` is automatically 
called and it is half the size. As of August 30, 2023, 
the former is 765 KB and the latter is 409 KB.

`m` and `mserve.py` do not need to be added to your path.
You can call them with `/path/to/m` or `/path/to/mserve.py` 
from the command line. If you followed the installation tip 
above, it would be `<HOME>/mserve/m` for Linux-like machines, 
or `<HOME>\mserve\m` for Windows. As of August 30, 2023, 
**mserve** will not run under Windows without modification.

---

<!--  TABLE OF CONTENTS  -->
<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id="HelpMusicLocationTree"></a>
<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Music Location Tree

The *Music Location Tree* is the main window which appears 
when **mserve** starts up and it remains until 
**mserve** is closed. On startup, all files in the *Music
Location Tree* are rediscovered. New songs since the last
time are displayed.

Songs are stored under collapsed Album Names which, in turn, are
stored under collapsed Artist Names. The directory 
format must be:

- `Artist Name/Album Name/Song Name.ext`

Only Song Filenames with a music type extensions are included. For 
example, extensions of `.flac`, `.mp3`, `.m4a`, `.oga`, `.wav`, etc,
are included.

Here is a sample window with currently playing song 
highlighted in green.

{% include image.html src="/assets/img/mserve/mserve.py Music Location Tree.png"
   alt="mserve.py Music Location Tree.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve.py Music Location Tree.png"
%}

The first three Artists are "collapsed" which is indicated by the “▶” 
chevron (A.K.A. "right triangle). When you click the “▶” chevron the 
Artist is opened and the “▼” chevron is displayed to indicate the 
Artist is opened. The same chevrons and used for Albums. As songs
play and end in **mserve**, the Album Name and Artist
Name are automatically expanded and collapsed to show the 
green highlight bar.

Songs have a checkbox which are clicked to include or exclude in
playlists. The check box is colored solid when "checked" and is hollow
when "unchecked". If a line appears, it indicates the Artist or Album 
is "tri-state". This means some songs below are "checked" and
some are "unchecked".

You can check and uncheck individual songs, entire Artists or,
entire Albums.

As you check and uncheck individual songs, or entire Artists or,
entire Albums a list is built in memory. Then you can Apply or
Cancel changes.

New songs are added into the Chronology (Playlist) after the 
current playing song position.

If you make huge mistakes you can abandon changes with the
option "*Exit without saving Playlist*".

The *Music Location Tree* window follows the directory structure of
your storage device:

- The top level points to "My Music"
- The second level points to Artists under "My Music"
- The third level points to Albums under each Artist
- The fourth level points to Songs under each Album

> ***NOTE:*** "My Music" is an over simplification for the sake of
> example. You can start `m` (the splash screen for **mserve.py**)
> by typing: 
> `m "/mnt/music/Users/Person/Music/iTunes/iTunes Media/Music/"`
> 
> You can also call `m` after changing to a music directory. E.G.
> Enter `cd ~/Music/Pink Floyd`. Then enter `m .` and you will be
> presented with all the Albums you have for ***Pink Floyd***.
> 
> If you don't pass a parameter to `m` it will reload the last
> location used and continue playing favorites from where it left off.

## Dropdown Menus

The top-left corner of the *Music Location Tree* window contains 
three dropdown menus; ***File***, ***Edit*** and ***View***. 
Click on the name and the dropdown menu options appear:

### File Dropdown Menu
{:.no_toc}

Some options will be disabled out when they are not applicable. For example,
the *Save Playlist* and *Close Playlist* options are disabled (greyed
out) until a Playlist is opened.

- ***Open Location and Play*** - Open a predefined location. If the
location is a sleeping host, it is woken up and tested.
- ***New Location*** - Define a new location where music can be found. Locally
or remotely on a host such as a file server or mobile phone. 
- ***Open Playlist*** - Open an existing playlist within the current location.
- ***New Playlist*** - Define a new playlist within the current location.
- ***Save Playlist*** - Save song selection changes made to Playlist.
- ***Close Playlist and Use Favorites*** - Favorites are the songs which are
selected when no Playlist are open. Favorites do not require the SQL database
but still use it for metadata information.
- ***Save Favorites*** - Save song selection changes made to Playlist.
- ***Exit and CANCEL Pending*** - (disabled until changes are made)
- ***Save Play and Exit*** - Pending changes to song selections are applied
to Playlist or Favorites and **mserve** exits.

### Edit Dropdown Menu
{:.no_toc}

- ***Synchronize Location*** - Compare current location to another location
and synchronize files based on date, size and file byte differences. Uses
shadow file system for mobile phones that do not track files' last
modification time.
- ***Edit Location*** - Edit a predefined location. If it's the currently
opened location, changes to the Top Directory are not permitted.
- ***Delete Location*** - Delete a predefined location. The currently
opened location cannot be deleted.
- ***Rename Playlist*** - Rename a predefined playlist without changing
it's catalog of songs or any other details.
- ***Delete Playlist*** - Delete a predefined playlist. Song selected
in the playlist are not touched.
- ***Volume During TV Commercials*** - Television broadcasts on the
internet are often at a lower volume than **mserve**. Use this function
and it's volume slider to set **mserve** volume when it is playing during
TV Commercials which automatically muted by **mserve**. 

### View Dropdown Menu
{:.no_toc}

- ***Information Centre*** - Displays history of messages **mserve** has
shown along with key statistics, actions and events. Besides using the
dropdown menu option, the light blue ruler below the dropdown menus
can be clicked to open the *Information Centre*.
- ***View Locations*** - View predefined locations.
- ***View Playlists*** - View predefined playlists.
- ***Enable TV Commercial Buttons*** - Remove *FF*/*Rewind* buttons and
replace with *TV Commercial* and *Intermission* buttons.
- ***Enable FF/Rewind Buttons*** - Remove *TV Commercial* and *Intermission* 
buttons and replace with *FF*/*Rewind* buttons.
- ***SQL Music Table*** - Scroll through all songs for all locations that
***mserve*** has discovered. "Drill-down" to view more details. Buttons
to select specific rows, search text, and update Metadata without 
having to play each song first.
- ***SQL History Table*** - Scroll through history rows. "Drill-down" to 
view more details. Buttons to select specific rows and search text.
- ***SQL Location Table*** - Scroll through location rows. Button to 
search text. This function is inferior to the ***View Locations*** 
function mentioned above.
- ***Debug Information*** - Displays information to console and to the
*Information Centre*. This information is helpful to those customizing
**mserve**. If any applications windows are off visible desktop they are
half moved to the closest monitor. Also note 18 minutes after booting,
you may get 4 `speech-dispatcher` jobs in pulse audio but these are
automatically deleted if you respond `Yes` to the prompt that appears
(only when playing music).


***NOTE:*** The *Enable TV Commercial Buttons* and *Enable FF/Rewind Buttons*
dropdown menu options occupy the same line and replace each other when they 
are clicked. The button selection only effects the 
the current predefined Playlist within the current predefined
Location. Other locations and playlists maintain their button selection.
  
***NOTE:*** The three SQL views allow the column to be moved. Click and
hold the heading to drag the column to a different position.


## Right-Click Popup Menus

In all **mserve** windows, you can move the mouse over rows and they
are highlighted. You can right click on a row for a context-sensitive
popup menu. 

When an Artist, Album or Song line in the *Music Location Tree* window
is right-clicked, a context-sensitive popup menu appears. The 
context-sensitive popup menu changes depending on the line type, which
is why it is called "context-sensitive".

### Artist or Album Right-Click Popup Menu
{:.no_toc}

When you click on an Artist or Album, 
it is expanded and entries beneath are highlighted in yellow.

#### Menu Options:
{:.no_toc}

- ***Collapse List*** - Yellow highlight is removed, entries beneath
the Artist or Album are collapsed, and the pop-up menu is removed.
- ***Rename Artist*** - Rename the artist, only appears when artist clicked.
- ***Rename Album*** - Rename the album, only appears when album clicked.
- ***Open Kid3 Audio Tagger*** - Use Kid3 to set Metadata tags.
- ***Open Nautilus File Manager*** - Use File Manager to view directory.
- ***Ignore Click*** - Remove yellow highlight, list remains expanded, and
pop-up menu is removed.

### Song Right-Click Popup Menu
{:.no_toc}

When you highlight and right click a song in the *Music Location Tree*, a
context-sensitive popup menu appears. 

#### Menu Options:
{:.no_toc}

- ***Sample Middle 10 Seconds*** - Listen to middle ten seconds of song.
- ***Sample Whole Song*** - Listen to the whole song.
- ***Rename Song Title*** - Rename the song title.
- ***Open Kid3 Audio Tagger*** - Use Kid3 to set Metadata tags.
- ***Open Nautilus File Manager*** - Use File Manager to view directory.
- ***View Raw Metadata*** - View metadata tags returned by `ffmpeg`.
- ***View SQL Metadata*** - View metadata in pretty format kept by **mserve**.
- ***Ignore Click*** - Close popup menu.


## Information Centre

Just like other applications, **mserve** uses dialog boxes to display:

- Status messages
- Information messages
- Warning messages
- Error messages
- Confirmation messages with "Proceed" / "Cancel"

However, unlike other applications, **mserve** also records these 
in the *Information Centre* for the duration of your session.

Additionally **mserve** records system events and user actions where 
there was no dialog box presented.

The *Information Centre* is accessed from the *Music Location Tree* 
window's *View* dropdown menu. It can also be accessed by clicking
the light blue thin ruler near the top of the window, as the video 
below illustrates.

### Information Centre Sample Video
{:.no_toc}

<video src="https://user-images.githubusercontent.com/92641463/264455606-c5e9e5cf-e782-4cef-b643-6c0a7290b508.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/264455606-c5e9e5cf-e782-4cef-b643-6c0a7290b508.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>


---

## *Music Location Tree* Help Button

**mserve** windows contain "Help" buttons that:

- Open a new web browser window
- Open this web page
- Navigate down to the appropriate section on the web page

### Help Button Sample Video
{:.no_toc}

<video src="https://user-images.githubusercontent.com/92641463/264478542-c9d7f483-3774-44b4-9bac-cf5f9b048034.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/264478542-c9d7f483-3774-44b4-9bac-cf5f9b048034.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

#### Sample Video Highlights
{:.no_toc}

- The options for *File*, *Edit* and *View* dropdown menu are shown
- The mouse hovers over button bar at bottom of window 
- Tooltips for buttons appear after a short delay
- Tooltips gradually fade in, remain a short period, then gradually 
fade out
- The *Help* button is clicked and results appear

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# Automatic Skin Color Based on Artwork

This video shows how the skin changes color:

<video src="https://user-images.githubusercontent.com/92641463/149242688-5cde502e-1025-4237-9e22-af9af3b2d93a.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149242688-5cde502e-1025-4237-9e22-af9af3b2d93a.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
</video>

The album artwork is automatically downloaded from the internet
when the CD is encoded. You can also choose artwork from any
website and use that instead.

The third pixel to the right and third pixel down set the
skin tone when you resize the window that could yield a
different skin tone!

### Automatic Skin Color Notes:
{:.no_toc}

- Windows can be resized and Album Artwork grows and shrinks accordingly.
- Primary color (@ coordinates 3x3) can change as artwork is resized.
- Commercial and Intermission buttons are for NHL Stanley Cup Playoffs. 
Click when commercials start and the TV volume is turned down to 25%.
**mserve** playlist resumes play. When countdown ends the music pauses 
and TV volume is turned back up to normal volume.
- Shuffle button resorts the selected songs in the playlist.
- Playlists are currently stored in pickle format but plans are to convert to SQL. Also, SQL search engine is planned.
- SQL is used for the music library of songs and their lyrics.
- Webscraping lyrics is via Genius but some results are "not ideal" so seven other websites out of six have support and a menu to select all six will come soon. SQL will record history of what was scraped when, edited when, how long edit took, time indexed synchronized when, other devices (locations) updated when, which songs were updated, etc.


## Image For Songs with No Artwork

This `.gif` (no sound) shows how a custom image is used when
a song with no artwork is played:

{% include image.html src="/assets/img/mserve/No Art 5.gif"
   alt="No Art 5.gif"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="No Art 5.gif"
%}

Show below are the lines you need to change
in the `mserve.py` Python script:

```python
# When no artwork for song use this image file
ARTWORK_SUBSTITUTE = g.PROGRAM_DIR + "Be Creative 2 cropped.jpg"
# "Be Creative 2 cropped.png" is a 4.4 MB image 3120x3120
```

Copy your image file to the directory where you installed `mserve`.

> ***NOTE:***
> 
> The `.gif` video was created using:
> 
> `mmm` to get the window coordinates. However, you can use `wmctrl -lG`
> 
> `byzanz-record -c --verbose --delay=1 --duration=5 --x=3668 --y=481 --width=1506 --height=737 "No Art 4.gif"`
> 
> Then an on-line `.gif` optimizer reduced the file size from 33 MB to
> 22 MB using compression level 35 for "Lossy GIF".

---

<a id="HelpEncoding"></a>
<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# CD Encoding

Great lengths were taken to ensure currently playing song's 
animations never lag even when CD's are being encoded.
This video shows how the music player keeps playing without any
lag while a CD is being encoded:

<video src="https://user-images.githubusercontent.com/92641463/149241934-99d01df8-2cbf-4488-aa14-efe9e4d4f3aa.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149241934-99d01df8-2cbf-4488-aa14-efe9e4d4f3aa.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
</video>

Great lengths were also taken to ensure animations never lag even when
focus grabbing dialog boxes require a response. If a focus grabbing
dialog box is open when current song ends, the next song is played.

The encoding process uses libdiscid to read the Audio CD's Disc ID.
Then Musicbrainz is accessed to get track listings for Disc ID. It
accesses Musicbrainz a second time to get the first recorded release
date. It then grabs Album Artwork from the internet. 

You can paste album artwork from the clipboard which you previously
copied from Amazon, or another website.

## How-To Encode a CD Overview

After inserting a CD, click the *Rip CD* button in the *Music Location
Tree* window. The video below shows how to select encoding format,
quality, naming format, album date, artwork, genre, comments and track
level overrides to genre:

<video src="https://user-images.githubusercontent.com/92641463/263828968-f8c7dc3d-384a-4cca-b615-1a80f6d141e9.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/263828968-f8c7dc3d-384a-4cca-b615-1a80f6d141e9.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
</video>

### Video Highlights:
{:.no_toc}

- This video starts *after* 1 minute is spent reading the CD disc **and**
*after* 1 minute is spent retrieving Album and Track information from
*MusicBrainz.com*.
- The top pane shows "Selections". Initially this is only "Tips" because
nothing has been selected yet. The "Tips" are also sent to the *Information
Centre* where you can always review later.
- The bottom pane shows information retrieved from *MusicBrainz*.
- A light blue highlight bar follows the mouse as it travels over rows in
the bottom pane.
- The Album Date of "2001" is checked.
- The Medium group is checked. This in turn automatically checks all tracks
(songs) within the Medium.
- The second artwork box is checked. This would be the highest resolution
of 65k. Behind the scenes, **mserve** has skipped downloading artwork that is
6k x 2k pixels in dimension and size of 10 MB. You can however copy and paste
large artwork from the internet if you choose to. You will be warned whenever
artwork exceeds 2 MB though.
- The mouse moves up to select the *Format* dropdown menu. The last used
format of ".mp3" is displayed and it is changed to ".oga". Notice the tooltip
window that appears when the dropdown menu is entered. It automatically fades
away after read or instantly fades when you move out of the dropdown menu.
- The mouse moves to the *Quality* dropdown menu. The last used quality of 
"70%" is displayed and it is changed to "80%."
- The mouse moves to the "Naming" dropdown menu. The last use naming of
"99 " is displayed. It is changed to "99 -". Notice how all the song
filenames change in the top pane and bottom pane.
- Scrolling down the top pane you see two artworks are selected; the low
resolution and the high resolution. Oops! This means artwork would be
alternated between tracks. Track 1 low-res, track 2 high-res, track 3 
low-res, track 4 high-res, etc. So the low resolution artwork is deselected.
- Next the *Naming* format is changed back to "99".
- The mouse moves down to the very bottom of the window. This is the button 
bar. The *"? Override"* clicked open the *Album Level Overrides* window.
- The *Genre* field is set to "Pop". It is important to always enter a
*Genre* because it is never provided by *MusicBrainz*.
- An optional *Comment* is entered.
- The *Save* button is clicked and the window is closed.
- A message appears advising that Tracks have been changed. Click OK.
- The mouse highlights track number 12.
- Right-click is pressed on track number 12 and the popup menu appears.
- The *Edit* option is picked from the popup menu.
- The *Edit Song Differences* window appears. Here you enter details
about the song that makes it different from other tracks. Preexisting
details come from *MusicBrainz* plus the *Album Level Overrides* entered
a couple of steps ago. The *Genre* is changed from "Pop" to "Rock" and
the comment is changed.
- Changes are saved and the line is colored green to show that track 3-12
was changed. 
- The "Rip CD" button is clicked and the same window for Album Level
Overrides appear with a new name: "Encode CD Final Confirmation".

<a id="HelpEncodingAlbumOverride"></a>
### Notes About Album Level Overrides:
{:.no_toc}

- The same window can appear twice but the title changes between:
*"Encode CD Final Confirmation"* and *"Album Level Overrides".
- When Album Level Override variables are entered they filter down
to each Track on the Album that previously had the same value. 
- A Track that had unique values are not effected.
- The Genre is not provided by MusicBrainz. It should always be entered.
- Verify correct spelling/capitalization of Artist and Album names
- Verify accuracy of the Album Date. It should be the copyright year.
- If a compilation, Artist Name is forced to "Various Artists", 
and the 1st sub-directory is forced to `Compilations`.
- *Gapless Playback* has no effect in **mserve**. It is used by **iTunes**.
- When overrides are applied, tracks matching the old value are given
the new value. If track doesn't have old value it stays the same.
- After override, tracks can be given a unique *Genre*, *Artist Name*, 
*First Date*, *Composer* and *Comment*. 
- Right-click on any track to set uniqueness.
- Once again, the *Genre* field should always be entered.

<a id="HelpEncodingTrackEdit"></a>
### Notes About Track Names in Bottom Pane
{:.no_toc}

- Album Level Override set the *Genre* to "Pop" but this doesn't
appear in Track Names. All tracks were set to "Pop" when
override was saved. Because they are the same as the Album Level
nothing is displayed.
- The Track Names only show differences from the Album Level. For
example, all tracks show the "| artist: NAME" because it is different
than the Album Artist which is "Various Artists"
- Track difference on "3-12" the *Genre* was set to "Rock" and this
does appear in Track Names.
- Notice the *First Date* column there are a few entries for "2001".
You need to research when the song was first released, E.G. "1985" and
change the track.

## Encoding Metadata Tags

**mserve** Metadata Tags are displayed with common names. The
common names follow the `ffmpeg` naming conventions:

| ffmpeg TAG       | Description                                                   |
|------------------|---------------------------------------------------------------|
| TITLE            | Name of the Song                                              |
| ARTIST           | Name of band or solo artist                                   |
| ALBUM_ARTIST     | Same as ARTIST except for Compilations then "Various Artists" |
| ALBUM            | Name of the Album                                             |
| COPYRIGHT        | Date the Album (not the song) was released                    |
| DISC             | Disc Number. E.G. single CD is "1/1". 3 CD set could be "1/3" |
| TRACK_NUMBER     | E.G. When 12 tracks, first track "1/12", last track "12/12"   |
| DATE             | Song's first release date in YYYY format. NOT the Album Date! |
| GENRE            | E.G. "Rock", "Soundtrack", "Country", etc.                    |
| CREATION_TIME    | Date and time music file created (encoded)                    |
| COMPOSER         | When not specified, defaults to ARTIST                        |
| COMMENT          | One line comment                                              |
| COMPILATION      | When value is "1", folder is /Compilations/<ALBUM>            |
| GAPLESS_PLAYBACK | "0" = Off, "1" = On. However, **mserve** doesn't support it.  |
| ENCODER          | E.G. "mserve 3.4.3" or "iTunes 11.4.0.18"                     |
| DISCID           | CDDB Free Disc ID                                             |
| MUSICBRAINZ_DISC | MusicBrainz Disc ID                                           |

Besides these Metadata tags, **mserve** SQL stores metadata for:

- *AlbumDate* - The date the album was released
- *PlayCount* - How many times music file was played > 80% of it's duration
- *LastPlayTime* - Date and time song was last played > 80 %
- *Rating* - Future feature not implemented
- *Hyperlink* - Future feature

When **mserve** first discovers a song it takes a "snapshot" of the file's:

- *OsAccessTime* - Last access time
- *OsModifyTime* - Last modification time
- *OsChangeTime* - Last time permissions were changed
- *OsFileSize* - Size of file in bytes

When file times are updated by the Operating System, they are **NOT**
refreshed in **mserve** SQL database. A side-effect of this is **mserve**
can reset all files last access time when a program like *Rhythm Box* reads
every song file and resets last access time to current time. See `sql.py`
for examples of "fixing" stuff.


## Renaming Artists, Albums and Song files After Encoding

Sometimes the on-line databases contain errors. For example, on
a three CD Greatest Hits collection, you will find these Album names:

- Greatest Hits Of The 80's [Disc 2]
- Greatest Hits Of The 80's Vol. 1
- Greatest Hits of the 80's

The last CD of the set doesn't say ***[Disc 3]*** nor does
it say ***Volume 3***. It gets confusing when you are viewing
the *Music Location Tree* window.

To Rename within the *Music Location Tree* window:

1. Right click on the third CD Album.
2. Select *"Rename Album"* from the popup menu.
3. In the dialog box enter "Greatest Hits Of The 80's [Disc 3]"
4. Click the *"Apply"* button.

A summary dialog box will appear:

mserve rename Greatest Hits Of The 80's [Disc 3].png

{% include image.html src="/assets/img/mserve/mserve rename Greatest Hits Of The 80's [Disc 3].png"
   alt="mserve rename Greatest Hits Of The 80's [Disc 3].png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve rename Greatest Hits Of The 80's [Disc 3].png"
%}


> ***Usage Notes:***

- Cannot change name to blanks.
- Cannot change name to an existing name.
- Names currently playing cannot be renamed.
- Special characters `/`, `?`, `:`, `<`, `>`, `_` `"`, `_` `\\`, `|` and `*`
are changed to an underscore (`_`)
- Pending additions or deletions to playlists must be updated before
beginning the rename process.
- The above error and warning messages are sent to the Information Centre
for you to review later. Click the thin blue line. Or use the 'View'
dropdown menu and select 'Information Centre'.

> ***Special Notes about ID3 Tags:***

- The Artist and Album name are only renamed in te Operating System
filename and **mserve** SQL database.
- ID3 tags inside the music file are not touched. 
- Use Kid3 or similar program to change Album and/or Artist name
inside the music file.
- If Kid3 is installed, it can be called directly from **mserve**.
- Right click on the music file from the Music Location Tree and select
the 'Kid3' from the popup menu.
- ID3 tags in the music file are called "Metadata" by **mserve**.
- **mserve** will automatically displays Metadata Tags on certain 
screens when a music file is played.
- **mserve** can display Metadata Tags on demand from the Music Location Tree
when you right click on a music file and select *View Raw Metadata* 
or *View SQL Metadata* from the popup menu.
- **mserve** can also display Metadata Tags when you open the *View* dropdown
menu and select *SQL Music Table*. Right-click on a music file and select 
*View SQL Metadata* or *View Raw Metadata* from the popup menu.


## Substituting Special Characters in Filenames

When an Artist, Album or Song have these characters in the name:

- `/`, `:`, `?`, `<`, `>`, `"`, `\`, or `|`

The character will be replaced with the `_` character instead.
This is necessary to conform to operating system rules for
directory and filenames.

For example, if the names with special characters are:

- Artist: `The Great Band.`
- Album: `Songs of: 70's/80's`
- Title: `05 Simple <Little> Thing?.m4a`

The file created in Linux will be:

- `The Great Band_/Songs of_ 70's_80's/05 Simple _Little_ Thing_.m4a`

The file created in Windows will be:

- `The Great Band_\Songs of_ 70's_80's\05 Simple _Little_ Thing_.m4a`

***Note:*** In Linux the `/` character is used to separate directory levels. 
In Windows the `\` character is used to separate directory levels.

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Programs At a Glance

There are over 16k lines in the `mserve.py` core Music Player program.

All programs written for `mserve`:

<a id="AllPippimModules"></a>

- `disc_get.py` - 80 lines 
- `encoding.py` - 2,597 lines
- `external.py` - 451 lines
- `global_variables.py` - 155 lines
- `iamge.py` - 1,472 lines
- `location.py` - 3,821 lines
- `m` - 84 lines
- `mbz_get1.py` - 1,161 lines
- `mbz_get2.py` - 183 lines
- `message.py` - 1,633 lines
- `monitor.py` - 813 lines
- `mserve.py` - 16,127 lines
- `mserve_client.sh` - 334 lines
- `mserve_config.py` - 980 lines
- `sql.py` - 3,150 lines
- `test-for-sync.sh` - 21 lines
- `timefmt.py` - 224 lines
- `toolkit.py` - 2,674 lines
- `vu_meter.py` - 200 lines
- `vu_pulse_audio.py` - 674 lines
- `webscrape.py` - 1,399 lines
- `x11.py` - 311 lines

*Line counts updated July 13, 2023.*

---


<a id="mserveDependencies"></a>

## Dependencies

Here are the dependencies documented in `mserve.py` python program.
You may already have them installed. Also, this list is for Ubuntu
under version 2.7.12 and, you may have to substitute `python3` where
it says `python`:

``` shell
sudo apt install compiz                          # for Hockey Commercials
sudo apt install dconf-editor                    # for Hockey Commercials (gsettings)
sudo apt install ffmpeg                          # file artwork, ffprobe (meta) and ffplay
sudo apt install gstreamer1.0-tools              # For encoding CDs gst-launch-1.0
sudo apt install pqiv                            # Make transparent (Hockey Commercials)
sudo apt install python-appdirs                  # Application directory names
sudo apt install python-beautifulsoup            # Scrape Song lyrics
sudo apt install python-libdiscid                # Get CD's disc ID
sudo apt install python-notify2                  # Popup bubble messages
sudo apt install python-numpy                    # Installed by default in Ubuntu
sudo apt install python-magic                    # Get file type information
sudo apt install python-musicbrainzngs           # Get metadata for CD
sudo apt install python-mutagen                  # Encode and ID3 tags
sudo apt install python-pil                      # Pillow graphics routines
sudo apt install python-pil.imagetk              # Pillow image processing
sudo apt install python-requests                 # Get Cover Art
sudo apt install python-subprocess32             # To compare locations
sudo apt install python-tk                       # Tkinter (default in Windows and Mac)
sudo apt install x11-apps                        # xwd window dump (screen shot)
sudo apt install xclip                           # Insert clipboard
sudo apt install xdotool                         # To move Kid3 into invoking
sudo apt install wmctrl                          #  lib_top / play_top window
```

Additionally, there are external repositories (PPA) that need to be
installed.

``` shell
sudo add-apt-repository ppa:j-4321-i/ttkwidgets  # CheckboxTreeview
# This is necessary for ttkwidgets and ttkcaldenar
sudo apt-get update
sudo apt-get install python-ttkwidgets           # CheckboxTreeview
sudo add-apt-repository ppa:j-4321-i/ppa
sudo apt-get update
sudo apt-get install python-tkcalendar
```

Finally, there are programs that have no `sudo apt install` capability
such as [`pulsectl`](https://github.com/mk-fg/python-pulse-control/tree/master/pulsectl)
that require `git pull` command followed by `cp` command.

As of {{ site.refreshed }}, dependencies have to be manually
installed. A long term plan is to create an installation
script that installs all dependencies automatically. In the short
term, development has begun to identify installed versions.

---

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

## SQL Views

`mserve` uses proprietary data dictionary technology to quickly 
view rows in the three SQL tables:

- Music Table contains OS song file information, metadata, 
song lyrics, lyric time indices, play counts and the like.
- History Table contains records of actions taken such as; 
initial metadata encounters, webscraping lyrics and encoding 
CDs.
- Location Table defines the various music locations on your 
local device, external storage, remote hosts and mobile phones.
the filenames you will need to backup. A brief explanation is
given for how each file is used.


### *SQL Location Table* Data Dictionary Driven Viewer
{:.no_toc}

The *SQL Location Table* defines the various music locations on your 
local device, external storage, remote hosts and mobile phones.

**mserve** uses proprietary data dictionary technology to quickly 
view rows in the *SQL Location Table*. Use the *View* dropdown menu 
from the *Music Location Tree* (main) window of **mserve**. A sample 
video appears below.

#### *SQL Location Table* Viewer Sample Video
{:.no_toc}

<video src="https://user-images.githubusercontent.com/92641463/264485639-b5489eb8-7594-4529-b7f0-9841ef26f1ac.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/264485639-b5489eb8-7594-4529-b7f0-9841ef26f1ac.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

##### Sample Video Highlights
{:.no_toc}

- The options for *File*, *Edit* and *View* dropdown menu are shown
- The mouse hovers over button bar at bottom of window 
- Tooltips for buttons appear after a short delay
- Tooltips gradually fade in, remain a short period, then gradually 
fade out
- The *Help* button is clicked and results appear

---


## SQL Tables

The popular SQL database engine `sqlite3` which is used by your
web browser is also used by `mserve`.

Here are the SQL Tables and Indices that are created in
the sqlite3 file **~/.../mserve/library.db**:

``` python
def open_db(LCS=None):
    """ Open SQL Tables - Music Table and History Table
        Create Tables and Indices that don't exist
    :param LCS: instance of Location() class for lcs.open_code, etc.
    """

    #open_new_db()  # Database 'library_new.db' only used for conversions.

    global con, cursor, hist_cursor, loc_cursor, lcs
    if LCS:
        lcs = LCS  # Locations class

    con = sqlite3.connect(FNAME_LIBRARY)

    # MUSIC TABLE
    con.execute(
        "create table IF NOT EXISTS Music(Id INTEGER PRIMARY KEY, " +
        "OsFileName TEXT, OsAccessTime FLOAT, OsModifyTime FLOAT, " +
        "OsChangeTime FLOAT, OsFileSize INT, " +
        "ffMajor TEXT, ffMinor TEXT, ffCompatible TEXT, " +
        "Title TEXT, Artist TEXT, Album TEXT, Compilation TEXT, " +
        "AlbumArtist TEXT, AlbumDate TEXT, FirstDate TEXT, " +
        "CreationTime TEXT, DiscNumber TEXT, TrackNumber TEXT, " +
        "Rating TEXT, Genre TEXT, Composer TEXT, Comment TEXT, " +
        "Hyperlink TEXT, Duration TEXT, Seconds FLOAT, " +
        "GaplessPlayback TEXT, PlayCount INT, LastPlayTime FLOAT, " +
        "LyricsScore BLOB, LyricsTimeIndex TEXT)")

    con.execute("CREATE UNIQUE INDEX IF NOT EXISTS OsFileNameIndex ON " +
                "Music(OsFileName)")

    # HISTORY TABLE
    con.execute(
        "create table IF NOT EXISTS History(Id INTEGER PRIMARY KEY, " +
        "Time FLOAT, MusicId INTEGER, User TEXT, Type TEXT, " +
        "Action TEXT, SourceMaster TEXT, SourceDetail TEXT, " +
        "Target TEXT, Size INT, Count INT, Seconds FLOAT, " +
        "Comments TEXT, Timestamp FLOAT)")

    con.execute("CREATE INDEX IF NOT EXISTS MusicIdIndex ON " +
                "History(MusicId)")
    con.execute("CREATE UNIQUE INDEX IF NOT EXISTS TimeIndex ON " +
                "History(Timestamp)")
    con.execute("CREATE INDEX IF NOT EXISTS TypeActionIndex ON " +
                "History(Type, Action)")

    # LOCATION TABLE
    con.execute(
        "CREATE TABLE IF NOT EXISTS Location(Id INTEGER PRIMARY KEY, " +
        "Code TEXT, Name TEXT, ModifyTime FLOAT, ImagePath TEXT, " +
        "MountPoint TEXT, TopDir TEXT, HostName TEXT, " +
        "HostWakeupCmd TEXT, HostTestCmd TEXT, HostTestRepeat INT, " +
        "HostMountCmd TEXT, HostTouchCmd TEXT, HostTouchMinutes INT, " +
        "Comments TEXT)")
    con.execute("CREATE UNIQUE INDEX IF NOT EXISTS LocationCodeIndex ON " +
                "Location(Code)")


    ''' For mserve.py rename_file() function to rename "the" to "The" '''
    con.execute("PRAGMA case_sensitive_like = ON;")

    con.row_factory = sqlite3.Row
    cursor = con.cursor()
    hist_cursor = con.cursor()
    loc_cursor = con.cursor()
```

## Pickled Data Files

The pickle data file format allows serialized Python objects
such as variables, lists and dictionaries to be stored in
non-serialized format on storage devices.

An abbreviation system is used for the filenames below:

- `~/` represents your home directory.
- `.../` represents the subdirectory, under your home directory,
where your application data files are stored.

Here are the data files (stored in pickle format) created under
the `~/.../mserve`:

- **last_location** - lc.FNAME_LAST_LOCATION - The last location ID 
used. E.G. "L001", "L002", etc. August 5, 2023 Note: This will soon
be replaced by SQL History Table row Type='location', Action='last'.
- **locations** - lc.FNAME_LOCATIONS - All available locations and 
their control settings. August 5, 2023 Note: This will soon
be replaced by SQL Location Table. 
- **library.db** - lc.FNAME_LIBRARY - *This is not in pickle format.*
It is an sqlite3 database with Music Table and History Table.

One subdirectory is created for every location. E.G. the subdirectory 
`~/.../mserve/L004` contains:

- **last_open_states** - lc.FNAME_LAST_OPN_STATES - Each Artist and Album
and whether or not they are open (down triangle / chevron) or closed
(left pointing triangle / chevron) in the *Music Location Tree* window.
- **last_playlist** - lc.FNAME_LAST_PLAYLIST - Full path names of all
songs checked (have the blue square) in the *Music Location Tree* window. 
Sorted in playlist order.
- **last_song_ndx** - lc.FNAME_LAST_SONG_NDX - Zero based index into
**last_playlist** indicating the song that was playing when **mserve**
was shutdown.  August 5, 2023 Note: This is superseded by 
SQL History Table Row Type='resume', Action=<LOCATION CODE>.
- **modification_time** - lc.FNAME_MOD_TIME - Cell phones may not allow
changes to music files' last modification time.  **mserve** uses this file
as a shadow filesystem to track last modification time. Used by the 
**Synchronize Locations** function.

**lc.FNAME** represents "location.py" (**lc.**), "Filename" (**FNAME**). 
When working inside the location.py module, drop the **lc.** prefix.
In the other Python modules, **import location as lc** is used.

---

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# Windows Open Where You Want Them

Most applications always open their windows at the same locations.
Then you have to move the windows to where you want them. `mserve` 
remembers where you like your windows to be and moves them there.

Besides the dozen or so windows that **mserve** uses, it also
remembers if you use Hockey TV commercial buttons or FF & Rewind
buttons instead. It also remembers if you prefer the Chronology
(playlist) hidden or shown and the exact second of the last song
you were listening to, or even if it was paused. 

This is how mserve remembers and restores window positions and sizes:

``` python
def save_window_geom(name, geom):
    """
    CURRENT:
        Get geometry for window which was saved on last exit. If no record
        use 100,100 and predefined default width & height. Returns string
        of "width x height + x + y" with no spaces in between variables.
    """

    if sql.hist_check(0, 'window', name):
        sql.hist_cursor.execute("SELECT * FROM History WHERE Id = ?",
                                [sql.HISTORY_ID])
        d = dict(sql.hist_cursor.fetchone())
        if d is None:
            print('monitor.save_window_geom error no History ID:', HISTORY_ID)
            return False
    else:
        # First time add the record
        # sql.hist_add(time.time(), 0, lc.USER, 'window', name, geom,
        sql.hist_add(time.time(), 0, g.USER, 'window', name, geom,
                     'saved on exit, loaded on starting', None, 0, 0, 0.0,
                     "Used in conjunction with 'screen' History Record Id #")
        sql.con.commit()
        return True

    ''' We have the existing history record, simply replace the geometry field '''
    sql_cmd = "UPDATE History SET Time=?, SourceMaster=? WHERE Id = ?"

    sql.cursor.execute(sql_cmd, (time.time(), geom, sql.HISTORY_ID))
    sql.con.commit()
```

---

<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

# Tooltips Gradually Fade In and Out

A lot of work has gone into crafting the tooltips to delay before
gradually fading in. Also, to gradually fade out. And finally, the
Tooltip message bubble follows the moving mouse pointer.

<video src="https://user-images.githubusercontent.com/92641463/149630335-998fb026-67c5-4a4f-9cd0-fd2336f16e78.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149630335-998fb026-67c5-4a4f-9cd0-fd2336f16e78.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
</video>

Key features of tooltips:

- When mouse hovers over a button, tooltips appear after a delay
- Tooltips gradually fade in
- They stay visible for a short time based on word count
- Tooltips follow mouse mouse movements inside button
- Clicking button or moving mouse out of button forces fade out 
- Tooltips gradually fade out

---

<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

# Lyrics Synchronization

After song lyrics have been trained (Time Index assigned to each
lyrics line) each line is highlighted as it is sung. Before training,
lyrics are auto-scroll based on preset algorithm. Manual scrolling
can be turn on to override Auto and Time scrolling.

A sample video is shown below. It shows how the toggle button works
between automatic lyrics scrolling and manual scrolling:

<video src="https://user-images.githubusercontent.com/92641463/149630735-8d579143-0d6f-4a7f-84a6-c7349c349e82.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149630735-8d579143-0d6f-4a7f-84a6-c7349c349e82.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

***Notes:***

1. When video starts with song in orange the default is "Auto Scrolling"
2. Click button to engage "Manual Scroll"
3. Now scroll bar appears on right, and you can scroll lyrics
4. The vido changes to next song in black and the default is "Time Scrolling"
5. Click the button to engage "Manual Scroll"
6. Click the button again to reengage "Time Scrolling"
7. Now each lyrics line is automatically highlighted as it is sung
8. For Time Scrolling to work you need to train mserve with the timing.


## Synchronized Lyrics in Action

This video shows how artwork, automatically obtained from the internet, is animated
on your screen:

- It rotates clockwise
- At 90 degrees it slides right then resumes rotating
- At 180 degrees it slides down then resumes rotating
- At 270 degrees it slides left then resumes rotating
- At 360 degrees it slides up, pixelates, then the process repeats

> **IMPORTANT:** Un-mute video to hear song


<video src="https://user-images.githubusercontent.com/92641463/149242610-7c788f28-c0c7-457f-bf40-78082dc39837.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149242610-7c788f28-c0c7-457f-bf40-78082dc39837.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
</video>

This video also shows:

- Two real-time VU meters for left and right channels
- Tooltips for buttons. **This is an OLD video:** The new tooltips fade in and out after delays and follow mouse cursor. See sections below for examples.
- Lyrics are highlighted in time with the music
- Lyrics are automatically retrieved from the internet (from eight different sites)
- You can manually change the lyrics retrieved

Additional notes:

-    Edit lyrics for minor changes or massive copy from internet and replace.
-    Click on each line to synchronize the time for future playback.
-    Auto scroll lyrics, time scroll lyrics or manually scroll lyrics score.
-    Fine-tune adjustments to time index are done on separate window.
-    Sample middle 10 seconds of song. Future select one or two key song lines.
-    Right click on song to bring up Kid3 which runs on Linux, Windows and Mac.
-    Multiple locations are supported including sleeping servers woken with magic packet.
-    Compare music files between locations and update differences.
-    Compare supports Android with shadow file system for last modified date.
-    Encode CDs with automatic track name retrieval from MusicBrainz.
-    Encode CDs with automatic Cover Art download or Image paste from clipboard.
-    SQLite3 now used to replace old pickles and to add new features for history tracking.
-    Music player runs while encoding process takes dozens of minutes per CD.

---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

## Basic Time Synchronization

The "☰" (Hamburger) Dropdown Menu is shown below:

{% include image.html src="/assets/img/mserve/mserve lyrics hamburger menu.png"
   alt="mserve lyrics hamburger menu.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve lyrics hamburger menu.png"
%}

The same Dropdown menu appears when you left-click or right-click
on the lyrics score (the song's lyrics).

---

A sample video is shown below. It shows how the *Basic Time Index*
feature works. Simply click to highlight and synchronize each 
lyrics line as it is being sung:

<video src="https://user-images.githubusercontent.com/92641463/149671978-18e1a98f-3a55-472c-9de2-ae3246ee3969.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149671978-18e1a98f-3a55-472c-9de2-ae3246ee3969.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

This video shows:

1. The "☰" (Hamburger) Dropdown Menu where the *Basic time index* option is picked.
2. Canceling the *Basic time index* option once started.
3. Restarting the *Basic time index* from the "☰" menu.
4. Clicking each line as it is sung.
5. The time indices are automatically saved when the song ends, 
or you can choose the "Save index" option from the "☰" menu if,
you don't want to wait for the song to end.

---

<a id="HelpT"></a>
<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

## Fine-Tune Time Index

Sometimes you just can't seem to click at the right time using
*Basic Time Index* in the previous section. For those
cases the *Fine-Tune Time Index* window is provided.

<a id="HelpB"></a>
### Begin Sync option

In the following video notice how the option is included in
the "☰" (Hamburger) menu and is selected. The video delays long
enough so that you can see all the menu options.

<video src="https://user-images.githubusercontent.com/92641463/149632176-7ce43ab5-a207-4825-bf27-70000b494e64.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149632176-7ce43ab5-a207-4825-bf27-70000b494e64.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

This video shows:

1. The Lyrics "☰" (Hamburger) Dropdown Menu options
2. The "Ignore click" option on the menu. This closes the menu 
which is the same as moving the mouse off the menu and clicking 
outside the menu.
3. Access the hamburger menu again and select the "Fine-tune time 
index" option
4. The *Fine-tune time-index* window opens up and pauses the regular 
music player
5. Select lyric lines in the lyrics score
6. Begin sync button. As music plays you can click the line as it is sung
7. Clicking each line as it is sung is the same behavior as the 
*Basic time index* function except that additional details are displayed
8. Finally, the *Fine-tune time index* window is closed and regular 
music player resumes where it was interrupted


#### 80% of lines must be basic synchronized

This screen appears when you have not completed basic
time synchronization for at least 80% of the lines:

{% include image.html src="/assets/img/mserve/Basic Time Not Done.png"
   alt="Basic Time Not Done.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="Basic Time Not Done.png"
%}

Fine-Tune Time Index cannot be done until 80% of lines have
Basic Time Index completed.

---

<a id="HelpS"></a>
<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr14">Skip</a></div>

### Sample All option

The following video also shows how the *Fine-tune time index* 
function is selected. This time the video spends a little time 
showing you all the buttons in the function.

After turning on sound for the video below and clicking play, 
make sure you move your mouse outside the video. This way you can 
see the entire contents underneath your browser's video control bar.

<video src="https://user-images.githubusercontent.com/92641463/149672896-ed6b96ac-9c1f-4017-9b15-e41adac8126b.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149672896-ed6b96ac-9c1f-4017-9b15-e41adac8126b.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

**Video Highlights:**

1. The "Paused" graphic in the regular music player. It is 
programmatically generated and not an image file that can be changed.
2. The regular music is resumed and the "☰" menu is used to 
select the *Fine-tune time index* option
3. The <kbd>Sample all</kbd> button is selected
4. The function plays the first second of each line
5. We noticed at time index `154` seconds the instrumental section 
was left on too long. This caused the Chorus line and next line 
to start too late.
6. Those three lines were selected and <kbd>Begin sync</kbd> 
button is used to fine-tune the timing
7. When fixing the timing though we clicked too soon rather than  
too late as before. So we click back on a previous line and take 
a "mulligan". Then we click again as the music catches up.
8. Next, the time indices are saved by clicking the <kbd>Save</kbd> button
9. Finally, the function is closed by clicking the <kbd>Close</kbd> button and the regular music player resumes play automatically.

---

<a id="hdr14"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr13">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr15">Skip</a></div>

# Hide Chronology

The chronology section shows the previous three songs played, the current song
being played and the next six songs coming up in the playlist.

You can hide the chronology section, which expands the art work dynamically:

<video src="https://user-images.githubusercontent.com/92641463/149675348-e8471842-2755-4a22-9a7c-4ea432c7b5c3.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149675348-e8471842-2755-4a22-9a7c-4ea432c7b5c3.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

*Note:* If you resize the window, the artwork animation also resizes 
accordingly. It will maintain the "square" proportions. The "skin"
background color can change depending on the new color of the pixel at
coordinates "3, 3" of the resized artwork.

**May 18, 2023 Revision**

When the Chronology (Playlist) is hidden the lyrics are moved below
the Current song details and VU meters. This allows better space
utilization with larger artwork size.

---

<a id="HelpLocations"></a>
<a id="hdr15"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr14">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr16">Skip</a></div>

# Locations

When you start **mserve**, or open and play a different location, music 
resumes playing where it left off. If music was paused, it is paused at 
the the same song position when **mserve** ended.

***Locations*** are the heart of controlling **mserve**.  *Locations* 
keep track of where music is stored. 

In addition to tracking music on local storage, *Locations* can access
music stored on a File Server or a Mobile Phone.



### Sample *View Locations* Window
{:.no_toc}

---

Here is a sample *View Locations* window with a location highlighted in green.

{% include image.html src="/assets/img/mserve/mserve View Locations.png"
   alt="mserve View Locations.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve View Locations.png"
%}

Mandatory Location Fields. The first two fields are mandatory:

- ***Location Name*** - Cannot be blank and must be unique
- ***Music Top Directory*** - The parent folder / subdirectory that contains
Artist subdirectories. The *Top Directory* cannot be changed for the
currently opened location. To change the current location's *Top Directory*,
Open and play a different location with the *File* dropdown menu in the
*Music Location Tree* window. That is the main window when **mserve** 
starts.

The above sample screen was generated when optional host commands
are **not** installed. 20,000 lines deep inside **mserve**, are these
`python` tests:

``` python
self.nmap_installed = ext.check_command('nmap')
if self.nmap_installed:
   ''' Command 'nc' also required to quickly check if host is up '''
   self.nmap_installed = ext.check_command('nc')
self.ssh_installed = ext.check_command('ssh')
self.sshfs_installed = ext.check_command('sshfs')
if self.sshfs_installed:
   self.sshfs_installed = ext.check_command('fusermount')
self.wakeonlan_installed = ext.check_command('wakeonlan')
```

---

### Sample *Edit Location* Window
{:.no_toc}

Here is a sample *Edit Location* window with a location highlighted in green.

{% include image.html src="/assets/img/mserve/mserve Edit Location.png"
   alt="mserve Edit Location.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve Edit Location.png"
%}

Mandatory Location Fields. The first two fields are mandatory:

- ***Location Name*** - Cannot be blank and must be unique
- ***Music Top Directory*** - The parent folder / subdirectory that contains
Artist subdirectories. The music top directory is validated to contain  
Artist/Album/Song File subdirectory structure with at least 10 song files.

The remaining fields, starting at ***Optional Remote Host Name***, are
optional.

Optional Location Fields:

- ***Optional Remote Host Name*** - If the *Music Top Directory* is on
a remote host, enter that name here. This is the only field that 
must be entered for a remote host. The remaining fields are optional for
a remote host. This field does not appear unless `nmap` and `nc` are
installed.
- ***Command to wake up sleeping Host*** - If the host is normally
asleep (to save electricity and extend life), enter the `waekonlan`
command here. Make sure `&` is appended to launch command in the
background. This is important for **mserve** to test when host is awake
and move onto the next test step.  This field does not appear unless 
`nmap`, `nc` and `wakeonlan` are installed.
- ***Command to test if Host is awake*** - Only enter a command if the
previous field to wake Host was used. **mserve** tests if more than
three lines were returned by this command to know host is awake.  This  
field does not appear unless `nmap`, `nc` and `ssh` are installed.
- ***Maximum tests every 0.1 second*** - Only enter a command if the
previous field to test if Host is awake was used. **mserve** runs the
previous field test this number of times. In the example 300 times is used
which is 30 seconds.
- ***Command to mount Host Music locally*** - If the Host's music isn't
automatically mounted, enter the mount command here. Note in this example
the `nonempty` parameter is used. This is helpful if **mserve** was
restarted and the previous mount was still left mounted. This field does
not appear unless `nmap`, `nc` and `sshfs` are installed.
- ***Command to prevent Host sleeping*** - If Host had to be woken up,
enter a command to keep it awake. Assuming you are using the
`mserve_client.sh` script on the host, the command would be:
`ssh <HOST> "touch /tmp/mserve_client.time` where `<HOST>` is the
remote Host's name. This field does
not appear unless `nmap`, `nc` and `ssh` are installed.
- ***Send prevent sleep every x minutes*** - Only enter this field if
the previous field was entered. In the screenshot `10` is entered such
that every ten minutes the previous field's command is issued. When you
exit **mserve** the host will fall asleep on it's own. If you suspend
your laptop, the host will still fall asleep and when you wake up your
laptop, the host will be unavailable and **mserve** will advise you it
needs to be woken up again. In this case, **mserve** is forced to run
the "Open Location and Play" function which is essentially a restart.
- ***Optional Comments*** - Have no effect on **mserve** operation.
Indeed in this case the comment is incorrect and says "10 seconds"
instead of "100 seconds".
- ***Optional picture of Location*** - Upload a picture to the subdirectory
where `mserve.py` is installed.  Then use the filename picker to select
that filename. An image of what the location looks like is helpful when
you forget what the location looks like.


If the File Server spends most of its life sleeping, **mserve** can wake it
up with a "Magic Packet" over wired Ethernet. Then **mserve** keeps
the host awake by "touching" a specific filename on the server. A special
script called `mserve_client.sh` needs to be running on the host to keep it
awake.

<a id="HelpTestHost"></a>
## Optional Remote Host Support

For Debugging, run the following commands on the host and client:

HOST - Open a terminal and enter command which runs forever:

``` shell
mserve_client.sh -d
```

CLIENT - Open a terminal, and paste below, replacing `<HOST>` 
with Host name:

``` shell
while : ; do ssh <HOST> "cat /tmp/mserve_client.log" ; sleep 60 ; done
```

When the commands `fusermount`, `nmap`, `nc`, `ssh` and `sshfs`
are installed, extra fields appear for location details.  See
screenshots below.

Ensure Music files are mounted on the Host. If you're using Windows
iTunes, and need to mount in Linux, you may need something like:

`sudo mount -t auto /dev/sdb1 /mnt/music`

See: https://help.ubuntu.com/community/MountingWindowsPartitions

Make sure your SSH is using the standard port 22. Otherwise, you
will have to open `location.py` and search on `22 >` and `22/tcp`.

Never use `-odebug` option for `sshfs` from mserve because it will
lock up. Use debug only from command line for testing.  **mserve**
will not let you define this debug option.

More details: https://help.ubuntu.com/community/SSHFS


<a id="HelpTestHostStatus"></a>
### Test Remote Host Status Display
{:.no_toc}

These steps are followed when a remote host is tested:

- If the host was active less than 10 minutes ago, `nc` is run
- If the host has been inactive for more than 10 minutes, `nmap` is run
- After `nc` or `nmap` passes test, the music top directory is mounted
- After mounting, **mserve** checks that artist subdirectories exist
- After validation, scroll up to review results
- After review, click the *Close Test Results* button


### Sample *Synchronize Location* Test Host Video
{:.no_toc}

<video src="https://user-images.githubusercontent.com/92641463/264155349-1d0e2f89-6e3a-41b6-83bd-64178a3470df.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/264155349-1d0e2f89-6e3a-41b6-83bd-64178a3470df.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

The above video demonstrates:

- You cannot synchronize a location to itself (L004 is currently open)
- The *Test Host* button replaces the top frame with location treeview
with a new frame with old-style TTY terminal output.
- Information messages are in green font with highlights in yellow font.
- It takes 5.8 seconds for `nmap` to test if host is connected to network.
- `nmap` console results are shown inside the GUI window.
- **mserve** reports that host "dell" can be accessed but is ***NOT awake***.
- It takes 7 seconds for `wakeonlan` to wake up host.
- `ssh dell ls` is run on host "dell" until files appear in output.
- The Music Top Directory `/mnt/music` is already mounted from earlier tests.
If it wasn't mounted, then **mserve** would mount it now.
- After the test is completed, the mouse wheel is used to scroll up
and down the status results display frame.
- After reviewing results, the ***Help Test*** button is clicked. The
bottom-right corner of a new browser window partially covers the 
test window. The browser window is dragged over-top.
- This is where the video ends, but after the *Close Test Results* button
is pressed and the regular buttons and location treeview frame appear.


<a id="HelpSynchronizeLocation"></a>
## Synchronize Location

When locations are synchronized, new files are NEVER added, and old files
are NEVER deleted. If you would like to test the function first, review
the script `test_for_synch.sh`.


### Sample *Synchronize Location* Window
{:.no_toc}

Below is a sample screen where a location has been picked to synchronize:

{% include image.html src="/assets/img/mserve/mserve Synchronize Location.png"
   alt="mserve Synchronize Location.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve Synchronize Location.png"
%}

When the *"🔗 Help"* button is clicked you are brought to this web page.

When the *"✘ Close"* button is clicked the window is closed. The same
is true if `Escape` key is pressed or the window's *"✘"*  
button is clicked.

The steps below describe what happens when the *"✔ Synchronize"* button
is clicked.

<a id="HelpSynchronizeActions"></a>
### Synchronize Location Actions
{:.no_toc}

A quick test is made to see if files have the same modification time 
and same size. If so the next file is checked.

If files have the same size but different times, the `diff` command is
used to test every byte to see if they are different. If the files
are identical, the modification times are set the same to the oldest
modification time. The rationale is a new location was created, files
were copied from an original location and the operating system reset
the modification time to the current time.

If the files have the same time but different sizes or different
contents, an error message is displayed because **mserve** has no
clue which direction to copy files in.

If files are different, then the file with the newest modification
time is copied over the oldest.

Before copying you are always given a chance to review action plans.

Below is an example of the action plan window:

{% include image.html src="/assets/img/mserve/mserve Synchronize Actions.png"
   alt="mserve Synchronize Actions.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve Synchronize Actions.png"
%}

The "Action" column states the reason for updating is that the 
file size has increased. This was due to album artwork being
added to the source files.

Here's a list of actions. All appear in "Action" column except 
those denoted as "hidden":

- "Missing" - In target(other) location (hidden from view)
- "Same" - within 2 seconds so no action required (hidden)
- "Error: Size different, time same" - Don't know copy direction
- "Error: Contents different, time same" - Don't know copy direction
- "OOPS" - Programming error that should never happen (hidden)
- "Copy Trg -> Src (Size)" - Based on size difference
- "Copy Src -> Trg (Size)" - Based on size difference
- "Copy Trg -> Src (Diff)" - Based on file difference
- "Copy Src -> Trg (Diff)" - Based on file difference
- "Timestamp Trg -> Src" - Prevents future checks
- "Timestamp Src -> Trg" - Prevents future checks

The "Src"/"Source" location is the location currently 
opened in **mserve**. The "Trg"/"Target" location is 
the location that was picked to synchronize with.

The "OOPS" should never appear but is technically possible if
another job is running that updates files in the Source or Target
Location.

*Note:* For Remote Hosts, the `cp` command is used not `scp`.

For cell phones the last modification time (used to compare files)
may not be updated. In this case **mserve** creates a virtual
filesystem to track what modification times should be.


---

<a id="HelpPlaylists"></a>
<a id="hdr16"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr15">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr17">Skip</a></div>

# Playlists

Playlists are stored by location. Each location can have an unlimited
number of playlists. Each playlist can have an unlimited number of songs, 
but only songs from the current music location.

Below is a sample *Playlist Maintenance* window from the 
***Rename Playlist*** function:

### Sample *Rename Playlist* Window
{:.no_toc}

{% include image.html src="/assets/img/mserve/mserve Rename Playlist.png"
   alt="mserve Rename Playlist.png"
   style="float: left; width: 60%; margin: 1rem 2rem 1rem 0;"
   caption="mserve Rename Playlist.png"
%}

The *Playlist name* cannot be blank and must be unique per location. A
warning is issued when the Playlist name has been used in another 
location.

The *Playlist description* is optional.

The *Device location* code is automatically assigned.

The columns for "Song Count", "Size of Files" and "Duration" are
automatically calculated as songs are selected and deselected in
*Music Location Tree* checkboxes. 

Five functions share the same *Playlist Maintenance* window:

- Open Playlist, called from the *File* dropdown menu
- New Playlist, called from the *File* dropdown menu
- Rename Playlist, called from the *Edit* dropdown menu
- Delete Playlist, called from the *Edit* dropdown menu
- View Playlists, called from the *View* dropdown menu

---

<a id="hdr17"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr16">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr18">Skip</a></div>

# Hockey TV Commercial Buttons

When mserve starts, the Rewind 10 seconds and Fast Forward 10 seconds
buttons are active. You can change these buttons to Stanley Cup
Hockey Playoff TV Commercial buttons.

{% include image.html src="/assets/img/mserve/mserve hockey buttons.gif"
   alt="Basic Time Not Done.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve hockey buttons.png"
%}

**`.gif` (there is no sound) Highlights:**

- From the *Music Location Tree* window select the "View" dropdown menu.
- When FF/Rewind buttons are visible you have the option of
enabling the Hockey buttons.
- The Hockey TV Commercial button turns down TV commercial and
resumes mserve play for 90 seconds.
- The Hockey TV Intermission button turns down TV commercial and
resumes mserve play for 18 minutes.
- When Hockey TV commercial buttons are active you have
the option of restoring the FF/Rewind buttons.
- When changing buttons, the *Music Location Tree* window is
sent to bottom and Play Window is raised to the top.

This `.gif` also shows how the Show/Hide
Chronology button places song lyrics in a suitable location
when the artwork size changes.

## Using Hockey TV Commercial Button
{:.no_toc}

This video shows what you see and hear when you click 
one of the Hockey TV Commercial Buttons.

<video src="https://user-images.githubusercontent.com/92641463/240093886-487a0db3-8c9d-4217-ba58-17d5adad7dae.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/240093886-487a0db3-8c9d-4217-ba58-17d5adad7dae.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
</video>

**Video Highlights:**

- On the left is Big Screen TV with Hockey Game airing in full 
screen mode
- On the right is a 4K TV running mserve
- The Hockey TV Commercial button is clicked and the left TV
goes "non-Full Screen"
- A man falling into water appears on the left TV
- A shark outline appears mimicking mserve on the right TV
- The shark swims right to left to gobble up the falling man
- mserve moves to left TV and right TV has outline where mserve
will return to when hockey commercial countdown ends
- The Commercial and Intermission Buttons change with text that
counts down time remaining until Hockey Game resumes. Click
either button to end the countdown immediately
- When hockey countdown ends the Big Screen TV returns to full
screen and the Music Player window goes back to it's original
location on the 4K TV.

## Hockey TV Commercial Button Without **compiz**
{:.no_toc}

This video shows what you see and hear when you click 
one of the Hockey TV Commercial Buttons and `compiz`
code is commented out.

<video src="https://user-images.githubusercontent.com/92641463/243537479-fea82fa0-26fa-42c7-a79a-d1a912ced6d0.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/243537479-fea82fa0-26fa-42c7-a79a-d1a912ced6d0.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
</video>


**Video Highlights:**

- On the top left is Big Screen TV with Hockey Game airing in full 
screen mode
- On the top right is a 4K TV running mserve
- On the bottom is laptop screen with mserve play running.
- The Hockey TV Commercial button is clicked and the top left TV
goes "non-Full Screen"
- A man falling into water appears on the left TV
- A shark outline appears mimicking mserve on the right TV
- The shark swims up then right to left to gobble up the falling man
- The shark momentarily stops and then jumps between right TV
and left TV. This reflects fact that Compiz is disabled. See
code below
- mserve moves to top left TV and bottom right Laptop has outline
where mserve returns to when hockey commercial countdown ends
- The Commercial and Intermission Buttons change with text that
counts down time remaining until Hockey Game resumes. Click
either button to end the countdown immediately
- When hockey countdown ends the Big Screen TV returns to full
screen and the Music Player window goes back to it's original
location on the laptop screen (bottom right).
- Hockey countdown is prematurely ended in this example by
clicking "Time remaining" button and selected "Yes" to
confirmation question to end early.

---

Although it doesn't look as nice with the shark "jumping" between
monitors, it works more reliably. To disable `gsettings` and the
`compiz` option to disable `place` windows (which allows for smooth
shark movement across monitors but leads to instability), open the
file  `image.py` and around line 1119 comment out the code:

```python
# Removing "place" from gsettings allows smooth shark movement over
# monitors. However there are screen resets with disappearing windows
# for a couple seconds from time to time. Keeping "place" has shark
# stop at monitor border then "jump" into the next monitor.
'''
if "'place', " in self.old_compiz_plugins:
    self.place_in_plugins = True
    override = self.old_compiz_plugins.replace("'place', ", '')
    #print('override:', override)
    self.set_gsettings(override)
'''
```

<a id="HelpTvVolume"></a>
## **mserve** Volume During TV Commercials
{:.no_toc}

This image shows **mserve** volume (`ffplay`) is at 60%:

{% include image.html src="/assets/img/mserve/hockey_volume.png"
   alt="hockey_volume.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="hockey_volume.png"
%}

- The TV volume (reflected by Firefox) is 25%
- mserve volume (reflected by ffplay) is 60%

When TV commercial ends, TV volume returns to 100% in 10 steps
over 1/2 second. Music is paused in **mserve** and volume is
reduced from 60% to 25% in 10 steps over 1/2 second.

As of June 11, 2023, **mserve** TV Commercial volume is initialized 
at 60% on line 401 in `mserve.py`:

```python
TV_BREAK1 = 90          # Hockey TV commercial is 90 seconds
TV_BREAK2 = 1080        # Hockey TV intermission break is 18 minutes
TV_VOLUME = 60          # Hockey music play 66% of mserve volume level
TV_SOUND = "Firefox"    # Hockey broadcast is aired on Firefox browser
```

60% was found to be a suitable volume level for CBC broadcasts
of the NHL Stanley Cup Playoffs. YMMV. Note that `TV_VOLUME` is
a short name. A full name would be something like: *"mserve volume
when playing during hockey game muted TV commercials"*.

FYI the "ALSA plug-in [python2.7]" sound processor is used by
**mserve** to display the VU meters (`vu_meter.py`). Configuring the
VU Meters using system output loopback to input stream is described
in the next section.

## Configure **mserve** Volume During Muted TV Commercials

To set the **mserve** volume during muted TV commercials, click 
the *Edit* dropdown menu and select *Volume During TV Commercials*:

{% include image.html src="/assets/img/mserve/mserve volume for tv commercials.png"
   alt="mserve volume for tv commercials.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve volume for tv commercials.png"
%}

This window changes the program variables shown in the last section.

Every location and every playlist within every location has a separate
volume control for **mserve** when TV commercials are muted by **mserve**.

---

<a id="hdr18"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr17">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr19">Skip</a></div>

# VU Meters

The VU Meters show in **mserve** need to be configured using
`pavucontrol` (*Pulse Audio Volume Control*). Before we dive
into **pavucontrol** though, the screenshot below shows
how Ubuntu 16.04 displays sound output devices. This is for
comparison purposes and to show you a screen you may already
be familiar with.

{% include image.html src="/assets/img/mserve/Ubuntu 16.04 Sound Settings Panel.png"
   alt="Ubuntu 16.04 Sound Settings Panel.png"
   style="float: left; width: 60%; margin: 1rem 2rem 1rem 0;"
   caption="Ubuntu 16.04 Sound Settings Panel.png"
%}

In the example **mserve** application used on this webpage, 
the first output device
called "GM204 High Definition Audio Controller" is usually used
for sound output. This belongs to a 50" big screen Sony TV with
good sound system including a sub-woofer. The soundcard (chipset)
is located on a Nvidia 970M discrete graphics card.

The middle output device is "HDMI / DisplayPort - Built-in Audio".
This sound device is 43" 4K TCL / Google (Android) TV. The
sound card is built into Intel Skylake (Thunderbolt 3) USB-C
to HDMI converter plug.

The bottom output device is "Speakers - Built-in Audio". These
are sub-par speakers on a laptop. The only time they would be
used if the laptop was unplugged from the local network (LAN).
The soundcard is built into onboard Intel chipset. 

---

## **pavucontrol** Sound Output Loopback to Microphone
{:.no_toc}

In order for VU Meters to work in **mserve**, The Pulse Audio
Volume Control GUI application (**pavucontrol**) is used.

### Pulse Audio Volume Control Sound Output
{:.no_toc}

{% include image.html src="/assets/img/mserve/pavucontrol output devices.png"
   alt="pavucontrol output devices.png"
   style="float: left; width: 60%; margin: 1rem 2rem 1rem 0;"
   caption="pavucontrol output devices.png"
%}

This screenshot shows the *Pulse Audio Volume Control* "Output 
Devices" Tab.
In this example, the output was changed from the first device
to the **Built-in Audio** speakers. The changes were made from the
Ubuntu 16.04 Sound System Settings panel show in the previous
section.

Notice the thick progress bar. It displays the sound playing
on the output device and jumps very quickly. Progress bar activity
is how you can confirm the active output device is selected.

When the output device is changed, the recording device must
be changed for the VU meters to display the correct output sound
device. See the section: *Pulse Audio Volume Control Change 
Recording Source* below.

Then **mserve** must be restarted 
for the VU meters to display the correct output sound device. 

---

### Pulse Audio Volume Control Recording Tab
{:.no_toc}

{% include image.html src="/assets/img/mserve/pavucontrol recording tab.png"
   alt="pavucontrol recording tab.png"
   style="float: left; width: 60%; margin: 1rem 2rem 1rem 0;"
   caption="pavucontrol recording tab.png"
%}

This screenshot shows the *Pulse Audio Volume Control*
"Recording" Tab.

Notice the thick progress bar at the bottom indicates no sound
is being recorded. That is because it is listening to the
wrong stream: "Monitor of GM204 High Definition Audio
Controller Digital Stereo (HDMI)". This stream is for
the 50" Sony TV connected to Nvidia 970M card.

Remember in the last screenshot we used Ubuntu's sound
setting to change output from 50" TV to built-in laptop
speakers.


---

### Pulse Audio Volume Control Change Recording Source
{:.no_toc}

{% include image.html src="/assets/img/mserve/pavucontrol recording change capture.png"
   alt="pavucontrol recording change capture.png"
   style="float: left; width: 60%; margin: 1rem 2rem 1rem 0;"
   caption="pavucontrol recording change capture.png"
%}

This screenshot also shows the *Pulse Audio Volume Control*
"Recording" Tab.
In this example, the recording stream is different than
the last example.

That is because the steam name
"Monitor of GM204 High Definition Audio
Controller Digital Stereo (HDMI)" was clicked.

Then the stream "Monitor of Built-in Audio Analog Stereo"
was selected. Notice the thick progress bar is now populated
with sound volume levels.

When you change the output device loopback to recording; 
**YOU MUST RESTART mserve**. Otherwise the VU meters will
merely be blank.

References:

- https://github.com/pippim/mserve/blob/main/src/vu_meter.py
- https://wiki.ubuntu.com/record_system_sound
- https://github.com/kmein/vu-meter


<!-- Foot section doesn't have "skip" button -->
<a id="hdr19"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr18">ToS</a>  <a href="#hdr2">ToC</a></div>
