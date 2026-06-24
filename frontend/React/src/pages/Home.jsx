import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import DashboardStatus from '../components/DashboardStatus'
import SearchBar from '../components/SearchBar';
import NoTodosFound from "../components/NoTodosFound";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import "../styles/Home.css";




const Home = () => {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todos");
      console.log("FETCHED TODOS:", response.data);

      setTodos(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
    const token = localStorage.getItem("token");

    if (token) {

      const decoded = jwtDecode(token);

      console.log(decoded);

      setUserName(decoded.name);
    }
  }, []);


  const filteredTodos = todos.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase())
  });
  const totalTodos = todos.length;

  const completedTodos = todos.filter(
    (item) => item.completed
  ).length;

  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="home-page">

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-12 col-lg-8">

            <div className="card shadow-lg border-0 home-card">

              <div className="d-flex  flex-wrap justify-content-between align-items-center mb-4">

                <div>
                  <h2 className="text-white fw-bold m-0">
                    Welcome, {userName} 👋
                  </h2>

                  <p className="text-light mb-0">
                    Manage your tasks efficiently
                  </p>
                </div>


                <button
                  className="btn btn-danger"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>

              </div>

              <TodoForm
                setTodos={setTodos}
                todo={todo}
                setTodo={setTodo}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
              />



              <DashboardStatus
                totalTodos={totalTodos}
                completedTodos={completedTodos}
                pendingTodos={pendingTodos}
              />

              <SearchBar
                search={search}
                setSearch={setSearch}
              />

              {
                filteredTodos.length === 0 ? (

                  <NoTodosFound/>) : (<TodoList
                    todos={filteredTodos}
                    setTodos={setTodos}
                    setTodo={setTodo}
                    setEditIndex={setEditIndex}
                  />)
              }


            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Home