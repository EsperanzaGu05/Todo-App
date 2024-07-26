import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases'

const ElementIds = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    ClearCompleated: '.clear-completed',
    TodoFilters: '.filter',
    pendingCount: '#pending-count'
}

/**
 * 
 * @param {String} elementId element where the render is going to happen
 */
export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos)
        updatePendingCount()
    }

    const updatePendingCount = () => {
        renderPending(ElementIds.pendingCount)
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
    const clearCompleatedButton = document.querySelector(ElementIds.ClearCompleated)
    const filtersLI = document.querySelectorAll(ElementIds.TodoFilters)


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

    clearCompleatedButton.addEventListener('click', (event) => {
        // console.log('click');
        todoStore.deleteCompleated()
        displayTodos()
    })

    filtersLI.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLI.forEach(el => el.classList.remove('selected'))
            element.target.classList.add('selected')

            switch (element.target.text) {
                case 'All':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Pending':
                    todoStore.setFilter(Filters.Pending)
                    break;
                case 'Completed':
                    todoStore.setFilter(Filters.Completed)
                    break;
            }
            displayTodos()
        })
    });

}