import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import Colors from '../../Basics/Colors';
import Typography from '@material-ui/core/Typography';
import { Box, Grid, MenuItem, Select } from '@material-ui/core';

const LOCALES = [
  { id: 'es-AR', text: 'Español', flag: '🇦🇷' },
  { id: 'id', text: 'Indonesia', flag: '🇮🇩' },
  { id: 'en', text: 'English', flag: '🇺🇸' },
];

const useStyles = makeStyles({
  languageContainer: {
    maxWidth: '400px',
    padding: '1em',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  select: {
    boxSizing: 'border-box',
    margin: '1em',
    width: '90%',
    maxWidth: '400px',
    backgroundColor: 'white',
  },
  flag: { fontSize: '1.5em', lineHeight: '.75em', padding: '5px 0' },
  label: { lineHeight: '1em', textTransform: 'capitalize' },
});

const Flag = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.flag}>{children}</div>;
};

const Label = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.label} variant="body1">
      {children}
    </Typography>
  );
};

const LanguageQuestion = observer(() => {
  const classes = useStyles();
  const { uiStore } = useStores();

  const handleChange = (e) => {
    uiStore.setLocale(e.target.value);
  };

  return (
    <Select
      variant="outlined"
      margin="dense"
      className={`${classes.select}`}
      labelId="language-select-label"
      id="language-select"
      value={uiStore.locale}
      onChange={handleChange}
    >
      {LOCALES.map((_locale) => {
        const { flag, text, id } = _locale;
        return (
          <MenuItem key={`language-select-${id}`} id={id} value={id}>
            <Grid alignItems="center" container wrap="nowrap">
              <Flag>{flag}</Flag>
              <Box width=".5em" />
              <Label>{text}</Label>
            </Grid>
          </MenuItem>
        );
      })}
    </Select>
  );
});

export default LanguageQuestion;
