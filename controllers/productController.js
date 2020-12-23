const productModel = require("../models/productModel");
const httpStatus = require("http-status-codes");
const {getData} = require("../utils");

//@route: /api/products
//@method: GET
exports.getProducts = async (req,res)=>{
    try {
        const products = await productModel.findAll();
        res.writeHead(httpStatus.StatusCodes.OK,{"Content-Type" : "application/json"});
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
};

//@route : /api/products/[(0-9)+]
//@method : GET
exports.getProduct = async (req,res,id)=>{
    try {
        const product = await productModel.findById(id);
        if(!product){
            res.writeHead(httpStatus.StatusCodes.NOT_FOUND,{"Content-Type" : "application/json"});
            res.end(JSON.stringify({message : "Sorry we couldn't find what you are looking for!"}));
        }else{
            res.writeHead(httpStatus.StatusCodes.OK,{"Content-Type" : "application/json"});
            res.end(JSON.stringify(product));
        }
    } catch (error){
        console.log(error);
    }
};

//@route : /api/products
//@method : POST
exports.createProduct = async (req,res)=>{
    try {
        let product = await getData(req,res);
        product = JSON.parse(product);
        const newProduct = await productModel.create(product);
        res.writeHead(httpStatus.StatusCodes.CREATED,{"Content-type" : "application/json"});
        res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
};

//@route : /api/products/([0-9]+)
//@mathod : PUT
exports.updateProduct = async (req,res,id)=>{
    try {
        const product = await productModel.findById(id)
        let body = await getData(req,res);
        body = JSON.parse(body);
        const {name,description,price} = body;
        const productData = {
            name : name || product.name,
            description : description || product.description,
            price : price || product.price
        }
        const updProduct = await productModel.update(productData,id);
        res.writeHead(httpStatus.StatusCodes.OK,{"Content-Type" : "application/json"});
        res.end(JSON.stringify(updProduct));
    } catch (error) {
        console.log(error);
    }
};

//@route : api/products/([0-9]+)
//@method : "DELETE"
exports.deleteProduct = async (req,res,id)=>{
    try {
        const deletedProduct = await productModel.delete(id);
        if(!deletedProduct){
            res.writeHead(httpStatus.StatusCodes.NOT_FOUND,{"Content-Type" : "application/json"});
            res.end(JSON.stringify({message : "Sorry we couldn't find what you are looking for!"}));
        }else{
            res.writeHead(httpStatus.StatusCodes.OK,{"Content-Type" : "application/json"});
            res.end(JSON.stringify(deletedProduct));
        }

    } catch (error) {
        console.log(error);
    }
};

//@description : handling invalid requests
exports.handleInvalidRequest = (res)=>{
    res.writeHead(httpStatus.StatusCodes.BAD_REQUEST,{"Content-Type" : "application/json"});
    res.end(JSON.stringify({message : "Invalid Request"}));
}