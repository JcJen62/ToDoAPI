import express from "express";
import path from "path";
import apiRouter from "./routes/api.route.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const app = express();
const port = 5000;

app.use(express.json())
app.use("/api", apiRouter)
app.use((req, res, next) =>{
    res.status(404).json({
        Message: "route not found."
    })
})

app.use(express.urlencoded({extended:true}))

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})