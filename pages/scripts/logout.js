import { clearSession } from "./utility/session.js";

function logout(){
    clearSession();
    window.location.href = "../index.html";
}

document.getElementById("logout").addEventListener("click",logout);
