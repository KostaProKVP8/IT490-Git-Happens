#!/bin/bash

curl -L -X GET "https://api.nhle.com/stats/rest/en/team" | jq > /home/adam/git/IT490-Git-Happens/DMZ/pulls/teams_pull.json

cat teams_pull.json | grep "rawTricode" | awk '{print $2}' | sed 's/",//g' | sed 's/"//g' > teamcodes.txt
cat teams_pull.json | grep "fullName" | awk '{print $2, $3, $4}' | sed 's/",//g' | sed 's/"//g' |  sed 's/ //g' > teamnames.txt
paste teamcodes.txt teamnames.txt > teams.txt
rm teamcodes.txt teamnames.txt

numTeams=$(wc -l teams.txt | awk '{print $1}')

for ((x=1; x<=$numTeams; x++)); do

	sed -n "${x}p" teams.txt > tmp.txt
	code=$(awk '{print $1}' tmp.txt)
	name=$(awk '{print $2}' tmp.txt)
	curl -L -X GET "http://api-web.nhle.com/v1/roster/${code}/current" | jq > /home/adam/git/IT490-Git-Happens/DMZ/pulls/team_players/${name}_players.json

done

rm tmp.txt

