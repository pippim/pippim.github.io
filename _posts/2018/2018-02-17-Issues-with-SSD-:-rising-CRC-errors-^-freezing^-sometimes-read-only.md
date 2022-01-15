---
layout:       post
title:        >
    Issues with SSD : rising CRC errors , freezing, sometimes read-only
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1007204
type:         Answer
tags:         ssd hardware disk ubuntu-gnome smart grub
created_date: 2018-02-17 22:02:17
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "2,480 "
accepted:     
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-17-Issues-with-SSD-:-rising-CRC-errors-^-freezing^-sometimes-read-only.md
toc:          false
navigation:   false
clipboard:    false
---

Some time before May 11, 2017 you updated your SSD Firmware. However a new version was released in [September 2017][1] and you should apply it using Windows.


----------


Run `fstrim` to discard unused blocks in the file system:

``` 
$ sudo fstrim --verbose --all
/mnt/c: 16 EiB (18446744073709551615 bytes) trimmed
/mnt/e: 16 EiB (18446744073709551615 bytes) trimmed
/: 23.4 GiB (25132920832 bytes) trimmed

```

In my case the results for Windows 10 partitions `/mnt/c` and `/mnt/e` were out of this world. So I checked the files and no harm was done to the data.


----------


Run `fsck -f` on your SSD after booting with a Live-USB when the partition is not mounted. Another option is running `fsck -f` from grub - [How to fsck hard drive while hard drive is unmounted, using bootable USB stick?][2].


----------

As mentioned in comments a bad SATA cable can cause errors. But as [this answer][3] points out, a loose connection can also cause errors. To rule out a bad/loose connection, remove the plugs from your SSD, blow compressed air over them and the male pins on the drive and firmly reseat the cables.


----------

## How much is your time worth?

The last question is how much is your time worth. Assuming you've spent 10 hours on this problem it works out to $5 / hour because many brand new 120GB SATA III SSDs can be purchased from [ebay.com][4]


----------

## Feb 23/2018 update

I read all the other answers tonight. One answer says to return it. But if you do and they find nothing wrong they'll simply send it back and you'll be without a drive for 2 weeks to 2 months.

Another answer says smartctl reports there is nothing wrong with the drive.

In this answer I suggested running `fsck -f` and you responded that no errors were reported.

### Run `fsck` every boot

As a compromise between the negative answer (return it) and the positive answer (nothing is wrong), my inclination would be to [run `fsck` on every boot][5]. If an error is discovered the boot is paused and you can read the error message. To summarize the link use:

``` 
sudo tune2fs -c 1 /dev/sdX

```

*Note: replace `X` with your drive letter, ie `a`, `b`, etc.*.

If after a month of no errors, change the value from `1` to `30` which is typical for most systems I believe. On a typical SSD the `fsck` will run quickly.

### Clean and re-seat SATA cables

Others mentioned replacing the SATA cable which is problematic for a laptop. As a compromise consider unplugging all cables on the drive side, using compressed air on male and female ends and then plugging the cables back in firmly.


  [1]: http://www.silicon-power.com/web/firmware
  [2]: https://askubuntu.com/questions/745404/how-to-fsck-hard-drive-while-hard-drive-is-unmounted-using-bootable-usb-stick
  [3]: http://www.tomshardware.com/answers/id-3318483/loose-sata-cable-freeze.html
  [4]: https://www.ebay.com/sch/i.html?Interface=SATA%2520III&LH_ItemCondition=1000&_nkw=120gb%20ssd&_dcat=175669&rt=nc&_mPrRngCbx=1&_udlo&_udhi=50
  [5]: https://unix.stackexchange.com/questions/123963/how-to-force-fsck-at-every-boot-all-relevant-filesystems
