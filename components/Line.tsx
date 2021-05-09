
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';
export default function Line({ props }): JSX.Element {


  const data = [ props];

  return (
    <div className="border-2">
      <XYPlot height={300} width={300}>
          <LineSeries data={data} />
        </XYPlot>
    </div>

  )
}