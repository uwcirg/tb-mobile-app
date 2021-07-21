//Environment variables for development, when not using docker
//These will be overriden when a build artifact is created (see Dockerfile)
console.log("Using Development Environment Variables. If needed configure /public/config.js")
const react_env = {URL_API: "http://localhost:5062",URL_CLIENT:"http://localhost:3000", DEFAULT_LOCALE: "es-AR", 
ENVIRONMENT: "development", DOCKER_TAG: "develop", REDCAP_EOT_SURVEY_LINK: "https://docs.google.com/forms/d/e/1FAIpQLSegqQ0rFOU3I2pxCPxhvWnfMnmyuOopUTqyWXT0oqt-23b5_w/viewform"}