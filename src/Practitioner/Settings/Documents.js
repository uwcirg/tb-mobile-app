import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase'
import DocIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography';
import Colors from '../../Basics/Colors'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    document: {
        margin: "1em",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "300px",
        "& > p": {
            marginTop: ".5em"
        }
    },
    documentHeader: {
        color: Colors.buttonBlue,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        "& > h3": {
            fontSize: "1.5em",
            marginLeft: "5px"
        }
    },
    container: {
        padding: "1em"
    }
})

const Documents = () => {

    const classes = useStyles();
    const { t} = useTranslation('translation');

    return (<div className={classes.container}>
        <Document
            link="https://docs.google.com/document/d/14b8LLBAgWyF21isDdztHXOksvo5JC0LBDY6iyTKs13Y"
            title={t('coordinator.documents.manual')}
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nulla quis libero consequat sodales."
        />

        <Document
            link="https://docs.google.com/document/d/1yQLsyVGQRLa7dHLCUTLedFA3a2XHFy9dmWssIti4BEA"
            title={t('coordinator.documents.instructions')}
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nulla quis libero consequat sodales."
        />
    </div>)

}

const Document = (props) => {
    const classes = useStyles();
    return (
        <ButtonBase className={classes.document} target="blank" href={props.link}>
            <div className={classes.documentHeader}>
                <DocIcon style={{ fontSize: "2em" }} />
                <Typography variant="h3">{props.title}</Typography>
            </div>
            {/*<Typography variant="body1">
                {props.subtitle}
            </Typography>*/}

        </ButtonBase>
    )
}

export default Documents;