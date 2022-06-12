import { Box } from '@material-ui/core'
import React from 'react'

import Markdown from 'markdown-to-jsx';
import raw from "raw.macro";
import MarkdownRender from './Panel';

const file = raw("./information.md");

export default function QuestionsAndAnswers() {
    return (<Box>
        <Markdown options={{ overrides: { Drawer: { component: MarkdownRender } } }} children={file} />
    </Box>)
}