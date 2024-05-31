import html from './app.html?raw'

/**
 * 
 * @param {String} elementId element where the render is going to happen
 */
export const App = (elementId) => {
    //This anonymous function is going to be called when the App() is called
    (() => {
        const app = document.createElement('div')
        app.innerHTML = html
        document.querySelector(elementId).append(app)
    })();

}