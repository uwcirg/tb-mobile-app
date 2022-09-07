import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PractitionerContext from '../PractitionerContext';
import ReportingPopover from '../Shared/ReportingPopOver';

const WrappedReportingPopover = () => {
  const { patientId } = useParams();
  const patient =
    useContext(PractitionerContext).patientIssues?.value?.find((each) => {
      return each.id === parseInt(patientId);
    }) || null;
  const history = useHistory();

  return (
    <ReportingPopover
      handleExit={() => {
        history.push('/home/needs-review');
      }}
      patient={patient}
    />
  );
};

export default WrappedReportingPopover;
