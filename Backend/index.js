import  express  from "express";
import userRoutes from "./routes/user.js"
import companyRoutes from "./routes/company.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())



app.use("/api/users",userRoutes)
app.use("/api/companies",companyRoutes)

app.listen(8800, ()=>{
    console.log("API Working...")
})
