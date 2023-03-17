import express  from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import dotenv from  "dotenv";
import UserRoute  from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

// (async () => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));
app.use(cors({
    Credential: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);

app.listen(process.env.APP_PORT,()=>{
    console.log('server up running..');
});

