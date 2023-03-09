const todoModel = require('./models/todo')

const createTodo = (req,res)=>{
    todoModel.create(req.body)
}

module.exports = { createTodo }