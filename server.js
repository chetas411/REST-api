const http = require("http");
const router = require("./router");
const {getId} = require("./utils");

const app = http.createServer((req,res)=>{
    if(req.url.match(/\/api\/products\/([0-9]+)/)){
        const id = getId(req.url);
        router.handleId(req,res,id);
    }else{
        router.handleAll(req,res);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log(`Server is running on ${PORT}`);});
