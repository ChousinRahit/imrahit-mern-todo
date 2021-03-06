const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");


const connectDB = require("./config/db");

connectDB();

app.use(express.json({ extended: false }));

app.use(cors());

app.use("/myTodos", require("./api/todos"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
