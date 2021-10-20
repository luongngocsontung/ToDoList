import React, {useState} from "react";

function Form(props){
    const [value, setValue] = useState('');

    const handleInput= (e)=>{
        setValue(e.target.value);
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        props.onSubmit(value);
        setValue('');  
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                className="addList"
                type="text" 
                value={value} 
                onChange={handleInput} 
            ></input>
        </form>
    )
}

export default Form;