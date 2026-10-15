import { getSession } from "./session";

async function checkToken(){
    var sessionId = getSession();

    var xHttpReq = new XMLHttpRequest();

    xHttpReq.open("POST","../../php-server-code/tokenValidator.php",true);
    xHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xHttpReq.onreadystatechange = function(){
        if( xHttpReq.status == 200){
            console.log(xHttpReq.responseText);
            var response = xHttpReq.responseText;
            if( response.returnCode == 1){
                sessionStorage.setItem("sessionId",response.sessionId);
            }
            else{
                console.error(response.message);  
                window.location.href = "../error.html"
            }
        }
        else{
            console.log(xHttpReq.status);
        }
    }
    xHttpReq.send(`token=${encodeURIComponent(sessionid)}&method=${encodeURIComponent("validate")}`);



}