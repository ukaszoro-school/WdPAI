import { initStops } from "./stops.js";
import { initRoutes } from "./routes.js";
import { initLines } from "./lines.js";
import "@moaqzdev/toast";
import { toast } from "@moaqzdev/toast/utils";

const contentEl = document.querySelector(".content");
const links = document.querySelectorAll(".sidebar a");

function setActive(link) {
  links.forEach((l) => l.classList.remove("active"));
  link.classList.add("active");
}

function loadPage(hash) {
  switch (hash) {
    case "#stops":
      initStops(contentEl);
      break;
    case "#routes":
      initRoutes(contentEl);
      break;
    case "#lines":
      initLines(contentEl);
      break;
    case "#home":
    default:
      contentEl.innerHTML = "<h2>Welcome to Fleet Manager</h2>";
      break;
  }
}

function initialLoad(defaultHash) {
    const initialHash = window.location.hash || defaultHash;
    const activeLink = [...links].find((l) => l.getAttribute("href") === initialHash) || links[0];
    setActive(activeLink);
    loadPage(initialHash);
}

// sidebar navigation
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const hash = link.getAttribute("href");
    setActive(link);
    loadPage(hash);
    window.location.hash = hash;
  });
});

const toastEl = document.createElement("moaqz-toaster");
toastEl.setAttribute("dismissable", "");
document.querySelector("body").appendChild(toastEl);

initialLoad("#home");
