//Taken from https://usehooks.com/useAsync/

import React, { useState, useEffect, useCallback } from "react";

const useAsync = (asyncFunction, immediate = true) => {

  let unmounted = false;

  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus("pending");
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        if (!unmounted) {
          setValue(response);
          setStatus("success");
        }
      })
      .catch((error) => {
        if (!unmounted) {
          setError(error);
          setStatus("error");
        }
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
    return function cleanup() {
      unmounted = true;
    }
  }, [execute, immediate]);
  return { execute, status, value, error, setValue };
};

export default useAsync;