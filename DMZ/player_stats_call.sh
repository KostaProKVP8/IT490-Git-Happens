#!/bin/bash
team_arr=("TOR" "NJD" "NYR")

for team in "${team_arr[@]}"; do

	numPlayers=$(wc -l ${team}/playerids.txt | awk '{print $1}')
        	for ((x=1;x<=$numPlayers;x++)); do
			thisId=$(sed -n "${x}p" ${team}/playerids.txt)

                curl -L -X GET "http://api-web.nhle.com/v1/player/${thisId}/game-log/20262027/2" |  jq > ${team}/temp_gamelog.json
		jq ' .gameLog[] | {playerID: ${thisId}, gameID: .gameId, teamSlug: ${team}, goals: .goals, assists: .assists, points: .points, totalShots: .shots, gameWinner: "NULL", penaltyMins: .pim, OTGoals: .otGoals, icetime: .toi' ${team}/temp_gamelog.json >> ${team}/${thisId}_gamelog.json

		done
done
