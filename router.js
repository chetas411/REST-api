const {getProducts,getProduct,createProduct,updateProduct,handleInvalidRequest,deleteProduct} = require("./controllers/productController");

const routes = {
    "GET" : {
        "/api/products" : function (req,res){
            getProducts(req,res);
        },
        "id" : function (req,res,id){
            getProduct(req,res,id);
        }
    },
    "POST" : {
        "/api/products" : function (req,res){
            createProduct(req,res);
        }
    },
    "PUT" : {
        "id" : function (req,res,id) {
            updateProduct(req,res,id);
        }
    },
    "DELETE" : {
        "id" : function (req,res,id) {
            deleteProduct(req,res,id);
        }
    }
};

exports.handleAll = (req,res)=>{
    try {
        routes[req.method][req.url](req,res);
    } catch (error) {
        handleInvalidRequest(res);
        console.log(error);
    }
};

exports.handleId = (req,res,id) =>{
    try {
        routes[req.method]["id"](req,res,id);
    } catch (error) {
        handleInvalidRequest(res);
        console.log(error);
    }
};