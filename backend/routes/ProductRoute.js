import Express  from "express";
import { 
    getProducts, 
    getProductsId, 
    createProducts, 
    deleteProducts, 
    updateProducts

} from "../controllers/Product.js";

const Router =  Express.Router();

Router.get( '/Product', getProducts);
Router.get( '/Product/:id', getProductsId);
Router.post( '/Product', createProducts);
Router.patch( '/Product/:id', deleteProducts);
Router.delete( '/Product/:id', updateProducts);

export default Router;

