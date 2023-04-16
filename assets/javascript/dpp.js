var b1 = document.getElementById('b1');
var b2 = document.getElementById('B2');
var b3 = document.getElementById('B3');
var b4 = document.getElementById('B4');
var before = document.getElementById('patient-content');
function changetab(tab){
    before.style.visibility = "hidden";
    before.style.height = 0;
    console.log(tab);
    var after = document.getElementById(tab);
    console.log(after);
    after.style.visibility = "visible";
    before = after;
}