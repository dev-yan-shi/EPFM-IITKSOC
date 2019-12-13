$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
  });
  $('[rel=tooltip]').tooltip({container: 'body'});
var slider = document.getElementById("myRange2");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

});