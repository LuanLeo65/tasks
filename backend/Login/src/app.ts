import express from "express"
import cors from "cors"
import routes from "./routes/routes"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors())

app.use(routes)

export default app