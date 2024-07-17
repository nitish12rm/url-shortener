 const express = require("express");
const {connectToMongoDb} = require("./connect")
const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url").then(()=>console.log("mongodb connected"));
const urlRoutes = require("./src/routes/routes");
app.use(express.json());
app.use("/api",urlRoutes);

app.listen(PORT,()=> console.log("Server started at PORT:${Port}"));