const header = document.querySelector(".header");
const burgerButton = document.querySelector(".burger-button");
const mobileNavigationLinks = document.querySelectorAll(
    ".mobile-navigation a"
);

function closeMobileMenu() {
    header.classList.remove("menu-open");
    document.body.classList.remove("menu-open");

    burgerButton.setAttribute("aria-expanded", "false");
    burgerButton.setAttribute("aria-label", "Open navigation menu");
}

burgerButton.addEventListener("click", () => {
    const menuIsOpen = header.classList.toggle("menu-open");

    document.body.classList.toggle("menu-open", menuIsOpen);

    burgerButton.setAttribute("aria-expanded", String(menuIsOpen));
    burgerButton.setAttribute(
        "aria-label",
        menuIsOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

mobileNavigationLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});