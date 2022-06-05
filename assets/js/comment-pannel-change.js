const commentSignUpLink = document.getElementById('comment-sign-up');
const commentSignInLink = document.getElementById('comment-sign-in');

commentSignUpLink.addEventListener('click', function(){
    containerSignIn.style.display = 'none';
    containerSignUp.style.display = 'block';
})

commentSignInLink.addEventListener('click', function(){
    containerSignUp.style.display = 'none';
    containerSignIn.style.display = 'block';
})