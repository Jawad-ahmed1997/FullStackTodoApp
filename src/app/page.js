'use client'
import { useState, useEffect } from 'react';
import { getAlltodos, createtodo, deletetodo, updatetodo } from "../util/_api_/index";

export default function Home() {
  const [Mytodos, setMyTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [updateTodoId, setUpdateTodoId] = useState(null);
  const [updateTodoText, setUpdateTodoText] = useState('');
  const [flag, setFlag] = useState(true)
  const fetch = async () => {
    try {
      const res = await getAlltodos();
      setMyTodos(res)
      console.log(res)
    }
    catch (error) {
      console.log(error)
    }
  }
  // const addtodo = async (body) => {
  //   try {
  //   const res = await createtodo(body);
  //   // ([body])
  //     console.log(res)
  // }
  // catch(error){
  //   console.log(error)
  // }
  // }


  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = async () => {
    try {
      if (newTodo.trim() === '') {
        return;
      }

      const newTodoItem = {
        disc: newTodo,
      };


      await createtodo(newTodoItem).then((res) => {
        if (res.status === 201) {
          setFlag(!flag)
          setNewTodo('')
        }
      });
    } catch (error) {
      console.log(error)
    }

  };

  const handleDeleteTodo = async (id) => {
    try {
      await deletetodo(id).then((res) => {
        if (res.status === 200) {
          setFlag(!flag)
          console.log("working")
        }
      })
    } catch (error) {
      console.log(error)
    }
  };

  const handleUpdateTodo = (id, text) => {
    setUpdateTodoId(id);
    setUpdateTodoText(text);
  };

  const handleSaveUpdate = async (id, body) => {
    await updatetodo(id,body).then((res) => {
      if (res.status === 200) {
        setFlag(!flag)
      }
    })
    setUpdateTodoId(null);
    setUpdateTodoText('');
  };

  const handleCancelUpdate = () => {
    setUpdateTodoId(null);
    setUpdateTodoText('');
  };
  useEffect(() => {
    fetch()
  }, [flag])
  return (
    <div className="container">
      <div>
        <h1>Todo App</h1>
        <div className="input-container">
          <input type="text" value={newTodo} onChange={handleInputChange} />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
        <ul>
          {Mytodos?.map((todo) => (
            <li key={todo.id} className="todo-item">
              {updateTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={updateTodoText}
                    onChange={(e) => setUpdateTodoText(e.target.value)}
                  />
                  <div className="button-container">
                    <button onClick={() => handleSaveUpdate(todo.id, updateTodoText)}>Save</button>
                    <button onClick={handleCancelUpdate}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span>{todo.disc}</span>
                  <div className="button-container">
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    <button onClick={() => handleUpdateTodo(todo.id, todo.disc)}>Update</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .container {
          height:100%;
          width: 100%;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 8px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .input-container {
          display: flex;
          margin-bottom: 10px;
        }
        
        input {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 4px;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        }

        button {
          padding: 8px 12px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }

        .todo-item {
          margin-bottom: 8px;
          padding: 8px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .button-container {
          display: flex;
        }

        .button-container button {
          margin-left: 4px;
        }
      `}</style>
    </div>
  );
}
