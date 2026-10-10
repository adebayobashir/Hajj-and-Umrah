"use strict";
// REPLACE THIS before publishing: international digits only, no +, spaces or dashes.
// Example Nigeria: 2348012345678. This is a placeholder, NOT an actual business number.
const WHATSAPP_NUMBER = "2348139302700";
const BASE_MESSAGE =
  "Assalamu alaikum. I would like information about AscendMind Hajj and Umrah Services.";
const menu = document.querySelector("#menu");
const nav = document.querySelector("#nav");
menu.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }),
);
document.querySelector("#year").textContent = new Date().getFullYear();
const validWhatsAppNumber = /^\d{10,15}$/.test(WHATSAPP_NUMBER);
const whatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const floating = document.querySelector("#whatsappFloat");
if (validWhatsAppNumber) {
  floating.href = whatsAppLink(BASE_MESSAGE);
} else {
  floating.href = "#register";
  floating.title = "Configure the official WhatsApp number in script.js";
  floating.removeAttribute("target");
}
document.querySelectorAll("[data-package]").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("#package").value = link.dataset.package;
  });
});
const form = document.querySelector("#registrationForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#formStatus");
  if (!form.reportValidity()) return;
  if (!validWhatsAppNumber) {
    status.textContent =
      "Website administrator: set a valid official WhatsApp number in script.js before accepting enquiries.";
    return;
  }
  const data = new FormData(form);
  const clean = (key) =>
    String(data.get(key) || "")
      .trim()
      .replace(/[\r\n]+/g, " ");
  const travellers = Number(clean("travellers"));
  if (!Number.isInteger(travellers) || travellers < 1 || travellers > 100)
    return;
  const message = [
    "Assalamu alaikum. AscendMind pilgrimage enquiry:",
    `Name: ${clean("fullName")}`,
    `Email: ${clean("email")}`,
    `Phone: ${clean("phone")}`,
    `Country: ${clean("country")}`,
    `Service: ${clean("package")}`,
    `Travellers: ${travellers}`,
    `Message: ${clean("message") || "None"}`,
    "Please contact me with current options and next steps.",
  ].join("\n");
  status.textContent =
    "WhatsApp is opening. Please review and send your message there to complete the enquiry.";
  window.open(whatsAppLink(message), "_blank", "noopener,noreferrer");
});
