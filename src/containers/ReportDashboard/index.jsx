import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
// import { streamSeasons, streamSessions } from '../../util/reports/data';

class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      reports: [],
      sessions: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    this.getAllSeasons();
  }
getAllSeasons = () => {
  console.log();
  this.toggleLoading();
  fetch('https://gsz8psj9gj.execute-api.us-east-1.amazonaws.com/misc/campPhotos?startDate=2018-06-10&endDate=2018-06-20')
    .then(() => this.toggleLoading());
}
toggleLoading = () => {
  console.log(`toggled loading${this.state.loading}`);
  this.setState({ loading: !!this.state.loading });
}
render() {
  return (
    <div>
      {`${this.state.sessions}`}
      {`${this.state.loading}`}
      <Form inline>
        <FormGroup >
          <ControlLabel>Start Date</ControlLabel>{' '}
          <FormControl type="Date" />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>End Date</ControlLabel>{' '}
          <FormControl type="Date" placeholder="jane.doe@example.com" />
        </FormGroup>{' '}
        <Button>Filter Camps</Button>
      </Form>
    </div>
  );
}
}

export default ReportDashboard;
