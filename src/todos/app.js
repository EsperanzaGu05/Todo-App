import html from './app.html?raw'
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases'

const ElementIds = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    Destroy: '.destroy'
}

/**
 * 
 * @param {String} elementId element where the render is going to happen
 */
export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos)
    }

    //This anonymous function is going to be called when the App() is called
    (() => {
        const app = document.createElement('div')
        app.innerHTML = html
        document.querySelector(elementId).append(app)
        displayTodos()
    })();

    //referencias
    const newDescriptionInput = document.querySelector(ElementIds.newTodoInput)
    const todoListUl = document.querySelector(ElementIds.TodoList)
    const deleteButton = document.querySelector(ElementIds.Destroy)


    //Listener
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return

        todoStore.addTodo(event.target.value)
        displayTodos()
        event.target.value = ''
    })

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'))

        displayTodos()
    })


    todoListUl.addEventListener('click', (event) => {
        console.log(event.target);
        const isDestroyed = event.target.className === 'destroy'
        const element = event.target.closest('[data-id]')
        if (!element || !isDestroyed) return



        todoStore.deleteTodo(element.getAttribute('data-id'))

        displayTodos()
    })

}