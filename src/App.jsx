import { useState } from "react";
import "./App.css";

import TodosList from "./components/TodosList";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";

function App() {
  const [todoValue, setTodoValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const onEdit = (item) => {
    setIsEditing(true);
    setTodoValue(item.todo);
    setSelectedTodo(item);
  };

  return (
    <div className="main">
      <div className="todos-container">
        <h1>Todo App</h1>

        <div>
          {isEditing ? (
            <UpdateTodo
              todoValue={todoValue}
              setTodoValue={setTodoValue}
              selectedTodo={selectedTodo}
              setIsEditing={setIsEditing}
            />
          ) : (
            <AddTodo todoValue={todoValue} setTodoValue={setTodoValue} />
          )}

          <TodosList onEdit={onEdit} />
        </div>
      </div>
    </div>
  );
}

export default App;
