const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = 5050;

// Connect to the database
connectDB();
// Ask the server to accept JSON objects in the body of the POST/GET requests
app.use(express.json({ extended: false }));

// Make a request to "http://localhost:5050" to see if it's running
app.get("/", (req, res) => res.send("API Running"));

// All the routes on ./routes/api/users are behind the main route /api/users
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/sessions", require("./routes/api/tutoringsessions"));
app.use("/api/tutors", require("./routes/api/tutors"));
app.use("/admin/subjects", require("./routes/admin/subjects"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
