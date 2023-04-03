var currDate = document.getElementsByClassName('date');
const date = new Date();
let day = date.getDate();
var month = date.toLocaleString('default', { month: 'long' });
for (let i = 0; i < 3; i++) {
    currDate[i].innerHTML = month+ " " + day;
    day = day + 1;
}
day = day - 3;
var diffDay = 0; // index of the date calculated by finding the difference of sliced(1-3) ID's.
var flag = -1; // to check if any of the time slot buttons are already selected or not. (stores index(sliced ID) of the button)
const appointment_date = new Date(); // object which will be stored as a string in a hidden input field
let appointment_date_string = document.getElementById('hdo');
function clicked(click){
    if(flag>-1){
        var unclicked = document.getElementById('b'+flag);  
        unclicked.style.backgroundColor = "white"
        unclicked.style.color = "black";
    }
    var clicked = document.getElementById(click);
    flag = click.slice(1,3);
    clicked.style.backgroundColor = "rgb(218,35,127)"
    clicked.style.color = "white";
    diffDay = click.slice(1,2);
    appointment_date.setDate(parseInt(day)+parseInt(diffDay)-1);
    appointment_date.setHours(clicked.value, 00, 00);
    appointment_date_string.value = appointment_date;
    // const s = new Date(appointment_date_object.value);
    // console.log(s);
}
