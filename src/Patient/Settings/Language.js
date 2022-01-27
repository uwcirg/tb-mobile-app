import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import Colors from '../../Basics/Colors';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Globe from '@material-ui/icons/Language';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    selected: {
        backgroundColor: Colors.buttonBlue,
        color: "white",
        "&:hover": {
            color: Colors.white,
            backgroundColor: Colors.accentBlue
        }
    },
    default: {
        backgroundColor: "white",
        color: Colors.buttonBlue,
        "&:hover": {
            color: Colors.buttonBlue,
            backgroundColor: Colors.accentBlue
        }
    },
    group: {
        width: "100%",
        margin: "1em"
    },
    languageContainer: {
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

})

const LanguageQuestion = observer(() => {
    const classes = useStyles();
    const { uiStore } = useStores();
    // const { t } = useTranslation('translation');

    return (
        <div className={classes.languageContainer}>
            <ButtonGroup className={classes.group} fullWidth color="primary">
                <Button onClick={() => { uiStore.setLocale("en") }} className={uiStore.locale === "en" ? classes.selected : classes.default}>
                    <div>
                        <Typography style={{fontSize: "2em"}}>🇺🇸</Typography>
                        <Typography>English</Typography>
                    </div>
                </Button>
                <Button onClick={() => { uiStore.setLocale("es-AR") }} className={uiStore.locale === "es-AR" ? classes.selected : classes.default}>
                    <div>
                    <Typography style={{fontSize: "2em"}}>🇦🇷</Typography>
                        <Typography>Español</Typography>
                    </div>
                </Button>
                <Button onClick={() => { uiStore.setLocale("id") }} className={uiStore.locale === "id" ? classes.selected : classes.default}>
                    <div>
                    <Typography style={{fontSize: "2em"}}>🇮🇩</Typography>
                        <Typography>Indonesia</Typography>
                    </div>
                </Button>
            </ButtonGroup>
        </div>
    );
})

export default LanguageQuestion;
