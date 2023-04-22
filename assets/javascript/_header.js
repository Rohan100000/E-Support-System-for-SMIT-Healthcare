// Get the account_circle icon and toggle menu
var accountIcon = document.querySelector('.header-icons li:last-child a');
var toggleMenu = document.querySelector('.toggle-menu');
accountIcon.addEventListener('click', function() {
  if (toggleMenu.style.display === 'none') {
    toggleMenu.style.display = 'block';
  } else {
    toggleMenu.style.display = 'none';
  }
});
// console.log(document.cookie);
function appointment_button(){
  document.cookie = 'appointment'; 
  // console.log("run");
  return true;
}
function profile_button(){
  document.cookie = 'profile'; 
  // console.log("");
  return true;
}