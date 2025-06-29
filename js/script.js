document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
});

window.addEventListener("load", () => {
  clearInterval(interval);
  progressBar.style.width = "100%";
  setTimeout(() => {
    progressBar.style.opacity = "0";
    document.body.style.overflow = "auto";
  }, 500);
});

const modal = document.getElementById("form_modal");
const btn = document.getElementById("open_modal");
const span = document.getElementsByClassName("close")[0];

// btn.onclick = function () {
//   modal.style.display = "block";
// };

// span.onclick = function () {
//   modal.style.display = "none";
// };

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

function setupStaggeredAppear(imgs, baseDelay = 500) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "scale(1)";
          }, baseDelay * index);
        }
      });
    },
    { threshold: 0.1 }
  );

  [...imgs].forEach((img, i) => {
    img.style.opacity = 0;
    img.style.transform = "scale(0.9)";
    img.style.transition = `all 0.8s ease ${baseDelay * i}ms`;
    observer.observe(img);
  });
}

setupStaggeredAppear(document.querySelectorAll(".float_img"), 300);

function setupImageZoom(selector = ".zoom_img", scale = 1.05, duration = 0.5) {
  document.querySelectorAll(selector).forEach((img) => {
    img.style.transition = `transform ${duration}s ease, box-shadow ${duration}s ease`;

    img.addEventListener("mouseenter", () => {
      img.style.transform = `scale(${scale})`;
      img.style.zIndex = "10";
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
      img.style.zIndex = "";
    });
  });
}

setupImageZoom(".zoom_img", 1.05, 0.7);

document.querySelectorAll(".card_calendar").forEach((card) => {
  card.style.transition = "transform 0.3s ease";

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 20;
    const moveY = (y - centerY) / 20;

    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
