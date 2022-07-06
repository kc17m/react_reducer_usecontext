import { useState } from "react";
import { useNavigate } from "react-router-dom";

// styles
import "./Searchbar.css";

const Searchbar = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?q=${term}`);

    //q?=Pizza -  useLocation will get this query term from URL
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  );
};

export default Searchbar;
