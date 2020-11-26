// Test import of styles
import '../../styles/index.scss'

const heading = document.createElement('h1')
heading.textContent = 'article page'

const app = document.querySelector('#root')
app.append(heading)
