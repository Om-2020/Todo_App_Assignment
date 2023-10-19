import React, { useEffect, useState } from 'react'
import Task from './Task';

function Home() {

    const initialtask = localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
    const [tasks,settasks] = useState(initialtask);
    const [title,settitle] = useState("");
    const [description,setdescription] = useState("");

    const submitHandler = (e)=>{
        e.preventDefault();

    
        title==="" || description===""?alert("All fields are required"):
        settasks([...tasks,{
            title,
            description
        }])
        settitle("");
        setdescription("");


    }

    useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks])

    const deleteTask = (index)=>{
        const filterarr = tasks.filter((val,i)=>{
            return index!==i;
        })
        settasks(filterarr);
    }

  return (
    <div className='container'>
        <h1>Add Your Daily Goals</h1>

        <form onSubmit={submitHandler}>

            <input type='text' placeholder='Title' value={title} onChange={(e)=>{
                settitle(e.target.value)
            }}></input>
            <textarea placeholder='Description' value={description} onChange={(e)=>{
                setdescription(e.target.value)
            }}></textarea>
            <button type="submit">ADD</button>


        </form>
        {
            tasks.map((item,index)=>{
                return <Task key={index} title={item.title}
                description={item.description}
                deleteTask={deleteTask}
                index = {index}
                />
            })
        }

    </div>
  )
}

export default Home;