import React, {useEffect, useRef, useState } from "react";
import Tasks from "./Tasks";
import Form from "./Form";

function Lists(props){
    const [listData, setListData] = useState(props.list);
    const [taskData, setTaskData] = useState(listData.tasks); 
    const mapTask = taskData.map(e => <Tasks key={e.id} name={e.name}/>)  

    const getInput = (value) =>{
        const id = Math.floor(Math.random() * 10000);
        const newTask = {
          id: id,
          name: value
        }
        const temp = [newTask,...taskData];
        setTaskData(temp);
        const tempList = {
            id: listData.id,
            title: listData.title,
            tasks: temp
        }
        setListData(tempList);
        props.onChange(tempList);
    }
    
    return(
        <div className="list">
            <h1>{props.list.title}</h1>
            <Form onSubmit={getInput}/>
            <div 
            className="taskContainer" 
            >{mapTask}         
            </div>
        </div>
    )
}

export default Lists;