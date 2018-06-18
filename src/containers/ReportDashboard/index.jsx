import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Alert, Grid } from 'react-bootstrap';
import moment from 'moment';
// import { streamSeasons, streamSessions } from '../../util/reports/data';

class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      loading: false,
      currentReport: 'getCamps',
    };
  }

  runReport = (startDate, endDate) => {
    this.setState({ err: null });
    console.log(startDate, endDate, this.state.currentReport);
    this.toggleLoading();
    fetch(`https://gsz8psj9gj.execute-api.us-east-1.amazonaws.com/misc/${this.state.currentReport}?startDate=${moment(startDate).format('YYYY-MM-DD')}&endDate=${moment(endDate).format('YYYY-MM-DD')}`, { mode: 'no-cors' })
      .then(() => this.toggleLoading())
      .catch((err) => {
        this.setState({ err });
        this.toggleLoading();
      });
  }

toggleLoading = () => {
  console.log(`toggled loading${this.state.loading}`);
  this.setState({ loading: !this.state.loading });
}

changeKey = keyName => (e) => {
  console.log(keyName, e.target.value);
  this.setState({ [`${keyName}`]: e.target.value });
}


render() {
  return (
    <Grid >
      {this.state.err && <Alert bsStyle="danger">
        <strong>Holy guacamole!</strong> {this.state.err.message}
      </Alert>}
      <Form inline>
        <FormGroup >
          <ControlLabel>Report Name</ControlLabel>{' '}
          <FormControl componentClass="select" value={this.state.currentReport} onChange={this.changeKey('currentReport')}>
            <option value="getCamps">Sign In Sheets</option>
            <option value="campPhotos">Camp Photos</option>
          </FormControl>{' '}
          <ControlLabel>Start Date</ControlLabel>{' '}
          <FormControl type="Date" value={this.state.startDate} onChange={this.changeKey('startDate')} />{' '}
          <ControlLabel>End Date</ControlLabel>{' '}
          <FormControl type="Date" value={this.state.endDate} onChange={this.changeKey('endDate')} />
        </FormGroup>{' '}
        <Button
          disabled={this.state.loading}
          bsStyle={this.state.loading ? 'warning' : 'success'}
          onClick={() => this.runReport(this.state.startDate, this.state.endDate)}
        >
        Run Reports
        </Button>
      </Form>
    </Grid>
  );
}
}

export default ReportDashboard;
