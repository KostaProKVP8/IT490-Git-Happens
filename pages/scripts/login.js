import { _hash, validateInput } from "./utility/Utility.js";
import { getSession, saveSession } from "./utility/session.js";

async function login(){
    // const endpointUrl = "127.0.0.1"; 
    // console.log("Creating Unknown New Technologies");
    const userName = document.getElementById("loginUsername").value;
    // console.log(validateInput(userName,"user"));
    const enteredPassword = document.getElementById("loginPassword").value;
    // console.log(validateInput(enteredPassword,"password"));
    // console.log(userName,enteredPassword);
    if(!validateInput(userName,"user")){
        alert("You done goofed");
    }
    if(!validateInput(enteredPassword,"password")){
        alert("You done goofed");
    }
    var passwordHash = _hash(enteredPassword);

    var xHttpReq = new XMLHttpRequest();

    xHttpReq.open("POST","../../php-server-code/auth.php",true);
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
                console.log(response.sessionId);
                sessionStorage.setItem("userId", response.userid);
                saveSession(response.sessionId);
                console.log(getSession());
                const parameters = new URLSearchParams(window.location.search);
                if (parameters.has("inviteID")){
                    sessionStorage.setItem("leagueId", parameters.get("inviteID"));
                }
                window.location.href = "../landing.html";
            }
            else{
                console.error(response);  
                alert("Incorrect Username or Password, L bozo");
                // window.location.href = "../error.html";

            }
        }
        else{
            console.log(xHttpReq.status);
        }
    }
    xHttpReq.send(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&method=${encodeURIComponent("login")}`);

            // var responseText = '{"returnCode": 1, "message":"Login Successful", "sessionId":"MTc5MjA4NDE3NzU="}';
            // var responseText = '{"returnCode":1,"message":"Login successful","sessionId":"MTc5MjA5MjI0OTE="}';
            // console.log(responseText);
            // const response = JSON.parse(responseText);
	        // console.log(response);
            // if( response.returnCode == 1){
            //     saveSession(response.sessionId);
            //     console.log(getSession());
            //     window.location.href = "../../pages/landing.html";
            // }
            // else{
            //     console.error(response);  
            // }
}

document.getElementById("loginSubmit").addEventListener("click",login);
