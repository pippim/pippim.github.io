---
layout:       post
title:        >
    How to improve/fix choppy audio when streaming with pulseaudio?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1338546
type:         Answer
tags:         networking sound pulseaudio streaming
created_date: 2021-05-15 21:01:00
edit_date:    
votes:        "3 "
favorites:    
views:        "631 "
accepted:     
uploaded:     2022-01-23 11:36:46
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-05-15-How-to-improve^fix-choppy-audio-when-streaming-with-pulseaudio^.md
toc:          true
navigation:   true
clipboard:    false
---

The last section below from: [PulseAudio](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Network/) will interest you the most.


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

## Network Setup

There are several different ways to connect to another PulseAudio server (direct connection, tunnel, RTP) or some other network audio device (RTP, RAOP, Rygel).

Note all methods described here stream raw PCM audio over the network. This can use pretty much network bandwidth (around 1.4 Mb/s for CD-quality sound). If you get choppy sound, try setting a lower sample rate for the network stream. Furthermore, even while many WiFi connections can sustain such bitrates, often the jitter in packet latency makes transmitting low-latency audio over a wireless link infeasible in practice.


----------



<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

## Direct connection

Just set the environment variable $PULSE_SERVER to the host name of the PulseAudio server. Alternatively you can modify ~/.pulse/client.conf or /etc/pulse/client.conf and set default-server. See Server Strings for an explanation of the format. In this FAQ entry all locations you can specify the server to use are listed. All the methods that connect to the daemon over the network using the native protocol need module-native-protocol-tcp loaded. This includes tunnels and Zeroconf setups. With this module loaded, the server listens on port 4713 for incoming client connections.


----------


## Authorization

For authentication you need the same auth cookies on all sides. For that copy ~/.pulse-cookie to all clients that shall be allowed to connect. Alternatively the authorization cookies can be stored in the X11 server. The server must have module-native-protocol-tcp loaded. To enable all audio from all over the network, set the auth-anonymous=1 argument. A more secure options is to manage access to these servers with an IP ACL. This can look like this in your /etc/pulse/default.pa or ~/.pulse/default.pa startup script for PulseAudio:

``` 
load-module module-esound-protocol-tcp auth-anonymous=1
load-module module-native-protocol-tcp auth-ip-acl=127.0.0.1;192.168.0.0/16
```

These two modules are not loaded in the default configuration because they might open PulseAudio for remote attackers.


----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

## X forwarding

If the $PULSE_SERVER variable does not exist or is empty, PulseAudio will then check for X11 properties on the root window. These properties are much like environment variables, but will be available remotely if you SSH to another machine with X11 forwarding. You can see a list of PulseAudio related properties by doing:

``` 
xprop -root | grep PULSE
```

The variables names used are the same as those used in the environment, so PulseAudio will look for a property called PULSE_SERVER. Note that only the X11 properties are forwarded over the SSH tunnel, but the pulseaudio client still connects to the server using its own native protocol.

If connecting back to the pulse daemon running on the computer that has the X display is not desired, you can either set PULSE_SERVER=localhost from the SSH connection (make sure module-native-protocol-tcp is loaded though) or run pax11publish -r before SSHing to the remote computer to remove the properties on the root window.


----------



<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr6" class ="hdr-btn">Skip</a></div>

## Using a tunnel

With a tunnel you can create a new sink that forwards all audio over the network to another server. For the sink at the remote server the tunnel looks like just another stream connecting over the network. The same holds for sources. See the documentation on module-tunnel for details on the module arguments.

Setting up a tunnel requires a running PulseAudio daemon on the remote server with module-native-protocol-tcp loaded, just like with the direct connection. After the tunnel is set up, client applications connect to the tunnel sink on the local PulseAudio daemon. This has the advantage that you can switch the stream seamlessly between a local hardware sink and the tunnel sink. With a direct connection the client generally has to be restarted in order to switch servers. A direct connection has the advantage that the client has more control over buffering parameters.


----------


## mDNS

In order to avoid having to setup tunnel manually between computers on a network, Zeroconf can be used.

Setup module-zeroconf-publish and module-zeroconf-discover manually or use the check box in paprefs.

You can connect to other sound servers running on the LAN by using Zeroconf/Avahi technolgy. Therefore make sure to compile PulseAudio with Avahi support and load the Zeroconf modules on all machines on the LAN. In addition make sure to load the module-native-protocol-tcp and that it allows connections from other hosts, see Authorization above.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr5" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a>  <a href="#hdr7" class ="hdr-btn">Skip</a></div>

# for servers
``` 
load-module module-zeroconf-publish
# for clients```

``` 
load-module module-zeroconf-discover
```

These modules are not loaded in the default configuration because they might open PulseAudio for remote attackers.


----------


## RTP

RTP is the Realtime Transfer Protocol. It is a well-known protocol for transferring audio and video data over IP. Two related protocols are SDP and SAP. SDP is the Session Description Protocol and can be used to describe RTP sessions. SAP is the Session Announcement Protocol and can be used to announce RTP sessions that are described with SDP. (Modern SIP based VoIP phones use RTP/SDP for their sessions, too) All three protocols are defined in IETF RFCs (RFC3550, RFC3551, RFC2327, RFC2327). They can be used in both multicast and unicast fashions. PulseAudio exclusively uses multicast RTP/SDP/SAP containing audio data.

For more information about using these technologies with PulseAudio have a look on the modules documentation.
How can I use PulseAudio to stream music from my main PC to my LAN with multiple PCs with speakers?

On the sender side create an RTP sink:

``` 
load-module module-null-sink sink_name=rtp
load-module module-rtp-send source=rtp.monitor
set-default-sink rtp
```

This will make rtp the default sink, i.e. all applications will write to this virtual RTP device by default. On the client sides just load the receiiver module:

``` 
load-module module-rtp-recv
```

Now you can play your favourite music on the sender side and all clients will output it simultaneously. BTW: You can have more than one sender machine set up like this. The audio data will be mixed on the client side.
How can I use PulseAudio to share a single LINE-IN/MIC jack on the entire LAN?

On the sender side simply load the RTP sender module:

``` 
load-module module-rtp-send
```

On the receiver sides, create an RTP source:

``` 
load-module module-null-sink sink_name=rtp
load-module module-rtp-recv sink=rtp
set-default-source rtp_monitor
```

Now the audio data will be available from the default source rtp_monitor.
How can I use PulseAudio as an RTP based N:N multicast conferencing solution for the LAN?

After loading all the necessary audio drivers for recording and playback, just load the RTP reciever and sender modules with default parameters:

``` 
load-module module-rtp-send
load-module module-rtp-recv
```

As long as the PulseAudio daemon runs, the microphone data will be streamed to the network and the data from other hosts is played back locally. Please note that this may cause quite a lot of traffic. Hence consider passing rate=8000 format=ulaw channels=1 to the sender module to save bandwith while still maintaining good quality for speech transmission.
Can I have more than one multicast RTP group?

Yes! Simply use a new multicast group address. Use the destination/sap_address arguments of the RTP modules to select them. Choose your group addresses from the range 225.0.0.x to make sure the audio data never leaves the LAN.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr6" class ="hdr-btn">ToS</a>  <a href="#hdr2" class ="hdr-btn">ToC</a></div>

