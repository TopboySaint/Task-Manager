import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const Tasks = () => {

    const navigate = useNavigate()

    const [taskName, settaskName] = useState('')
    const [taskDescription, settaskDescription] = useState('')
    const [allTasks, setallTasks] = useState([])

    const [isModalOpen, setisModalOpen] = useState(false)
    const [editTaskId, seteditTaskId] = useState(null)
    const [editTaskName, seteditTaskName] = useState('')
    const [editTaskDescription, seteditTaskDescription] = useState('')
    const [username, setUsername] = useState('')

    const url = "https://task-manager-l5bz.onrender.com/task"
    const token = localStorage.getItem('token')

    // Load tasks when component mounts
    useEffect(()=>{
      if(!token){
            navigate('/signin')
            return;
          }

          // Decode  to get the username
          try {
            const decoded = jwtDecode(token)
            console.log(decoded);
            setUsername(decoded.username)
          } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            navigate('/signin');
          }

          axios.get(url, {headers: { Authorization: `Bearer ${token}` }})
          .then((response)=>{
            setallTasks(response.data.everyTasks || [])
          })
            // const savedTasks = JSON.parse(localStorage.getItem('listedTasks'))
            // if (savedTasks && savedTasks.length > 0){
            //     console.log(savedTasks);
            //     setallTasks(savedTasks)
            // }           
         .catch ((err)=> {
            console.log("Error loading tasks", err);
            if (err.response?.status === 403 || err.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/signin');
        }
    });
  },[navigate, token])

    // Save whenever tasks change
    
    const addTask = () =>{
      const task = {
      taskName,
      taskDescription,
      createdAt: new Date()
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    axios.post(url, task, config)
    .then((response)=>{
      if (response.status === 201) {
      setallTasks([...allTasks, response.data.savedTask])
      console.log(allTasks);
      settaskName('');
      settaskDescription('');
    }
    })
     .catch((err) => {
        // It's important to catch and log errors
        console.error("Error adding task:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/signin');
        }
      });

  }

  const openEditModal = (task) =>{
    // const taskToEdit = allTasks[index]
    // seteditTaskId(index)
    seteditTaskId(task._id)
    seteditTaskName(task.taskName)
    seteditTaskDescription(task.taskDescription)
    setisModalOpen(true)
  }

  const closeModal = () =>{
    setisModalOpen(false)
    seteditTaskId(null)
    seteditTaskName('')
    seteditTaskDescription('')
  }

  const saveEditedTask = async ()=>{
    if (!editTaskName.trim()) //  do nothing if there is no edited task
    return;
    try {
      const response = await axios.put(`${url}/${editTaskId}`, {
        taskName: editTaskName,
        taskDescription: editTaskDescription, 
      }, { headers: { Authorization: `Bearer ${token}` } })
      const updatedTaskFromServer = response.data.updatedTask;
      const updatedEditedTasks = allTasks.map((task) => 
        task._id === editTaskId ? updatedTaskFromServer : task
      )
    setallTasks(updatedEditedTasks)  // Update the main task list
    closeModal() 
    console.log(response);
    
    } catch (error) {
      console.log(error);
            if (error.response?.status === 403 || error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
      }
    }
  }

  const deleteTask = (taskId) =>{
    axios.delete(`${url}/${taskId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response)=>{
      console.log("Task deleted", response.data);
      const updatedTasks = allTasks.filter(task => task._id !==taskId);
      setallTasks(updatedTasks)
    })
    .catch((err) => {
        console.error("Error deleting task:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/signin');
        }
      });
  }
  
  const getTimeAgo = (timestamp)=>{
        const now = new Date();
        const created = new Date(timestamp);
        const diffMs = now - created;

        const seconds = Math.floor(diffMs / 1000)
        const minutes = Math.floor(seconds / 60 )
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24 )

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago `
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago `
        if (minutes > 0) return  `${minutes} minute${minutes > 1 ? 's' : ''} ago`
        return 'Just now'

    }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className='text-3xl font-bold text-center text-indigo-800 mb-8 tracking-tight'>Welcome, {username} ! To Your Task Manager</h1>
        {/* Task Input Area */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <input 
            type="text" 
            name='taskName' 
            value={taskName} 
            onChange={(e)=>settaskName(e.target.value)}
            placeholder="Task name"
            className="w-full mb-3 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <textarea 
            name="taskDescription" 
            value={taskDescription} 
            onChange={(e)=>settaskDescription(e.target.value)}
            placeholder="Task description"
            className="w-full mb-5 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-24 resize-none"
          />
          <button 
            onClick={()=>addTask()}
            disabled={!taskName.trim()}
            className={`w-full py-3 rounded-lg text-white font-medium transition-all ${
              taskName.trim() 
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Add Task
          </button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {
            allTasks.length > 0 ? (
              allTasks.map((task)=>(
                <div key={task._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-5 border-l-4 border-indigo-500">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{task.taskName}</h4>
                  <p className="text-gray-600 mb-4">{task.taskDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 italic">Added {getTimeAgo(task.createdAt)}</span>
                    <div className="space-x-2">
                      <button 
                        onClick={()=>openEditModal(task)}
                        className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-md transition-colors font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={()=>deleteTask(task._id)}
                        className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p className="text-lg">No tasks yet! Add one to get started.</p>
              </div>
            )
          }
        </div>
      </div>
    </div>

    {/* Edit Task Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
                    <div className="flex justify-between items-center p-6 border-b border-indigo-100">
                        <h3 className="text-xl font-semibold text-indigo-800">Edit Task</h3>
                        <button 
                            onClick={closeModal} 
                            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="p-6">
                        <input 
                            type="text" 
                            value={editTaskName}
                            onChange={(e) => seteditTaskName(e.target.value)}
                            placeholder="Task name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                        <textarea 
                            value={editTaskDescription}
                            onChange={(e) => seteditTaskDescription(e.target.value)}
                            placeholder="Task description"
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                        />
                        
                        <div className="flex space-x-3">
                            <button 
                                onClick={saveEditedTask} 
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={!editTaskName.trim()}
                            >
                                Save Changes
                            </button>
                            <button 
                                onClick={closeModal} 
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    
    </>
  )
}

export default Tasks