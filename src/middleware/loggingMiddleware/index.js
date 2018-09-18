const loggingMiddleware = (store) => (next) => (action) => {
    // Our middleware
    console.log(`Redux Log:`, action.type)
    // call the next function
    next(action);
}

export default loggingMiddleware