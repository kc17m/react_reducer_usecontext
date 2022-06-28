import { Link } from "react-router-dom";
//import { ThemeProvider } from "../context/ThemeContext";
//import { useContext } from "react";
//import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "../hooks/useTheme";

//styles
import "./Navbar.css";

//components
import Searchbar from "./Searchbar";

const Navbar = () => {
  //const { color } = useContext(ThemeContext); //useContext: gets ThemeContext as parameter, NOT ThemeProvider
  //the ThemeProvider only embraces all components that can use context value, while ThemeContext gives access to actual value

  //with custom hook:
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
};

export default Navbar;
