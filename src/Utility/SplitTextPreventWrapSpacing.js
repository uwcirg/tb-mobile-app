import React from 'react'

const SplitTextPreventWrapSpacing = ({ text }) => {
    return (
        <>
            {text.split(" ").map(each => {
                return (<>{each}<br /></>)
            })}
        </>
    )
}

export default SplitTextPreventWrapSpacing;