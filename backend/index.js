const express = require("express")
require("dotenv").config({ path: "./.env" })
const cors = require('cors')
const config = require("./config")
const app = express()

app.use(express.json())
app.use(cors({  origin: process.env.NODE_ENV === "production" ? process.env.LIVE_URL    : process.env.LOCAL_URL,  credentials: true }));

app.use("/api/auth", require("./routes/auth.routes"))

app.listen(process.env.PORT, () => {
    console.log(`mode: ${config.ENV}`)
    console.log(`server running on http://localhost:${process.env.PORT}`)
})

