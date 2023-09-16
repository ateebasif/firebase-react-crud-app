import { useState, useEffect } from "react";

import { db, doc, onSnapshot, collection, query, deleteDoc } from "../firebase";

const TodosList = (props) => {
  const { onEdit } = props;
  const [todos, setTodos] = useState([]);

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

  const onDelete = async (todo) => {
    const docId = todo?.docId;
    if (!docId) return;

    try {
      await deleteDoc(doc(db, "todos", docId));

      console.log("todo deleted successfully");
    } catch (err) {
      console.log("error in deleting todo", err);
    }
  };

  return (
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
  );
};

export default TodosList;
