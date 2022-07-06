//import { useFetch } from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";

//styles
import "./Home.css";

//components
import RecipeList from "../../components/RecipeList";

const Home = () => {
  //const url = "http://localhost:3000/recipes";
  //const { data, isPending, error } = useFetch(url);
  // #### above deleted, useFetch: not used here for Firebase, instead useEffect, see below

  const [data, setData] = useState(null); //states setup for Firebase fetch
  const [isPending, setIsPending] = useState(false); //s.o.
  const [error, setError] = useState(false); //s.o.

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      //.get() //no "get" and "then" anymore, but "onSnapshot"
      //.then
      .onSnapshot(
        (snapshot) => {
          console.log(snapshot);
          if (snapshot.empty) {
            //1. check if snapshot (clg t) is empty, boolean true/false
            setError("no recipes to load");
            setIsPending(false); //stop showing ...Loading message
          } else {
            let results = []; //2. else: if we have data in snapshot, create empty arr
            snapshot.docs.forEach((doc) => {
              // 3. loop through docs to find data !!DATA IS A FUNCTION!!
              console.log(doc); //is the "e" in clg
              results.push({ id: doc.id, ...doc.data() }); //4. push NEW OBJ, snytax to fetch data from firebase: new object with id and spread all existing .data()
            });
            setData(results); //5. create array of objects for result data
            setIsPending(false);
          }
        },
        (err) => {
          setError(err.message);
          setIsPending(false);
        }
      );
    return () => {
      unsub();
    };
    // .catch((err) => {
    //   //6. in case of err: catch
    //   setError(err.message); //err object has some message to be shown
    //   setIsPending(false);
    // }); ### no catch block for real-time collection ###
  }, []);

  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
