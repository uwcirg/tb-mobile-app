import React from 'react';
import { useTranslation } from 'react-i18next';
import InformationLink from '../../Patient/Information/InformationLink';
import Grid from '@material-ui/core/Grid';
import { Grow } from '@material-ui/core';
import { optionalRoutes } from '../../Content/photo-submission-flow';

const AdditionalPhotoFlowOptions = () => {
  const { t } = useTranslation();
  return (
    <>
      <h3>{t('patient.report.photo.other')}:</h3>
      <Grid container spacing={2}>
        {optionalRoutes.map((link) => (
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
