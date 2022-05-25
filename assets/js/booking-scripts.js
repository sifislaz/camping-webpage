const lang = document.querySelector("html").getAttribute("lang");
function checkDates(){
    let start = document.querySelector("#startdate");
    let end = document.querySelector("#enddate");
    if(end.value<start.value){
        if(lang==='el'){
            alert("Η μέρα αναχώρησης δεν μπορεί να προηγείται της ημέρας άφιξης!");
        }
        else{
            alert("Check out date cannot be before check in date.")
        }
    }
    if(Date.parse(start.value)<Date.now()){
        if(lang==='el'){
            alert("Η ημέρα άφιξης δεν μπορεί να είναι πριν από σήμερα!");
        }
        else{
            alert("Check in date cannot be before today!");
        }
    }
}

function checkInfo(){
    let fname = document.querySelector("#firstname");
    let lname = document.querySelector("#lastname");
    let num = document.querySelector("#num");
    let zip = document.querySelector("#zip");
    let land = document.querySelector("#land");
    let cell = document.querySelector("#cell");
    const noNumRegex = /(?=.*\d).*/;
    const numRegex = /\d{1,3}[ΑΒΓABC]?/;
    const zipRegex = /\d{5}/;
    const phoneRegex = /(?=.*\D).*/;
    // check names for number apperance
    if(noNumRegex.test(fname.value)||noNumRegex.test(lname.value)){
        if(lang==="el"){
            alert("Τα ονόματα δεν περιλαμβάνουν αριθμούς!");
        }
        else{
            alert("Names do not contain numbers!")
        }
    }
    // check address number for validity
    if(!numRegex.test(num.value)){
        if(lang==='el'){
            alert("Ο αριθμός της διεύθυνσης αποτελείται από το πολύ 3 αριθμούς και προαιρετικά τα γράμματα Α,Β,Γ.")
        }
        else{
            alert("Street number contains up to 3 numbers and optional A,B,C")
        }
        
    }
    // check zip code for validity
    if(!zipRegex.test(zip.value)){
        if(lang==='el'){
            alert("Ο Τ.Κ. αποτελείται από 5 αριθμούς.");
        }
        else{
            alert('Zip code consists of 5 numbers.');
        }
    }

    if(phoneRegex.test(land.value)||phoneRegex.test(cell.value)){
        if(lang==='el'){
            alert("Τα τηλέφωνα περιέχουν μόνο αριθμούς");
        }
        else{
            alert("Phones contain only numbers");
        }
    }
}

// Search for the requirements and display results
function searchSpace(){
    const spaces = document.querySelector("#search-results");
    spaces.style.display = "block";
}

function activeButton(){
    const buttons = document.querySelectorAll("#avail-spaces>button");
    for (let button of buttons){
        button.addEventListener('click',()=>{
            if(!button.classList.contains("active")){
                button.classList.add("active");
            }
            else{
                button.classList.remove("active");
            }
        })
    }
}

function check(){
    checkInfo();
    checkDates();
}

activeButton();