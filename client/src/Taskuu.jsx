import React, { useState } from 'react'

const Taskuu = () => {

    const [taskName, settaskName] = useState('')
    const [taskDesc, settaskDesc] = useState('')
    const [allTasks, setallTasks] = useState([])

    const addTask = () =>{
        let task = {
            taskName,
            taskDesc
        }

        setallTasks([task, ...allTasks])
        console.log(setallTasks);
        

    }


    
    

  return (
    <>
    <input type="text" name='taskuName' onChange={(e)=>settaskName(e.target.value)}/>
    <textarea name="taskuDesc" onChange={(e)=>settaskDesc(e.target.value)}/>
    <button onClick={()=>addTask()}>Add Tasks</button>
    
    
    </>
  )
}

export default Taskuu