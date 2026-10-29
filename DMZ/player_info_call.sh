#!/bin/bash

MM=$(date +"%m" -d "today - 7 day")
DD=$(date +"%d" -d "today - 7 day")
YYYY=$(date +"%Y" -d "today - 7 day")

oneWeekBefore=${YYYY}-${MM}-${DD}

team_arr=("TOR")

# "NJD" "NYR")


for team in "${team_arr[@]}"; do

	curl -L GET "http://api-web.nhle.com/v1/roster/${team}/current" | jq > ${team}/players.json

	jq ' .forwards[] | {playerID: .id, firstName: .firstName.default, lastName: .lastName.default, jerseyNum: .sweaterNumber, headshot: .headshot, height: .heightInCentimeters, weight: .weightInKilograms, birthday: .birthDate, position: "forward", teamSlug: "NJD", isInjured: "0", injuryReturnDate: "NULL", ownedBy: "NULL"}' ${team}/players.json > ${team}/smaller_players.json
	jq ' .defensemen[] | {playerID: .id, firstName: .firstName.default, lastName: .lastName.default, jerseyNum: .sweaterNumber, headshot: .headshot, height: .heightInCentimeters, weight: .weightInKilograms, birthday: .birthDate, position: "defenseman", teamSlug: "NJD", isInjured: "0", injuryReturnDate: "NULL", ownedBy: "NULL"}' ${team}/players.json >> ${team}/smaller_players.json
	jq ' .goalies[] | {playerID: .id, firstName: .firstName.default, lastName: .lastName.default, jerseyNum: .sweaterNumber, headshot: .headshot, height: .heightInCentimeters, weight: .weightInKilograms, birthday: .birthDate, position: "goalie", teamSlug: "NJD", isInjured: "0", injuryReturnDate: "NULL", ownedBy: "NULL"}' ${team}/players.json >> ${team}/smaller_players.json

	jq '.forwards[].id' ${team}/players.json > playerids.txt
	jq '.defensemen[].id' ${team}/players.json >> playerids.txt
	jq '.goalies[].id' ${team}/players.json >> playerids.txt

	numPlayers=$(wc -l ${team}/playerids.txt | awk '{print $1}')
	for ((x=1;x<=$numPlayers;x++)); do
		y=15

		thisLine=$(sed -n "${x}p" ${team}/playerids.txt)
		sed -n "1,${y}p" ${team}/smaller_players.json > ${team}/player_${x}.json
	done



done
