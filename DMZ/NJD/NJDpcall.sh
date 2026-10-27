#!/bin/bash

team=NJD

        jq '.forwards[].id' players.json > players.txt
		numPlayers=$(wc -l players.txt | awk '{print $1}')
	jq '.forwards[].firstName.default' players.json  >> players.txt
	jq '.forwards[].lastName.default' players.json >> players.txt
	jq '.forwards[].sweaterNumber' players.json >> players.txt
	jq '.forwards[].headshot' players.json >> players.txt
	jq '.forwards[].heightInCentimeters' players.json >> players.txt
	jq '.forwards[].weightInKilograms' players.json >> players.txt
	jq '.forwards[].birthDate' players.json >> players.txt

	for ((x=1;x<=$numPlayers;x++)); do
                sed -n "${x}~${numPlayers}p" players.txt > tmp.txt
                playerid=$(sed -n "1p" tmp.txt)
                cat tmp.txt > player_${playerid}.txt
		echo '"forward"' >> player_${playerid}.txt
		echo "\"${team}\"" >> player_${playerid}.txt
        done
	rm tmp.txt

#______________________________________________________________________________

       jq '.defensemen[].id' players.json > players.txt
                numPlayers=$(wc -l players.txt | awk '{print $1}')
        jq '.defensemen[].firstName.default' players.json  >> players.txt
        jq '.defensemen[].lastName.default' players.json >> players.txt
        jq '.defensemen[].sweaterNumber' players.json >> players.txt
        jq '.defensemen[].headshot' players.json >> players.txt
        jq '.defensemen[].heightInCentimeters' players.json >> players.txt
        jq '.defensemen[].weightInKilograms' players.json >> players.txt
        jq '.defensemen[].birthDate' players.json >> players.txt

        for ((x=1;x<=$numPlayers;x++)); do
                sed -n "${x}~${numPlayers}p" players.txt > tmp.txt
                playerid=$(sed -n "1p" tmp.txt)
                cat tmp.txt > player_${playerid}.txt
                echo '"defenseman"' >> player_${playerid}.txt
                echo "\"${team}\"" >> player_${playerid}.txt
        done
        rm tmp.txt
#______________________________________________________________________________

       jq '.goalies[].id' players.json > players.txt
                numPlayers=$(wc -l players.txt | awk '{print $1}')
        jq '.goalies[].firstName.default' players.json  >> players.txt
        jq '.goalies[].lastName.default' players.json >> players.txt
        jq '.goalies[].sweaterNumber' players.json >> players.txt
        jq '.goalies[].headshot' players.json >> players.txt
        jq '.goalies[].heightInCentimeters' players.json >> players.txt
        jq '.goalies[].weightInKilograms' players.json >> players.txt
        jq '.goalies[].birthDate' players.json >> players.txt

        for ((x=1;x<=$numPlayers;x++)); do
                sed -n "${x}~${numPlayers}p" players.txt > tmp.txt
                playerid=$(sed -n "1p" tmp.txt)
                cat tmp.txt > player_${playerid}.txt
                echo '"goalie"' >> player_${playerid}.txt
                echo "\"${team}\"" >> player_${playerid}.txt
        done
        rm tmp.txt
