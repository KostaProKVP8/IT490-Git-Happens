#!/bin/bash

numPlayers=$(wc -l playerids.txt | awk '{print $1}')

for ((x=1;x<=$numPlayers;x++)); do

	thisId=$(sed -n "${x}p" playerids.txt)
	cat addme.txt >> player_${thisId}.txt


done
