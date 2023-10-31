import Navbar from './components/Navbar'

import { Outlet } from 'react-router-dom'

import './App.css'

function App() {

  return (
    <div id='app'>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default App
