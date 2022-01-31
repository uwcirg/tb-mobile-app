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
        borderColor: "#88b3f8",
        backgroundColor: "#88b3f8",
        color: "#04193c",
        "& .label":{
            fontWeight: "bold"
        },
        "&:hover": {
            borderColor: "#88b3f8",
            backgroundColor: "#88b3f8",
            color: "#04193c"
        }
    },
    default: {
        borderColor: "#efefe",
        backgroundColor: "#295aad",
        color: "#efefef",
        "&:hover": {
            color: Colors.lightgray,
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

const Flag = ({ children }) => <Typography style={{ fontSize: "1.5em", lineHeight: "1em" }}>{children}</Typography>;

const Label = ({ children }) => <Typography variant="body1" className="label" style={{ textTransform: "capitalize" }}>{children}</Typography>

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
