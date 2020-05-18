//Environment variables for development, when not using docker
//These will be overriden when a build artifact is created (see Dockerfile)
console.log("Using Development Environment Variables. If needed configure /public/config.js")
const react_env = {URL_API: "http://localhost:5061",URL_CLIENT:"http://localhost:3000"}