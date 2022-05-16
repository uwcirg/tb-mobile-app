import { Box } from '@material-ui/core'
import React from 'react'
import IssueSection from './IssueSection'
import { useTranslation } from 'react-i18next';
import { SentimentDissatisfied } from '@material-ui/icons';

export default function SupportRequests({ supportRequests }) {
    
    const { t } = useTranslation('translation');

    return (<IssueSection
        title={t('commonWords.symptoms')}
        icon={SentimentDissatisfied}
        number={supportRequests.length}  >
        {supportRequests.map(each => {
            return (<Box key={`suport-${each.date}`}>
                {each.date}: {each.reason}
            </Box>);
        })}
    </IssueSection>)
}