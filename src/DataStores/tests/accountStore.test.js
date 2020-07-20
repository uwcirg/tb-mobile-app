import {accountStore, AccountStore} from "../accountStore";
import TestHelper from "../MockRequests";

const mockApi = new TestHelper()
const store = new AccountStore(mockApi);
it("setup", () => {
    
    store.getCurrentUserInformation().then( () =>{
        expect(store.sessionExpired).toBe(true);
    });
    
})
