let heartBtn = document.getElementsByClassName('action-icon-heart');
let denyBtn = document.getElementsByClassName('action-icon-deny');
let approveBtn = document.getElementsByClassName('action-icon-approve');


heartBtn[0].addEventListener('click', function(){
    heartBtn[0].classList.add("animate__animated");
    heartBtn[0].classList.add("animate__pulse");
});


denyBtn[0].addEventListener('click', function(){
    denyBtn[0].classList.add("animate__animated");
    denyBtn[0].classList.add("animate__shakeX");
});


approveBtn[0].addEventListener('click', function(){
    approveBtn[0].classList.add("animate__animated");
    approveBtn[0].classList.add("animate__bounce");
});