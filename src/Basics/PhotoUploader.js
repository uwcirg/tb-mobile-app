export default function uploadPhoto(url,file){
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: file
    }).then(response => {
        return true
    })
}