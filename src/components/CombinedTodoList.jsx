import { useState, useEffect } from "react";

import {
  db,
  doc,
  onSnapshot,
  addDoc,
  collection,
  query,
  updateDoc,
  deleteDoc,
} from "../firebase";

function CombinedTodoList() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (snapShot) => {
      const todosArray = [];
      snapShot.forEach((doc) => {
        const todo = { ...doc.data(), docId: doc.id };

        todosArray.push(todo);
      });

      setTodos(todosArray);
    });

    return () => unsubscribe();
  }, []);

  console.log("todos", todos);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const doc = await addDoc(collection(db, "todos"), {
        todo: todoValue,
      });

      console.log("Todo added : ", doc.id);
      setTodoValue("");
    } catch (err) {
      console.log("error in adding todo", err);
    }
  };

  const handleOnChange = (e) => setTodoValue(e.target.value);

  const onEdit = (item) => {
    setIsEditing(true);
    setTodoValue(item.todo);
    setSelectedTodo(item);
  };

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const docId = selectedTodo.docId;
      const docRef = doc(db, "todos", docId);

      await updateDoc(docRef, {
        todo: todoValue,
      });

      setTodoValue("");
      setIsEditing(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  const onDelete = async (todo) => {
    const docId = todo.docId;
    if (!docId) return;

    try {
      await deleteDoc(doc(db, "todos", docId));

      console.log("todo deleted successfully");
    } catch (err) {
      console.log("error in deleting todo", err);
    }
  };

  return (
    <div className="main">
      <div className="todos-container">
        <h1>Todo App</h1>

        <div>
          {isEditing ? (
            <form className="form" onSubmit={onUpdate}>
              <input
                type="text"
                placeholder="Add Todo"
                value={todoValue}
                onChange={handleOnChange}
              />
              <button type="submit">Update</button>
            </form>
          ) : (
            <form className="form" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Add Todo"
                value={todoValue}
                onChange={handleOnChange}
              />
              <button type="submit">Add</button>
            </form>
          )}

          <div className="list">
            {todos.map((item) => (
              <div key={item.docId} className="todo-item">
                {item.todo}
                <div>
                  <button onClick={() => onEdit(item)}>Edit</button>
                  <button onClick={() => onDelete(item)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinedTodoList;
