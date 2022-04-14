import { useCallback, useEffect, useState } from "react";

const useRequestInitalData = (asyncFunctionWithPromise) => {

    const [state, setState] = useState({
        data: null,
        error: null,
        loading: false
    });

    const getData = useCallback(async () => {
        setState({ ...state, loading: true })

        try {
            let newData = await asyncFunctionWithPromise();
            setState({ ...state, data: newData, loading: false})
        } catch (err) {
            setState({...state, error: err, loading: false})
        }

    }, [])

    useEffect(() => {
        getData();
    }, [])

    return {...state, refresh: getData}

}

export default useRequestInitalData;