import express from "express";
import https from "https";


const server = https.createServer();

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})

const app = express();


app.get("/health", (req, res) => {
     res.json({ status: "Ok" });
})