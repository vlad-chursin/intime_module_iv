document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("form_modal");
  const openBtn = document.getElementById("open_modal");
  const closeBtn = document.querySelector(".close");

  const openModal = () => {
    if (!modal) return;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "";
    modal.setAttribute("aria-hidden", "true");
  };

  if (openBtn) {
    openBtn.addEventListener("click", openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.style.display === "block") {
      closeModal();
    }
  });
});

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

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu");
  const fullscreenMenu = document.getElementById("fullscreenMenu");
  const menuLinks = document.querySelectorAll(".menu-link");

  // Объявляем все необходимые переменные
  let animationFrameId;
  let closeTimer;
  let isMenuOpen = false;

  // Функция анимации ссылок
  const animateLinks = () => {
    menuLinks.forEach((link, index) => {
      link.style.opacity = "0";
      link.style.transform = "translateY(20px)";
      link.style.transition = `all 0.5s ease ${index * 0.1}s`;

      animationFrameId = requestAnimationFrame(() => {
        link.style.opacity = "1";
        link.style.transform = "translateY(0)";
      });
    });
  };

  // Функция сброса анимации
  const resetLinksAnimation = () => {
    menuLinks.forEach((link) => {
      link.style.opacity = "0";
      link.style.transform = "translateY(20px)";
    });
  };

  // Обработчик клика по кнопке меню
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle("active", isMenuOpen);
    fullscreenMenu.classList.toggle("active", isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    if (isMenuOpen) {
      animateLinks();
    } else {
      resetLinksAnimation();
    }
  };

  // Обработчик клика по ссылке
  const handleLinkClick = function (e) {
    e.preventDefault();
    const targetUrl = this.getAttribute("href");

    if (closeTimer) clearTimeout(closeTimer);

    isMenuOpen = false;
    menuToggle.classList.remove("active");
    fullscreenMenu.classList.remove("active");
    document.body.style.overflow = "auto";
    resetLinksAnimation();

    closeTimer = setTimeout(() => {
      window.location.href = targetUrl;
    }, 500);
  };

  // Назначение обработчиков событий
  menuToggle.addEventListener("click", toggleMenu);
  menuLinks.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  // Очистка при уходе со страницы
  window.addEventListener("beforeunload", () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (closeTimer) clearTimeout(closeTimer);
  });
});
