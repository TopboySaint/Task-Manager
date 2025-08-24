const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const mongoose = require('mongoose')
const uri = process.env.URI
app.use(express.json());
const cors = require('cors') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000',
        'https://task-manager-frontend-react-iota.vercel.app'
    ],
    credentials: true,
}))

const saltRounds =  10;


mongoose.connect(uri)
.then(()=>{
    console.log('Connected to Mongo Database');

})
.catch((error)=>{
    console.log('Error connecting to Database', error);
})





const userSchema = new mongoose.Schema({
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true}
})

const userModel = mongoose.model('User', userSchema)

const authenticateToken = (req, res, next) =>{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token){
            return res.status(401).json({message: "No token is provided"})
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if (err){
        return res.status(401).json({message: "Invalid token"})
        }
        req.user = decoded
        next()

        })
    }

app.get('/', (req, res)=>{
    res.status(200).json({message: `success`})
})

app.post('/signup', async(req, res)=>{
    const { username, email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new userModel({username, email, password: hashedPassword})
        const savedUser = await newUser.save()
        res.status(201).json({message: "Signup succesful", savedUser}) 
    } catch (error) {
    res.status(401).json({message: "Error signup", error}) 
    }
})

app.post('/signin', async(req, res)=>{
    try {
        const userData = {
        email: req.body.email,
        password: req.body.password
    }
    const user = await userModel.findOne({email: userData.email})
    if (!user || user == null){
        res.status(404).json({message: "User not found"})
    } else {
        const isMatch = await bcrypt.compare(userData.password, user.password)
        if(isMatch){
            const payload = { id: user._id, username: user.username };
            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token)=>{
            if(err){
                res.status(500).json({message:"Error generating token"})
            } else{
                    res.status(200).json({message: "Staff successfully logged in", token}) 
                    
            }
        })
        } else{
            res.status(401).json({message: "Invalid Password"})         
        }
        console.log("User Found", user);  
    }
    
    } catch (error) {
        res.status(501).json({message: "Server error"});
    }
})


const taskSchema = new mongoose.Schema({
    taskName:{type: String, required: true},
    taskDescription: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true })

const taskModel = mongoose.model('Task Manager', taskSchema)

app.post('/tasks', authenticateToken, async(req, res)=>{
    const {taskName, taskDescription} = req.body
    const userId = req.user.id;
    try{
        const userTask = new taskModel({taskName, taskDescription, userId})
        const savedTask = await userTask.save()
        console.log('Usertask saved sucessfully', savedTask);
        res.status(201).json({message: "Task saved successfully", savedTask})
    }
    
    catch(error){
        console.log('Error saving task');
        res.status(501).json({message: "Tasks not saved", error})
    }
    
})

app.get('/tasks', authenticateToken, async(req, res)=>{
    taskModel.find({ userId: req.user.id })
    .then((everyTasks)=>{
    console.log(everyTasks);
    res.status(200).json({message: "All Tasks found", everyTasks})
    })
    .catch((error)=>{
        res.status(501).json({message: "No task found", error})
    })
    
})


    app.delete('/tasks/:id', authenticateToken, (req, res)=>{
        const { id } = req.params
        const userId = req.user.id; // Get current user ID
        taskModel.findOneAndDelete({ _id: id, userId: userId })
        .then((deletedTask)=>{
            if (!deletedTask) {
                res.status(401).json({message: "Task not found"})
            } else {
                res.status(201).json({message: "Task Deleted succesfully"})
            }
        })
    })

    app.put('/tasks/:id', authenticateToken, async(req, res)=>{
        const { id } = req.params
        const { taskName, taskDescription } = req.body
        const userId = req.user.id; // Get current user ID
        try {
            const updatedTask = await taskModel.findOneAndUpdate({ _id: id, userId: userId },{ taskName, taskDescription },{ new: true })
            if (!updatedTask) {
                res.status(401).json({message: "updated Task not found"})
            } else {
                res.status(201).json({message: "Updated Task sucessfully", updatedTask})
            }
        } catch (error) {
            res.status(501).json({message: "Server Error"})
        }

    })



app.listen(port, ()=>{
    console.log(`${port} is connected, let's go !`);
    
})