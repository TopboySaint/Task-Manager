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

    const url = "http://localhost:8080/tasks"
    const token = localStorage.getItem('token')

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
          } 
          catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            navigate('/signin');
          }

          axios.get(url, {headers: { Authorization: `Bearer ${token}` }})
          .then((response)=>{
            setallTasks(response.data.everyTasks || [])
          })
        .catch ((err)=> {
            console.log("Error loading tasks", err);
            if (err.response?.status === 403 || err.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/signin');
        }
    });
  },[navigate, token])

    
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
        console.error("Error adding task:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/signin');
        }
      });

  }

  const openEditModal = (task) =>{
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
    if (!editTaskName.trim()) 
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
    setallTasks(updatedEditedTasks)  
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
    const confirmed = window.confirm('Are you sure ?')
    if(confirmed){
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
    }else{
      return;
    }
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

    const logout = () => {
      const confirmation = window.confirm('Are you sure you want to logout?')
      if(confirmation){
        localStorage.removeItem('token')
        navigate('/signin', { replace: true })
      }else{
        return;
      } 
    }

  return (
    <>
    <div className="min-h-screen bg-surface-2 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Bar with Logo + Logout */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-contrast" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xl font-bold text-text">TaskMint</span>
          </div>
          <button type="button" className="btn btn-neutral btn-md" onClick={logout}>Logout</button>
        </header>

        {/* Welcome heading */}
        <div className="card p-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text">Welcome, {username}</h1>
          <p className="text-muted mt-1">Plan it. Do it. Done.</p>
        </div>

        {/* Task Input Area */}
        <div className="card p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="taskName" className="block text-sm font-medium text-text mb-1">Task name</label>
              <input
                id="taskName"
                type="text"
                name='taskName'
                value={taskName}
                onChange={(e)=>settaskName(e.target.value)}
                placeholder="e.g., Prepare project brief"
                className="block w-full px-4 py-3 border border-default rounded-lg bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="taskDescription" className="block text-sm font-medium text-text mb-1">Description</label>
              <textarea
                id="taskDescription"
                name="taskDescription"
                value={taskDescription}
                onChange={(e)=>settaskDescription(e.target.value)}
                placeholder="Add helpful details..."
                className="block w-full px-4 py-3 border border-default rounded-lg bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition duration-200 h-24 resize-none"
              />
            </div>
            <div>
              <button
                onClick={()=>addTask()}
                disabled={!taskName.trim()}
                className={`w-full btn btn-primary btn-md ${!taskName.trim() ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {allTasks.length > 0 ? (
            allTasks.map((task) => (
              <div key={task._id} className="card p-5 border-l-4" style={{ borderLeftColor: 'var(--accent)' }}>
                <h4 className="text-lg md:text-xl font-semibold text-text mb-1">{task.taskName}</h4>
                <p className="text-muted mb-4">{task.taskDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted italic">Added {getTimeAgo(task.createdAt)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={()=>openEditModal(task)}
                      className="btn btn-neutral btn-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={()=>deleteTask(task._id)}
                      className="btn btn-md"
                      style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card p-8 text-center">
              <p className="text-text">No tasks yet! Add one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Edit Task Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="card w-full max-w-md">
          <div className="flex justify-between items-center p-6 border-b border-default">
            <h3 className="text-xl font-semibold text-text">Edit Task</h3>
            <button 
              onClick={closeModal} 
              className="text-muted hover:bg-surface-2 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
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
              className="w-full px-4 py-3 border border-default rounded-lg mb-4 bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition"
            />
            <textarea 
              value={editTaskDescription}
              onChange={(e) => seteditTaskDescription(e.target.value)}
              placeholder="Task description"
              rows="4"
              className="w-full px-4 py-3 border border-default rounded-lg mb-6 bg-surface-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent transition resize-none"
            />
                        
            <div className="flex gap-3">
              <button 
                onClick={saveEditedTask} 
                className={`flex-1 btn btn-primary btn-md ${!editTaskName.trim() ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={!editTaskName.trim()}
              >
                Save Changes
              </button>
              <button 
                onClick={closeModal} 
                className="flex-1 btn btn-neutral btn-md"
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