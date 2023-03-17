import express  from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize"; 
import dotenv from  "dotenv";
import UserRoute  from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRouter from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const Store = new sessionStore({
    db:db
});

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

(async () => {
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    Store: Store,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));
app.use(cors({
    Credential: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRouter);

// Store.sync();

app.listen(process.env.APP_PORT,()=>{
    console.log('server up running..');
});

