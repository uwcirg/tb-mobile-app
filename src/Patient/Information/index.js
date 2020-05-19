import React from 'react';
import Markdown from 'markdown-to-jsx'; 
import raw from "raw.macro";
import MarkdownRender from './MarkdownRender'
const file = raw("./information.md");
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