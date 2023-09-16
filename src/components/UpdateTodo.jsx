import React from "react";

import { db, doc, updateDoc } from "../firebase";

const UpdateTodo = (props) => {
  const { todoValue, setTodoValue, selectedTodo, setIsEditing } = props;
  

  const handleOnChange = (e) => setTodoValue(e.target.value);

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

  return (
    <form className="form" onSubmit={onUpdate}>
      <input
        type="text"
        placeholder="Add Todo"
        value={todoValue}
        onChange={handleOnChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateTodo;
