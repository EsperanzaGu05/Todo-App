import { Todo } from "../todos/models/todo.models"

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Soul stone'),
        new Todo('Time stone'),
        new Todo('Infinite stone'),
        new Todo('Power stone'),
        new Todo('Reality stone')
    ],
    filter: Filters.All
}

const initStore = () => {
    console.log(state);
    console.log(('InitStore'));

}

const loadStore = () => {
    throw new Error('Not implemented')
}

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done === true)
        //el todo es solo el elemento de todos 
        case Filters.Pending:
            return state.todos.filter(todo => todo.done === false)
        default:
            throw new Error(`Invalid option ${filter}`)

    }
}
/**
 * 
 * @param {String} description 
 */

const addTodo = (description) => {
    if (!description) throw new Error('Description is required')
    state.todos.push(new Todo(description))
}
/**
 * 
 * @param {String} todoId 
 */

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done
        }
        return todo
    })
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId)
}

const deleteCompleated = () => {
    state.todos = state.todos.filter(todo => todo.id !== todo.done)
}
/**@param {Filters} newFilter */


const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter
}


export default {
    initStore, loadStore, addTodo, toggleTodo, getTodos, deleteTodo, deleteCompleated, setFilter
    , getCurrentFilter
}