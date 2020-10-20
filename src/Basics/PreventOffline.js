import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from './UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        "& > p": {
            margin: "1em",
            fontSize: "1.5em"
        }

    }
})

const PreventOffline = observer((props) => {

    const classes = useStyles();
    const { uiStore } = useStores();

    const {t} = useTranslation('translation');

    return (<>
        {!uiStore.offline ? <>{props.children}</> : <div className={classes.container}>
            <p>{props.type} {t('errors.offline')}</p>
        </div>}
    </>)

});

export default PreventOffline;