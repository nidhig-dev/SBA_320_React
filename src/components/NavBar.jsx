import {Link} from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
            <h1>CARY TIMES</h1>
          <Link className="linkURL" to="/">Home</Link>
          <Link className="linkURL" to="">Tech</Link>
          <Link className="linkURL" to="">Politics</Link>
          <Link className="linkURL" to="/Search">Search</Link>
      
    </div>
  )
}
