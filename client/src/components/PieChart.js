import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import '../App.css';
import {
  Chart,
  PieSeries,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';

const data = [
  { region: 'Male', val: 960 },
  { region: 'Female', val: 570 }
];

export default class PieChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      targetItem: undefined,
    };

    this.changeTargetItem = targetItem => this.setState({ targetItem });
  }

  render() {
    const { data: chartData, targetItem } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.6}
          />
          <Title
            text="Male To Female Ratio"
          />
          <Animation />
          <EventTracker />
          <Tooltip targetItem={targetItem} onTargetItemChange={this.changeTargetItem} />
          <div class="label">
            <div class="box red"></div><p>Female</p>
            <div class="box blue"></div><p>Male</p>
          </div>
        </Chart>
      </Paper>
    );
  }
}
