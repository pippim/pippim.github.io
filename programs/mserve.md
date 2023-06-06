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

{% include image.html src="/assets/img/tim-ta/Tim-ta Under Construction.png"
   alt="Under Construction.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="Under Construction.png"
%}

**mserve** (Music Server) is written in Python.
The main program is called `mserve.py` and can be found on the
[Pippim mserve Repository 🔗](https://github.com/pippim/mserve/blob/main/src/mserve.py).

`mserve.py` is called with `m` from the command line or a desktop shortcut.

> **IMPORTANT NOTES:** 
> 
> Primarily tested with Linux, specifically Ubuntu 16.04 LTS
> Briefly tested with ChromeOS for about a month and modified
> 
> There is NO installation script. You will have to manually
> install dependencies with:
> 
>    `sudo apt install python-xxxxx`.

Below you will find the dependencies required by **mserve**.
Power users will have most of the dependencies already
installed on their system.

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Synchronized Lyrics

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
-    Original version in Linux but hopefully minor port to Windows and Apple.
-    Hopefully in a couple of years port to cars with Apple or Android decks.
-    Hopefully in a few years Record Companies will give away mserve.
-    If anyone is "disturbed" by sample video please advise ASAP, and I'll find a different one.

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
# When less than 300x300 or no artwork for song use this image file
ARTWORK_FOR_LOW_RES = g.PROGRAM_DIR + "Be Creative 2 cropped.jpg"
# "Be Creative 2 cropped.png" is a 4.4 MB image 3120x3120
```

Copy your image file to the directory where you installed `mserve`.

> NOTE:
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
focus grabbing dialog boxes require a response.

The encoding process uses libdiscid to read the Audio CD's Disc ID.
Then Musicbrainz is accessed to get track listings for Disc ID. It
also automatically extracts coverart from the internet. You can
also paste album artwork from the clipboard which you manually
copied from Amazon, etc. More work is required in encoding process
to support more than just .OGA, .WAV and .FLAC formats currently
supported.

## Substituting Special Characters in Filenames

When an Artist, Album or Song have these characters in the name:

- `/`, `:`, `?`, `<`, `>`, `"`, `\`, `|` or `.`

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

Note in Linux the `/` character is used to separate directory levels. 
In Windows the `\` character is used to separate directory levels.

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Programs At a Glance

There are over 10k lines in the `mserve.py` core Music Player program.

All programs written for `mserve`:

- `disc_get.py` - 65 lines 
- `encoding.py` - 2,580 lines
- `external.py` - 248 lines
- `global_variables.py` - 73 lines
- `iamge.py` - 1,583 lines
- `location.py` - 788 lines
- `m` - 152 lines
- `mbz_get1.py` - 1,144 lines
- `mbz_get2.py` - 166 lines
- `message.py` - 1,598 lines
- `monitor.py` - 772 lines
- `mserve.py` - 10,823 lines
- `scrape.py` - 1,843 lines
- `sql.py` - 2,492 lines
- `timefmt.py` - 207 lines
- `toolkit.py` - 2,408 lines
- `vu_meter.py` - 181 lines
- `webscrape.py` - 1,348 lines
- `x11.py` - 262 lines (but might be deprecated soon)

*Line counts updated May 18, 2023.*

---

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
used. E.G. "L001", "L002", etc.
- **locations** - lc.FNAME_LOCATIONS - All available locations and 
their control settings.
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

**lc.FNAME** stands for "location.py" (lc.), "Filename" (FNAME). 
When working inside the location.py module, drop the **lc.** prefix.
In the other Python modules, **import location as lc** is used.

## SQL Tables

The popular SQL database engine `sqlite3` which is used by your
web browser is also used by `mserve`.

Here are the SQL Tables and Indices that are created in
the sqlite3 file **~/.../mserve/library.db**:

``` python
def open_db():
    """ Open SQL Tables """
    global con, cursor, hist_cursor
    # con = sqlite3.connect(":memory:")
    con = sqlite3.connect(FNAME_LIBRARY)
    # print('FNAME_LIBRARY:',FNAME_LIBRARY)

    # MUSIC TABLE

    # Create the table (key must be INTEGER not just INT !
    # See https://stackoverflow.com/a/7337945/6929343 for explanation
    con.execute("create table IF NOT EXISTS Music(Id INTEGER PRIMARY KEY, \
                OsFileName TEXT, OsAccessTime FLOAT, \
                OsModificationTime FLOAT, OsCreationTime FLOAT, \
                OsFileSize INT, MetaArtistName TEXT, MetaAlbumName TEXT, \
                MetaSongName TEXT, ReleaseDate FLOAT, OriginalDate FLOAT, \
                Genre TEXT, Seconds INT, Duration TEXT, PlayCount INT, \
                TrackNumber INT, Rating TEXT, UnsynchronizedLyrics BLOB, \
                LyricsTimeIndex TEXT)")

    con.execute("CREATE UNIQUE INDEX IF NOT EXISTS OsFileNameIndex ON \
                Music(OsFileName)")


    # HISTORY TABLE

    # One time table drop to rebuild new history format
    # con.execute("DROP TABLE IF EXISTS History")

    con.execute("create table IF NOT EXISTS History(Id INTEGER PRIMARY KEY, \
                Time FLOAT, MusicId INTEGER, User TEXT, Type TEXT, \
                Action TEXT, SourceMaster TEXT, SourceDetail TEXT, \
                Target TEXT, Size INT, Count INT, Seconds FLOAT, \
                Comments TEXT)")

    con.execute("CREATE INDEX IF NOT EXISTS MusicIdIndex ON \
                History(MusicId)")
    con.execute("CREATE INDEX IF NOT EXISTS TimeIndex ON \
                History(Time)")

    '''
        INDEX on OsSongName and confirm original when OsArtistName and
            OsAlbumName match up to SORTED_LIST (aka self.song_list) which is
            format of:
                # split song /mnt/music/Artist/Album/Song.m4a into names:
                groups = os_name.split(os.sep)
                Artist = str(groups [START_DIR_SEP+1])
                Album = str(groups [START_DIR_SEP+2])
                Song = str(groups [START_DIR_SEP+3])

            (last_playlist pickle data file uses the same record format)

        Saving/retrieving LyricsTimeIndex (seconds from start):

        >>> import json
        >>> json.dumps([1.2,2.4,3.6])
        '[1.2, 2.4, 3.6]'
        >>> json.loads('[1.2, 2.4, 3.6]')
        [1.2, 2.4, 3.6]

    '''
    # Retrieve column names
    #    cs = con.execute('pragma table_info(Music)').fetchall() # sqlite column metadata
    #    print('cs:', cs)
    #    cursor = con.execute('select * from Music')
    #    names = [description[0] for description in cursor.description]
    #    print('names:', names)
    con.row_factory = sqlite3.Row
    cursor = con.cursor()
    hist_cursor = con.cursor()
```

---

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

# Reopen Windows at Same Location

Most applications always open their windows at the same locations.
Then you have to move the windows to where you want them. `mserve` 
remembers where you like your windows to be and moves them to the
location you last moved them to.

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

# Tooltips

A lot of work has gone into crafting the tooltips to delay before
gradually fading in. Also, to gradually fade out. And finally, to
follow the mouse pointer.

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

You can synchronize each lyrics line to highlight as it is being sung.

<video src="https://user-images.githubusercontent.com/92641463/149630735-8d579143-0d6f-4a7f-84a6-c7349c349e82.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149630735-8d579143-0d6f-4a7f-84a6-c7349c349e82.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

**Notes:**

1. When video starts with song in orange the default is "Auto Scrolling"
2. Click button to engage "Manual Scroll"
3. Now scroll bar appears on right, and you can scroll lyrics
4. The vido changes to next song in black and the default is "Time Scrolling"
5. Click the button to engage "Manual Scroll"
6. Click the button again to reengage "Time Scrolling"
7. Now each lyrics line is automatically highlighted as it is sung
8. For Time Scrolling to work you need to train mserve with the timing.

---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

## Basic Time Synchronization

Basic Time Synchronization is fairly straight forward. You start playing
the song and then click each line as it is sung.

<video src="https://user-images.githubusercontent.com/92641463/149671978-18e1a98f-3a55-472c-9de2-ae3246ee3969.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149671978-18e1a98f-3a55-472c-9de2-ae3246ee3969.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

This video shows:

1. The "Hamburger Drop Down Menu" where the *Basic time index* option is picked.
2. Canceling the *Basic time index* option once started.
3. Restarting the *Basic time index* from the Hamburger menu.
4. Clicking each line as it is sung.
5. The time indices are automatically saved when the song ends or, you can choose the "Save index" option from the Hamburger menu if you don't want to wait for the song to end.

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

## Fine-tune Time Synchronization

Sometimes you just can't seem to click at the right time using
*Basic Time Synchronization* in the previous section. For those
cases the *Fine-tune Time Synchronization* window is provided.

### Begin Sync option

In the following video notice how the option is included in
the "Hamburger" menu and is selected. The video delays long
enough so that you can see all the menu options.

<video src="https://user-images.githubusercontent.com/92641463/149632176-7ce43ab5-a207-4825-bf27-70000b494e64.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149632176-7ce43ab5-a207-4825-bf27-70000b494e64.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

This video shows:

1. The Lyrics "Hamburger Drop Down Menu" options
2. The "Ignore click" option on the menu. This closes the menu which is the same as moving the mouse off the menu and clicking outside the menu.
3. Access the hamburger menu again and select the "Fine-tune time index" option
4. The *Fine-tune time-index* window opens up and pauses the regular music player
5. Select lyric lines in the lyrics score
6. Begin sync button. As music plays you can click the line as it is sung
7. Clicking each line as it is sung is the same behavior as the *Basic time index* function except that additional details are displayed
8. Finally, the *Fine-tune time index* window is closed and regular music player resumes where it was interrupted


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

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr14">Skip</a></div>

### Sample All option

The following video shows again how the *Fine-tune time index* function is selected.
This time the video spends a little time showing you all the buttons in the function.
After turning on sound for the video below and clicking play, make sure you move your
mouse outside the video. This way you can see the entire contents underneath the video
control bar.

<video src="https://user-images.githubusercontent.com/92641463/149672896-ed6b96ac-9c1f-4017-9b15-e41adac8126b.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/149672896-ed6b96ac-9c1f-4017-9b15-e41adac8126b.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

**Video Highlights:**

1. The "Paused" graphic in the regular music player. It is 
programmatically generated and not an image file that can be changed.
2. The regular music is resumed and the Hamburger menu is used to 
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

Note that if you resize the window the artwork animation also shrinks and
expands accordingly. It will maintain the "square" proportions and the
skin background color can change depending on the color of the pixel at
"3, 3" in the artwork.

**May 18, 2023 Revision**

When the Chronology (Playlist) is hidden the lyrics are moved below
the Current song details and VU meters. This allows better space
utilization with larger artwork size.

---

<a id="hdr15"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr14">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr16">Skip</a></div>

# Locations

In addition to the music stored on your local storage, you can access
music stored on a File Server or your Cell Phone.

When you startup mserve or select a different location, music resumes
playing where you left off. Or if music was paused, it is paused at the
same song position where you left off.

If the File Server spends most of its life sleeping, you can wake it
up with a "Magic Packet" and keep it awake by "touching" a specific
filename on the server.

## Compare Locations

Here we see how files can be synchronized across devices.

{% include image.html src="/assets/img/mserve/Synchronize Actions.png"
   alt="Synchronize Actions.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="Synchronize Actions.png"
%}

The "Action" column states the reason for updating is that the 
file size has increased. This was due to album artwork being
added to the source files.

<a id="hdr16"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr15">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr17">Skip</a></div>


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

## Hockey TV Commercial Button Without `compiz`

This video shows what you see and hear when you click 
one of the Hockey TV Commercial Buttons and `compiz`
code is commented out.

{% include image.html src="/assets/img/mserve/Gone Fishing no compiz.mp4"
   alt="Gone Fishing no compiz.mp4"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="Gone Fishing no compiz.mp4"
%}


**Video Highlights:**

- On the top left is Big Screen TV with Hockey Game airing in full 
screen mode
- On the top right is a 4K TV running mserve
- On the bottom is laptop screen with mserve play running.
- The Hockey TV Commercial button is clicked and the top left TV
goes "non-Full Screen"
- A man falling into water appears on the left TV
- A shark outline appears mimicking mserve on the right TV
- The shark swims up then left to right to gobble up the falling man
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
location on the 4K TV.

In `image.py` around line 1119 comment out the code:

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

## mserve Volume During Hockey TV Commercials

This image shows **mserve** volume (`ffplay`) is 60%:

{% include image.html src="/assets/img/mserve/hockey_volume.png"
   alt="hockey_volume.png"
   style="float: none; width: 100%; margin: 2rem 0 1rem 0;"
   caption="hockey_volume.png"
%}

- The TV volume (reflected by Firefox) is 25%
- mserve volume (reflected by ffplay) is 60%

When TV commercial ends, TV volume returns to 100%.

Currently mserve volume is fixed at 60% for TV commercials:

```python
TV_BREAK1 = 90          # Hockey TV commercial is 90 seconds
TV_BREAK2 = 1080        # Hockey TV intermission break is 18 minutes
TV_VOLUME = 60          # Hockey music play 66% of mserve volume level
TV_SOUND = "Firefox"    # Hockey broadcast is aired on Firefox browser
```

60% was found to be a suitable volume level for CBC broadcasts
of the NHL Stanley Cup Playoffs. YMMV. Note that `TV_VOLUME` is a 
bit of a misnomer. A more appropriate name would be: *"mserve volume
when covering up a hockey game's TV commercial break of 90 seconds
or 18 minutes"(.

FYI the "ALSA plug-in [python2.7]" sound processor is used by
**mserve** to display the VU meters (`vu_meter.py`).

<a id="hdr18"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr17">ToS</a>  <a href="#hdr2">ToC</a></div>
