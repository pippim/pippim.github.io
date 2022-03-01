#!/bin/bash

# refresh.sh

# Pass commit message as first parameter (referenced as "$1")

# First time usage:
#       ~/website/sede$ chmod a+x refresh.sh

# Requires two directories ~/website (development directory) and
# ~/website2 (the published clone)

# Make sure credentials are stored https://stackoverflow.com/a/17979600/6929343

#       $ git config credential.helper store
#       $ git push http://example.com/repo.git
#       Username: <type your username>
#       Password: <type your password>

# Must have the jq package.
command -v jq >/dev/null 2>&1 || { echo >&2 \
        "jq package required but it is not installed.  Aborting."; \
        exit 99; }

QUERY=~/Downloads/QueryResults.csv

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
    commit_message="Refresh website on: $now"
else
    commit_message="$1"
fi

echo "=== COMMIT MESSAGE set to: '$commit_message'"

cd ~/website2

echo
echo "=== PULLING: $PWD changes to github.com"

git pull
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git pull FAILED with code: $retVal"
    exit $retVal
fi

cd ~/website/sede || exit  1  # In case it fails

cp ~/website2/_config.yml ../

# Generate list of Rouge supported languages
echo
echo "=== RETRIEVING: Rouge Syntax Highlighting Languages list"
wget -qO languages https://raw.githubusercontent.com/rouge-ruby/rouge/master/docs/Languages.md

> rouge_languages.txt  # Empty old file

while read -r line; do
  sub=$(echo "$line" | awk -F'`' '{print $2}')
  # Get everything between '
  if [[ $sub ]] ; then
    # Was something found between '
    echo "$sub" >> rouge_languages.txt
  fi
done <languages

echo "bash" >> rouge_languages.txt  # Should be there? Maybe alias of "shell"?
echo "sh" >> rouge_languages.txt    # Should be there? Maybe alias of "shell"?
echo "text" >> rouge_languages.txt  # Should be there?
echo "python3" >> rouge_languages.txt  # Tested and it works in rouge

# mv ~/Downloads/QueryResults.csv .
if [[ -e "$QUERY" ]] ; then
    mv "$QUERY" QueryResults.csv
    echo
    echo "=== MOVING: QueryResults.csv from: $QUERY to $PWD"
fi

# One Time changes between weekly stack exchange data dumps
# In this example change language "basic" to "vb" for rouge
sed -i 's/lang-basic/lang-vb/g' QueryResults.csv
sed -i 's%https://askubuntu.com/questions/1039357/a-timer-to-set-up-different-alarms-simultaneosly%https://askubuntu.com/questions/1039357/set-of-countdown-timers-with-alarm/1039377#1039377%g' QueryResults.csv
# https://askubuntu.com/questions/1039357/a-timer-to-set-up-different-alarms-simultaneosly
# https://askubuntu.com/questions/1039357/set-of-countdown-timers-with-alarm/1039377#1039377

echo
echo "=== RUNNING: $PWD/stack-to-blog.py"

### BIG TICKET EVENT ###
stack-to-blog.py

retVal=$?
if [ $retVal -ne 0 ]; then
    echo "stack-to-blog.py FAILED with code: $retVal"
    exit $retVal
fi

cd ~/website2

echo
echo "=== UPDATING: $PWD/_posts/ and /_includes/"

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

# Add tree listing
tree -L 3 --dirsfirst --filelimit 20 > tree.work
tail -n +2 tree.work > _includes/website_tree.txt
rm tree.work

git add _includes/
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git add _includes/ FAILED with code: $retVal"
    exit $retVal
fi

# Convert tree listing to json format
jq -Rsc 'split("\n")' ../_includes/website_tree.txt > ../assets/json/website_tree.json
git add assets/json/website_tree.json

# Refresh stack-to-blog and rouge_languages.txt
cp ~/website/sede/refresh.sh sede/
cp ~/website/sede/stack-to-blog.py sede/
cp ~/website/sede/rouge_languages.txt sede/
git add sede/
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git add sede/ FAILED with code: $retVal"
    exit $retVal
fi

echo
echo "=== UPDATING: Configuration file: $PWD/_config.yml"

cp ~/website/_config.yml .

git add _config.yml
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git add _config.yml FAILED with code: $retVal"
    exit $retVal
fi

echo
echo "=== UPDATING: website search JSON files"

cp ~/website/assets/json/search_url.json assets/json/
cp ~/website/assets/json/search_words.json assets/json/
cp ~/website/assets/json/search_exclude.json assets/json/

git add assets/json/search_url.json
git add assets/json/search_words.json
git add assets/json/search_exclude.json
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git add /assets/json/search_exclude.jsonl FAILED with code: $retVal"
    exit $retVal
fi

# Pull the trigger and commit changes
git commit -m "$commit_message"
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git commit -m FAILED with code: $retVal"
    exit $retVal
fi

echo
echo "=== PUSHING: $PWD changes to github.com"

git push
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "git push FAILED with code: $retVal"
    exit $retVal
fi

# Change back to original directory ~/website
cd ~/website/sede

echo
echo "=== COMPARE: Cayman Theme original to modified version"
wget -qO original 'https://raw.githubusercontent.com/pages-themes/cayman/master/_sass/jekyll-theme-cayman.scss'
wget -qO modified 'https://raw.githubusercontent.com/pippim/pippim.github.io/main/_sass/jekyll-theme-cayman.scss'
diff original modified
rm original modified
