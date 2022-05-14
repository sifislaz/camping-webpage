const containerSignIn = document.getElementById('sign-in-form');
const containerSignUp =document.getElementById('sign-up-form');
const popUpButtonSignIn = document.getElementById('pop-up-button-sign-in');
const popUpButtonSignUp = document.getElementById('pop-up-button-sign-up');
const signUpLink = document.getElementById('sign-up');
const signInLink = document.getElementById('sign-in');

popUpButtonSignIn.addEventListener('click', function (){
    containerSignIn.style.display = 'block';
    containerSignUp.style.display = 'none';
})

popUpButtonSignUp.addEventListener('click', function (){
    containerSignIn.style.display = 'none';
    containerSignUp.style.display = 'block';
})

signInLink.addEventListener("click", function (){
    containerSignIn.style.display = 'block';
    containerSignUp.style.display = 'none';
})

signUpLink.addEventListener('click',function (){
    containerSignIn.style.display = 'none';
    containerSignUp.style.display = 'block';
})


// document.addEventListener("click", function (e){
//     if (containerSignIn.style.display === 'block'){
//         if(e.target !== containerSignIn && e.target !== popUpButtonSignIn && e.target !== signInLink){
//             containerSignIn.style.display = 'none';
//         }
//         else if (e.target === signUpLink){
//             containerSignUp.style.display = 'block';
//         }
//     }
//     if (containerSignUp.style.display === 'block'){
//         if (e.target !== containerSignUp && e.target !== popUpButtonSignUp && e.target !== signUpLink){
//             containerSignUp.style.display = 'none';
//         }
//         else if (e.target === signInLink){
//             containerSignIn.style.display = 'block';
//         }
//     }
// })