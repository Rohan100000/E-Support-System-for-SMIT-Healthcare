const text = document.querySelector(".sec-text");
const textLoad = () => {
  setTimeout(() => {
      text.textContent = "EXPERT MEDICAL TREATMENT";
  }, 0);
  setTimeout(() => {
      text.textContent = "MEDICAL SERVICES AT YOUR HOME";
  }, 7000);
  setTimeout(() => {
      text.textContent = "FREE MEDICAL CHECK UP";
  }, 14000);
  setTimeout(() => {
      text.textContent = "MEDICAL SERVICES AT YOUR FINGER TIPS";
  }, 21000);
}
textLoad();
setInterval(textLoad, 28000);