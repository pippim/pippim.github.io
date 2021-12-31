---
layout:       post
title:        How to compress 3000 images in batches of 50
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1151970
type:         Answer
tags:         command-line tar image-processing compression batch
created_date: 2019-06-18 11:32:51
edit_date:    2019-06-18 23:00:33
votes:        1
favorites:    
views:        156
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    true
---

<!-- Language-all: lang-bash -->

Let's assume your images are stored in `~/Pictures` which is shorthand for `/home/USER_ID/Pictures`. Place the following commands in your home directory in a script file called `CompressImages`. Make the file executable using:

``` 
chmod a+x ~/CompressImages

```

Call the script using:

``` 
~/CompressImages

```

Copy the following script into the file `~/CompressImages`:

{% include copyHeader.html %}
``` 
#!/bin/bash

# Where to store Tars? We don't want in Images directory
COMPRESSED_DIR="$HOME/Downloads"
# TARs created with name below + "_999.tar"
TAR_NAME="CompressedImages"
# Directory Images are located in
FILES="$HOME/Pictures/*"

FileCount=50     # Number of files compressed into one Tar
TarCount=0       # Count of Tars created

i=0
for f in $FILES
do
    if [[ $(( i % FileCount )) -eq 0 ]] ; then
        let TarCount++
        TarName="$COMPRESSED_DIR/$TAR_NAME$TarCount.tar"
        tar -cvpf "$TarName" "$f"   # create .tar & add first file
    else
        tar -rvpf "$TarName" "$f"   # Add to existing tar
    fi
    let i++
done

```


----------

After running `CompressImages` script check the results:

``` 
$ ll -h ~/Downloads/*.tar

```

{% include copyHeader.html %}
``` 
-rw-rw-r-- 1 rick rick  14M Jun 18 16:55 Downloads/CompressedImages10.tar
-rw-rw-r-- 1 rick rick  48M Jun 18 16:55 Downloads/CompressedImages11.tar
-rw-rw-r-- 1 rick rick  16M Jun 18 16:55 Downloads/CompressedImages12.tar
-rw-rw-r-- 1 rick rick  55M Jun 18 16:55 Downloads/CompressedImages13.tar
-rw-rw-r-- 1 rick rick  45M Jun 18 16:55 Downloads/CompressedImages14.tar
-rw-rw-r-- 1 rick rick  43M Jun 18 16:55 Downloads/CompressedImages15.tar
-rw-rw-r-- 1 rick rick  37M Jun 18 16:55 Downloads/CompressedImages16.tar
-rw-rw-r-- 1 rick rick  38M Jun 18 16:55 Downloads/CompressedImages17.tar
-rw-rw-r-- 1 rick rick  44M Jun 18 16:55 Downloads/CompressedImages18.tar
-rw-rw-r-- 1 rick rick  47M Jun 18 16:55 Downloads/CompressedImages19.tar
-rw-rw-r-- 1 rick rick 180M Jun 18 16:55 Downloads/CompressedImages1.tar
-rw-rw-r-- 1 rick rick  53M Jun 18 16:55 Downloads/CompressedImages20.tar
-rw-rw-r-- 1 rick rick  33M Jun 18 16:55 Downloads/CompressedImages21.tar
-rw-rw-r-- 1 rick rick  13M Jun 18 16:55 Downloads/CompressedImages22.tar
-rw-rw-r-- 1 rick rick  26M Jun 18 16:55 Downloads/CompressedImages23.tar
-rw-rw-r-- 1 rick rick 1.4M Jun 18 16:55 Downloads/CompressedImages24.tar
-rw-rw-r-- 1 rick rick  13M Jun 18 16:55 Downloads/CompressedImages2.tar
-rw-rw-r-- 1 rick rick  15M Jun 18 16:55 Downloads/CompressedImages3.tar
-rw-rw-r-- 1 rick rick  23M Jun 18 16:55 Downloads/CompressedImages4.tar
-rw-rw-r-- 1 rick rick  11M Jun 18 16:55 Downloads/CompressedImages5.tar
-rw-rw-r-- 1 rick rick  12M Jun 18 16:55 Downloads/CompressedImages6.tar
-rw-rw-r-- 1 rick rick  20M Jun 18 16:55 Downloads/CompressedImages7.tar
-rw-rw-r-- 1 rick rick 7.4M Jun 18 16:55 Downloads/CompressedImages8.tar
-rw-rw-r-- 1 rick rick  21M Jun 18 16:55 Downloads/CompressedImages9.tar

```


