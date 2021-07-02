import { Line } from "react-chartjs-2";


//? just data and labels for now.
//? More options/props can be added down the pipeline

export default function LineChart({ data, labels }) {

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
      };

      return (
            <>
                  <Line type='line' data={chartConfig} />
            </>
      );

}
