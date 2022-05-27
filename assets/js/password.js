const showPass = document.querySelector("#showPass");
const hidePass = document.querySelector("#hidePass");
const showPass2 = document.querySelector("#showPass2");
const hidePass2 = document.querySelector("#hidePass2");
const showCont = document.querySelector("#showCont");
const hideCont = document.querySelector("#hideCont");
const showCont2 = document.querySelector("#showCont2");
const hideCont2 = document.querySelector("#hideCont2");
const showPassConf = document.querySelector("#showPassConf");
const hidePassConf = document.querySelector("#hidePassConf");
const showContConf = document.querySelector("#showContConf");
const hideContConf = document.querySelector("#hideContConf");
const pass = document.querySelector("#pass1");
const pass2 = document.querySelector("#pass1Up");
const passConf = document.querySelector("#pass2");

hideCont.classList.add("hide");
hideCont2.classList.add("hide");
hideContConf.classList.add("hide");

function revealPassword(){
    showPass.addEventListener("click",()=>{
        showCont.classList.add("hide");
        showCont.classList.remove("show");
        hideCont.classList.remove("hide");
        hideCont.classList.add("show");
        pass.type = "text";
    });
    hidePass.addEventListener("click",()=>{
        hideCont.classList.add("hide");
        hideCont.classList.remove("show");
        showCont.classList.add("show");
        showCont.classList.remove("hide");
        pass.type = "password";
    });
    showPass2.addEventListener("click",()=>{
        showCont2.classList.add("hide");
        showCont2.classList.remove("show");
        hideCont2.classList.remove("hide");
        hideCont2.classList.add("show");
        pass2.type = "text";
    });
    hidePass2.addEventListener("click",()=>{
        hideCont2.classList.add("hide");
        hideCont2.classList.remove("show");
        showCont2.classList.add("show");
        showCont2.classList.remove("hide");
        pass2.type = "password";
    });
    showPassConf.addEventListener("click",()=>{
        showContConf.classList.add("hide");
        showContConf.classList.remove("show");
        hideContConf.classList.remove("hide");
        hideContConf.classList.add("show");
        passConf.type = "text";
    });
    hidePassConf.addEventListener("click",()=>{
        hideContConf.classList.add("hide");
        hideContConf.classList.remove("show");
        showContConf.classList.add("show");
        showContConf.classList.remove("hide");
        passConf.type = "password";
    });

}

function checkPassword(){
    const lengthRegex = /^.{8,20}/;
    const upperRegex = /^(?=.*[A-Z]).*/;
    const lowerRegex = /^(?=.*[a-z]).*/;
    const numRegex = /^(?=.*\d).*/;
    const specialRegex = /^(?=.*[!@#$%^&*]).*/;
    if(passConf.value===""){
        alert("Type again your password");
    }
    if(pass2.value !== passConf.value){
        alert("Passwords don't match!");
    }
    if(!lengthRegex.test(pass2.value)){
        alert("Password must contain 8-20 characters");
    }
    if(!upperRegex.test(pass2.value)){
        alert("Password must contain at least one uppercase letter");
    }
    if(!lowerRegex.test(pass2.value)){
        alert("Password must contain at least one lowercase letter");
    }
    if(!numRegex.test(pass2.value)){
        alert("Password must contain at least one number");
    }
    if(!specialRegex.test(pass2.value)){
        alert("Password must contain at least one special character");
    }
}