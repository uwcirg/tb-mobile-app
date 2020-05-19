import React from 'react';
import Markdown from 'markdown-to-jsx'; 
import raw from "raw.macro";
import MarkdownRender from './Panel'
const file = raw("./information.md");

import Interactioncard from '../../Patient/'
//Convert markdown file to expandable cards format

export default class Info extends React.Component {
    render() {
        return (
            <div>

                <Markdown options={{
            overrides: {
                Test: {
                    component: MarkdownRender,
                },
            },
        }} children={file} />
            </div>
        )
    }
}