#!/bin/bash


team_arr=("TOR" "NJD" "NYR")

for team in "${team_arr[@]}"; do

	jq '.forwards[].id' ${team}/players.json > ${team}/playerids.txt
	jq '.defensemen[].id' ${team}/players.json >> ${team}/playerids.txt
	jq '.goalies[].id' ${team}/players.json >> ${team}/playerids.txt
		numIds=$(wc -l ${team}/playerids.txt | awk '{print $1}')
	for ((y=1;y<=$numIds;y++)); do
		thisId=$(sed -n "${y}p" ${team}/playerids.txt)

		curl -L -X GET "http://api-web.nhle.com/v1/player/${thisId}/game-log/20262027/2" |  jq > ${team}/temp_gamelog.json

		jq '.gameLog[].gameId' ${team}/temp_gamelog.json > ${team}/another_tmp.txt
			num_Games=$(wc -l ${team}/another_tmp.txt | awk '{print $1}')
		jq '.gameLog[].points' ${team}/temp_gamelog.json >> ${team}/another_tmp.txt
		jq '.gameLog[].shots' ${team}/temp_gamelog.json >> ${team}/another_tmp.txt
		jq '.gameLog[].gameWinningGoals' ${team}/temp_gamelog.json >> ${team}/another_tmp.txt
		jq '.gameLog[].pim' ${team}/temp_gamelog.json >> ${team}/another_tmp.txt
		jq '.gameLog[].assists' ${team}/temp_gamelog.json >> ${team}/another_tmp.txt
		jq '.gameLog[].otGoals' ${team}/temp_gamelog.json >> ${team}/another_tmp.txt
		jq '.gameLog[].toi' ${team}/temp_gamelog.json >> ${team}/another_tmp.txt
		jq '.gameLog[].goals' ${team}/temp_gamelog.json >> ${team}/another_tmp.txt

		for ((z=1;z<=$num_Games;z++)); do
			sed -n "${z}~${num_Games}p" ${team}/another_tmp.txt > tmp.txt
			cat tmp.txt >> ${team}/${thisId}_gamelog.txt
		done
		rm tmp.txt
	done





done

