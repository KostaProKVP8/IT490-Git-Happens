
function moveToLeaderboard(){
    window.location.href = "../leaderboard.html";
}
function moveToBracket(){
    window.location.href = "../bracket.html";
}
document.getElementById("toTeam").addEventListener("click",moveToBracket);
document.getElementById("toLeaderboard").addEventListener("click",moveToLeaderboard);