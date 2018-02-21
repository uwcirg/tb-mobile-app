const fetchPatient = (smartClient, action, target) => {
    let p = smartClient.patient.read()
        .then((p) => {
            let name = p.name[0];
            let formatted = name.given.join(" ") + " " + name.family.join(" ");
            let newAction = Object.assign({}, action, {
                [target]: formatted
            });
           delete newAction.meta;
           return newAction;
        })
        .catch((error) => {
            console.log(error);
            let newAction = Object.assign({}, action, {
                [target]: "Unable To Find Patient: " + error
            });
            delete newAction.meta;
            return newAction;

        });

    console.log(p);
    return p;
}

//   }
const getSmartClient = (serviceHost, patientId) => {
    return window.FHIR.client({
        serviceUrl: serviceHost,
        patientId: patientId,
        auth: {
            type: 'none'
        }
    });
}

const apiMiddleware = store => next => action => {
    console.log("Action:\n");
    console.log(action);

    if (!action.meta) {
        return next(action);
    } else if(action.meta.type == 'sof') {
        const { host, id, target } = action.meta;

        let smart = getSmartClient(host, id);
        console.log(smart);
        fetchPatient(smart, action, target)
            .then(newAction => { 
                console.log("dispatching!!!")
                console.log(newAction);
                store.dispatch(newAction)
            });

    } else if(action.meta.type == 'api') {
        const { url, target } = action.meta;
        
        const fetchOptions = Object.assign({}, action.meta);

        fetch(url, fetchOptions)
            .then(resp => resp.json())
            .then(json => {
                let newAction = Object.assign({}, action, {
                    [target]: json.dateString
                });
                delete newAction.meta;
                console.log("dispatching!!!")
                console.log(newAction);
                store.dispatch(newAction);
            })
    }    
}

export default apiMiddleware