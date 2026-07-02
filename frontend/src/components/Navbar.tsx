import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/products">Products</Link>
    </nav>
  );
}
