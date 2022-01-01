---
layout:       post
title:        >
    Make Ubuntu's Night Light look like Manjaro KDE's Night Color
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1244707
type:         Answer
tags:         kde gnome-shell colors color-management night-light eyesome
created_date: !!str "2020-05-28 23:12:01"
edit_date:    !!str "2020-06-12 09:58:59"
votes:        !!str "2"
favorites:    
views:        !!str "973"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    true
---

# eyesome

[Eyesome][1] has more options to independently control your monitors (up to three) than either package. It's been released for three years with no changes but on June 2, 2020 a color temperature slider was added.

In addition to the documentation on the github page link above where you can download eyesome, additional documentation with screen shots is available here in Ask Ubuntu:

- https://askubuntu.com/questions/829814/set-initial-startup-background-brightness-depending-on-daytime/887249#887249

----------

## New features on June 2, 2020

Here are the new features published today on github:

[![eyesome override.gif][2]][2]

- The ***Get*** button retrieves gamma for one of three monitors' Day or Night settings. It then calculates Color Temperature based on gamma (Red:Green:Blue)
- The ***Color*** button presents a slider to select Color Temperature from 1000K to 10,000K (Kelvins). When selecting ***Convert*** the chosen temperature is converted to Gamma (Red:Green:Blue).
- The ***Preview*** button temporarily shows what the chose Color Temperature looks like on all monitors.
- The ***Apply*** button updates the chosen Monitor and Daytime / Nighttime setting with the last Color Temperature selected.


----------


## Original features from 2017

Here's a few screenshots (of a dozen screens) to give you an idea about eyesome:

[![eyesome configuration general tab.png][3]][3]

[![eyesome-edit-configuration-monitor-1.png][4]][4]

[![enter image description here][5]][5]


----------
<!-- Language-all: lang-bash -->

## Reply to comment Color Temperature to Gamma

The new version has a Color to Gamma conversion table (bash syntax):
{% include copyHeader.html %}
``` 
#                 Red         Green       Blue     Color Temperature
GammaRampArr=( 1.00000000  0.05181963  0.00000000   500 \
               1.00000000  0.18172716  0.00000000  1000 \
               1.00000000  0.42322816  0.00000000  1500 \
               1.00000000  0.54360078  0.08679949  2000 \
               1.00000000  0.64373109  0.28819679  2500 \
               1.00000000  0.71976951  0.42860152  3000 \
               1.00000000  0.77987699  0.54642268  3500 \
               1.00000000  0.82854786  0.64816570  4000 \
               1.00000000  0.86860704  0.73688797  4500 \
               1.00000000  0.90198230  0.81465502  5000 \
               1.00000000  0.93853986  0.88130458  5500 \
               1.00000000  0.97107439  0.94305985  6000 \
               1.00000000  1.00000000  1.00000000  6500 \
               0.95160805  0.96983355  1.00000000  7000 \
               0.91194747  0.94470005  1.00000000  7500 \
               0.87906581  0.92357340  1.00000000  8000 \
               0.85139976  0.90559011  1.00000000  8500 \
               0.82782969  0.89011714  1.00000000  9000 \
               0.80753191  0.87667891  1.00000000  9500 \
               0.78988728  0.86491137  1.00000000  10000 \
               0.77442176  0.85453121  1.00000000  10500 \
             )
# Temperatures of 500 & 10500 are not allowed. Provided for looping min-max.

```


----------


## Reply to comments 2

This question was asked today:

> Is it possible to manually set eyesome to always run ? Regardless of  
> time. Also, is it possible to disable internet connection? Because if  
> it set to be always on, then there is no need to retrieve location  
> from the internet. Moreover, I don't like apps retrieving my location  
> or having access to the internet if they don't need to  

You can forego using internet to get sunrise/sunset times with these commands:

``` 
sudo echo "7:00 am" > /usr/local/bin/.eyesome-sunrise
sudo echo "9:00 pm" > /usr/local/bin/.eyesome-sunset

```

Change the time appropriately. I'll look at changing the software in the next upgrade to make this easier. 

Please note `eyesome` doesn't retrieve your location. You're merely keying your city name into the screen and it's stored on a configuration file on your disk. You aren't keying in your IP address or longitude / latitude like Redshift, Night Light or F.lux. BTW your city name is already known to every website you visit because they know your ISP Service Provider's city. Unless you are using a VPN of course.

  [1]: https://github.com/WinEunuuchs2Unix/eyesome
  [2]: https://i.stack.imgur.com/VpCDG.gif
  [3]: https://i.stack.imgur.com/VsnELl.png
  [4]: https://i.stack.imgur.com/q0rF6l.png
  [5]: https://i.stack.imgur.com/hiPhll.png
