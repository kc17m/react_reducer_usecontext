import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

import DeleteIcon from "../assets/delete-icon.svg";
import { projectFirestore } from "../firebase/config";

//styles
import "./RecipeList.css";

const RecipeList = ({ recipes }) => {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div>No recipies found</div>; // if returned data arr is empty, it returns different template if recipies is empty
  }

  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.slice(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className="delete"
            alt="delete button"
            src={DeleteIcon}
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
