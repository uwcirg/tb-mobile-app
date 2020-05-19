import React from 'react';
import Markdown from 'markdown-to-jsx';
import raw from "raw.macro";
import MarkdownRender from './Panel'
import Interactioncard from '../../Basics/InteractionCard'
import { makeStyles } from '@material-ui/core/styles'
const file = raw("./information.md");

//Convert markdown file to expandable cards format
const useStyles = makeStyles({
    container:{
        marginTop: "2em"
    }
})

export default function Info(){
    const classes = useStyles();
        return (
            <div className={classes.container}>
            <Interactioncard className={classes.topCard} upperText={"Questions and Answers"}>
                <Markdown options={{
                    overrides: {
                        Drawer: {component: MarkdownRender},
                    },
                }} children={file} />
           </Interactioncard>
           </div>
        )
}