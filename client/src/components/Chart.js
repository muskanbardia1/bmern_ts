import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  Tooltip,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';

const data = [
  { year: '1:00', population: 28645 },
  { year: '2:00', population: 35455 },
  { year: '3:00', population: 36666 },
  { year: '4:00', population: 49966 },
  { year: '5:00', population: 54578 },
  { year: '6:00', population: 62365 },
  { year: '7:00', population: 65486 },
];

export default class Charts extends React.PureComponent {
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
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Title text="Registrations Per Hour" />
          <Animation />
          <EventTracker />
          <Tooltip targetItem={targetItem} onTargetItemChange={this.changeTargetItem} />
        </Chart>
      </Paper>
    );
  }
}
