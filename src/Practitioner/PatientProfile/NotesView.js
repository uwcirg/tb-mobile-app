import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react'
import ReportCard from './ReportCard'

const useStyles = makeStyles({
  
})

const CompName = observer(() => {

    const classes = useStyles();

    return(<div>
<ReportCard>
    Note
</ReportCard>
<ReportCard>
    Note
</ReportCard>
<ReportCard>
    Note
</ReportCard>
<ReportCard>
    Note
</ReportCard><ReportCard>
    Note
</ReportCard>

    </div>)

})

export default CompName;