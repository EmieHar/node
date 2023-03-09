const {createTodo} = require('../todo.controller.js')
const TodoModel = require('../models/todo.js')

TodoModel.create = jest.fn()

describe('verifications todoController',() => {
    it("devrait avoir createTodo",() => {
        expect(typeof createTodo).toBe("function")
    })
})
    