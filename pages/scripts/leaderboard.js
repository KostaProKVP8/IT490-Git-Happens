const leagueID = document.cookie.split("; ").find(cookie => cookie.startsWith("leagueID="))?.split("=")[1]; //absolutely cursed ahh line of code D:
const parameters = new URLSearchParams(window.location.search);

function createLeague(){
    window.location.href="../createLeague.html";
}

if (parameters.has("leagueID") || leagueID){
    var xHttpReq = new XMLHttpRequest();
    
    xHttpReq.open("POST","../../php-server-code/leagueVerify.php",true);
    xHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    xHttpReq.onreadystatechange = function(){
        if(xHttpReq.readyState !== XMLHttpRequest.DONE){
                return;
        }

        if(xHttpReq.status == 200 && xHttpReq.readyState === 4){
            console.log(xHttpReq.response);
            const response = JSON.parse(xHttpReq.response);
            console.log(response);
            if( response.returnCode == 1){
                // saveSession(response.sessionId);
                // console.log(getSession());
                // window.location.href = "../login.html";

                const leaderboard =  document.getElementById("leaderboardBody");
                leaderboard.replaceChildren();
                response.teams.forEach(team => {
                    const row = document.createElement("tr");
                    row.innerHTML = 
                        `<td>${team.teamName}</td>
                        <td>${team.placement}</td>
                        <td>${team.overallPoints}</td>
                        <td>${team.nextOpponent}</td>`;

                    leaderboard.appendChild(row);
                });
            }
            else{
                console.error(response);  
                alert("??????????");
                // window.location.href = "../error.html";

            }
        }
        else{
            console.log(xHttpReq.status);
        }
    }
    xHttpReq.send(`leagueID=${encodeURIComponent(parameters.get("inviteID"))}&method=${encodeURIComponent("checkLeague")}`);
}
else{
    document.getElementById("noLeagueYet").textContent = "You aren't in a league yet! Create one?";
    document.getElementById("leaderboard").remove(); //get rid of the leaderboard
    const button = document.createElement("button");
    button.classList.add("blueButton");
    button.textContent = "Create League";
    button.addEventListener("click",createLeague);
    document.querySelector(".mainDiv").appendChild(button);
    // window.location.replace("../index.html")
}
