import { Link } from "react-router-dom";

//styles
import "./RecipeList.css";

const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) {
    return <div>No recipies found</div>; // if returned data arr is empty, it returns different template if recipies is empty
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.slice(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;