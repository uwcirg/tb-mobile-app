import {accountStore, AccountStore} from "../accountStore";
import TestHelper from "../MockRequests";

const mockApi = new TestHelper()

it("setup", () => {
    const store = new AccountStore(mockApi);
    store.getCurrentUserInformation().then( () =>{
        expect(store.sessionExpired).toBe(true);
    });
    
})
