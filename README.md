# Asistente de Tratamiento:
Development Branch Tests: [![CircleCI](https://circleci.com/gh/uwcirg/tb-mobile-app/tree/develop.svg?style=svg)](https://circleci.com/gh/uwcirg/tb-mobile-app/tree/develop)

##  Mobile Application Intervention for Tuberculosis Patients
Tuberculosis remains one of the top ten causes of death globally despite it being largely curable. Patients face many challenges to adhere to treatment and mobile health (mHealth) interventions may address these challenges and support patients to complete their treatment. We aim to develop an application that has implications not only for TB adherence but disease management more generally and to improve our understanding of how to support patients throughout challenging treatment regimens.

## History of Project 
A previous version of this application was developed on this repo and the code is still available on the [v1-stable]([https://github.com/uwcirg/tb-mobile-app/tree/v1-stable](https://github.com/uwcirg/tb-mobile-app/tree/v1-stable)) branch.

Version 2 aims to provide a feedback driven UI, better user encouragement,v improved developer experience, and multi-site design. Furthermore, we aim to provide a good experience for users on inconsistent connections, using ideas from [progressive web apps]([https://developers.google.com/web/progressive-web-apps](https://developers.google.com/web/progressive-web-apps)).

## Software Architecture 
 
**Front End:**
 React + Mobx Application 
 Code: [tb-mobile-app](https://github.com/uwcirg/tb-mobile-app) (this repo)
 
**Back End:** 
Ruby on Rails API
Code: [tb-foundation](https://github.com/uwcirg/tb-foundation)


**Deployment Organized via Docker-Compose**
Make sure you have both .env and /public/env.js ( CRA Serviceworker Environment Workaround)

## Tests

Now that requirements have somewhat stabalized for this project, I am hoping to add more tests. Recently added react-testing-library and have experimented with simple tests for visibilty of componenets based on application state. There are important configuration files in `jest.config.js`,`src/testSetup.js `, and `package.json`


## Getting started with development

Running the full application requires Docker. You will need to spin up the services outlined in the docker-compose.yml file from this repo [tb-foundation](https://github.com/uwcirg/tb-foundation).

Once that process has completed, its best to run the React development server outside of docker like this:

```
yarn install
yarn start
```

More coming soon...
