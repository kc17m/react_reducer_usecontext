# Task created in the course of Firebase / React tutorial

## custom hooks

useFetch (not this time for Firebase: GET, POST, replaced by useEffect())
POST replaced by doc in Firebase, unique id will automatically be created
useTheme: makes use of useContext for dark/bright scheme

## searchbar

looks for any term included in recipe
search by query string in url:   const url = "http://localhost:3000/recipes?q=" + query;

## theme selector
switch from dark to bright scheme for certain css styles

## onSnapshot
onSnapshot for realTime Collection of data, e.g. after deleting
instead of catch block: err function added to onSnapshot
with unsubscribe function to stop listening when we switch to other page

##
all recipes: Home.jsx
single recipe: Recipe.jsx with update: 

const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "something different",
    });
  };
create recipe: Create.jsx

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime, ingredients);
    //postData({//postData: to be replaced by doc
    const doc = {
      //data to be posted; NB: JSON server will automatically create and add an unique id
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes", //cause in db cooking time is a string with no and "minutes"
    };
    try {
      await projectFirestore.collection("recipes").add(doc);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  
search recipe: Search.jsx


