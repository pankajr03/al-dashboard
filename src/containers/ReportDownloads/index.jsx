import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class ReportDashboard extends Component {
  static state = {
    startDate: new Date(),
    endDate: new Date(),
    reports: [],
    sessionIds: [
      '34437903',
      '34438003',
      '34426504',
      '34435402',
      '34435702',
      '34435802',
      '34435902',
      '34430304',
      '34430404',
      '34430504',
      '34430604',
      '34430704',
      '34430804',
      '34439502',
      '34439802',
      '34440102',
      '34440502',
      '36296408',
      '36259707',
    ],
  }
  render() {
    return (
      <Form inline>
        <FormGroup >
          <ControlLabel>Start Date</ControlLabel>{' '}
          <FormControl type="Date" />
        </FormGroup>{' '}
        <FormGroup>
          <ControlLabel>End Date</ControlLabel>{' '}
          <FormControl type="Date" placeholder="jane.doe@example.com" />
        </FormGroup>{' '}
        <Button download={'out.csv'}>Filter Camps</Button>
      </Form>
    );
  }
}

export default ReportDashboard;
