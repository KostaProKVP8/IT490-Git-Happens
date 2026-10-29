import { getSession } from "./utility/session";

function createLeague(){
    var xHttpReq = new XMLHttpRequest();
    xHttpReq.open("POST","../php-server-code/auth.php",true);
    xHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xHttpReq.onreadystatechange = function(){
        if( xHttpReq.status == 200 && xHttpReq.readyState === 4){
            console.log(xHttpReq.response);
            var response = JSON.parse(xHttpReq.response);
            console.log(response);
            if( response.returnCode == 1){
                // sessionStorage.setItem("sessionId",response.sessionId);
                saveSession(response.sessionId);
                window.location.href="../landing.html";
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
    xHttpReq.send(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&email=${encodeURIComponent(email)}&method=${encodeURIComponent("register")}`);
}

const confirmButton = document.getElementById("createLeague");
confirmButton.addEventListener("click",createLeague);