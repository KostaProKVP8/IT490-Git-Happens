function _hash(key){
    let hashStr = "";
    key.split("").forEach((char, index) => {
        // console.log(`${char} ${index}`);
        hashStr+=key.charCodeAt(index);
        hashStr+=index;
    });
    // console.log(hashStr);
    hashStr = hashStr % 490003;
    // console.log(hashStr);
    hashStr = window.btoa(hashStr);
    // console.log(hashStr);

    return hashStr;
}


async function register() {
    console.log("In register");
    const email = document.getElementById("registerEmail").value;
    const userName = document.getElementById("registerUsername").value;
    const enteredPassword = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerPasswordConfirm").value;

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
            }
            else{
                console.log("Error:", xHttpReq.status);
            }
        };
        xHttpReq.send(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&email=${encodeURIComponent(email)}`);
        // console.log(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&email=${encodeURIComponent(email)}`);

    }

}
document.getElementById("registerSubmit").addEventListener("click",register);
