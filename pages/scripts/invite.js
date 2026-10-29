const parameters = URLSearchParams(window.location.search);

if (parameters.has("inviteID")){
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

                    document.getElementById("inviteMessage").textContent = `You have been invited to join ${response.leagueOwner}'s League`;
                    document.getElementById("inviteLeagueName").textContent = response.leagueName;
                    document.cookie = `leagueID=${response.leagueID};role=user`;
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
    window.location.replace("../index.html")
}


function acceptInvite(){

}