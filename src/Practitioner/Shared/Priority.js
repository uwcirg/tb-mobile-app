import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors'


const useStyles = makeStyles({
    priority:{
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: ".75em",
        padding: ".5em 1em .5em 1em",
        color: "white",
        textTransform: "uppercase",
        backgroundColor: props => props.color
    }
  
})

const Priority = (props) => {
    const { t } = useTranslation('translation');
    let text = ""; 
    let color;

    switch (props.index) {
        case 0:
          text = t('coordinator.priority.low')
          color = Colors.green;
          break;
        case 1:
          text = t('coordinator.priority.medium')
          color = Colors.yellow;
          break;
        default:
          text = t('coordinator.priority.high')
          color = '#EB5757';
      }
    
    const classes = useStyles({color: color});

    return(<span className={classes.priority}>
        {text}
    </span>)

}

export default Priority;