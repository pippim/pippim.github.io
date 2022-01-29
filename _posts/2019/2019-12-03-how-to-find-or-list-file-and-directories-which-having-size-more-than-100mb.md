---
layout:       post
title:        >
    how to find or list file and directories which having size more than 100mb
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1193438
type:         Answer
tags:         grep find awk
created_date: 2019-12-03 11:53:10
edit_date:    
votes:        "2 "
favorites:    
views:        "1,675 "
accepted:     Accepted
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-03-how-to-find-or-list-file-and-directories-which-having-size-more-than-100mb.md
toc:          false
navigation:   false
clipboard:    true
---

This is a good article: [How to Find Out Top Directories and Files (Disk Space) in Linux][1]

One of the commands listed comes close to your directory needs:

{% include copyHeader.html %}
``` 
$ du -Sh | sort -rh | head -20
8.0G	./Videos
990M	./.googleearth/Cache/unified_cache_leveldb_leveldb2
798M	./.cache/mozilla/firefox/9fu0cuql.default/cache2/entries
643M	./roboto/Kijiji
378M	./android-studio/lib
306M	./roboto
293M	./Pictures
195M	./.dropbox-dist/dropbox-lnx.x86_64-84.4.170
193M	./.cache/google-chrome/Default/Cache
193M	./Android/Sdk/emulator/qemu/linux-x86_64
177M	./android-studio/plugins/android/lib/layoutlib/data/fonts
131M	./.cache/thumbnails/large
130M	./android-studio/plugins/android/lib
102M	./.gradle/wrapper/dists/gradle-4.6-all/bcst21l2brirad8k2ben1letg
101M	./Pictures/1920x1080
93M 	./Android/Sdk/emulator
91M 	./.mozilla/firefox/9fu0cuql.default
90M 	./Android/Sdk/emulator/lib64/qt/lib
80M 	./gmail
80M 	./Downloads
```

Another of the commands comes close to solving your file size needs:

{% include copyHeader.html %}
``` 
$ find -type f -exec du -Sh {} + | sort -rh | head -n 20
2.8G	./Videos/simplescreenrecorder-2019-11-24_17.20.17.mkv
1.3G	./Videos/simplescreenrecorder-2019-12-01_18.56.29.mkv
1.1G	./Videos/simplescreenrecorder-2019-11-30_16.16.22.mkv
1.1G	./Videos/simplescreenrecorder-2019-11-17_18.13.03.mkv
952M	./Videos/simplescreenrecorder-2019-11-11_21.42.51.mkv
548M	./Videos/simplescreenrecorder-2019-11-24_20.03.44.mkv
201M	./Videos/Screencapture 2019-11-08 at 13.07.14.mp4
122M	./Videos/Screencapture 2019-11-08 at 13.43.55.mp4
102M	./.gradle/wrapper/dists/gradle-4.6-all/bcst21l2brirad8k2ben1letg/gradle-4.6-all.zip
88M 	./android-studio/lib/platform-impl.jar
66M 	./android-studio/bin/lldb/lib/liblldb.so.7
63M 	./android-studio/jre/jre/lib/rt.jar
62M 	./.AndroidStudio3.2/system/caches/content.dat.storageData
61M 	./android-studio/lib/idea.jar
57M 	./.config/VirtualBox/VBoxGuestAdditions_5.1.38.iso
54M 	./Documents/vio.mp4
48M 	./android-studio/plugins/android/lib/android.jar
46M 	./Downloads/linux-modules-4.14.153-0414153-generic_4.14.153-0414153.201911101449_amd64.deb
45M 	./Android/Sdk/platforms/android-28/android.jar
42M 	./android-studio/lib/java-impl.jar
```

In both examples, just tweak the number of lines listed to get files over 100 MB. For example change `head -n 20` to `head -n 40` to list double the number of files.
  [1]: https://www.tecmint.com/find-top-large-directories-and-files-sizes-in-linux/
