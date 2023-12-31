---
layout:       post
title:        >
    Python Tkinter Table order table columns with drag and drop
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/68534990
type:         Answer
tags:         python tkinter drag-and-drop
created_date: 2021-07-26 18:43:37
edit_date:    
votes:        "0 "
favorites:    
views:        "2,666 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-07-26-Python-Tkinter-Table-order-table-columns-with-drag-and-drop.md
toc:          false
navigation:   false
clipboard:    false
---

A simple class call can get this done:

``` python
MoveTreeviewColumn(mytoplevel, mytree)
```

[![bserve move column2.gif][1]][1]


- Snap to grid is utilized
- Hold down mouse button on column heading to instigate
- Move column left to right and back again
- Buttons below treeview are blacked out
- Columns appear with rectangular border
- Treeview columns are reordered when you release button

Code was just written this weekend so could use polishing:

``` python

try:  # Python 3
    import tkinter as tk
except ImportError:  # Python 2
    import Tkinter as tk
from PIL import Image, ImageTk
from collections import namedtuple
from os import popen
BUTTON_HEIGHT = 63                  # Button region to black out during move


class MoveTreeviewColumn:
    """ Shift treeview column to preferred order """

    def __init__(self, toplevel, treeview, row_release=None):

        self.toplevel = toplevel
        self.treeview = treeview
        self.row_release = row_release      # Button-Release not on heading
        self.region = None                  # Region of treeview clicked

        self.col_cover_top = None           # toplevel move columns
        self.col_top_is_active = False      # column move in progress?
        self.canvas = None                  # tk Canvas with column photos
        self.col_being_moved = None         # Column being moved in '#?' form
        self.col_swapped = False            # Did we swap a column?

        self.images = []                    # GIC protected image list
        self.canvas_names = []              # treeview column names
        self.canvas_widths = []             # matching widths
        self.canvas_objects = []            # List of canvas objects
        self.canvas_x_offsets = []          # matching x-offsets within canvas

        self.canvas_index = None            # Canvas index being moved
        self.canvas_name = None             # Treeview column name
        self.canvas_object = None           # Canvas item object being moved
        self.canvas_original_x = None       # Canvas item starting offset
        self.start_mouse_pos = None         # Starting position to calc delta

        self.treeview.bind("<ButtonPress-1>", self.start)
        self.treeview.bind("<ButtonRelease-1>", self.stop)
        self.treeview.bind("<B1-Motion>", self.motion)

    def close(self):
        self.treeview.unbind("<ButtonPress-1>")
        self.treeview.unbind("<ButtonRelease-1>")
        self.treeview.unbind("<B1-Motion>")

    def start(self, event):
        """
            Button 1 was just pressed for library treeview or backups treeview

        :param event: tkinter event
        :return:
        """

        #print('<ButtonPress-1>', event.x, event.y)
        self.region = self.treeview.identify("region", event.x, event.y)

        if self.region != 'heading':
            return

        Mouse = namedtuple('Mouse', 'x y')
        # noinspection PyArgumentList
        self.start_mouse_pos = Mouse(event.x, event.y)

        if self.col_cover_top is not None:
            print('toolkit.py MoveTreeviewColumn attempting to create self.col_cover_top a second time.')
            return

        self.create_move_column()
        if self.col_top_is_active is False:
            return  # Released button quickly or error creating top level

        # The column being moved - Recalculated after snap to grid
        self.col_being_moved = self.treeview.identify_column(event.x)
        #print('self.col_being_moved:', self.col_being_moved)
        self.get_source(self.col_being_moved)
        self.treeview.config(cursor='boat red red')  # boat cursor supports red
        self.col_swapped = False
        #print('\n columns BEFORE:', self.canvas_names)

    def stop(self, event):
        """ Determine if we were in motion before we lifted mouse button
        """
        if self.region != 'heading':
            # If button release not on heading call optional row_release
            if self.row_release is not None:
                self.row_release(event)
            return

        ''' Destroy toplevel used for moving columns on canvas '''
        if self.col_top_is_active:
            # Destroy top level window covering up old music player position
            if self.col_cover_top is not None:
                if self.col_swapped:
                    #print('columns AFTER :', self.canvas_names)
                    self.treeview["displaycolumns"] = self.canvas_names
                    self.toplevel.update_idletasks()  # just in case
                self.col_cover_top.destroy()
                self.col_cover_top = None
            self.col_top_is_active = False
            self.treeview.config(cursor='')

    def motion(self, event):
        """
        What if only 1 column?

        What if horizontal scroll and non-displayed columns to left or right
        of displayed treeview columns? Need to compare 'displaycolumns' to
        current treeview.

        :param event: Tkinter event with x, y, widget
        :return:
        """
        if self.region != 'heading':
            return

        # Calculate delta - distance travelled since startup or snap to grid
        change = event.x - self.start_mouse_pos.x

        # Calculate new start, middle and ending x offsets for source object
        new_x = int(self.canvas_original_x + change)  # Sometimes we get float?
        new_middle_x = new_x + self.canvas_widths[self.canvas_index] // 2
        new_x2 = new_x + self.canvas_widths[self.canvas_index]
        self.canvas.coords(self.canvas_object, (new_x, 0))  # Move on screen

        ''' Make column snap to next (jump) when over half way -
            Either half of target is covered or half of source
            has moved into target 
        '''
        if change < 0:  # Mouse is moving column to the left
            if self.canvas_index == 0:
                return  # We are already first column on left
            target_index = self.canvas_index - 1
            target_start_x, target_middle_x, target_end_x = self.get_target(
                target_index)
            if new_x > target_middle_x and new_middle_x > target_end_x:
                return  # Not eligible for snap to grid

        elif change > 0:  # Mouse is moving column to the right
            if self.canvas_index == len(self.canvas_x_offsets) - 1:
                return  # We are already last column on right
            target_index = self.canvas_index + 1
            target_start_x, target_middle_x, target_end_x = self.get_target(
                target_index)
            if new_x2 < target_middle_x and new_middle_x < target_start_x:
                return  # Not eligible for snap to grid
        else:
            #print('toolkit.py MoveTreeviewColumn motion() called with no motion.')
            # Common occurrence when mouse moves fraction back and forth
            return  # Mouse didn't change position

        ''' Swap our column and the target column beside us (snap to grid).
            Calculate jump factor and then make mouse jump by same amount
        '''

        ''' Diagnostic section
        print('\n<B1-Motion>', event.x, event.y)
        print('\tcanvas_index   :', self.canvas_index,
              '\ttarget_index:  :', target_index,
              '\toriginal_x     :', self.canvas_original_x)
        print('\tnew_x          :', new_x,
              '\tnew_middle_x   :', new_middle_x,
              '\tnew_x2         :', new_x2)
        print('\ttarget_start_x :', target_start_x,
              '\ttarget_middle_x:', target_middle_x,
              '\ttarget_end_x   :', target_end_x)
        '''

        if target_index < self.canvas_index:
            # snapping to grid on left
            if self.canvas_index == 0:
                return  # Can't go before first column
            new_target_x = self.canvas_x_offsets[target_index] + \
                self.canvas_widths[self.canvas_index]
            new_source_x = self.canvas_x_offsets[target_index]
        else:
            # snapping to grid on right
            if self.canvas_index == len(self.canvas_widths) - 1:
                return  # Can't go past last column
            new_source_x = self.canvas_x_offsets[self.canvas_index] + \
                self.canvas_widths[target_index]
            new_target_x = self.canvas_x_offsets[self.canvas_index]

        # Swap lists at target index and self.canvas_index
        source_old_x = self.canvas.coords(self.canvas_object)[0]
        self.source_to_target(target_index, new_target_x, new_source_x)
        source_new_x = self.canvas.coords(self.canvas_object)[0]
        source_x_jump = source_new_x - source_old_x
        #print('source_x_jump:', source_x_jump)

        # Move mouse on screen to reflect snapping to grid
        self.treeview.unbind("<B1-Motion>")            # Don't call ourself
        ''' If you don't have xdotool installed, activate following code
        mouse_x = self.toplevel.winfo_x() + event.x + source_x_jump
        mouse_y = self.toplevel.winfo_y() + event.y
        # mouse_move_to takes .1 to .14 seconds and flickers new window
        move_mouse_to(mouse_x, mouse_y)
        # xdotool takes .006 to .012 seconds and no flickering window
        '''
        popen("xdotool mousemove_relative -- " + str(int(source_x_jump)) + " 0")
        self.treeview.bind("<B1-Motion>", self.motion)

        # Recalibrate mouse starting position within toplevel
        Mouse = namedtuple('Mouse', 'x y')
        # noinspection PyArgumentList
        self.start_mouse_pos = Mouse(event.x + source_x_jump, event.y)

        self.col_swapped = True  # We swapped a column so update treeview

    def get_source(self, col_being_moved):
        """ Set self.canvas_xxx instances """
        # Strip treeview '#' from '#?' column number
        self.canvas_index = int(col_being_moved.replace('#', '')) - 1
        self.canvas_name = self.canvas_names[self.canvas_index]
        self.canvas_object = self.canvas_objects[self.canvas_index]
        self.canvas_original_x = self.canvas_x_offsets[self.canvas_index]
        self.canvas.tag_raise(self.canvas_object)  # Top stacking order

    def get_target(self, target_index):
        target_start_x = self.canvas_x_offsets[target_index]
        target_middle_x = target_start_x + \
            self.canvas_widths[target_index] // 2
        if target_index == len(self.canvas_x_offsets) - 1:
            # This is the last column on right so use canvas width
            target_end_x = self.canvas.winfo_width()
        else:
            # This is the last column on right so use canvas width
            target_end_x = self.canvas_x_offsets[target_index + 1]

        return target_start_x, target_middle_x, target_end_x

    @staticmethod
    def swap(lst, x1, x2):
        # Shorthand
        lst[x1], lst[x2] = lst[x2], lst[x1]

    def source_to_target(self, target_index, new_target_x, new_source_x):
        """ Swap source and target columns """
        self.swap(self.canvas_names, self.canvas_index, target_index)
        self.swap(self.canvas_objects, self.canvas_index, target_index)
        self.swap(self.canvas_widths, self.canvas_index, target_index)
        self.canvas_x_offsets[self.canvas_index] = new_target_x
        self.canvas_x_offsets[target_index] = new_source_x

        # Swap the two images on canvas
        self.canvas.coords(self.canvas_objects[self.canvas_index],
                           (self.canvas_x_offsets[self.canvas_index], 0))
        self.canvas.coords(self.canvas_objects[target_index],
                           (self.canvas_x_offsets[target_index], 0))

        # Now that columns swapped on canvas, get new variables
        self.col_being_moved = "#" + str(target_index + 1)
        self.get_source(self.col_being_moved)

    def create_move_column(self):
        """
            Create canvas toplevel covering up treeview.
            Canvas divided into rectangles for each column.
            Track <B1-Motion> horizontally to swap with next column.
        """

        if self.col_cover_top is not None:
            print('trying to create self.col_cover_top again!!!')
            return

        self.toplevel.update()              # Refresh current coordinates
        self.col_top_is_active = True

        # create named tuple class with names x, y, w, h
        Geom = namedtuple('Geom', ['x', 'y', 'w', 'h'])

        # noinspection PyArgumentList
        top_geom = Geom(self.toplevel.winfo_x(),
                        self.toplevel.winfo_y(),
                        self.toplevel.winfo_width(),
                        self.toplevel.winfo_height())

        #print('\n tkinter top_geom:', top_geom)

        ''' Take screenshot of treeview region (x, y, w, h)
        '''
        # X11 takes 4.5 seconds first time and .67 seconds subsequent times
        #top_image = x11.screenshot(top_geom.x, top_geom.y,
        #                           top_geom.w, top_geom.h)

        # gnome screenshot entire desktop takes .25 seconds
        top_image = gnome_screenshot(top_geom)

        # Did button get released while we were capturing screen?
        if self.col_top_is_active is False:
            return

        # Mount our column moving window over original treeview
        self.col_cover_top = tk.Toplevel()
        self.col_cover_top.overrideredirect(True)   # No window decorations
        self.col_cover_top.withdraw()
        # No title when undecorated (override direct = true)
        #self.col_cover_top.title("Shift column - bserve")
        self.col_cover_top.grid_columnconfigure(0, weight=1)
        self.col_cover_top.grid_rowconfigure(0, weight=1)

        can_frame = tk.Frame(self.col_cover_top, bg="grey",
                             width=top_geom.w, height=top_geom.h)
        can_frame.grid(column=0, row=0, sticky=tk.NSEW)
        can_frame.grid_columnconfigure(0, weight=1)
        can_frame.grid_rowconfigure(0, weight=1)

        self.canvas = tk.Canvas(can_frame, width=top_geom.w,
                                height=top_geom.h, bg="grey")
        self.canvas.grid(row=0, column=0, sticky='nsew')
        '''
        Publish to: https://stackoverflow.com/a/51425272/6929343

        TODO -  We are looping through all columns. We only want the ones
                in currently visible scrolled region.
        '''

        total_width = 0
        self.images = []                    # Reset GIC protected image list
        self.canvas_names = []              # treeview column ids (names)
        self.canvas_widths = []             # matching widths
        self.canvas_objects = []            # List of canvas objects
        self.canvas_x_offsets = []          # matching x-offsets within canvas

        for i, column in enumerate(self.treeview['displaycolumns']):

            col_width = self.treeview.column(column)['width']
            # Create cropped image for column out of screenshot using 1 px
            # border width.  Extra crop from bottom to exclude buttons.
            image = top_image.crop([total_width + 1, 1,
                                    total_width + col_width - 2,
                                    top_geom.h - 63])

            # Make a black background image at original column size
            new_im = Image.new("RGB", (col_width, top_geom.h))

            # Paste cropped column image inside black image making a border
            new_im.paste(image, (2, 2))
            photo = ImageTk.PhotoImage(new_im)
            self.images.append(photo)       # Prevent GIC (garbage collection)
            item = self.canvas.create_image(total_width, 0,
                                            image=photo, anchor=tk.NW)
            self.canvas_names.append(column)
            self.canvas_objects.append(item)
            self.canvas_widths.append(col_width)
            self.canvas_x_offsets.append(total_width)
            total_width += col_width

            # Did button get released while we were formatting canvas?
            if self.col_top_is_active is False:
                return

        # Move the column cover window with canvas over original treeview
        self.col_cover_top.geometry('{}x{}+{}+{}'.format(
            top_geom.w, top_geom.h, top_geom.x, top_geom.y))
        self.col_cover_top.deiconify()  # Forces window to appear
        self.col_cover_top.update()  # This is required for visibility


def move_mouse_to(x, y):
    """ Moves the mouse to an absolute location on the screen.
        Rather slow at .1 second and causes brief screen flicker.
        From: https://stackoverflow.com/a/66808226/6929343
        Visit link for other options under Windows and Mac.
        For Linux use xdotool for .007 response time and no flicker.
    """
    # Create a new temporary root
    temp_root = tk.Tk()
    # Move it to +0+0 and remove the title bar
    temp_root.overrideredirect(True)
    # Make sure the window appears on the screen and handles the `overrideredirect`
    temp_root.update()
    # Generate the event as @a bar nert did
    temp_root.event_generate("<Motion>", warp=True, x=x, y=y)
    # Make sure that tcl handles the event
    temp_root.update()
    # Destroy the root
    temp_root.destroy()


def gnome_screenshot(geom):
    """ Screenshot using old gnome 3.18 standards """

    import gi
    gi.require_version('Gdk', '3.0')
    gi.require_version('Gtk', '3.0')
    gi.require_version('Wnck', '3.0')
    # gi.require_versions({"Gtk": "3.0", "Gdk": "3.0", "Wnck": "3.0"})  # Python 3

    from gi.repository import Gdk, GdkPixbuf, Gtk, Wnck

    Gdk.threads_init()  # From: https://stackoverflow.com/questions/15728170/
    while Gtk.events_pending():
        Gtk.main_iteration()

    screen = Wnck.Screen.get_default()
    screen.force_update()
    w = Gdk.get_default_root_window()
    pb = Gdk.pixbuf_get_from_window(w, *geom)
    desk_pixels = pb.read_pixel_bytes().get_data()
    raw_img = Image.frombytes('RGB', (geom.w, geom.h), desk_pixels,
                              'raw', 'RGB', pb.get_rowstride(), 1)
    return raw_img

# End of: toolkit.py

```


  [1]: https://i.stack.imgur.com/akwZ4.gif
