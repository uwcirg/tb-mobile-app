import React from 'react';
import { Column, Col, Card, CardBody, CardTitle, CardText, Table } from 'reactstrap';

export default class extends React.Component {

  fetchUsers() {
    var api_path = "http://localhost:8080";

    fetch(api_path+'/api/v1.0/users').then((response) => response.json()).then((responseJson) => {
      console.log(responseJson.users)
      this.setState({users: responseJson.users}, this.props.onComponentRefresh)
    }).catch((error) => {
      this.setState({status: error}, this.props.onComponentRefresh)
      console.error(error);
    });
  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Users</CardTitle>
          <CardText>List of users recieved from mPOWEr API</CardText>
        </CardBody>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {/*
                this.state.users.map((user) =>
                  <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                  </tr>
                )
              */}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}
