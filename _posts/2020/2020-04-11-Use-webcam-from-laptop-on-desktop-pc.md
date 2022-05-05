---
layout:       post
title:        >
    Use webcam from laptop on desktop pc
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1226284
type:         Answer
tags:         networking webcam streaming video-streaming v4l
created_date: 2020-04-11 18:24:15
edit_date:    
votes:        "2 "
favorites:    
views:        "14,053 "
accepted:     
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-04-11-Use-webcam-from-laptop-on-desktop-pc.md
toc:          false
navigation:   false
clipboard:    false
---

# vlc

Using [vlc][1] is [one way][2] to achieve this goal.

## Step 1 - setup

To install VLC on Debian, Ubuntu or Linux Mint:

``` 
$ sudo apt-get install vlc
```

To install VLC on Fedora, first enable RPM Fusion's free repository, then run:

``` 
$ sudo yum install vlc
```

To install VLC on CentOS or RHEL 6, first set up EPEL repository, and then use the following commands:

``` 
$ cd /etc/yum.repos.d/
$ sudo wget http://pkgrepo.linuxtech.net/el6/release/linuxtech.repo
$ sudo yum install vlc
```

## Step 2 - Verify Webcam in VLC

Make sure your webcam is detected by your Linux system and VLC.

You’ll need to know the webcam’s name for that. In the example below, the webcam is named `/dev/video0`.

``` 
$ ls /dev/video*
/dev/video0
```

Then you have to test video from your webcam. Here is the command you need to use, do not forget to replace "video0" with the name of your device.

``` 
$ vlc v4l2:///dev/video0
```

If your webcam is successfully detected by VLC, you should be able to see your video stream.

## Step 3 - Configure Webcam Streaming on VLC

You have successfully detected your webcam in VLC, next is configuring webcam streaming.

In this example webcam is streamed over HTTP in WMV format. To configure VLC for webcam streaming, first launch VLC.

``` 
$ vlc
```

In VLC menu choose "Streaming".

On the screen select your webcam’s or audio device’s name, e.g., /dev/video0 for webcam, and hw:0,0 for audio. Tick "Show more options" checkbox and make a note of value strings in "MRL" and "Edit Options" fields. These strings will be used later in the tutorial. Click "Stream" button.

Verify the video source, e.g., v4l2:///dev/video, and click "Next" to continue.

Choose the destination, i.e., streaming method/target, of webcam streaming. In our example we choose HTTP from the drop down list, and click "Add".

Next, specify port number and path of a streaming service. For port number, type 8080; we assume the port number is not occupied, for path - "/stream.wmv". For transcoding choose "Video - WMV + WMA (ASF)" profile from the drop down list. Click "Next".

The next screen displays automatically generated stream output string. Make a note of it and click "Stream" button.

At this point, VLC should start streaming video from your webcam over HTTP. Streaming traffic is sent directly to localhost at TCP port number 8080, so you won’t be able to see anything in the VLC window.

To verify that VLC is running correctly at TCP port 8080, run the following command, and look for VLC.

``` 
$ sudo netstat -nap | grep 8080
```

## Step 4 - Watch Streaming Video from Webcam

Once a streaming server starts running, the webcam live feed is available at
`http://:8080/stream.wmv`

You can use VLC player or MPlayer to access the webcam feed as follows.

``` 
$ vlc http://:8080/stream.wmv
$ mplayer http://:8080/stream.wmv
```

If you are testing the feed from the same host, use loopback address 127.0.0.1 instead.

  [1]: http://www.videolan.org/vlc/index.html
  [2]: https://www.flexihub.com/share-webcam-over-network.html
