import React from "react";

function Tasks(props){
return(
    <div 
        className="task"
        draggable="true" 
    >
        {props.name}
    </div>
    )
}

export default Tasks;