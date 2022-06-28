import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  //default method: GET; if we don't pass in an argument, it will be defaulted to GET request BUT we can manually add a different one, e.g. POST
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    //this function will NOT do the POST, but accepts "postData" (here: recipe) and sets POST options
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);
      //fetchOptions: method, headers, body of POST fetch request - is empty in case of GET request, Default!!

      try {
        const res = await fetch(url, {
          ...fetchOptions, //see above
          signal: controller.signal, //additional options could be: Method, Headers, Body
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();

        setIsPending(false);
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };

    if (method === "GET") {
      fetchData(); //invoke above function inside useEffect(() => ....)
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData };
};
