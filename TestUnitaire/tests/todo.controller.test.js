const todoController = require('../todo.controller.js')

describe('vérification todoController', () => {
    it('devrait avoir createTodo', () => {
        expect(todoController.createTodo).typeOf('function');
    })
    })
    