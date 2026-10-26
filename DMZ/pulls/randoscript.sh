#!/bin/bash


for x in {1..7}; do

MM=$(date +"%m" -d "today + ${x} day")
DD=$(date +"%d" -d "today + ${x} day")
YYYY=$(date +"%Y" -d "today + ${x} day")

#         curl -L -X GET "api-web.nhle.com/v1/score/2026-MM-DD"

echo "date: ${MM}-${DD}-${YYYY}"

done
