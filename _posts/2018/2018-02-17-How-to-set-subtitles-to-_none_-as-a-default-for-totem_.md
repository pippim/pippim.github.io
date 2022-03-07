---
layout:       post
title:        >
    How to set subtitles to 'none' as a default for totem?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1007209
type:         Answer
tags:         video totem subtitle
created_date: 2018-02-17 22:39:09
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "1,732 "
accepted:     
uploaded:     2022-03-06 19:51:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-17-How-to-set-subtitles-to-_none_-as-a-default-for-totem_.md
toc:          false
navigation:   false
clipboard:    false
---

# Make subtitle overlay invisible

After a lot of googling found the same Q&A here in AU: [totem (videos) - turn things off?][1]. Just like your question the OP there doesn't want to set font size to 1 pixel as a work around.

The answer posted in the question found that a font size of ``0 using `gsettings` worked perfectly:


----------


# Permanently remove subtitles from your videos


Another option is to [permanently remove subtitles][2] from your `.mkv` files. The author in the link explains how to do it for both soft titles and hard titles (by cropping out the lower part of the picture). The article is divided into three parts:

- *Part One:* Check if the Subtitle is Soft Subtitle or not
- *Part Two:* How to Remove Soft Subtitle from MKV, AVI and MP4?
- *Part Three:* How to Remove Hardcoded Subtitle from MKV, MP4 and AVI?


----------

# Email developer with new feature request

The GNOME Totem developer is Bastien Nocera. You can email him at hadess@hadess.net and ask for a new feature of setting newly opened video default language. In your case it would be "None". However for other users there is a benefit if for example their system's language was set to "Russian" but they wanted all videos opened to have "English" subtitles.

----------

# Change the source code and recompile

Totem source code can be found on [github][3]. If the developers doesn't accommodate the new feature request, you can modify the source code:

 1. Find the module where the subtitle format is assigned
 2. Find the line where the subtitle is set to your language
 3. Add a new line of code overriding the language to none

*It could take many hours to add the one line to the source code but you might find the process enlightening and enjoyable*

I spent about 10 minutes to find the function that sets the subtitle in module: [github][4] at line 246:

``` 
select_subtitle_action_cb (GSimpleAction *action,
               GVariant      *parameter,
               gpointer       user_data)
{
    totem_playlist_select_subtitle_dialog (TOTEM_OBJECT (user_data)->playlist,
                           TOTEM_PLAYLIST_DIALOG_PLAYING);
}
```


----------

# Totem uses `GStreamer` for heavy lifting

Thanks to the answer by [Chriki][5], we learn a lot about Totem internals and how it calls `GStreamer` to do the heavy lifting of video playback. There is a [GStreamer interface option][6] where subtitles can be turned off altogether:

- Supports stream selection and disabling. If your media has multiple audio or subtitle tracks, you can dynamically choose which one to play back, or decide to turn it off altogether (which is especially useful to turn off subtitles). For each of those, use the “current-text” and other related properties.

The part stating ***"which is especially useful to turn off subtitles"*** is probably where an updated version of Totem would target.

As pointed out by Chriki, GStreamer selects the default subtitle language and provides a list of all subtitles which Totem uses to populate it's settings menu. Totem is providing another option of "None" which when selected instructs GStreamer to turn off subtitles.

I think the design change would be to remove the "none" option from the subtitle selection menu. Then create a global menu option for "subtitles on/off" which is persistent across Totem sessions. Perhaps when each new video is started a 5 second bubble could display "Available subtitles turned off." to remind the user they can be turned on for the current video if desired.

That said I'm a beginning bash script maker and C programming to modify the **Totem** to **GStreamer** interface is above my pay grade.

  [1]: https://askubuntu.com/questions/632222/totem-videos-turn-things-off
  [2]: http://www.faasoft.com/articles/remove-subtitles-from-mkv-avi-mp4.html
  [3]: https://github.com/GNOME/totem
  [4]: https://github.com/GNOME/totem/blob/master/src/totem-menu.c
  [5]: https://askubuntu.com/users/137449/chriki
  [6]: https://gstreamer.freedesktop.org/documentation/application-development/highlevel/playback-components.html
