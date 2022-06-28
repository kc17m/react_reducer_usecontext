import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

//styles
import "./Search.css";

//components
import RecipeList from "../../components/RecipeList";

const Search = () => {
  const queryString = useLocation().search; //useLocation: returns Object, we need "search" property from this
  const queryParams = new URLSearchParams(queryString); //creates new Search Params Object
  const query = queryParams.get("q"); //gets value of query parameter, e.g. Pizza

  const url = "http://localhost:3000/recipes?q=" + query;
  const { error, isPending, data } = useFetch(url);

  return (
    <div>
      <h2 className="page-title">Recipies including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
      {/* data is an array; even if "data" is empty, it will be true; if there are no recipies, 
      we won't get an error, this can be fixed with "if" statement in recipe list  */}
    </div>
  );
};

export default Search;
