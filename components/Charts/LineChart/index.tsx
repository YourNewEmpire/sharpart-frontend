import { Line } from "react-chartjs-2";
import React from 'react'

//? just data and labels for now.
//? More options/props can be added down the pipeline

interface Props {
      data: any
      labels: string[]
      steps?: number
}

function LineChart({ data, labels, steps}: Props) {

      const chartConfig = {
            labels: labels,
            datasets: [
                  {
                        label: 'usd Price',
                        data: data,
                        fill: false,
                        backgroundColor: '#93C5FD',
                        borderColor: '#3B82F6',
                        pointBorderColor: '#93C5FD',
                        yAxisID: 'y-axis-1',
                  },

            ],
            options: {
                  y: {
                        stepSize: steps
                  }
            }
      };

      return (
            <>
                  <Line type='line' data={chartConfig} />
            </>
      );

}
export default React.memo(LineChart)