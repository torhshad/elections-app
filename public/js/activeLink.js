const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
	if (link.getAttribute("href") === currentPath) {
		link.classList.add("active");
	}

	link.addEventListener("click", function () {
		navLinks.forEach((link) => link.classList.remove("active"));
		this.classList.add("active");
	});
});
