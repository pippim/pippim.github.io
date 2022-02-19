---
title: Multi-Timer - Run Set of Alarms Consecutively
layout: program
---

<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr2" class="hdr-btn">Skip</a></div>

# Introduction

{% include image.html src="/assets/img/mt/mt progress bars.gif"
   alt="Multi-Timer Progress Bars.gif"
   style="float: left; width: 65%; margin: .5rem 1rem 0px 0px;"
   caption="Multi-Timer Application Indicator and Progress Bars"
%}

Do you have a job with a fixed set of tasks and, each task always takes the same amount of time?

Then Multi-Timer well help you get the job done with no wasted time!

Multi-Timer is called with `mt` from
the command line or a Desktop Shortcut that calls `mt`. 

The Multi-Timer program (`mt`) can be downloaded from the 
[Pippim Multi-Timer Repository 🔗](https://github.com/pippim/multi-timer/blob/main/src/mt).


> **IMPORTANT NOTE:**
>   
> Version 0.2.0 was released on
> February 19, 2022 and not tested with WSL
> (Windows Subsystem for Linux).

---

<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr1" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr3" class="hdr-btn">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr2" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr4" class="hdr-btn">Skip</a></div>

# Running Multi-Timer

Running Multi-Timer is as easy as typing `mt` at the command line. Or simply
clicking a Desktop Shortcut linked to Multi-Timer.

## One Time Configuration

The first time you run Multi-Timer you need to specify the
maximum number of timers (alarms) you will be using. Once
this is set you cannot change it. Your only recourse is to
remove the configuration file (`rm ~/.config/mt.conf`) and
start over again.

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr3" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr5" class="hdr-btn">Skip</a></div>

# Create a Second Configuration File

Lets say you want a second Multi-Timer Configuration file
for another project.  Enter these commands from the terminal (The `#`
comments are not necessary but will not effect operations):

```terminal
cd ~/.config                  # Go to user's configuration directory
cp mt.conf mt_laundry.conf    # Copy Multi-Timer configuration file 
rm mt.conf                    # Remove Multi-Timer configuration file
mt                            # Run Multi-Timer as if first time
```

This saves the current configuration as `mt_laundry.conf` and runs
Multi-Timer as if it were the first time.

---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr4" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr6" class="hdr-btn">Skip</a></div>

# CD Encoding


---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr5" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr7" class="hdr-btn">Skip</a></div>

## Multi-Timer Source Code

The source code (Bash Script) can easily be changed by anyone with
moderate knowledge of the Linux Shell.

---

## Dependencies

Here are the dependencies documented in `mserve.py` python program.
You may already have them installed. Also, this list is for Ubuntu
under version 2.7.12 and, you may have to substitute `python3` where
it says `python`:

``` shell
sudo apt install yad
sudo apt install libnotify
```

---

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr2" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr8" class="hdr-btn">Skip</a></div>

# SQL Tables

Here are the tables and indices used:

{% include copyHeader.html %}
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

            (last_playlist and last_selections uses the same record format)

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
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr7" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr9" class="hdr-btn">Skip</a></div>

# Reopen Windows on Same Monitor with Same Size

Here is how mserve remembers and restores window positions and sizes:

{% include copyHeader.html %}
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
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr8" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr10" class="hdr-btn">Skip</a></div>

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

Here is the key code:

{% include copyHeader.html %}
``` python
# ==============================================================================
#
#   toolkit.py - ToolTipsPool, CreateToolTip
#
#   Aug 16/2021 - Copied from message.py which will be remain intact for
#                 tool tips that do not fade in/out. Only it will be reverted
#                 to former state.
#
# ==============================================================================

tt_DEBUG = False        # Print debug events

VISIBLE_DELAY = 750     # ms pause until balloon tip appears (1/2 sec)
VISIBLE_SPAN = 5000     # ms balloon tip remains on screen (3 sec/line)
EXTRA_LINE_SPAN = 3000  # More than 1 line is 3 seconds/line
FADE_IN_SPAN = 500      # 1/4 second to fade in
FADE_OUT_SPAN = 400     # 1/5 second to fade out

''' NOTE: Because a new tip fades in after 3/4 second we have time to
          make old tool tip fade out assuming VISIBLE_DELAY > FADE_TIME '''
if VISIBLE_DELAY < FADE_OUT_SPAN:
    print('VISIBLE_DELAY < FADE_OUT_SPAN')
    exit()


class CommonTip:
    """ Variables common to ToolTips__init__() and add_tip()
        Must appear before first reference (ShowInfo)
    """
    def __init__(self):

        self.dict = {}                  # add_tip() dictionary

        self.widget = None              # "999.999.999" = top.frame.button  1
        self.current_state = None       # enter, press, release or leave    2
        self.current_mouse_xy = 0       # Mouse position within widget      3
        self.window_mouse_xy = 0        # Position when tip window created  4
        self.enter_time = 0.0           # time button was entered           5
        self.leave_time = 0.0           # time button was left              6
        self.motion_time = 0.0          # time button was released          7
        self.press_time = 0.0           # time button was pressed           8
        self.release_time = 0.0         # time button was released          9
        self.visible_delay = 0          # milliseconds before visible       10
        self.visible_span = 0           # milliseconds to keep visible      11
        self.extra_line_span = 0        # milliseconds for extra lines      12
        self.fade_in_span = 0           # milliseconds for fading in        13
        self.fade_out_span = 0          # milliseconds for fading out       14

        # Too much window_ ??
        #  'tip_window' used to be 'window_object'
        #  'text' used to be 'window_text'
        #  'window_fading_in' could be 'fading_in'
        #  'window_fading_out' could be 'fading_out'
        self.tip_window = None          # The tooltip window we created     15
        self.text = None                # Text can be changed by caller     16
        Geometry = namedtuple('Geometry', 'x, y, width, height')
        # noinspection PyArgumentList
        self.window_geom = Geometry(0, 0, 0, 0)                           # 17
        self.window_visible = False     # False when alpha = 0.0          # 18
        # Window is never alpha 0 anymore...
        self.current_alpha = 0.0        # current window alpha            # 19
        self.window_fading_in = False                                     # 20
        self.window_fading_out = False                                    # 21

        self.tool_type = None           # "button", "label", etc.         # 22
        self.name = None                # Widget name for debugging       # 23
        self.fg = None                  # Foreground color (buttons)      # 24
        self.bg = None                  # Background color (buttons)      # 25
        self.normal_text_color = None   # self.widget.itemcget(...)       # 26
        self.normal_button_color = None  # .itemcget("button_color"...)   # 27



class ToolTips(CommonTip):
    """ Manage fading in and fading out of tooltips (balloons).
        Canvas button (rounded rectangles) highlighting upon button focus.
        Tooltips can be buttons, canvas buttons or labels.
        Tooltips are internally tracked by their widget object:
            Toplevel.Frame.Widget.Window
                Where .Window is created here.
        USAGE:
        From Master Toplevel initialize:
            self.tt = ToolTips()
        During screen creation Add tooltip (defaults to type='button'):
            self.tt.add_tip(widget_name, type='canvas_button',
                            text="This button\nDoes that.")
        In future:
            self.tt_remove_tips(widget_toplevel)
        Parent must poll the tooltips every 33 ms or so with:
            self.tt.poll_tips()
        When polling is impractical, fade in and fade out are disabled by:
            VISIBLE_DELAY = 0
            VISIBLE_SPAN = 0
            FADE_TIME = 0
            FADE_STEPS = 0
        TODO: When long pressing button (previous/next song testing) sometimes
              it is ignored while tooltip is fading in. Button press and release
              events are not being tracked in our poll_tips() function. Press
              and hold button then after tooltip fully fades in a pseudo button
              release event occurs and active state returns to normal.
              The error message is usually displayed: "ToolTipsPool.showtip():
              Previous tooltip should not be waiting to be visible".
    """

    def __init__(self):

        """ Duplicate entry_init() """
        CommonTip.__init__(self)        # Recycled class to set self. instances

        self.log_nt = None              # namedtuple time, action, widget, x, y
        self.log_list = []              # list of log dictionaries
        self.deleted_str = "0.0.0"      # flag log entry as deleted
        self.now = time.time()          # Current time

        self.dict = {}                  # Tip dictionary
        self.tips_list = []             # List of Tip dictionaries
        self.tips_index = 0             # Current working Tip dictionary in list


    def dict_to_fields(self):
        """ Cryptic dictionary fields to easy names """
        self.widget = self.dict['widget']                           # 01
        self.current_state = self.dict['current_state']             # 02
        self.current_mouse_xy = self.dict[' current_mouse_xy']      # 03
        self.window_mouse_xy = self.dict[' window_mouse_xy']        # 04
        self.enter_time = self.dict['enter_time']                   # 05
        self.leave_time = self.dict['leave_time']                   # 06
        self.motion_time = self.dict['motion_time']                 # 07
        self.press_time = self.dict['press_time']                   # 08
        self.release_time = self.dict['release_time']               # 09
        self.visible_delay = self.dict['visible_delay']             # 10
        self.visible_span = self.dict['visible_span']               # 11
        self.extra_line_span = self.dict['extra_line_span']         # 12
        self.fade_in_span = self.dict['fade_in_span']               # 13
        self.fade_out_span = self.dict['fade_out_span']             # 14
        self.tip_window = self.dict['tip_window']                   # 15
        self.text = self.dict['text']                               # 16
        self.window_geom = self.dict['window_geom']                 # 17
        self.window_visible = self.dict['window_visible']           # 18
        self.current_alpha = self.dict['current_alpha']             # 19
        self.window_fading_in = self.dict['window_fading_in']       # 20
        self.window_fading_out = self.dict['window_fading_out']     # 21
        self.tool_type = self.dict['tool_type']                     # 22
        self.name = self.dict['name']                               # 23
        self.fg = self.dict['fg']                                   # 24
        self.bg = self.dict['bg']                                   # 25
        self.normal_text_color = self.dict['normal_text_color']     # 26
        self.normal_button_color = self.dict['normal_button_color']  # 27


    def fields_to_dict(self):
        """ Easy names to cryptic dictionary fields """
        self.dict['widget'] = self.widget                           # 01
        self.dict['current_state'] = self.current_state             # 02
        self.dict[' current_mouse_xy'] = self.current_mouse_xy      # 03
        self.dict[' window_mouse_xy'] = self.window_mouse_xy        # 04
        self.dict['enter_time'] = self.enter_time                   # 05
        self.dict['leave_time'] = self.leave_time                   # 06
        self.dict['motion_time'] = self.motion_time                 # 07
        self.dict['press_time'] = self.press_time                   # 08
        self.dict['release_time'] = self.release_time               # 09
        self.dict['visible_delay'] = self.visible_delay             # 10
        self.dict['visible_span'] = self.visible_span               # 11
        self.dict['extra_line_span'] = self.extra_line_span         # 12
        self.dict['fade_in_span'] = self.fade_in_span               # 13
        self.dict['fade_out_span'] = self.fade_out_span             # 14
        self.dict['tip_window'] = self.tip_window                   # 15
        self.dict['text'] = self.text                               # 16
        self.dict['window_geom'] = self.window_geom                 # 17
        self.dict['window_visible'] = self.window_visible           # 18
        self.dict['current_alpha'] = self.current_alpha             # 19
        self.dict['window_fading_in'] = self.window_fading_in       # 20
        self.dict['window_fading_out'] = self.window_fading_out     # 21
        self.dict['tool_type'] = self.tool_type                     # 22
        self.dict['name'] = self.name                               # 23
        self.dict['fg'] = self.fg                                   # 24
        self.dict['bg'] = self.bg                                   # 25
        self.dict['normal_text_color'] = self.normal_text_color     # 26
        self.dict['normal_button_color'] = self.normal_button_color  # 27


    def log_event(self, action, widget, x, y):
        """ action is 'enter', 'leave', 'press' or 'release'.
            If release coordinates outside of bounding box, it doesn't count.
            Just log events to array. Do not process them at this point.
            Called from bind
            Events are logged instantly, however processed every 33 ms
            There is no perceptible lag as 30 fps is faster than human eye.
        """
        Event = namedtuple('Event', 'time, action, widget, x, y')
        # noinspection PyArgumentList
        self.log_nt = Event(time.time(), action, widget, x, y)
        self.log_list.append(self.log_nt)
        # print('EVENT:', self.log_nt)

    def process_log_list(self):
        """ Process log list backwards deleting earlier matching widget events """
        # https://stackoverflow.com/a/529427/6929343

        for i, self.log_nt in reversed(list(enumerate(self.log_list))):
            # print('log_dict in log_list', self.log_nt)
            if self.log_nt.widget == self.deleted_str:
                continue                        # We deleted this one, grab next
            # Delete matching widget events prior to this event (i) which is kept
            # self.delete_older_for_widget(i)
            self.set_tip_plan()

        self.log_list = []      # Flush out log list for new events

    def delete_older_for_widget(self, stop_index):
        """ Process log list forwards from 0 deleting matching widget
            Requires specialized testing using manual calls to 
            log_event(action, widget, x, y) followed by process_log_list()
            Intention is to delete <enter> event if there is a <leave> event
            in the queue. Problem is the <leave> event is getting deleted
            instead. Disable for now...
        """
        # Find event log's widget in list of tooltips
        search_widget = self.widget_map(self.log_nt.widget)

        for i, nt in enumerate(self.log_list):
            if i >= stop_index:
                return  # Don't want to delete the last one
            if nt.widget == search_widget:
                # Widget matches so flag as deleted
                print('deleting:', self.log_nt)
                # TODO: What if entering canvas is deleted and colors not changed?
                Event = namedtuple('Event', 'time, action, widget, x, y')
                # noinspection PyArgumentList
                self.log_list[i] = Event(self.log_nt.time, self.log_nt.action,
                                         self.deleted_str,
                                         self.log_nt.x, self.log_nt.y)

    def set_tip_plan(self):
        """ Called to process  event from self.log_nt """
        # Find event log's widget in list of tooltips
        search_widget = self.widget_map(self.log_nt.widget)
        # print('self.log_nt:', self.log_nt)
        for self.tips_index, self.dict in enumerate(self.tips_list):
            if self.dict['widget'] == search_widget:
                break

        if len(self.dict) <= 1:
            print('self.log_nt widget NOT FOUND!:', search_widget)
            for self.dict in self.tips_list:
                for key in self.dict:
                    print("key: %s , value: %s" % (key, self.dict[key]))
                return

        if self.dict['widget'] != search_widget:
            # TODO: This will spam at 30 fps
            print('self.log_nt NOT FOUND!:', self.log_nt)
            return
        
        self.dict_to_fields()               # Dictionary to easy names
        self.current_mouse_xy = (self.log_nt.x, self.log_nt.y)

        ''' OVERVIEW:
            Enter, wait, create, fade in, wait, fade out, destroy.  
            self.window_fading_in and self.window_fading_out already 
            setup so just need self.wait_time.
        '''
        if self.log_nt.action == 'leave':
            # Leaving widget
            self.leave_time = self.log_nt.time
            prt_time = datetime.utcnow().strftime("%M:%S.%f")[:-2]
            d_print(prt_time, 'leaving widget: ', str(self.widget)[-4:])

            if self.window_fading_out:
                # If already fading out, continue the process
                pass  # Can't return now, need to drop down for save

            elif self.window_fading_in:
                # We were in the middle of fading in, so force fade out from
                # same alpha level
                # WIP: Currently fades from 1.0 to 0.1
                self.force_fade_out()

            elif self.window_visible:
                # Return widget colors to 'normal' state if needed.
                self.reset_widget_colors()
                # Begin fade process now
                self.force_fade_out()

            else:
                # Window isn't visible now, so force it to never mount
                self.enter_time = 0.0

        elif self.log_nt.action == 'enter':
            # Entering widget
            prt_time = datetime.utcnow().strftime("%M:%S.%f")[:-2]
            d_print(prt_time, 'entering widget:', str(self.widget)[-4:])
            self.enter_time = self.log_nt.time
            if self.window_visible is True:
                # At this point window visible, so start fade out early.
                print('ERROR: Should not be visible already. If persistent, then')
                print("activate 'tt_DEBUG = True' and check for two 'ENTER:' in a row.")

            if self.tool_type is 'canvas_button' and self.widget.state is 'normal':
                self.set_widget_colors()

        elif self.log_nt.action == 'motion':
            # Mouse motion in widget
            self.motion_time = self.log_nt.time
            if self.window_visible:
                self.move_window()

        elif self.log_nt.action == 'press':
            # Button press in widget
            self.press_time = self.log_nt.time

        elif self.log_nt.action == 'release':
            # Button release after press in widget
            self.release_time = self.log_nt.time

        else:
            print('ERROR: process_tip: Invalid action:', self.log_nt.action)

        self.fields_to_dict()
        self.tips_list[self.tips_index] = self.dict

    def force_fade_out(self):
        """ Override enter time to begin fading out now
        """
        _fade_in, _fade_out = self.calc_fade_in_out()
        diff = _fade_out - self.enter_time
        self.enter_time = self.now - diff
        # print('diff:', diff)

    def move_window(self):
        """ Move window as mouse moves"""

        # s = start, g = geometry, m = mouse, x = x-axis, y = y-axis
        sgx, sgy = self.window_geom.split('+')[1:3]
        smx, smy = self.window_mouse_xy[0:2]
        cmx, cmy = self.current_mouse_xy[0:2]
        smx_diff = int(cmx) - int(smx)  # How has mouse changed since start?
        smy_diff = int(cmy) - int(smy)
        # New geometry = start geometry + mouse change since start
        x = int(sgx) + smx_diff
        y = int(sgy) + smy_diff
        self.tip_window.wm_geometry("+%d+%d" % (x, y))

    def widget_map(self, event_widget):
        """ Some widget such as menus have unusual naming. For example:
            Widget:  .140408240130024.140408237557160.140408237557952
            becomes: .140408240130024.#140408240130024#140408237557160.
                      #140408240130024#140408237557160#140408237557952
        """
        if '#' not in str(event_widget):
            return event_widget  # Normal widget formatting

        new_widget = str(event_widget).split('.')[-1]
        new_widget = new_widget.replace('#', '.')
        for self.dict in self.tips_list:
            if str(self.dict['widget']) == new_widget:
                d_print('event widget substituted. tool_type:', self.dict['tool_type'])
                return self.dict['widget']

        # Widget wasn't found
        print('widget_map(): widget not found:\n', event_widget)

    def calc_fade_in_out(self):
        fade_in_time = self.enter_time + float(self.visible_delay) / 1000
        extra_time = self.visible_span + \
            self.extra_line_span * self.text.count('\n')
        fade_out_time = fade_in_time + float(extra_time) / 1000
        return fade_in_time, fade_out_time

    def add_tip(self, widget, text='Pass text here', tool_type='button',
                visible_delay=VISIBLE_DELAY, visible_span=VISIBLE_SPAN,
                extra_line_span=EXTRA_LINE_SPAN, fade_in_span=FADE_IN_SPAN,
                fade_out_span=FADE_OUT_SPAN):

        CommonTip.__init__(self)            # Initialize all tip instances

        self.widget = widget                # "999.999.999"
        self.text = text                    # "This button \n does that."
        self.tool_type = tool_type

        self.visible_delay = visible_delay
        self.visible_span = visible_span
        self.extra_line_span = extra_line_span
        self.fade_in_span = fade_in_span
        self.fade_out_span = fade_out_span

        try:
            self.name = self.widget['text']         # For display during debugging
        except tk.TclError:
            self.name = "Unknown"

        # All widget bound to same four functions
        self.widget.bind('<Enter>', self.enter)
        self.widget.bind('<Leave>', self.leave)
        self.widget.bind('<Motion>', self.motion)
        if tool_type is 'button':
            self.widget.bind("<ButtonPress-1>", self.on_press)
            self.widget.bind("<ButtonRelease-1>", self.on_release)

        # Add tip dictionary to tips list
        self.fields_to_dict()
        self.tips_list.append(self.dict)

    def reset_tip(self):
        """ After cycle is finished reset selected widget values """
        self.enter_time = self.leave_time = self.press_time = \
            self.release_time = self.current_alpha = 0.0
        self.tip_window = self.window_geom = None
        self.window_visible = self.window_fading_in = \
            self.window_fading_out = False

    def set_widget_colors(self):
        """ Set the colors for canvas object focus """

        # For canvas buttons do heavy lifting of reflecting button active state
        self.widget.state = 'active'
        self.normal_text_color = self.widget.itemcget("text_color", "fill")
        self.normal_button_color = self.widget.itemcget("button_color", "fill")

        # We know the button is always black #000000 or white #ffffff
        if self.normal_button_color == "#000000":
            # Button color is black so lighten all 25%
            new_text_color_hex = img.rgb_to_hex(img.lighten_rgb(
                img.hex_to_rgb(self.normal_text_color)))
            new_button_color_hex = img.rgb_to_hex(img.lighten_rgb(
                img.hex_to_rgb(self.normal_button_color)))
        else:
            # Button color is white so darken all 25$
            new_text_color_hex = img.rgb_to_hex(img.darken_rgb(
                img.hex_to_rgb(self.normal_text_color)))
            new_button_color_hex = img.rgb_to_hex(img.darken_rgb(
                img.hex_to_rgb(self.normal_button_color)))

        self.widget.itemconfig("button_color", fill=new_button_color_hex,
                               outline=new_button_color_hex)
        self.widget.itemconfig("text_color", fill=new_text_color_hex)

    def reset_widget_colors(self):
        """ Reset colors for canvas object losing focus """
        if self.tool_type is 'button':
            if self.widget['state'] != tk.NORMAL:
                #print('CreateToolTip.leave(): reset button state to tk.NORMAL')
                self.widget['state'] = tk.NORMAL

        if self.tool_type is 'canvas_button' and self.widget.state is 'active':
            #print('CreateToolTip.leave(): reset canvas button state to normal')
            self.widget.state = 'normal'
            self.widget.itemconfig("button_color", fill=self.normal_button_color,
                                   outline=self.normal_button_color)
            self.widget.itemconfig("text_color", fill=self.normal_text_color)

    def poll_tips(self):
        """ Check for fading in new tooltip and/or fading out current tooltip """
        self.now = time.time()          # Current time

        # Read event log list backwards to avoid unnecessary steps, eg leave after enter
        # means we don't have to do enter step. Empty log list when done.
        self.process_log_list()         # Incomplete...

        for self.tips_index, self.dict in enumerate(self.tips_list):
            self.dict_to_fields()
            self.process_tip()
            self.fields_to_dict()
            self.tips_list[self.tips_index] = self.dict

    def process_tip(self):
        """ Check if window should be created or destroyed.
            Check if we are fading in or fading out and set alpha.
        """

        # Was window destroyed? eg by toplevel closing.
        if self.tip_window:
            if not self.tip_window.winfo_exists():
                self.tip_window = None
                self.window_visible = False
                self.window_fading_in = False
                self.window_fading_out = False
                print("ERROR: process_tip(): tip.window doesn't exist")
                return

        ''' Pending event to start displaying tooltip balloon?
        '''
        if self.enter_time == 0.0:
            if self.tip_window:
                self.tip_window.destroy()
                print('TEMPORARY: forced tip window close')
                self.tip_window = None
                self.window_visible = False
                self.window_fading_in = False
                self.window_fading_out = False
            return  # Widget doesn't have focus

        fade_in_time, fade_out_time = self.calc_fade_in_out()

        # Are we fading out?
        if self.now > fade_out_time:
            if self.window_fading_out is False:
                self.window_fading_out = True
                self.window_fading_in = False

            # What time will we hit zero alpha? (fully faded out)
            zero_alpha_time = fade_out_time + float(self.fade_out_span) / 1000
            if self.now > zero_alpha_time:
                # We've finished fading out
                if self.tip_window is None:
                    print('process_tip(): self.tip_window does not exist')
                    print('self.now:', self.now, 'zero_alpha_time:', zero_alpha_time)
                    diff = self.now - zero_alpha_time
                    print('diff:', diff)
                else:
                    self.tip_window.destroy()

                self.reset_tip()
                return

            # Calculate fade out alpha 1.00 to 0.01
            delta = (zero_alpha_time - self.now) * 1000
            alpha = delta / self.fade_out_span
            self.update_alpha(alpha)
            return

        # Are we fading in?
        if self.now > fade_in_time:

            # If we've already left the button, forego the creation
            #if self.leave_time > self.enter_time:
            #    self.enter_time = 0.0  # Prevent tip window creation
            #    #print('prevent tip window creation when leave > enter')
            #    return

            # for those quirky timing situations
            diff = abs(self.leave_time - self.enter_time)
            if diff < 0.1:
                # To Correct:
                # 45:13.059 ENTER: 8216 59 6
                # 45:13.061 LEAVE: 8216 59 52
                # 45:13.1039 leaving widget:  8216
                # 45:13.1041 entering widget: 8216
                self.enter_time = 0.0  # Prevent tip window creation
                #print('prevent tip window creation when enter ~.1 of leave')
                return

            if self.window_visible is False:
                self.create_tip_window()
                self.window_visible = True
                self.window_fading_in = True

            full_alpha_time = fade_in_time + float(self.fade_in_span) / 1000
            if self.now > full_alpha_time:
                # We've finished fading in
                self.window_fading_in = False
                if self.current_alpha != 1.0:
                    self.update_alpha(1.0)
                return

            # Calculate fade in alpha 0.01 to 1.00
            delta = (full_alpha_time - self.now) * 1000
            alpha = 1.0 - (delta / self.fade_in_span)
            self.update_alpha(alpha)
            return

        # At this point we are simply waiting to fade in or fade out

    def update_alpha(self, alpha):
        if alpha != self.current_alpha:
            self.tip_window.attributes("-alpha", alpha)
            self.current_alpha = alpha

    def create_tip_window(self):

        # Screen coordinates for tooltip balloon (window)
        x = self.widget.winfo_rootx() + 20
        y = self.widget.winfo_rooty() + self.widget.winfo_height() + 10
        if self.tool_type == 'menu':
            # For menu bars the x & y is way off to 0,0
            # https://stackoverflow.com/a/47855128/6929343
            parent = self.widget.master.master
            x = parent.winfo_rootx() + self.widget.winfo_width()
            y = parent.winfo_rooty() + self.widget.winfo_height()
            x = x + self.current_mouse_xy[0]
            y = y + self.current_mouse_xy[1] + 30

        # Track mouse movements to change window geometry
        self.window_mouse_xy = self.current_mouse_xy

        # Invert tooltip colors from current widget album art colors.
        #if self.tool_type is 'button' or self.tool_type is 'menu':
        if self.tool_type is not 'canvas_button':
            self.fg = self.widget["background"]
            self.bg = self.widget["foreground"]
        else:
            self.fg = None
            self.bg = None

        self.tip_window = tw = tk.Toplevel(self.widget)
        self.tip_window.wm_overrideredirect(1)   # Undecorated
        self.tip_window.wm_geometry("+%d+%d" % (x, y))

        # https://www.tcl.tk/man/tcl8.6/TkCmd/wm.htm#M9
        # self.tip_window['background'] = self.bg
        self.tip_window['background'] = self.bg
        # https://stackoverflow.com/a/52123172/6929343
        self.tip_window.wm_attributes('-type', 'tooltip')  # only works X11 and not all distros

        #print('created self.tip_window:', self.tip_window)
        #print('w.wm_geometry("+%d+%d" % (x, y)):', "+%d+%d" % (x, y))

        ''' Throws py charm error: access to protected 'tw._w'
        try:
            # For Mac OS
            tw.tk.call("::tk::unsupported::MacWindowStyle",
                       "style", tw._w,
                       "help", "noActivates")
        except tk.TclError:
            pass
        '''
        #        label = tk.Label(tw, text=self.text, justify=tk.LEFT,
        label = tk.Label(tw, text=self.text, justify=tk.LEFT,
                         background=self.bg, foreground=self.fg, relief=tk.SOLID,
                         borderwidth=2, pady=10, padx=10, font=(None, g.MON_FONTSIZE))
        label.pack(ipadx=2)

        self.tip_window.attributes("-alpha", 0)  # Start at 1%
        self.tip_window.update_idletasks()
        self.window_geom = self.tip_window.wm_geometry()
        d_print('tip_window created at:', "+%d+%d" % (x, y), 'for:', self.widget)

    def set_text(self, widget, text, visible_delay=VISIBLE_DELAY,
                 visible_span=VISIBLE_SPAN, extra_line_span=EXTRA_LINE_SPAN,
                 fade_in_span=FADE_IN_SPAN, fade_out_span=FADE_OUT_SPAN):

        """ Text can be changed at any time externally """
        for self.tips_index, self.dict in enumerate(self.tips_list):
            if self.dict['widget'] == widget:
                self.dict['text'] = text
                self.dict['visible_delay'] = visible_delay
                self.dict['visible_span'] = visible_span
                self.dict['extra_line_span'] = extra_line_span
                self.dict['fade_in_span'] = fade_in_span
                self.dict['fade_out_span'] = fade_out_span
                self.tips_list[self.tips_index] = self.dict
                # TODO: When text expands/shrinks line count
                #       we need to
                return
            
        print('ERROR: set_text(): tip not found')

    def enter(self, _event):
        """
        """
        d_print('ENTER:', str(_event.widget)[-4:], _event.x, _event.y)
        self.log_event('enter', _event.widget, _event.x, _event.y)

    def leave(self, _event):
        """
        Enter has 500 ms delay so leave may come before tooltip displayed.
        TEST: When leaving early button remains "active" so force to "normal".
        """
        d_print('LEAVE:', str(_event.widget)[-4:], _event.x, _event.y)
        self.log_event('leave', _event.widget, _event.x, _event.y)

    # noinspection PyMethodMayBeStatic
    def motion(self, _event):
        """ Mouse is panning over widget.
            Consider moving tooltip window along x-axis
            This generates a lot of noise when printing debug information...
        """
        #d_print('MOVES:', str(_event.widget)[-4:], _event.x, _event.y)
        self.log_event('motion', _event.widget, _event.x, _event.y)
        return

    def on_press(self, _event):
        """ Widget type is button and it was just pressed """
        d_print('PRESS:', str(_event.widget)[-4:], _event.x, _event.y)
        self.log_event('press', _event.widget, _event.x, _event.y)

    def on_release(self, _event):
        """ Widget type is button and mouse click was just released.
            A leave event is automatically generated but we may no longer
            be in the same widget.
        """
        d_print('REL_S:', str(_event.widget)[-4:], _event.x, _event.y)
        self.log_event('release', _event.widget, _event.x, _event.y)

    def close(self,7 widget):
        """ When window closes all tooltips in it must be removed.
            :param widget either button or parent(s) of button.
        """
        new_list = []
        for self.dict in self.tips_list:
            if not str(self.dict['widget']).startswith(str(widget)):
                new_list.append(self.dict)
                
        diff = len(self.tips_list) - len(new_list)
        print(diff, 'Tooltips removed on close')
        self.tips_list = []
        self.tips_list = new_list


def d_print(*args):
    """ Only print debugging lines when tt_DEBUG is true """
    if tt_DEBUG is True:
        prt_time = datetime.utcnow().strftime("%M:%S.%f")[:-3]
        print(prt_time, *args)
```


---

<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr9" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr11" class="hdr-btn">Skip</a></div>

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
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr10" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr12" class="hdr-btn">Skip</a></div>

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
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr11" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr13" class="hdr-btn">Skip</a></div>

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

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr12" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr14" class="hdr-btn">Skip</a></div>

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

This also video shows:

1. The "Paused" graphic in the regular music player. It is programmatically generated and not an image file.
2. The regular music is resumed and the Hamburger menu is used to select the *Fine-tune time index* option
3. The <kbd>Sample all</kbd> button is selected
4. The function plays the first second of each line
5. We noticed at time index `154` seconds the instrumental section was left on too long. This caused the Chorus line and next line to start too late.
6. Those three lines were selected and <kbd>Being sync</kbd> button was used to fix the timing
7. When fixing the timing though we clicked too soon rather than too late as before. So we click back on a previous line and take a "mulligan". Then we click again as the music catches up.
8. Next, the time indices are saved by clicking the <kbd>Save</kbd> button
9. Finally, the function is closed by clicking the <kbd>Close</kbd> button and the regular music player resumes play automatically.

---

<a id="hdr14"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr13" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr15" class="hdr-btn">Skip</a></div>

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

---

<a id="hdr15"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr14" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a>  <a href="#hdr16" class="hdr-btn">Skip</a></div>

# Locations

In addition to the music stored on your local storage, you can access
music stored on a File Server or your Cell Phone.

If the File Server spends most of its life sleeping, you can wake it
up with a "Magic Packet" and keep it awake by "touching" a specific
filename on the server.



<a id="hdr16"></a>
<div class="hdr-bar">  <a href="#" class="hdr-btn">Top</a>  <a href="#hdr54" class="hdr-btn">ToS</a>  <a href="#hdr2" class="hdr-btn">ToC</a></div>
