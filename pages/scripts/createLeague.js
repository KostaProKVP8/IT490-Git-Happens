// import { getSession } from "./utility/session.js";

function createLeague(){
    // const leagueID = null;
    const userID = sessionStorage.getItem("userId");
    const leagueName = document.getElementById("leagueName");
    var xHttpReq = new XMLHttpRequest();
    xHttpReq.open("POST","../php-server-code/leagueVerify.php",true);
    xHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xHttpReq.onreadystatechange = function(){
        if( xHttpReq.status == 200 && xHttpReq.readyState === 4){
            console.log(xHttpReq.response);
            var response = JSON.parse(xHttpReq.response);
            console.log(response);
            if( response.returnCode == 1){
                // sessionStorage.setItem("sessionId",response.sessionId);
                // saveSession(response.sessionId);
                document.cookie = `leagueID=${response.leagueID}; role=admin`;
                document.getElementById("successPrompt").textContent = `You made a league! Invite other players by giving them this link: http://100.91.135.73/invite.html?inviteID=${response.leagueID}`
                // window.location.href="../leaderboard.html";
            }
            else{
                console.error(response.message);  
                alert(response.message);
            }
        }
        else{
            console.log("Error:", xHttpReq.status);
        }
    };
    xHttpReq.send(`userID=${encodeURI(userID)}&leagueName=${encodeURIComponent(leagueName)}&method=${encodeURIComponent("newLeague")}`);
}

const confirmButton = document.getElementById("createLeague");
confirmButton.addEventListener("click",createLeague);
