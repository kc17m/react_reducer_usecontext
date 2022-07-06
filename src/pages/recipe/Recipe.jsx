import { useParams } from "react-router-dom";
//import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

import { projectFirestore } from "../../firebase/config";

//styles
import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams(); //comes from the route - IS FIRESTORE ID
  // const url = "http://localhost:3000/recipes/" + id; //##analog zu Home: with Firebase no need for useFetch or URL
  // const { data, isPending, error } = useFetch(url);
  const { mode } = useTheme();
  const [data, setData] = useState(null); //states setup for Firebase fetch
  const [isPending, setIsPending] = useState(false); //s.o.
  const [error, setError] = useState(false); //s.o.

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore //analog zu Home Component
      .collection("recipes")
      .doc(id) //id coming from useParams, this has been pushed into the obj as "id: doc.id"
      // .get()
      // .then((doc) => {
      .onSnapshot((doc) => {
        console.log(doc);
        if (doc.exists) {
          setIsPending(false);
          setData(doc.data()); //### doc.data = function that grabs the data
        } else {
          setIsPending(false);
          setError("Could not find the recipe");
        }
      });
    return () => unsub();
  }, [id]);

  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "something different",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && (
        <>
          <h2 className="page-title">{data.title}</h2>
          <p>Takes {data.cookingTime} to cook</p>
          <ul>
            {data.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{data.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
};

export default Recipe;
