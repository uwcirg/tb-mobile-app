import React from 'react';
import { Column, Col, Card, CardBody, CardTitle, CardText, Table } from 'reactstrap';
import PropTypes from 'prop-types';

export default class extends React.Component {
  static propTypes = {
    onComponentRefresh: PropTypes.func.isRequired,
    requestRefresh: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loaded: false,
      status: "Not Loaded",
      patients: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // Check to see if the requestRefresh prop has changed
    console.log("Patients - Checking! " + nextProps.requestRefresh + "|" + this.props.requestRefresh)

    if (nextProps.requestRefresh !== this.props.requestRefresh & nextProps.requestRefresh) {
      console.log("Setting - Patients")
      this.setState({loading: true, status: "Not Loaded"}, this.fetchPatients);
    }
  }

  fetchPatients() {
    var api_path = "https://mpower-api.cirg.washington.edu";

    fetch(api_path+'/api/v1.0/patients').then((response) => response.json()).then((responseJson) => {
      this.setState({patients: responseJson.patients, loading: false, loaded: true, status: "Loaded"}, this.props.onComponentRefresh)
    }).catch((error) => {
      console.error(error);
      this.setState({status: error.message, loading: false, loaded: false}, this.props.onComponentRefresh);
    });
  }

  render() {
    const {loading, patients, status, loaded} = this.state
    return (
      <Card>
        <CardBody>
          <CardTitle>Patients</CardTitle>
          <CardText>List of patients recieved from mPOWEr API</CardText>
        </CardBody>
        <CardBody>
          {(() => {
            if(loading | !loaded){
              return(<h3>{loading ? "Loading" : "Not Loading"} and {status} </h3>)
            } else {
              return(<div>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>MRN</th>
                      <th>Date of Birth</th>
                      <th>Sex</th>
                      <th>Consent Status</th>
                      <th>Clinical Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.patients.map((patient) =>
                        <tr key={patient.id}>
                          <th scope="row">{patient.id}</th>
                          <td>{patient.MRN}</td>
                          <td>{patient.birthdate}</td>
                          <td>{patient.gender}</td>
                          <td>{patient.consent_status}</td>
                          <td>{patient.clinical_service}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
              </div>
              )
            }
          })()}
        </CardBody>
      </Card>
    )
  }
}
