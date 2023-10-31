import { Link } from "react-router-dom"

import './Navbar.css'

function Navbar() {


  return (
    <nav className="navbar">
        <h2>
            <Link to={"/Repositories_API/"}>Repositórios</Link>
        </h2>
    </nav>
  )
}

export default Navbar