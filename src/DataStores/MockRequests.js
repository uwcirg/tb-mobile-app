export default class TestHelper {

    //Send network request from predefined object of routes
    executeRequest(routes, route, body) {
        return new Promise((resolve, reject) => {
        
            process.nextTick(() =>{
                return jest.mock("api")
            }
                
            
            );
          });
    }

    //When you need to use parameters in a request (routes are not always predefined)
    executeRawRequest(route,method,body){
        return "TEST VALUE"
    }


}