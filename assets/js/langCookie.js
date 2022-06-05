const langBtn = document.querySelector("#lang-btn");

langBtn.addEventListener('click',(event)=>{
    console.log("in");
    setLangCookie(event.target.innerText);
});

let setLangCookie = function(lang){
    console.log(lang);
    document.cookie = `lang = ${lang}; path=${lang==="EL"?"/":"en/"}`;
}