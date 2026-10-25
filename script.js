
/*
  STC Sadguru Transport Company Website
  WhatsApp and calling numbers configured.
*/

const BUSINESS_WHATSAPP = "919175083454";
const BUSINESS_PHONE = "+919823253030";

// Display current year in the footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after selecting a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
    menuToggle.textContent = "☰";
  });
});

// Validate WhatsApp number
function isWhatsAppConfigured() {
  return /^\d{10,15}$/.test(BUSINESS_WHATSAPP);
}

// WhatsApp buttons
document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = `https://wa.me/${BUSINESS_WHATSAPP}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  link.addEventListener("click", (event) => {
    if (!isWhatsAppConfigured()) {
      event.preventDefault();
      alert("Please check the WhatsApp number in script.js.");
    }
  });
});

// Call buttons
document.querySelectorAll("[data-call]").forEach((link) => {
  link.href = `tel:${BUSINESS_PHONE.replace(/[^\d+]/g, "")}`;
});

// Transport quote form
const quoteForm = document.getElementById("quoteForm");
const formStatus = document.getElementById("formStatus");

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isWhatsAppConfigured()) {
    formStatus.textContent =
      "Please check the WhatsApp number in script.js.";
    return;
  }

  const data = new FormData(quoteForm);

  const message = [
    "STC Sadguru Transport Company - Transport Quote Enquiry",
    `Name: ${data.get("customerName")}`,
    `Business: ${data.get("companyName") || "Not provided"}`,
    `Phone: ${data.get("phone")}`,
    `Goods: ${data.get("goodsType")}`,
    `Pickup: ${data.get("pickup")}`,
    `Destination: ${data.get("destination")}`,
    `Vehicle requirement: ${data.get("vehicle")}`,
    `Pickup date: ${data.get("date") || "Not specified"}`,
    `Additional details: ${data.get("details") || "None"}`
  ].join("\n");

  const url =
    `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

  formStatus.textContent =
    "Your enquiry is ready in WhatsApp. Review the details and press Send.";
});
