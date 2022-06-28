import { useState, useRef, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";

//styles
import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState(""); //single Ing to be pushed into arr
  const [ingredients, setIngredients] = useState([]); //array of all entered ingredients
  const ingredientInput = useRef(null);

  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime, ingredients);
    postData({
      //data to be posted; NB: JSON server will automatically create and add an unique id
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes", //cause in db cooking time is a string with no and "minutes"
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      //to check if ing entered and is NOT already in array
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]); //or "ing without whitespace"
    }
    setNewIngredient(""); //to clear input field
    ingredientInput.current.focus(); //useRef: always indicate "current" as object key
  };

  // redirect the user when we get data response
  useEffect(() => {
    if (data) {
      history.push("/");
    }
  }, [data, history]);

  return (
    <div className="create">
      <h2 className="page-title">Add a new recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              Add
            </button>
          </div>
        </label>
        <p>
          Current Ingredients:
          {ingredients.map((ing) => (
            <em key={ing}> {ing}</em>
          ))}
        </p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Create;
