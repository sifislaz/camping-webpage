let books = document.getElementsByClassName("situation");
for(let i = 0; i < books.length; i ++){
    let book = books[i];
    if(book.innerText==='ΕΚΤΕΛΕΣΤΗΚΕ'||book.innerText==='DONE'){
        book.classList.add('sit-done'); 
        let icons = book.children;
        icons[0].classList.add('show');
    }
    else if(book.innerText === 'ΣΕ ΑΝΑΜΟΝΗ'||book.innerText==='WAITING'){
        book.classList.add('sit-wait');
        let icons = book.children;
        icons[2].classList.add('show');
    }
    else if(book.innerText === 'ΑΚΥΡΩΘΗΚΕ'||book.innerText==='CANCELLED'){
        book.classList.add('sit-cancelled');
        let icons = book.children;
        icons[1].classList.add('show');
    }
}