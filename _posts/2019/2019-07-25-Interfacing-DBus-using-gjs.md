---
layout:       post
title:        >
    Interfacing DBus using gjs
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1161035
type:         Answer
tags:         gnome gnome-shell ubuntu-gnome dbus javascript
created_date: 2019-07-25 16:45:46
edit_date:    2019-07-25 17:38:24
votes:        "2 "
favorites:    
views:        "764 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-25-Interfacing-DBus-using-gjs.md
toc:          false
navigation:   false
clipboard:    true
---

I've read Gnome is going the route of Java Script (GJS) for much of it's desktop and reducing amount of C++ and Python. So I found this question particularly interesting today.

Here is an [example Java Script][1] and I will be trying it myself. In this example you will learn to create a D-Bus client to connect to a service, you will learn to call methods, connect to signals and get properties from the service. The example uses the D-Bus service that manage the Keyboard Backlight:



{% include copyHeader.html %}
``` java
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

// This the D-Bus interface as XML
const KbdBacklightInterface = '<node>\
<interface name="org.freedesktop.UPower.KbdBacklight"> \
    <method name="SetBrightness"> \
        <arg name="value" type="i" direction="in"/> \
    </method> \
    <method name="GetBrightness"> \
        <arg name="value" type="i" direction="out"/> \
    </method> \
    <method name="GetMaxBrightness"> \
        <arg name="value" type="i" direction="out"/> \
    </method> \
    <signal name="BrightnessChanged"> \
        <arg type="i"/> \
    </signal> \
</interface> \
</node>';

// Declare the proxy class based on the interface
const KbdBacklightProxy = Gio.DBusProxy.makeProxyWrapper(KbdBacklightInterface);

// Get the /org/freedesktop/UPower/KbdBacklight instance from the bus
let kbdProxy = new KbdBacklightProxy(
    Gio.DBus.system,
    "org.freedesktop.UPower",
    "/org/freedesktop/UPower/KbdBacklight"
);

// You can use proxy.<method>Sync syntax to 
// call the D-Bus method in a Sync way
print("The max brightness of your keyboard is " + kbdProxy.GetMaxBrightnessSync());

// Or you can use the syntax proxy.<method>Remote
// to call the method in an Async way
kbdProxy.GetBrightnessRemote(function(currentBrightness) {
    print("The current keyboard brightness is " + currentBrightness);
});

// Connecting to a D-Bus signal
kbdProxy.connectSignal("BrightnessChanged", function(proxy) {
    let newBrightness = proxy.GetBrightnessSync();
    print("The keyboard brightness has been changed, new brightness is " + newBrightness);
});

// Also you can get properties value using this syntax
// let property = proxy.PropertyName;

// Or you can set a property value
// proxy.PropertyName = "new value";

let loop = new GLib.MainLoop(null, false);
loop.run();
```




If not already done, install gjs:

``` bash
sudo apt update && sudo apt install gjs
```

Create a directory for your Java Scripts:

``` bash
mkdir ~/javascript
```

Use `gedit` to create sample script above and save it:

``` bash
gedit ~/javascript/dbusclient.js
```

Now run it:

``` bash
cd ~/javascript
gjs dbusclient.js
```

WIP Errors reported (I'll fix and come back to this Q&A with results):

``` bash
(gjs:10134): Gjs-WARNING **: JS ERROR: Gio.DBusError: GDBus.Error:org.freedesktop.DBus.Error.UnknownMethod: No such interface 'org.freedesktop.UPower.KbdBacklight' on object at path /org/freedesktop/UPower/KbdBacklight
_proxyInvoker@resource:///org/gnome/gjs/modules/overrides/Gio.js:98
_makeProxyMethod/<@resource:///org/gnome/gjs/modules/overrides/Gio.js:124
@dbusclient.js:36

JS_EvaluateScript() failed
```


----------


## No Keyboard lights

Although the laptop has keyboard lights and the wireless keyboard has 3 light settings, Gnome's UPOWER can't see them as these shell commands:

``` bash
$ dbus-send --print-reply \
            --system \
            --dest=org.freedesktop.UPower \
            /org/freedesktop/UPower \
            org.freedesktop.UPower.EnumerateDevices
```

Return this:

``` bash
method return time=1564075040.686545 sender=:1.49 -> destination=:1.145 serial=4392 reply_serial=2
   array [
      object path "/org/freedesktop/UPower/devices/line_power_ACAD"
      object path "/org/freedesktop/UPower/devices/battery_BAT1"
      object path "/org/freedesktop/UPower/devices/ups_hiddev2"
      object path "/org/freedesktop/UPower/devices/mouse_0003o046Do101Ax0017"
      object path "/org/freedesktop/UPower/devices/keyboard_0003o046Do2010x0018"
   ]
```

This could be a handy script to modify for monitoring Laptop Battery charge percentage though.

*(To be continued...)*

  [1]: https://wiki.gnome.org/Gjs/Examples/DBusClient


