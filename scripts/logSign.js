function revert(){
    var x = document.getElementById("check")
    if(x.type=="password")x.type="text";
    else x.type="password";
}
function revert2(){
    var x = document.getElementById("check2")
    if(x.type=="password")x.type="text";
    else x.type="password";
}
function login(){
    document.getElementsByClassName("signup-form")[0].style.display= "none";
    document.getElementsByClassName("login-form")[0].style.display= "";
}
function signup(){
    document.getElementsByClassName("signup-form")[0].style.display= "";
    document.getElementsByClassName("login-form")[0].style.display= "none";
}
function read_more_function() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more-text");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
}