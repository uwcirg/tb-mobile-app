import React from "react";
import {
  Settings as SettingsIcon,
  AccessAlarmRounded,
  ContactSupportRounded,
  FeedbackRounded,
  OndemandVideoRounded,
  QuestionAnswerRounded,
  YouTube,
  Notifications,
  Map,
  EventNote,
} from "@material-ui/icons";
import Walkthough from "../Patient/Information/Walkthrough";
import Appointments from "../Patient/Information/Appointments";
import Settings from "../Patient/Settings";
import MedicationReminder from "../Patient/Information/MedicationReminder";
import QuestionsAndAnswers from "../Patient/Information/QuestionsAndAnswers";
import Videos from "../Patient/Information/Videos";
import TestInstructions from "../Patient/Information/TestInstructions";
import HelpVideos from "../Patient/Information/HelpVideos";
import { StaticVersion } from "../Basics/ErrorBoundary";
import NotificationInstructions from "../Patient/Information/NotificationInstructions";

const TestStripImage = () => {
  return <img width="64px" src="/img/test-instructions.png" />;
};

const patientContent = [
  {
    sectionTitle: "patient.profile.title",
    items: [
      {
        translationKey: "patient.profile.options.medicationReminder",
        to: "/information/medication-reminder",
        icon: <AccessAlarmRounded />,
        page: <MedicationReminder />,
      },
      {
        translationKey: "patient.reminders.appointments",
        to: "/information/appointments",
        icon: <EventNote />,
        page: <Appointments />,
      },
      {
        translationKey: "patient.information.otherSettings",
        to: "/information/settings",
        page: <Settings />,
        icon: <SettingsIcon />,
      },
    ],
  },
  {
    sectionTitle: "patient.information.infoSection",
    items: [
      {
        translationKey: "patient.information.questions",
        to: "/information/faq",
        icon: <QuestionAnswerRounded />,
        page: <QuestionsAndAnswers />,
      },
      {
        translationKey: "patient.information.videos",
        to: "/information/videos",
        icon: <OndemandVideoRounded />,
        page: <Videos />,
      },
    ],
  },
  {
    sectionTitle: "patient.information.helpSection",
    items: [
      {
        translationKey: "patient.information.testInstructions",
        to: "/information/test-instructions",
        icon: <TestStripImage />,
        page: <TestInstructions />,
      },
      {
        translationKey: "patient.information.helpVideos",
        to: "/information/help-videos",
        icon: <YouTube />,
        page: <HelpVideos />,
      },
      {
        translationKey: "patient.information.walkthrough.title",
        to: "/information/walkthrough",
        icon: <Map />,
        page: <Walkthough />,
      },
      {
        translationKey: "patient.information.techSupport",
        to: "/information/tech-support",
        icon: <ContactSupportRounded />,
        page: <StaticVersion />,
      },
      {
        translationKey: "patient.information.reportIssue",
        href: "https://forms.gle/gZHLZ4CGJT2J1V6p7",
        icon: <FeedbackRounded />,
      },
      {
        translationKey: "notificationInstructions.steps.title",
        to: "/information/notification-instructions",
        icon: <Notifications />,
        page: <NotificationInstructions />,
      },
    ],
  },
];

const practitionerContent = [
  {
    translationKey: "patient.information.questions",
    to: "/settings/information/faq",
    icon: <QuestionAnswerRounded />,
    page: <QuestionsAndAnswers />,
  },
  {
    translationKey: "patient.information.videos",
    to: "/settings/information/videos",
    icon: <OndemandVideoRounded />,
    page: <Videos />,
  },
  {
    translationKey: "patient.information.testInstructions",
    to: "/settings/information/test-instructions",
    icon: <TestStripImage />,
    page: <TestInstructions />,
  },
  {
    translationKey: "patient.information.helpVideos",
    to: "/settings/information/help-videos",
    icon: <YouTube />,
    page: <HelpVideos />,
  },
  {
    translationKey: "patient.information.techSupport",
    to: "/settings/information/tech-support",
    icon: <ContactSupportRounded />,
    page: <StaticVersion />,
  },
  {
    translationKey: "notificationInstructions.steps.title",
    to: "/settings/information/notification-instructions",
    icon: <Notifications />,
    page: <NotificationInstructions />,
  },
];

const idPatientContent = [
  {
    sectionTitle: "patient.profile.title",
    items: [
      {
        translationKey: "patient.profile.options.medicationReminder",
        to: "/information/medication-reminder",
        icon: <AccessAlarmRounded />,
        page: <MedicationReminder />,
      },
      {
        translationKey: "patient.reminders.appointments",
        to: "/information/appointments",
        icon: <EventNote />,
        page: <Appointments />,
      },
      {
        translationKey: "patient.information.otherSettings",
        to: "/information/settings",
        page: <Settings />,
        icon: <SettingsIcon />,
      },
    ],
  },
  {
    sectionTitle: "patient.information.infoSection",
    items: [
      {
        translationKey: "patient.information.questions",
        to: "/information/faq",
        icon: <QuestionAnswerRounded />,
        page: <QuestionsAndAnswers />,
      },
      {
        translationKey: "patient.information.videos",
        to: "/information/videos",
        icon: <OndemandVideoRounded />,
        page: <Videos />,
      },
    ],
  },
  {
    sectionTitle: "patient.information.helpSection",
    items: [
      {
        translationKey: "patient.information.testInstructions",
        to: "/information/test-instructions",
        icon: <TestStripImage />,
        page: <TestInstructions />,
      },
      {
        translationKey: "patient.information.walkthrough.title",
        to: "/information/walkthrough",
        icon: <Map />,
        page: <Walkthough />,
      },
      {
        translationKey: "patient.information.techSupport",
        to: "/information/tech-support",
        icon: <ContactSupportRounded />,
        page: <StaticVersion />,
      },
      {
        translationKey: "patient.information.reportIssue",
        href: "https://forms.gle/gZHLZ4CGJT2J1V6p7",
        icon: <FeedbackRounded />,
      },
      {
        translationKey: "notificationInstructions.steps.title",
        to: "/information/notification-instructions",
        icon: <Notifications />,
        page: <NotificationInstructions />,
      },
    ],
  },
];

export { patientContent, practitionerContent, idPatientContent };
