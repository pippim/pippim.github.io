---
layout:       post
title:        >
    Is it safe to apt-get upgrade an all default LEMP?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1031018
type:         Answer
tags:         apt upgrade mysql php nginx
created_date: 2018-05-02 10:32:45
edit_date:    2018-05-02 11:32:05
votes:        "3 "
favorites:    
views:        "211 "
accepted:     
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-02-Is-it-safe-to-apt-get-upgrade-an-all-default-LEMP^.md
toc:          false
navigation:   false
clipboard:    false
---

## There are no 100% guarantees

If no one else has reported a problem you can be 99% sure. If you find via google search one user has a problem on a different hardware problem your certainty drops to 95%. If a user had a problem for your manufacturer your certainty drops to 90%. If the problem was for your model its 80%, your OS its 70%, etc.

## Test, test and test. When finished test again.

The best way of testing is to come in after hours when the database is down and all users are signed off. Create a partition equal to the size of your programs and data. Clone the live partition to the test partition.

Run the upgrade on the test partition:

- If the upgrade crashes on the test partition thank your lucky stars you didn't do it on the live partition.
- Fix any errors in the upgrade process, reclone live data to test partition (it will be shorter second time around if `rsync` is used). Run the upgrade again.
- After successful upgrade, test your programs. If they crash thank your lucky stars you didn't do it on the live partition.
- Find out why the programs crashed. If they scrambled your database, reclone the live database, upgrade, get patches for failing programs, retest.

I think you get the picture. To assist in the cloning process you can refer to this script: [Bash script to clone Ubuntu to new partition for testing 18.04 LTS upgrade][1]. You can also boot with a Live USB and manually clone with live partition not mounted using the script as a reference coupled with other instructions from the Internet.

**Note:** The linked script was written on April 28 and works fine. I'm revising it with extra tests to validate the correct test partition is selected as a clone. Another revision is to display Source and Target partition OS version details. The final revision is to display `rsync` stats for deleted files which are relevant when re-cloning over top of a clone.

  [1]: {% post_url /2018/2018-04-27-Bash-script-to-backup^clone-Ubuntu-to-another-partition %}
