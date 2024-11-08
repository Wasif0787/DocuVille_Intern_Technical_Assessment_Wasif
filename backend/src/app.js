import express from 'express';
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.js"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))


//import routes
import imageRouter from "./routes/image.routes.js"

//router declarations
app.use("/api/v1/images", imageRouter)

app.use(errorHandler)

export { app };