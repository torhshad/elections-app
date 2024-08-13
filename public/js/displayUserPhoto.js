document.getElementById("photo").addEventListener("change", function (event) {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const img = document.getElementById("preview");
			img.src = e.target.result;
			img.style.display = "block"; // Showing the image of my user
		};
		reader.readAsDataURL(file);
	}
});
