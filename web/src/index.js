import { initStops } from "./stops.js";
import { initRoutes } from "./routes.js";
import { initLines } from "./lines.js";
import { initLogin } from "./login.js";
import { initHome } from "./home.js";
import { checkUser } from "./api.js";
import "@moaqzdev/toast";
import { toast } from "@moaqzdev/toast/utils";
import "@shoelace-style/shoelace/dist/themes/light.css";

const contentEl = document.querySelector(".content");
const links = document.querySelectorAll(".sidebar a");
const sidebar = document.querySelector(".sidebar");

document.querySelector("#logout").onclick = () => {
  localStorage.setItem("sessionToken", null);
  location.reload();
};

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
      initHome(contentEl);
      break;
  }
}

function initialLoad(defaultHash) {
  const initialHash = window.location.hash || defaultHash;
  const activeLink =
    [...links].find((l) => l.getAttribute("href") === initialHash) || links[0];
  setActive(activeLink);
  loadPage(initialHash);
}

async function setupPage() {
  const userData = await checkUser();
  console.log(userData);

  if (!userData?.logged_in) {
    sidebar?.remove();
    initLogin(contentEl);
  } else {
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

    initialLoad("#home");
  }
}

const toastEl = document.createElement("moaqz-toaster");
toastEl.setAttribute("dismissable", "");
document.querySelector("body").appendChild(toastEl);

// support native browser navigation
window.addEventListener("popstate", async () => {
  const currentHash = window.location.hash;
  console.log(currentHash);
  const currentLink = [...links].find((l) => l.classList.contains("active"));
  if (currentLink?.getAttribute("href") != currentHash) {
    await setupPage();
  }
});

(async () => {
  await setupPage();
})();
