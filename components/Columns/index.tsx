import { registry } from "chart.js";
import { Childs } from "../../interfaces/childs";

interface Props extends Childs {
    cols?: string
    isAuto?: boolean    
}

export default function Columns({ cols, children, isAuto }: Props): JSX.Element {


    if(!isAuto) return (
        <div className={`grid grid-flow-col gap-4 md:gap-8 lg:gap-12 mx-auto m-4 md:m-10 lg:m-16 `}>
        {children}
    </div>
    )
    else return (
        <div className={`grid grid-cols-${cols} gap-4 md:gap-8 lg:gap-12 mx-auto m-4 md:m-10 lg:m-16`}>
            {children}
        </div>
    )
}