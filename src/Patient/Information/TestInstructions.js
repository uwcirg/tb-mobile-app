import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    container: {
        width: "100%",
    },
    list: {
        listStyle: "none",
        counterReset: "instructions",
        "& > li": {
            counterIncrement: "instructions",
            margin: "1em 0"
        },
        "& > li:before":{
            content: 'counter(instructions) "."',
            marginRight: "5px",
            fontWeight: "bold"
        },
        paddingLeft: "0",
        textAlign: "left",
        fontSize: "1em"
    },
    body: {

    },
    image: {
        width: "100%"
    },
    sublist:{
        paddingLeft: "20px",
        "& > li": {
            marginTop: ".5em"
        }
    }

})

const Instructions = (props) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<div className={`${classes.container} ${props.className}`}>
        <div className={classes.body}>
            <img className={classes.image} src={t('testStripInstructions.imgSrc')} />
            <ol className={classes.list}>
                <li>{t('testStripInstructions.one')}</li>
                <li>{t('testStripInstructions.two')}</li>
                <li>{t('testStripInstructions.three')}</li>
                <li>{t('testStripInstructions.four')}</li>
                <li>
                    {t('testStripInstructions.five.main')}
                    <ul className={classes.sublist}>
                        <li>{t('testStripInstructions.five.a')}</li>
                        <li> {t('testStripInstructions.five.b')}</li>
                    </ul>
                </li>
                <li>{t('testStripInstructions.six')}</li>
            </ol>
        </div>

    </div>)

}

export default Instructions;