    const userID = 1;

    const basicRequest = (url,method,body) => {

       return fetch(`${this.baseURL}${url}`, {
            method: "GET",
            headers: {
                "X-User": this.userID
            }
        })
        .then(resolve => resolve.json())
        .then(json => { return json });
    }


    const authenticatedRequest = (url,method,body) => {
        console.log("dddd")
        console.log(body)
        return fetch(`${process.env.REACT_APP_URL_API}${url}`, {
            method: method,
            headers: {
                "Authorization": localStorage.getItem("user.token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        .then(resolve => resolve.json())
        .then(json => { return json });

    }
    
    export default {
        authenticatedRequest
      };
