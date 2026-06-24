import React ,{useState} from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const TodoForm = ({
  todo,
  setTodo,
  setTodos,
  editIndex,
  setEditIndex
}) => {

  const [loading, setLoading] = useState(false);
  

  const handleTodo = async () => {



    if (!todo.trim()) {
  return toast.error(
    "Please enter a todo"
  );
}

setLoading(true);

    try {
      if (editIndex !== null) {

        await api.put(`/todos/${editIndex}`,

          {
            title: todo
          },

        );
        toast.success("Todo Updated");
        setEditIndex(null);
      }
      else {
        await api.post("/todos",
          {
            title: todo
          },

        );
        toast.success("Todo Added");

      }

      const response = await api.get("/todos");

      setTodos(response.data);

      setTodo("");

    } catch (error) {

      toast.error("Operation Failed");
      console.log(error);

    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="row g-2 mb-4">

  <div className="col-12 col-md-9">

    <input
      type="text"
      className="form-control"
      placeholder="Enter Todo"
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
    />

  </div>

  <div className="col-12 col-md-3">

    <button
      className="btn btn-success w-100"
      onClick={handleTodo}
      disabled={loading}
    >
      <i className="bi bi-plus-circle me-2"></i>
      
      {
      loading
      ? "Saving..."
      : editIndex
        ? "Update Todo"
        : "Add Todo"
   }
    </button>

  </div>

</div>
  );
};

export default TodoForm;