/*let heartBtn = document.getElementsByClassName('action-icon-heart');
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
});*/

let input = document.getElementById("search-box");

input.addEventListener("keypress", function (event) {
  console.log("I'm pressed");
});

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  console.log("clicked");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
