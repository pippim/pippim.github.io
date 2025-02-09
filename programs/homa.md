---
title: Home Automation
layout: program
canonical_url: 'https://www.pippim.com/programs/homa.html'
---

<a id="Introduction"></a>
<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

**HomA** (Home Automation) automatically searches LAN, WiFi and Bluetooth.
It allows you to turn devices on and off from your computer. Devices such as:

- Sony Bravia KDL Televisions / Professional Displays using REST API
- TCL Google Android TVs using ADB (Android Debugging Bridge)
- TP-Link / Kasa WiFi Smart plugs (great for controlling Bias Lights behind TVs)
- Happy Lighting Bluetooth Low Energy (BLE) LED light strips
- Power on/off laptop displays
- Suspend computer and power off all devices above
- When resuming, power on all devices above

## Extra features

- LED Light Strip "breathing colors" varies colors and brightness levels
- Turn Sony TV picture off but leave on sound for listening to music or podcasts
- Disable automatic turning on of TV bias lights during daytime 
- Automatically rediscover new network devices every minute
- Communicate with devices using MAC Address lookup into IP address
- Big number calculator with TeraByte, GigaByte, MegaByte units of measure
- Large digit countdown timer with alarm
- View Bluetooth devices and reset Bluetooth features
- Command timeouts to eliminate wasted time waiting for negative response
- Command event viewer of error messages, return codes and run times
- View Breathing Color Statistics to fine-tune color changes and times
- Floating sub windows that move when main window is moved
- Message dialog boxes stay on top and cannot be "buried" under windows
- Open source application written in Python with Tkinter user interface
- Help buttons open web browser and this webpage. Page navigation
with context-sensitive positioning 

---

<!--  TABLE OF CONTENTS  -->
<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Menus

There are two types of menus in **HomA**:

- Dropdown Menus at the top of the window: *File*, *Edit*, *View* and *Tools*.
- Right-click Popup Menus. Use the mouse right button to click on any network 
device and a popup menu will appear. General menu options for all devices are: 
*Turn On*, *Turn Off*, *Move device Up*&nbsp;(the display order), 
*Move device Down*&nbsp;(the display order) and *Close menu*. Specific Devices 
such as *Sony TV* and *Bluetooth LED* have extra right-click popup menu options.

## Dropdown Menus

The top-left corner of *HomA's* window contains 
four dropdown menus; ***File***, ***Edit***, ***View*** and ***Tools***. 
Click on the name and the dropdown menu options appear:

### *File* Dropdown Menu
{:.no_toc}

Some options will be disabled out when they are not applicable. For example,
the *Save Playlist* and *Close Playlist* options are disabled (greyed
out) until a Playlist is opened.

- ***Rediscover now*** - Rediscovery happens every minute but you can force
immediate rediscovery with this option.
- ***Minimize*** - Duplicates the `Minimize` button at the bottom of the 
window. The **HomA** window is minimized with this option. 
- ***Suspend*** - Duplicates the `Suspend` button at the bottom of the 
window. All devices are powered off and the computer suspends. 
- ***Exit*** - **HomA** shuts down.

### *Edit* Dropdown Menu
{:.no_toc}

- ***Preferences*** - Settings to control **HomA** operation. 

### *View* Dropdown Menu
{:.no_toc}

- ***Sensors*** - Displays CPU and GPU temperature and fan speeds. The 
network devices view is closed. 
- ***Nnetwork devices*** - Displays Network devices and status. The 
sensors view is closed. 
- ***Bluetooth devices*** - Displays all bluetooth devices (including your
neighbours or people walking by your location). Helpful to identify your
Bluetooth LED Light Strips. Provides option to "kill" abandoned gatttool
jobs and/or jobs taking more than 10% of a CPU single core. 
- ***Discovery timings*** - Display how long it takes to communicate with
devices to tweak Preference time-outs.
- ***Discovery errors*** - Display errors communicating with
devices to tweak Preference time-outs.
- ***Breathing stats*** - While Bluetooth LED lights are "breathing colors",
display statistics to help tweak Preference settings.
This option is greyed out (inaccessible) when not breathing colors.


### *Tools* Dropdown Menu
{:.no_toc}

- ***Big Number Calculator*** - 
<a href="#big-number-calculator-sample-video">Indispensable calculator</a>
for large numbers using **MB** (Megabytes), **GB** (Gigabytes), 
**TB** (Terabytes), etc.
- ***Timer 600 seconds*** - Run a timer and display large digit countdown.
Alarm sounds when timer ends. "600 seconds" changed in Preferences.
- ***Forget sudo password*** - If you had entered your sudo password
to control laptop display or reset Bluetooth you can use this option to
"forget" the password. That said, it is automatically encrypted and
reused on the next boot so you don't have to reenter it.

---

## Right-Click Popup Menus

In the Network Devices view, you can move the mouse over a device
and right click for a context-sensitive popup menu.

### Sample Right-Click Popup Menu
{:.no_toc}

When you right-click on a Bluetooth LED Light Strip device a
pop-up menu appears:

{% include image.html src="/assets/img/HomA/Right-click menu Bluetooth LED.png"
   alt="Right-click menu Bluetooth LED"
   style="float: right; width: 90%; margin: .5rem 2rem 1rem 10rem;"
   caption="Right-click menu Bluetooth LED.png"
%}

### Sony Bravia Professional Display TV 
{:.no_toc}

When you click on a Sony Bravia Professional Display TV, 

#### Menu Options:
{:.no_toc}

- ***Picture On*** - If you had turned display off, turn it back on.
- ***Picture Off*** - Turn display off but leave audio active.
- ***Turn On*** - If you had turned TV off, turn it back on.
- ***Turn Off*** - Turn off the TV.
- ***Move Up*** - Move device up the Network Devices view.
- ***Move Down*** - Move device down the Network Devices view.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

### Google Android TV 
{:.no_toc}

When you click on a Google Android TV, 

#### Menu Options:
{:.no_toc}

- ***Turn On*** - If you had turned TV off, turn it back on.
- ***Turn Off*** - Turn off the TV.
- ***Move Up*** - Move device up the Network Devices view.
- ***Move Down*** - Move device down the Network Devices view.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

### Bluetooth LED Light Strip 
{:.no_toc}

When you right-click on a Bluetooth LED Light Strip, 

#### Menu Options:
{:.no_toc}

- ***Set Bluetooth LED color*** - Set color and brightness. Remembers
your last selection.
- ***Nighttime*** - Set nighttime color.
- ***Breathing colors*** - Cycle colors between Red, Red & Green, Green,
Green & Blue, Blue and Blue & Red. Breathe in (make brighter) and Breathe
out (make dimmer) for each color combination.
- ***View Breathing Statistics*** - While Bluetooth LED lights are 
"breathing colors", display statistics to help tweak Preference settings.
This option is greyed out (inaccessible) when not breathing colors.
- ***Reset Bluetooth*** - Use this from time to time if your computer's
bluetooth adapter goes offline.
- ***View Bluetooth Devices*** - Use this to view all Bluetooth devices
in your area. Helpful to find the MAC address of your Bluetooth LED
Light Strip. The MAC address must be entered into Preferences to control
your LED Light Strip.
- ***Turn On*** - Turn on the Bluetooth LED Light Strip.
- ***Turn Off*** - Turn off the Bluetooth LED Light Strip.
- ***Move Up*** - Move device up the Network Devices view.
- ***Move Down*** - Move device down the Network Devices view.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

---

# **HomA** Help Buttons

**HomA** windows contain "Help" buttons that:

- Open a new web browser window
- Open this web page
- Navigate down to the appropriate section on the web page

## Help Button Sample Video
{:.no_toc}

<video src="https://user-images.githubusercontent.com/92641463/264478542-c9d7f483-3774-44b4-9bac-cf5f9b048034.mp4"
data-canonical-src="https://user-images.githubusercontent.com/92641463/264478542-c9d7f483-3774-44b4-9bac-cf5f9b048034.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

### Help Button Sample Video Highlights
{:.no_toc}

- The options for *File*, *Edit* and *View* dropdown menu are shown
- The mouse hovers over button bar at bottom of window 
- Tooltips for buttons appear after a short delay
- Tooltips gradually fade in, remain a short period, then gradually 
fade out
- The *Help* button is clicked and results appear in a new browser window.

---

<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

# Rediscover Now

To *Rediscover Now*, access the Dropdown Menus at the top of the screen. Select:

- "File" menu with mouse or <kbd>Alt</kbd> + <kbd>F</kbd>
- "Rediscover now" with mouse or <kbd>R</kbd>

Rediscovery is automatically run every minute. However you can run it manually
at anytime using this function.

## Sample Rediscover Now Video

<video src="/assets/img/HomA/HomA Rediscover Now.mp4"
data-canonical-src="/assets/img/HomA/HomA Rediscover Now.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

The above video shows how the *Rediscover Now* feature is activated with the mouse.
The network searched by IP address and each matching device in *HomA* is highlighted
in green. The power status is checked and set to:

- "On" if the device is powered on.
- "Off" if the device is powered off but, still connected to the network.
- "?" if communication is lost with the device.

---

<a id="EditPreferences"></a>
<!-- ^ Define Edit Preferences Notebook help button -->
<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Edit Preferences

To edit Preferences, access the Dropdown Menus at the top of the screen. Select:

- "Edit" menu with mouse or <kbd>Alt</kbd> + <kbd>E</kbd>
- "Preferences" with mouse or <kbd>P</kbd>

## Sample Edit Preferences Notebook Video

<video src="/assets/img/HomA/HomA Edit Preferences.mp4"
data-canonical-src="/assets/img/HomA/HomA Edit Preferences.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

The above video walks through all the tabs in the *Edit Preferences* notebook.
The fields in each tab are documented in the sections below.

## Preferences Notebook Tabs

***NOTES:***

> 
> - The *Preferences* Notebook is divided into multiple tabs. Click 
on a specific tab to edit the fields. 
> 
> - Fields are validated based on type. For example, you cannot enter 
the letter "a" into a numeric field.
> 
> - Fields that are greyed out are read-only. You cannot enter data 
into these fields.
> 
> - Wait times like `CURL_TIME` is how long to wait before deciding a
command failed. For example, every network device must be tested to see 
if it is a Sony TV. The REST API response time is very fast. So only 
`0.2` seconds is required to wait. If the network device doesn't reply 
appropriately after `0.2` seconds, **HomA** knows the device isn't a Sony TV. 
If the timeout is longer, HomA takes longer to discover all the network devices.
> 
> - Every Network Device is assigned a unique type code that **HomA** 
uses internally. "10"&nbsp;=&nbsp;TP-Link/Kasa Smart Plug, 
"20"&nbsp;=&nbsp;Sony TV, "30"&nbsp;=&nbsp;TCL / Google Android TV. 
"40"&nbsp;=&nbsp;Bluetooth Low Energy (BLE) LED Light Strip. 
"100"&nbsp;=&nbsp;Desktop Computer. "110"&nbsp;=&nbsp;Laptop base. 
"120"&nbsp;=&nbsp;Laptop Display. 

<a id="EditPreferencesSony_TV"></a>
<!-- ^ Define Edit Preferences Notebook Sony TV Tab help button -->
### Preferences Notebook *Sony TV* tab:
{:.no_toc}

| Sony TV          | Description                                                   |
|------------------|---------------------------------------------------------------|
| SONY_PWD         | Sony TV REST API Password. Default "123".                     |
| CURL_TIME        | How long to wait for `curl` command to finish. Default "0.2". |
| KDL_TV           | HomA internal type code for Sony TV. Static value is "20".    |

<a id="EditPreferencesGoogle_TV"></a>
### Preferences Notebook *Google TV* tab:
{:.no_toc}

| Goggle TV        | Description                                                   |
|------------------|---------------------------------------------------------------|
| ADB_CON_TIME     | ADB connection time. Default "0.3".                           |
| ADB_PWR_TIME     | ADB power on / power off time. Default "2.0".                 |
| ADB_KEY_TIME     | ADB remote control keycode wait time. Default "5.0".          |
| ADB_MAGIC_TIME   | Wake-on-lan command wait time. Default is "0.2".              |
| TCL_TV           | TCL / Google Android TV type code. Static value is "30".      |

<a id="EditPreferencesSmart_Plug"></a>
### Preferences Notebook *Smart Plug* tab:
{:.no_toc}

| Smart Plug       | Description                                                |
|------------------|------------------------------------------------------------|
| PLUG_TIME        | TP-Link/Kasa Smart Plug wait time. Default is "2.0"        |
| HS1_SP           | Smart Plug type code. Static value is "10"                 |

<a id="EditPreferencesLED_Lights"></a>
### Preferences Notebook *LED Lights* tab:
{:.no_toc}

| LED Lights          | Description                                                    |
|---------------------|----------------------------------------------------------------|
| LED_LIGHTS_MAC      | MAC Address of Bluetooth LED Light Strip. Must be entered.     |
| LED_LIGHTS_STARTUP  | On HomA startup Lights are turned on ("1") or off ("0").       |
| LED_LIGHTS_COLOR    | Last used color when "Set Bluetooth LED Color" was applied.    |
| BLUETOOTH_SCAN_TIME | How many seconds to scan for Bluetooth devices.                |
| BLE_LS              | Bluetooth Low Energy LED Light Strip type code value is "40"   |

<a id="EditPreferencesMiscellaneous"></a>
### Preferences Notebook *Miscellaneous* tab:
{:.no_toc}

| Miscellaneous  | Description                                                        |
|----------------|--------------------------------------------------------------------|
| TIMER_SEC      | Seconds to run "Tools", "Timer". Default "600" (ten minutes).      |
| TIMER_ALARM    | `.wav` filename to play when timer ends. Default "Alarm_01.wav".   |
| SENSOR_CHECK   | How often the `sensors` command is run. Defaults to 1 second.      |
| SENSOR_LOG     | How often to log sensor values. Default "3600" every hour.         |
| FAN_GRANULAR   | Log sensor override when fan speed changes > x. Default "200" RPM. |

<a id="EditPreferencesRefresh"></a>
### Preferences Notebook *Refresh* tab:
{:.no_toc}

| Refresh              | Description                                                          |
|----------------------|----------------------------------------------------------------------|
| CONFIG_FNAME         | Configuration filename. Static value is "config.json"                |
| DEVICES_FNAME        | Previously discovered network devices. Static value "devices.json".  |
| VIEW_ORDER_FNAME     | Saved order network devices are display in. Value "view_order.json". |
| REFRESH_MS           | How many milliseconds screen is refreshed. Default "16" ms.          |
| REDISCOVERY_SECONDS  | How often new network devices are checked. Default "60" seconds.     |
| RESUME_TEST_SECONDS  | How many "disappearing" seconds represent suspend. Default "30".     |
| RESUME_DELAY_RESTART | How many seconds after resume for network on-line. Default "5".      |

<a id="EditPreferencesComputer"></a>
### Preferences Notebook *Computer* tab:
{:.no_toc}

| Computer            | Description                                                        |
|---------------------|--------------------------------------------------------------------|
| DESKTOP             | Desktop computer (anything not a laptop) type code is "100".       |
| LAPTOP_B            | Laptop Base ("brains") CPU, GPU, Fans, USB, etc. Type code "110".  |
| LAPTOP_D            | Laptop Display type code. Static value is "120".                   |
| BACKLIGHT_NAME      | Automatically obtained from `/sys/class/backlight`.                |
| BACKLIGHT_ON        | Value for laptop display backlight on. Default is "0".             |
| BACKLIGHT_OFF       | Value for laptop display backlight off. Default is "4".            |
| POWER_OFF_CMD_LIST  | Command and arguments to suspend. Default `systemctl suspend`.     |
| POWER_OFF_EXCL_LIST | Devices HomA doesn't need to power on/off during resume/suspend.   |

The `POWER_OFF_EXCL_LIST` field contains three type codes for devices that do not need
to be powered off. These devices are powered down automatically during system suspend:

- `100` for Desktop computer
- `110` for Laptop base
- `120` for Laptop display

---

<a id="ViewBreathingStats"></a>
<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>


# View Bluetooth LED Breathing Colors Statistics

The ***View Breathing Statistics*** window displays in realtime the color
values (Red, Green and Blue) communicated to the LED Light Strips via
the computer's Bluetooth adapter.

## Sample Breathing Statistics Video
{:.no_toc}

<video src="/assets/img/HomA/HomA Breathing stats.mp4"
data-canonical-src="/assets/img/HomA/HomA Breathing stats.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

***NOTE:*** After clicking play, move the mouse off the video
in order to see the color changing button bar at the bottom of the video.

---

### View Breathing Statistics Window Fields
{:.no_toc}

| Window Field           | Description                                                                                                                                                                               |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Dimmest value          | Lowest LED value used is 4. Range is 0 to 255.                                                                                                                                            |
| Brightest value        | Highest LED value used is 30. Range is 0 to 255.                                                                                                                                          |
| Dimmest hold seconds   | Number of seconds to hold dimmest value used is 1.5 seconds.                                                                                                                              |
| Brightest hold seconds | Number of seconds to hold brightest value used is 0.5 seconds.                                                                                                                            |
| Breathe duration       | How much time is spent moving from dimmest to brightest.                                                                                                                                  |
| Step duration          | How much time is spent on each color change. Value 0.275.                                                                                                                                 |
| Step count             | Calculated by Breathe duration (6.0) / Step duration (0.275)                                                                                                                              |
| Step value             | Calculated by Breathe duration (6.0) / Step count (21)                                                                                                                                    |
| Red                    | Current red value of LED. 0 = Off.                                                                                                                                                        |
| Green                  | Current green value of LED. 0 = Off.                                                                                                                                                      |
| Blue                   | Current blue value of LED. 0 = Off.                                                                                                                                                       |
| Sunlight Percentage    | Range 0% (nighttime) to 100% (full sunlight). Controlled by<br>GNOME Nightlight or Pippim Eyesome. Percentage boosts the<br>the dimmest and brightest values but not the number of steps. |
| Set LED Color          | Time spent setting LED colors.                                                                                                                                                            |
| Set LED Sleep          | After setting LED color, how much time sleeping before next.                                                                                                                              |
| Regular Refresh        | This refresh allows screen updating and mouse input.                                                                                                                                      |
| Fast Refresh           | This refresh appears to "freeze" HomA but keeps CPU use low.                                                                                                                              |
| LED Failures           | How many times Bluetooth lost communication for 1 second.                                                                                                                                 |
| MAX_FAIL               | How many sequential LED failures until Breathing quits.                                                                                                                                   |

<br><br><!-- Next line sucked into table -->

---

The first five fields are parameters you can control:

| Field                  | Internal argument name                                         |
|------------------------|----------------------------------------------------------------|
| Dimmest value          | `low` value is 4. If too low light will be off.                |
| Brightest value        | `high` value is 30. Max is 255 but is way to bright.           |
| Dimmest hold seconds   | `bots` value is 1.5. Abbreviation is for "bottom seconds".     |
| Brightest hold seconds | `tops` value is 0.5. Abbreviation is for "top seconds".        |
| Breathe duration       | `span` value is 6.0. Longer span allows gradual color change.  |
| Step duration          | `step` value is 0.275. Longer step allows regular refresh.     |

<br><br><!-- Next line sucked into table -->

```python
# homa.py - BluetoothLedLightStrip(DeviceCommonSelf) class - breathColors() method:

def breatheColors(self, low=4, high=30, span=6.0, step=0.275, bots=1.5, tops=0.5):
```

---

<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

# Installation

Installing **HomA** (`homa.py` and `homa-indicator.py`) requires extra steps
to install other programs that **HomA** calls.

**HomA** (Home Automation) is written in Python.
The main program is called `homa.py` and can be found in the 
[HomA GitHub Repository ⧉ 🔗](https://github.com/pippim/HomA/blob/main/src/homa.py 
"View HomA Python source code"){:target="_blank"}. 

Copy all the files (including the subdirectories) 
in the GitHub `src` folder to a new directory on your computer. 
For example, `<HOME>/HomA` for Linux, Mac, Chrome OS or 
Windows Subsystem for Linux (WSL). Unless you are running Ubuntu 16.04
LTS under Extended Security Maintenance (ESM), you may have to make
changes to `homa.py` and the programs it calls. 

For Windows, the installation directory would be `<HOME>\HomA`.
As of {{ site.refreshed | date: "%B %e, %Y" }}
**HomA** will not run under Windows without modification. It may
work in Windows Subsystem for Linux with little or no modification.

`homa.py` is called by `homa-indicator.py` from the systray / taskbar 
/ application indicator bar. It is recommended you start using **HomA**
from the command line initially, to see any error messages that might
appear. For example, an error message may appear for missing dependency.

`homa-indicator.py` allows access 
to **HomA** from the taskbar of any monitor.

`homa-indicator.py` and `homa.py` do not need to be in your path.
You can call them from the command line using `/path/to/homa-indicator.py` 
or `/path/to/homa.py` respectively. If you followed the installation tip 
above, you would type: `<HOME>/HomA/homa-indicator.py` for Linux-like machines, 
or `<HOME>\HomA\homa-indicator.py` for Windows.

## Under Construction
{:.no_toc}

{% include image.html src="/assets/img/tim-ta/Tim-ta Under Construction.png"
   alt="Under Construction.png"
   style="float: right; width: 50%; margin: .5rem 2rem 1rem 2rem;"
   caption="Under Construction.png"
%}

**HomA** is still under construction. Installation requires
manually downloading files from GitHub and installing any
missing dependencies with `apt get install` in Debian/Ubuntu
or `pip install` on other Operating Systems.

Requirements include:

- ***Linux*** or compatible Apple, Google Chrome OS, WSL
- ***Bluez tools*** (kernel version not GNOME desktop version) which
provides `hcitool`, `hciconfig` and `gatt` commands.
- `trionesControl` (already included in HomA subdirectory)
- `gatttool` (already included in HomA subdirectory)
- `ttkwidgets` (already included in HomA subdirectory)
- `adb` (Android Debugging Bridge for Google TV on Ethernet or WiFi)
- `wakeonlan` — Wakeup Google TV over Ethernet
- `curl` (internet downloading tool required for Sony REST API 
over Ethernet or WiFi)
- `xdotool` (required for moving windows)
- `arp` (Address Resolution Protocol tool) should be on all machines
- `getent` — to access `/etc/hosts` (network device name, alias, 
IP address and optional MAC address)
- `ip` command to get address names for Ethernet and WiFi
- `xrandr` — X11 windowing system
- `hostnamectl` — Get the system hostname
- `gsettings` — to test if GNOME Night Light is being used
- `sensors` — to display Dell CPU and GPU temperature and fan speeds
- `nmap` Network mapping tool
- `hs100.sh` TP-Link / Kasa WiFi Smart Plug controller (already 
included in HomA subdirectory)
- `nc` — arbitrary TCP and UDP connections and listens
- `rfkill` — tool for enabling and disabling wireless devices
- `ifconfig` and `iwconfig` internet configuration tools
- Miscellaneous builtin Linux commands — `od`, `base64`, `shasum`, `ls`, 
`grep`, `sort`, `uniq`, `ps`, `aplay` (may not be builtin), `ps` and `cut`
- A web browser like Firefox, Chrome or Edge is required for Help buttons
- `systemctl` or similar method to suspend the computer

For expanded sunrise/sunset brightness control you can use *Pippim Eyesome*.

> ***IMPORTANT NOTES:*** 
> 
> - **HomA** was primarily tested with Linux, specifically 
Ubuntu 16.04 LTS ECM/Plus and Python 2.7.12.
> 
> - You *"should"* be able to toggle between Pyhon 2.7.x and 
Python 3.x by changing the *"shebang"* at the top of each `.py`. 
Currently, **HomA** *"should"* run with the default Python version. 
Testing on Python 3.x will begin prior to next major **HomA** upgrade.
> 
> - Current plans are to upgrade to Ubuntu 24.04 LTS and Python 3.12 
in year 2025. A "lite" Ubuntu 16.04 version running Unity may be 
created as some sort of virtual machine. It's already been announced 
that Ubuntu 24.04 (via Debian) will not ship with Python 2.7 anymore.


---

<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

---

<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

---

<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr14">Skip</a></div>

---

<a id="hdr14"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr13">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr15">Skip</a></div>

---

<a id="hdr15"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr14">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr16">Skip</a></div>

---

<a id="hdr16"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr15">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr17">Skip</a></div>

---

<a id="hdr17"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr16">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr18">Skip</a></div>

---

<a id="hdr18"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr17">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr19">Skip</a></div>

---

<a id="hdr19"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr18">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr20">Skip</a></div>

---


<!-- Foot section doesn't have "skip" button -->
<a id="hdr20"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr19">ToS</a>  <a href="#hdr2">ToC</a></div>
