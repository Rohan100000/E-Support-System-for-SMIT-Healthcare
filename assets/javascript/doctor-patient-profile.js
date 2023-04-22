var before = document.getElementById('patient-content');
var beforebutton = document.getElementById('b1');
var appointmentbutton = document.getElementById('b2');
const currenttab = document.getElementById('patient-visits');
beforebutton.style.backgroundColor = "white";
console.log(document.cookie);
var cookiedata = document.cookie.split('; ')[0];
var cookiedata1 = document.cookie.split('; ')[1];
console.log(cookiedata1);
if(cookiedata1 == 'appointment' || cookiedata == 'appointment'){
    // var before = document.getElementById('patient-content');
    before.style.visibility = "hidden";
    beforebutton.style.backgroundColor = "lightgray";
    before.style.height = 0;
    appointmentbutton.style.backgroundColor = "white";
    currenttab.style.visibility = 'visible';
    document.cookie='empty';
    // console.log(document.cookie);
}
if(cookiedata == 'profile'){
    // var before = document.getElementById('patient-content');
    before.style.visibility = "visible";
    beforebutton.style.backgroundColor = "white";
    appointmentbutton.style.backgroundColor = "lightgrey";
    currenttab.style.visibility = 'hidden';
    currenttab.style.height = 0;
    document.cookie='empty';
    // console.log(document.cookie);
}
function changetab(tab, tabid){
    appointmentbutton.style.backgroundColor = "lightgrey";
    currenttab.style.height = 0;
    currenttab.style.visibility = 'hidden';
    beforebutton.style.backgroundColor = "lightgray";
    before.style.visibility = "hidden";
    before.style.height = 0;
    var after = document.getElementById(tab);
    var afterid = document.getElementById(tabid);
    after.style.visibility = "visible";
    afterid.style.backgroundColor = "white";
    before = after;
    beforebutton = afterid;
}