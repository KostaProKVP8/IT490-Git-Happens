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


async function login(){
    // const endpointUrl = "127.0.0.1"; 
    // console.log("Creating Unknown New Technologies");
    const userName = document.getElementById("loginUsername").value;
    const enteredPassword = document.getElementById("loginPassword").value;
    // console.log(userName,enteredPassword);
    passwordHash = _hash(enteredPassword);

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
    xHttpReq.send(`userName=${encodeURIComponent(userName)}&hash=${encodeURIComponent(passwordHash)}&method=${encodeURIComponent("login")}`);
    // try{
    //     const response = await fetch(endpointUrl);
    //     if (!response.ok){
    //         throw new Error(`Response Status ${response.status}`);
    //     }
    //     const result = await response.json();
    //     console.log(result);
    // }
    // catch (error){
    //     console.error(error.message);
    // }
    

}

document.getElementById("loginSubmit").addEventListener("click",login);