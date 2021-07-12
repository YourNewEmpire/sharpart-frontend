import React from 'react'

import { PageLayoutProps } from '../../interfaces/layouts'

export default function PageLayout({ children, styles }: PageLayoutProps): JSX.Element {

    if (styles) return (
        <div className={styles}>
            {children}
        </div>
    )
    else return (
        <div className=" 
            flex flex-col space-y-20
            justify-center items-center
            p-2 md:p-4 lg:p-8
            ">
            {children}
        </div>
    )
}