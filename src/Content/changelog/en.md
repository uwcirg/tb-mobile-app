## v2.2

Changes:

Across App:
- Added new logo
- Clean up design of login screen inputs (limit width)

Patient Facing:
- Reports upload at each step now ( with the exception of offline reports )
    - ie. if a patient submits their medication but forgets to submit the rest of the report, it will still be recorded on the server
- Allow patients to skip photo submission if they provide a reason
- Confirmation screen has been removed and replaced with a confirmation, preview, and edit functionality on the homescreen's "Action Card"
- Make offline mode more clear

Treatment Assistant Facing:
- Added link to issue submission form
- Added task for patietns that have missed a photo submission
    - Shows the reason they provided for skipping if applicable
- Basic layout of improved task desing implemented at /review

Admin Panel:
- Don't show accoutns from the designated test site in results



## v2.1.4
Bug Fix:

- Newly signed up patients were being shown the "Action needed missed report" card for reports before their treatment start.
- Fixed this error for the days in the future or before treatment start


## v2.1.2
Bug Fix:

- Treatment Messages (weekly timed messages) were showing up blank. Fixed

## v2.1 December 31st, 2020

New Features:

- Changed clock for treatment logging flow
- Add updated video links
- Allow patients to report for first two weeks to account for adjustment period
- Show days where report was missed (that are still reportable) on home page
- Add tips for taking good photos on photo capture screen
- Show date for old report at top of screen to prevent confusion
- Require a reason for patients submitting a "Need Support" request
- Remove 180 days reference from progress card on home page
- Admin Functions
 - Veiw summary statistics about app use
 - Show status of recent photo submissions
 - ElastiAlert monitoring setup for server errors

Resolved Bugs:

- Fix pluralization for symptoms page
- Improve formatting for longer spanish translations
- Deleting appointments working
- Assistant mobile messaging missing channel bug fixed
- Add error handling for onboarding survey to prevent infinite loop


## v2.0.5 - November 13th-24th, 2020

New Features

 - Improved update experience. 
  - Previously required users to close all tabs of app, now they just click a button.
  - Added popup screen with update details
  - Now checks for new update every time app is launched
 - Added Version number and Change log
 - Add table of contents for walkthrough
 - Change design of walkthrough for easier navigation
 - Add more gender options in onboarding
 - Add "I don’t know" field for contact tracing survey
 - Add free-text note for appointments
 - Fix "other" appointment category to use inputed name in list
 - Make adherence a percentage on the shared patient sidebar (treatment assistant side)
 - Changed icon used to reference test strips

Translations

 - Updated translations for walkthrough table of contents
 - Fix "Next" translation on onboarding survey
 - Change english translations from "coordinator" -> treatment assistant

Resolved Bugs:

- Fixed walkthrough broken after onboarding completion
- Logo not showing up when not on home route
- Changing language when logged out is not persisted throughout app


