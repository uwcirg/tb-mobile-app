# Tuberculosis Treatment Support Tools:

Development Branch Tests: [![CircleCI](https://circleci.com/gh/uwcirg/tb-mobile-app/tree/develop.svg?style=svg)](https://circleci.com/gh/uwcirg/tb-mobile-app/tree/develop)

<img width="700px" alt="Screen Shot 2022-08-02 at 11 34 50 AM" src="https://user-images.githubusercontent.com/10137989/182414444-2bd00346-104f-469d-ad5a-4769aacc695b.png">

## mHealth Intervention to support people with TB

Tuberculosis remains one of the top ten causes of death globally despite it being largely curable. Patients face many challenges to adhere to treatment and mobile health (mHealth) interventions may address these challenges and support patients to complete their treatment. We aim to develop an application that has implications not only for TB adherence but disease management more generally and to improve our understanding of how to support patients throughout challenging treatment regimens.

## Branches used in deployments

Pilot Study (2018 - 2019). Code available on the [v1-stable](<[https://github.com/uwcirg/tb-mobile-app/tree/v1-stable](https://github.com/uwcirg/tb-mobile-app/tree/v1-stable)>) branch.

Clinical trial (2020 - Current). Code available on the [master](<[https://github.com/uwcirg/tb-mobile-app/tree/v1-stable](https://github.com/uwcirg/tb-mobile-app/tree/master)>) branch.

Indonesian Pilot Study (2022 - Current). Code available on the [prod-id](<[https://github.com/uwcirg/tb-mobile-app/tree/v1-stable](https://github.com/uwcirg/tb-mobile-app/tree/prod-id)>) branch.

## System Components

**Main Frontend:**
React Application
Code: [tb-mobile-app](https://github.com/uwcirg/tb-mobile-app) (this repo)

**Back End API:**
Ruby on Rails App + Docker-Compose Deployment Configuration
Code: [tb-foundation](https://github.com/uwcirg/tb-foundation)

## Tests

There are very minimal tests, but this could be an area to improve in the future.

Current tests use react-testing-library and there are important configuration files in `jest.config.js`,`src/testSetup.js `, and `package.json`

To run the test suite run:

```
yarn test
```

To check coverage run:

```
yarn test:coverage
```

## Getting started with development

More details are available in the Wiki page: [Deployment and Build Processes](https://github.com/uwcirg/tb-mobile-app/wiki/Deployment-and-Build-Processes)

Running the full application requires Docker. You will need to spin up the services outlined in the docker-compose.yml file from this repo [tb-foundation](https://github.com/uwcirg/tb-foundation).

Once that process has completed, its best to run the React development server outside of docker like this:

```bash
yarn install
yarn start
```

If you are having node version issues, you can use nvm to install the correct version of node. We have set up a .nvmrc file to make this easier.

```bash
nvm use
```

## Production Build Process

Beacause this React app has been dockerized, the build process is a bit different from most React apps. Some environment variables and configuration files are modified at container up time to allow for deployments with different settings. See [Deployment and Build Processes](https://github.com/uwcirg/tb-mobile-app/wiki/Deployment-and-Build-Processes) for more details.

## Publications about this project

### Academic Journal Articles

1. [Patient-centered mobile tuberculosis treatment support tools (TB-TSTs) to improve treatment adherence: A pilot randomized controlled trial exploring feasibility, acceptability and refinement needs ( Lancet Regional Health Americas, September 2022)](https://www.sciencedirect.com/science/article/pii/S2667193X22001089?via%3Dihub)
2. [Mobile Tuberculosis Treatment Support Tools to Increase Treatment Success in Patients with Tuberculosis in Argentina: Protocol for a Randomized Controlled Trial (JMIR Research Protocols, January 2022)](https://www.researchprotocols.org/2021/6/e28094)
3. [Insights from participant engagement with the tuberculosis treatment support tools intervention: Thematic analysis of interactive messages to guide refinement to better meet end user needs (International Journal of Medical Informatics, May, 2021)](https://www.sciencedirect.com/science/article/abs/pii/S1386505621000472?via%3Dihub)

### Blogs

1. [Initiative and CoMotion co-fund grant to better treat and prevent tuberculosisÏ](https://www.washington.edu/populationhealth/2021/06/22/initiative-and-comotion-co-fund-grant-to-better-treat-and-prevent-tuberculosis/)

## Contact

[Sarah Iribarren](https://nursing.uw.edu/person/sarah-iribarren-phd-rn/) is the primary investegator for this research project, please reach out with any inquirys about research or collaboration.

[Kyle Goodwin](https://github.com/kylegoodwin) lead most of the technical development, reach out with any technical questions.
