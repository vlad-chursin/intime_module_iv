const modal = document.getElementById("form_modal");
const btn = document.getElementById("open_modal");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// document.addEventListener("keydown", function (event) {
//   if (event.key === "Escape" && modal.style.display === "block") {
//     modal.style.display = "none";
//   }
// });

document.body.style.overflow = "hidden";
document.body.style.overflow = "auto";
