import html from './app.html?raw'
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases'

const ElementIds = {
    TodoList: '.todo-list'
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

}