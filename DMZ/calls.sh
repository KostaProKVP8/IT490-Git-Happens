#!/bin/bash

#curl -L -X GET "http://api-web.nhle.com/v1/club-schedule/TOR/week/2026-10-20" | jq > TOR_schedule.json


	jq '.games[].id' TOR_schedule.json > games.txt
        jq '.games[].venue.default' TOR_schedule.json  >> games.txt
        jq '.games[].startTimeUTC' TOR_schedule.json >> games.txt
        jq '.games[].homeTeam.commonName.default' TOR_schedule.json >> games.txt
        jq '.games[].homeTeam.abbrev' TOR_schedule.json >> games.txt
        jq '.games[].homeTeam.score' TOR_schedule.json >> games.txt
        jq '.games[].awayTeam.commonName.default' TOR_schedule.json >> games.txt
        jq '.games[].awayTeam.abbrev' TOR_schedule.json >> games.txt
        jq '.games[].awayTeam.score' TOR_schedule.json >> games.txt 





#numLines=$(wc -l gameids.txt | awk '{print $1}')




#for ((x=1; x<=$numLines; x++)); do
	#gameid=$(cat gameids.txt| sed -n "${x}p")
	#cat gameids.txt| sed -n "${x}p" > home/adam/git/IT490-Git-Happens/DMZ/gameinfo/game_${gameid}.txt
#	jq '.games[].id' TOR_schedule > games.txt
#	jq '.games[].venue.default' >> games.txt
#	jq '.games[]

#done
