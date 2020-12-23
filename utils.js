const fs = require("fs");

exports.getId = (url)=>{
    const id = url.split('/')[3];
    return id;
};

exports.writeData = (filepath,data)=>{
    fs.writeFileSync(filepath,JSON.stringify(data),"utf-8",(err)=>{
        if(err){
            console.log();
        }
    });
};

exports.getData = (req,res)=>{
    return new Promise((resolve,reject)=>{
        let body = [];
        req.on("data",(chunk)=>{
            body.push(chunk);
        });
        req.on("end",()=>{
            body = body.toString();
            resolve(body);
        });
    });
};
