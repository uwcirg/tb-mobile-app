import Colors from '../../../Basics/Colors';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    progressLinks: {
        boxSizing: "border-box",
        width: "100%",
        borderTop: `1px solid ${Colors.lightgray}`,
        paddingTop: "1em",
        "& a:visited , & a":{
            color: "black",
            textDecoration: "none"
        }
    },
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
    sectionHeader: {
        lineHeight: "1.1em",
        fontSize: "1.1em",
        fontWeight: "500",
        margin: "0",
        display: "block",
        width: "100%",
        padding:".5rem 0"
    },
    buttonLabel: {
        width: "unset",
        padding: "2px .5em",
        "& svg, & p": { padding: 0 },
        "& p": { fontSize: ".8em", textTransform: "capitalize", fontWeight: "bold" },
    },
    reportIssueText: {
        textAlign: "center",
        backgroundColor: `${Colors.highlightYellow}`,
        borderRadius: "5px",
        padding: ".5em"

    }
})

export default useStyles;