import {
  Box,
  ButtonBase,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';
import { Link } from 'react-router-dom';
import capitalizeFirstLetter from '../../Utility/StringUtils';

const useStyles = makeStyles({
  box: {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '5px',
    borderRadius: '5px',
    display: 'flex',
    aspectRatio: '1',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > p': {
      textAlign: 'center',
      fontSize: '.9rem',
    },
    '&  svg': {
      fontSize: '4em',
      color: Colors.buttonBlue,
    },
  },
  buttonText: {
    width: '100%',
    lineHeight: '1.1rem',
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: '140px',
    overflowWrap: 'break-word',
  },
});

export default function InformationLink({ icon, translationKey, to, href }) {
  const classes = useStyles();
  const { t } = useTranslation('translation');

  return (
    <ButtonBase
      className={classes.box}
      component={href ? 'a' : Link}
      to={href ? null : to}
      onClick={
        href
          ? () => {
              window.open(href);
            }
          : null
      }
    >
      <Box padding=".5em 0">{icon}</Box>
      <Box
        padding="0 .5rem"
        width="100%"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Typography className={classes.buttonText}>
          {capitalizeFirstLetter(t(translationKey).toLowerCase())}
        </Typography>
      </Box>
    </ButtonBase>
  );
}
