let books = document.querySelectorAll(".situation");
const lang = document.querySelector("html").getAttribute('lang');

for(let i = 0; i < books.length; i ++){
    let book = books[i];
    if(book.innerText==='ΕΚΤΕΛΕΣΤΗΚΕ'||book.innerText==='DONE'){
        book.classList.add('sit-done'); 
        if(lang==='el'){
            book.innerText='ΕΚΤΕΛΕΣΤΗΚΕ';
        }
        else{
            book.innerText='DONE';
        }
    }
    else if(book.innerText === 'ΣΕ ΑΝΑΜΟΝΗ'||book.innerText==='WAITING'){
        book.classList.add('sit-wait');
        if(lang==='el'){
            book.innerText='ΣΕ ΑΝΑΜΟΝΗ';
        }
        else{
            book.innerText='WAITING';
        }
        
    }
    else if(book.innerText === 'ΑΚΥΡΩΘΗΚΕ'||book.innerText==='CANCELLED'){
        book.classList.add('sit-cancelled');
        if(lang==='el'){
            book.innerText='ΑΚΥΡΩΘΗΚΕ';
        }
        else{
            book.innerText='CANCELLED';
        }
        
    }
}