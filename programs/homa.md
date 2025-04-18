---
title: HomA - Home Automation
layout: program
canonical_url: 'https://www.pippim.com/programs/homa.html'
---

<a id="Introduction"></a>
<!-- Define hdr1 id with ToC and Skip navigation buttons (No "Top" or "ToS" buttons -->
<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

# Introduction

**HomA** (**Hom**e **A**utomation) automatically searches LAN, WiFi and Bluetooth.
It allows you to control the following devices from your computer:

- Sony Bravia KDL Televisions / Professional Displays using REST API
- TCL Google Android TVs using ADB (Android Debugging Bridge)
- TP-Link / Kasa WiFi Smart plugs (great for controlling Bias Lights behind TVs)
- Happy Lighting Bluetooth Low Energy (BLE) LED light strips
- Individually turn on/off above devices plus laptop display
- Suspend computer and automatically power off all devices above
- When resuming, automatically power on all devices above

## Extra features

- Open source application written in Python with Tkinter GUI
- Single *HomA* version works in both Python 2.7.12+ and Python 3.5+
- LED Light Strip "breathing colors" feature varies colors and brightness levels
- View Breathing Color Statistics to fine-tune color changes and times
- Turn Sony TV picture off but leave on sound for listening to music or podcasts
- When Sony Remote Control changes volume, it is reflected on the active 
monitor. Helpful if Sony TV picture (a.k.a Panel or Display) is turned off
- Sony TV Remote Control powers off all and suspends system
- Automatically turn on TV bias lights only during nighttime
- Automatically rediscover new network devices every x seconds
- Communicate with devices using static MAC address to find dynamic IP address
- Big number calculator with TeraByte, GigaByte, MegaByte units of measure
- Large digit countdown timer with alarm
- View Bluetooth devices and reset Bluetooth features
- Command timeouts to eliminate wasted time waiting for negative response
- Command event viewer of error messages, return codes and run times
- Floating sub windows that raise to top and move when main window is dragged
- Message dialog boxes stay on top and cannot be "buried" under windows
- Fading in/out tooltips appear when mouse hovers over buttons and labels
- Help buttons open web browser and this webpage. Then the page automatically
scrolls to the appropriate section

---

<!--  TABLE OF CONTENTS  -->
<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>
{% include toc.md %}

---

<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

# Menus

There are two types of menus in **HomA**:

- Dropdown Menus at the top of the window: *File*, *Edit*, *View* and *Tools*.
- Right-click Popup Menus. Use the mouse right button to click on any network
device and a popup menu will appear. General menu options for all devices are:
*Turn On*, *Turn Off*, *Move device Up*&nbsp;(the display order),
*Move device Down*&nbsp;(the display order) and *Close menu*. Some devices
such as a *Sony TV* and a *Bluetooth LED* have extra right-click popup menu options.

## Dropdown Menus

The top-left corner of *HomA's* main window contains
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
window. The **HomA** window is minimized with this option. `xdotool` and
`wmctrl` must be installed to enable this option.
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

- ***Big Number Calculator*** - Calculator with units of measure
for large numbers using **MB** (Megabytes), **GB** (Gigabytes),
**TB** (Terabytes), etc.
- ***Timer 600 seconds*** - Run a timer and display large digit countdown.
Alarm sounds when timer ends. "600 seconds" changed in Preferences.
- ***Forget sudo password*** - If you had entered your sudo password
to control laptop display or reset Bluetooth you can use this option to
"forget" the password. That said, it is automatically encrypted and
reused on the next **HomA** restart so you don't have to reenter it.

---

<a id="HelpRightClickMenu"></a>
<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

## Right-Click Popup Menus

In the Network Devices view, you can move the mouse over a device
and right click for a context-sensitive popup menu.

All devices have these menu options:

- *Turn On* - turn on the device
- *Turn Off* - turn off the device
- *Move device Up* - move the device up in the display order
- *Move device Down* - Move the device down the display order
- *Forget device* - Remove device from display
- *Help* - Open a new browser window and navigate to appropriate section in this webpage
- *Close menu* - Close the popup menu. The same result achieved
by moving mouse out of the menu and left-clicking.

Some devices such as a *Sony TV* and a *Bluetooth LED* have extra
right-click popup menu options.

### Sample Right-Click Popup Menu
{:.no_toc}

Here is a sample screenshot of right-clicking on a Bluetooth LED Light Strip:

{% include image.html src="/assets/img/HomA/Right-click menu Bluetooth LED.png"
   alt="Right-click menu Bluetooth LED"
   style="float: right; width: 90%; margin: .5rem 2rem 1rem 10rem;"
   caption="Right-click menu Bluetooth LED.png"
%}

<a id="HelpRightClickBluetooth"></a>
### Bluetooth LED Light Strip
{:.no_toc}

When you right-click on a Bluetooth LED Light Strip,
the following menu options appear:

- ***Set Bluetooth LED color*** - Set color and brightness. Remembers
your last selection.
- ***Nighttime brightness*** - Set LED light strip for nighttime brightness.
- ***Breathing colors*** - Cycle colors between Red, Red + Green, Green,
Green + Blue, Blue and Blue + Red. Breathe in (make brighter) and Breathe
out (make dimmer) for each color combination.
- ***View Breathing Statistics*** - Whilst Bluetooth LED lights are
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
- ***Move Up*** - Move device up in the display order.
- ***Move Down*** - Move device down the display order.
- ***Forget*** - Remove device from display.
- ***Help*** - Open new browser window and navigate to this webpage.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

<a id="HelpRightClickSonyTV"></a>
### Sony Bravia Professional Display TV
{:.no_toc}

When you right-click on a Sony Bravia Professional Display TV,
the following menu options appear:

- ***Picture On*** - If you had turned the display off, turn it back on.
- ***Picture Off*** - Turn the display off but leave audio active.
- ***Turn On*** - If you had turned the TV off, turn it back on.
- ***Turn Off*** - Turn off the TV.
- ***Move Up*** - Move device up in the display order.
- ***Move Down*** - Move device down the display order.
- ***Forget*** - Remove device from display.
- ***Help*** - Open new browser window and navigate to this webpage.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

<a id="HelpRightClickGoogleTV"></a>
### Google Android TV
{:.no_toc}

When you right-click on a Google Android TV,
the following menu options appear:

- ***Turn On*** - If you had turned the TV off, turn it back on.
- ***Turn Off*** - Turn off the TV.
- ***Move Up*** - Move device up in the display order.
- ***Move Down*** - Move device down the display order.
- ***Forget*** - Remove device from display.
- ***Help*** - Open new browser window and navigate to this webpage.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

<a id="HelpRightClickLaptopDisplay"></a>
### Laptop Display
{:.no_toc}

When you right-click on a Laptop Display,
the following menu options appear:

- ***Turn On*** - If you had turned the display off, turn it back on.
- ***Turn Off*** - Turn off the display. Requires sudo password.
- ***Move Up*** - Move device up in the display order.
- ***Move Down*** - Move device down the display order.
- ***Forget*** - Remove device from display.
- ***Help*** - Open new browser window and navigate to this webpage.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

<a id="HelpRightClickComputer"></a>
### Laptop Base or Computer
{:.no_toc}

When you right-click on a Laptop Base or your computer,
the following menu options appear:

- ***Turn On*** - This option is greyed out because your computer is on.
- ***Turn Off*** - Turn off the the computer. This invokes a suspend.
- ***Move Up*** - Move device up in the display order.
- ***Move Down*** - Move device down the display order.
- ***Forget*** - Remove device from display.
- ***Help*** - Open new browser window and navigate to this webpage.
- ***Close menu*** - Closes the menu. You can also close the menu by
clicking anywhere outside the menu area.

---

<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# **HomA** Help Buttons

**HomA** windows contain "Help" buttons that:

- Open a new web browser window
- Open this web page
- Navigate down to the appropriate section on the web page

## Help Button Sample Video
{:.no_toc}


<video src="/assets/img/HomA/HomA View Breathing Stats Help Button.mp4"
data-canonical-src="/assets/img/HomA/HomA View Breathing Stats Help Button.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>


### Help Button Sample Video Highlights
{:.no_toc}

- The main window is dragged and the *View Breathing Statistics* child window
is dragged along with it. The child window forces itself overtop of the parent.
- The mouse hovers over button bar at bottom of child window.
- Button Tooltips appear after a short delay.
- Tooltips gradually fade in, remain a short period, then gradually fade out.
- The *Help* button is clicked and this webpage appears in a new browser window.
- The video above is played.
- The webpage is scrolled.
- The "Copy" button is used to copy source code to the system clipboard.
- Lightning bolt - "jumps" to different sections.
- Section heading jump buttons are selected.
- The child window is closed and the main window is fully visible.

---

<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

# Rediscover Now

*Rediscover Now* is accessed from the Dropdown Menus at the top of the screen. Select:

- "File" menu with mouse or <kbd>Alt</kbd> + <kbd>F</kbd>
- "Rediscover now" with mouse or <kbd>R</kbd>

Rediscovery is automatically run every minute. However, you can run it immediately
using *Rediscover Now*.

If you use your TV remote to turn the TV on or off, **HomA** will not register
the fact for a minute. To force **HomA** to see the power state change, run
*Rediscover Now*.

If you connect a new device to your network, **HomA** will not register it
for a minute. To force **HomA** to see the new device immediately, run
*Rediscover Now*.

<a id="HelpNetworkDevices"></a>
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
- "?" if communication is lost with the device. E.G. TV is unplugged from the LAN.


---

## How Network Devices are discovered

Most Network Devices are discovered using the commands `arp`, `getent`,
`ip` and `hostnamectl`. The exception is a Bluetooth device
where you need to tell **HomA** what 
the MAC address is. Another exception is your computer which is already
running **HomA** in the first place.

---

### `arp` Capabilities

If you type `arp -a` at the command line your network devices are displayed.
For example:

```shell
$ arp -a

SONY.Light     (192.168.0.15) at 50:d4:f7:eb:41:35 [ether] on enp59s0
Hitronhub.home (192.168.0.1)  at a8:4e:3f:82:98:b2 [ether] on enp59s0
SONY.LAN       (192.168.0.19) at ac:9b:0a:df:3f:d9 [ether] on enp59s0
TCL.LAN        (192.168.0.17) at c0:79:82:41:2f:1f [ether] on enp59s0
F3_Pro         (192.168.0.22) at 00:fe:1e:2a:5b:eb [ether] on enp59s0
TCL.Light      (192.168.0.20) at 50:d4:f7:eb:46:7c [ether] on enp59s0
```

***NOTE:***&nbsp;&nbsp;Lines above have spaces inserted between
fields for column alignment.

The fields on each `arp` line (in order of appearance) are:

- Hostname, E.G. `SONY.Light`
- IP Address, E.G. `192.168.0.15`
- MAC Address, E.G. `50:d4:f7:eb:41:35`
- Computer's Network Adapter name, E.G. `enp59s0` (Ethernet Adapter).
Note that hostname `Sony.Light` itself is a TP-Link Smart Plug on Wifi.

---

### `getent` Capabilities

The program `getent` is a Linux command that reads configuration files.
When you type `getent hosts` at the command line it reads the configuration
file `/etc/hosts`. It will display something like this:

```shell
127.0.0.1       localhost
127.0.1.1       Alien
192.168.0.1     Hitronhub.home Admin                          a8:4e:3f:82:98:b2
192.168.0.10    Alien          AW 17R3 WiFi                   9c:b6:d0:10:37:f7
192.168.0.11    Alien-Light    hs100 AW 17R3 work light       f0:09:0d:bc:ef:d6
192.168.0.12    Alien          AW 17R3 Ethernet               28:f1:0e:2a:1a:ed
192.168.0.13    Dell           Inspiron 17R-SE-7720 Ethernet  5c:f9:dd:5c:9c:53
192.168.0.14    Dell           Inspiron 17R-SE-7720 WiFi      60:6c:66:86:de:bd
192.168.0.15    SONY.Light     hs100 Sony TV Bias Light       50:d4:f7:eb:41:35
192.168.0.16    SONY.WiFi      Sony Bravia KDL TV WiFi        18:4f:32:8d:aa:97
192.168.0.17    TCL.LAN        TCL / Google TV Ethernet       c0:79:82:41:2f:1f
192.168.0.18    TCL.WiFi       TCL / Google TV WiFi           fc:d4:36:ea:82:36
192.168.0.19    SONY.LAN       Sony Bravia KDL TV Ethernet    ac:9b:0a:df:3f:d9
192.168.0.20    TCL.Light      hs100 TCL TV Bias Light        50:d4:f7:eb:46:7c
192.168.0.21    TCL.LAN2       amazon-54d22a1a9.hitronhub     98:28:a6:ba:76:f6
192.168.0.22    F3_Pro         Umidigi F3 Pro 5G              46:f0:89:36:f5:1d
192.168.0.254   Router.Login   Hitron Technology              00:05:ca:00:00:09
```

***NOTE:*** extra spacing inserted above for readability.

The fields on each `arp` line (in order of appearance) are:

- IP Address, E.G. "192.168.0.15"
- Host name, E.G. "SONY.light"
- Alias, E.G. "hs100 Sony TV Bias Light"
- MAC Address, E.G. "50:d4:f7:eb:41:35"

The ***MAC Address*** is not in the typical `/etc/hosts` file. It is required
for you to add it in order to allow *HomA* to link rows to `arp` output
and override dynamic IP addresses.


---

### `ip` Capabilities

The program `ip` will show / manipulate routing, devices,
policy routing and tunnels. When
you type `ip a show dynamic` at the command line you will see
something like this:

```shell
2: enp59s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 28:f1:0e:2a:1a:ed brd ff:ff:ff:ff:ff:ff
    inet 192.168.0.12/24 brd 192.168.0.255 scope global dynamic enp59s0
       valid_lft 590289sec preferred_lft 590289sec
3: wlp60s0: <BROADCAST,MULTICAST> mtu 1500 qdisc mq state DOWN group default qlen 1000
    link/ether 9c:b6:d0:10:37:f7 brd ff:ff:ff:ff:ff:ff
```

*HomA* looks at relevant lines in `ip addr`:

- "enp59s0:" - The Ethernet Adapter name
- "link/ether 28:f1:0e:2a:1a:ed" - The Ethernet Adapter's MAC Address
- "inet 192.168.0.12/24" - The Ethernet Adapter's IP Address
- "wlp60s0:" - The WiFi Adapter name
- "link/ether 9c:b6:d0:10:37:f7" - The WiFi Adapter's MAC Address

---

### `hostnamectl` Capabilities

When you type `hostnamectl status` at the command line you will see
something like this:

```shell
   Static hostname: alien
   Pretty hostname: Dell AW17R3
         Icon name: computer-laptop
           Chassis: laptop
        Machine ID: 1ff17e6df1874fb3b2a75e669fa978f1
           Boot ID: 562af12a56c640faa3e74c465277267d
  Operating System: Ubuntu 16.04.7 LTS
            Kernel: Linux 4.14.216-0414216-generic
      Architecture: x86-64
```

*HomA* only looks at one line in `hostnamectl status`:

- "Chassis:" - E.G. "laptop". Laptops and computers offer different options in *HomA*

---

<a id="EditPreferences"></a>
<!-- ^ Define Edit Preferences Notebook help button -->
<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

# Edit Preferences

To edit Preferences, access the Dropdown Menus at the top of the screen. Select:

- "Edit" menu with mouse or <kbd>Alt</kbd> + <kbd>E</kbd>
- "Preferences" with mouse or <kbd>P</kbd>

## Sample Edit Preferences Notebook Video

<video src="/assets/img/HomA/HomA Edit Preferences Video.mp4"
data-canonical-src="/assets/img/HomA/HomA Edit Preferences Video.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

The above video walks through all the tabs in the *Edit Preferences* notebook.
The fields in each tab are documented in the sections below.

Bonus footage shows how the Sensors and Devices views are toggled with the
button at the bottom of the window:
<br><br>
![Sensors](/assets/img/HomA/flame.png){:
style="float: left; margin: 0 2rem 0 0;" width="10%" }
<font size="6">Sensors</font><br clear="left"/>
<br><br>
![Devices](/assets/img/HomA/wifi.png){:
style="float: left; margin: 0 2rem 0 0;" width="10%" }
<font size="6">Devices</font><br clear="left"/>


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
> - Every Network Device is assigned a type code that **HomA**
uses internally. "10"&nbsp;=&nbsp;TP-Link/Kasa Smart Plug,
"20"&nbsp;=&nbsp;Sony TV, "30"&nbsp;=&nbsp;TCL / Google Android TV.
"40"&nbsp;=&nbsp;Bluetooth Low Energy (BLE) LED Light Strip.
"100"&nbsp;=&nbsp;Desktop Computer. "110"&nbsp;=&nbsp;Laptop base.
"120"&nbsp;=&nbsp;Laptop Display.

---

<a id="EditPreferencesSony_TV"></a>
<!-- ^ Define Edit Preferences Notebook Sony TV Tab help button -->
### Preferences Notebook *Sony TV* tab:
{:.no_toc}

| Sony TV          | Description                                                   |
|------------------|---------------------------------------------------------------|
| SONY_PWD         | Sony TV REST API Password. Default "123".                     |
| CURL_TIME        | How long to wait for `curl` command to finish. Default "0.2". |
| KDL_TV           | HomA internal type code for Sony TV. Static value is "20".    |

---

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

---

<a id="EditPreferencesSmart_Plug"></a>
### Preferences Notebook *Smart Plug* tab:
{:.no_toc}

| Smart Plug       | Description                                                |
|------------------|------------------------------------------------------------|
| PLUG_TIME        | TP-Link/Kasa Smart Plug wait time. Default is "2.0"        |
| HS1_SP           | Smart Plug type code. Static value is "10"                 |

---

<a id="EditPreferencesLED_Lights"></a>
### Preferences Notebook *LED Lights* tab:
{:.no_toc}

| LED Lights          | Description                                                                                                                     |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------|
| LED_LIGHTS_MAC      | MAC Address of Bluetooth LED Light Strip. Must be entered.<br>Use *View Bluetooth Devices* to see MAC addresses.                |
| LED_LIGHTS_STARTUP  | On HomA startup, lights are turned on ("1") or off ("0").                                                                       |
| LED_LIGHTS_COLOR    | Last used color when *Set Bluetooth LED Color* was applied.                                                                     |
| LED_RED+GREEN_ADJ   | When Red and Green are mixed together, boost red by 50%.<br>Necessary for Happy Lighting showing light green instead of yellow. |
| BLUETOOTH_SCAN_TIME | How many seconds to scan for Bluetooth devices.<br>Longer scan time may reveal more devices.                                    |
| BLE_LS              | Bluetooth Low Energy LED Light Strip type code value is "40".<br>Value used internally by *HomA* and cannot be changed.         |

---

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

---

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

---

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
<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>


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

<br><!-- Next line sucked into table -->

---

### Breathing Statistics Control Parameters
{:.no_toc}

The first six screen fields are program parameters you can change:

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

<a id="ViewBluetoothDevices"></a>
<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

# View Bluetooth Devices

In order to control Bluetooth Low Energy (BLE) LED Light Strips, you need to
enter the MAC address using *Edit Preferences*. In order to discover the MAC
address use the *View Bluetooth Devices* feature found on the *View* dropdown
menu.

---

## Sample View Bluetooth Devices Window

Here is a sample window that appears when you run the *View Bluetooth Devices*
feature:

{% include image.html src="/assets/img/HomA/HomA - View Bluetooth Devices.png"
   alt="HomA - View Bluetooth Devices"
   style="float: left; width: 75%; margin: .5rem 2rem 1rem 10rem;"
   caption="HomA - View Bluetooth Devices.png"
%}

The device name `QHM-T095` is highlighted in yellow and the MAC address
is highlighted in red. For devices to appear in the window, they MUST BE
powered on.

The highlighting appears after **HomA** knows the MAC address for your
Bluetooth LED Light Strip. If the MAC address hasn't been entered into
**HomA**, via the *Edit Preferences* feature, there is NO highlighting.

After the device name, E.G. `QHM-T095`, appears the number of times the
device was discovered. E.G. `(4)` means the device was discovered 4 times.

The discovery period defaults to 10 seconds. Over that period, a given
device can be discovered many times.

Do not be surprised if there are many device names you don't recognize.
These devices belong to your neighbor(s) or passerby's. For example,
someone passing by could have Bluetooth Earbuds or a Bluetooth Smartwatch.

---

## Use Happy Lighting to Discover LED Device Name

The smartphone Happy Lighting App can display the Bluetooth LED
Light Strip device name:

{% include image.html src="/assets/img/HomA/HomA Happy Lighting Device.png"
   alt="HomA Happy Lighting Device"
   style="float: left; width: 50%; margin: .5rem 2rem 1rem 10rem;"
   caption="HomA Happy Lighting Device.png"
%}

The *Happy Lighting* smartphone app works with many common Bluetooth
Smart LED Light Strips.

For the App to work, **HomA** cannot be running and connected to the
LED Light Strip using Bluetooth.

In the App, selected the icon with three green horizontal lines. Then
click "My Device".

In this screenshot, the device name is `QHM-T095`.

After running the *Happy Lighting* App, exit it so it doesn't conflict
with **HomA** operations.

---

## Enter Bluetooth LED MAC Address in **HomA**

You need to enter the discovered Bluetooth LED MAC address into **HomA** using
the *Edit Preferences* feature:

{% include image.html src="/assets/img/HomA/HomA Enter Bluetooth LED MAC Address.png"
   alt="HomA Enter Bluetooth LED MAC Address"
   style="float: right; width: 90%; margin: .5rem 2rem 1rem 10rem;"
   caption="HomA Enter Bluetooth LED MAC Address.png"
%}

After entering the MAC address you can select the *File* dropdown menu
option *Rediscover Now*. The Bluetooth LED Light Strips should be added
to the bottom of the Network Devices view. If not, restart **HomA**.

---

<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

# Installation

**HomA** (Home Automation) is found in the
[HomA GitHub Repository ⧉ 🔗](https://github.com/pippim/HomA/blob/main
"View HomA Python source code"){:target="_blank"}.

Click the above link and then click the green code button shown below:

{% include image.html src="/assets/img/HomA/HomA - Download ZIP.png"
   alt="HomA - Download ZIP"
   style="float: right; width: 90%; margin: .5rem 2rem 1rem 10rem;"
   caption="HomA - Download ZIP.png"
%}

- Select the **Download ZIP** option
- Extract the archive to your home directory

Open a terminal window and type these two commands:

<!-- Could use non-breaking hyphen &#8209; in 'homa-indicator' which
     becomes 'homa&#8209;indicator'

Better https://stackoverflow.com/a/40721949/6929343:

<span class="propernoun">V. V. Putin</span>

and in CSS you would define

.propernoun {
  white-space: nowrap;
}


-->

``` shell
/home/<USER>/HomA-main/src/homa-indicator.py &
/home/<USER>/HomA-main/src/homa.py
```

***WHERE:*** `<USER>` is your username.

The first command runs **HomA Indicator** in the System Tray / Task Bar
as a background job. When you close the terminal, **HomA Indicator**
will disappear from the System Tray. 

***TIP:***
> Add **HomA Indicator** to your *Startup Applications Preferences* 
in Ubuntu. Then it will start automatically when you log in and stay 
in the System Tray until you log out.

The second command runs **HomA**. Although you can run **HomA** via the
**HomA Indicator**, it is recommended the first few times you use **HomA**
in the terminal so you can see any unusual error messages.

For example, if you see an error like:

`ImportError: No module named 'serial'`

Then you need to install `serial` using:

`sudo apt install python3-serial`

If you are running Python 2.7.12+, drop the `3` and use `python-serial`.

Read more about installing dependencies in the next section.

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
- `gatttool` (already included in HomA subdirectory). It calls `serial`
python module which must be installed separately. `python-serial` or
`python3-serial` debian package in Ubuntu.
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

For granular sunrise/sunset brightness control you can use *Pippim Eyesome*.

> ***IMPORTANT NOTES:***
>
> - **HomA** was tested with Linux, specifically
Ubuntu 16.04 LTS ECM/Plus using Python 2.7.12 and Python 3.5.
>
> - You can toggle between Pyhon 2.7.x and
Python 3.x by changing the *"shebang"*.
The first line of `homa.py` and `homa-indicator.py` contain the
*"shebang"* of `#!/usr/bin/env python` to run the default python.
You can change `python` to `python2` or `python3` to override.
>
> - Changes can be made daily to **HomA**. As such it is probably
a good idea to keep the default path of `/home/<USER>/HomA-main/src`
for the **HomA** program files. This way updating to the current
version is easier.
>
> - If you discover an error in **HomA**, or have a question, or
have a suggestion, use the ***Issues*** Tab in the
[HomA GitHub Repository ⧉ 🔗](https://github.com/pippim/HomA/blob/main
"HomA GitHub Repository"){:target="_blank"}.
Then click the ***New Issue*** button.
>

---

<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr12">Skip</a></div>

# How to Start **HomA**

You can start ***HomA*** (`homa.py`) from the command line (a.k.a. the "Terminal",
the "Console" or, the "CLI"). You can also start ***HomA*** from ***HomA Indicator***
(`homa-indicator.py`).

The examples below assume that *HomA* was installed to `/home/<USER>/HomA-main`.
Where `<USER>` is your User Id.

## Starting **HomA** from the Command Line

If *HomA* is not in your path, change to the directory where *HomA* is installed:

`cd /home/<USER>/HomA-main/src`

Then type `homa.py` and press <kbd>Enter</kbd>. Your terminal will look like this:

<a id="HelpSensors"></a>
``` shell
$ homa.py

  ######################################################
 //////////////                            \\\\\\\\\\\\\\
<<<<<<<<<<<<<<    HomA - Home Automation    >>>>>>>>>>>>>>
 \\\\\\\\\\\\\\                            //////////////
  ######################################################
                    Started: 4:18 PM

= = = = = System Monitor Processor Temps & Fans = = = = =
 Seconds | CPU Temp Fan RPM | GPU Temp Fan RPM |   Time
-------- | ---------------- | ---------------- | --------
    7.67 |  75.0°C 4500 RPM |  77.0°C 4300 RPM |  4:18 PM
 3608.15 |  70.0°C 4500 RPM |  74.0°C 4300 RPM |  5:18 PM
 7208.30 |  75.0°C 4500 RPM |  77.0°C 4300 RPM |  6:18 PM
 9003.52 |  95.0°C 4700 RPM |  82.0°C 4600 RPM |  6:48 PM
 9005.66 |  86.0°C 5000 RPM |  81.0°C 4800 RPM |  6:48 PM
 9933.77 |  75.0°C 5300 RPM |  75.0°C 5000 RPM |  7:04 PM
```

When `homa.py` is called with no parameters there are minimal lines printed.
The sensors for processor temperature (CPU & GPU) and fan speed for
each processor is printed. Sensors are always logged each hour and whenever
a fan's speed changes by more than 200 RPM:

- 4:18 PM, 5:18 PM and 6:18 PM: the fan speeds are consistent
- 6:48 PM: GPU fan speed changes from 4300 RPM to 4600 RPM
- 6:48 PM: CPU fan speed changes from 4700 RPM to 5000 RPM
- 7:04 PM: CPU fan speed changes from 5000 RPM to 5300 RPM


### `homa.py` Command Line Parameters

Optional parameters (a.k.a. "arguments") can be passed to `homa.py`:

| Parameter | Usage                                                  |
|-----------|--------------------------------------------------------|
| `-s`      | Silent mode. Nothing prints to the console.            |
| `-f`      | Fast mode. Network discovery is delayed for 1 minute.  |
| `-v`      | Verbose mode. Method names are printed.                |
| `-vv`     | Extra verbosity. Command names are printed.            |
| `-vvv`    | Super verbosity. Results of every command are printed. |

When `homa-indicator.py` calls `homa.py`, it uses the parameters `-s -f`.

If **HomA** is not performing as expected, run it from the command line 
and, use `homa.py -v` or, `homa.py -vv` or, `homa.py -vvv`, in that order, 
to narrow down the problem.

---

## Starting **HomA** from **HomA Indicator**

***HomA Indicator*** (`homa-indicator.py`) is an "Application Indicator" 
that sits in the System Tray / Task Bar. There are no optional parameters 
when calling it. Simply type:

`/home/<USER>/HomA-main/src/homa-indicator.py`

Then, using your mouse, left-click or right-click on the **HomA Indicator**
icon in the system tray as the video below shows:

<video src="/assets/img/HomA/HomA - Start from App Indicator.mp4"
data-canonical-src="/assets/img/HomA/HomA - Start from App Indicator.mp4"
autoplay loop muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:320px; width: 50% !important; height: auto !important;">
  </video>


The *HomA* option opens the **HomA** application at the mouse position. If
**HomA** is already running, it's window is moved to the mouse position.

The *eyesome* option only appears when **Pippim's Eyesome** is active.
When selected, **Eyesome Setup** opens at the mouse position.

The *quit* option removes **HomA Indicator** from the system tray / taskbar.
This doesn't close the **HomA** application if it is already running.
<br><br>

---

<a id="hdr12"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr11">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr13">Skip</a></div>

# How to Open **HomA** From the System Tray

The program `homa-indicator.py` is an "Application Indicator" that runs
in the System Tray a.k.a. the Taskbar.

Here is a video showing **HomA**, already running in one monitor, being
moved to another monitor:

<video src="/assets/img/HomA/HomA Indicator switch monitor.mp4"
data-canonical-src="/assets/img/HomA/HomA Indicator switch monitor.mp4"
controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit"
style="max-height:640px; width: 100% !important; height: auto !important;">
  </video>

The ability to call **HomA** from any monitor is paramount, because you can
use **HomA** to turn off a monitor it is running on. To turn the monitor
back on, you must be able to call **HomA** from another monitor.

The video shows how the **HomA** main window is moved, and then the child
window ***View Breathing Statistics*** is moved overtop. Child windows are
automatically moved when the main window is moved. When you try to click on
the main window, any child windows are automatically moved overtop. This
includes message dialog boxes that might otherwise be "buried" under the
main window.

---

## Where **HomA** Opens When Called From the System Tray

When you call **HomA** from the System Tray, its position is
controlled by the following line in `homa-indicator.py`:

```python
MOVE_WINDOW_RIGHT_ADJUST = -40  # Move Window Top Right Adjustment
```

The right edge of the **HomA** window is the current mouse position
plus the adjustment offset. The value shown is `-40` so the right edge
will be 40 pixels to the left of the current mouse position.

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr14">Skip</a></div>

# Suspend and Resume

**HomA** can suspend the system with the <kbd>Suspend</kbd> button or from
the ***File*** dropdown menu. **HomA** can also suspend the system when
a Sony TV is being monitored for powered off. This saves mouse clicks to
activate **HomA** and select the <kbd>Suspend</kbd> button.

All devices will be shut off except the
computer is suspended. Upon resume the terminal will appear
like this (on 2025-04-14):

``` shell
 1564.76 |  61°C / 5200 RPM |  66°C / 4800 RPM |  9:18 PM
 5165.79 |  60°C / 5200 RPM |  64°C / 5000 RPM | 10:18 PM
 8777.20 |  66°C / 5200 RPM |  69°C / 5000 RPM | 11:19 PM
Application().Suspend(): Suspending system...
Application().turnAllPower(OFF): Conditionally turning power 'OFF': SONY.LAN
Application().turnAllPower(OFF): Conditionally turning power 'OFF': SONY.Light
Application().turnAllPower(OFF): Conditionally turning power 'OFF': Bluetooth LED
Computer().turnOff(): 23:24:57.033253 Suspend command: [u'systemctl', u'suspend']

= = = =  Application().refreshApp() Resuming from suspend after: 5 hr, 13 min  = = = =

Application().resumeAfterSuspend(): Forced 10 second wait for network to come up.
Application().turnAllPower(ON): Unconditionally turning power 'ON': TCL.Light
Application().turnAllPower(ON): Unconditionally turning power 'ON': SONY.LAN
Application().turnAllPower(ON): Unconditionally turning power 'ON': SONY.Light
Application().turnAllPower(ON): Unconditionally turning power 'ON': TCL.LAN
Application().turnAllPower(ON): Unconditionally turning power 'ON': Bluetooth LED
Application().turnAllPower(ON): Unconditionally turning power 'ON': Alien-Light
    0.06 |  32°C /    0 RPM |  37°C /    0 RPM |  4:39 AM
  177.43 |  60°C / 2900 RPM |  60°C /    0 RPM |  4:42 AM
  179.65 |  60°C / 3300 RPM |  60°C / 3100 RPM |  4:42 AM
```

***NOTES:***

> 
> - The devices turned off are only those that are already turned on.
> 
> - All devices are turned on. Lights will not be turned on if 
> GNOME Nightlight is inactive or if Eyesome reports 100% sunlight.
> 
> - During resume there is a 10 second delay for the network to come 
> up. The number of seconds is defined in ***Preferences***.
> 

---

<a id="hdr13"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr12">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr14">Skip</a></div>

# Custom Images

If you grab an image for your device and it is in `.webp` format you have
to convert it to `.jpeg` or `.png` format for **HomA** to display it.

For example, you have a file called `hitron CGNM-2250.webp` and there are
no `.webp` image converters on your machine:

``` shell
$ sudo apt install webp

The following additional packages will be installed:
  freeglut3
The following NEW packages will be installed:
  freeglut3 webp
0 upgraded, 2 newly installed, 0 to remove and 2 not upgraded.
Need to get 135 kB of archives.
After this operation, 521 kB of additional disk space will be used.
Do you want to continue? [Y/n] y

$ dwebp "hitron CGNM-2250.webp" -o "hitron CGNM-2250.png"

Decoded hitron CGNM-2250.webp. Dimensions: 1000 x 750 . Format: lossy. Now saving...
Saved file hitron CGNM-2250.png

```

***Credit:*** https://stackoverflow.com/a/70641330/6929343

---

<a id="hdr14"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr13">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr15">Skip</a></div>

# Router Modems

There are five types of modems including cable modems, telephone modems,
satellite modems, dial modem and digital subscriber line. What is the
purpose of a modem? The primary purpose of a modem is to facilitate the
connection between a computer or network and an Internet service provider
(ISP).Jan 23, 2025


{% include image.html src="/assets/img/HomA/hitron CGNM-2250.png"
   alt="hitron CGNM-2250.png"
   style="float: right; width: 50%; margin: .5rem 2rem 1rem 2rem;"
   caption="Hitron Cable Modem Router CGNM-2250"
%}

---

<a id="hdr15"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr14">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr16">Skip</a></div>

## Turn Off Router

Turning off the router doesn't physically power it off. It merely disconnects your
computer from the router.

When you stop the "NetworkManager.service" on a Linux system, your computer
will lose its ability to automatically manage network connections, meaning you
will not be able to connect to Wi-Fi or wired networks through the graphical
user interface or standard network management tools as Network Manager handles
the discovery, connection, and configuration of network interfaces; essentially,
your system will be unable to connect to the internet unless you manually
configure network settings directly in the system's network interface
configuration files.

### Key points about stopping NetworkManager:

#### No automatic connections:

You will need to manually configure network interfaces and connections using
the system's traditional network configuration files, like
`/etc/network/interfaces.`

#### No network discovery:

Network Manager actively searches for available networks, so stopping it
prevents your system from automatically detecting nearby Wi-Fi networks.

#### Potential for manual configuration complexity:

Depending on your network setup, manually configuring network settings
can be a more complex process compared to using Network Manager.

#### How to stop NetworkManager:

Command: `sudo systemctl stop NetworkManager`

To start NetworkManager.service, replace `stop` with `start`



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

<a id="hdr20"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr19">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr21">Skip</a></div>

---

<a id="hdr21"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr20">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr22">Skip</a></div>

---

<a id="hdr22"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr21">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr23">Skip</a></div>

---


<!-- Foot section doesn't have "skip" button -->
<a id="hdr23"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr22">ToS</a>  <a href="#hdr2">ToC</a></div>
