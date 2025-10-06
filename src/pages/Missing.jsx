import { Link } from "react-router-dom";

export default function Missing() {
  return (
   
      <div >
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">Go back to Home</Link>
      </div>
   
  )
}
