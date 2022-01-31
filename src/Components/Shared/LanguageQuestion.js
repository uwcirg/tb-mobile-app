import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import Colors from '../../Basics/Colors';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    group: {
        borderColor: Colors.textDarkGray
    },
    selected: {
        borderColor: Colors.gray,
        backgroundColor: Colors.gray,
        color: "#04193c",
        "& .label":{
            textDecoration: "underline",
        },
        "&:hover": {
            borderColor: Colors.gray,
            backgroundColor: Colors.gray,
            color: "#04193c"
        }
    },
    default: {
        borderColor: "#efefe",
        backgroundColor: "#295aad",
        color: "#efefef",
        "&:hover": {
            color: Colors.gray,
            backgroundColor: Colors.accentBlue
        }
    },
    languageContainer: {
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

})

const Flag = ({ children }) => <div style={{ fontSize: "1.5em", lineHeight: ".75em", padding: "5px 0"}}>{children}</div>;

const Label = ({ children }) => <Typography variant="body1" className="label" style={{ lineHeight: "1em", textTransform: "capitalize" }}>{children}</Typography>

const LanguageQuestion = observer(() => {

    const classes = useStyles();
    const { uiStore } = useStores();

    return (
        <div className={classes.languageContainer}>
            <ButtonGroup className={classes.group} fullWidth color="primary">
                <Button onClick={() => { uiStore.setLocale("es-AR") }} className={uiStore.locale === "es-AR" ? classes.selected : classes.default}>
                    <div>
                        <Flag>🇦🇷</Flag>
                        <Label>Español</Label>
                    </div>
                </Button>
                <Button onClick={() => { uiStore.setLocale("id") }} className={uiStore.locale === "id" ? classes.selected : classes.default}>
                    <div>
                        <Flag>🇮🇩</Flag>
                        <Label>Indonesia</Label>
                    </div>
                </Button>
                <Button onClick={() => { uiStore.setLocale("en") }} className={uiStore.locale === "en" ? classes.selected : classes.default}>
                    <div>
                        <Flag>🇺🇸</Flag>
                        <Label>English</Label>

                    </div>
                </Button>
            </ButtonGroup>
        </div>
    );
})

export default LanguageQuestion;
