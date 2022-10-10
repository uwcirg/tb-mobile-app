import localforage from "localforage";
import { useEffect, useState } from "react";

// const [hideSurvey,setHideSurvey] = useState(true);
const getLocalValue = async (localForageKey) => {
  return localforage.getItem(localForageKey).then((value) => {
    return value;
  });
};

const setLocalValue = async (localForageKey, value) => {
  return localforage.setItem(localForageKey, value).then((value) => {
    return true;
  });
};

// Hook from https://usehooks.com/useToggle/
// Parameter is the boolean, with default "false" value

const useLocalValue = (localForageKey, initalState) => {
  const [state, setState] = useState(initalState);

  useEffect(() => {
    getLocalValue(localForageKey).then((value) => {
      setState(value);
    });
  }, []);

  const setValue = (value) => {
    setState(value);
    setLocalValue(localForageKey, value);
  };

  return [state, setValue];
};

export default useLocalValue;
