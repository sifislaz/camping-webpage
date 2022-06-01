const commentSignUpLink = document.getElementById('comment-sign-up');
const commentBtn = document.getElementById('post');

commentSignUpLink.addEventListener('click', function(){
    containerSignIn.style.display = 'none';
    containerSignUp.style.display = 'block';
})

commentBtn.addEventListener('click', function(){
    containerSignUp.style.display = 'none';
    containerSignIn.style.display = 'block';
})