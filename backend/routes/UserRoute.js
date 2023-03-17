import Express  from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

import { 
    getUser, 
    getUserId, 
    createUser, 
    deleteUser, 
    updateUser,
    Login,
    Logout 
} from "../controllers/User.js";

const Router =  Express.Router();

Router.get( '/User', verifyToken,getUser);
Router.get( '/User/:id', getUserId);
Router.post( '/User', createUser);
Router.patch( '/User/:id', updateUser);
Router.delete( '/User/:id', deleteUser);
Router.post('/login', Login);
Router.get('/token', refreshToken);
Router.delete('/logout', Logout);


export default Router;

