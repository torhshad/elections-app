const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const ejs = require("ejs");
const path = require("path");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./election.db");

db.serialize(() => {
	db.run(
		"CREATE TABLE IF NOT EXISTS auth  (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, password TEXT)"
	);
	db.run(
		"CREATE TABLE IF NOT EXISTS users  (id INTEGER PRIMARY KEY, first_name TEXT, middle_name TEXT, last_name TEXT, dob TEXT, address TEXT, city TEXT, county TEXT, email TEXT, phone_number INTERGER, photo BLOB, roleId INTEGER)"
	);

	db.run(
		"CREATE TABLE IF NOT EXISTS parties  (id INTEGER PRIMARY KEY, party_name TEXT , logo BLOB)"
	);

	// db.run("INSERT OR IGNORE INTO parties (party_name) VALUES (?), (?)", [
	// 	"SUP",
	// 	"SIM",
	// ]);

	db.get("SELECT id FROM parties WHERE party_name = ?", ["SUP"], (err, row) => {
		if (!row) {
			db.run("INSERT INTO parties (party_name) VALUES (?)", ["SUP"]);
		}
	});

	db.get("SELECT id FROM parties WHERE party_name = ?", ["SIM"], (err, row) => {
		if (!row) {
			db.run("INSERT INTO parties (party_name) VALUES (?)", ["SIM"]);
		}
	});

	db.get(
		"SELECT id FROM positions WHERE position = ?",
		["President"],
		(err, row) => {
			if (!row) {
				db.run("INSERT INTO positions (position) VALUES (?)", ["President"]);
			}
		}
	);

	db.get(
		"SELECT id FROM positions WHERE position = ?",
		["Vice President"],
		(err, row) => {
			if (!row) {
				db.run("INSERT INTO positions (position) VALUES (?)", [
					"Vice President",
				]);
			}
		}
	);
});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	// res.render("dashboard");
	res.render("dashboard", {
		path: "/",
		pageTitle: "Dashboard",
		registeredVoters: 20,
		totalVotes: 20,
		candidates: [
			{ name: "Shad", votes: 10, percentage: 20 },
			{ name: "Torh", votes: 30, percentage: 50 },
		],
	});
});

app.get("/voter-registration", (req, res) => {
	// Query to get roles from my database
	db.all("SELECT * FROM roles", (err, roles) => {
		if (err) {
			console.error(err.message);
			return res.status(500).send("Failed to get roles.");
		}

		// Query to get parties from my database
		db.all("SELECT * FROM parties", (err, parties) => {
			if (err) {
				console.error(err.message);
				return res.status(500).send("Failed to get parties.");
			}

			// Query to get positions from my database
			db.all("SELECT * FROM positions", (err, positions) => {
				if (err) {
					console.error(err.message);
					return res.status(500).send("Failed to get positions .");
				}

				// Render the page with all data  that was fetched from my database
				res.render("voter-registration", { roles, parties, positions });
			});
		});
	});
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", (req, res) => {
	const { email, password } = req.body;
	const getUserDetails = "SELECT * FROM auth WHERE email = ?";

	db.get(getUserDetails, [email], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Error retrieving data");
		} else if (row === undefined) {
			res.send("Invalid user");
		} else {
			const isPasswordMatched = bcrypt.compareSync(password, row.password);
			if (isPasswordMatched) {
				res.render("dashboard", {
					path: "/",
					registeredVoters: 20,
					totalVotes: 20,
					candidates: [
						{ name: "Shad", votes: 0, percentage: 0 },
						{ name: "Torh", votes: 0, percentage: 0 },
					],
				});
			} else {
				res.send("Invalid email or password!");
			}
		}
	});
});

app.get("/signup", (req, res) => {
	res.render("signup");
});

app.post("/signup", (req, res) => {
	const { fName, lName, email, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);

	db.get("SELECT email FROM auth WHERE email = ?", [email], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Error checking email");
		} else if (row) {
			res.render("email-error-message");
		} else {
			const hashedPassword = bcrypt.hashSync(password, 10);
			db.run(
				"INSERT INTO auth (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
				[fName, lName, email, hashedPassword],
				(err) => {
					if (err) {
						console.error(err.message);
						res.send("Error saving data");
					} else {
						res.render("dashboard", {
							path: "/",
							registeredVoters: 20,
							totalVotes: 20,
							candidates: [
								{ name: "Shad", votes: 0, percentage: 0 },
								{ name: "Torh", votes: 0, percentage: 0 },
							],
						});
					}
				}
			);
		}
	});
});

app.post("/submit_registration", (req, res) => {
	const {
		fName,
		mName,
		lName,
		dob,
		address,
		city,
		county,
		email,
		phone,
		photo,
	} = req.body;

	db.run(
		"INSERT INTO users (first_name, middle_name, last_name, dob, address, city, county, email, phone_number, photo, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)",
		[fName, mName, lName, dob, address, city, county, email, phone, photo],
		(err) => {
			if (err) {
				console.error(err.message);
				res.send("Error saving data");
			} else {
				res.render("submit_registration");
			}
		}
	);
});

app.listen(3000, () => {
	console.log("app is running on port 3000");
});
