---
title: Music Player with CD Encoding, Lyrics Scraping and Synchronizing
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

This Music Player entertains you with animated graphics, VU meters and scrolling lyrics.
It includes functions to encode CDs with track titles using MusicBrainz database.
It will get lyrics from the internet and let you synchronize them in real time
by simply clicking each line as it is sung.

## Multiple Everything

Why have one when you can have multiples?:

- Multiple Locations Synchronization (including mobile and file servers)
- Multiple Playlists per location (every location also has default favorites)
- Multiple Window save positions for music library, current playing, 
volume control, playlists control, fine-tune time index, location
maintenance, three SQL Table viewers, and CD encoding (ripping)
- Multiple Monitors ensure windows open on correct monitor
- Multiple processes for lag free animations
- Multiple Show Chronology/Resume Song/Volume/Playlist Buttons states
per Playlist per location
- Multiple CD Encoding formats, quality, images and filename formatting
- Multiple MusicBrainz CD album/track releases to chose from for artist.
- Multiple Website Scraping for Lyrics is in progress but currently
defaults to `genius.com`


## Features
 
Innovative features:

- Help buttons in **mserve** bring you directly to this web
page's appropriate sections
- Album Artwork animations and VU Meters during playback
- Album Artwork at pixel 3,3 sets a different color theme for
during song playback (resizing window can result in different 
color theme)
- Scrolling lyrics score during playback (automatically web scraped)
- Synchronize files across multiple locations, including sleeping hosts
that are woken up and kept awake as long as necessary
- Information Centre displays history of messages, statuses and actions
- Tooltips appear after time delay, fade in/out, and follow mouse pointer
- Basic Lyrics Time Synchronization and Advanced Lyrics Time 
Synchronization (Synchronized lyrics lines are stored in 
a Time Index list and this term is frequently used)
- Two timers for playing music during TV broadcast commercials
- Detailed SQL History of actions performed on each song
- Cross-fading other sound sources when toggling play/pause, FF/REW,
and during TV broadcast commercials
- Written in relatively easy to learn Python so you can modify
for Linux, Windows WSL, Chrome OS, Windows (a lot more work) 
and Mac (modest amount of more work)
- Single SQL library with shared lyrics score and time index 
across all locations for one time song maintenance benefiting all
- Restores file's OS last access time to original if 
less than 80% of song was played
- Updates play count and last play time, if 80% of song played


Features most music players don't have:

- Two clicks to rename Artists, Albums and Song files
in both the storage device and the mserve SQL database at the same time.
- Synchronize music across locations (already mentioned above)
- Encode CD to music files in MP3, MP4, FLAC, WAV and OGA format
- Scrape MusicBrainz for Artist / Album CD track details and artwork
- Scrape genius.com and other websites to get song lyrics
- Compare song files between locations and update differences

## **mserve** is Still Under Construction

{% include image.html src="/assets/img/tim-ta/Tim-ta Under Construction.png"
   alt="Under Construction.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="Under Construction.png"
%}

**mserve** (Music Server) is written in Python.
The main program is called `mserve.py` and can be found in the 
[mserve GitHub Repository 🔗](https://github.com/pippim/mserve/blob/main/src/mserve.py 
"View mserve Python source code"){:target="_blank"}

`mserve.py` is called with `m` from the command line or a 
desktop shortcut. It is recommended you start using **mserve**
from the command line to see any error messages that might
appear.

`m` is a wrapper Python script that centers 
a logo on your screen for a couple seconds while **mserve**
is loaded into memory.

`m` and `mserve.py` do not need to be added to your path.
You can call them with `/path/to/m` or `/path/to/mserve.py`
from the command line.

> ***IMPORTANT NOTES:*** 
> 
> **mserve** was primarily tested with Linux, specifically Ubuntu 16.04 LTS.
> **mserve** was briefly tested with ChromeOS for about a month and modified.
> Current plans are to upgrade to 24.04 in year 2024. 
> 
> There is **NO** installation script for **mserve**. You will have to manually
> install dependencies with:
> 
>    `sudo apt install python-xxxxx`.

See the
<a href="#mserveDependencies">dependencies required</a>
by **mserve** section for more details. 
For typical power users, many of the dependencies will already
be installed.

---

<!--  TABLE OF CONTENTS  -->
<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

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

The main music library window follows the directory structure of
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
> location used and continue playing where it left off.

The chevron (triangle) is clicked to expand / collapse entries
under Artists and Albums.

The check box is colored solid when "checked" and is hollow
when "unchecked". If a line appears that means "tri-state" and
underneath the Artist or Album some songs are "checked" and
some songs are "unchecked".

As you check and uncheck individual songs, or entire Artists or,
entire Albums a list is built in memory. Then you can Apply or
Cancel changes.

New songs are added into the Chronology (Playlist) after the 
current playing song position.

If you make huge mistakes you can abandon changes with the
option "*Exit without saving Playlist*".


## Dropdown Menus

The top-left corner of the *Music Location Tree Window* contains 
three dropdown menus; <strong><i>File</i></strong>, <b>Edit</b> and ***View***. 
Click on the name and the dropdown menu options appear:

### File Dropdown Menu

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
**mserve**.


***NOTE:*** The *Enable TV Commercial Buttons* and *Enable FF/Rewind Buttons*
dropdown menu options occupy the same line and replace each other when they 
are clicked. The button selection only effects the 
the current predefined Playlist within the current predefined
Location. Other locations and playlists maintain their button selection.
  
***NOTE:*** The three SQL views allow the column to be moved. Click and
hold the heading to drag the column to a different position.


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

Additional Notes:

- Windows can be resized and Album Artwork grows and shrinks accordingly.
- Primary color (@ coordinates 3x3) can change as artwork is resized.
- Commercial and Intermission buttons are for NHL Stanley Cup Playoffs. Click when they start and TV volume is turned down to 25% and music resumes play. When countdown ends music pauses and TV volume is turned back up to original state.
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

This video shows how the music player keeps playing without any
lag while a CD is being encoded:

<video src="https://user-images.githubusercontent.com/92641463/149241934-99d01df8-2cbf-4488-aa14-efe9e4d4f3aa.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149241934-99d01df8-2cbf-4488-aa14-efe9e4d4f3aa.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
</video>

This video clip show how music player continues in real time while
you use mserve to encode a CD.

Great lengths are taken to ensure animations never lag even when
focus grabbing dialog boxes require a response. If a focus grabbing
dialog box is open when current song ends, the next song is played.

The encoding process uses libdiscid to read the Audio CD's Disc ID.
Then Musicbrainz is accessed to get track listings for Disc ID. It
accesses Musicbrainz a second time to get the first recorded release
date. It then grabs Album Artwork from the internet. 

You can paste album artwork from the clipboard which you previously
copied from Amazon, or another website.

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

Besides these ID3 tags, **mserve** SQL stores metadata for:

- AlbumDate - The date the album was released
- PlayCount - How many times music file was played > 80% of it's duration
- LastPlayTime - Date and time song was last played > 80 %
- Rating - Future feature not implemented
- Hyperlink - Future feature

When **mserve** first discovers a song it takes a "snapshot" of the file's:

- OsAccessTime - Last access time
- OsModifyTime - Last modification time
- OsChangeTime - Last time permissions were changed
- OsFileSize - Size of file in bytes

When file times are updated by the Operating System, they are **NOT**
refreshed in **mserve** SQL database.


## Renaming Artists, Albums and Song files After Encoding

Sometimes the on-line databases contain errors. For example, on
a three CD Greatest Hits collection, are these Album names:

- Greatest Hits Of The 80's [Disc 2]
- Greatest Hits Of The 80's Vol. 1
- Greatest Hits of the 80's

The last CD of the set doesn't say ***[Disc 3]*** nor does
it say ***Volume 3***. It gets confusing when you are viewing
the Music Location.

To Rename using the Music Location tree:

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
- **mserve** will automatically displays ID3 Tag metadata on certain 
screens when a music file is played.
- **mserve** can display ID3 Tags on demand from the Music Location Tree
when you right click on a music file and select 'View Metadata' from the
popup menu.
- **mserve** can also display ID3 Tags when you open the 'View' dropdown
menu and select 'SQL Music'. Right click on a music file and select 
View Metadata' from the popup menu.


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

# SQL Tables and Pickled Data Files

`mserve` data is stored in a unique fashion. This section lists
the filenames you will need to backup. A brief explanation is
given for how each file is used.

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
(left pointing triangle / chevron) in the Music Library window.
- **last_playlist** - lc.FNAME_LAST_PLAYLIST - Full path names of all
songs checked (have the blue square) in the Music Library window. 
Sorted in playlist order.
- **last_song_ndx** - lc.FNAME_LAST_SONG_NDX - Zero based index into
**last_playlist** indicating the song that was playing when **mserve**
was shutdown.
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
    con.execute("CREATE TABLE IF NOT EXISTS Music(Id INTEGER PRIMARY KEY, " +
                "OsFileName TEXT, OsAccessTime FLOAT, OsModifyTime FLOAT, " +
                "OsChangeTime FLOAT, OsFileSize INT, " +
                "Title TEXT, Artist TEXT, Album TEXT, " +
                # Change ReleaseDate to FirstDate and RecordingDate to AlbumYear
                # For old iTunes stuff initialize AlbumYear with FirstYear.
                "ReleaseDate TEXT, RecordingDate TEXT, " +
                "CreationTime TEXT, DiscNumber TEXT, TrackNumber TEXT, " +
                "Rating TEXT, Genre TEXT, Composer TEXT, " +
                "Comment TEXT, Hyperlink TEXT, Duration TEXT, " +
                "Seconds INT, PlayCount INT, LastPlayTime FLOAT, " +
                "LyricsScore BLOB, LyricsTimeIndex TEXT)")

    con.execute("CREATE UNIQUE INDEX IF NOT EXISTS OsFileNameIndex ON " +
                "Music(OsFileName)")

    # HISTORY TABLE
    con.execute("CREATE TABLE IF NOT EXISTS History(Id INTEGER PRIMARY KEY, " +
                "Time FLOAT, MusicId INTEGER, User TEXT, Type TEXT, " +
                "Action TEXT, SourceMaster TEXT, SourceDetail TEXT, " +
                "Target TEXT, Size INT, Count INT, Seconds FLOAT, " +
                "Comments TEXT)")

    con.execute("CREATE INDEX IF NOT EXISTS MusicIdIndex ON " +
                "History(MusicId)")
    con.execute("CREATE INDEX IF NOT EXISTS TimeIndex ON " +
                "History(Time)")
    con.execute("CREATE INDEX IF NOT EXISTS TypeActionIndex ON " +
                "History(Type, Action)")

    # LOCATION TABLE
    con.execute("CREATE TABLE IF NOT EXISTS Location(Id INTEGER PRIMARY KEY, " +
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

# Tooltips Slowly Fade-In and Fade-Out

A lot of work has gone into crafting the tooltips to delay before
gradually fading in. Also, to gradually fade out. And finally, the
Tooltip message bubble follows the moving mouse pointer.

<video src="https://user-images.githubusercontent.com/92641463/149630335-998fb026-67c5-4a4f-9cd0-fd2336f16e78.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149630335-998fb026-67c5-4a4f-9cd0-fd2336f16e78.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
</video>

Key features of tooltips:

- They appear after a delay
- They fade in
- The stay visible for a short time based on word count
- They move instep with mouse movements
- They fade out

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

---

Here is a sample *Edit Location* window with a location highlighted in green.

{% include image.html src="/assets/img/mserve/mserve Edit Location.png"
   alt="mserve Edit Location.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve Edit Location.png"
%}

Mandatory Location Fields. The first two fields are mandatory:

- ***Location Name*** - Cannot be blank and must be unique
- ***Music Top Directory*** - The parent folder / subdirectory that contains
Artist subdirectories.

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

## Synchronize Location

Here we see how files can be synchronized across devices.

{% include image.html src="/assets/img/mserve/Synchronize Actions.png"
   alt="Synchronize Actions.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="Synchronize Actions.png"
%}

The "Action" column states the reason for updating is that the 
file size has increased. This was due to album artwork being
added to the source files.

Here's a list of what can appear in "Action" column:

- "Missing" - In target(other) location (hidden from view)
- "Same" - within 2 seconds so no action required (hidden)
- "Error: Size different, time same" - Don't know copy direction
- "Error: contents different, time same" -    "   "   "   "
- "OOPS" - programming error that should never happen (hidden)
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

<a id="hdr16"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr15">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr17">Skip</a></div>

# Playlists

Playlists are stored by location. Below is a sample screen from the
***View Playlists*** function:

{% include image.html src="/assets/img/mserve/mserve View Playlists.png"
   alt="mserve View Playlists.png"
   style="float: left; width: 60%; margin: 1rem 2rem 1rem 0;"
   caption="mserve View Playlists.png"
%}

The Playlist name cannot be blank and must be unique per location. A
warning is issued when the Playlist name has been used in another location.

The Playlist description is optional.

The device location (code) is automatically assigned.

The columns for "Song Count", "Size of Files" and "Duration" are
automatically calculated as songs are selected and deselected in
Music Location Tree checkboxes. 

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

- From the Music Library window select the "View" dropdown menu.
- When FF/Rewind buttons are visible you have the option of
enabling the Hockey buttons.
- The Hockey TV Commercial button turns down TV commercial and
resumes mserve play for 90 seconds.
- The Hockey TV Intermission button turns down TV commercial and
resumes mserve play for 18 minutes.
- When Hockey TV commercial buttons are active you have
the option of restoring the FF/Rewind buttons.
- When changing buttons, the Music Library window is
sent to bottom and Play Window is raised to the top.

This `.gif` also shows how the Show/Hide
Chronology button places song lyrics in a suitable location
when the artwork size changes.

## Using Hockey TV Commercial Button

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

## Hockey TV Commercial Button Without `compiz`

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

## **mserve** Volume During TV Commercials

This image shows **mserve** volume (`ffplay`) is 60%:

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

## Change <strong>mserve</strong> Volume Default for TV Commercials

Click the 'Edit' dropdown menu and then select
'Volume for TV Commercials' and this screen appears:

{% include image.html src="/assets/img/mserve/mserve volume for tv commercials.png"
   alt="mserve volume for tv commercials.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="mserve volume for tv commercials.png"
%}

Hopefully this screen is self-explanatory.

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

## `pavucontrol` Sound Output Loopback to Microphone

In order for VU Meters to work in **mserve**, The Pulse Audio
Volume Control GUI application (**pavucontrol**) is used.

### Pulse Audio Volume Control Sound Output

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
