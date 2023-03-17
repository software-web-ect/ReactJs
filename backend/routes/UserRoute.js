import Express  from "express";

import { 
    getUser, 
    getUserId, 
    createUser, 
    deleteUser, 
    updateUser
} from "../controllers/User.js";

const Router =  Express.Router();

Router.get( '/User', getUser);
Router.get( '/User/:id', getUserId);
Router.post( '/User', createUser);
Router.patch( '/User/:id', updateUser);
Router.delete( '/User/:id', deleteUser);


export default Router;

