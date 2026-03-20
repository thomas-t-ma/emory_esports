function handleSubmit(e) {
  e.preventDefault();
  alert("Application submitted! Connect this to Formspree or a backend.");
}

const targetDate = new Date("March 29, 2026 11:00:00 GMT-0400");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  const el = document.getElementById("countdown");
  if (!el) return;

  el.style.cursor = "pointer";
  el.onclick = () => {
    window.open("PASTE_YOUR_GOOGLE_FORM_LINK_HERE", "_blank");
  };

  if (diff <= 0) {
    el.innerHTML = `
      <span class="date">March 29, 2026</span>
      <span class="time">EagleCon is LIVE!</span>
      <span class="countdown-link-text">Click here to fill out the interest form!</span>
    `;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  el.innerHTML = `
    <span class="date">March 29, 2026</span>
    <span class="time">${days} days ${hours} hours ${minutes} minutes ${seconds} seconds</span>
    <span class="countdown-link-text">Click here to fill out the interest form!</span>
  `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// async function loadScheduleTable() {
//   const table = document.getElementById("schedule-table");
//   if (!table) return;

//   const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQVYp7m7xVBRYChmrDgPikWKwoFIU7svHm2E7PfOKmuAJ0bnhZ3LW3_jtXMFUaOMwhMMR2jnktN14xH/pub?gid=0&single=true&output=csv";

//   try {
//     const response = await fetch(csvUrl);
//     const csvText = await response.text();

//     const rows = csvText.trim().split("\n").map(row =>
//       row.split(",").map(cell => cell.replace(/^\"|\"$/g, "").trim())
//     );

//     if (!rows.length) return;

//     const thead = document.createElement("thead");
//     const tbody = document.createElement("tbody");

//     const headerRow = document.createElement("tr");
//     rows[0].forEach(cell => {
//       const th = document.createElement("th");
//       th.textContent = cell;
//       headerRow.appendChild(th);
//     });
//     thead.appendChild(headerRow);

//     rows.slice(1).forEach(row => {
//       const tr = document.createElement("tr");
//       row.forEach(cell => {
//         const td = document.createElement("td");
//         td.textContent = cell;
//         tr.appendChild(td);
//       });
//       tbody.appendChild(tr);
//     });

//     table.innerHTML = "";
//     table.appendChild(thead);
//     table.appendChild(tbody);
//   } catch (error) {
//     table.innerHTML = "<tr><td>Unable to load schedule.</td></tr>";
//     console.error(error);
//   }
// }

// loadScheduleTable();

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("show");
  }
}

function applyParallax() {
  const blocks = document.querySelectorAll(".feature-block");

  blocks.forEach(block => {
    const img = block.querySelector("img");
    if (!img) return;

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom > 0 && rect.top < windowHeight) {
      const progress = (rect.top + rect.height / 2 - windowHeight / 2) / windowHeight;
      const offset = progress * -20;
      img.style.transform = `scale(1.08) translateY(${offset}px)`;
    }
  });
}

window.addEventListener("scroll", applyParallax);
window.addEventListener("load", applyParallax);

function revealSections() {
  const sections = document.querySelectorAll(".fade-in-section");

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

function showSlide(slideshowId, index) {
  const slideshow = document.getElementById(slideshowId);
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll(".slide");
  const dots = slideshow.querySelectorAll(".dot");
  if (!slides.length) return;

  let currentIndex = Number(slideshow.dataset.currentIndex || 0);

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  slideshow.dataset.currentIndex = index;
}

function changeSlide(slideshowId, direction) {
  const slideshow = document.getElementById(slideshowId);
  if (!slideshow) return;

  const currentIndex = Number(slideshow.dataset.currentIndex || 0);
  showSlide(slideshowId, currentIndex + direction);

  resetSlideshowTimer(slideshowId); // 🔥 reset timer here
}

function goToSlide(slideshowId, index) {
  showSlide(slideshowId, index);

  resetSlideshowTimer(slideshowId); // 🔥 reset here too
}

function startSlideshow(slideshowId, intervalMs = 4000) {
  const slideshow = document.getElementById(slideshowId);
  if (!slideshow) return;

  slideshow.dataset.currentIndex = "0";

  // clear any existing timer first
  if (slideshow._timer) {
    clearInterval(slideshow._timer);
  }

  showSlide(slideshowId, 0);

  slideshow._timer = setInterval(() => {
    const currentIndex = Number(slideshow.dataset.currentIndex || 0);
    showSlide(slideshowId, currentIndex + 1);
  }, intervalMs);
}

function resetSlideshowTimer(slideshowId, intervalMs = 4000) {
  const slideshow = document.getElementById(slideshowId);
  if (!slideshow) return;

  if (slideshow._timer) {
    clearInterval(slideshow._timer);
  }

  slideshow._timer = setInterval(() => {
    const currentIndex = Number(slideshow.dataset.currentIndex || 0);
    showSlide(slideshowId, currentIndex + 1);
  }, intervalMs);
}


function setupSlideshowDots(slideshowId) {
  const slideshow = document.getElementById(slideshowId);
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll(".slide");
  const dotsContainer = slideshow.querySelector(".slide-dots");
  if (!dotsContainer) return;

  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    if (index === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.onclick = () => goToSlide(slideshowId, index);
    dotsContainer.appendChild(dot);
  });
}


window.addEventListener("load", () => {
  setupSlideshowDots("workshopSlideshow");
  startSlideshow("workshopSlideshow", 4500);
});