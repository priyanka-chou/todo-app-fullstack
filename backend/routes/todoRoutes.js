const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const validateTodo = require("../middleware/validateTodo");

const {getTodos,addTodo,deleteTodo,updateTodo,toggleTodo} = require("../controllers/todoContrllers");


router.get("/todos",auth,getTodos);
router.post("/todos",auth,validateTodo,addTodo);
router.delete("/todos/:id",auth,deleteTodo);
router.put("/todos/:id",auth,validateTodo,updateTodo);
router.put("/todos/:id/complete", auth,toggleTodo)


module.exports =router;
