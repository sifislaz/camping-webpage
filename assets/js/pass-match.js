const oldPass = document.querySelector('#oldpass')
const newPass = document.querySelector('#newpass')
const reNewPass = document.querySelector('#renewpass')
const saveChanges = document.querySelector('#saveBtn')

saveChanges.addEventListener('click', function (){
    if (newPass !== reNewPass){
        alert("New passwords must much each other!@#$^&");
    }
})