#!/bin/bash

date > date.txt

mon=$(awk '{print $2}' date.txt)
day=$(awk '{print $3}' date.txt)
year=$(awk '{print $7}' date.txt)
#time=$(awk '{print $4}' date.txt)

#echo "$mon"
#echo "$day"
#echo "$year"

curl -L -X GET "https://api.nhle.com/stats/rest/en/team" | jq > /home/adam/git/IT490-Git-Happens/DMZ/teampulls/team_pull_${mon}_${day}_${year}.json
