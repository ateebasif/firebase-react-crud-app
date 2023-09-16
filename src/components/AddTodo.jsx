import React from "react";

import { db, addDoc, collection } from "../firebase";

const AddTodo = (props) => {
  const { todoValue, setTodoValue } = props

  const handleOnChange = (e) => setTodoValue(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!todoValue) return; // to check if the value is empty or not

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

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Add Todo"
        value={todoValue}
        onChange={handleOnChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
