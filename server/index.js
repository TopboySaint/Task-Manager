const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const mongoose = require('mongoose')
const uri = process.env.URI
app.use(express.json());
const cors = require('cors')

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://task-manager-ten-red.vercel.app'
    ],
    credentials: true,
}))

mongoose.connect(uri)
.then(()=>{
    console.log('Connected to Mongo Database');

})
.catch((error)=>{
    console.log('Error connecting to Database', error);
})

const userRouter = require('./routes/user.route');
const taskRouter = require('./routes/task.route');

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.get('/', (req, res)=>{
    res.status(200).json({message: `success`})
})



app.listen(port, ()=>{
    console.log(`${port} is connected, let's go !`);
    
})