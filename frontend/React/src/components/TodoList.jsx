import React from 'react';
import api from '../api/axios';
import { toast } from "react-toastify";

const TodoList = ({ todos, setTodos, setTodo, setEditIndex }) => {

    const handleDelete = async (id) => {

        try {
            await api.delete(`/todos/${id}`);

            const response = await api.get("/todos");

            setTodos(response.data);
        }
        catch (error) {
            toast.error("Delete Failed");
            console.log(error);
        }
    }

    const handleToggle = async (id) => {
        try {
            await api.put(
                `/todos/${id}/complete`
            );

            const response = await api.get("/todos")

            setTodos(response.data);
            toast.success("Todo Completed");
        }
        catch (error) {

            toast.error("Update Failed");
            console.log(error);
        }
    }

    return (
        <ol className='list-group'>
            {todos.map((item) => (
                <li key={item.id}
                    className="
  list-group-item
  d-flex
  justify-content-between
  align-items-center
  flex-wrap
  mb-3
  rounded
  shadow-sm
  "
                >

                    <input
                        type='checkbox'
                        checked={item.completed}
                        onChange={() => handleToggle(item.id)}
                        className="form-check-input me-3 border border-dark"
                    />
                    <span
                        style={{
                            textDecoration: item.completed
                                ? "line-through"
                                : "none",

                            fontWeight: "500"
                        }}
                    >
                        {item.title}
                    </span>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-warning btn-sm"
                            onClick={() => {
                                setTodo(item.title);
                                setEditIndex(item.id);
                            }}>
                            <i className="bi bi-pencil-square"></i> Edit</button>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                const confirmDelete = window.confirm(
                                    "Are you sure you want to delete this todo?"
                                );

                                if (confirmDelete) {
                                    handleDelete(item.id);
                                }

                            }}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </li>
            ))}
        </ol>
    )
}

export default TodoList