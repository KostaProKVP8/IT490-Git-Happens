#!/bin/bash


team_arr=("TOR" "NJD" "NYR")

for team in "${team_arr[@]}"; do

	mkdir -p "${team}"

	curl -L -X GET "http://api-web.nhle.com/v1/club-schedule/${team}/week/2026-10-20" | jq > ${team}/${team}_schedule.json

	jq '.games[].id' ${team}/${team}_schedule.json > ${team}/game.txt
		numGames=$(wc -l ${team}/game.txt | awk '{print $1}')
        jq '.games[].venue.default' ${team}/${team}_schedule.json >> ${team}/game.txt
        jq '.games[].startTimeUTC' ${team}/${team}_schedule.json >> ${team}/game.txt
        jq '.games[].homeTeam.commonName.default' ${team}/${team}_schedule.json >> ${team}/game.txt
        jq '.games[].homeTeam.abbrev' ${team}/${team}_schedule.json >> ${team}/game.txt
        jq '.games[].homeTeam.score' ${team}/${team}_schedule.json >> ${team}/game.txt
        jq '.games[].awayTeam.commonName.default' ${team}/${team}_schedule.json >> ${team}/game.txt
        jq '.games[].awayTeam.abbrev' ${team}/${team}_schedule.json >> ${team}/game.txt
        jq '.games[].awayTeam.score' ${team}/${team}_schedule.json >> ${team}/game.txt

	for ((x=1;x<=$numGames;x++)); do
		sed -n "${x}~${numGames}p" ${team}/game.txt > tmp.txt
		gameid=$(sed -n "1p" tmp.txt)
		cat tmp.txt > ${team}/gameid_${gameid}.txt
	done

	rm tmp.txt

done



#numLines=$(wc -l gameids.txt | awk '{print $1}')




#for ((x=1; x<=$numLines; x++)); do
	#gameid=$(cat gameids.txt| sed -n "${x}p")
	#cat gameids.txt| sed -n "${x}p" > home/adam/git/IT490-Git-Happens/DMZ/gameinfo/game_${gameid}.txt
#	jq '.games[].id' TOR_schedule > games.txt
#	jq '.games[].venue.default' >> games.txt
#	jq '.games[]

#done
