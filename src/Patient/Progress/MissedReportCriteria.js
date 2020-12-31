import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import ClickableText from '../../Basics/ClickableText'
import Collapse from '@material-ui/core/Collapse'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  uncapitalize: {
    textTransform: "unset"
  },
  noReport: {
    "& > p": {
      margin: 0,
      marginTop: "5px"
    }
  }
})

const MissedReportInfo = (props) => {
  const { t} = useTranslation('translation');
  const classes = useStyles();
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  return (
    <div className={`${classes.noReport} ${props.className}`}>
      {!props.hideReport && <p>{t('patient.progress.noReport')}</p>}
      <ClickableText className={classes.uncapitalize} hideIcon onClick={toggleDetail} text={<>{t('patient.progress.whenBackReport')} {showDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</>}></ClickableText>
      <Collapse in={showDetail}>
        <p>{t('patient.progress.submissionLimit')}</p>
      </Collapse>
    </div>
  )
}
export default MissedReportInfo;