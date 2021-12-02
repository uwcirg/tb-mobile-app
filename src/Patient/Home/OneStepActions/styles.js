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
    list: {
        margin: 0,
        padding: "0 1.5em",
        paddingRight: "0",
        "& li p": {
            lineHeight: "1.1em",
            fontSize: "1em"
        }
    },
    action: { width: "90%", backgroundColor: "white", borderRadius: "5px", color: Colors.textDarkGray },
    bottomButton: {
        fontSize: "1em",
        padding: "0"
    },
    card: {
        padding: 0,
        justifyContent: "flex-start"
    },
    allGood: {
        width: "100%",
        fontSize: "1em",
        padding: ".5em",
        margin: 0,
        marginRight: 0,
        "& > span": {
        },
    },
    issueButton: {
        flex: "1 1 0",
        color: Colors.textDarkGray,
        border: `1px solid ${Colors.textDarkGray}`,
        "&:nth-of-type(odd)": {
            marginRight: ".5em"
        }
    }
})

export default useStyles;