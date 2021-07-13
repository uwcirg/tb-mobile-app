import React from 'react';
import Gender from './Gender';
import Age from './Age';
import Notification from './Notification';
import ContactTracing from './ContactTracing';
import End from './End';
import Password from './Password';
import Landing from './Landing';
import PushPermissionsNotice from './PushPermissionNotice';
import AssistantFAQ from './AssistantFAQ';

export default [<Landing />, <AssistantFAQ />, <Password overrideNext />, <Gender />, <Age />, <PushPermissionsNotice overrideNext />, <Notification />, <ContactTracing />, <End overrideNext />]