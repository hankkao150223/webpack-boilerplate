// Test import of a JavaScript function
import {example} from '../js/example'

// Test import of an asset
import logoFile from '../images/cute-dog.png'

// Test import of styles
import '../styles/index.scss'

// Appending to the DOM
const logo = document.createElement('img')
logo.src = logoFile

const heading = document.createElement('h1')
heading.textContent = example()

const app = document.querySelector('#root')
app.append(logo, heading)
