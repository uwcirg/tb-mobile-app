import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react';

const useStyles = makeStyles({
  body: {
    body: {
      width: '100%',
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }
  }
})

const Step1 = observer(() => {
    const classes = useStyles();

    return(<>
    <img src='/img/test-instructions/1.png' alt='pee in the cup'/>
    <p>Recoja una pequeña cantidad de orina en un recipiente (aproximadamente 2.5 cm).</p>
    </>)

})

export default Step1;