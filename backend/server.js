const express = require("express")
require("dotenv").config();
const dbConnection = require("./config/database")
const cors = require("cors")
const router = require("./routes/routes")
const PORT = process.env.PORT;


const app = express();

dbConnection()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
}));

app.use("/api/v1", router)


app.listen(PORT, () => {
    console.log(`Server is running at port on ${PORT}`)
});

