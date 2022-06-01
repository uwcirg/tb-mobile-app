/**
 * Some ideas about this implementation taken from 
 * https://stackoverflow.com/questions/56450975/to-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useeffect-cleanup-f
 */

/**
 * A hook to fetch async data.
 * @class useAsync
 * @borrows useAsyncObject
 * @param {object} _                props
 * @param {async} _.asyncFunc         Promise like async function
 * @param {bool} _.immediate=false    Invoke the function immediately
 * @param {object} _.funcParams       Function initial parameters
 * @param {object} _.initialData      Initial data
 * @returns {useAsyncObject}        Async object
 * @example
 *   const { execute, loading, value, error } = useAync({
 *    asyncFunc: async () => { return 'data' },
 *    immediate: false,
 *    funcParams: { data: '1' },
 *    initialData: 'Hello'
 *  })
 */

import { useCallback, useEffect, useRef, useState } from "react"


const useAsyncWithParams = ({ asyncFunc, immediate, funcParams, initialData }) => {

    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState(initialData)
    const [error, setError] = useState(null)
    const mountedRef = useRef(true)

    const reset = () => {
        if (!mountedRef.current) return null
        setStatus("idle");
        setValue(initialData)
        setError(null)
    }

    const execute = useCallback(() => {
        setStatus("pending")
        return asyncFunc(...funcParams)
            .then(res => {
                if (!mountedRef.current) return null
                setValue(res)
                setError(null)
                setStatus("success");
                return res
            }).catch(err => {
                if (!mountedRef.current) return null
                setError(err)
                setStatus("error");
                throw err
            })
    }, [asyncFunc, funcParams])

    useEffect(() => {
        if (immediate) {
            execute(funcParams)
        }
        return () => {
            mountedRef.current = false
        }
    }, [])

    return {
        execute,
        status,
        value,
        error,
        reset
    }
}

export default useAsyncWithParams;