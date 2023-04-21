import express from "express";
import UserController from "./controller/UserController.js";
const router = express.Router();
import auth from "./middlewares/auth.js"
import TodoController from "./controller/TodoController.js";

router.get("/", (req, res) => {
    res.send("Hello world")
})

router.post('/login/', UserController.login);

router.post('/register/', UserController.register);

router.get('/get_me/', auth, UserController.getMe)

router.post('/create_todo/', auth,  TodoController.createTodo);

router.get('/get_todos/', auth, TodoController.getAllTodo);

router.delete('/delete_todo/:id/', auth, TodoController.deleteTodo);

export default router
