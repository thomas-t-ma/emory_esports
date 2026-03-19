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

  if (diff <= 0) {
    el.innerHTML = `
      <span class="date">March 29, 2026</span>
      <span class="time">EagleCon is LIVE!</span>
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
  `;
}

setInterval(updateCountdown, 1000);
updateCountdown();
