import { Childs } from "../../interfaces/childs";

interface Props extends Childs {
    cols: string
}

export default function Columns({ cols, children }: Props): JSX.Element {

    return (
        <div className={`grid grid-cols-${cols} gap-4 md:gap-8 lg:gap-12 m-4 md:m-10 lg:m-16`}>
            {children}
        </div>
    )
}