function moveToTrade(){
    window.location.href = "../trade.html";
}
function moveToLeaderboard(){
    window.location.href = "../leaderboard.html";
}
function editTeam(){
    //TODO: Add buttons to swap players around
}

document.getElementById("edit").addEventListener("click",editTeam);
document.getElementById("trade").addEventListener("click",moveToTrade);
document.getElementById("toLeaderboard").addEventListener("click",moveToLeaderboard);