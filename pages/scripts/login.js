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


function validateInput(inpt, type){
    if (type == "user"){
        // console.log(inpt);
        if(inpt.search(/[&;[\]<>'"=/,#()\\]/) != -1){
            return false;
        }
        else{
            return true;
        }
    }
    if(type == "password"){
        /*
        8 char min
        1 special
        1 upper
        1 lower
        1 number
        */
       if(inpt.length < 8){
            return false;
       }
       else if(inpt.search(/[A-Z]/) == -1){
            return false;
       }
       else if(inpt.search(/[a-z]/) == -1){
            return false;
       }
       else if(inpt.search(/[0-9]/) == -1){
            return false;
       }
       else if(inpt.search(/[!@#$^&*().]/) == -1){
            return false;
       }
       else{
        return true;
       }

    }
}

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
    passwordHash = _hash(enteredPassword);

    var xHttpReq = new XMLHttpRequest();

    xHttpReq.open("POST","../../php-server-code/auth.php",true);
    xHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xHttpReq.onreadystatechange = function(){
        if( xHttpReq.status == 200){
            console.log(xHttpReq.responseText);
            var token = xHttpReq.responseText;
            xHttpReq.open("POST","../../php-server-code/tokenValidator.php",true);
            xHttpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xHttpReq.onreadystatechange = function(){
                if( xHttpReq.status == 200){
                    console.log(xHttpReq.responseText);
                    window.location.href = "../landing.html";
                }
                else{
                    console.log("Error:", xHttpReq.status);
                }
            };
            xHttpReq.send(`token=${encodeURIComponent(token)}&method=${encodeURIComponent("validate")}`);
        }
        else{
            console.log("Error:", xHttpReq.status);
        }
    };
    xHttpReq.send(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&method=${encodeURIComponent("login")}`);

    

}

document.getElementById("loginSubmit").addEventListener("click",login);