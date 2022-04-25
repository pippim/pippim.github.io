---
layout:       post
title:        >
    Error for no default plymouth
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1096357
type:         Answer
tags:         boot plymouth
created_date: 2018-11-27 02:45:41
edit_date:    
votes:        "2 "
favorites:    
views:        "4,078 "
accepted:     
uploaded:     2022-04-24 19:32:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-27-Error-for-no-default-plymouth.md
toc:          false
navigation:   true
clipboard:    true
---

It appears you are missing a symbolic link compared to my old installation:

``` 
$ ll /mnt/old/usr/share/plymouth/themes/
total 32
drwxr-xr-x 8 root root 4096 Feb 28  2018 ./
drwxr-xr-x 3 root root 4096 Feb 28  2018 ../
lrwxrwxrwx 1 root root   39 Feb 28  2018 default.grub -> /etc/alternatives/default.plymouth.grub
lrwxrwxrwx 1 root root   34 Feb 28  2018 default.plymouth -> /etc/alternatives/default.plymouth
drwxr-xr-x 2 root root 4096 Feb 28  2018 details/
drwxr-xr-x 2 root root 4096 Oct 22  2017 earth-sunrise/
drwxr-xr-x 2 root root 4096 Feb 28  2018 text/
lrwxrwxrwx 1 root root   31 Feb 28  2018 text.plymouth -> /etc/alternatives/text.plymouth
drwxr-xr-x 2 root root 4096 Feb 28  2018 tribar/
drwxr-xr-x 2 root root 4096 Feb 28  2018 ubuntu-logo/
drwxr-xr-x 2 root root 4096 Feb 28  2018 ubuntu-text/
```

I've use the **Earth Sunrise** plymouth theme in the past but it goes by too fast on an NVMe SSD nowdays. Below are the installation instructions from: [Newly Added Plymouth Theme Not Showing Up During Boot]({% post_url /2016/2016-11-12-Newly-Added-Plymouth-Theme-Not-Showing-Up-During-Boot %})


----------


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

## Change path names from <16.04 to 16.04 format

The file `/usr/share/plymouth/themes/default.plymouth` had old paths from Ubuntu 14.04 and had to changed to reflect Ubuntu 16.04.

Make sure yours contains path names like this:

``` 
[Plymouth Theme]
Name=Earth Sunrise
Description=This theme is a modification of Andre "Osku" Schmidt's Space sunrise plymouth theme
ModuleName=script

[script]
ImageDir=/usr/share/plymouth/themes/earth-sunrise
ScriptFile=/usr/share/plymouth/themes/earth-sunrise/earth-sunrise.script
```


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## Frame Buffer in initramfs-tools

Edit the file `/etc/initramfs-tools/conf.d/splash` and add this line:

``` 
FRAMEBUFFER=y
```

## Smooth transition to GDM

To enable smooth transition you have to disable your display manager unit, e.g. 

``` 
systemctl disable gdm.service
```

Enable the respective DM-plymouth Unit (GDM, LXDM, SLiM units provided), e.g.  

``` 
systemctl enable gdm-plymouth.service
```


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## Turn on debug

Edit the file `/etc/default/grub` and search for LINUX_DEFAULT line:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash vt.handoff=7 kaslr"
```

and change it to this:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="plymouth:debug splash vt.handoff=7 kaslr"
```

Note `plymouth:debug` is the important thing. Also `splash` is always required to invoke plymouth.

After rebooting look into the file `/var/log/plymouth-debug.log` and it should look something like this:

{% include copyHeader.html %}
``` 
[main.c:1865]                                 check_logging:checking if console messages should be redirected and logged
[main.c:1874]                                 check_logging:logging will be enabled!
[main.c:1946]                        initialize_environment:source built on May 10 2016
[main.c:1957]                        initialize_environment:Making sure /run/plymouth exists
[ply-utils.c:703]                          ply_create_directory:directory '/run/plymouth' already exists
[main.c:1961]                        initialize_environment:initialized minimal work environment
[main.c:716]                       get_cache_file_for_mode:returning cache file '/var/lib/plymouth//boot-duration'
[main.c:321]                                 load_settings:Trying to load /etc/plymouth//plymouthd.conf
[ply-key-file.c:83]                        ply_key_file_open_file:Failed to open key file /etc/plymouth//plymouthd.conf: No such file or directory
[main.c:449]                    find_system_default_splash:failed to load /etc/plymouth//plymouthd.conf
[main.c:321]                                 load_settings:Trying to load /usr/share/plymouth//plymouthd.defaults
[ply-key-file.c:83]                        ply_key_file_open_file:Failed to open key file /usr/share/plymouth//plymouthd.defaults: No such file or directory
[main.c:463]              find_distribution_default_splash:failed to load /usr/share/plymouth//plymouthd.defaults
[main.c:873]           plymouth_should_show_default_splash:checking if plymouth should show default splash
[main.c:901]           plymouth_should_show_default_splash:using default splash because kernel command line has option "splash"
[ply-device-manager.c:668]                   create_seats_from_terminals:checking for consoles
[ply-device-manager.c:555]                        add_consoles_from_file:opening /sys/class/tty/console/active
[ply-device-manager.c:563]                        add_consoles_from_file:reading file
[ply-device-manager.c:601]                        add_consoles_from_file:console /dev/pts/17 found!
[ply-device-manager.c:793]                ply_device_manager_watch_seats:udev support disabled, creating fallback seat
[ply-device-manager.c:635]    create_seat_for_terminal_and_renderer_type:creating seat for /dev/pts/17 (renderer type: 0) (terminal: /dev/pts/17)
[ply-renderer.c:230]                      ply_renderer_open_plugin:trying to open renderer plugin /usr/lib/x86_64-linux-gnu/plymouth/renderers/x11.so
[ply-renderer.c:250]                      ply_renderer_open_plugin:opened renderer plugin /usr/lib/x86_64-linux-gnu/plymouth/renderers/x11.so
[ply-seat.c:80]                            add_pixel_displays:Adding displays for 1 heads
[ply-terminal.c:600]                             ply_terminal_open:trying to open terminal '/dev/pts/17'
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 80x24 text cells
[ply-seat.c:113]                             add_text_displays:adding text display for terminal /dev/pts/17
[main.c:1034]                                 on_seat_added:listening for keystrokes
[main.c:1038]                                 on_seat_added:listening for escape
[main.c:1042]                                 on_seat_added:listening for backspace
[main.c:1046]                                 on_seat_added:listening for enter
[main.c:2243]                                          main:entering event loop
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 81x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 82x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 85x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 89x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 92x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 97x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 101x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 104x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 108x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 111x24 text cells
[ply-terminal.c:395]                 ply_terminal_look_up_geometry:looking up terminal text geometry
[ply-terminal.c:409]                 ply_terminal_look_up_geometry:terminal is now 112x24 text cells
[ply-boot-server.c:388]             print_connection_process_identity:connection is from pid 8073 (plymouth --ping) with parent pid 7812 (sudo plymouth --ping)
[ply-event-loop.c:1060]   ply_event_loop_handle_disconnect_for_source:calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1064]   ply_event_loop_handle_disconnect_for_source:done calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1144]   ply_event_loop_free_destinations_for_source:freeing destination (1, 0x406490, 0x406350) of fd 12
[ply-event-loop.c:643]             ply_event_loop_remove_source_node:failed to delete fd 12 from epoll watch list: Bad file descriptor
[ply-boot-server.c:388]             print_connection_process_identity:connection is from pid 10838 (plymouth show-splash) with parent pid 10837 (sudo plymouth show-splash)
[ply-boot-server.c:484]                ply_boot_connection_on_request:got show splash request
[main.c:843]      plymouth_should_ignore_show_splash_calls:checking if plymouth should be running
[main.c:942]                                on_show_splash:at least one seat already open, so loading splash
[main.c:873]           plymouth_should_show_default_splash:checking if plymouth should show default splash
[main.c:901]           plymouth_should_show_default_splash:using default splash because kernel command line has option "splash"
[main.c:476]                           show_default_splash:Showing splash screen
[main.c:495]                           show_default_splash:Trying old scheme for default splash
[main.c:1610]                                    load_theme:Loading boot splash theme '/usr/share/plymouth/themes/default.plymouth'
[ply-key-file.c:171]                       ply_key_file_load_group:trying to load group Plymouth Theme
[ply-key-file.c:171]                       ply_key_file_load_group:trying to load group script
[ply-key-file.c:259]                      ply_key_file_load_groups:key file has no more groups
[main.c:1625]                                    load_theme:attaching plugin to event loop
[main.c:1628]                                    load_theme:attaching progress to plugin
[ply-boot-splash.c:178]                                attach_to_seat:adding pixel displays
[ply-boot-splash.c:191]                                attach_to_seat:Adding 1920x1080 pixel display
[ply-device-manager.c:841]         ply_device_manager_activate_renderers:activating renderers
[ply-boot-splash.c:491]                          ply_boot_splash_show:showing splash screen
[./plugin.c:424]                            show_splash_screen:starting boot animation
[./plugin.c:302]                               start_animation:parsing script file
[./plugin.c:280]                        start_script_animation:executing script file
[ply-device-manager.c:881]         ply_device_manager_activate_keyboards:activating keyboards
[main.c:294]                                 show_messages:not displaying messages, since no boot splash
[ply-event-loop.c:1060]   ply_event_loop_handle_disconnect_for_source:calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1064]   ply_event_loop_handle_disconnect_for_source:done calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1144]   ply_event_loop_free_destinations_for_source:freeing destination (1, 0x406490, 0x406350) of fd 12
[ply-event-loop.c:643]             ply_event_loop_remove_source_node:failed to delete fd 12 from epoll watch list: Bad file descriptor
[ply-boot-server.c:388]             print_connection_process_identity:connection is from pid 13320 (plymouth message --text=hello world) with parent pid 13319 (sudo plymouth message --text=hello world)
[ply-boot-server.c:637]                ply_boot_connection_on_request:got show message request
[main.c:595]                            on_display_message:displaying message hello world
[ply-event-loop.c:1060]   ply_event_loop_handle_disconnect_for_source:calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1064]   ply_event_loop_handle_disconnect_for_source:done calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1144]   ply_event_loop_free_destinations_for_source:freeing destination (1, 0x406490, 0x406350) of fd 12
[ply-event-loop.c:643]             ply_event_loop_remove_source_node:failed to delete fd 12 from epoll watch list: Bad file descriptor
[ply-boot-server.c:388]             print_connection_process_identity:connection is from pid 16361 (plymouth show-splash) with parent pid 16360 (sudo plymouth show-splash)
[ply-boot-server.c:484]                ply_boot_connection_on_request:got show splash request
[main.c:920]                                on_show_splash:show splash called while already shown
[ply-event-loop.c:1060]   ply_event_loop_handle_disconnect_for_source:calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1064]   ply_event_loop_handle_disconnect_for_source:done calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1144]   ply_event_loop_free_destinations_for_source:freeing destination (1, 0x406490, 0x406350) of fd 12
[ply-event-loop.c:643]             ply_event_loop_remove_source_node:failed to delete fd 12 from epoll watch list: Bad file descriptor
[ply-boot-server.c:388]             print_connection_process_identity:connection is from pid 17411 (plymouth pause-progress) with parent pid 17410 (sudo plymouth pause-progress)
[ply-boot-server.c:672]                ply_boot_connection_on_request:got progress pause request
[main.c:665]                             on_progress_pause:pausing progress
[ply-event-loop.c:1060]   ply_event_loop_handle_disconnect_for_source:calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1064]   ply_event_loop_handle_disconnect_for_source:done calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1144]   ply_event_loop_free_destinations_for_source:freeing destination (1, 0x406490, 0x406350) of fd 12
[ply-event-loop.c:643]             ply_event_loop_remove_source_node:failed to delete fd 12 from epoll watch list: Bad file descriptor
[ply-boot-server.c:388]             print_connection_process_identity:connection is from pid 21148 (plymouth show-splash) with parent pid 20299 (sudo plymouth show-splash)
[ply-boot-server.c:484]                ply_boot_connection_on_request:got show splash request
[main.c:920]                                on_show_splash:show splash called while already shown
[ply-event-loop.c:1060]   ply_event_loop_handle_disconnect_for_source:calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1064]   ply_event_loop_handle_disconnect_for_source:done calling disconnected_handler 0x406350 for fd 12
[ply-event-loop.c:1144]   ply_event_loop_free_destinations_for_source:freeing destination (1, 0x406490, 0x406350) of fd 12
[ply-event-loop.c:643]             ply_event_loop_remove_source_node:failed to delete fd 12 from epoll watch list: Bad file descriptor
[ply-boot-server.c:388]             print_connection_process_identity:connection is from pid 29215 (plymouth --quit) with parent pid 29214 (sudo plymouth --quit)
[ply-boot-server.c:519]                ply_boot_connection_on_request:got quit request
[main.c:1290]                                       on_quit:quitting (retain splash: false)
[main.c:1307]                                       on_quit:system not initialized so skipping saving boot-duration file
[main.c:1566]         tell_systemd_to_stop_printing_details:telling systemd to stop printing details
[main.c:1316]                                       on_quit:closing log
[ply-device-manager.c:901]       ply_device_manager_deactivate_keyboards:deactivating keyboards
[ply-seat.c:185]                  ply_seat_deactivate_keyboard:deactivating keyboard
[main.c:1322]                                       on_quit:unloading splash
[ply-boot-splash.c:689]                   ply_boot_splash_become_idle:telling splash to become idle
[ply-boot-splash.c:668]                                       on_idle:splash now idle
[main.c:1202]                           on_boot_splash_idle:boot splash idle
[main.c:1209]                           on_boot_splash_idle:hiding splash
[ply-device-manager.c:861]       ply_device_manager_deactivate_renderers:deactivating renderers
[ply-seat.c:200]                  ply_seat_deactivate_renderer:deactivating renderer
[ply-event-loop.c:951]      ply_event_loop_stop_watching_for_timeout:multiple matching timeouts found for removal
[main.c:1214]                           on_boot_splash_idle:quitting splash
[main.c:1070]                                   quit_splash:quiting splash
[main.c:1072]                                   quit_splash:freeing splash
[ply-boot-splash.c:406]                          ply_boot_splash_free:freeing splash
[ply-event-loop.c:965]      ply_event_loop_stop_watching_for_timeout:no matching timeout found for removal
[ply-boot-splash.c:385]                             detach_from_seats:detaching from seats
[ply-boot-splash.c:110]                              detach_from_seat:removing keyboard
[ply-boot-splash.c:116]                              detach_from_seat:removing pixel displays
[ply-boot-splash.c:131]                              detach_from_seat:Removing 1920x1080 pixel display
[ply-boot-splash.c:139]                              detach_from_seat:removing text displays
[ply-boot-splash.c:153]                              detach_from_seat:Removing 112x24 text display
[ply-device-manager.c:901]       ply_device_manager_deactivate_keyboards:deactivating keyboards
[main.c:1081]                                   quit_splash:Not retaining splash, so deallocating VT
[ply-terminal.c:919]                    ply_terminal_deactivate_vt:terminal is not for a VT
[ply-terminal.c:669]                            ply_terminal_close:restoring color palette
[ply-terminal.c:673]                            ply_terminal_close:stop watching tty fd
[ply-event-loop.c:759]               ply_event_loop_stop_watching_fd:stopping watching fd 11
[ply-event-loop.c:775]               ply_event_loop_stop_watching_fd:removing destination for fd 11
[ply-event-loop.c:784]               ply_event_loop_stop_watching_fd:no more destinations remaing for fd 11, removing source
[ply-terminal.c:679]                            ply_terminal_close:stop watching SIGWINCH signal
[ply-terminal.c:683]                            ply_terminal_close:setting buffered input
[main.c:1216]                           on_boot_splash_idle:quitting program
[main.c:1144]                                  quit_program:cleaning up devices
[ply-device-manager.c:521]                       ply_device_manager_free:freeing device manager
[ply-device-manager.c:422]                                    free_seats:removing seats
[main.c:957]                               on_seat_removed:no longer listening for keystrokes
[main.c:961]                               on_seat_removed:no longer listening for escape
[main.c:965]                               on_seat_removed:no longer listening for backspace
[main.c:969]                               on_seat_removed:no longer listening for enter
[ply-seat.c:307]                           free_pixel_displays:freeing 1 pixel displays
[ply-seat.c:328]                            free_text_displays:freeing 1 text displays
[main.c:1147]                                  quit_program:exiting event loop
[ply-boot-server.c:350]          ply_boot_connection_on_quit_complete:quit complete
[main.c:2245]                                          main:exited event loop
[ply-boot-splash.c:406]                          ply_boot_splash_free:freeing splash
[main.c:2255]                                          main:freeing terminal session
[main.c:2261]                                          main:exiting with code 0
```

### Update initramfs

After making any of the above changes run:

``` 
sudo update-initramfs -u -k all
```




<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a></div>

