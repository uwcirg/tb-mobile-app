## v2.8
WIP (September 2021)
- Flag late photo submissions on the coordinator page
- Fix calendar styling bugs on patient side
- Add loading message when reporting history is loaded to prevent confusion about missing data

## v2.7
Released September 2nd, 2021

Patient Side:

- Allow for back submission of missed photos up to 3 days after the request
- Add new household testing survey, keep prompting for update until they have tested all contacts
- Update onboarding survey contact tracing to match new format
- Show link to end of treatment survey after 20 weeks


Assistant Side:

- Add visual of treatment progress on patient profile 
- View of contact tracing status on patient profile
- Redesign of reports table, clearly label back submissions
- Fix bug where patients who havent reported today would show up in missed medication reprot category


## v2.6 
Released July 20th, 2021

Patient Side:

- Turn off group messaging notifications to make push notifications less annoying
- Add instructions about how to enable push notifications at the system level
- Detect if they are not enabled and present warning with link to instructions
- Add screen to onboarding to explain notifications before asking for permission
- Track if patient is installing app or using in browser
- Fix display issues in onboarding
    - Button overlap with password input
    - Increase size of age input
    - Replace old analog time picker with same one used in daily report
- Add number only keyboard for phone number input on login screen

Assistant Side:

- Add label for archived patients in the chat tab
- Add link to survey on archived patient popup
- Add note from patient about skipped photo reports on report list

General:

- Improve buttons used for approve / cancel on date picking inputs
- Track user notification preferences on the server
- Make version number more readable, add to login screen
- Fix display of warning message for demo site
- Specify whether phone number or email was wrong for failed login
- Improve design of copyable text components
- Workaround for bug where update popup was causing titles to be very large


## v2.5
Released June 24th, 2021

Assistant View:

- Assistants can now archive patients
	- A treatment outcome and end date can be selected during this process
	- They will no longer show up in the list of tasks
	- Added list of archived patients on the patients tab, and you can access their profiles from here
	- Once archived patients can still access the app + messaging, but can no longer report
	- Archived patients adherence will not be calculated on a rolling basis, will instead be calculated based on the number of days they used the app
- Redesign top part of the patient profile to have more options and details
	- More details about adherence and 
- Summary of adherence at your site is now available at the top of the tasks list
- Patients names will now be listed in site level chats ( only visible to assistants )

Patient View:

- Congrats message when treatment is completed + link to survey
- Limit reporting after they have been marked as archived

Adherence / Priority Calculations:

- Add photo adherence number ( positive photos / photos submitted / requested )
- Calculate adherence from date patient started using the app ( some assistants were putting in a different value for "treatment start date"
- Missing a photo makes a patient high priority

Other Small Changes:

- Redesigned sidebar of tasks page to be more consistent with rest of app
- Moved patients awaiting activation list to top of cohort page
- Removed site summary from side of cohort view because it was confusing 
- Limited number of messages loaded at a time to speed up load times for messaging
- Improved loading UI for messages
- Added button to copy temporary code for patient activation 

## v2.4.2

API Changes Only:

- Fixed bug where clicking on assistant chat would take you to site group chat
- Allow hiding messages in site group chat

## v2.4.1

Changes:
- Updated test strip instructions to reflect new strip design
- Added a popup to clarify new test strip instructions to existing users
- New test strip instruction video

Bug Fixes:
- Issue with new patient registration, would have prevented new patients from being registered after the onboarding survey

## v2.4

New Features / Changes

- Adjust photo request schedules due to logistical issues
- Tracking push notification delivery and clicks via service-worker middleware
- Reminders to complete a test on a day when it has been requested
    - If not completed, a second reminder will be sent
- Reminders for patients that have stopped reporting for more than 3 days
- Enable external admin panel
- Add warning to the demo, saying it should not be used for patient data
- Add site level messaging
    - Coordinators now have access to a channel that is only for patients at their site
    - Used for site level announcements and discussions
- Clicking on a messaging notification will open the relevant channel
- Create patient_information table to move patient specific fields out of user model
- Coordinators can now see which category of messages has unread messages

Bug Fixes:

- Fix timezone bug when adding a photo day on a patients first day
- Fix onboarding survey not recording number of contacts
- Fix item number 6's appearance on the onboarding survey
- Ignore click-aways on coordinator side activation code for new patients 

## v2.3.1
- Fix missing translation with new update about group chat

## v2.3
Changes:

Fix education messages:

- Show one per day, defaulting to the earliest missed one if not viewed yet
- Added message alerting patients that they can chat anonymously
- Added nice visuals to the treatment updates
- Limited the width of popups for larger screens

Password Reset:

- Add in a screen to prompt a user to update their password when it has been reset
- Fix styles on password update screen
- Move password reset button to make it more visible on coordinator side

Photo Uploading State:

- Add loading state for report
- Max out image size to 650px
- Translations for error reports / uploading state

Coordinator Side:

- Allow editing of patient details on coordinator side
- Cleanup patient profile on coordinator side
- Improve button placement on smaller screen sizes
- Remove dead data
- Lazy load long list of reports
- Add treatment end date for patients, make it editable

Behind the scenes:
- Updated tests w/ react-testing-framework
- Integrated Swagger documentation generation
- Moved messaging notification generation to workers
- Refactor treatment messages into translation software


## v2.2

Changes:

Across App:

- Added new logo
- Clean up design of login screen inputs (limit width)

Patient Facing:

- Reports upload at each step now ( with the exception of offline reports )
 - ie. if a patient submits their medication but forgets to submit the rest of the report, it will still be recorded on the server
- Allow patients to skip photo submission if they provide a reason
- Confirmation screen has been removed and replaced with a confirmation, preview, and edit functionality on the home-screen's "Action Card"
- Make offline mode more clear

Treatment Assistant Facing:

- Added link to issue submission form
- Added task for patients that have missed a photo submission
 - Shows the reason they provided for skipping if applicable
- Basic layout of improved task design implemented at /review

Admin Panel:

- Don't show accounts from the designated test site in results



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
 - View summary statistics about app use
 - Show status of recent photo submissions
 - ElastiAlert monitoring setup for server errors

Resolved Bugs:

- Fix pluralization for symptoms page
- Improve formatting for longer Spanish translations
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


