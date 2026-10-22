import { _hash, validateInput } from "./Utility.js";
import { saveSession } from "./session.js";

async function register() {
    console.log("In register");
    const email = document.getElementById("registerEmail").value;
    const userName = document.getElementById("registerUsername").value;
    const enteredPassword = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerPasswordConfirm").value;

    if(!validateInput(userName,"user")){
        alert("You done goofed");
        return;
    }
    if(!validateInput(enteredPassword,"password")){
        alert("You done goofed, allowed special characters are any of the following: !@#$^&*().-");
        return;
    }
    if(!validateInput(email,"email")){
        alert("You done goofed, That's not an email!");
        return;
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
        // console.log(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&email=${encodeURIComponent(email)}`);

    }

}
document.getElementById("registerSubmit").addEventListener("click",register);
