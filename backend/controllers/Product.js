import Products from "../models/ProductModel.js";

export const getProducts= async  (req, res) =>{
    try {
        const products = await Products.findAll();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }  
} 

export const getProductsId= async  (req, res ) =>{
    try {
        const products = await Products.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(products[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createProducts = async(req, res) =>{
    try {
        await Products.create(req.body);
        res.json({
            "message": "Product Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateProducts = async(req, res) =>{
    try {
        await Products.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteProducts = async (req, res) =>{
    try {
        await Products.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}