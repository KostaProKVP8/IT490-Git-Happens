import { _hash, validateInput } from "./Utility";
import { saveSession } from "./session";

async function register() {
    console.log("In register");
    const email = document.getElementById("registerEmail").value;
    const userName = document.getElementById("registerUsername").value;
    const enteredPassword = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerPasswordConfirm").value;

    if(!validateInput(userName,"user")){
        alert("You done goofed");
    }
    if(!validateInput(enteredPassword,"password")){
        alert("You done goofed");
    }
    if(!validateInput(email,"email")){
        alert("You done goofed");
    }
    if(enteredPassword != confirmPassword){
        alert("passwords do not match!");
        return;
    }
    else{
        let passwordHash = _hash(enteredPassword);
        var xHttpReq = new XMLHttpRequest();
        xHttpReq.open("POST","../php-server-code/auth.php",true);
        xHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xHttpReq.onreadystatechange = function(){
            if( xHttpReq.status == 200){
                console.log(xHttpReq.responseText);
                var response = JSON.parse(xHttpReq.responseText);
                if( response.returnCode == 1){
                    // sessionStorage.setItem("sessionId",response.sessionId);
                    saveSession(response.sessionId);
                    window.location.href="../landing.html";
                }
                else{
                    console.error(response.message);  
                }
            }
            else{
                console.log("Error:", xHttpReq.status);
            }
        };
        xHttpReq.send(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&email=${encodeURIComponent(email)}&method=${encodeURIComponent("register")}`);
        // console.log(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&email=${encodeURIComponent(email)}`);

    }

}
document.getElementById("registerSubmit").addEventListener("click",register);
