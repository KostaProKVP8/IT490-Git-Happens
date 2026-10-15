export function _hash(key){
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


export function validateInput(inpt, type){
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

    if(type == "email"){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //usde regex test bc it's a guaranteed format
        return emailRegex.test(email);
    }
}