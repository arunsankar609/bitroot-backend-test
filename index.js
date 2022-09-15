const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors")
const app = express()

const { errorHandler, notfound } = require("./Server/Middlewares/ErrorMiddleware")
const contactRouter = require("./Server/Routes/contactRoutes")
require("./Server/Database/Database")()
require("dotenv").config();

const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json());

app.use("/api/contact", contactRouter)

app.use(notfound)
app.use(errorHandler)



mongoose.connection.once("open", () => {
    console.log("Connected to mongodb");
    app.listen(port, () => {
        console.log(`Listening to PORT ${port}...`);
    });
});