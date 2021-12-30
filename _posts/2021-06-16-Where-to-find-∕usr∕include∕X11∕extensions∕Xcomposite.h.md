---
layout:       post
title:        Where to find ∕usr∕include∕X11∕extensions∕Xcomposite.h
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/68011128
type:         Question
tags:         c linux screenshot x11
created_date: 2021-06-16 23:26:25
edit_date:    
votes:        0
favorites:    
views:        96
accepted:     Accepted
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    true
---

I need to place my application over a full screen video and capture it to put into a "picture in picture" frame in my python tkinter application. I've reviewed the usual suspects (*ImageGrab*, *mss*, etc.) but they all seem to just grab what's visible on the monitor(s). None seem able to grab an invisible window.

I found this C program on **Stack Overflow** which looks promising:

- https://stackoverflow.com/questions/21512177/get-a-screenshot-of-a-window-that-is-cover-or-not-visible-or-minimized-with-xcom

{% include copyHeader.html %}
``` c
#include <stdlib.h>
#include <stdio.h>

#include <X11/Xlib.h>
#include <X11/X.h>
#include <X11/extensions/Xcomposite.h>
#include <X11/extensions/Xrender.h>

int
main ()
{
  Display *display = XOpenDisplay (NULL);
  XID xid = 90177543; // xdotool search --name "World of Warcraft" | head -1

  // Check if Composite extension is enabled
  int event_base_return;
  int error_base_return;
  if (XCompositeQueryExtension (display, &event_base_return, &error_base_return))
    printf ("COMPOSITE IS ENABLED!\n");

  // Requests the X server to direct the hierarchy starting at window to off-screen storage
  XCompositeRedirectWindow (display, xid, CompositeRedirectAutomatic);
  // Preventing the backing pixmap from being freed when the window is hidden/destroyed
  // If you want the window contents to still be available after the window has been destroyed,
  // or after the window has been resized (but not yet redrawn), you can increment the backing
  // pixmaps ref count to prevent it from being deallocated.
  Pixmap pixmap = XCompositeNameWindowPixmap (display, xid);

  // Get window attributes
  XWindowAttributes attr;
  Status s = XGetWindowAttributes (display, xid, &attr);
  if (s == 0)
    printf ("Fail to get window attributes!\n");

  // Extract the data
  XRenderPictFormat *format = XRenderFindVisualFormat (display, attr.visual);
  int width = attr.width;
  int height = attr.height;
  int depth = attr.depth;

  // What we need to do now is to create an XRender Picture for the window,
  // which we'll need to draw it with the Render extension.
  // A picture is a basically a handle to a server side struct with some
  // additional information about a drawable (in this case a window),
  // such as its format, which clipping region should be used when
  // drawing it (if any), whether it should be tiled etc.
  XRenderPictureAttributes pa;
  pa.subwindow_mode = IncludeInferiors;
  Picture picture = XRenderCreatePicture (display, xid, format, CPSubwindowMode, &pa);

  // We now have all the information we need in order to be able to draw the window
  // using the Xrender extension, and we've created and prepared a source picture
  // for the window for this purpose.
  // The Xrender function we'll use to draw the window is XRenderComposite().

  //XRenderComposite (display, PictOpSrc, picture, None, ???destination???, 0,0, 0,0, 0,0, width, height);

  XFreePixmap (display, pixmap);
  XCompositeUnredirectWindow (display, xid, CompositeRedirectAutomatic);

  return 0;
}
```

----------

## Now the real question...

My problem is this section:

``` c
#include <X11/Xlib.h>
#include <X11/X.h>
#include <X11/extensions/Xcomposite.h>
#include <X11/extensions/Xrender.h>
```

All these files are present under `/usr/include/X11` with the exception of `<X11/extensions/Xcomposite.h>`.  Where might I find it?

Ubuntu 16.04 LTS (ESM), Kernel 4.14.216-0414216-generic. Too busy learning new things to break, um, err, upgrade to new version.

FWIW This is a music player app already working where a button click turns down TV volume and music resumes. I'm just enhancing it to move to the TV, take the full screen video and put it into the tkinter frame where the album artwork usually spins. After timer finishes TV resumes and music player moves back to other monitor it came from. As such I think this C program I found is the only solution but I'd welcome canned solutions.
