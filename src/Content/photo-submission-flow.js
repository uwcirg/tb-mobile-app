import React from 'react';
import BlockIcon from '@material-ui/icons/Block';
import LaterIcon from '@material-ui/icons/Update';

const TestStripImage = () => {
  return <img width="64px" src="/img/test-instructions.png" alt="test strip" />;
};

const optionalRoutes = [
  {
    to: '/information/test-instructions',
    translationKey: 'patient.information.testInstructions',
    icon: <TestStripImage />,
  },
  {
    to: '/',
    translationKey: 'patient.report.photo.submitLater',
    icon: <LaterIcon />,
  },
  {
    to: '/unable-to-report',
    translationKey: 'patient.report.photo.unable',
    icon: <BlockIcon />,
  },
];

export { optionalRoutes };
