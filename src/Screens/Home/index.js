import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Progress from './Progress'
import ClCamera from '../../ImageCapture/ClCamera'

const Home = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore, props }) => {

    const { t, i18n } = useTranslation('translation');

    if(uiStore.onTreatmentFlow){
        return (<ClCamera isUploading={false} hasUploaded={false} setImages={{}} />)
    }else{
        return (<Progress />)
    }

}));


export default Home;