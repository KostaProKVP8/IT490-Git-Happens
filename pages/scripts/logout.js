import { clearSession } from "./session";

function logout(){
    clearSession();
    window.location.href = "../index.html";
}

document.getElementById("logout").addEventListener("click",logout);
