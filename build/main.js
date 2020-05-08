/** contact pop up */

function contact() {
    document.getElementById("contactOverlay").style.width = "100%";
}
function closeContact() {
    document.getElementById("contactOverlay").style.width = "0%"
}




// hamburger button script
function hamburger(x) {
    x.classList.toggle("change");
    document.getElementsByClassName("nav_menu")[0].classList.toggle("responsive");
  }
  /* Toggle between adding and removing the "active" and "show" classes when the user clicks on o
  ne of the "Section" buttons. The "active" class is used to add a background color to the current 
  button when its belonging panel is open. The "show" class is used to open the specific accordion panel */
  var acc = document.getElementsByClassName("questions");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var answer = this.nextElementSibling;
      if (answer.style.display === "show") {
        answer.style.display = "none";
      }
      else {
        answer.style.display = "show";
      }
    });
  }

function faq() {
  var i;

  var acc = document.getElementsByClassName("questions");
  for (i = 0; i < acc.length; i++){
    acc[i].classList.toggle("active");
    acc[i].nextElementSibling.classList.toggle("show");
  }
  // document.getElementsByClassName("questions")[0, 1, 2].classList.toggle("active");
  // document.getElementsByClassName("questions")[0, 1, 2].nextElementSibling.classList.toggle("show");
  
}
function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace("w3-black", "w3-black");
  } else { 
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace("w3-black", "w3-black");
  }
}