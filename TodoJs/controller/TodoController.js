import Todo from "../models/Todo.js";
import {json} from "express";

class TodoController {
    async createTodo(req, res) {
        const {content} = req.body;

        if (!content) {
            res.status(400).send("content is required");
        }
        try {
            const created_todo = await Todo.create({user: req.user.user_id, content: content})
            res.status(200).json(created_todo)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAllTodo(req, res){
        res.json(await Todo.find({user: req.user.user_id}))
    }
    async deleteTodo(req, res) {
        const id = req.params.id
        try {
            if(!id) {
                res.status(500).json("id is required")
            }
            const todo = await Todo.findById(id)
            if (todo.user.equals(req.user.user_id)) {
                await Todo.deleteOne({_id: todo._id})
                res.json(todo)
            } else {
                res.status(400).json("its not your todo")
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }h
}

export default new TodoController