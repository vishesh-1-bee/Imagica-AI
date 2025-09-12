
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Appcontextprovider } from '../src/context/Appcontext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Appcontextprovider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Appcontextprovider>
)

