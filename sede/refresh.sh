#!/bin/bash

# refresh.sh

# Pass commit message as first parameter (referenced as "$1")

# First time usage:
#       ~/website/sede$ chmod a+x refresh.sh

# Requires two directories ~/website (development directory) and
# ~/website2 (the published clone)

# Make sure creditials are stored https://stackoverflow.com/a/17979600/6929343

#       $ git config credential.helper store
#       $ git push http://example.com/repo.git
#       Username: <type your username>
#       Password: <type your password>

if [ ! -d ~/website ] ; then 
    echo Requires directories ~/website and ~/website2
    exit 101
fi

if [ ! -d ~/website2 ] ; then 
    echo Requires directories ~/website and ~/website2
    exit 102
fi

if [ -z "$1" ] ; then
    now=$(date)
    commit_message="Update website posts on $now"
else
    commit_message="$1"
fi

echo "Commit message set to: '$commit_message'"

cd ~/website2

git pull
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git pull FAILED with code: $retVal"
    exit $retVal
fi

cd ~/website/sede

cp ~/website2/_config.yml ../
stack-to-blog.py
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git pull FAILED with code: $retVal"
    exit $retVal
fi

cd ~/website2

rm -rf _posts/
mkdir _posts/
cp -r ~/website/_posts/* _posts/

git add _posts/
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git add _posts/ FAILED with code: $retVal"
    exit $retVal
fi

cp ~/website/_includes/posts_by_tag.html _includes/
cp ~/website/_includes/posts_by_vote.html _includes/

git add _includes/
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git add _includes/ FAILED with code: $retVal"
    exit $retVal
fi

cp ~/website/_config.yml .

git add _config.yml
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git add _config.yml FAILED with code: $retVal"
    exit $retVal
fi

git commit -m '"'"$commit_message"'"'
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git commit -m FAILED with code: $retVal"
    exit $retVal
fi

git push
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git push FAILED with code: $retVal"
    exit $retVal
fi

# Change back to original directory (probably ~/website/sede)
cd ~/website/sede

