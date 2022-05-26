import React from 'react'
import { Box, ButtonBase } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function ReportContainer({ children, to , disabled }) {

    return (
        <ButtonBase component={Link} to={to} style={{ width: "100%", marginBottom: ".5em" }} disabled={disabled} >
            <Box flexGrow={1} padding=".5em" border={!disabled ? "solid 1px lightgray" : "none"} borderRadius="4px">
                {children}
            </Box>
        </ButtonBase>
    )
}