const taskModel = require('../models/tasks.model');

const createTask = async (req, res) => {
    const { taskName, taskDescription } = req.body;
    const userId = req.user.id;
    try {
        const userTask = new taskModel({ taskName, taskDescription, userId });
        const savedTask = await userTask.save();
        console.log('User task saved successfully', savedTask);
        res.status(201).json({ message: "Task saved successfully", savedTask });
    } catch (error) {
        console.log('Error saving task');
        res.status(501).json({ message: "Tasks not saved", error });
    }
};

const getTasks = async (req, res) => {
    try {
        const everyTasks = await taskModel.find({ userId: req.user.id });
        console.log(everyTasks);
        res.status(200).json({ message: "All Tasks found", everyTasks });
    } catch (error) {
        res.status(501).json({ message: "No task found", error });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const deletedTask = await taskModel.findOneAndDelete({ _id: id, userId: userId });
        if (!deletedTask) {
            res.status(401).json({ message: "Task not found" });
        } else {
            res.status(201).json({ message: "Task Deleted successfully" });
        }
    } catch (error) {
        res.status(501).json({ message: "Error deleting task", error });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { taskName, taskDescription } = req.body;
    const userId = req.user.id;
    try {
        const updatedTask = await taskModel.findOneAndUpdate(
            { _id: id, userId: userId },
            { taskName, taskDescription },
            { new: true }
        );
        if (!updatedTask) {
            res.status(401).json({ message: "Updated Task not found" });
        } else {
            res.status(201).json({ message: "Updated Task successfully", updatedTask });
        }
    } catch (error) {
        res.status(501).json({ message: "Server Error" });
    }
};

module.exports = { createTask, getTasks, deleteTask, updateTask };
