import { Box } from '@material-ui/core'
import React from 'react'

import Markdown from 'markdown-to-jsx';
import raw from "raw.macro";
import MarkdownRender from './Panel';

const es = raw('../../Content/faq.md');
const indonesiaa = raw('../../Content/faq-id.md');

export default function QuestionsAndAnswers() {
    return (<Box>
        <Markdown options={{ overrides: { Drawer: { component: MarkdownRender } } }} children={indonesiaa} />
    </Box>)
}