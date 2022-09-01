import React from 'react';
import { useTranslation } from 'react-i18next';
import BlockIcon from '@material-ui/icons/Block';
import LaterIcon from '@material-ui/icons/Update';
import InformationLink from '../../Patient/Information/InformationLink';
import Grid from '@material-ui/core/Grid';
import { Grow } from '@material-ui/core';

const TestStripImage = () => {
  return <img width="64px" src="/img/test-instructions.png" alt="test strip" />;
};

const linkContent = [
  {
    icon: <TestStripImage />,
    translationKey: 'patient.information.testInstructions',
    to: '/information/test-instructions',
  },
  {
    icon: <LaterIcon />,
    translationKey: 'patient.report.photo.submitLater',
    to: '/',
  },
  {
    icon: <BlockIcon />,
    translationKey: 'patient.report.photo.unable',
    to: '/',
  },
];

// rename to something else
const AdditionalPhotoFlowOptions = () => {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t('patient.report.photo.other')}:</h3>
      <Grid container spacing={2}>
        {linkContent.map((link) => (
          <Grow in={true} {...(true ? { timeout: 1000 } : { timeout: 200 })}>
            <Grid key={link.translationKey} item xs={6}>
              <InformationLink
                icon={link.icon}
                translationKey={t(link.translationKey)}
                to={link.to}
              />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </>
  );
};

export default AdditionalPhotoFlowOptions;
