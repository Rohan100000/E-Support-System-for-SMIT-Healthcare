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