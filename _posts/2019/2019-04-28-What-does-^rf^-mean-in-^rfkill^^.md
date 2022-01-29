---
layout:       post
title:        >
    What does "rf" mean in "rfkill"?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138927
type:         Answer
tags:         rfkill
created_date: 2019-04-28 17:34:04
edit_date:    2019-04-29 12:30:42
votes:        "14 "
favorites:    
views:        "7,072 "
accepted:     
uploaded:     2022-01-29 11:32:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-28-What-does-^rf^-mean-in-^rfkill^^.md
toc:          false
navigation:   false
clipboard:    false
---

RF stands for "Radio Frequency". The [first transatlantic RF transmission][1] was received in St. John's Canada in 1901. RF is used for radios, TVs (not so much these days), walkie talkies, cell phones, etc. From your point of view RF is limited in maximum range of 10 meters to 30 meters.

RF is often associated with Wi-Fi. Wi-Fi is simply a trademarked term meaning IEEE 802.11x. The false notion that the brand name "Wi-Fi" is short for "wireless fidelity" has spread to such an extent that even industry leaders have included the phrase [wireless fidelity][2] in a press release.

The misnomer of "Wireless Fidelity" by the masses is most likely caused by mental muscle memory of "Hi-Fi" which stood for "[High Fidelity][3]" in stereophonic equipment. (No source for this:  just my theory).

Wi-Fi hotspots, Wi-Fi home networks and Wi-Fi business networks are used to connect computers and smartphones to the internet without wires. Therefore RF (Radio Frequency) becomes the backbone / transport layer that replaces the wires (Cat 5/5e, etc).

`rfkill` is simply a way of resetting computers and smartphones connect via Radio Frequencies (RF) to the internet. It can even reset devices such as speakers, mice, keyboards, etc. In this case the devices are connect with the "Bluetooth" standard.

Devices can also be connected to your computer with IR (Infrared) but this requires line of sight and doesn't use RF which bounce around. AM Radio bounces off the sky, FM Radio goes across the horizon. All types of RF are out there, including those from deep space. One discovered this year could be from [an alien spaceship][4] (if you believe that ;)).


  [1]: https://www.pc.gc.ca/en/lhn-nhs/nl/signalhill
  [2]: https://www.webopedia.com/DidYouKnow/Computer_Science/wifi_explained.asp
  [3]: https://en.wikipedia.org/wiki/High_fidelity
  [4]: https://www.bbc.com/news/science-environment-46811618
