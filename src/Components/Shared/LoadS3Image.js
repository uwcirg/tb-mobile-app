import React, { useState } from 'react';
import SharedAPI from '../../API/SharedAPI';
import useAsync from '../../Hooks/useAsync';
import PropTypes from 'prop-types'

const LoadS3Image = (props) => {

    const { photo } = props;

    const getNewPresignedURL = async () => {
        return SharedAPI.getPhoto(photo.photoId);
    }

    const [state,setState] = useState({src: photo.url, numberOfTrys: 0});

    const { execute, value } = useAsync(getNewPresignedURL, false)

    const handleError = () => {
        if(state.numberOfTrys > 0) return;
        setState({...state, numberOfTrys: state.numberOfTrys + 1})
        execute();
    }

    return (<img src={value ? value.url : photo.url} onError={handleError} {...props} />)

}

LoadS3Image.propTypes = {
    photo: PropTypes.shape({
        photoId: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })
}

export default LoadS3Image;