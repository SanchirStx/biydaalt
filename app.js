const express = require("express");
require("dotenv").config();
const connetDB = require("./data");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment")

const app = express();
connetDB();
app.use(express.json());
app.use("/api/v2/category", categoryRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/user", userRouter);
app.use("/api/v2/comment", commentRouter)
app.listen(process.env.port, () => {
  console.log(`server listen ${process.env.port}`);
});