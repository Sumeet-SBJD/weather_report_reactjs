import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoForm = () => {
   const [todoTitle, setTodoTitle] = useState('');
   const [allTodos, setTodos] = useState([]);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (todoTitle) {
         allTodos.push({ title: todoTitle, status: 'pending' });
         localStorage.setItem('items', JSON.stringify(allTodos));
         setTodoTitle('');
         toast("Success");
      }
   };

   const oldItems = localStorage.getItem('items');

   useEffect(() => {
      const items = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : [];
      setTodos(items);
   }, [oldItems]);
   return (
      <>
         <Form className="py-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <h2 className='mb-4'>Add Todo</h2>
               <Form.Control
                  type="text"
                  placeholder="Todo Thought"
                  value={todoTitle}
                  onChange={(e) => setTodoTitle(e.target.value)}
               />
            </Form.Group>
            <Button variant="primary" type="submit">
               Submit
            </Button>
         </Form>
      </>
   );
};

export default TodoForm;