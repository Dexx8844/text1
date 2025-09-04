const express = require('express');
require('./config/database')
require("dotenv").config();
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')
const PORT = 9090;


const app = express();
app.use(express.json());
app.use("/api/v1", userRouter); 
app.use("/api/v1", taskRouter);


app.use((err, req, res, next)=>{
    if(err)
        return res.status(400).json({
    message: err.message})
    next();
})


  
   app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT :${PORT}`);
   })
