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
const user = document.querySelector("#username");

const lengthRegex = /^.{8,20}/;
const upperRegex = /^(?=.*[A-Z]).*/;
const lowerRegex = /^(?=.*[a-z]).*/;
const numRegex = /^(?=.*\d).*/;
const specialRegex = /^(?=.*[!@#$%^&*]).*/;

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

function testPassword(password, regex){
    return regex.test(password);
}

function checkForm(e){
    const lang = document.querySelector("html").getAttribute("lang");
    if(pass2.value !== passConf.value){
        if(lang === "el"){
            alert("Οι κωδικοί δεν ταιριάζουν. Δοκιμάστε ξανά");
        }
        else{
            alert("Passwords don't match. Please try again");
        }
        pass2.focus();
        form.preventDefault();
    }
    if(!testPassword(pass2.value,lengthRegex)){
        if(lang==="el"){
            alert("Ο κωδικός πρέπει να είναι μήκους 8 έως 20 χαρακτήρες.");
        }
        else{
            alert("Password must be from 8 to 20 characters long!");
        }
        pass2.focus();
        form.preventDefault();
    }
    if(!testPassword(pass2.value,upperRegex)){
        if(lang==="el"){
            alert("Ο κωδικός πρέπει να περιέχει τουλάχιστον 1 κεφαλαίο γράμμα");
        }
        else{
            alert("Password must contain at least 1 uppercase letter");
        }
        pass2.focus();
        form.preventDefault();
    }
    if(!testPassword(pass2.value,lowerRegex)){
        if(lang==="el"){
            alert("Ο κωδικός πρέπει να περιέχει τουλάχιστον 1 μικρό γράμμα");
        }
        else{
            alert("Password must contain at least 1 lowercase letter");
        }
        pass2.focus();
        form.preventDefault();
    }
    if(!testPassword(pass2.value,numRegex)){
        if(lang==="el"){
            alert("Ο κωδικός πρέπει να περιέχει τουλάχιστον έναν αριθμό.");
        }
        else{
            alert("Password must contain at least 1 number");
        }
        pass2.focus();
        form.preventDefault();
    }
    if(!testPassword(pass2.value,specialRegex)){
        if(lang==="el"){
            alert("Ο κωδικός πρέπει να περιέχει τουλάχιστον έναν ειδικό χαρακτήρα")
        }
        else{
            alert("Password must contain at least one special character");
        }
        pass2.focus();
        form.preventDefault();
    }
}

const myForm = document.querySelector("#form-sign-up");
myForm.addEventListener("submit", checkForm,true);