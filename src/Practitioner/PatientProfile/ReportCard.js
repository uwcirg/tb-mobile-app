import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';
import Collapse from '@material-ui/core/Collapse';
import {DateTime} from 'luxon';
import IconButton from '@material-ui/core/IconButton'
import ExpandButton from '@material-ui/icons/KeyboardArrowDown'
import CollapseButton from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles({
    report: {
        ...Styles.profileCard,
        boxSizing: "border-box",
        width: "95%",
        backgroundColor: "white",
        marginBottom: "1em",
        marginLeft: ".5em",
        "& > .preview": {
            minHeight: "85px",
            transition: "all 2s ease",
            display: "flex",
            padding: ".5em 1em .5em 1em",
            alignItems: "center",
            "& > button.expand": {
                marginLeft: "auto"
            },
            "& > .time": {
                height: "auto",
                marginRight: "1em",
                ...Styles.flexColumn,
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                "& > span": {
                    fontSize: "1.5em",
                    margin: 0
                },
                "& > p": {
                    fontSize: "1em",
                    margin: 0
                }
            }
        }
    },
    tag: {
        backgroundColor: props => props.backgroundColor,
        padding: "5px",
        textTransform: "uppercase",
        letterSpacing: "1.15px",
        fontSize: ".75em"
    }
})

const Tag = (props) => {
    const classes = useStyles(props);
    return <span className={classes.tag}>{props.children}</span>
}

const ReportCard = (props) => {
    const [expanded, setExpanded] = useState(false);

    const classes = useStyles();
    const date = DateTime.fromISO(props.date);

    return (
        <div className={classes.report}>
            <div className="preview">
                <div className="time">
                    <span>{date.day}</span>
                    <p>{date.monthShort}</p>
                </div>
                <Tag backgroundColor={props.tagColor}>{props.tagText}</Tag>
                {props.children}
                {props.expandedContent && <IconButton className="expand" onClick={() => { setExpanded(!expanded) }}>{expanded ? <CollapseButton /> : <ExpandButton />}</IconButton>}
            </div>
            {props.expandedContent && <Collapse in={expanded}>
                {props.expandedContent}
            </Collapse>}
        </div>)

}

export default ReportCard;