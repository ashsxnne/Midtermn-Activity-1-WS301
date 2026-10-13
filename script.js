const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const drinkSelect = document.querySelector("#drink-select");
const previewDrink = document.querySelector("#preview-drink");
const previewTotal = document.querySelector("#preview-total");
const sweetnessChoices = [...document.querySelectorAll(".choice")];
const extras = [...document.querySelectorAll(".extra")];
const customMessage = document.querySelector("#custom-message");

let sweetness = "Less sweet";

function updateCup() {
  const selected = drinkSelect.options[drinkSelect.selectedIndex];
  const drinkName = selected.dataset.name;
  let total = Number(drinkSelect.value);
  extras.forEach((extra) => {
    if (extra.checked) total += Number(extra.value);
  });
  previewDrink.textContent = drinkName;
  previewTotal.textContent = `₱ ${total}`;
  return { drinkName, total };
}

drinkSelect.addEventListener("change", updateCup);
extras.forEach((extra) => extra.addEventListener("change", updateCup));

sweetnessChoices.forEach((button) => {
  button.addEventListener("click", () => {
    sweetnessChoices.forEach((choice) => choice.classList.remove("active"));
    button.classList.add("active");
    sweetness = button.dataset.sweet;
  });
});

document.querySelector("#build-cup").addEventListener("click", () => {
  const cup = updateCup();
  const selectedExtras = extras
    .filter((extra) => extra.checked)
    .map((extra) => extra.dataset.name);
  const extrasText = selectedExtras.length ? ` with ${selectedExtras.join(" + ")}` : "";
  customMessage.textContent = `${cup.drinkName}${extrasText} · ${sweetness.toLowerCase()} · ₱${cup.total}. Cute choice! ♡`;
});

document.querySelectorAll(".heart").forEach((heart) => {
  heart.style.cursor = "pointer";
  heart.setAttribute("role", "button");
  heart.setAttribute("tabindex", "0");
  heart.setAttribute("aria-label", "Save this flavor");
  const toggleHeart = () => {
    heart.classList.toggle("saved");
    heart.textContent = heart.classList.contains("saved") ? "♥" : "♡";
  };
  heart.addEventListener("click", toggleHeart);
  heart.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleHeart();
    }
  });
});
