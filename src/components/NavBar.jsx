import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="NavContainer">
            <div className="navbar">
                <h1>CARY TIMES</h1>
                <Link className="linkURL" to="/">Home</Link>
                <Link className="linkURL" to="/business">Business</Link>
                <Link className="linkURL" to="/sports">Sports</Link>
                <Link className="linkURL" to="/search">Search</Link>                
            </div>
            <hr className="navHR"></hr>
        </div>
    )
}
