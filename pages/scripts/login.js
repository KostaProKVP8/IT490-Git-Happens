import { _hash, validateInput } from "./Utility";
import { getSession, saveSession } from "./session";

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
        if( xHttpReq.status == 200){
            console.log(xHttpReq.responseText);
            var response = xHttpReq.responseText;
            if( response.returnCode == 1){
                saveSession(response.sessionId);
                console.log(getSession());
                window.location.href = "../landing.html";
            }
            else{
                console.error(response.message);  
            }
        }
        else{
            console.log(xHttpReq.status);
        }
    }
    xHttpReq.send(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&method=${encodeURIComponent("login")}`);
}

document.getElementById("loginSubmit").addEventListener("click",login);