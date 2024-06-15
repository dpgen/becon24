let followBeconState = true;
document.querySelector(".follow-becon").addEventListener("click", () => {
  followBeconState
    ? document
        .querySelector(".social-media")
        .classList.add("social-media-hover")
    : document
        .querySelector(".social-media")
        .classList.remove("social-media-hover");
  followBeconState = !followBeconState;
});
let followBeconMobileState = true;

document.querySelector(".mobile-dropdwon").addEventListener("click", () => {
  followBeconMobileState
    ? document
        .querySelector(".social-media")
        .classList.add("social-media-hover")
    : document
        .querySelector(".social-media")
        .classList.remove("social-media-hover");
  followBeconMobileState = !followBeconMobileState;
});

document
  .querySelector(".mobile-nav-hamburger")
  .addEventListener("click", () => {
    document.querySelector(".mobile-nav-content-wrap").style.transform =
      "translateX(0vw)";
  });
document.querySelector(".mobile-nav-btn").addEventListener("click", () => {
  document.querySelector(".mobile-nav-content-wrap").style.transform =
    "translateX(100vw)";
});
document
  .querySelectorAll(".mobile-nav-link")[1]
  .addEventListener("click", () => {
    document.querySelector(".mobile-nav-content-wrap").style.transform =
      "translateX(100vw)";
  });
