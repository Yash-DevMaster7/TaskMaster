require("dotenv").config();

const express = require("express");
const cors = require("cors");
const UserRouter = require("./routes/UserRouter");
const TodoRouter = require("./routes/TodoRouter");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/todo", TodoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
