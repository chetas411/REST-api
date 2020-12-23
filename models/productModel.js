let Products = require("../data/products.json");
const {v4 : uuidv4} = require("uuid");
const {writeData} = require("../utils");

exports.findAll = ()=>{
    return new Promise((resolve,reject)=>{
        resolve(Products);
    });
};

exports.findById = (id)=>{
    const product = Products.find(e=>e.id===id);
    return new Promise((resolve,reject)=>{
        resolve(product);
    });
};

exports.create = (product)=>{
    return new Promise((resolve,reject)=>{
        const newProduct = {id:uuidv4(),...product};
        Products.push(newProduct);
        writeData("./data/products.json",Products);
        resolve(newProduct);
    });
};

exports.update = (productData,id)=>{
    return new Promise((resolve,reject)=>{
        const newProducts = Products.map((e)=>{
            return (e.id===id)? {id:id,...productData} : e; 
        });
        writeData("./data/products.json",newProducts);
        Products = newProducts;
        resolve({id:id,...productData});
    });
};

exports.delete = async (id)=>{
    return new Promise(async (resolve,reject)=>{
        const deletedProduct = await this.findById(id);
        Products = Products.filter(p => p.id!==id);
        writeData("./data/products.json",Products);
        resolve(deletedProduct);
    });
}