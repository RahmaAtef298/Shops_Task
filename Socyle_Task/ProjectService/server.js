let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose=require("mongoose");

let api = require('./Routes/api');
let shopRoute = require('./Routes/shopRoute');

let app = express();

mongoose.connect("mongodb://localhost:27017/ShopStore" ,err => {
    if(err){
        console.error(`Eroro ! ${err}`);
    }else{
        console.log(`Connected to MongoDB`)
    }
});
 
const port = 8080;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());



app.use(cors());
app.get('/',(request,response)=>{
    response.send('Hello from Server')
});

app.use("/api",api);
app.use("/shopRoute",shopRoute);
// app.use("/api", api);
// app.use("/shopRoute", shopRoute);
app.use((request,response)=>{
    response.send("Not Found");
});

app.listen(port,function(){
    console.log(`Server Running on Localhost : ${port}`)
});