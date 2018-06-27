import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Alert, Grid } from 'react-bootstrap';
import moment from 'moment';
import signIn from '../../util/reports/signIn';
import campPhotos from '../../util/reports/campPhotos';
// import { streamSeasons, streamSessions } from '../../util/reports/data';
const reportMap = {
  signIn,
  campPhotos,
};

class ReportDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      loading: false,
      currentReport: 'signIn',
    };
  }

  runReport = (reportName, startDate, endDate) => {
    this.setState({ err: null });
    this.toggleLoading();
    reportMap[reportName](startDate, endDate)
      .stopOnError(err => this.setState(err))
      .done(() => this.toggleLoading());
  }

toggleLoading = () => this.setState({ loading: !this.state.loading });

changeKey = keyName => e => this.setState({ [`${keyName}`]: e.target.value });

render() {
  return (
    <Grid >
      {this.state.err && <Alert bsStyle="danger">
        {this.state.err.message}
      </Alert>}
      <Form inline>
        <FormGroup >
          <ControlLabel>Report Name</ControlLabel>{' '}
          <FormControl componentClass="select" value={this.state.currentReport} onChange={this.changeKey('currentReport')}>
            <option value="signIn">Sign In Sheets</option>
            {/* <option value="campPhotos">Camp Photos</option> */}
          </FormControl>{' '}
          <ControlLabel>Start Date</ControlLabel>{' '}
          <FormControl type="Date" value={this.state.startDate} onChange={this.changeKey('startDate')} />{' '}
          <ControlLabel>End Date</ControlLabel>{' '}
          <FormControl type="Date" value={this.state.endDate} onChange={this.changeKey('endDate')} />
        </FormGroup>{' '}
        <Button
          disabled={this.state.loading}
          bsStyle={this.state.loading ? 'warning' : 'success'}
          onClick={() => this.runReport(this.state.currentReport, new Date(this.state.startDate), new Date(this.state.endDate))}
        >
        Run Reports
        </Button>
      </Form>
    </Grid>
  );
}
}

export default ReportDashboard;
