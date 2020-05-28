import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react';
import useStores from '../Basics/UseStores';
import Colors from '../Basics/Colors';
import Tooltip from '@material-ui/core/Tooltip';

const GRAPH_MARKER_SIZE = 20;

const useStyles = makeStyles({
  container:{
      margin: "3em",
      width: "80%",
      height: "300px",
      display: "flex",
      position: "relative",
      
  },
  column:{
      position: "relative",
      width: "100px"
  },
  box:{
      height: `${GRAPH_MARKER_SIZE}px`,
      width: `${GRAPH_MARKER_SIZE}px`,
      borderRadius: `${GRAPH_MARKER_SIZE/2}px`,
      border: "solid 1px white",
      backgroundColor: Colors.buttonBlue,
      position: "absolute"
  },
  backgroundContainer:{
    opacity: "75%",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    "& > .row":{
        flexGrow: "1",
    }
  },
  xLabel:{
      position: "absolute",
      textAlign: "center",
      top: "-2em",
      display: "flex",
      width: "100%",
      "& > div":{
          flexGrow: "1"
      }
  },
  yLabel:{
    height: "100%",
    position: "absolute",
    left: "-3em",
    display: "flex",
    flexDirection: "column-reverse",
    "& > div":{
        flexGrow: "1",
        display: "flex",
        alignItems: "center"
    }
  },
  xDivider:{
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    display: "flex",
    "& > div":{
        borderRight: "solid 2px white",
        flexGrow: "1"
    },
    "& > div:last-of-type":{
        borderRight: "none"
    }
  }
})

const Adherence = observer(() => {

    const {practitionerStore} = useStores();
    const classes = useStyles();

    useEffect(()=>{
        practitionerStore.getPatientsTest();
    },[])

    const handleMouseIn = () => {
        console.log("Mouse in")
    }

    const handleMouseOut = () => {
        console.log("mouse out")
    }

    return(
    <div className={classes.container}>
        <Background />
        {practitionerStore.testPatients.map(each => {
            const bottomCalc = each.adherence > 0 ? `calc(${each.adherence * 100}% - ${GRAPH_MARKER_SIZE}px)` : "0px";
            return(
            <Tooltip title={<><h1>{each.fullName}</h1>
            <p>Adherence: {Math.round(each.adherence * 100)}%</p>
            <p>Days In Treatment: {each.daysInTreatment}</p>
            </>} ><div
            style={{bottom: bottomCalc, left: `${each.percentageComplete * 100}%`}} 
            className={classes.box}> </div></Tooltip>)
        })}
    </div>)

});

const Background = () => {

    const colors = ["#B2F1BE","#D3FAD5","#FEF5B8","#FDA67D","#F0715D"]
    const classes = useStyles();

    let labels = []
    let dividers = []
    let column = []

    for (let step = 0; step < 10; step++) {
        const color = step < colors.length -1 ? colors[step] : colors[colors.length -1];
        column.push(<div className="row" style={{backgroundColor: color}} />)
        labels.push(<div className="yLabel">.{step * 10}</div>)
    }

    let months = []

    for (let step = 0; step < 6; step++) {
        months.push(<div className="month">Month {step + 1}</div>)
        dividers.push(<div></div>)
    }

    return(
        <div className={classes.backgroundContainer}>
            <div className={classes.xLabel}>{months} </div>
            <div className={classes.yLabel}>{labels}</div>
            <div className={classes.xDivider}>{dividers}</div>
            {column}
        </div>
    )
}

export default Adherence;