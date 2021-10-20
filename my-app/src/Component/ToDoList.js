import React, { useEffect, useRef, useState } from "react";
import Lists from "./Lists";
import Form from "./Form";
import '../css/index.css';

function ToDoList() {
  const listSID = useRef(1);
  const taskDragging = useRef();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if(localStorage.length>0){
      const tempList = localStorage.getItem('list');
      setListData(JSON.parse(tempList));
      listSID.current = JSON.parse(localStorage.getItem('listID'));
    }
  },[])
  
  const addTask = (list) =>{
    const tempList = listData;
    listData.map((e,index) => {
      if(e.id == list.id){
          tempList.splice(index,1, list);
      }
    })
    setListData(tempList);
    localStorage.setItem('list', JSON.stringify(tempList));
  }

  const mapList = listData.map((e) => <Lists key={e.id} list={e} onChange={addTask}/>);
  
  const addNewList = (title) => {
    const tempList = {
      id: listSID.current++,
      title: title,
      tasks: []
    }
    const tempData = [...listData, tempList];
    setListData(tempData);
    localStorage.setItem('list', JSON.stringify(tempData));
    localStorage.setItem('listID', JSON.stringify(listSID.current));
  }

  const hanldeDragStart = (e) => {
    taskDragging.current = e.target;
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const box = e.target.getBoundingClientRect()
    const taskPosDropY = e.pageY - box.y;
    // console.log(taskPosDropY, box.y);
    if(e.target.matches('.list')){
      e.target.appendChild(taskDragging.current);
    }
    else if(e.target.matches('.task')){
      const item = e.target.closest('[draggable]')
      const list = item.parentElement;
      const children = [...list.children]
      const index = children.indexOf(item)
      if (taskPosDropY <= box.height / 2) {
        list.insertBefore(taskDragging.current, item);
      }
      else {
        const next = children[index + 1]
        // console.log("asdas");
        list.insertBefore(taskDragging.current, next);
      }
    }
  }

  const handleDragOver = e => {
    e.preventDefault();
  }

  return (
    <div className="toDoList">
      <h3 className="addListTitle">Add new List</h3>
      <Form onSubmit={addNewList} />
      <div
        className="listContainer"
        onDragStart={hanldeDragStart}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {mapList}
      </div>
    </div>
  );
}

export default ToDoList;