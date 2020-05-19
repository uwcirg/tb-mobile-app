import React from 'react';
import Markdown from 'markdown-to-jsx';
import raw from "raw.macro";
import MarkdownRender from './Panel'
import Interactioncard from '../../Basics/InteractionCard'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors'
const file = raw("./information.md");



//Convert markdown file to expandable cards format
const useStyles = makeStyles({
    container:{
        paddingTop: "2em",
        paddingBottom: "2em",
        backgroundColor: Colors.lightgray
    }
})

export default function Info(){
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
        return (
            <div className={classes.container}>
            <Interactioncard className={classes.topCard} upperText={t("patient.information.questions")}>
                <Markdown options={{overrides: {Drawer: {component: MarkdownRender}}}} children={file} />
           </Interactioncard>
           </div>
        )
}