import dotenv from "dotenv"
import { app } from "./app.js"

// Load environment variables from .env file
dotenv.config({
    path: './.env'
})

app.get("/", (req, res) => {
    res.send("Hello, World!")
})

// Global error handler for uncaught server errors
app.on('error', (err) => {
    console.error("Server Error", err)
    throw err
})

// Start the server
app.listen(process.env.PORT || 8000, () => {
    console.log(`listening on ${process.env.PORT}`)
})
