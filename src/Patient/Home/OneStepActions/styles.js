import Colors from '../../../Basics/Colors';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    check: {
        color: Colors.approvedGreen,
        fontSize: "2.5em",
    },
    bottomButton: {
        margin: "1em",
        "& > svg": {
            fontSize: "1.25em"
        }
    },
    review: {
        padding: ".5em"
    },
    reportPreview: {
        "& > span": {
            margin: "auto"
        }
    },
    loadingMessage: {
        padding: "1em",
        "& div:first-of-type": {
            marginRight: ".5em"
        }
    },
    card: {
        padding: 0
    },
    sectionHeader: { lineHeight: "1.1em", fontSize: "1.1em", fontWeight: "light", margin: "0", display: "block", width: "100%" },
    buttonLabel: { 
        width: "unset", 
        padding: "2px .5em",
        "& svg, & p":{padding: 0},
        "& p": {fontSize: ".8em",textTransform: "capitalize",fontWeight: "bold"},
     }
})

export default useStyles;