import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Colors from '../Basics/Colors';
import Grid from '@material-ui/core/Grid';
import { CameraAltRounded } from '@material-ui/icons';
import Pill from '../Basics/Icons/Pill';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  adherence: {
    fontSize: '1em',
    lineHeight: '1em',
    marginLeft: 'auto',
  },
  title: {
    fontSize: '1em',
    color: Colors.textDarkGray,
    padding: 0,
    margin: 0,
  },
});

const AdherenceValue = ({ adherence, title, style, children, icon }) => {
  const classes = useStyles();
  const value = Math.floor(adherence * 100);

  if (!title)
    return (
      <Typography style={style} variant="h2" className={classes.adherence}>
        {value}%
      </Typography>
    );

  return (
    <Grid container alignItems="flex-start">
      {icon === 'camera' ? (
        <Box paddingTop="0.70em" paddingRight=".5em">
          <CameraAltRounded titleAccess={title} />
        </Box>
      ) : (
        <Box paddingTop="0.70em" paddingRight=".5em">
          <Pill>
            <title id="pill-icon">{title}</title>
          </Pill>
        </Box>
      )}
      {/* <Typography
        className={classes.title}
        style={{ paddingTop: '.90em', paddingRight: '.5em' }}
        variant="h2"
      >
        {`${title[0].toUpperCase()}${title.slice(1)}`}
      </Typography> */}
      <div style={{ flexGrow: 1, paddingRight: '.5em' }}>{children}</div>
      <Typography
        variant="h2"
        className={classes.adherence}
        style={{ paddingTop: '1em' }}
      >
        {value}%
      </Typography>
    </Grid>
  );
};

export default AdherenceValue;
