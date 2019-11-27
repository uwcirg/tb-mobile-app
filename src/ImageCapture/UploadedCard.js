import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    backgroundColor: "#58a45c",
    color: "white",
    borderRadius: 0,
    textTransform: "none",
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title:{
    flexGrow: 1
  },
  pos: {
    marginBottom: 12,
  },
  button: {
      textTransform: "none",
      backgroundColor: "white",
      marginTop: 0,
  }
});

export default function UploadedCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} style={props.color? {backgroundColor: props.color} : ""}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
        {props.title}
        </Typography>
      </CardContent>


      {props.buttonText ? <CardActions>
        <Button onClick={props.action} className={classes.button} size="medium">{props.buttonText}</Button>
      </CardActions>: ""}

    </Card>
  );
}