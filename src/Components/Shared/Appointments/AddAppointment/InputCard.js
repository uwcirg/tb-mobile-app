import { Box, Card, Typography, withStyles } from '@material-ui/core'
import React from 'react'

const InputCard = ({ title, children }) => {
    return (
        <>
            <SectionCard>
                <Box padding="16px">
                    <SectionTitle>{title}</SectionTitle>
                    <Box padding="8px 0">
                        {children}
                    </Box>
                </Box>
            </SectionCard>
            <Box height="16px" />
        </>
    )
}

const SectionTitle = withStyles({
    root: {
        fontSize: "1.125rem",
        fontWeight: "bold"
    }
})(Typography)

const SectionCard = withStyles({
    root: {
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
    }
})(Card)

export default InputCard;