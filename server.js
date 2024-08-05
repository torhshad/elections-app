// const express = require("express");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const app = express();
// const ejs = require("ejs");

// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database("./election.db");

// db.serialize(() => {
//   db.run(
//     "CREATE TABLE IF NOT EXISTS auth  (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, password TEXT)"
//   );
//   db.run(
//     "CREATE TABLE IF NOT EXISTS voter_reg  (id INTEGER PRIMARY KEY, first_name TEXT, middle_name TEXT, last_name TEXT, dob TEXT, address TEXT, city TEXT, county TEXT, email TEXT, phone_number INTERGER, photo BLOG, userId INTEGER)"
//   );
//   // db.run(
//   //   "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, first_name TEXT, middle_name TEXT, last_name TEXT,  dob TEXT, role_Id INTEGER, photo BLOG, party_id)"
//   // );
//   // db.run(
//   //   "CREATE TABLE IF NOT EXISTS parties (id INTEGER PRIMARY KEY, party_Name TEXT, logo BLOG)"
//   // );
//   // const auth_table = db.prepare(
//   //   "INSERT INTO auth (name, email, userId) VALUES (?, ?, ?)"
//   // );
//   // auth_table.run("Samuel", "samuel@example.com", 1);
//   // auth_table.finalize();
//   // const users_table = db.prepare(
//   //   "INSERT INTO users (first_name, middle_name, last_name, dob, role_Id, party_id) VALUES (?, ?, ?, ?, ?, ?)"
//   // );
//   // users_table.run("Samuel", "S", "Kyne", "2010-03-02", 1, 2);
//   // users_table.finalize();
//   // const parties_table = db.prepare(
//   //   "INSERT INTO parties (party_name) VALUES (?)"
//   // );
//   // parties_table.run("CDC");
//   // parties_table.finalize();
//   // db.each("SELECT * FROM auth", (err, row) => {
//   //   if (err) {
//   //     console.error(err.message);
//   //   }
//   //   console.log(row);
//   // });
//   // db.each("SELECT * FROM users", (err, row) => {
//   //   if (err) {
//   //     console.error(err.message);
//   //   }
//   //   console.log(row);
//   // });
// });
// // db.close();

// // db.serialize(() => {
// //   db.run("CREATE TABLE auth ()");
// //   let x = db.prepare("INSERT INTO auth VALUES (?, ?, ?)");
// //   x.run(4, "peter", "secret");
// //   for (let i = 0; i < 10; i++) {
// //     stmt.run(`Ipsum ${i}`);
// //   }
// //   stmt.run(`Ipsum ${i}`);

// //   x.finalize();

// //   db.each("SELECT * from auth", (err, row) => {
// //     console.log(row);
// //     5;
// //   });
// // });

// app.set("view engine", "ejs");

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.render("dashboard");
// });

// app.get("/voter-registration", (req, res) => {
//   res.render("voter-registration");
// });

// // app.get("/login", (req, res) => {
// //   res.render("login");
// // });

// // app.post("/", (req, res) => {
// //   const { email, password } = req.body;
// //   let getUserDetails = `SELECT * FROM auth WHERE email = ${email}`;
// //   let checkInDb = db.get(getUserDetails);
// //   console.log(checkInDb);

// //   if (checkInDb === undefined) {
// //     res.send("Invalid user");
// //   } else {
// //     const isPasswordMatched = bcrypt.compare(password, checkInDb.password);
// //     if (isPasswordMatched) {
// //       res.render("dashboard");
// //     } else {
// //       res.send("Invalid email or password!");
// //     }
// //   }
// // });

// app.get("/signup", (req, res) => {
//   res.render("signup");
// });

// app.post("/", (req, res) => {
//   const { fName, lName, email, password } = req.body;
//   // const  = req.body.fName;
//   // const  = req.body.lName;
//   // const  = req.body.email;
//   // const  = req.body.password;

//   db.run(
//     "INSERT INTO auth (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
//     [fName, lName, email, password],
//     (err) => {
//       if (err) {
//         console.error(err.message);
//         res.send("Error saving data");
//       } else {
//         res.render("dashboard");
//       }
//     }
//   );
//   // console.log(firstName, lastName, email, password);

//   // if (!firstName || !lastName || !email || !password) {
//   //   res.send("<h1>Please signup correctly</h1>");
//   // } else {
//   //   res.render("dashboard");
//   // }
// });

// app.post("/submit_registration", (req, res) => {
//   const {
//     fName,
//     mName,
//     lName,
//     dob,
//     address,
//     city,
//     county,
//     email,
//     phone,
//     photo,
//   } = req.body;

//   db.run(
//     "INSERT INTO voter_reg (first_name, middle_name, last_name, dob, address, city, county, email, phone_number, photo, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)",
//     [fName, mName, lName, dob, address, city, county, email, phone, photo],
//     (err) => {
//       if (err) {
//         console.error(err.message);
//         res.send("Error saving data");
//       } else {
//         res.render("submit_registration");
//       }
//     }
//   );
// });
// // const  = req.body.name;
// // const  = req.body.dob;
// // const  = req.body.address;
// // const  = req.body.city;
// // const  = req.body.county;
// // const  = req.body.email;
// // const  = req.body.phone;
// // const  = req.body.photo;

// // console.log(firstName, lastName, email, password);

// // if (!name || !dob || !address || !city || !county || !phone || !photo) {
// //   res.send("<h1>Please signup correctly</h1>");
// // } else {
// //   res.render("submit_registration");
// // }

// // app.post("/", (req, res) => {
// //   const email = req.body.email;
// //   const password = req.body.password;

// //   if (email === email && password === password) {
// //     res.render("dashboard");
// //   } else {
// //     res.send("wrong email or password");
// //   }
// // });

// app.listen(3000, () => {
//   console.log("app is running on port 3000");
// });

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const ejs = require("ejs");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./election.db");

db.serialize(() => {
	db.run(
		"CREATE TABLE IF NOT EXISTS auth  (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, password TEXT)"
	);
	db.run(
		"CREATE TABLE IF NOT EXISTS users  (id INTEGER PRIMARY KEY, first_name TEXT, middle_name TEXT, last_name TEXT, dob TEXT, address TEXT, city TEXT, county TEXT, email TEXT, phone_number INTERGER, photo BLOB, roleId INTEGER)"
	);

	// db.run(
	// 	"CREATE TABLE IF NOT EXISTS roles  (id INTEGER PRIMARY KEY, role TEXT,)"
	// );
});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("dashboard");
});

app.get("/voter-registration", (req, res) => {
	db.all("SELECT * FROM roles", (err, rows) => {
		console.log(rows);
		res.render("voter-registration", { roles: rows });
	});
	// res.render("voter-registration");
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
				res.render("dashboard");
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
						res.render("dashboard");
					}
				}
			);
		}
	});
});

//   db.run(
//     "INSERT INTO auth (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
//     [fName, lName, email, hashedPassword],
//     (err) => {
//       if (err) {
//         console.error(err.message);
//         res.send("Error saving data");
//       } else {
//         res.render("dashboard");
//       }
//     }
//   );
// });

// if (err) {
// 	console.error(err.message);
// 	res.status(500).send("Database error");
// 	return;
// }

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
