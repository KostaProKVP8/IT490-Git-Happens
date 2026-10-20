import { clearSession, getSession } from "./session.js";

async function checkToken(){
    var sessionId = getSession();
    if (!sessionId){
        window.location.replace("../error.html");
    } 

    var xHttpReq = new XMLHttpRequest();

    xHttpReq.open("POST","../../php-server-code/tokenValidator.php",true);
    xHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xHttpReq.onreadystatechange = function(){
        if( xHttpReq.status == 200 && xHttpReq.readyState === 4){
            console.log(xHttpReq.response);
            var response = xHttpReq.response;
            if( response.returnCode == 1){
                sessionStorage.setItem("sessionId",response.sessionId);
            }
            else{
                clearSession();
                console.error(response.message);  
                window.location.replace("../error.html");

            }
        }
        else{
            console.log(xHttpReq.status);
        }
    }
    xHttpReq.send(`token=${encodeURIComponent(sessionId)}&method=${encodeURIComponent("validate")}`);



}
checkToken();