document.getElementById("role").addEventListener("change", function () {
	const selectedRoleName =
		this.options[this.selectedIndex].dataset.roleName.toLowerCase();
	const partyContainer = document.querySelector(".party-container");
	const positionContainer = document.querySelector(".position-container");

	if (selectedRoleName === "candidate") {
		partyContainer.style.display = "block";
		positionContainer.style.display = "block";
		partyContainer.querySelector("select").setAttribute("required", true);
		positionContainer.querySelector("select").setAttribute("required", true);
	} else if (selectedRoleName === "voter") {
		partyContainer.style.display = "none";
		positionContainer.style.display = "none";
		partyContainer.querySelector("select").removeAttribute("required");
		positionContainer.querySelector("select").removeAttribute("required");
	} else {
		// Default behavior if another role is selected
		partyContainer.style.display = "none";
		positionContainer.style.display = "none";
		partyContainer.querySelector("select").removeAttribute("required");
		positionContainer.querySelector("select").removeAttribute("required");
	}
});
