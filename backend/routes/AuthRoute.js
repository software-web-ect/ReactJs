import Express  from "express";
import {Login,  Me} from "../controllers/Auth.js";
const Router =  Express.Router();

Router.get( '/Me', Me);
Router.post( '/Login', Login);

export default Router;

