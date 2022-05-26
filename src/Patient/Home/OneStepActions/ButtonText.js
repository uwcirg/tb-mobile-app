import React from 'react';
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core';
import capitalizeFirstLetter from '../../../Utility/StringUtils';

export default function ButtonText({ children: text }) {
    return (<Typography variant="body1">
        {capitalizeFirstLetter(text.toLocaleLowerCase())}
    </Typography>)
}



ButtonText.propTypes = {
    text: PropTypes.string
}