const containerSignIn = document.getElementById('sign-in-form');
const containerSignUp = document.getElementById('sign-up-form');
const signInHeader = document.getElementById('headerSignIn');
const signUpHeader = document.getElementById('headerSignUp');
const signInLink = document.getElementById('sign-in');
const signUpLink = document.getElementById('sign-up');

signInHeader.addEventListener('click', function (){
    containerSignIn.style.display = 'block';
    containerSignUp.style.display = 'none';
})

signUpHeader.addEventListener('click', function (){
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