function moveToTrade(){
    window.location.href = "../trade.html";
}
function moveToLeaderboard(){
    window.location.href = "../leaderboard.html";
}
function moveToBracket(){
    window.location.href = "../bracket.html";
}
document.getElementById("trade").addEventListener("click",moveToTrade);
document.getElementById("toLeaderboard").addEventListener("click",moveToLeaderboard);
document.getElementById("toBracket").addEventListener("click",moveToBracket);