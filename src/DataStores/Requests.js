
const baseURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:5061" : "https://tb-api-test.cirg.washington.edu";
//const baseURL = `${process.env.REACT_APP_URL_API}`

const authenticatedRequest = (url, method, body) => {
    return fetch(`${baseURL}${url}`, {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(resolve => {

            if(resolve.status == 401){
                return new Error(401);
            }
            return resolve.json()})
        .then(json => { return json })
}

export default class APIHelper {

    //Send network request from predefined object of routes
    executeRequest(routes, route, body) {

        let routeInfo = routes[route];

        if (routeInfo) {
            return authenticatedRequest(...routeInfo, body);
        } else {
            throw new Error("Provided route not available.")
        }
    }

    //When you need to use parameters in a request (routes are not always predefined)
    executeRawRequest(route,method,body){
        return authenticatedRequest(route,method,body)
    }
}

