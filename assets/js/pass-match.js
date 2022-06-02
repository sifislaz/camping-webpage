const oldPass = document.querySelector('#oldpass')
const newPass = document.querySelector('#newpass')
const reNewPass = document.querySelector('#renewpass')
const saveChanges = document.querySelector('#saveBtn')

saveChanges.addEventListener('click', function (){
    if (newPass.value !== reNewPass.value){
        alert("New passwords must much each other!@#$^&");
    }
})