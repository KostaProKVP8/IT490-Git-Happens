#!/bin/bash



MM=$(date +"%m" -d "today - 7 day")
DD=$(date +"%d" -d "today - 7 day")
YYYY=$(date +"%Y" -d "today - 7 day")

oneWeekBefore=${YYYY}-${MM}-${DD} 

echo $oneWeekBefore
echo "${YYYY}-${MM}-${DD}"

