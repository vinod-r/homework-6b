//declaring and assigning DOM elements in about page

const closeButton = document.getElementById("close-modal");
const modalBackground = document.getElementById("about-modal");

//close function event listeners on modal background and close button

modalBackground.addEventListener("click", (e) => {
  //checking if modal background is clicked or modal's child element is clicked
  if (e.target === e.currentTarget) {
    history.go(-1);
  }
});
closeButton.addEventListener("click", () => {
  //going back when clicking the close button
  history.go(-1);
});
