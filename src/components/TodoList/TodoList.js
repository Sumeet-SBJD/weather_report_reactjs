import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { toast } from 'react-toastify';
import './TodoList.css';


const TodoList = () => {
   let [allTodos, setTodos] = useState([]);
   
   // delete status function
   const deleteTodo = (todoID) => {
      Swal.fire({
         title: "Do you want to delete?",
         showCancelButton: true,
         confirmButtonText: "Yes",
         cancelButtonText: `No`,
         confirmButtonColor: "#e9594a",
      }).then((result) => {
         if (result.isConfirmed) {
            let todos = JSON.parse(localStorage.getItem('items'));
            todos.splice(todoID, 1);
            if (todos.length <= 1) {
               localStorage.removeItem("items");
            }
            localStorage.setItem('items', JSON.stringify(todos));
            const todoItems2 = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : [];
            setTodos(todoItems2);
            toast("Deleted!");
         }
      });
   }
   // change the task status
   const changeTaskStatus = (todoId, status) => {
      let todos = JSON.parse(localStorage.getItem('items'));
      todos[todoId].status = status;
      localStorage.setItem('items', JSON.stringify(todos));
      const todoItems = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : [];
      setTodos(todoItems);
   }

   // make first word capital
   function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }



   setInterval(() => {
      const todoItems = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : [];
      setTodos(todoItems);
   }, 400);
   // useEffect(() => {
   // }, [allTodos]);

   return (
      <>
         <h1 className="mb-4 py-4">Todo List</h1>

         <Row className='mb-2'>
            <Col><strong>S No.</strong></Col>
            <Col md="4"><strong>Task</strong></Col>
            <Col><strong>Status</strong></Col>
            <Col md="4"><strong>Action</strong></Col>
         </Row>
         {
            (allTodos.length > 0)
               ?
               allTodos.map((item, index) => (
                  <Row key={index} id={"todo-" + index} className={(item.status === 'completed') ? "mb-2 completed" : "mb-2"}>
                     <Col> {index + 1} </Col>
                     <Col md={4}>
                        {capitalizeFirstLetter(item.title)}
                     </Col>
                     <Col>
                        <strong> {item.status} </strong>
                     </Col>
                     <Col md={4}>
                        <div className="action_wrapper">
                           {
                              (item.status === 'pending')
                                 ?
                                 <Button size="sm" onClick={() => changeTaskStatus(index, "completed")} variant="outline-secondary">Mark as Done</Button>
                                 :
                                 <div>
                                    <Button size="sm" variant="success">Completed <DoneAllIcon /></Button>

                                    <Button id="undo_btn" title='undo' onClick={() => changeTaskStatus(index, "pending")} size="sm" variant="outline-primary"><SettingsBackupRestoreIcon /></Button>
                                 </div>
                           }
                           <div onClick={() => deleteTodo(index)} data-id={index} ><Delete className="delete_todo" /></div>
                        </div>
                     </Col>
                  </Row>
               ))
               :
               "Add your daily routine here"
         }
      </>
   );
};

export default TodoList;
