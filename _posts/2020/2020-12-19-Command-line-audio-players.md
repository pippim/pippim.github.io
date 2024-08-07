---
layout:       post
title:        >
    Command line audio players
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1301466
type:         Answer
tags:         software-recommendation command-line sound mp3-player
created_date: 2020-12-19 23:07:00
edit_date:    2021-03-08 11:39:49
votes:        "3 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-08-07 06:21:45
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-12-19-Command-line-audio-players.md
toc:          false
navigation:   true
clipboard:    false
---

`sudo apt install ffmpeg` gives you an industry standard in playing music and videos from the command line. Two tools I use in my own GUI music player I'm starting to develop are called from the command line:

- `ffprobe` gives details on songs
- `ffplay` plays a song


----------



<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

## ffprobe

```$ ffprobe "15 Mr. Roboto.m4a"

ffprobe version 2.8.17-0ubuntu0.1 Copyright (c) 2007-2020 the FFmpeg developers
  built with gcc 5.4.0 (Ubuntu 5.4.0-6ubuntu1~16.04.12) 20160609
  configuration: --prefix=/usr --extra-version=0ubuntu0.1 --build-suffix=-ffmpeg --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --cc=cc --cxx=g++ --enable-gpl --enable-shared --disable-stripping --disable-decoder=libopenjpeg --disable-decoder=libschroedinger --enable-avresample --enable-avisynth --enable-gnutls --enable-ladspa --enable-libass --enable-libbluray --enable-libbs2b --enable-libcaca --enable-libcdio --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libgme --enable-libgsm --enable-libmodplug --enable-libmp3lame --enable-libopenjpeg --enable-libopus --enable-libpulse --enable-librtmp --enable-libschroedinger --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libssh --enable-libtheora --enable-libtwolame --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx265 --enable-libxvid --enable-libzvbi --enable-openal --enable-opengl --enable-x11grab --enable-libdc1394 --enable-libiec61883 --enable-libzmq --enable-frei0r --enable-libx264 --enable-libopencv
  libavutil      54. 31.100 / 54. 31.100
  libavcodec     56. 60.100 / 56. 60.100
  libavformat    56. 40.101 / 56. 40.101
  libavdevice    56.  4.100 / 56.  4.100
  libavfilter     5. 40.101 /  5. 40.101
  libavresample   2.  1.  0 /  2.  1.  0
  libswscale      3.  1.101 /  3.  1.101
  libswresample   1.  2.101 /  1.  2.101
  libpostproc    53.  3.100 / 53.  3.100
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x1f88060] stream 0, timescale not set
[mjpeg @ 0x1f8aa80] Changeing bps to 8
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from '15 Mr. Roboto.m4a':
  Metadata:
    major_brand     : M4A 
    minor_version   : 0
    compatible_brands: M4A mp42isom
    creation_time   : 2012-05-16 16:41:23
    Encoding Params : vers
    iTunNORM        :  00000CD2 00000BFE 000072CF 00006BB6 0004C2DD 0004C2DD 00007FEE 00007F9B 000139A6 0001A6C4
    iTunSMPB        :  00000000 00000840 00000248 0000000000DE9978 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
    iTunes_CDDB_IDs : 16++
    compilation     : 0
    disc            : 1/1
    gapless_playback: 0
    track           : 15/16
    artist          : Styx
    album           : Greatest Hits
    date            : 1983
    genre           : Rock
    title           : Mr. Roboto
    encoder         : iTunes 10.6.1.7
    composer        : Dennis DeYoung
  Duration: 00:05:30.86, start: 0.000000, bitrate: 280 kb/s
    Stream #0:0(und): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 276 kb/s (default)
    Metadata:
      creation_time   : 2012-05-16 16:41:23
    Stream #0:1: Video: mjpeg, yuvj420p(pc, bt470bg/unknown/unknown), 316x316 [SAR 144:144 DAR 1:1], 90k tbr, 90k tbn, 90k tbc
```

----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## ffplay

``` 
$ ffplay "15 Mr. Roboto.m4a"

ffplay version 2.8.17-0ubuntu0.1 Copyright (c) 2003-2020 the FFmpeg developers
  built with gcc 5.4.0 (Ubuntu 5.4.0-6ubuntu1~16.04.12) 20160609
  configuration: --prefix=/usr --extra-version=0ubuntu0.1 --build-suffix=-ffmpeg --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --cc=cc --cxx=g++ --enable-gpl --enable-shared --disable-stripping --disable-decoder=libopenjpeg --disable-decoder=libschroedinger --enable-avresample --enable-avisynth --enable-gnutls --enable-ladspa --enable-libass --enable-libbluray --enable-libbs2b --enable-libcaca --enable-libcdio --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libgme --enable-libgsm --enable-libmodplug --enable-libmp3lame --enable-libopenjpeg --enable-libopus --enable-libpulse --enable-librtmp --enable-libschroedinger --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libssh --enable-libtheora --enable-libtwolame --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx265 --enable-libxvid --enable-libzvbi --enable-openal --enable-opengl --enable-x11grab --enable-libdc1394 --enable-libiec61883 --enable-libzmq --enable-frei0r --enable-libx264 --enable-libopencv
  libavutil      54. 31.100 / 54. 31.100
  libavcodec     56. 60.100 / 56. 60.100
  libavformat    56. 40.101 / 56. 40.101
  libavdevice    56.  4.100 / 56.  4.100
  libavfilter     5. 40.101 /  5. 40.101
  libavresample   2.  1.  0 /  2.  1.  0
  libswscale      3.  1.101 /  3.  1.101
  libswresample   1.  2.101 /  1.  2.101
  libpostproc    53.  3.100 / 53.  3.100
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7f796c0092a0] stream 0, timescale not set
[mjpeg @ 0x7f796c00b680] Changeing bps to 8
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from '15 Mr. Roboto.m4a':
  Metadata:
    major_brand     : M4A 
    minor_version   : 0
    compatible_brands: M4A mp42isom
    creation_time   : 2012-05-16 16:41:23
    Encoding Params : vers
    iTunNORM        :  00000CD2 00000BFE 000072CF 00006BB6 0004C2DD 0004C2DD 00007FEE 00007F9B 000139A6 0001A6C4
    iTunSMPB        :  00000000 00000840 00000248 0000000000DE9978 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
    iTunes_CDDB_IDs : 16++
    compilation     : 0
    disc            : 1/1
    gapless_playback: 0
    track           : 15/16
    artist          : Styx
    album           : Greatest Hits
    date            : 1983
    genre           : Rock
    title           : Mr. Roboto
    encoder         : iTunes 10.6.1.7
    composer        : Dennis DeYoung
  Duration: 00:05:30.86, start: 0.000000, bitrate: 280 kb/s
    Stream #0:0(und): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 276 kb/s (default)
    Metadata:
      creation_time   : 2012-05-16 16:41:23
    Stream #0:1: Video: mjpeg, yuvj420p(pc, bt470bg/unknown/unknown), 316x316 [SAR 144:144 DAR 1:1], 90k tbr, 90k tbn, 90k tbc
[swscaler @ 0x7f7958033ae0] deprecated pixel format used, make sure you did set range correctly
```

----------



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## ffplay in action

A progress counter is displayed whilst `ffplay` is operating and a GUI pop-up window is displayed with the song art (if X11 is not available to command line, such as console, or over ssh, then the GUI can be suppressed by adding the '-nodisp' flag:

[![ffplay example.gif][1]][1]


----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr5">Skip</a></div>

## Incorporate ffprobe and ffplay into your own GUI

I took these tools and am starting to develop my own GUI music player:

[![mserve currently playing.gif][2]][2]


  [1]: https://i.sstatic.net/WeDkY.gif
  [2]: https://i.sstatic.net/zMdLr.gif


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a></div>

